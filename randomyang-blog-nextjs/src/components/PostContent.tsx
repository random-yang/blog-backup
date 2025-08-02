"use client";

import { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

interface PostContentProps {
  post: Post;
  content: string;
}

export default function PostContent({ post, content }: PostContentProps) {
  useEffect(() => {
    // Add highlight.js styles
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
    document.head.appendChild(link);

    // Add KaTeX styles
    const katexLink = document.createElement("link");
    katexLink.rel = "stylesheet";
    katexLink.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    document.head.appendChild(katexLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(katexLink);
    };
  }, []);

  return (
    <>
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
        
        <div className="post-meta mb-6">
          <time className="text-text-light">
            {formatDate(post.date, 'long')}
          </time>
          
          {post.author && (
            <>
              <span className="text-text-lighter">•</span>
              <span className="text-text-light">{post.author}</span>
            </>
          )}
          
          {post.readingTime && (
            <>
              <span className="text-text-lighter">•</span>
              <span className="text-text-light">
                {post.readingTime} 分钟阅读
              </span>
            </>
          )}
        </div>
        
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-text-secondary">分类：</span>
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="category"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="tag"
              >
                # {tag}
              </Link>
            ))}
          </div>
        )}
      </header>
      
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}