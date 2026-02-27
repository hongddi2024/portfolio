"use client";

import { useEffect, useState } from "react";

interface ThankYouLetterProps {
  onClose: () => void;
}

type Phase = "enter" | "visible" | "closing";

export default function ThankYouLetter({ onClose }: ThankYouLetterProps) {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
  }, []);

  const handleClose = () => {
    setPhase("closing");
    setTimeout(onClose, 500);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        transition: "background 0.4s ease",
        background: phase === "visible" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        backdropFilter: phase === "visible" ? "blur(4px)" : "none",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "300px",
          background: "#f5f0e8",
          padding: "40px 32px 32px",
          boxShadow:
            phase === "visible"
              ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1)"
              : "none",
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform:
            phase === "enter"
              ? "translateY(120vh) rotate(8deg)"
              : phase === "closing"
              ? "translateY(40px) scale(0.9) rotate(-2deg)"
              : "translateY(0) rotate(0deg)",
          opacity: phase === "closing" ? 0 : 1,
        }}
      >
        {/* 상단 장식선 */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "32px",
          right: "32px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#c4a882" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#c4a882">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <div style={{ flex: 1, height: "1px", background: "#c4a882" }} />
        </div>

        {/* 본문 */}
        <p style={{
          color: "#2a2a2a",
          fontSize: "14px",
          lineHeight: 2,
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          margin: "0 0 24px",
        }}>
          성원을 보내주셔서 감사합니다.
          <br />
          다른 작품들도 구경해보시겠어요?
        </p>

        {/* 하단 장식선 + 닫기 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#c4a882" }} />
          <div style={{ flex: 1, height: "1px", background: "#c4a882" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              color: "#a08c6e",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              background: "none",
              border: "1px solid #c4a882",
              padding: "6px 20px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c4a882";
              e.currentTarget.style.color = "#f5f0e8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "#a08c6e";
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
