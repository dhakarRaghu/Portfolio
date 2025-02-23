"use client"; // Mark as Client Component for framer-motion animations

import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

// Define Timeline Entry interface
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Define props for PinnedTimeline component
interface PinnedTimelineProps {
  data: TimelineEntry[];
}

// PinnedTimeline Component
export function PinnedTimeline({ data }: PinnedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const numItems = data.length;

  // Define scroll ranges for each item
  const ranges = useMemo(() => {
    return data.map((_, i) => {
      const start = i / numItems;
      const end = (i + 1) / numItems;
      return { start, end };
    });
  }, [data, numItems]);

  // Animation variants for full section slide
  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${numItems * 100}vh` }} // Total height for scrolling through all items
      className="relative w-full bg-neutral-800"
    >
      <motion.div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-neutral-700 -translate-x-1/2" />
        <AnimatePresence mode="wait">
          {data.map((entry, i) => {
            const { start, end } = ranges[i];
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

            return (
              <motion.div
                key={i}
                style={{ opacity }}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full max-w-4xl px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-10 h-[60vh]"
              >
                {/* Left Side: Title */}
                <div className="space-y-4 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">{entry.title}</h3>
                </div>
                {/* Right Side: Content */}
                <div className="bg-neutral-900 p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-neutral-700 flex flex-col justify-center">
                  {entry.content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Define props for Experience component
interface ExperienceProps {
  className?: string;
}

// Experience Component
export default function Experience({ className }: ExperienceProps) {
  const experienceData: TimelineEntry[] = [
    {
      title: "Present - Joplin Open Source Project",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base font-normal text-gray-300">
            Contributed to the development of the Joplin open-source note-taking application, showcasing proficiency in debugging and cross-platform development.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
            <li>Fixed UI bugs and implemented new markdown rendering features.</li>
            <li>Collaborated with maintainers to improve plugin architecture.</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">JavaScript</span>
            <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">React</span>
            <span className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">Electron</span>
          </div>
        </div>
      ),
    },
    {
      title: "Class Representative (CR)",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base font-normal text-gray-300">
            Served as Class Representative, bridging communication between faculty and students.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
            <li>Organized group study sessions and events.</li>
            <li>Coordinated feedback and announcements with professors.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Orator Club Member",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base font-normal text-gray-300">
            Enhanced public speaking and debate skills through weekly sessions, competitions, and workshops.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
            <li>Conducted debate and extempore sessions.</li>
            <li>Participated in inter-college public speaking contests.</li>
            <li>Led workshops to improve speech delivery and confidence.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className={cn("bg-neutral-800 text-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Experience & Contributions</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <PinnedTimeline data={experienceData} />
    </section>
  );
};