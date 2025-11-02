import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
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

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  tags?: string[];
  summary?: string;
  cover?: string;
};

const contentDir = path.join(process.cwd(), "content");

export function getAllProjects(): ProjectFrontmatter[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as ProjectFrontmatter;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostFrontmatter[] {
  const dir = path.join(contentDir, "writing");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as PostFrontmatter;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function projectMdxPath(slug: string) {
  return path.join(contentDir, "projects", `${slug}.mdx`);
}

export function postMdxPath(slug: string) {
  return path.join(contentDir, "writing", `${slug}.mdx`);
}