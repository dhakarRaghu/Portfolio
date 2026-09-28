import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { wordCount } from "@/lib/markdown";
import type { Section } from "@/lib/site";

/**
 * The content folder is the single publishing path. One markdown file per
 * item, under content/<section>/<slug>.md. The frontmatter is the shape
 * Mission HQ's publish_post writes: title, date, summary, tags, section,
 * draft. Everything else here is optional.
 */
export type Entry = {
  section: Section;
  slug: string;
  title: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** Set when the piece was changed after publishing. */
  updated?: string;
  summary: string;
  tags: string[];
  category?: string;
  draft: boolean;
  /** Markdown body without frontmatter. */
  body: string;
  words: number;
  /** Reading time at 220 words a minute, never below one. */
  minutes: number;
  /** Notes: where the idea came from. */
  source?: string;
  sourceTitle?: string;
  /** Projects. */
  link?: string;
  repo?: string;
  image?: string;
  period?: string;
  role?: string;
  status?: "active" | "shipped" | "archived";
  /** Posts: the slug of the project on /projects this post came from. */
  project?: string;
  /** Projects and posts: the one number the piece stands on. */
  metric?: string;
  featured?: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Drafts show in development, and in production only when asked. */
const SHOW_DRAFTS =
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function isoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  throw new Error(`date must be yyyy-mm-dd, got ${String(value)}`);
}

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function parseEntry(section: Section, slug: string, raw: string): Entry {
  const { data, content } = matter(raw);
  const title = optionalString(data.title);
  if (!title) throw new Error(`${section}/${slug}.md has no title`);
  const words = wordCount(content);
  const status = optionalString(data.status);
  return {
    section,
    slug,
    title,
    date: isoDate(data.date),
    updated: data.updated ? isoDate(data.updated) : undefined,
    summary: optionalString(data.summary) ?? "",
    tags: stringList(data.tags),
    category: optionalString(data.category),
    draft: data.draft === true,
    body: content.trim(),
    words,
    minutes: Math.max(1, Math.round(words / 220)),
    source: optionalString(data.source),
    sourceTitle: optionalString(data.sourceTitle),
    link: optionalString(data.link),
    repo: optionalString(data.repo),
    image: optionalString(data.image),
    period: optionalString(data.period),
    role: optionalString(data.role),
    status:
      status === "active" || status === "shipped" || status === "archived" ? status : undefined,
    project: optionalString(data.project),
    metric: optionalString(data.metric),
    featured: data.featured === true,
  };
}

async function readDir(section: Section): Promise<string[]> {
  try {
    const names = await fs.readdir(path.join(CONTENT_DIR, section));
    return names.filter((n) => n.endsWith(".md") && !n.startsWith("_"));
  } catch {
    return [];
  }
}

/** Every published entry of a section, newest first. */
export async function listEntries(section: Section): Promise<Entry[]> {
  const names = await readDir(section);
  const entries = await Promise.all(
    names.map(async (name) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, section, name), "utf8");
      return parseEntry(section, name.replace(/\.md$/, ""), raw);
    }),
  );
  return entries
    .filter((e) => SHOW_DRAFTS || !e.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export async function getEntry(section: Section, slug: string): Promise<Entry | null> {
  const safe = slug.replace(/[^a-z0-9-]/gi, "");
  if (safe !== slug) return null;
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, section, `${safe}.md`), "utf8");
    const entry = parseEntry(section, safe, raw);
    return SHOW_DRAFTS || !entry.draft ? entry : null;
  } catch {
    return null;
  }
}

export async function countEntries(): Promise<Record<Section, number>> {
  const [blog, notes, papershelf, projects] = await Promise.all([
    listEntries("blog"),
    listEntries("notes"),
    listEntries("papershelf"),
    listEntries("projects"),
  ]);
  return {
    blog: blog.length,
    notes: notes.length,
    papershelf: papershelf.length,
    projects: projects.length,
  };
}

/** Tags of a section with their counts, most used first. */
export function tagCounts(entries: Entry[]): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const e of entries) for (const t of e.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Entries grouped by year, newest year first. Input must already be sorted. */
export function groupByYear(entries: Entry[]): Array<{ year: string; entries: Entry[] }> {
  const groups: Array<{ year: string; entries: Entry[] }> = [];
  for (const e of entries) {
    const year = e.date.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.entries.push(e);
    else groups.push({ year, entries: [e] });
  }
  return groups;
}

/** Up to `limit` other entries that share the category or a tag. */
export function related(entry: Entry, pool: Entry[], limit = 3): Entry[] {
  const tags = new Set(entry.tags);
  return pool
    .filter((e) => e.slug !== entry.slug)
    .map((e) => {
      let score = 0;
      if (entry.category && e.category === entry.category) score += 2;
      for (const t of e.tags) if (tags.has(t)) score += 1;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.e.date < b.e.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.e);
}

export function formatDate(iso: string, style: "long" | "short" = "long"): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    ...(style === "long" ? { year: "numeric" } : {}),
  });
}
