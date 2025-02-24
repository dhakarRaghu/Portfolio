"use client"; // Mark as Client Component for framer-motion animations

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define props for Hero component
interface HeroProps {
  className?: string;
}

// Animation variants for the name
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each character
      delayChildren: 0.3, // Initial delay before starting
    },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Hero: React.FC<HeroProps> = ({ className }) => {
  // Animation variants for text and image
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  const iconHover = {
    scale: 1.2,
    rotate: 10,
    transition: { duration: 0.3 },
  };

  const nameText = "Raghvendra Singh     ";

  return (
    <section
      id="hero"
      className={cn(
        "relative z-0 flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-600",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 overflow-hidden ">
              Hi, I’m{" "}
              <motion.span
                className="inline-block"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {nameText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letter}
                    className="inline-block text-blue-500"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            <p className="text-lg sm:text-l md:text-xl text-gray-400 mb-4">
            Transforming ideas into powerful full-stack web applications with innovation, 
            efficiency, and seamless user experiences
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-500 mb-2">
              Full Stack Developer   
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-500 mb-2">
              Competitive Programmer
            </p>
            <div className="flex flex-col sm:flex-row mt-4 gap-4 mb-8 justify-center md:justify-start">
              <Button asChild variant="outline">
                <Link href="#footer">
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/raghvendra_s.pdf" target="_blank" rel="noopener noreferrer">
                  View Resume
                </Link>
              </Button>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              <motion.a
                href="https://github.com/dhakarRaghu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                whileHover={iconHover}
                aria-label="Visit Raghvendra's GitHub profile"
              >
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/raghvendra1853"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                whileHover={iconHover}
                aria-label="Visit Raghvendra's LinkedIn profile"
              >
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338C24.09 110 0 85.51 0 55.78 0 25.07 24.09 0 53.84 0c29.75 0 53.84 25.07 53.84 55.78 0 29.73-24.09 54.22-53.84 54.22zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.4-79.3-48.4 0-55.8 37.8-55.8 76.9V448h-92.7V148.9h89.1v40.8h1.3c12.4-23.5 42.5-48.4 87.5-48.4 93.7 0 111 61.6 111 141.3V448z" />
                    </svg>
              </motion.a>
              <motion.a
                href="https://x.com/Raghvendra56595"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                whileHover={iconHover}
                aria-label="Visit Raghvendra's GitHub profile"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                    <path 
                      d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z" 
                      fill="white" 
                    />
                  </svg>

              </motion.a>
            </div>
          </motion.div>

          {/* Right Content (Profile Image) */}
          <motion.div
            className="flex-1 flex justify-center items-center relative"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white relative z-10">
              <Image
                src="/me.jpg"
                alt="Portrait of Raghvendra Singh"
                width={288}
                height={288}
                className="object-cover w-full h-full"
                priority
                placeholder="blur"
                blurDataURL="/me.jpg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;