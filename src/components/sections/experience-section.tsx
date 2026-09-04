import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { MetricRow } from "@/components/metric-row";
import { experience } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        index="02"
        title="Experience"
        description="Where I have built backend services and AI infrastructure."
      />

      <div className="divide-y divide-line border-y border-line">
        {experience.map((role, index) => (
          <Reveal key={role.company} delay={index * 80}>
            <article className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-[22px] leading-tight text-fg">
                    {role.companyUrl ? (
                      <a
                        href={role.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-accent"
                      >
                        {role.company}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 self-center text-fg-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                          strokeWidth={1.7}
                        />
                      </a>
                    ) : (
                      role.company
                    )}
                  </h3>
                  {role.current ? (
                    <span className="rounded-full border border-accent/40 bg-accent-wash px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                      Now
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[14px] leading-snug text-fg-muted">
                  {role.title}
                </p>
                <p className="label mt-3">{role.period}</p>
                <p className="label mt-1">{role.location}</p>
              </div>

              <div className="md:col-span-8">
                <p className="text-[15px] leading-relaxed text-fg">
                  {role.summary}
                </p>
                <ul className="mt-5 space-y-3">
                  {role.points.map((point) => (
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
                <MetricRow metrics={role.metrics} />
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {role.stack.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
