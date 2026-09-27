import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Software engineer",
    title: "Backend systems and applied AI",
    summary: "Posts, notes and projects by Raghvendra Singh Dhakar.",
  });
}
