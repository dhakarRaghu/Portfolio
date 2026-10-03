import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Folder } from "lucide-react";

import { EmptyState } from "@/components/entry-list";
import { PageHeader } from "@/components/page-header";
import { formatTotal, listVideos, playlists, type Video } from "@/lib/videos";

const blurb =
  "Lessons I made as videos. Each playlist is one course, and each video teaches one topic concept by concept.";

export const metadata: Metadata = {
  title: "Videos",
  description: blurb,
  alternates: { canonical: "/videos" },
};

/** Up to three thumbnails, stacked like papers in a folder. */
function Stack({ videos }: { videos: Video[] }) {
  const shown = videos.filter((v) => v.thumbnail).slice(0, 3);
  return (
    <div className="relative aspect-video">
      {shown
        .slice()
        .reverse()
        .map((video, i, list) => {
          const depth = list.length - 1 - i;
          return (
            <div
              key={video.slug}
              className="absolute inset-0 overflow-hidden rounded-md border border-line bg-bg-subtle shadow-sm"
              style={{ transform: `translate(${depth * 10}px, ${-depth * 10}px) scale(${1 - depth * 0.04})`, transformOrigin: "bottom left" }}
            >
              <Image src={video.thumbnail!} alt="" fill sizes="(min-width: 768px) 24rem, 90vw" className="object-cover" />
            </div>
          );
        })}
    </div>
  );
}

export default async function VideosPage() {
  const videos = await listVideos();
  const folders = playlists
    .map((playlist) => ({ playlist, items: videos.filter((v) => v.playlist === playlist.slug) }))
    .filter((f) => f.items.length);

  return (
    <>
      <PageHeader title="Videos" count={videos.length} blurb={blurb} />
      <section className="shell pb-16">
        {folders.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map(({ playlist, items }) => (
              <li key={playlist.slug}>
                <Link href={`/videos/playlist/${playlist.slug}`} className="card group h-full !p-4">
                  <div className="pr-5 pt-5">
                    <Stack videos={items} />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-fg-muted">
                    <Folder aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                    <span className="font-mono text-[12px]">
                      {items.length} {items.length === 1 ? "video" : "videos"} · {formatTotal(items.reduce((t, v) => t + v.seconds, 0))}
                    </span>
                  </div>
                  <h2 className="mt-1.5 font-heading text-[19px] font-semibold leading-snug text-fg group-hover:text-accent">
                    {playlist.title}
                  </h2>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-fg-muted">{playlist.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState text="No videos yet." />
        )}
      </section>
    </>
  );
}
