"use client";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Lenis from "lenis";

function useLenis() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t: number) => t });
    let raf: number;
    const rafLoop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(rafLoop);
    };
    raf = requestAnimationFrame(rafLoop);
    return () => cancelAnimationFrame(raf);
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}