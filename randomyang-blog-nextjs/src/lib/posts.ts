import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const draftsDirectory = path.join(process.cwd(), 'content/drafts');

export function getPostSlugs(isDraft = false): string[] {
  const directory = isDraft ? draftsDirectory : postsDirectory;
  
  try {
    return fs.readdirSync(directory)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => file.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error(`Error reading ${isDraft ? 'drafts' : 'posts'} directory:`, error);
    return [];
  }
}

export function getPostBySlug(slug: string, isDraft = false): Post | null {
  const directory = isDraft ? draftsDirectory : postsDirectory;
  const decodedSlug = decodeURIComponent(slug);
  const realSlug = decodedSlug.replace(/\.(md|mdx)$/, '');
  
  try {
    // Try to find the file with the decoded slug first
    let fullPath = path.join(directory, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      // If not found, try with the original slug
      fullPath = path.join(directory, `${slug}.md`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content, excerpt } = matter(fileContents, { excerpt: true });

    const postMeta = data as PostMeta;
    
    const readingTime = Math.ceil(content.split(/\s+/).length / 200);

    return {
      ...postMeta,
      slug: realSlug,
      content,
      excerpt: excerpt || postMeta.description || content.slice(0, 200) + '...',
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(isDraft = false): Post[] {
  const slugs = getPostSlugs(isDraft);
  const posts = slugs
    .map(slug => getPostBySlug(slug, isDraft))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => {
      if (post1.top && !post2.top) return -1;
      if (!post1.top && post2.top) return 1;
      
      return new Date(post2.date).getTime() - new Date(post1.date).getTime();
    });

  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const tags = new Map<string, number>();
  
  getAllPosts().forEach(post => {
    post.tags?.forEach(tag => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tags.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const categories = new Map<string, number>();
  
  getAllPosts().forEach(post => {
    post.categories?.forEach(category => {
      categories.set(category, (categories.get(category) || 0) + 1);
    });
  });
  
  return Array.from(categories.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByYear(): { year: number; posts: Post[] }[] {
  const postsByYear = new Map<number, Post[]>();
  
  getAllPosts().forEach(post => {
    const year = new Date(post.date).getFullYear();
    const yearPosts = postsByYear.get(year) || [];
    yearPosts.push(post);
    postsByYear.set(year, yearPosts);
  });
  
  return Array.from(postsByYear.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year);
}