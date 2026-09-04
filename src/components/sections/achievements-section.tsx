import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { education, highlights, ratings } from "@/lib/content";

export function AchievementsSection() {
  return (
    <section id="achievements" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        index="05"
        title="Competitive programming"
        description="Ratings and contest results from regular competitive programming."
      />

      <div className="grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3">
        {ratings.map((item, index) => (
          <Reveal key={item.platform} delay={index * 80} className="bg-bg">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col p-6 transition-colors hover:bg-bg-subtle"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="label">{item.platform}</span>
                <ArrowUpRight
                  className="h-4 w-4 text-fg-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                  strokeWidth={1.7}
                />
              </div>
              <p className="mt-5 font-serif text-[40px] leading-none tracking-tight text-fg">
                {item.rating}
              </p>
              <p className="mt-2 text-[14px] text-fg">{item.badge}</p>
              <p className="mt-1 text-[13px] leading-snug text-fg-muted">
                {item.note}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <h3 className="label">Highlights &amp; leadership</h3>
          <ul className="mt-5 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="relative pl-5 text-[14.5px] leading-[1.7] text-fg-muted"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-line-strong"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="md:col-span-5">
          <h3 className="label">Education</h3>
          <div className="mt-5 rounded border border-line p-6">
            <p className="font-serif text-[19px] leading-snug text-fg">
              {education.institute}
            </p>
            <p className="mt-2 text-[14px] leading-snug text-fg-muted">
              {education.degree}
            </p>
            <dl className="mt-5 space-y-2 border-t border-line pt-4">
              <div className="flex justify-between gap-4">
                <dt className="label">Period</dt>
                <dd className="text-[13px] text-fg">{education.period}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label">GPA</dt>
                <dd className="text-[13px] text-fg">{education.gpa}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label">Location</dt>
                <dd className="text-[13px] text-fg">{education.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
