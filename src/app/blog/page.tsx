import type { Metadata } from "next";

import { SectionListPage, type SearchParams } from "@/components/section-list-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.blog.label,
  description: sections.blog.blurb,
  alternates: { canonical: "/blog" },
};

export default function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  return <SectionListPage section="blog" searchParams={searchParams} />;
}
