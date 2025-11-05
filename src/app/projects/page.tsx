import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div>
      <Section title="Projects">
        <p className="text-sm text-muted mb-6">
          Explore working prototypes across crypto, RWA, AI, and automation — from an NFT‑powered racing game and a provably‑fair lottery to tokenised assets, AI sound generation, and a newsroom autopilot. Each card links to a focused case study.
        </p>
        {/* Removed tag filter and auto-generated cards */}
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/projects/web3-crypto-kart" className="block group">
            <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Web3 Crypto Kart Game</div>
              <p className="mt-2 text-sm text-muted">Race, earn, and own the track — a Web3 racing prototype with NFT karts and on-chain prize payouts built for true crypto competition.</p>
              <div className="mt-3 text-accent-teal inline-flex items-center gap-1">Learn more <span aria-hidden>→</span></div>
            </Card>
          </Link>

          <Link href="/projects/blocklotto-fun" className="block group">
            <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Blocklotto.fun</div>
              <p className="mt-2 text-sm text-muted">A provably fair on-chain lottery where every guess is secured by commit‑reveal logic and every win is transparently paid in USDC.</p>
              <div className="mt-3 text-accent-teal inline-flex items-center gap-1">Learn more <span aria-hidden>→</span></div>
            </Card>
          </Link>

          <Link href="/projects/rwa-prototype" className="block group">
            <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Tokenised Real‑World Assets (RWA) Prototype</div>
              <p className="mt-2 text-sm text-muted">Fractionalize real assets into ERC‑20 tokens with oracle‑driven pricing and a clean demo UI for trading and performance visualization.</p>
              <div className="mt-3 text-accent-teal inline-flex items-center gap-1">Learn more <span aria-hidden>→</span></div>
            </Card>
          </Link>

          <Link href="/projects/ai-sound-moodboard" className="block group">
            <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">AI Sound Moodboard</div>
              <p className="mt-2 text-sm text-muted">Upload visuals or prompts to instantly generate mood‑based soundscapes — tune tone, texture, and duration in an intuitive web studio.</p>
              <div className="mt-3 text-accent-teal inline-flex items-center gap-1">Learn more <span aria-hidden>→</span></div>
            </Card>
          </Link>

          <Link href="/projects/ai-newsroom-autopilot" className="block group">
            <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">AI Newsroom Autopilot (n8n)</div>
              <p className="mt-2 text-sm text-muted">An autonomous newsroom engine that curates news, scores relevance, writes multilingual briefs, and drafts posts for human‑ready publishing.</p>
              <div className="mt-3 text-accent-teal inline-flex items-center gap-1">Learn more <span aria-hidden>→</span></div>
            </Card>
          </Link>
        </div>
      </Section>
    </div>
  );
}