"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, FileDown, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Deterministic PRNG to avoid SSR/CSR hydration mismatch for per-letter styles
function hashSeed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function letterVars(label: string, index: number): React.CSSProperties {
  const seed = hashSeed(`${label}:${index}`);
  const rand = mulberry32(seed);
  const r1 = rand();
  const r2 = rand();
  const r3 = rand();
  const r4 = rand();
  const dx = r1 * 32 - 16; // -16px..16px
  const rot = r2 * 50 - 25; // -25deg..25deg
  const delay = Math.floor(r3 * 120); // 0..120ms
  const dur = 600 + Math.floor(r4 * 500); // 600..1100ms
  return {
    ["--dx" as any]: `${dx.toFixed(3)}px`,
    ["--rot" as any]: `${rot.toFixed(3)}deg`,
    ["--delay" as any]: `${delay}ms`,
    ["--dur" as any]: `${dur}ms`,
  } as React.CSSProperties;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "https://de.beincrypto.com/author/julian_nicacio/", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cv", label: "CV" },
];

export function Header() {
  const pathname = usePathname();
  const [isTouch, setIsTouch] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const articlesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect touch/hover capability to decide tap behavior
    const hoverNone = window.matchMedia && window.matchMedia("(hover: none)").matches;
    const touchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hoverNone || touchCapable);
  }, []);

  useEffect(() => {
    if (!projectsOpen) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const el = projectsRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [projectsOpen]);

  useEffect(() => {
    if (!articlesOpen) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const el = articlesRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setArticlesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [articlesOpen]);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:glass">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10">
        <div className="flex h-20 items-center justify-between">
          <div />
          <nav className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {links.map((l) => {
              const isExternal = l.href.startsWith("http");
              const chars = [...l.label];
              // For the "Projects" tab, show a dropdown with external sites
              if (l.label === "Projects") {
                return (
                  <div key={l.href} className="relative group" ref={projectsRef}>
                    <Link
                      href={l.href}
                      className={cn(
                        "group rounded px-3 py-2 transition-colors ring-focus overflow-hidden",
                        pathname === l.href && "bg-card"
                      )}
                      onClick={(e) => {
                        if (isTouch) {
                          e.preventDefault();
                          setProjectsOpen((v) => !v);
                          // Close other menu if open
                          setArticlesOpen(false);
                        }
                      }}
                      aria-haspopup="menu"
                      aria-expanded={projectsOpen}
                    >
                      {chars.map((ch, i) => (
                        <span
                          key={`${l.label}-${i}`}
                          className="nav-chaos-letter inline-block"
                          style={letterVars(l.label, i)}
                        >
                          {ch}
                        </span>
                      ))}
                    </Link>
                    <div
                      className={cn(
                        "absolute left-0 top-full mt-2 min-w-[220px] rounded-lg border border-white/10 bg-card shadow-lg",
                        // Show on hover (desktop) or when explicitly opened (mobile/touch)
                        projectsOpen ? "block" : "hidden",
                        "group-hover:block"
                      )}
                      role="menu"
                    >
                      <a href="https://blocklotto-fun-frontend-dgbu.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 hover:bg-surface-secondary">Blocklotto.fun</a>
                      <a href="https://rwa-prototype-phi.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 hover:bg-surface-secondary">RWA Prototype</a>
                      <a href="https://web3-game-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 hover:bg-surface-secondary">Web3 Crypto Kart Game</a>
                    </div>
                  </div>
                );
              }
              // For the "Articles" tab, show a dropdown with internal and external links
              if (l.label === "Articles") {
                return (
                  <div key={l.href} className="relative group" ref={articlesRef}>
                    <Link
                      href={l.href}
                      className={cn(
                        "group rounded px-3 py-2 transition-colors ring-focus overflow-hidden",
                        pathname === l.href && "bg-card"
                      )}
                      onClick={(e) => {
                        if (isTouch) {
                          e.preventDefault();
                          setArticlesOpen((v) => !v);
                          // Close other menu if open
                          setProjectsOpen(false);
                        }
                      }}
                      aria-haspopup="menu"
                      aria-expanded={articlesOpen}
                    >
                      {chars.map((ch, i) => (
                        <span
                          key={`${l.label}-${i}`}
                          className="nav-chaos-letter inline-block"
                          style={letterVars(l.label, i)}
                        >
                          {ch}
                        </span>
                      ))}
                    </Link>
                    <div
                      className={cn(
                        "absolute left-0 top-full mt-2 min-w-[220px] rounded-lg border border-white/10 bg-card shadow-lg",
                        articlesOpen ? "block" : "hidden",
                        "group-hover:block"
                      )}
                      role="menu"
                    >
                      <a href="/writing" className="block px-3 py-2 hover:bg-surface-secondary">Writing Index</a>
                      <a href="https://de.beincrypto.com/author/julian_nicacio/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 hover:bg-surface-secondary">BeInCrypto Articles</a>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group rounded px-3 py-2 transition-colors ring-focus overflow-hidden",
                    pathname === l.href && "bg-card"
                  )}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {chars.map((ch, i) => (
                    <span
                      key={`${l.label}-${i}`}
                      className="nav-chaos-letter inline-block"
                      style={letterVars(l.label, i)}
                    >
                      {ch}
                    </span>
                  ))}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a aria-label="GitHub" href="https://github.com/juliannicb" target="_blank" className="p-2 rounded-lg hover:bg-card ring-focus"><Github size={18} /></a>
            <a aria-label="LinkedIn" href="https://linkedin.com/in/juliannic" target="_blank" className="p-2 rounded-lg hover:bg-card ring-focus"><Linkedin size={18} /></a>
            <a aria-label="Email" href="mailto:jngbrandalise@live.com" className="p-2 rounded-lg hover:bg-card ring-focus"><Mail size={18} /></a>
            <a aria-label="Download CV" href="/cv.pdf" download className="p-2 rounded-lg hover:bg-card ring-focus"><FileDown size={18} /></a>
          </div>
        </div>
      </div>
    </header>
  );
}