"use client";
import { useEffect, useRef } from "react";

export function CodeRainOverlay({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Size to parent container rather than full window
    let width = 0;
    let height = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Smaller font size for thinner code lines
    const fontSize = Math.max(8, Math.floor(height / 34));
    const glyphs = "0123456789ABCDEFΞ₿⛓".split("");
    let columns = Math.max(1, Math.floor(width / fontSize));
    let drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (height / fontSize)));

    const backgroundFade = 0.08;
    let raf = 0;
    const render = () => {
      // translucent fill so trails accumulate over the image
      ctx.fillStyle = `rgba(0, 0, 0, ${backgroundFade})`;
      ctx.fillRect(0, 0, width, height);

      // Use a lighter weight to make glyphs appear thinner
      ctx.font = `300 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const char = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "rgba(56,196,182,0.60)"; // accent teal, lighter
        ctx.fillText(char, x, y);
        ctx.fillStyle = "rgba(56,196,182,0.15)";
        ctx.fillText(char, x, y - fontSize);

        drops[i]++;
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      raf = window.requestAnimationFrame(render);
    };

    const onResize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const nextColumns = Math.max(1, Math.floor(rect.width / fontSize));
      if (nextColumns !== columns) {
        columns = nextColumns;
        drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (height / fontSize)));
      }
      resize();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(canvas.parentElement!);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 ${className}`}
    />
  );
}

export default CodeRainOverlay;