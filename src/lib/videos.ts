import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

/**
 * Videos live as markdown under content/videos/<slug>.md, like posts. The
 * frontmatter carries the video facts (playlist, YouTube id, length,
 * chapters); the body is the written notes shown under the player.
 *
 * A video without a `youtube` id is not uploaded yet. Its page still
 * publishes: the written lesson and the chapters show, and the player area
 * says "Coming soon on YouTube". Adding the id turns the player on.
 * `draft: true` hides a video in production.
 */

export type Playlist = {
  slug: string;
  title: string;
  blurb: string;
};

/** The playlists, in the order the videos page shows them. */
export const playlists: Playlist[] = [
  {
    slug: "inference-internals",
    title: "Inference Internals",
    blurb:
      "Short videos on how LLMs behave in production. Each one answers one question, such as why the bill grew or why a stream froze, and every video has a written version.",
  },
];

export type Chapter = {
  /** As written, for example "3:53". */
  at: string;
  seconds: number;
  title: string;
};

export type Video = {
  slug: string;
  title: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  summary: string;
  tags: string[];
  playlist: string;
  /** Position inside the playlist; lower comes first. */
  order: number;
  /** Short label inside the playlist, for example "#3". */
  part?: string;
  /** YouTube video id. Empty until the video is uploaded. */
  youtube?: string;
  /** Length as m:ss or h:mm:ss. */
  duration: string;
  seconds: number;
  /** Path under /public, 16:9. */
  thumbnail?: string;
  chapters: Chapter[];
  draft: boolean;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "videos");

const SHOW_DRAFTS =
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function toSeconds(stamp: string): number {
  const parts = stamp.split(":").map(Number);
  if (parts.some((n) => Number.isNaN(n))) throw new Error(`bad time ${stamp}`);
  return parts.reduce((total, n) => total * 60 + n, 0);
}

function isoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  throw new Error(`date must be yyyy-mm-dd, got ${String(value)}`);
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** A chapter is written as "3:53 Where does TTFT come from?". */
function parseChapter(line: string): Chapter {
  const match = /^(\d+(?::\d{2}){1,2})\s+(.+)$/.exec(line.trim());
  if (!match) throw new Error(`chapter must look like "3:53 Title", got "${line}"`);
  return { at: match[1], seconds: toSeconds(match[1]), title: match[2] };
}

function parse(slug: string, raw: string): Video {
  const { data, content } = matter(raw);
  const title = text(data.title);
  if (!title) throw new Error(`videos/${slug}.md has no title`);
  const playlist = text(data.playlist);
  if (!playlist || !playlists.some((p) => p.slug === playlist)) {
    throw new Error(`videos/${slug}.md names an unknown playlist "${String(data.playlist)}"`);
  }
  const duration = text(data.duration) ?? "0:00";
  return {
    slug,
    title,
    date: isoDate(data.date),
    summary: text(data.summary) ?? "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    playlist,
    order: typeof data.order === "number" ? data.order : 0,
    part: text(data.part),
    youtube: text(data.youtube),
    duration,
    seconds: toSeconds(duration),
    thumbnail: text(data.thumbnail),
    chapters: Array.isArray(data.chapters) ? data.chapters.map((c) => parseChapter(String(c))) : [],
    draft: data.draft === true,
    body: content.trim(),
  };
}

/** Visible here: anything not marked draft, and drafts in development. */
function visible(video: Video): boolean {
  return SHOW_DRAFTS || !video.draft;
}

export async function listVideos(): Promise<Video[]> {
  let names: string[] = [];
  try {
    names = (await fs.readdir(DIR)).filter((n) => n.endsWith(".md") && !n.startsWith("_"));
  } catch {
    return [];
  }
  const videos = await Promise.all(
    names.map(async (name) => parse(name.replace(/\.md$/, ""), await fs.readFile(path.join(DIR, name), "utf8"))),
  );
  return videos.filter(visible).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getVideo(slug: string): Promise<Video | null> {
  if (slug.replace(/[^a-z0-9-]/gi, "") !== slug) return null;
  const video = (await listVideos()).find((v) => v.slug === slug);
  return video ?? null;
}

export function getPlaylist(slug: string): Playlist | undefined {
  return playlists.find((p) => p.slug === slug);
}

/** "1 h 6 min" or "20 min". */
export function formatTotal(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} h ${minutes % 60} min` : `${minutes} min`;
}
