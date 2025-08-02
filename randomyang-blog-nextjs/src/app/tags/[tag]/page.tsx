import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostList from "@/components/PostList";
import HorizontalLine from "@/components/HorizontalLine";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `标签: ${tag} | RandomYang`,
    description: `标签 ${tag} 下的所有文章`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          标签: <span className="text-primary">{tag}</span>
        </h1>
        <p className="text-xl text-text-secondary">
          共 {posts.length} 篇文章
        </p>
        <Link
          href="/tags"
          className="inline-block mt-4 text-text-light hover:text-primary transition-colors"
        >
          ← 查看所有标签
        </Link>
      </header>
      
      <HorizontalLine />
      
      <PostList posts={posts} />
    </div>
  );
}