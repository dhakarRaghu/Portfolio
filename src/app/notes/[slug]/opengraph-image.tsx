import { entryCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Title card";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return entryCard("notes", slug);
}
