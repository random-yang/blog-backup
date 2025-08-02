"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative",
        // post.top && !compact && "paper-curl",
        !compact && "p-8 bg-white hover:bg-background-auxiliary transition-colors rounded-lg"
      )}
    >
      {post.top && !compact && (
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
          置顶
        </div>
      )}
      
      <Link
        href={`/posts/${encodeURIComponent(post.slug)}`}
        className="block no-underline"
      >
        <h3 className={cn(
          "font-bold mb-3 mt-1 text-text-primary group-hover:text-primary transition-colors",
          "text-lg"
        )}>
          {post.title}
        </h3>
        
        {/* {!compact && (
          <p className="text-text-secondary mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )} */}
        
        <div className="post-meta">
          <time className="text-text-light">
            {formatDate(post.date)}
          </time>
          
          {post.readingTime && (
            <>
              <span className="text-text-lighter">•</span>
              <span className="text-text-light">
                {post.readingTime} 分钟阅读
              </span>
            </>
          )}
          
          {post.categories && post.categories.length > 0 && (
            <>
              <span className="text-text-lighter">•</span>
              <span className="text-text-light">
                {post.categories[0]}
              </span>
            </>
          )}
        </div>
        
        {!compact && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tag"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/tags/${encodeURIComponent(tag)}`;
                }}
              >
                # {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}