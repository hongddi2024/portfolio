"use client";

import LightboxComponent from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { PortfolioImage } from "@/types";
import { assetPath } from "@/lib/basepath";

interface LightboxProps {
  images: PortfolioImage[];
  open: boolean;
  index: number;
  onClose: () => void;
}

export default function Lightbox({ images, open, index, onClose }: LightboxProps) {
  const slides = images.map((img) => ({
    src: assetPath(img.src),
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));

  return (
    <LightboxComponent
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      controller={{ closeOnBackdropClick: true }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
      render={{
        slide: ({ slide }) => (
          <div
            onContextMenu={(e) => e.preventDefault()}
            style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img
              src={slide.src}
              alt={(slide as { alt?: string }).alt || ""}
              draggable={false}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", pointerEvents: "none", userSelect: "none" } as React.CSSProperties}
            />
            <div className="watermark-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none" }} />
          </div>
        ),
      }}
    />
  );
}
