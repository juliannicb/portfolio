"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfileReveal() {
  const [progress, setProgress] = useState(0); // 0..1
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hoverNone = window.matchMedia && window.matchMedia("(hover: none)").matches;
    const touchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(hoverNone || touchCapable);

    const threshold = 220; // px of scroll to fully materialize (faster reveal on mobile)
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const p = Math.max(0, Math.min(1, y / threshold));
      setProgress(p);
    };
    // initialize and listen
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Digital appear (mobile): stepped reveal + pixelation + subtle zoom
  // Continuous reveal (mobile): fade, unmask, and ease zoom
  const p = isMobile ? Math.max(0, Math.min(1, progress)) : undefined; // 0..1
  const opacity = isMobile ? (p ?? 0) : undefined; // desktop hover uses CSS classes
  const pixelated = isMobile ? (p ?? 0) < 0.85 : false; // keep pixelation until late in reveal
  const scale = isMobile ? 1.05 - 0.05 * (p ?? 0) : undefined; // settles to ~1.0
  const revealPct = isMobile ? Math.min(100, Math.max(0, (p ?? 0) * 100)) : undefined; // top-down reveal

  return (
    <div className="group relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent-teal/20 backdrop-blur-sm border border-white/10">
      {/* Base image */}
      <Image
        src="/profile.png"
        alt="Portrait"
        fill
        priority
        unoptimized
        className="object-cover opacity-80 z-0"
      />

      {/* Alternate image: digital appear on mobile, original glitch-on-enter on desktop hover */}
      <Image
        src="/profile-alt.png?v=2"
        alt="Portrait alternate"
        fill
        priority
        unoptimized
        className={
          `object-cover absolute inset-0 opacity-0 scale-95 transition-transform transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-10 [will-change:transform,filter] ${
            isMobile ? "" : "motion-safe:group-hover:animate-[matrixReveal_1140ms_ease-out_forwards] motion-reduce:group-hover:animate-none"
          }`
        }
        style={{
          opacity,
          transform: scale ? `scale(${scale})` : undefined,
          imageRendering: pixelated ? ("pixelated" as any) : "auto",
          clipPath: revealPct !== undefined ? `inset(${100 - revealPct}% 0 0 0)` : (isMobile ? undefined : `inset(0 0 100% 0)`),
          filter:
            isMobile && revealPct !== undefined
              ? `contrast(${0.9 + 0.1 * (p ?? 0)}) saturate(${0.95 + 0.05 * (p ?? 0)})`
              : "none",
        }}
      />

      {/* Desktop-only: subtle Matrix rain overlay on hover */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            mixBlendMode: "overlay",
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(56,196,182,0.25) 0px, rgba(56,196,182,0.25) 2px, transparent 2px, transparent 6px)",
            backgroundSize: "100% 8px",
            animation: "matrixRain 1140ms linear",
          }}
        />
      )}

      {/* Scanline overlay fades out as progress increases (mobile only) */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: (1 - (progress || 0)) * 0.6,
            mixBlendMode: "overlay",
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
      {/* Desktop-only: Matrix-style reveal keyframes on hover */}
      <style>{`
        @keyframes matrixReveal {
          0% { clip-path: inset(0 0 100% 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes matrixRain {
          0% { background-position-y: 0%; }
          100% { background-position-y: -120%; }
        }
      `}</style>
    </div>
  );
}