import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryPage } from "@/components/entry-page";
import { entryMetadata } from "@/lib/entry-metadata";
import { getEntry, listEntries } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const entries = await listEntries("notes");
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("notes", slug);
  return entry ? entryMetadata(entry) : {};
}

export default async function NoteEntry({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = await getEntry("notes", slug);
  if (!entry) notFound();
  const pool = await listEntries("notes");
  return <EntryPage entry={entry} pool={pool} />;
}
