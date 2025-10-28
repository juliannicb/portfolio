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

    const threshold = 400; // px of scroll to fully materialize (slower, more scroll)
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

      {/* Alternate image: digital appear on mobile, crisp crossfade on desktop hover */}
      <Image
        src="/profile-alt.png?v=2"
        alt="Portrait alternate"
        fill
        priority
        unoptimized
        className={
          `object-cover absolute inset-0 opacity-0 scale-95 transition-transform transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-10 [will-change:transform,filter] ${
            isMobile ? "" : "motion-safe:group-hover:animate-[glitch_140ms_ease-out] motion-reduce:group-hover:animate-none"
          }`
        }
        style={{
          opacity,
          transform: scale ? `scale(${scale})` : undefined,
          imageRendering: pixelated ? ("pixelated" as any) : "auto",
          clipPath: revealPct !== undefined ? `inset(${100 - revealPct}% 0 0 0)` : undefined,
          filter:
            isMobile && revealPct !== undefined
              ? `contrast(${0.9 + 0.1 * (p ?? 0)}) saturate(${0.95 + 0.05 * (p ?? 0)})`
              : "none",
        }}
      />

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
      {/* Desktop-only: glitch keyframes for hover-in */}
      <style>{`
        @keyframes glitch {
          0% {
            transform: translate(0, 0) scale(0.98);
            filter: contrast(0.95) saturate(0.92);
          }
          12% {
            transform: translate(2px, -2px) skewX(-6deg) scale(1.02);
            filter: contrast(1.05) saturate(1.04);
          }
          24% {
            transform: translate(-2px, 2px) skewX(5deg) scale(0.99);
          }
          36% {
            transform: translate(1px, -1px) skewY(4deg) scale(1.01);
          }
          48% {
            transform: translate(-1px, 1px) skewY(-3deg) scale(1.00);
          }
          60% {
            transform: translate(2px, 0) scale(1.02);
          }
          72% {
            transform: translate(-2px, 0) scale(0.99);
          }
          84% {
            transform: translate(0, 1px) scale(1.01);
          }
          100% {
            transform: translate(0, 0) scale(1.0);
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}