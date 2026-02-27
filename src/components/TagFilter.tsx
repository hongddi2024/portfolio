"use client";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
}

export default function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 text-sm font-mono border transition-colors duration-200 cursor-pointer ${
          activeTag === null
            ? "border-accent text-accent bg-accent/10"
            : "border-border text-text-secondary hover:border-border-hover hover:text-text"
        }`}
      >
        All
      </button>
      <span className="w-px bg-border self-stretch" />
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className={`px-3 py-1.5 text-sm font-mono border transition-colors duration-200 cursor-pointer ${
            activeTag === tag
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-text-secondary hover:border-border-hover hover:text-text"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
