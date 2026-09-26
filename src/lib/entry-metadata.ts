import type { Metadata } from "next";

import type { Entry } from "@/lib/posts";
import { site, siteUrl } from "@/lib/site";

/** Page metadata for one entry: title, description, canonical URL, cards. */
export function entryMetadata(entry: Entry): Metadata {
  const url = `${siteUrl}/${entry.section}/${entry.slug}`;
  const description = entry.summary || site.description;
  return {
    title: entry.title,
    description,
    alternates: { canonical: url },
    robots: entry.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url,
      siteName: site.name,
      publishedTime: entry.date,
      modifiedTime: entry.updated ?? entry.date,
      authors: [site.name],
      tags: entry.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      creator: site.twitterHandle,
    },
  };
}
