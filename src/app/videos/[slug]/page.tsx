import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Prose } from "@/components/prose";
import { Toc } from "@/components/toc";
import { VideoPlayer } from "@/components/video-player";
import { extractToc, wordCount } from "@/lib/markdown";
import { formatDate } from "@/lib/posts";
import { getPlaylist, getVideo, listVideos } from "@/lib/videos";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await listVideos()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return {};
  return {
    title: video.title,
    description: video.summary,
    alternates: { canonical: `/videos/${video.slug}` },
    openGraph: {
      type: "video.other",
      title: video.title,
      description: video.summary,
      images: video.thumbnail ? [{ url: video.thumbnail, width: 1280, height: 720 }] : undefined,
    },
  };
}

export default async function VideoEntry({ params }: { params: Params }) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();
  const playlist = getPlaylist(video.playlist)!;
  const series = (await listVideos()).filter((v) => v.playlist === video.playlist);
  const index = series.findIndex((v) => v.slug === video.slug);
  const prev = series[index - 1];
  const next = series[index + 1];
  // The written lesson under the player: one entry per concept in the rail, not every step.
  const toc = extractToc(video.body).filter((item) => item.depth === 2);
  const minutes = Math.max(1, Math.round(wordCount(video.body) / 220));

  return (
    <article className="shell pb-16 pt-8 md:pt-10">
      <div className="mx-auto grid max-w-[52rem] gap-10 xl:max-w-none xl:grid-cols-[minmax(0,52rem)_15rem] xl:justify-center">
      <div className="min-w-0">
        <header>
          <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/videos" className="hover:text-fg">
              Videos
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/videos/playlist/${playlist.slug}`} className="hover:text-fg">
              {playlist.title}
            </Link>
          </nav>

          <h1 className="mt-4 font-heading text-[28px] font-semibold leading-[1.18] tracking-[-0.015em] text-fg md:text-[34px]">
            {video.title}
          </h1>

          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-fg-muted">
            {video.part ? <span>{video.part}</span> : null}
            {video.part ? <span aria-hidden>·</span> : null}
            <span>{video.duration} video</span>
            <span aria-hidden>·</span>
            <span>{minutes} min read</span>
            <span aria-hidden>·</span>
            <time dateTime={video.date}>{formatDate(video.date)}</time>
            {!video.youtube ? (
              <>
                <span aria-hidden>·</span>
                <span className="text-accent">coming soon</span>
              </>
            ) : null}
          </p>

          {video.tags.length ? (
            <p className="mt-3 flex flex-wrap gap-1.5">
              {video.tags.map((tag) => (
                <span key={tag} className="chip">
                  #{tag}
                </span>
              ))}
            </p>
          ) : null}
        </header>

        <div className="mt-6">
          <VideoPlayer title={video.title} youtube={video.youtube} thumbnail={video.thumbnail} chapters={video.chapters} />
        </div>

        {video.summary ? <p className="mt-8 text-[17px] leading-relaxed text-fg">{video.summary}</p> : null}

        {video.body ? (
          <section aria-label="The lesson in writing" className="mt-10 border-t border-line pt-8">
            <p className="label">Read it instead</p>
            <p className="mt-1 text-[15px] text-fg-muted">
              The full lesson in writing, with the diagrams from the video, for anyone who prefers to read.
            </p>
            <Prose markdown={video.body} className="mt-6" />
          </section>
        ) : null}

        {prev || next ? (
          <nav aria-label={`More in ${playlist.title}`} className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
            {prev ? (
              <Link href={`/videos/${prev.slug}`} className="card group">
                <span className="label flex items-center gap-1.5">
                  <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Previous{prev.part ? ` · ${prev.part}` : ""}
                </span>
                <span className="mt-1 block font-semibold leading-snug text-fg group-hover:text-accent">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/videos/${next.slug}`} className="card group text-right">
                <span className="label flex items-center justify-end gap-1.5">
                  Next{next.part ? ` · ${next.part}` : ""}
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
                <span className="mt-1 block font-semibold leading-snug text-fg group-hover:text-accent">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
      <aside className="hidden xl:block">
        <div className="sticky top-24">
          <Toc items={toc} />
        </div>
      </aside>
      </div>
    </article>
  );
}
