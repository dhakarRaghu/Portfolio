import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EntryList } from "@/components/entry-list";
import { Prose } from "@/components/prose";
import { Toc } from "@/components/toc";
import { extractToc } from "@/lib/markdown";
import { formatDate, listEntries, related, type Entry } from "@/lib/posts";
import { categoryLabel, sections, site } from "@/lib/site";

type EntryPageProps = {
  entry: Entry;
  /** Other entries of the same section, for the related list. */
  pool: Entry[];
};

/** A post opens with a bold "In short" paragraph when it has one. */
const IN_SHORT = /^\*\*in short\b/i;

/** Photo, name, date and reading time on one block under the title. */
function Byline({ entry, project }: { entry: Entry; project?: Entry }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={site.portrait}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 text-[13.5px] leading-snug">
        <Link href="/about" className="font-semibold text-fg hover:text-accent">
          {site.name}
        </Link>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-fg-muted">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          <span aria-hidden>·</span>
          <span>{entry.minutes} min read</span>
          {entry.updated ? (
            <>
              <span aria-hidden>·</span>
              <span>updated {formatDate(entry.updated)}</span>
            </>
          ) : null}
          {entry.draft ? (
            <>
              <span aria-hidden>·</span>
              <span className="text-accent">draft</span>
            </>
          ) : null}
        </p>
        {project ? (
          <p className="mt-0.5 text-fg-muted">
            From my work on{" "}
            <Link href={`/projects#${project.slug}`} className="link">
              {project.title}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** The right rail on wide screens: a short bio, then the contents. */
function AboutCard() {
  return (
    <div className="text-[14px] leading-relaxed text-fg-muted">
      <p className="font-semibold text-fg">{site.name}</p>
      <p className="mt-1">{site.tagline}</p>
      <p className="mt-2">
        Software engineer in Bengaluru. I build backend systems and applied AI: agents,
        retrieval, guardrails and evals.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <a href={site.x} target="_blank" rel="noreferrer" className="link">
          X
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className="link">
          GitHub
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="link">
          LinkedIn
        </a>
        <a href="/rss.xml" className="link">
          RSS
        </a>
      </p>
    </div>
  );
}

/** The full page for one post, note or paper note. */
export async function EntryPage({ entry, pool }: EntryPageProps) {
  const toc = entry.section === "blog" ? extractToc(entry.body) : [];
  const more = related(entry, pool);
  const category = categoryLabel(entry.category);
  const section = sections[entry.section];
  const project = entry.project
    ? (await listEntries("projects")).find((p) => p.slug === entry.project)
    : undefined;
  // The "In short" box already states the point; a summary above it would
  // say it twice on the first screen.
  const dek = entry.summary && !IN_SHORT.test(entry.body) ? entry.summary : "";

  return (
    <article className="shell pb-4 pt-8 md:pt-12">
      <div className="mx-auto grid max-w-[44rem] gap-12 xl:max-w-[64rem] xl:grid-cols-[minmax(0,44rem)_16rem] xl:justify-between">
        <div className="min-w-0">
          <header className="border-b border-line pb-6">
            <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href={`/${entry.section}`} className="hover:text-fg">
                {section.label}
              </Link>
              {category ? (
                <>
                  <span aria-hidden>/</span>
                  <Link
                    href={`/${entry.section}?category=${entry.category}`}
                    className="hover:text-fg"
                  >
                    {category}
                  </Link>
                </>
              ) : null}
            </nav>

            <h1 className="mt-4 font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.015em] text-fg md:text-[36px]">
              {entry.title}
            </h1>

            {dek ? (
              <p className="mt-3 text-[17px] leading-relaxed text-fg-muted">{dek}</p>
            ) : null}

            <p className="mt-4 flex flex-wrap items-center gap-2">
              {category ? (
                <Link href={`/${entry.section}?category=${entry.category}`} className="badge">
                  {category}
                </Link>
              ) : null}
              {entry.tags.map((tag) => (
                <Link key={tag} href={`/${entry.section}?tag=${tag}`} className="chip">
                  #{tag}
                </Link>
              ))}
            </p>

            <div className="mt-5">
              {entry.section === "blog" ? (
                <Byline entry={entry} project={project} />
              ) : (
                <p className="text-[13px] text-fg-muted">
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                </p>
              )}
            </div>

            {entry.source ? (
              <p className="mt-4 border-l-2 border-line-strong pl-4 text-[14px] text-fg-muted">
                Source:{" "}
                <a href={entry.source} target="_blank" rel="noreferrer" className="link">
                  {entry.sourceTitle ?? entry.source}
                  <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" strokeWidth={1.7} />
                </a>
              </p>
            ) : null}
          </header>

          <div className="mt-8">
            <Prose markdown={entry.body} />
          </div>

          <footer className="mt-14 border-t border-line pt-8">
            <p className="text-[15px] leading-relaxed text-fg-muted">
              If something here is wrong, tell me on{" "}
              <a href={site.x} target="_blank" rel="noreferrer" className="link">
                X
              </a>{" "}
              or by{" "}
              <a href={`mailto:${site.email}`} className="link">
                email
              </a>
              . I am happy to help if you work on the same problem.
            </p>

            {more.length > 0 ? (
              <section className="mt-10">
                <h2 className="label">More {section.label.toLowerCase()} like this</h2>
                <EntryList entries={more} summaries={false} />
              </section>
            ) : null}
          </footer>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-8">
            {entry.section === "blog" ? <AboutCard /> : null}
            <Toc items={toc} />
          </div>
        </aside>
      </div>
    </article>
  );
}
