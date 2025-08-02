import { getAllTags } from "@/lib/posts";
import Link from "next/link";
import HorizontalLine from "@/components/HorizontalLine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "标签 | RandomYang",
  description: "所有文章标签",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">标签</h1>
        <p className="text-xl text-text-secondary">
          共 {tags.length} 个标签
        </p>
      </header>
      
      <HorizontalLine />
      
      <div className="flex flex-wrap gap-4 justify-center">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="group relative px-6 py-3 bg-background-auxiliary hover:bg-primary rounded-full transition-all no-underline"
          >
            <span className="text-lg text-text-primary group-hover:text-white transition-colors">
              {tag}
            </span>
            <span className="ml-2 text-sm text-text-light group-hover:text-white/80 transition-colors">
              ({count})
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}