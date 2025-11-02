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
              <blockquote className="text-xl">“Own the track. Earn the prize. Race the chain.”</blockquote>
              <p className="mt-3">
                A Web3-native racing prototype where every kart and track is a tradable NFT. Players join crypto-backed tournaments, blaze through a live canvas-rendered race, and claim automated on-chain payouts that split between winners and track owners. It’s not just a game — it’s a decentralized motorsport economy in motion.
              </p>
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
              <blockquote className="text-xl">“The lottery that can’t be rigged.”</blockquote>
              <p className="mt-3">
                A fully transparent, on-chain lottery where your luck meets provable fairness. Players pick a number (0–999), lock in their guess via commit–reveal, and let blockchain randomness decide their fate. Winners take 70% of the pot — no middlemen, no manipulation, just math.
              </p>
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
              <blockquote className="text-xl">“Fractional ownership meets blockchain clarity.”</blockquote>
              <p className="mt-3">
                A sleek RWA demo showing how physical assets can live on-chain. Users buy fractions of a tokenized asset, watch live oracle-driven price updates, and trade through a simple, transparent UI. It’s a glimpse into how blockchain turns real-world value into digital opportunity.
              </p>
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
              <blockquote className="text-xl">“Sound design meets AI intuition.”</blockquote>
              <p className="mt-3">
                Upload a photo or clip, set the vibe, and let AI compose an audio mood to match. Choose duration, texture density, and advanced prompt mixing — then preview your personal sound.
              </p>
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
              <blockquote className="text-xl">“The newsroom that never sleeps.”</blockquote>
              <p className="mt-3">
                An automation powerhouse that turns crypto news chaos into ready-to-publish intelligence. It scrapes RSS + X feeds, removes duplicates, scores relevance, then writes multilingual briefs (EN/PT/DE) and drafts posts for X and LinkedIn — all auto-logged to Sheets/Notion and pinged to Slack/Telegram for approval.
              </p>
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