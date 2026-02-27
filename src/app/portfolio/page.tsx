"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { portfolioImages } from "@/data/portfolio-images";
import MasonryGrid from "@/components/MasonryGrid";
import Lightbox from "@/components/Lightbox";
import LoadMoreTrigger from "@/components/LoadMoreTrigger";
import TagFilter from "@/components/TagFilter";
import ScrollProgress from "@/components/ScrollProgress";

const PAGE_SIZE = 12;

export default function PortfolioPage() {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const tags = useMemo(() => {
    const set = new Set(portfolioImages.map((img) => img.tag));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(
    () => (activeTag ? portfolioImages.filter((img) => img.tag === activeTag) : portfolioImages),
    [activeTag]
  );

  const visibleImages = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  const handleTagSelect = useCallback((tag: string | null) => {
    setActiveTag(tag);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center pointer-events-none transition-opacity duration-700 bg-bg/80 px-10 py-8 border border-border ${
          showSplash ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg className="mb-4 animate-bounce" width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="26" height="42" rx="13" stroke="#e8e0d0" strokeWidth="2" />
          <circle className="animate-scroll-dot" cx="14" cy="14" r="3" fill="#e8e0d0" />
        </svg>
        <span className="font-mono text-lg text-accent">Scroll Down to Explore</span>
      </div>
    <ScrollProgress />
    <div className="px-6 py-8 max-w-[1800px] mx-auto">
      <h1 className="font-mono text-lg text-accent mb-6">Portfolio</h1>
      <TagFilter tags={tags} activeTag={activeTag} onSelect={handleTagSelect} />
      <MasonryGrid images={visibleImages} onImageClick={handleImageClick} />
      <LoadMoreTrigger onLoadMore={loadMore} hasMore={hasMore} />
      <Lightbox
        images={visibleImages}
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
    </>
  );
}
