"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TagFilter } from "@/components/tag-filter";

type Project = {
  title: string;
  slug: string;
  date: string;
  tags?: string[];
  role?: string;
  stack?: string[];
  repo?: string;
  demo?: string;
  cover?: string;
  results?: string[];
  summary?: string;
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? [])));
  return (
    <div>
      <TagFilter
        tags={allTags}
        onChange={(active) => {
          const cards = document.querySelectorAll<HTMLElement>('[data-tags]');
          cards.forEach((el) => {
            const tags = (el.dataset.tags ?? '').split(',');
            el.style.display = !active || tags.includes(active) ? '' : 'none';
          });
        }}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((p) => {
          const isExternalDemo = !!p.demo && /^https?:\/\//.test(p.demo);
          const content = (
            <Card>
              <div className="text-sm text-muted">{p.tags?.join(" · ")}</div>
              <div className="mt-1 text-lg font-semibold">{p.title}</div>
              {p.summary && <p className="mt-2 text-sm text-muted">{p.summary}</p>}
              <div className="mt-3 text-accent-teal">{isExternalDemo ? 'Visit site →' : 'View case study →'}</div>
            </Card>
          );
          return isExternalDemo ? (
            <a key={p.slug} href={p.demo} target="_blank" rel="noopener noreferrer" className="block" data-tags={(p.tags ?? []).join(',')}>
              {content}
            </a>
          ) : (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="block" data-tags={(p.tags ?? []).join(',')}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}