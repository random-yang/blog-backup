import Link from "next/link";
import HorizontalLine from "@/components/HorizontalLine";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-8">页面未找到</h2>
      
      <HorizontalLine />
      
      <p className="text-xl text-text-secondary mb-8">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-sun transition-colors no-underline"
      >
        返回首页
      </Link>
    </div>
  );
}