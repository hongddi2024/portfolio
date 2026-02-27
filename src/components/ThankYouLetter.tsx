"use client";

import { useEffect, useState } from "react";

interface ThankYouLetterProps {
  onClose: () => void;
}

type Phase = "fly" | "open" | "show" | "closing" | "done";

export default function ThankYouLetter({ onClose }: ThankYouLetterProps) {
  const [phase, setPhase] = useState<Phase>("fly");

  useEffect(() => {
    // fly in → envelope lands
    const t1 = setTimeout(() => setPhase("open"), 600);
    // envelope opens → letter unfolds
    const t2 = setTimeout(() => setPhase("show"), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClose = () => {
    setPhase("closing");
    setTimeout(() => { setPhase("done"); onClose(); }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        phase === "fly" ? "bg-black/0" : phase === "closing" || phase === "done" ? "bg-black/0" : "bg-black/60 backdrop-blur-sm"
      }`}
      onClick={handleClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          perspective: "800px",
          ...getEnvelopeStyle(phase),
        }}
      >
        {/* 편지 봉투 */}
        <div
          className="relative w-72 border border-border bg-card overflow-visible"
          style={getEnvelopeBodyStyle(phase)}
        >
          {/* 봉투 뚜껑 (삼각형 플랩) */}
          <div
            className="absolute left-0 right-0 border-l border-r border-t border-border bg-card origin-top"
            style={{
              top: 0,
              height: "60px",
              clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
              transformOrigin: "top center",
              transition: "transform 0.5s ease",
              transform: phase === "open" || phase === "show" || phase === "closing"
                ? "rotateX(180deg)" : "rotateX(0deg)",
              zIndex: phase === "show" ? 0 : 20,
            }}
          />

          {/* 봉투 안쪽 삼각형 */}
          <div
            className="absolute left-0 right-0 bg-[#1a1a1a]"
            style={{
              top: 0,
              height: "60px",
              clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
            }}
          />

          {/* 편지지 — 봉투 안에서 위로 올라옴 */}
          <div
            className="relative z-10 mx-3 bg-[#1c1c1c] border border-border/50"
            style={{
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: phase === "show"
                ? "translateY(-80px)"
                : phase === "closing"
                ? "translateY(0px) scale(0.95)"
                : "translateY(0px)",
              opacity: phase === "closing" ? 0 : 1,
              padding: "24px 20px",
              marginTop: "40px",
              marginBottom: "16px",
            }}
          >
            <p className="text-text font-sans text-sm leading-relaxed mb-5">
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
          </div>
        </div>
      </div>
    </div>
  );
}

function getEnvelopeStyle(phase: Phase): React.CSSProperties {
  switch (phase) {
    case "fly":
      return {
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: "translateY(100vh) rotate(15deg) scale(0.5)",
        opacity: 0.5,
      };
    case "closing":
      return {
        transition: "all 0.7s cubic-bezier(0.55, 0, 1, 0.45)",
        transform: "translateY(40px) scale(0.8)",
        opacity: 0,
      };
    default:
      return {
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: "translateY(0) rotate(0deg) scale(1)",
        opacity: 1,
      };
  }
}

function getEnvelopeBodyStyle(phase: Phase): React.CSSProperties {
  return {
    transition: "all 0.5s ease",
    padding: "0",
    minHeight: phase === "show" ? "120px" : "120px",
  };
}
