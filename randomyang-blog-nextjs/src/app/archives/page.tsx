import { getPostsByYear } from "@/lib/posts";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import HorizontalLine from "@/components/HorizontalLine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "归档 | RandomYang",
  description: "所有文章归档",
};

export default function ArchivesPage() {
  const postsByYear = getPostsByYear();
  const totalPosts = postsByYear.reduce((sum, year) => sum + year.posts.length, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">归档</h1>
        <p className="text-xl text-text-secondary">
          共 {totalPosts} 篇文章
        </p>
      </header>
      
      <HorizontalLine />
      
      <div className="space-y-12">
        {postsByYear.map(({ year, posts }) => (
          <section key={year}>
            <h2 className="text-3xl font-bold text-primary mb-6">
              {year}
            </h2>
            
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug} className="flex items-baseline gap-4">
                  <time className="text-text-light text-sm flex-shrink-0">
                    {formatDate(post.date, 'archive')}
                  </time>
                  
                  <Link
                    href={`/posts/${encodeURIComponent(post.slug)}`}
                    className="text-lg hover:text-primary transition-colors no-underline group"
                  >
                    <span className="group-hover:underline">
                      {post.title}
                    </span>
                    
                    {post.categories && post.categories.length > 0 && (
                      <span className="text-sm text-text-light ml-2">
                        [{post.categories[0]}]
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}