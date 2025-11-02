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
          Explore three featured prototypes: a Web3 racing game with NFT assets, a provably fair
          on-chain lottery using commit–reveal, and a tokenised real‑world assets demo with oracle‑driven pricing.
        </p>
        {/* Removed tag filter and auto-generated cards */}
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/projects/web3-crypto-kart" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Web3 Crypto Kart Game</div>
              <p className="mt-2 text-sm text-muted">
                A minimal Web3 racing prototype with NFT karts/tracks, tournament entry in crypto, and an on-chain payout that splits rewards to winners and track owners. Frontend uses a canvas race animation and Web3-ready flows.
              </p>
              <p className="mt-2 text-sm text-muted"><span className="font-semibold">Built with:</span> Solidity contracts for NFT karts/tracks and tournament payouts; React + Vite + TypeScript frontend with custom Canvas race animation; Ethers.js wallet flows.</p>
              <p className="mt-2 text-xs text-muted">Stack: Solidity, Hardhat/Foundry, React + Vite, TypeScript, Tailwind CSS, Ethers.js, Vercel.</p>
            </Card>
          </Link>

          <Link href="/projects/blocklotto-fun" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Blocklotto.fun</div>
              <p className="mt-2 text-sm text-muted">
                Provably fair, on-chain lottery. Players commit guesses (0–999) via commit–reveal to prevent front‑running; 70% of the pot pays out to winners. Entries are 5 USDC; multiple entries allowed. Transparent randomness via on-chain finality with clear claims and payout logic.
              </p>
              <p className="mt-2 text-sm text-muted"><span className="font-semibold">Built with:</span> Solidity commit–reveal contracts, Next.js + TypeScript frontend, Ethers.js wallet integration; Base Sepolia test rounds; USDC for entry.</p>
              <p className="mt-2 text-xs text-muted">Stack: Solidity, Hardhat/Foundry, Next.js, TypeScript, Tailwind CSS, Ethers.js, Base Sepolia, USDC, Vercel.</p>
            </Card>
          </Link>

          <Link href="/projects/rwa-prototype" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Tokenised Real‑World Assets (RWA) Prototype</div>
              <p className="mt-2 text-sm text-muted">Fractional ownership ERC20 with simulated oracle-driven pricing and a simple trading UI.</p>
              <p className="mt-2 text-sm text-muted">Overview: ERC20 share token and a minimal owner-controlled oracle adapter that pushes price ticks; React + Vite frontend visualizes performance and supports demo buy/sell flows.</p>
              <p className="mt-2 text-sm text-muted">Notes: Explicit trust boundaries and auditable updates; lightweight adapter for deterministic demos; documentation outlines non‑custodial architecture and high‑level regulatory considerations for tokenized fractions.</p>
              <p className="mt-2 text-sm text-muted"><span className="font-semibold">Built with:</span> Solidity ERC20 + Oracle Adapter; React + Vite + TypeScript frontend to visualise performance, simulate price ticks, and support demo buy/sell flows.</p>
              <p className="mt-2 text-xs text-muted">Stack: Solidity, Hardhat/Foundry, React + Vite, TypeScript, Tailwind CSS, Vercel.</p>
            </Card>
          </Link>

          <Link href="/projects/ai-sound-moodboard" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">AI Sound Moodboard</div>
              <p className="mt-2 text-sm text-muted">
                Generate mood‑based audio from uploaded media and prompt parameters. Tune duration and texture density, optionally enable advanced prompt mixing, and preview the result. Built with Next.js + TypeScript and deployed on Vercel.
              </p>
              <p className="mt-2 text-sm text-muted"><span className="font-semibold">Built with:</span> Next.js + TypeScript frontend with Tailwind CSS; serverless API orchestrates audio generation via external inference; drag‑and‑drop uploads, parameter controls, and preview player.</p>
              <p className="mt-2 text-xs text-muted">Stack: Next.js, TypeScript, Tailwind CSS, Vercel, External inference API.</p>
            </Card>
          </Link>

          <Link href="/projects/ai-newsroom-autopilot" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">AI Newsroom Autopilot (n8n)</div>
              <p className="mt-2 text-sm text-muted">
                Pulls stories from RSS and X search, de‑dupes, scores relevance, generates 3‑language briefs (EN/PT/DE) + tweet + LinkedIn drafts, logs to Sheets/Notion, and alerts via Slack/Telegram with one‑click approve buttons.
              </p>
              <p className="mt-2 text-sm text-muted"><span className="font-semibold">Built with:</span> n8n workflow (Cron, RSS, HTTP, Code, OpenAI, Sheets, Notion, Slack/Telegram); de‑dupe via hash(title+url); multilingual brief + social drafts with length bounds; human‑in‑the-loop approvals.
              </p>
              <p className="mt-2 text-xs text-muted">Stack: n8n, OpenAI (or compatible), Slack, Telegram, Google Sheets, Notion, RSS, X API (optional), NewsAPI (optional).</p>
            </Card>
          </Link>
        </div>
      </Section>
    </div>
  );
}