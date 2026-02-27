"use client";

import { PortfolioImage } from "@/types";
import { assetPath } from "@/lib/basepath";

interface ImageCardProps {
  image: PortfolioImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full border border-border hover:border-border-hover transition-colors duration-200 mb-3 relative group cursor-pointer bg-card"
      type="button"
    >
      <img
        src={assetPath(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="w-full h-auto block"
        loading="lazy"
      />
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden watermark-pattern" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-200 flex items-end">
        <span className="text-white text-sm font-mono p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {image.title}
        </span>
      </div>
    </button>
  );
}
