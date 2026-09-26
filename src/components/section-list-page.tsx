import { EntryList } from "@/components/entry-list";
import { Filters } from "@/components/filters";
import { PageHeader } from "@/components/page-header";
import { listEntries, tagCounts } from "@/lib/posts";
import { sections, type Section } from "@/lib/site";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function one(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** The list page for blog, notes and papershelf. Filters come from the URL. */
export async function SectionListPage({
  section,
  searchParams,
}: {
  section: Section;
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = one(params.category);
  const tag = one(params.tag);

  const all = await listEntries(section);
  const shown = all.filter(
    (e) => (!category || e.category === category) && (!tag || e.tags.includes(tag)),
  );

  const categoryCounts: Record<string, number> = {};
  for (const e of all) if (e.category) categoryCounts[e.category] = (categoryCounts[e.category] ?? 0) + 1;

  const meta = sections[section];

  return (
    <>
      <PageHeader title={meta.label} count={all.length} blurb={meta.blurb}>
        <Filters
          section={section}
          categoryCounts={categoryCounts}
          tags={tagCounts(all)}
          active={{ category, tag }}
          total={all.length}
        />
      </PageHeader>
      <div className="shell">
        <EntryList
          entries={shown}
          byYear
          summaries={section !== "notes"}
          emptyText={
            all.length === 0
              ? `No ${meta.singular} is published yet.`
              : `No ${meta.singular} matches that filter.`
          }
        />
      </div>
    </>
  );
}
