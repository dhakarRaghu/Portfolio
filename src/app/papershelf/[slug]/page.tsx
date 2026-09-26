import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryPage } from "@/components/entry-page";
import { entryMetadata } from "@/lib/entry-metadata";
import { getEntry, listEntries } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const entries = await listEntries("papershelf");
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("papershelf", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function PaperEntry({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await getEntry("papershelf", slug);
  if (!entry) notFound();
  const pool = await listEntries("papershelf");
  return <EntryPage entry={entry} pool={pool} />;
}
