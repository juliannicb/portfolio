import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectMdxPath, getAllProjects } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { CodeBlock } from "@/components/ui/code-block";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = getAllProjects().find((p) => p.slug === params.slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.summary };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const filePath = projectMdxPath(params.slug);
  if (!fs.existsSync(filePath)) return notFound();
  const mod = await import(filePath);
  const MDXContent = mod.default;
  const meta = getAllProjects().find((p) => p.slug === params.slug);

  return (
    <article className="prose prose-invert max-w-3xl">
      <Section eyebrow={meta?.tags?.join(" · ") ?? undefined} title={meta?.title}>
        {/* Render MDX body */}
        <MDXContent components={{
          code: (props: any) => <code {...props} className="font-mono" />,
          pre: (props: any) => <CodeBlock code={String(props.children?.props?.children ?? '')} lang={props.children?.props?.className?.replace('language-','')} />,
        }} />
      </Section>
    </article>
  );
}