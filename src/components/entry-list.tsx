import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

/** Shown when a list has nothing in it yet. */
export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-bg-subtle px-5 py-8 text-center">
      <p className="text-[14.5px] text-fg-muted">{text}</p>
    </div>
  );
}

function Row({ entry, summary }: { entry: Entry; summary: boolean }) {
  const href = `/${entry.section}/${entry.slug}`;
  const category = categoryLabel(entry.category);
  return (
    <li>
      <Link
        href={href}
        className="group -mx-3 grid gap-1 rounded-lg px-3 py-3.5 transition-colors hover:bg-surface sm:grid-cols-[6.5rem_1fr_auto] sm:gap-6"
      >
        <time dateTime={entry.date} className="label pt-[5px]">
          {formatDate(entry.date, "short")}
          {entry.draft ? <span className="ml-2 text-accent">draft</span> : null}
        </time>
        <div className="min-w-0">
          <p className="text-[16.5px] font-medium leading-snug text-fg">{entry.title}</p>
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
        <ArrowUpRight
          aria-hidden
          className="hidden h-4 w-4 translate-y-1 text-fg-faint opacity-0 transition-opacity group-hover:opacity-100 sm:block"
          strokeWidth={1.8}
        />
      </Link>
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
    return (
      <div className="mt-4">
        <EmptyState text={emptyText} />
      </div>
    );
  }

  if (!byYear) {
    return (
      <ul className="mt-2">
        {entries.map((entry) => (
          <Row key={entry.slug} entry={entry} summary={summaries} />
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-12">
      {groupByYear(entries).map((group) => (
        <section key={group.year} aria-labelledby={`year-${group.year}`}>
          <h2
            id={`year-${group.year}`}
            className="flex items-baseline gap-3 border-b border-line pb-3 font-heading text-[22px] font-semibold text-fg"
          >
            {group.year}
            <span className="font-mono text-[12px] font-normal text-fg-faint">
              {group.entries.length}
            </span>
          </h2>
          <ul className="mt-2">
            {group.entries.map((entry) => (
              <Row key={entry.slug} entry={entry} summary={summaries} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
