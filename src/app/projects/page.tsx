import type { Metadata } from "next";
import { ArrowUpRight, Github } from "lucide-react";

import { EmptyState } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/prose";
import { listEntries, type Entry } from "@/lib/posts";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.projects.label,
  description: sections.projects.blurb,
  alternates: { canonical: "/projects" },
};

const statusTone: Record<NonNullable<Entry["status"]>, string> = {
  active: "bg-[oklch(0.72_0.15_150)]",
  shipped: "bg-accent",
  archived: "bg-fg-faint",
};

function Status({ status }: { status: Entry["status"] }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${statusTone[status]}`} />
      {status}
    </span>
  );
}

/** Small text links: the product and the code. */
function Links({ project }: { project: Entry }) {
  if (!project.link && !project.repo) return null;
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-0.5">
          Visit
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>
      ) : null}
      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
          <Github aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
          Source
        </a>
      ) : null}
    </p>
  );
}

/**
 * One project as a row, like a blog row: dates on the left, then the name,
 * one line of what it is, the stack, and the links. The longer story opens
 * under "What I built".
 */
function ProjectRow({ project }: { project: Entry }) {
  return (
    <li id={project.slug} className="scroll-mt-24 border-b border-line py-5 last:border-b-0">
      <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
        <p className="label whitespace-nowrap pt-[6px]">{project.period ?? project.date.slice(0, 4)}</p>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="font-heading text-[19px] font-semibold leading-snug text-fg">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <Status status={project.status} />
            {project.role ? <span className="text-[13.5px] text-fg-muted">{project.role}</span> : null}
            <Links project={project} />
          </div>
          {project.summary ? (
            <p className="mt-1.5 max-w-[48rem] text-[16px] leading-relaxed text-fg-muted">
              {project.summary}
            </p>
          ) : null}
          <p className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </p>
          {project.body ? (
            <details className="group mt-3 max-w-[48rem]">
              <summary className="cursor-pointer text-[14px] font-semibold text-fg hover:text-accent">
                What I built
              </summary>
              <Prose markdown={project.body} className="prose-sm mt-2" />
            </details>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default async function ProjectsPage() {
  const projects = await listEntries("projects");
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <>
      <PageHeader title="Projects" count={projects.length} blurb={sections.projects.blurb} />
      <div className="shell space-y-8 pb-4">
        {projects.length === 0 ? <EmptyState text="No project is published yet." /> : null}

        {featured.length > 0 ? (
          <section aria-labelledby="current">
            <h2
              id="current"
              className="flex items-baseline gap-2 border-b border-line pb-2 font-heading text-[20px] font-semibold text-fg"
            >
              Current
              <span className="font-mono text-[12px] font-normal text-fg-faint">({featured.length})</span>
            </h2>
            <ul>
              {featured.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </ul>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section aria-labelledby="earlier">
            <h2
              id="earlier"
              className="flex items-baseline gap-2 border-b border-line pb-2 font-heading text-[20px] font-semibold text-fg"
            >
              Earlier
              <span className="font-mono text-[12px] font-normal text-fg-faint">({rest.length})</span>
            </h2>
            <ul>
              {rest.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
