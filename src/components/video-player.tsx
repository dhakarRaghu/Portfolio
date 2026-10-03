"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import type { Chapter } from "@/lib/videos";

type VideoPlayerProps = {
  title: string;
  youtube?: string;
  thumbnail?: string;
  chapters: Chapter[];
};

/**
 * A YouTube player that loads only when the reader presses play, from the
 * no-cookie domain. Until then it is a still image, so the page stays light.
 * Each chapter starts the player at its time.
 */
export function VideoPlayer({ title, youtube, thumbnail, chapters }: VideoPlayerProps) {
  const [start, setStart] = useState<number | null>(null);

  const src = youtube
    ? `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0&start=${start ?? 0}`
    : undefined;

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-bg-subtle">
        {src && start !== null ? (
          <iframe
            key={start}
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {thumbnail ? (
              <Image src={thumbnail} alt="" fill sizes="(min-width: 768px) 52rem, 100vw" className="object-cover" priority />
            ) : null}
            {youtube ? (
              <button
                type="button"
                onClick={() => setStart(0)}
                aria-label={`Play: ${title}`}
                className="group absolute inset-0 grid place-items-center bg-black/10 transition-colors hover:bg-black/20"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-fg/90 text-bg shadow-lg transition-transform group-hover:scale-105">
                  <Play aria-hidden className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
                </span>
              </button>
            ) : (
              <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                <span className="rounded-full bg-fg px-3 py-1 font-mono text-[12px] text-bg">Coming soon on YouTube</span>
              </div>
            )}
          </>
        )}
      </div>

      {chapters.length ? (
        <section aria-labelledby="chapters" className="mt-6">
          <h2 id="chapters" className="label">
            Chapters
          </h2>
          <ol className="mt-2 divide-y divide-line rounded-lg border border-line bg-surface">
            {chapters.map((chapter) => (
              <li key={chapter.at}>
                <button
                  type="button"
                  disabled={!youtube}
                  onClick={() => setStart(chapter.seconds)}
                  className="flex w-full items-baseline gap-4 px-4 py-2.5 text-left text-[15px] text-fg transition-colors enabled:hover:bg-bg-subtle disabled:cursor-default"
                >
                  <span className="w-14 shrink-0 font-mono text-[13px] text-accent">{chapter.at}</span>
                  <span>{chapter.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
