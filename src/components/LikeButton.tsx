"use client";

import { useLikes } from "@/hooks/useLikes";

interface LikeButtonProps {
  imageId: string;
}

export default function LikeButton({ imageId }: LikeButtonProps) {
  const { count, liked, toggle } = useLikes(imageId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      className={`pointer-events-auto flex items-center gap-1 text-white/90 hover:text-white transition-all duration-150 cursor-pointer ${
        count > 0 || liked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={liked ? 0 : 2}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      {count > 0 && (
        <span className="text-xs font-mono tabular-nums">{count}</span>
      )}
    </button>
  );
}
