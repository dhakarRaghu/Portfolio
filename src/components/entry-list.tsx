import Link from "next/link";

import { formatDate, groupByYear, type Entry } from "@/lib/posts";
import { categoryLabel } from "@/lib/site";

type EntryListProps = {
  entries: Entry[];
  /** Group under year headings. Off for short lists such as the home page. */
  byYear?: boolean;
  /** Show the one-line summary under the title. */
  summaries?: boolean;
  emptyText?: string;
};

function Row({ entry, summary }: { entry: Entry; summary: boolean }) {
  const href = `/${entry.section}/${entry.slug}`;
  const category = categoryLabel(entry.category);
  return (
    <li className="grid gap-1 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
      <time dateTime={entry.date} className="label pt-[5px]">
        {formatDate(entry.date, "short")}
        {entry.draft ? <span className="ml-2 text-accent">draft</span> : null}
      </time>
      <div className="min-w-0">
        <Link href={href} className="quiet text-[16.5px] leading-snug text-fg">
          {entry.title}
        </Link>
        {summary && entry.summary ? (
          <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">{entry.summary}</p>
        ) : null}
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-fg-faint">
          {category ? <span>{category}</span> : null}
          {entry.section === "blog" ? <span>{entry.minutes} min read</span> : null}
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono">
              #{tag}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

/** Rows of entries: date on the left, title and meta on the right. */
export function EntryList({
  entries,
  byYear = false,
  summaries = true,
  emptyText = "Nothing here yet.",
}: EntryListProps) {
  if (entries.length === 0) {
    return <p className="py-6 text-[15px] text-fg-muted">{emptyText}</p>;
  }

  if (!byYear) {
    return (
      <ul className="divide-y divide-line">
        {entries.map((entry) => (
          <Row key={entry.slug} entry={entry} summary={summaries} />
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-10">
      {groupByYear(entries).map((group) => (
        <section key={group.year} aria-labelledby={`year-${group.year}`}>
          <h2
            id={`year-${group.year}`}
            className="flex items-baseline gap-3 font-heading font-semibold text-[22px] text-fg"
          >
            {group.year}
            <span className="font-mono text-[12px] text-fg-faint">{group.entries.length}</span>
          </h2>
          <ul className="mt-2 divide-y divide-line border-t border-line">
            {group.entries.map((entry) => (
              <Row key={entry.slug} entry={entry} summary={summaries} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
