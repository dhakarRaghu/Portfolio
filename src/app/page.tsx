import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
                Currently, I work at{" "}
                <a href="https://juspay.io/" target="_blank" rel="noreferrer" className="link">
                  Juspay
                </a>{" "}
                in Bengaluru, on BreezeBuddy.ai, a conversational AI product. I built its
                chatbot-to-human handoff, which moves a conversation to a live agent with the full
                context intact, and its guardrail layer, which checks every voice and text reply
                for prompt injection, toxicity, policy violations and off-topic answers, with
                rules each tenant can set without a code change.
              </p>
              <p>
                On the side, I am building{" "}
                <Link href="/projects#mission-hq" className="link">
                  Mission HQ
                </Link>
                , a self-hosted multi-agent system that runs on my own laptop. Its agents share one
                task board and one markdown vault. They study with me, write my daily note, and
                draft what I publish here. Nothing leaves the machine without my approval. It is
                where I test what I read about agents against something that actually runs.
              </p>
              <p>
                Before Juspay, I interned at{" "}
                <a href="https://www.mindtickle.com/" target="_blank" rel="noreferrer" className="link">
                  Mindtickle
                </a>{" "}
                on AI and backend systems. I shipped LanguageAndVoiceService, a Go gRPC service
                that moved voice configuration out of code and into the database, so new voices
                and languages went live without a deploy, across 25+ languages and 800+ voices. I
                also built the voice lifecycle pipeline with ElevenLabs and the evaluation pipeline
                for AI roleplay with Maxim.
              </p>
              <p>
                Alongside that, I co-founded and built{" "}
                <a href="https://verlyai.xyz" target="_blank" rel="noreferrer" className="link">
                  Verly
                </a>
                , an AI customer support platform for businesses across web chat, WhatsApp and
                voice. I built the agent stack in Go: a graph-based RAG pipeline, identity
                verification, and per-tenant tool access through custom MCP servers, plus the
                analytics layer that showed us where conversations failed.
              </p>
              <p>
                I am going deep on how LLM systems behave in production: inference, retrieval,
                agents, and evals. I test what I read with small labs before I believe it, and I
                write up what I find in the{" "}
                <Link href="/blog" className="link">
                  blog
                </Link>{" "}
                and in short{" "}
                <Link href="/notes" className="link">
                  notes
                </Link>
                .
              </p>
              <p>
                I studied computer science at IIIT Nagpur, where I spent a lot of my time on
                competitive programming:{" "}
                <a href="https://codeforces.com/profile/00.ghost" target="_blank" rel="noreferrer" className="link">
                  Expert on Codeforces
                </a>
                ,{" "}
                <a href="https://leetcode.com/u/cGJXZbKT0C/" target="_blank" rel="noreferrer" className="link">
                  Guardian on LeetCode
                </a>{" "}
                and{" "}
                <a href="https://www.codechef.com/users/raghvendra_04" target="_blank" rel="noreferrer" className="link">
                  4-star on CodeChef
                </a>
                . My full experience and résumé are on the{" "}
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
            <Link href="/about" className="btn btn-primary mt-6">
              More about me
              <ArrowRight aria-hidden strokeWidth={1.8} />
            </Link>
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
