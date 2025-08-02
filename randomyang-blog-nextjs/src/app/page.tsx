import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import HorizontalLine from "@/components/HorizontalLine";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">RandomYang</h1>
        <p className="text-xl text-text-secondary">Code + Design &gt;&gt; Magic</p>
      </section>
      
      <HorizontalLine />
      
      <section>
        <h2 className="text-3xl font-bold mb-8">最新文章</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}