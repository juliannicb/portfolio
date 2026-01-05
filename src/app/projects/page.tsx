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
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block group">
              <Card className="p-5 cursor-pointer transition-colors hover:bg-surface-secondary h-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold">{project.title}</div>
                  <p className="mt-2 text-sm text-muted">{project.summary}</p>
                </div>
                <div className="mt-3 text-accent-teal inline-flex items-center gap-1">
                  Learn more <span aria-hidden>→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}