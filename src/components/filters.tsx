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

/**
 * The fixed categories with their counts. Tags are reached from a post; an
 * active tag filter shows here as one chip that clears it.
 */
export function Filters({ section, categoryCounts, active, total }: FiltersProps) {
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
      {active.tag ? (
        <p className="text-[13px] text-fg-muted">
          Tagged{" "}
          <Link href={href(section, { category: active.category })} className="chip" data-active>
            #{active.tag} <span className="ml-1.5" aria-hidden>×</span>
            <span className="sr-only">Clear the tag filter</span>
          </Link>
        </p>
      ) : null}
    </div>
  );
}
