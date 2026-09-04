import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile, socials } from "@/lib/content";

export function ContactSection() {
  return (
    <section id="contact" className="shell scroll-mt-24 py-20 md:py-28">
      <SectionHeading index="06" title="Get in touch" />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="min-w-0 md:col-span-7">
          <p className="max-w-prose text-[17px] leading-relaxed text-fg">
            I am open to conversations about backend engineering and AI
            systems. Email is the fastest way to reach me.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 flex max-w-full items-baseline gap-3 font-serif text-[19px] leading-tight tracking-tight text-fg sm:text-[26px] md:text-[30px]"
          >
            <span className="min-w-0 break-all border-b border-line-strong pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
              {profile.email}
            </span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 self-center text-fg-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={1.6}
            />
          </a>

          <p className="label mt-6">{profile.phone}</p>
        </Reveal>

        <Reveal delay={80} className="min-w-0 md:col-span-5">
          <h3 className="label">Elsewhere</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="text-[14px] text-fg">{item.label}</span>
                  <span className="flex min-w-0 items-center gap-1.5 font-mono text-[12px] text-fg-muted transition-colors group-hover:text-fg">
                    <span className="truncate">{item.handle}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 text-fg-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                      strokeWidth={1.7}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
