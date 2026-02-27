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
    <>
      <div ref={ref} className="h-8" />
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center animate-bounce pointer-events-none">
        <span className="font-mono text-xs text-text-secondary mb-1">More</span>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M2 2L10 10L18 2" stroke="#888888" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </div>
    </>
  );
}
