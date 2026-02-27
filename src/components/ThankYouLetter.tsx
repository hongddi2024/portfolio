"use client";

import { useEffect, useState } from "react";

interface ThankYouLetterProps {
  onClose: () => void;
}

export default function ThankYouLetter({ onClose }: ThankYouLetterProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-sm w-full border border-border bg-card p-8 transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 편지 장식 상단 라인 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-accent/40" />
        <div className="absolute top-1 left-0 right-0 h-px bg-accent/20" />

        <p className="text-text font-sans text-sm leading-relaxed mb-6">
          성원을 보내주셔서 감사합니다.
          <br />
          다른 작품들도 구경해보시겠어요?
        </p>

        <button
          type="button"
          onClick={handleClose}
          className="text-xs font-mono text-text-secondary hover:text-text transition-colors cursor-pointer"
        >
          [ 닫기 ]
        </button>

        {/* 편지 장식 하단 라인 */}
        <div className="absolute bottom-1 left-0 right-0 h-px bg-accent/20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/40" />
      </div>
    </div>
  );
}
