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
          <Card className="p-5">
            <div className="text-lg font-semibold">
              <a href="https://web3-game-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Web3 Crypto Kart Game</a>
            </div>
            <p className="mt-2 text-sm text-muted">
              A minimal Web3 racing prototype with NFT karts/tracks, tournament entry in crypto, and an on-chain payout that splits rewards to winners and track owners. Frontend uses a canvas race animation and Web3-ready flows.
            </p>
          </Card>

          <Card className="p-5">
            <div className="text-lg font-semibold">
              <a href="https://blocklotto-fun-frontend-dgbu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Blocklotto.fun</a>
            </div>
            <p className="mt-2 text-sm text-muted">
              Provably fair, on-chain lottery. Players commit guesses (0–999) via commit–reveal to prevent front‑running; 70% of the pot pays out to winners. Entries are 5 USDC; multiple entries allowed. Transparent randomness via on-chain finality with clear claims and payout logic.
            </p>
          </Card>

          <Card className="p-5">
            <div className="text-lg font-semibold">
              <a href="https://rwa-prototype-phi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Tokenised Real‑World Assets (RWA) Prototype</a>
            </div>
            <p className="mt-2 text-sm text-muted">Fractional ownership ERC20 with simulated oracle-driven pricing and a simple trading UI.</p>
            <p className="mt-2 text-sm text-muted">Overview: ERC20 share token and a minimal owner-controlled oracle adapter that pushes price ticks; React + Vite frontend visualizes performance and supports demo buy/sell flows.</p>
            <p className="mt-2 text-sm text-muted">Notes: Explicit trust boundaries and auditable updates; lightweight adapter for deterministic demos; documentation outlines non‑custodial architecture and high‑level regulatory considerations for tokenized fractions.</p>
          </Card>
        </div>
      </Section>
    </div>
  );
}