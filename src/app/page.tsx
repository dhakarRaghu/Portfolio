import Image from "next/image";
import Link from "next/link";

import { EntryList } from "@/components/entry-list";
import { profile } from "@/lib/content";
import { listEntries } from "@/lib/posts";
import { contacts } from "@/lib/site";

export default async function HomePage() {
  const [blog, notes, projects] = await Promise.all([
    listEntries("blog"),
    listEntries("notes"),
    listEntries("projects"),
  ]);
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <>
      <section className="shell pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="min-w-0 md:col-span-8">
            <p className="label">{profile.name}</p>
            <h1 className="mt-3 max-w-[22ch] font-heading text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-fg sm:text-[38px] lg:text-[46px]">
              Software engineer, working on backend systems and applied AI.
            </h1>

            <div className="mt-7 max-w-[68ch] space-y-4 text-[16px] leading-[1.75] text-fg lg:text-[17px]">
              <p>
                I work at{" "}
                <a href="https://juspay.io/" target="_blank" rel="noreferrer" className="link">
                  Juspay
                </a>{" "}
                in Bengaluru on BreezeBuddy.ai, a conversational AI product. I built its
                chatbot-to-human handoff and the guardrail layer that checks every voice and
                text reply before a customer sees it.
              </p>
              <p>
                On the side, I am building{" "}
                <Link href="/projects#mission-hq" className="link">
                  Mission HQ
                </Link>
                , a multi-agent system that runs on my own laptop. Its agents study with me,
                write my daily note and draft what I publish here. Nothing leaves the machine
                without my approval.
              </p>
              <p>
                Before Juspay, I interned at{" "}
                <a href="https://www.mindtickle.com/" target="_blank" rel="noreferrer" className="link">
                  Mindtickle
                </a>
                , where my voice platform service took new voices live in 25+ languages without
                a deploy. Alongside that, I co-founded{" "}
                <a href="https://verlyai.xyz" target="_blank" rel="noreferrer" className="link">
                  Verly
                </a>{" "}
                and built its AI support agents in Go.
              </p>
              <p>
                Here I write about how LLM systems behave in production: inference, retrieval,
                agents and evals. The longer story is on the{" "}
                <Link href="/about" className="link">
                  About
                </Link>{" "}
                page.
              </p>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[260px] md:col-span-4 md:mt-1 md:max-w-none">
            <div className="overflow-hidden rounded-lg border border-line bg-bg-subtle">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={922}
                height={1232}
                priority
                sizes="(min-width: 1280px) 380px, (min-width: 768px) 30vw, 260px"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <figcaption className="label mt-3 text-right">{profile.location}</figcaption>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
              {contacts.map((c) => (
                <div key={c.label} className="min-w-0">
                  <dt className="label">{c.label}</dt>
                  <dd className="mt-0.5 text-[14px]">
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="quiet break-all text-fg"
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </section>

      <section className="shell grid gap-14 lg:grid-cols-2 lg:gap-16" aria-label="Recent">
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-[22px] font-semibold text-fg">Blog</h2>
            <Link href="/blog" className="text-[13.5px] text-fg-muted hover:text-fg">
              All posts →
            </Link>
          </div>
          <EntryList
            entries={blog.slice(0, 5)}
            summaries={false}
            emptyText="The first post is being written."
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-[22px] font-semibold text-fg">Notes</h2>
            <Link href="/notes" className="text-[13.5px] text-fg-muted hover:text-fg">
              All notes →
            </Link>
          </div>
          <EntryList
            entries={notes.slice(0, 6)}
            summaries={false}
            emptyText="The first note is being written."
          />
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="shell mt-20" aria-labelledby="home-projects">
          <div className="flex items-baseline justify-between">
            <h2 id="home-projects" className="font-heading text-[22px] font-semibold text-fg">
              Projects
            </h2>
            <Link href="/projects" className="text-[13.5px] text-fg-muted hover:text-fg">
              All projects →
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects#${p.slug}`} className="card h-full">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-heading text-[19px] font-semibold text-fg">{p.title}</span>
                    {p.status ? <span className="label">{p.status}</span> : null}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
