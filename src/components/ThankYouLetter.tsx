"use client";

import { useEffect, useState } from "react";

interface ThankYouLetterProps {
  onClose: () => void;
}

type Phase = "fly" | "land" | "open" | "closing";

export default function ThankYouLetter({ onClose }: ThankYouLetterProps) {
  const [phase, setPhase] = useState<Phase>("fly");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("land"), 50);
    const t2 = setTimeout(() => setPhase("open"), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClose = () => {
    setPhase("closing");
    setTimeout(onClose, 600);
  };

  const isVisible = phase !== "fly" && phase !== "closing";
  const isOpen = phase === "open";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: "600px", ...containerStyle(phase) }}
      >
        <div className="relative w-72" style={{ height: "200px" }}>

          {/* 1) 편지지 — 가장 뒤 (z-index: 1) */}
          <div
            className="absolute left-3 right-3"
            style={{
              top: "40px",
              zIndex: 1,
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isOpen ? "translateY(-170px)" : "translateY(0)",
            }}
          >
            <div
              style={{
                background: "#f5f0e8",
                padding: "28px 24px",
                boxShadow: isOpen ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
              }}
            >
              <p style={{
                color: "#2a2a2a",
                fontSize: "14px",
                lineHeight: 1.8,
                marginBottom: "20px",
                fontFamily: "var(--font-sans)",
              }}>
                성원을 보내주셔서 감사합니다.
                <br />
                다른 작품들도 구경해보시겠어요?
              </p>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  color: "#888",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2a2a2a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                [ 닫기 ]
              </button>
            </div>
          </div>

          {/* 2) 봉투 앞면 — 편지지를 덮음 (z-index: 10) */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 10,
              background: "#c4a882",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* 봉투 안쪽 V 장식 */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #b89b72 50%, transparent 50%), linear-gradient(-135deg, #b89b72 50%, transparent 50%)",
              backgroundSize: "50.1% 100%",
              backgroundPosition: "left, right",
              backgroundRepeat: "no-repeat",
              opacity: 0.4,
            }} />
          </div>

          {/* 3) 봉투 뚜껑 — 가장 앞 (z-index: 20) */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100px",
            zIndex: 20,
            background: "#c4a882",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            transformOrigin: "top center",
            transition: "transform 0.5s ease-in-out",
            transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            backfaceVisibility: "hidden",
          }} />
        </div>
      </div>
    </div>
  );
}

function containerStyle(phase: Phase): React.CSSProperties {
  if (phase === "fly") {
    return {
      transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      transform: "translateY(100vh) rotate(12deg) scale(0.4)",
      opacity: 0,
    };
  }
  if (phase === "closing") {
    return {
      transition: "all 0.6s cubic-bezier(0.55, 0, 1, 0.45)",
      transform: "translateY(60px) scale(0.7)",
      opacity: 0,
    };
  }
  return {
    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    transform: "translateY(0) rotate(0deg) scale(1)",
    opacity: 1,
  };
}
