"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Image from "next/image"
import { IconArrowLeft, IconArrowRight, IconX, IconExternalLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// Define Project interface
interface Project {
  id: number
  title: string
  content: string
  image: string
  tech: string[]
  links: { label: string; href: string }[]
  component: React.ReactNode
}

// Define props for Projects component
interface ProjectsProps {
  className?: string
  autoPlayInterval?: number
}

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "GitBuddy Live",
    content:
      "A full-stack AI-powered GitHub SaaS platform for enhanced coding workflow with automatic code reviews and AI-powered suggestions.",
    image: "/codeforces.png",
    tech: ["Next.js 15", "Google Gemini AI", "Assembly AI", "Prisma", "Langchain"],
    links: [
      { label: "View Code", href: "#" },
      { label: "Live Demo", href: "#" },
    ],
    component: (
      <div className="flex gap-4 mt-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Try AI Review
        </button>
        <button className="border border-gray-600 text-gray-300 px-6 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition duration-300">
          Explore Features
        </button>
      </div>
    ),
  },
  {
    id: 2,
    title: "Realtime Collaborative Workspace",
    content:
      "A real-time collaborative document workspace with live cursors, text selection, and presence indicators, using WebSocket for real-time updates.",
    image: "/me.jpg",
    tech: ["Next.js 13", "Drizzle ORM", "Supabase", "Tailwind", "WebSockets", "Redis"],
    links: [
      { label: "View Code", href: "#" },
      { label: "Live Demo", href: "#" },
    ],
    component: (
      <div className="mt-4">
        <p className="text-gray-400 mb-2">
          Live Users: <span className="text-green-500">12</span>
        </p>
        <div className="flex gap-2">
          {["User 1", "User 2", "User 3"].map((user, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm"
            >
              {user[5]}
            </div>
          ))}
          <span className="text-gray-400">+9</span>
        </div>
      </div>
    ),
  },
]

const Projects: React.FC<ProjectsProps> = ({ className, autoPlayInterval = 5000 }) => {
  const [currentProject, setCurrentProject] = useState(0)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (enlargedImage) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(handleNext, autoPlayInterval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [enlargedImage, autoPlayInterval])

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleImageClick = (imageSrc: string) => {
    setEnlargedImage(imageSrc)
  }

  const handleCloseModal = () => {
    setEnlargedImage(null)
  }

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const slide: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  }

  return (
    <section id="projects" className={cn("py-20 bg-neutral-800", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Key Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {projects.map(
              (project, index) =>
                index === currentProject && (
                  <motion.div
                    key={project.id}
                    className="grid md:grid-cols-2 gap-10"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={slide}
                  >
                    {/* Left Side: Project Details */}
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white">{project.title}</h3>
                      <p className="text-gray-400">{project.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.href}
                            className="text-blue-500 hover:text-blue-400 flex items-center gap-2"
                          >
                            {link.label}
                            <IconExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                      {project.component}
                    </div>

                    {/* Right Side: Project Image */}
                    <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg cursor-pointer"
                          onClick={() => handleImageClick(project.image)}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-neutral-700 text-white flex items-center justify-center hover:bg-blue-500 transition duration-300"
            >
              <IconArrowLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={cn("w-3 h-3 rounded-full", index === currentProject ? "bg-blue-500" : "bg-gray-500")}
                  onClick={() => setCurrentProject(index)}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-neutral-700 text-white flex items-center justify-center hover:bg-blue-500 transition duration-300"
            >
              <IconArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={enlargedImage || "/placeholder.svg"}
                alt="Enlarged project"
                width={1600}
                height={900}
                className="w-full h-auto object-contain rounded-lg"
              />
              <button
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-neutral-700 text-white hover:bg-red-500 transition duration-300 flex items-center justify-center"
                onClick={handleCloseModal}
              >
                <IconX className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects

