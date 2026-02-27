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
        style={containerStyle(phase)}
      >
        {/* 전체 봉투 영역 */}
        <div className="relative w-72" style={{ perspective: "800px" }}>

          {/* 편지지 — 봉투 뒤에서 위로 슬라이드 */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isOpen ? "translateY(0)" : "translateY(100px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div
              style={{
                background: "#f5f0e8",
                padding: "28px 24px",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <p style={{
                color: "#2a2a2a",
                fontSize: "14px",
                lineHeight: 1.8,
                marginBottom: "20px",
                fontFamily: "var(--font-sans)",
                textAlign: "center",
              }}>
                성원을 보내주셔서 감사합니다.
                <br />
                다른 작품들도 구경해보시겠어요?
              </p>
              <div style={{ textAlign: "center" }}>
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
          </div>

          {/* 봉투 본체 */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              height: "140px",
              background: "#c4a882",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
            {/* 봉투 안쪽 V 장식 (아래쪽) */}
            <div style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "100%",
              clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              background: "#b89b72",
            }} />
          </div>

          {/* 봉투 뚜껑 (위쪽 삼각 플랩) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "140px",
              height: "90px",
              zIndex: 10,
              transformOrigin: "bottom center",
              transition: "transform 0.5s ease-in-out",
              transform: isOpen
                ? "rotateX(180deg)"
                : "rotateX(0deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div style={{
              width: "100%",
              height: "100%",
              background: "#c4a882",
              clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }} />
          </div>
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
