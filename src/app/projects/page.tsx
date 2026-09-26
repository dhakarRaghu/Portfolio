import type { Metadata } from "next";
import Image from "next/image";
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

function Links({ project }: { project: Entry }) {
  if (!project.link && !project.repo) return null;
  return (
    <p className="flex flex-wrap gap-2">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-secondary h-9 px-3.5 text-[13px]">
          Visit
          <ArrowUpRight aria-hidden strokeWidth={1.8} />
        </a>
      ) : null}
      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-secondary h-9 px-3.5 text-[13px]">
          <Github aria-hidden strokeWidth={1.8} />
          Source
        </a>
      ) : null}
    </p>
  );
}

/** A large card for a featured project: text on the left, details below. */
function FeaturedCard({ project }: { project: Entry }) {
  return (
    <article id={project.slug} className="card scroll-mt-24 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="font-heading text-[26px] font-semibold leading-tight text-fg">{project.title}</h2>
        <Status status={project.status} />
      </div>
      <p className="mt-1.5 flex flex-wrap gap-x-3 text-[13px] text-fg-muted">
        {project.period ? <span>{project.period}</span> : null}
        {project.role ? <span>· {project.role}</span> : null}
      </p>
      {project.summary ? (
        <p className="mt-4 max-w-[70ch] text-[16px] leading-relaxed text-fg">{project.summary}</p>
      ) : null}
      {project.body ? (
        <Prose markdown={project.body} className="prose-sm mt-4 max-w-[70ch]" />
      ) : null}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </p>
        <Links project={project} />
      </div>
    </article>
  );
}

/** A compact card for earlier projects: screenshot on top, then text. */
function CompactCard({ project }: { project: Entry }) {
  return (
    <article id={project.slug} className="card flex scroll-mt-24 flex-col overflow-hidden p-0">
      {project.image ? (
        <div className="border-b border-line bg-bg-subtle">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={800}
            height={500}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-heading text-[19px] font-semibold leading-tight text-fg">{project.title}</h3>
          <Status status={project.status} />
        </div>
        {project.summary ? (
          <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{project.summary}</p>
        ) : null}
        <p className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </p>
        <div className="mt-auto pt-5">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsPage() {
  const projects = await listEntries("projects");
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <>
      <PageHeader title="Projects" count={projects.length} blurb={sections.projects.blurb} />
      <div className="shell space-y-14">
        {projects.length === 0 ? <EmptyState text="No project is published yet." /> : null}

        {featured.length > 0 ? (
          <section aria-label="Current projects" className="space-y-4">
            {featured.map((p) => (
              <FeaturedCard key={p.slug} project={p} />
            ))}
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section aria-labelledby="earlier">
            <h2 id="earlier" className="font-heading text-[22px] font-semibold text-fg">
              Earlier
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <CompactCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
