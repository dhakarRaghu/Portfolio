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

/** Name, photo and one line, under the title: who wrote this. */
function Byline({ project }: { project?: Entry }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <Image
        src={site.portrait}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
      <div className="min-w-0 text-[14px] leading-snug">
        <Link href="/about" className="font-semibold text-fg hover:text-accent">
          {site.name}
        </Link>
        <p className="text-fg-muted">
          {project ? (
            <>
              From my work on{" "}
              <Link href={`/projects#${project.slug}`} className="link">
                {project.title}
              </Link>
            </>
          ) : (
            site.tagline
          )}
        </p>
      </div>
    </div>
  );
}

/** The right rail on wide screens: a short bio, then the contents. */
function AboutCard() {
  return (
    <div className="rounded-md border border-line bg-surface p-4 text-[13.5px] leading-relaxed text-fg-muted">
      <p>
        I am a software engineer in Bengaluru. I build backend systems and applied AI: agents,
        retrieval, guardrails and evals.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
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
    <article className="shell pt-10 md:pt-14">
      <div className="mx-auto max-w-[44rem]">
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
              <Link href={`/${entry.section}?category=${entry.category}`} className="hover:text-fg">
                {category}
              </Link>
            </>
          ) : null}
        </nav>

        <h1 className="mt-5 font-heading font-semibold text-[34px] leading-[1.12] tracking-[-0.015em] text-fg md:text-[44px]">
          {entry.title}
        </h1>

        {dek ? <p className="mt-4 text-[18px] leading-relaxed text-fg-muted">{dek}</p> : null}

        <p className="mt-5 flex flex-wrap items-center gap-2">
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

        {entry.section === "blog" ? <Byline project={project} /> : null}

        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-fg-muted">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          {entry.updated ? <span>updated {formatDate(entry.updated)}</span> : null}
          <span aria-hidden>·</span>
          <span>{entry.minutes} min read</span>
          {entry.draft ? (
            <>
              <span aria-hidden>·</span>
              <span className="text-accent">draft, not published</span>
            </>
          ) : null}
        </p>

        {entry.source ? (
          <p className="mt-5 border-l-2 border-line-strong pl-4 text-[14px] text-fg-muted">
            Source:{" "}
            <a href={entry.source} target="_blank" rel="noreferrer" className="link">
              {entry.sourceTitle ?? entry.source}
              <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" strokeWidth={1.7} />
            </a>
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-10 grid max-w-[44rem] gap-10 xl:max-w-none xl:grid-cols-[1fr_44rem_1fr]">
        <div className="hidden xl:block" />
        <div className="min-w-0">
          <Prose markdown={entry.body} />
        </div>
        <aside className="hidden xl:block">
          <div className="sticky top-20 max-w-[18rem] space-y-8 pl-6">
            {entry.section === "blog" ? <AboutCard /> : null}
            <Toc items={toc} />
          </div>
        </aside>
      </div>

      <footer className="mx-auto mt-16 max-w-[44rem]">
        <div className="rounded-md border border-line bg-surface p-5">
          <p className="text-[15px] leading-relaxed text-fg">
            I am {site.name}, a software engineer in Bengaluru working on backend systems and
            applied AI. If something here is wrong, tell me on{" "}
            <a href={site.x} target="_blank" rel="noreferrer" className="link">
              X
            </a>{" "}
            or by{" "}
            <a href={`mailto:${site.email}`} className="link">
              email
            </a>
            . Happy to help if you are working on the same problem.
          </p>
        </div>

        {more.length > 0 ? (
          <section className="mt-12">
            <h2 className="label">More {section.label.toLowerCase()} like this</h2>
            <EntryList entries={more} summaries={false} />
          </section>
        ) : null}
      </footer>
    </article>
  );
}
