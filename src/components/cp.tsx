"use client"; // Mark as Client Component for framer-motion animations

import { IconArrowLeft, IconArrowRight, IconX, IconExternalLink } from "@tabler/icons-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

// Define CP platform interface
interface CPPlatform {
  platform: string;
  username: string;
  rating: string;
  problemsSolved: string;
  notableAchievement: string;
  src: string;
  profileLink: string;
}

// Define props for Projects component
interface ProjectsProps {
  className?: string;
}

const CP: React.FC<ProjectsProps> = ({ className }) => {
  const [active, setActive] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // CP platform data
  const cpPlatforms: CPPlatform[] = [
    {
      platform: "Codeforces",
      username: "Expert",
      rating: "1686",
      problemsSolved: "900+",
      notableAchievement: "Reached Expert rank with consistent problem-solving.",
      src: "/codeforces.png",
      profileLink: "https://codeforces.com/profile/00.ghost",
    },
    {
      platform: "LeetCode",
      username: "@raghvendra1853",
      rating: "2043",
      problemsSolved: "300+",
      notableAchievement: "Top 2% in weekly contests.",
      src: "/leetcode.png",
      profileLink: "https://leetcode.com/u/raghvendra_01/",
    },
    {
      platform: "CodeChef",
      username: "@raghvendra1853",
      rating: "4 stars (1818)",
      problemsSolved: "100+",
      notableAchievement: "Reached 4 stars with consistent problem-solving.",
      src: "/codechef.png",
      profileLink: "https://www.codechef.com/users/raghvendra_04",
    },
  ];

  // Carousel Controls
  const handleNext = () => {
    setActive((prev) => (prev + 1) % cpPlatforms.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + cpPlatforms.length) % cpPlatforms.length);
  };

  const isActive = (index: number) => index === active;

  // Handle Image Click -> Enlarge
  const handleImageClick = (src: string) => {
    setEnlargedImage(src);
  };

  // Close enlarged image
  const handleClose = () => {
    setEnlargedImage(null);
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Auto-play effect with pause when enlarged
  useEffect(() => {
    if (enlargedImage) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(handleNext, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enlargedImage]);

  // Random rotation for the slideshow images
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10; // -10 to 10 deg

  return (
    <section id="CP" className={cn("py-20 bg-neutral-800", className)}>
        <motion.div
                 className="text-center mb-16"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
               >
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                 Competitive Programming
                 </h2>
                 <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>
      <div className="max-w-sm md:max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Left Side: Rotating CP Platform Images */}
          <div>
            <div className="relative h-[400px] md:h-[500px] w-full px-4 ">
              <AnimatePresence>
                {cpPlatforms.map((platform, index) => (
                  <motion.div
                    key={platform.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      // The zIndex ensures the active image sits on top in the carousel
                      zIndex: isActive(index) ? 10 : 0,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      // A fun bounce effect on the active image
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom cursor-pointer"
                    onClick={() => handleImageClick(platform.src)}
                  >
                    <Image
                      src={platform.src}
                      alt={platform.platform}
                      width={600}
                      height={600}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: CP Details & Buttons */}
          <div className="flex flex-col justify-between py-4">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Heading + Profile Button */}
              <div className="flex items-center flex-wrap gap-4">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                  {cpPlatforms[active].platform}
                </h3>
                <a
                  href={cpPlatforms[active].profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  <span>Profile</span>
                  <IconExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Stats */}
              <div className="space-y-4 text-gray-300 text-lg bg-neutral-700/50 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-white w-32">Rating:</span>
                  <span>{cpPlatforms[active].rating}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-white w-32">Problems:</span>
                  <span>{cpPlatforms[active].problemsSolved}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-white w-32">Achievement:</span>
                  <span>
                    {/* Word-by-word animation */}
                    {cpPlatforms[active].notableAchievement.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-neutral-700 text-white flex items-center justify-center group/button hover:bg-blue-500 transition duration-300"
              >
                <IconArrowLeft className="h-6 w-6 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-neutral-700 text-white flex items-center justify-center group/button hover:bg-blue-500 transition duration-300"
              >
                <IconArrowRight className="h-6 w-6 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
            onClick={handleClose}
          >
            <motion.div
              className="relative max-w-4xl w-full h-[80vh] p-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <Image
                src={enlargedImage}
                alt="Enlarged CP Profile"
                width={800}
                height={800}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-neutral-700 text-white flex items-center justify-center hover:bg-red-500 transition duration-300"
              >
                <IconX className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CP;
