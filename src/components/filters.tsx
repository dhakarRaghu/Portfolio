import Link from "next/link";

import { categories, type Section } from "@/lib/site";

type FiltersProps = {
  section: Section;
  /** Counts per category slug for this section. */
  categoryCounts: Record<string, number>;
  tags: Array<{ tag: string; count: number }>;
  active: { category?: string; tag?: string };
  total: number;
};

function href(section: Section, params: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) query.set(key, value);
  const qs = query.toString();
  return qs ? `/${section}?${qs}` : `/${section}`;
}

/** Two chip rows: the fixed categories, then the most used tags. */
export function Filters({ section, categoryCounts, tags, active, total }: FiltersProps) {
  const shownTags = tags.slice(0, 14);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Link
          href={href(section, {})}
          className="chip"
          data-active={!active.category && !active.tag}
        >
          All <span className="ml-1.5 text-fg-faint">{total}</span>
        </Link>
        {categories
          .filter((c) => categoryCounts[c.slug])
          .map((c) => (
            <Link
              key={c.slug}
              href={href(section, { category: c.slug })}
              className="chip"
              data-active={active.category === c.slug}
            >
              {c.label} <span className="ml-1.5 text-fg-faint">{categoryCounts[c.slug]}</span>
            </Link>
          ))}
      </div>
      {shownTags.length > 0 ? (
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {shownTags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={href(section, { tag })}
              className="font-mono text-[12px] text-fg-faint hover:text-fg data-[active=true]:text-fg"
              data-active={active.tag === tag}
            >
              #{tag}
              <span className="ml-1 opacity-70">{count}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
