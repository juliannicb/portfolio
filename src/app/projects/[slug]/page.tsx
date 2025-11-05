import type { Metadata } from "next";
import { use } from "react";
export const dynamic = "force-static";
import { notFound } from "next/navigation";
import { getAllProjects } from "@/lib/content";
import { Section } from "@/components/ui/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

// Removed synchronous metadata generation to avoid dynamic API warnings

export default function ProjectCaseStudy({ params }: Props) {
  const { slug } = use(params);
  const meta = getAllProjects().find((p) => p.slug === slug);
  
  if (!meta) return notFound();

  const ctaHref = meta.demo && meta.demo.length > 0 ? meta.demo : `/projects/${slug}`;

  return (
    <article className="prose prose-invert max-w-3xl">
      <Section eyebrow={meta.tags?.join(" · ") ?? undefined} title={meta.title}>
        {slug === "web3-crypto-kart" ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-secondary p-6">
              <blockquote className="text-xl">Own the track. Earn the prize. Race the chain.</blockquote>
              <p className="mt-3">
                A Web3-native racing prototype where every kart and track is a tradable NFT. Players join crypto-backed tournaments, race through live canvas-animated tracks, and claim automatic on-chain payouts that split between winners and track owners — a decentralized motorsport economy in motion.
              </p>

              <h3 className="mt-6">How it was built</h3>
              <p>
                Smart contracts in Solidity manage NFT karts, track ownership, and prize distribution. The React + Vite + TypeScript frontend renders real-time race visuals with a custom Canvas engine and connects via Ethers.js for wallet flows and signature verification.
              </p>

              <p className="mt-4 text-sm text-muted"><span className="font-semibold">Stack:</span> Solidity, Hardhat/Foundry, React, Vite, TypeScript, Tailwind CSS, Ethers.js, Vercel</p>

              <div className="mt-6">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-accent-teal text-black hover:opacity-90"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </>
        ) : slug === "blocklotto-fun" ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-secondary p-6">
              <blockquote className="text-xl">The lottery that can’t be rigged.</blockquote>
              <p className="mt-3">
                A provably fair, on-chain lottery where every guess (0–999) is sealed using commit–reveal cryptography. When the reveal phase ends, randomness is resolved transparently, and 70% of the pot pays out to winners — no middlemen, no manipulation, just math.
              </p>

              <h3 className="mt-6">How it was built</h3>
              <p>
                A Solidity commit–reveal contract ensures verifiable fairness and prevents front‑running. The Next.js + TypeScript frontend integrates Ethers.js for wallet interaction, while Base Sepolia handles test‑round execution with USDC entries.
              </p>

              <p className="mt-4 text-sm text-muted"><span className="font-semibold">Stack:</span> Solidity, Hardhat/Foundry, Next.js, TypeScript, Tailwind CSS, Ethers.js, Base Sepolia, USDC, Vercel</p>

              <div className="mt-6">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-accent-teal text-black hover:opacity-90"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </>
        ) : slug === "rwa-prototype" ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-secondary p-6">
              <blockquote className="text-xl">Fractional ownership meets blockchain clarity.</blockquote>
              <p className="mt-3">
                A lightweight RWA demo showing how tangible assets can be fractionalized into ERC‑20 tokens with live oracle‑based pricing. Users can buy fractions, watch price ticks update in real time, and trade through a clean, transparent interface.
              </p>

              <h3 className="mt-6">How it was built</h3>
              <p>
                The backend consists of Solidity ERC‑20 and Oracle Adapter contracts, simulating price feeds and asset ownership. The React + Vite + TypeScript frontend visualizes price dynamics, executes mock trades, and maintains audit‑ready transparency across all updates.
              </p>

              <p className="mt-4 text-sm text-muted"><span className="font-semibold">Stack:</span> Solidity, Hardhat/Foundry, React, Vite, TypeScript, Tailwind CSS, Vercel</p>

              <div className="mt-6">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-accent-teal text-black hover:opacity-90"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </>
        ) : slug === "ai-sound-moodboard" ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-secondary p-6">
              <blockquote className="text-xl">Sound design meets AI intuition.</blockquote>
              <p className="mt-3">
                Upload a photo or video clip, describe the vibe, and let AI compose a matching soundscape. Fine‑tune tone, duration, and texture density, experiment with prompt mixing, and preview your personalized result in‑browser.
              </p>

              <h3 className="mt-6">How it was built</h3>
              <p>
                Built with Next.js + TypeScript and styled with Tailwind CSS, it uses a serverless API to orchestrate external audio‑generation inference. Includes drag‑and‑drop uploads, parameter controls, and a custom web audio preview player.
              </p>

              <p className="mt-4 text-sm text-muted"><span className="font-semibold">Stack:</span> Next.js, TypeScript, Tailwind CSS, Vercel, External Inference API, Python, PyTorch</p>

              <div className="mt-6">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-accent-teal text-black hover:opacity-90"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </>
        ) : slug === "ai-newsroom-autopilot" ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-secondary p-6">
              <blockquote className="text-xl">The newsroom that never sleeps.</blockquote>
              <p className="mt-3">
                An autonomous news engine that filters signal from noise. It scrapes RSS and X feeds, removes duplicates, ranks relevance, and writes multilingual briefs (EN / PT / DE) plus social posts — all logged to Sheets + Notion and sent to Slack / Telegram for instant approval.
              </p>

              <h3 className="mt-6">How it was built</h3>
              <p>
                Created entirely in n8n, this workflow combines Cron, RSS, HTTP, OpenAI, Sheets, Notion, Slack, and Telegram nodes. A custom hashing script de‑dupes stories by title + URL, while AI modules generate concise briefs and social copy. Approvals are human‑verified through interactive chat buttons.
              </p>

              <p className="mt-4 text-sm text-muted"><span className="font-semibold">Stack:</span> n8n, OpenAI (or compatible LLM), Slack, Telegram, Google Sheets, Notion, RSS, X API (optional), NewsAPI (optional)</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg">{meta.summary}</p>
            <p>Experience {meta.title} end‑to‑end — built to be fast, transparent, and delightful to use.</p>
            <a
              href={ctaHref}
              target={meta.demo ? "_blank" : undefined}
              rel={meta.demo ? "noopener noreferrer" : undefined}
              className="inline-block mt-4 px-4 py-2 rounded bg-accent-teal text-black hover:opacity-90"
            >
              {meta.demo ? "Visit Project" : "View Details"}
            </a>
          </>
        )}
      </Section>
    </article>
  );
}