import { ImageResponse } from "next/og";

import { getEntry } from "@/lib/posts";
import { sections, site, type Section } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type CardProps = {
  kicker: string;
  title: string;
  summary?: string;
};

/**
 * The card shown when a link is shared. It is what a reader sees before he
 * decides to click, so it carries the title and the one line, nothing else.
 * Plain hex colours: the image renderer does not read the site's tokens.
 */
export function ogCard({ kicker, title, summary }: CardProps): ImageResponse {
  const long = title.length > 70;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f7f5f0",
          color: "#1f1d1a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#2f5fd0",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: long ? 56 : 68,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {summary ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.4,
                color: "#6f6a62",
              }}
            >
              {summary.length > 150 ? `${summary.slice(0, 147)}...` : summary}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e4dfd5",
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 26,
                background: "#1f1d1a",
                color: "#f7f5f0",
                fontSize: 20,
                marginRight: 18,
              }}
            >
              RD
            </div>
            {site.name}
          </div>
          <div style={{ display: "flex", color: "#6f6a62" }}>
            Backend systems and applied AI
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

/** The card for one entry, or the site card when the entry is missing. */
export async function entryCard(section: Section, slug: string): Promise<ImageResponse> {
  const entry = await getEntry(section, slug);
  if (!entry) return ogCard({ kicker: site.shortName, title: site.name });
  return ogCard({
    kicker: sections[section].singular,
    title: entry.title,
    summary: entry.summary,
  });
}
