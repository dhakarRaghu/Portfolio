import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EmptyState } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { formatTotal, getPlaylist, listVideos, playlists } from "@/lib/videos";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return playlists.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const playlist = getPlaylist(slug);
  if (!playlist) return {};
  return {
    title: `${playlist.title} · Videos`,
    description: playlist.blurb,
    alternates: { canonical: `/videos/playlist/${playlist.slug}` },
  };
}

export default async function PlaylistPage({ params }: { params: Params }) {
  const { slug } = await params;
  const playlist = getPlaylist(slug);
  if (!playlist) notFound();
  const videos = (await listVideos()).filter((v) => v.playlist === slug);
  const total = videos.reduce((t, v) => t + v.seconds, 0);

  return (
    <>
      <PageHeader kicker="Playlist" title={playlist.title} count={videos.length} blurb={playlist.blurb}>
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2">
          <Link href="/videos" className="hover:text-fg">
            Videos
          </Link>
          <span aria-hidden>/</span>
          <span>{playlist.title}</span>
          <span aria-hidden>·</span>
          <span>{formatTotal(total)} in total</span>
        </nav>
      </PageHeader>

      <section className="shell pb-16">
        {videos.length ? (
          <ol className="divide-y divide-line">
            {videos.map((video, i) => (
              <li key={video.slug}>
                <Link
                  href={`/videos/${video.slug}`}
                  className="group grid gap-4 py-5 sm:grid-cols-[2rem_15rem_minmax(0,1fr)] sm:items-start"
                >
                  <span className="hidden pt-1 font-mono text-[14px] text-fg-faint sm:block">{i + 1}</span>
                  <span className="relative block aspect-video overflow-hidden rounded-md border border-line bg-bg-subtle">
                    {video.thumbnail ? (
                      <Image src={video.thumbnail} alt="" fill sizes="(min-width: 640px) 15rem, 100vw" className="object-cover" />
                    ) : null}
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-fg/85 px-1.5 py-0.5 font-mono text-[11px] text-bg">
                      {video.duration}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      {video.part ? <span className="label">{video.part}</span> : null}
                      {!video.youtube ? <span className="chip">coming soon</span> : null}
                    </span>
                    <span className="mt-1 block font-heading text-[18px] font-semibold leading-snug text-fg group-hover:text-accent">
                      {video.title}
                    </span>
                    {video.summary ? (
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-fg-muted">{video.summary}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState text="No videos in this playlist yet." />
        )}
      </section>
    </>
  );
}
