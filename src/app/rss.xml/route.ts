import { listEntries, type Entry } from "@/lib/posts";
import { site, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escape(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function item(entry: Entry): string {
  const url = `${siteUrl}/${entry.section}/${entry.slug}`;
  const pubDate = new Date(`${entry.date}T00:00:00Z`).toUTCString();
  const categories = [entry.section, ...entry.tags]
    .map((c) => `<category>${escape(c)}</category>`)
    .join("");
  return `<item>
  <title>${escape(entry.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${escape(entry.summary)}</description>
  ${categories}
</item>`;
}

/** One feed for posts, notes and paper notes, newest first. */
export async function GET() {
  const [blog, notes, papershelf] = await Promise.all([
    listEntries("blog"),
    listEntries("notes"),
    listEntries("papershelf"),
  ]);
  const entries = [...blog, ...notes, ...papershelf]
    .filter((e) => !e.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 50);

  const lastBuild = entries[0]
    ? new Date(`${entries[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escape(site.name)}</title>
  <link>${siteUrl}</link>
  <description>${escape(site.description)}</description>
  <language>en</language>
  <lastBuildDate>${lastBuild}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${entries.map(item).join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
