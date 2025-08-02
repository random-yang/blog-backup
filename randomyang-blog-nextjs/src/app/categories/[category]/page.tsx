import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import PostList from "@/components/PostList";
import HorizontalLine from "@/components/HorizontalLine";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(({ category }) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  return {
    title: `分类: ${category} | RandomYang`,
    description: `分类 ${category} 下的所有文章`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          分类: <span className="text-primary">{category}</span>
        </h1>
        <p className="text-xl text-text-secondary">
          共 {posts.length} 篇文章
        </p>
        <Link
          href="/categories"
          className="inline-block mt-4 text-text-light hover:text-primary transition-colors"
        >
          ← 查看所有分类
        </Link>
      </header>
      
      <HorizontalLine />
      
      <PostList posts={posts} />
    </div>
  );
}