"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MobileHomeNav() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const projRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent | TouchEvent) => {
      const p = projRef.current;
      const a = artRef.current;
      if (e.target instanceof Node) {
        if (p && !p.contains(e.target)) setProjectsOpen(false);
        if (a && !a.contains(e.target)) setArticlesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, []);

  return (
    <div className="mt-4 md:hidden space-y-3">
      {/* Projects */}
      <div ref={projRef}>
        <Button className="w-full justify-between" onClick={() => {
          setProjectsOpen((v) => !v);
          setArticlesOpen(false);
        }}>
          <span>Projects</span>
          <span aria-hidden>▾</span>
        </Button>
        {projectsOpen && (
          <div className="mt-2">
            <Card className="p-2">
              <a href="https://blocklotto-fun-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-surface-secondary">Blocklotto.fun</a>
              <a href="https://rwa-prototype-phi.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-surface-secondary">RWA Prototype</a>
              <a href="https://web3-game-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-surface-secondary">Web3 Crypto Kart Game</a>
              <a href="https://ai-sound-moodboard.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-surface-secondary">AI Sound Moodboard</a>
            </Card>
          </div>
        )}
      </div>

      {/* Articles */}
      <div ref={artRef}>
        <Button className="w-full justify-between" onClick={() => {
          setArticlesOpen((v) => !v);
          setProjectsOpen(false);
        }}>
          <span>Articles</span>
          <span aria-hidden>▾</span>
        </Button>
        {articlesOpen && (
          <div className="mt-2">
            <Card className="p-2">
              <a href="https://de.beincrypto.com/author/julian_nicacio/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-surface-secondary">BeInCrypto Articles</a>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}