import type { Metadata } from "next";

import { SectionListPage, type SearchParams } from "@/components/section-list-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.notes.label,
  description: sections.notes.blurb,
  alternates: { canonical: "/notes" },
};

export default function NotesPage({ searchParams }: { searchParams: SearchParams }) {
  return <SectionListPage section="notes" searchParams={searchParams} />;
}
