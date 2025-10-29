import { getAllProjects } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ProjectsGrid } from "../../components/projects-grid";

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
        <ProjectsGrid projects={projects} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <a href="https://web3-game-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Web3 Crypto Kart Game</div>
              <p className="mt-2 text-sm text-muted">
                A minimal Web3 racing prototype with NFT karts/tracks, tournament entry in crypto, and an on-chain payout that splits rewards to winners and track owners. Frontend uses a canvas race animation and Web3-ready flows.
              </p>
            </Card>
          </a>

          <a href="https://blocklotto-fun-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Blocklotto.fun</div>
              <p className="mt-2 text-sm text-muted">
                Provably fair, on-chain lottery. Players commit guesses (0–999) via commit–reveal to prevent front‑running; 70% of the pot pays out to winners. Entries are 5 USDC; multiple entries allowed. Transparent randomness via on-chain finality with clear claims and payout logic.
              </p>
            </Card>
          </a>

          <a href="https://rwa-prototype-phi.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">Tokenised Real‑World Assets (RWA) Prototype</div>
              <p className="mt-2 text-sm text-muted">Fractional ownership ERC20 with simulated oracle-driven pricing and a simple trading UI.</p>
              <p className="mt-2 text-sm text-muted">Overview: ERC20 share token and a minimal owner-controlled oracle adapter that pushes price ticks; React + Vite frontend visualizes performance and supports demo buy/sell flows.</p>
              <p className="mt-2 text-sm text-muted">Notes: Explicit trust boundaries and auditable updates; lightweight adapter for deterministic demos; documentation outlines non‑custodial architecture and high‑level regulatory considerations for tokenized fractions.</p>
            </Card>
          </a>

          <a href="https://ai-sound-moodboard.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="p-5 transition-colors hover:bg-surface-secondary">
              <div className="text-lg font-semibold">AI Sound Moodboard</div>
              <p className="mt-2 text-sm text-muted">
                Generate mood‑based audio from uploaded media and prompt parameters. Tune duration and texture density, optionally enable advanced prompt mixing, and preview the result. Built with Next.js + TypeScript and deployed on Vercel.
              </p>
            </Card>
          </a>
        </div>
      </Section>
    </div>
  );
}