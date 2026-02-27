"use client";

import { useMemo, useSyncExternalStore } from "react";
import { PortfolioImage } from "@/types";
import ImageCard from "./ImageCard";

interface MasonryGridProps {
  images: PortfolioImage[];
  onImageClick: (index: number) => void;
}

function getColCount() {
  const w = window.innerWidth;
  if (w <= 640) return 1;
  if (w <= 1024) return 2;
  if (w <= 1400) return 3;
  return 4;
}

function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function distribute(images: PortfolioImage[], colCount: number) {
  const columns: { items: { image: PortfolioImage; index: number }[]; height: number }[] =
    Array.from({ length: colCount }, () => ({ items: [], height: 0 }));

  images.forEach((image, index) => {
    const ratio = image.height / image.width;
    const shortest = columns.reduce((min, col, i) =>
      col.height < columns[min].height ? i : min, 0);
    columns[shortest].items.push({ image, index });
    columns[shortest].height += ratio;
  });

  return columns;
}

export default function MasonryGrid({ images, onImageClick }: MasonryGridProps) {
  const colCount = useSyncExternalStore(subscribe, getColCount, () => 4);
  const columns = useMemo(() => distribute(images, colCount), [images, colCount]);

  return (
    <div className="flex gap-3">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-3">
          {col.items.map(({ image, index }) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
