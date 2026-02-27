"use client";

import Masonry from "react-masonry-css";
import { PortfolioImage } from "@/types";
import ImageCard from "./ImageCard";

interface MasonryGridProps {
  images: PortfolioImage[];
  onImageClick: (index: number) => void;
}

const breakpointColumns = {
  default: 4,
  1400: 3,
  1024: 2,
  640: 1,
};

export default function MasonryGrid({ images, onImageClick }: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-3 -ml-3"
      columnClassName="pl-3"
    >
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onImageClick(index)}
        />
      ))}
    </Masonry>
  );
}
