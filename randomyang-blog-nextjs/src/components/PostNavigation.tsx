import Link from "next/link";
import { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";

interface PostNavigationProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {prevPost ? (
        <Link
          href={`/posts/${encodeURIComponent(prevPost.slug)}`}
          className="group p-6 bg-background-auxiliary rounded-lg hover:bg-primary hover:text-white transition-all no-underline"
        >
          <div className="text-sm mb-2 text-text-light group-hover:text-white/80">
            ← 上一篇
          </div>
          <h4 className="font-bold text-lg mb-2 text-text-primary group-hover:text-white">
            {prevPost.title}
          </h4>
          <time className="text-sm text-text-light group-hover:text-white/80">
            {formatDate(prevPost.date)}
          </time>
        </Link>
      ) : (
        <div />
      )}
      
      {nextPost ? (
        <Link
          href={`/posts/${encodeURIComponent(nextPost.slug)}`}
          className="group p-6 bg-background-auxiliary rounded-lg hover:bg-primary hover:text-white transition-all no-underline text-right"
        >
          <div className="text-sm mb-2 text-text-light group-hover:text-white/80">
            下一篇 →
          </div>
          <h4 className="font-bold text-lg mb-2 text-text-primary group-hover:text-white">
            {nextPost.title}
          </h4>
          <time className="text-sm text-text-light group-hover:text-white/80">
            {formatDate(nextPost.date)}
          </time>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}