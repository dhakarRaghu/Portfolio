import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/prose";
import { listEntries, type Entry } from "@/lib/posts";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.projects.label,
  description: sections.projects.blurb,
  alternates: { canonical: "/projects" },
};

function ProjectCard({ project }: { project: Entry }) {
  return (
    <article
      id={project.slug}
      className="grid gap-6 border-t border-line py-10 md:grid-cols-[1fr_16rem] md:gap-10"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="font-heading font-semibold text-[26px] leading-tight text-fg">{project.title}</h2>
          {project.status ? <span className="chip">{project.status}</span> : null}
        </div>
        <p className="mt-1.5 flex flex-wrap gap-x-3 text-[13px] text-fg-muted">
          {project.period ? <span>{project.period}</span> : null}
          {project.role ? <span>{project.role}</span> : null}
        </p>
        {project.summary ? (
          <p className="mt-4 text-[16px] leading-relaxed text-fg">{project.summary}</p>
        ) : null}
        {project.metric ? (
          <p className="mt-3 border-l-2 border-line-strong pl-3 text-[14px] text-fg-muted">
            {project.metric}
          </p>
        ) : null}
        {project.body ? <Prose markdown={project.body} className="mt-4 text-[15px]" /> : null}
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer" className="link">
              Visit
              <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" strokeWidth={1.7} />
            </a>
          ) : null}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer" className="link">
              <Github className="mr-1 inline h-3.5 w-3.5" strokeWidth={1.7} />
              Source
            </a>
          ) : null}
        </p>
        {project.tags.length > 0 ? (
          <p className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </p>
        ) : null}
      </div>
      {project.image ? (
        <div className="overflow-hidden rounded-md border border-line bg-bg-subtle">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={640}
            height={400}
            sizes="(min-width: 768px) 256px, 100vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      ) : null}
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
      <div className="shell">
        {projects.length === 0 ? (
          <p className="py-6 text-[15px] text-fg-muted">No project is published yet.</p>
        ) : null}
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        {rest.length > 0 ? (
          <>
            <h2 className="label mt-14">Earlier</h2>
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
