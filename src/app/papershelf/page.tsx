import type { Metadata } from "next";

import { SectionListPage, type SearchParams } from "@/components/section-list-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.papershelf.label,
  description: sections.papershelf.blurb,
  alternates: { canonical: "/papershelf" },
};

export default function PapershelfPage({ searchParams }: { searchParams: SearchParams }) {
  return <SectionListPage section="papershelf" searchParams={searchParams} />;
}
