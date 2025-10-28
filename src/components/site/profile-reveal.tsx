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

    const threshold = 600; // px of scroll to fully materialize
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
  const steps = 10;
  const stepped = isMobile ? Math.round(progress * steps) / steps : undefined;
  const opacity = isMobile ? (stepped ?? 0) : undefined; // desktop hover uses CSS classes
  const pixelated = isMobile ? (stepped ?? 0) < 1 : false; // no pixelation on desktop
  const scale = isMobile ? 1.06 - 0.06 * (stepped ?? 0) : undefined; // settles to 1.0
  const revealPct = isMobile ? Math.min(100, Math.max(0, (stepped ?? 0) * 100)) : undefined; // top-down reveal

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
        src="/profile-alt.png"
        alt="Portrait alternate"
        fill
        priority
        unoptimized
        className="object-cover absolute inset-0 opacity-0 scale-95 transition-transform transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-10"
        style={{
          opacity,
          transform: scale ? `scale(${scale})` : undefined,
          imageRendering: pixelated ? ("pixelated" as any) : "auto",
          clipPath: revealPct !== undefined ? `inset(${100 - revealPct}% 0 0 0)` : undefined,
          filter:
            isMobile && revealPct !== undefined
              ? `contrast(${0.9 + 0.1 * (stepped ?? 0)}) saturate(${0.95 + 0.05 * (stepped ?? 0)})`
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
    </div>
  );
}