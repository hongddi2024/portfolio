"use client";

import { useEffect, useRef } from "react";

interface LoadMoreTriggerProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function LoadMoreTrigger({ onLoadMore, hasMore }: LoadMoreTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="h-8 flex items-center justify-center">
      <span className="text-text-secondary text-sm font-mono">Loading...</span>
    </div>
  );
}
