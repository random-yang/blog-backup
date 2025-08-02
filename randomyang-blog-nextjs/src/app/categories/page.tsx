import { getAllCategories } from "@/lib/posts";
import Link from "next/link";
import HorizontalLine from "@/components/HorizontalLine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "分类 | RandomYang",
  description: "所有文章分类",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">分类</h1>
        <p className="text-xl text-text-secondary">
          共 {categories.length} 个分类
        </p>
      </header>
      
      <HorizontalLine />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ category, count }) => (
          <Link
            key={category}
            href={`/categories/${encodeURIComponent(category)}`}
            className="group p-8 bg-background-auxiliary hover:bg-primary rounded-lg transition-all no-underline text-center"
          >
            <h3 className="text-2xl font-bold text-text-primary group-hover:text-white transition-colors mb-2">
              {category}
            </h3>
            <p className="text-text-light group-hover:text-white/80 transition-colors">
              {count} 篇文章
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}