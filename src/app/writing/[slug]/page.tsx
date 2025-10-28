import fs from "node:fs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, postMdxPath } from "@/lib/content";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = getAllPosts().find((p) => p.slug === params.slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.summary };
}

export default async function PostPage({ params }: Props) {
  const filePath = postMdxPath(params.slug);
  if (!fs.existsSync(filePath)) return notFound();
  const mod = await import(filePath);
  const MDXContent = mod.default;
  return (
    <article className="prose prose-invert max-w-3xl">
      <MDXContent />
    </article>
  );
}