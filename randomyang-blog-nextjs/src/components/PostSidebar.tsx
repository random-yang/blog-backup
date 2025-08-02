"use client";

import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface PostSidebarProps {
  post: Post;
  toc: TocItem[];
}

export default function PostSidebar({ post, toc }: PostSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="toc">
      <h3 className="text-lg font-bold mb-4">目录</h3>
      <nav className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              "toc-item",
              "block w-full text-left",
              `pl-${(item.level - 1) * 4}`,
              activeId === item.id && "active"
            )}
            style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}