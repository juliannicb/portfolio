"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, FileDown, Mail, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:glass">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg hover:bg-card ring-focus"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className="hidden md:flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {links.map((l) => {
              const isExternal = l.href.startsWith("http");
              const chars = [...l.label];
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
        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden">
            {/* overlay */}
            <div
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            {/* menu */}
            <div className="fixed z-50 top-16 left-4 right-4 rounded-xl border border-white/20 bg-background backdrop-blur-0 shadow-xl">
              <div className="p-2">
                {links.map((l) => {
                  const isExternal = l.href.startsWith("http");
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded px-4 py-3 text-sm hover:bg-surface-secondary",
                        pathname === l.href && "bg-surface-secondary"
                      )}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}