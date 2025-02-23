"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Our data structure for each timeline entry */
export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

/**
 * A pinned, scrollytelling-style timeline component.
 * - The entire timeline is pinned for N "screenfuls," where N = the number of items.
 * - Each item fades in/out as you scroll, so that only one is displayed at a time.
 * - The user can't proceed past this section until they've scrolled through all items.
 */
export function PinnedTimeline({ data }: { data: TimelineEntry[] }) {
  // Container that holds the entire timeline (including the pinned space)
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress from 0 -> 1 over the entire pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" => when top of container hits top of viewport
    // "end end" => when bottom of container hits bottom of viewport
    offset: ["start start", "end end"],
  });

  // We want the pinned container to occupy one full "screen" per timeline entry.
  // e.g. if we have 3 entries, total pinned height ~ 3 x 100vh.
  const numItems = data.length;

  // Build an array of [start, end] for each item’s “active” range
  // so that item i is fully visible from i*(1/numItems) -> (i+1)*(1/numItems).
  const ranges = useMemo(() => {
    return data.map((_, i) => {
      const start = i / numItems;
      const end = (i + 1) / numItems;
      return { start, end };
    });
  }, [data, numItems]);

  return (
    <div
      ref={containerRef}
      /** 
       * This container is tall enough to allow scrolling through all items.
       * Example: 100vh * number of items. Adjust as needed.
       */
      style={{ height: `${numItems * 100}vh` }}
      className="relative w-full bg-neutral-900 overflow-hidden"
    >
      {/** 
       * The pinned area that stays fixed while we scroll through the timeline.
       * top-0 => pinned to top. h-screen => full viewport height.
       */}
      <motion.div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Timeline "line" in background (optional) */}
        <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-neutral-700 -translate-x-1/2" />

        {data.map((entry, i) => {
          // For each item, we define an opacity based on the scroll progress
          // from the “start” to “end” range for that item
          const { start, end } = ranges[i];

          // Animate item i’s opacity from 0 -> 1 in the middle of its range
          const opacity = useTransform(
            scrollYProgress,
            [start, start + 0.1, end - 0.1, end],
            [0, 1, 1, 0]
          );

          // Optionally scale or slide them if you want
          const y = useTransform(
            scrollYProgress,
            [start, end],
            ["20%", "-20%"] // item moves upward as we scroll
          );

          return (
            <motion.div
              key={i}
              style={{
                opacity,
                y,
                pointerEvents: "none", // so only top item can be hovered/clicked
              }}
              className="absolute w-full max-w-4xl px-4 md:px-8 lg:px-10"
            >
              {/* 
                A simple layout for title + content
                You can style it however you want 
              */}
              <h3 className="text-xl md:text-3xl font-bold text-white mb-4 text-center">
                {entry.title}
              </h3>
              <div className="bg-neutral-800 text-gray-300 p-6 rounded-xl mx-auto max-w-2xl">
                {entry.content}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
