"use client"; // Mark as Client Component for framer-motion animations

import { motion, Variants } from "framer-motion";

// Define props for About component
interface AboutProps {
  className?: string;
}

// Data for the sliding cards
const expertiseCards = [
  {
    title: "FullStack Developer",
    description: "Expertise in building scalable systems",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
      </svg>
    ),
  },
  {
    title: "Problem Solving",
    description: "Strong algorithmic skills with 800+ problems solved",
    icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    description: "Experience with AI tools and implementations",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
      </svg>
    ),
  },
];

const About: React.FC<AboutProps> = ({ className }) => {
  // Animation variants for sliding effect
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
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  // Animation for cards sliding in from right and stacking
  const cardSlide: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.5, // Stagger each card by 0.5 seconds
      },
    }),
  };

  return (
    <section id="about" className={`py-20 bg-neutral-900 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with fade-in-up effect */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content - Slide in from Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <h3 className="text-2xl font-bold text-blue-500 mb-6">
              FullStack Developer & Competitive Programmer
            </h3>
            <p className="text-gray-300 mb-6">
              Currently pursuing Bachelor of Technology in Computer Science at Indian Institute of Information Technology Nagpur. My passion lies in backend development, artificial intelligence, and competitive programming.
            </p>
            <p className="text-gray-300 mb-6">
              With expertise in building scalable backend systems and a strong foundation in data structures and algorithms, I've solved 800+ problems on Codeforces and contributed to open-source projects.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-700 p-4 rounded-lg">
                <h4 className="text-blue-500 text-lg font-semibold mb-2">800+</h4>
                <p className="text-gray-300">CP Problems Solved</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg">
                <h4 className="text-blue-500 text-lg font-semibold mb-2">@pupil</h4>
                <p className="text-gray-300">Codeforces Rating</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Next.js</span>
              <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Express.js</span>
              <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">PostgreSQL</span>
              <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">MongoDB</span>
              <span className="px-4 py-2 bg-neutral-700 rounded-full text-gray-300">Docker</span>
            </div>
          </motion.div>

          {/* Right Content - Cards Slide in and Stack Vertically */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertiseCards.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardSlide}
                className="bg-neutral-900 p-6 rounded-xl border border-neutral-700"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">{card.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold">{card.title}</h4>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;