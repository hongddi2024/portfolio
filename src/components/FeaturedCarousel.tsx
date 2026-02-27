"use client";

import { useEffect, useRef } from "react";
import { portfolioImages } from "@/data/portfolio-images";
import { assetPath } from "@/lib/basepath";

const featured = portfolioImages.filter((img) => !img.src.endsWith(".gif")).slice(0, 12);

export default function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    let pos = 0;
    const speed = 0.5;

    function animate() {
      pos -= speed;
      const halfWidth = track!.scrollWidth / 2;
      if (Math.abs(pos) >= halfWidth) pos = 0;
      track!.style.transform = `translateX(${pos}px)`;
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const items = [...featured, ...featured];

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div ref={trackRef} className="flex gap-3 py-3 px-3 w-max">
        {items.map((img, i) => (
          <div key={`${img.id}-${i}`} className="shrink-0 h-48 relative">
            <img
              src={assetPath(img.src)}
              alt={img.alt}
              className="h-full w-auto block"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
