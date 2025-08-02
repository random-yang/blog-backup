import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml, generateToc } from "@/lib/markdown";
import PostContent from "@/components/PostContent";
import PostSidebar from "@/components/PostSidebar";
import PostNavigation from "@/components/PostNavigation";
import HorizontalLine from "@/components/HorizontalLine";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} | RandomYang`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "RandomYang"],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);
  const toc = generateToc(post.content);
  
  const posts = getAllPosts();
  const postIndex = posts.findIndex(p => p.slug === post.slug);
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  return (
    <>
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12">
        <article className="max-w-4xl">
          <PostContent post={post} content={content} />
        </article>
        
        <aside className="hidden lg:block">
          <PostSidebar post={post} toc={toc} />
        </aside>
      </div>
      
      <HorizontalLine />
      
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}