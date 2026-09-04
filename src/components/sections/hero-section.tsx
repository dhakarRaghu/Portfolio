import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { profile, socials } from "@/lib/content";

const facts = [
  { label: "Role", value: `${profile.role} at ${profile.company}` },
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Backend systems, AI infrastructure" },
];

export function HeroSection() {
  return (
    <section id="top" className="shell pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-8">
          <Reveal>
            <p className="label flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              Currently at {profile.company}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-fg sm:text-[54px] md:text-[62px]">
              Raghvendra Singh
              <br />
              Dhakar
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-fg md:text-[18px]">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-6 max-w-prose space-y-4 text-[15px] leading-[1.75] text-fg-muted">
              {profile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded bg-fg px-4 py-2.5 text-[14px] text-bg transition-opacity hover:opacity-85"
              >
                <Mail className="h-4 w-4" strokeWidth={1.7} />
                Get in touch
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-line px-4 py-2.5 text-[14px] text-fg transition-colors hover:border-line-strong hover:bg-bg-subtle"
              >
                Read the résumé
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {socials
                .filter((item) => item.label !== "Email")
                .map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[13px] text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-fg-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                      strokeWidth={1.7}
                    />
                  </a>
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="md:col-span-4">
          <figure className="relative mx-auto w-full max-w-[260px] md:mt-2 md:max-w-none">
            <div className="overflow-hidden rounded border border-line bg-bg-subtle">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={800}
                priority
                sizes="(min-width: 768px) 320px, 260px"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="label mt-3 text-right">
              {profile.location}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={360}>
        <dl className="mt-16 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-bg px-5 py-4">
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1.5 text-[14px] leading-snug text-fg">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
