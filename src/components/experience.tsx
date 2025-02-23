"use client"; // Mark as Client Component for framer-motion animations

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type ExperienceProps = {
  position: "left" | "right";
  date: string;
  category: string;
  title: string;
  description: string;
  points: string[];
  tags: string[];
};

const ExperienceSection: React.FC = () => {
  const experienceData = [
    {
      position: "right" as const,
      date: "2024",
      category: "Open Source",
      title: "Joplin Open Source Project",
      description:
        "Contributed to the development of the Joplin open-source project, specifically working on enhancing macOS spell-check functionality.",
      points: [
        "Showcased proficiency in debugging and cross-platform development",
        "Enhanced software maintenance practices",
        "Collaborated with the global developer community",
      ],
      tags: ["JavaScript", "React", "Electron"],
    },
    {
      position: "left" as const,
      date: "2023",
      category: "Leadership",
      title: "Committee Member at Orator Club",
      description:
        "Successfully hosted and organized MUN 23 at IIIT Nagpur, enhancing participation and engagement in public speaking events.",
      points: [
        "Event organization and management",
        "Team leadership and coordination",
        "Public speaking and presentation skills",
      ],
      tags: ["Event Management", "Leadership", "Public Speaking"],
    },
    {
      position: "right" as const,
      date: "2022-2025",
      category: "Academic Leadership",
      title: "Class Representative",
      description:
        "Served for two years, facilitating communication between students and faculty and leading various class-related initiatives.",
      points: [
        "Academic coordination and planning",
        "Student advocacy and representation",
        "Communication and mediation",
      ],
      tags: ["Leadership", "Communication", "Organization"],
    },
  ];

  // Animation variants for sliding effect
  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // const staggerChildren: Variants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  const childFadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="experience" className="py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Experience & Contributions</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="relative flex flex-col items-center space-y-12">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />

          <AnimatePresence>
            {experienceData.map((entry, index) => (
              <ExperienceCard
                key={entry.title}
                position={entry.position}
                date={entry.date}
                category={entry.category}
                title={entry.title}
                description={entry.description}
                points={entry.points}
                tags={entry.tags}
                variants={entry.position === "right" ? slideInRight : slideInLeft}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<ExperienceProps & { variants: Variants }> = ({
  position,
  date,
  category,
  title,
  description,
  points,
  tags,
  variants,
}) => {
  const dotColor =
    title === "Joplin Open Source Project"
      ? "bg-blue-500"
      : title === "Committee Member at Orator Club"
      ? "bg-green-500"
      : "bg-purple-500";

  const childFadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`relative w-full max-w-2xl bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col md:w-1/2 ${
        position === "right" ? "md:ml-auto md:pr-8" : "md:mr-auto md:pl-8"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
    >
      <motion.div initial="hidden" animate="visible">
        <motion.div className="flex items-center justify-between mb-4" variants={childFadeIn}>
          <span className="px-3 py-1 bg-purple-500 text-sm text-white rounded-full">{date}</span>
          <span className="text-gray-400">{category}</span>
        </motion.div>
        <motion.h3 className="text-xl font-semibold text-white mb-3" variants={childFadeIn}>
          {title}
        </motion.h3>
        <motion.p className="text-gray-300 mb-4" variants={childFadeIn}>
          {description}
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-gray-400 space-y-2 mb-4"
          variants={childFadeIn}
        >
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </motion.ul>
        <motion.div className="flex flex-wrap gap-2" variants={childFadeIn}>
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
      {/* Timeline Dot */}
      <motion.div
        className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-neutral-700 ${dotColor} ${
          position === "right" ? "left-[-2rem] md:left-[-3rem]" : "right-[-2rem] md:right-[-3rem]"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
      />
    </motion.div>
  );
};

export default ExperienceSection;