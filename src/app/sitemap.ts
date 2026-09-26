import type { MetadataRoute } from "next";

import { listEntries } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

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

  return [...pages, ...entries];
}
