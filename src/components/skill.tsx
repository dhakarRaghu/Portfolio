"use client"; // Mark as Client Component for framer-motion animations

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

// Define props for Skills component
interface SkillsProps {
  className?: string;
}

const Skills: React.FC<SkillsProps> = ({ className }) => {
  // Animation variants for sliding effects
  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  // Card hover effect (size increase and pop-up)
  const cardHover: Variants = {
    rest: { scale: 1, y: 0, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, y: -10, boxShadow: "0px 10px 15px rgba(59, 130, 246, 0.3)", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Tag hover effect
  const tagHover: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.2, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  // Combine slide and hover variants for cards that slide in from the left
  const combinedLeftCard: Variants = {
    hidden: slideInLeft.hidden,
    visible: slideInLeft.visible,
    exit: slideInLeft.hidden,
    rest: cardHover.rest,
    hover: cardHover.hover,
  };

  // Combine slide and hover variants for cards that slide in from the right
  const combinedRightCard: Variants = {
    hidden: slideInRight.hidden,
    visible: slideInRight.visible,
    exit: slideInRight.hidden,
    rest: cardHover.rest,
    hover: cardHover.hover,
  };

  return (
    <section id="skills" className={cn("py-20 bg-neutral-900", className || "")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Programming Languages Card (slides in from left) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={combinedLeftCard}
            whileHover="hover"
            animate="rest"
            className="bg-neutral-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Programming Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                C/C++
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-green-500 hover:text-white"
              >
                Python
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-yellow-500 hover:text-white"
              >
                JavaScript
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-cyan-500 hover:text-white"
              >
                TypeScript
              </motion.span>
            </div>
          </motion.div>

          {/* Web Development Card (slides in from right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={combinedRightCard}
            whileHover="hover"
            animate="rest"
            className="bg-neutral-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Web Development
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                React
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-purple-500 hover:text-white"
              >
                Next.js
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-green-500 hover:text-white"
              >
                Node.js
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-teal-500 hover:text-white"
              >
                Express.js
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-cyan-500 hover:text-white"
              >
                TailwindCSS
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-indigo-500 hover:text-white"
              >
                Flask
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-pink-500 hover:text-white"
              >
                FastAPI
              </motion.span>
            </div>
          </motion.div>

          {/* Databases & ORM Card (slides in from left) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={combinedLeftCard}
            whileHover="hover"
            animate="rest"
            className="bg-neutral-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Databases & ORM
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                MongoDB
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-green-500 hover:text-white"
              >
                PostgreSQL
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-cyan-500 hover:text-white"
              >
                MySQL
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-teal-500 hover:text-white"
              >
                Supabase
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-indigo-500 hover:text-white"
              >
                Drizzle
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-purple-500 hover:text-white"
              >
                Prisma
              </motion.span>
            </div>
          </motion.div>

          {/* Developer Tools & Libraries Card (slides in from right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={combinedRightCard}
            whileHover="hover"
            animate="rest"
            className="bg-neutral-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Developer Tools & Libraries
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                Git
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-orange-500 hover:text-white"
              >
                Postman
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-cyan-500 hover:text-white"
              >
                VS Code
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-teal-500 hover:text-white"
              >
                Docker
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-purple-500 hover:text-white"
              >
                Shadcn
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-green-500 hover:text-white"
              >
                Pandas
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-yellow-500 hover:text-white"
              >
                Matplotlib
              </motion.span>
              <motion.span
                variants={tagHover}
                whileHover="hover"
                animate="rest"
                className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300 hover:bg-pink-500 hover:text-white"
              >
                Langchain
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
