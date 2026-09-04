import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { focusAreas } from "@/lib/content";

export function FocusSection() {
  return (
    <section id="focus" className="shell scroll-mt-24 py-20 md:py-24">
      <SectionHeading
        index="01"
        title="What I work on"
        description="Three areas of engineering, taken from work I have shipped."
      />

      <div className="grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-3">
        {focusAreas.map((area, index) => (
          <Reveal key={area.title} delay={index * 80} className="bg-bg">
            <div className="flex h-full flex-col p-6 md:p-7">
              <span className="label">{`0${index + 1}`}</span>
              <h3 className="mt-4 font-serif text-[21px] leading-tight text-fg">
                {area.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-fg-muted">
                {area.body}
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {area.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
