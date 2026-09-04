import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/lib/content";

export function SkillsSection() {
  return (
    <section id="skills" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        index="04"
        title="Technical toolkit"
        description="Tools I have used to build and operate systems in production."
      />

      <dl className="divide-y divide-line border-y border-line">
        {skills.map((group, index) => (
          <Reveal key={group.group} delay={index * 60}>
            <div className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
              <dt className="label md:col-span-3 md:pt-1">{group.group}</dt>
              <dd className="md:col-span-9">
                <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="text-[15px] text-fg">
                      {item}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
