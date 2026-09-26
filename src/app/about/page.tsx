import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { education, experience, highlights, profile, ratings } from "@/lib/content";
import { contacts } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, what I am doing now, and where I have worked. The résumé lives here so the rest of the site can be about the work.",
  alternates: { canonical: "/about" },
};

const rowClass = "grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-8";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        blurb="Who I am, what I am doing now, and where I have worked."
      />

      <div className="shell grid gap-12 md:grid-cols-[1fr_16rem] md:gap-16 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-16">
          <section className="max-w-[68ch] space-y-4 text-[16.5px] leading-[1.75] text-fg">
            <p>
              I am {profile.name}, a software engineer working on backend systems and applied
              AI. Currently, I work at{" "}
              <a href="https://juspay.io/" target="_blank" rel="noreferrer" className="link">
                {profile.company}
              </a>{" "}
              in {profile.location}, on BreezeBuddy.ai, a conversational AI product. I
              built its chatbot-to-human handoff, which moves a conversation to a live agent with
              the full context intact, and its guardrail layer, which checks every voice and text
              reply for prompt injection, toxicity, policy violations and off-topic answers, with
              rules each tenant can set without a code change.
            </p>
            <p>
              On the side, I am building{" "}
              <Link href="/projects#mission-hq" className="link">
                Mission HQ
              </Link>
              , a self-hosted multi-agent system that runs for me. Its agents share one
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
              .
            </p>
            <p className="text-fg-muted">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="link">
                Résumé as PDF
                <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5" strokeWidth={1.7} />
              </a>
            </p>
          </section>

          <section aria-labelledby="experience">
            <h2 id="experience" className="font-heading text-[26px] font-semibold text-fg">
              Experience
            </h2>
            <ol className="mt-4 divide-y divide-line border-t border-line">
              {experience.map((role) => (
                <li key={role.company + role.period} className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold leading-tight text-fg">
                      {role.companyUrl ? (
                        <a href={role.companyUrl} target="_blank" rel="noreferrer" className="quiet">
                          {role.company}
                        </a>
                      ) : (
                        role.company
                      )}
                    </h3>
                    <p className="label mt-2">{role.period}</p>
                    <p className="mt-1 text-[13px] text-fg-muted">{role.location}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[17px] font-medium text-fg">{role.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{role.summary}</p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-fg">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {role.metrics ? (
                      <dl className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
                        {role.metrics.map((metric) => (
                          <div key={metric.label} className="bg-surface px-4 py-3">
                            <dt className="label">{metric.label}</dt>
                            <dd className="mt-1 font-heading text-[22px] font-semibold leading-none text-fg">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    <p className="mt-3 flex flex-wrap gap-2">
                      {role.stack.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="selected-projects">
            <h2 id="selected-projects" className="font-heading text-[26px] font-semibold text-fg">
              Projects
            </h2>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              <li className={rowClass}>
                <h3 className="font-heading text-[17px] font-semibold text-fg">
                  <a href="https://verlyai.xyz" target="_blank" rel="noreferrer" className="quiet">
                    Verly
                  </a>
                </h3>
                <p className="text-[15px] leading-relaxed text-fg-muted">
                  Co-founder, Nov 2025 to May 2026. An AI customer support platform across web
                  chat, WhatsApp and voice. I built the agent stack in Go: graph-based RAG,
                  identity verification, per-tenant tools through custom MCP servers, and the
                  analytics layer.
                </p>
              </li>
              <li className={rowClass}>
                <h3 className="font-heading text-[17px] font-semibold text-fg">
                  <Link href="/projects#mission-hq" className="quiet">
                    Mission HQ
                  </Link>
                </h3>
                <p className="text-[15px] leading-relaxed text-fg-muted">
                  A self-hosted multi-agent system: Python, DBOS, Pydantic AI, FastAPI, Telegram,
                  a Next.js console. Every outward action stops for my approval.
                </p>
              </li>
              <li className={rowClass}>
                <h3 className="font-heading text-[17px] font-semibold text-fg">
                  <Link href="/projects#insights" className="quiet">
                    Insights
                  </Link>
                </h3>
                <p className="text-[15px] leading-relaxed text-fg-muted">
                  An AI learning platform that has generated 100+ courses, with a Gemini content
                  pipeline and a quiz system for assessment.
                </p>
              </li>
            </ul>
            <p className="mt-3 text-[14px]">
              <Link href="/projects" className="link">
                All projects
              </Link>
            </p>
          </section>

          <section aria-labelledby="education">
            <h2 id="education" className="font-heading text-[26px] font-semibold text-fg">
              Education
            </h2>
            <div className="mt-4 grid gap-2 border-t border-line py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <p className="label">{education.period}</p>
              <div>
                <p className="text-[17px] text-fg">{education.degree}</p>
                <p className="mt-1 text-[15px] text-fg-muted">
                  {education.institute}, {education.location}. GPA {education.gpa}.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cp">
            <h2 id="cp" className="font-heading text-[26px] font-semibold text-fg">
              Competitive programming
            </h2>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-fg-muted">
              Contest ratings, linked to the profiles.
            </p>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {ratings.map((r) => (
                <li key={r.platform} className="bg-surface px-5 py-4">
                  <a href={r.href} target="_blank" rel="noreferrer" className="quiet text-[15px] text-fg">
                    {r.platform}
                  </a>
                  <p className="mt-1 font-heading text-[26px] font-semibold leading-none text-fg">{r.rating}</p>
                  <p className="mt-1.5 text-[13px] text-fg-muted">
                    {r.badge}. {r.note}.
                  </p>
                </li>
              ))}
            </ul>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-fg-muted">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="order-first md:order-none">
          <div className="md:sticky md:top-20">
            <div className="mx-auto max-w-[240px] overflow-hidden rounded-lg border border-line bg-bg-subtle md:mx-0 md:max-w-none">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={922}
                height={1232}
                priority
                sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 240px"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
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
          </div>
        </aside>
      </div>
    </>
  );
}
