"use client";
import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const fontSize = 16; // px in CSS pixels
    const glyphs = "0123456789ABCDEFΞ₿⛓".split("");
    let columns = Math.floor(width / fontSize);
    // track position in rows (integer rows)
    let drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (height / fontSize)));

    const backgroundFade = 0.08; // original trail fade strength

    let raf = 0;
    const render = () => {
      // translucent background fill for trails
      ctx.fillStyle = `rgba(0, 0, 0, ${backgroundFade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const char = glyphs[(Math.random() * glyphs.length) | 0];

        // teal-ish glow to match site's accent
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // leading glyph brighter
        ctx.fillStyle = "rgba(56,196,182,0.85)"; // accent teal
        ctx.fillText(char, x, y);

        // slight trailing ghost
        ctx.fillStyle = "rgba(56,196,182,0.25)";
        ctx.fillText(char, x, y - fontSize);

        // advance one row per frame (original behavior)
        drops[i]++;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      raf = window.requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(render);
      }
    };

    const onResize = () => {
      const nextColumns = Math.max(1, Math.floor(window.innerWidth / fontSize));
      if (nextColumns !== columns) {
        columns = nextColumns;
        drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (height / fontSize)));
      }
      resize();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-20"
      aria-hidden
    />
  );
}

export default MatrixRain;