import type { MetadataRoute } from "next";

import { listEntries } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
import { listVideos, playlists } from "@/lib/videos";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blog, notes, papershelf, projects] = await Promise.all([
    listEntries("blog"),
    listEntries("notes"),
    listEntries("papershelf"),
    listEntries("projects"),
  ]);

  const newest = (dates: string[]) =>
    dates.length ? new Date(`${dates.sort().at(-1)}T00:00:00Z`) : new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: newest(blog.map((e) => e.date)), priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: newest(blog.map((e) => e.date)), priority: 0.9 },
    { url: `${siteUrl}/notes`, lastModified: newest(notes.map((e) => e.date)), priority: 0.8 },
    { url: `${siteUrl}/papershelf`, lastModified: newest(papershelf.map((e) => e.date)), priority: 0.6 },
    { url: `${siteUrl}/projects`, lastModified: newest(projects.map((e) => e.date)), priority: 0.7 },
    { url: `${siteUrl}/about`, priority: 0.5 },
  ];

  const entries: MetadataRoute.Sitemap = [...blog, ...notes, ...papershelf]
    .filter((e) => !e.draft)
    .map((e) => ({
      url: `${siteUrl}/${e.section}/${e.slug}`,
      lastModified: new Date(`${e.updated ?? e.date}T00:00:00Z`),
      priority: e.section === "blog" ? 0.8 : 0.5,
    }));

  // listVideos() already hides drafts in production.
  const videos = await listVideos();
  const videoPages: MetadataRoute.Sitemap = videos.length
    ? [
        { url: `${siteUrl}/videos`, lastModified: newest(videos.map((v) => v.date)), priority: 0.7 },
        ...playlists
          .filter((p) => videos.some((v) => v.playlist === p.slug))
          .map((p) => ({ url: `${siteUrl}/videos/playlist/${p.slug}`, priority: 0.6 })),
        ...videos.map((v) => ({
          url: `${siteUrl}/videos/${v.slug}`,
          lastModified: new Date(`${v.date}T00:00:00Z`),
          priority: 0.7,
        })),
      ]
    : [];

  return [...pages, ...entries, ...videoPages];
}
