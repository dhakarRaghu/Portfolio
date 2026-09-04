import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";

import { MetricRow } from "@/components/metric-row";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/lib/content";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.demo) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-[13px] text-fg transition-colors hover:text-accent"
        >
          Live site
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            strokeWidth={1.7}
          />
        </a>
      ) : null}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
        >
          <Github className="h-3.5 w-3.5" strokeWidth={1.7} />
          Source
        </a>
      ) : null}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="rounded border border-line bg-bg-subtle p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="label">Featured</p>
            <h3 className="mt-3 font-serif text-[28px] leading-tight text-fg">
              {project.name}
            </h3>
            <p className="mt-2 text-[14px] text-fg-muted">{project.kind}</p>
            {project.role ? (
              <p className="label mt-4">{project.role}</p>
            ) : null}
            {project.period ? <p className="label mt-1">{project.period}</p> : null}
          </div>

          <div className="md:col-span-8">
            <p className="text-[15px] leading-relaxed text-fg">
              {project.description}
            </p>
            <ul className="mt-5 space-y-3">
              {project.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-[14.5px] leading-[1.7] text-fg-muted"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-line-strong"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <MetricRow metrics={project.metrics} />
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span key={item} className="chip bg-bg">
                  {item}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded border border-line bg-bg transition-colors hover:border-line-strong">
        {project.image ? (
          <div className="overflow-hidden border-b border-line bg-bg-subtle">
            <Image
              src={project.image}
              alt={`${project.name} interface`}
              width={1200}
              height={750}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-[20px] leading-tight text-fg">
            {project.name}
          </h3>
          <p className="label mt-1.5">{project.kind}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
            {project.description}
          </p>

          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function WorkSection() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="work" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        index="03"
        title="Selected work"
        description="Products I designed and shipped, from AI support platforms to developer tools."
      />

      <div className="space-y-10">
        {featured.map((project) => (
          <FeaturedProject key={project.name} project={project} />
        ))}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              delay={(index % 3) * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
