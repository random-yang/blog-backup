import Link from "next/link";
import { Post } from "@/types/post";
import { formatDate } from "@/lib/utils";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  showYear?: boolean;
}

export default function PostList({ posts, showYear = false }: PostListProps) {
  let currentYear: number | null = null;

  return (
    <div className="space-y-8">
      {posts.map((post) => {
        const postYear = new Date(post.date).getFullYear();
        const showYearHeader = showYear && postYear !== currentYear;
        currentYear = postYear;

        return (
          <div key={post.slug}>
            {showYearHeader && (
              <h3 className="text-2xl font-bold text-primary mb-6 mt-12 first:mt-0">
                {postYear}
              </h3>
            )}
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
}