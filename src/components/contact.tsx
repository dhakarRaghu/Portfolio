"use client"; // Mark as Client Component for framer-motion animations

import React from "react";
import { motion, Variants } from "framer-motion";

// Define props for Contact component
interface ContactProps {
  className?: string;
}

// Define animation variants at top level
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const childFadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Contact: React.FC<ContactProps> = ({ className }) => {
  return (
    <section id="contact" className={`py-20 bg-neutral-800 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2 className="text-3xl font-bold text-white mb-4" variants={childFadeIn}>
            Get In Touch
          </motion.h2>
          <motion.div className="w-20 h-1 bg-blue-500 mx-auto" variants={childFadeIn}></motion.div>
          <motion.p className="text-gray-400 mt-6" variants={childFadeIn}>
            Feel free to reach out for collaborations or just a friendly chat
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <div className="bg-neutral-900 p-6 rounded-xl">
              <motion.h3
                className="text-xl font-semibold text-white mb-6"
                variants={childFadeIn}
              >
                Contact Information
              </motion.h3>
              <motion.div className="space-y-4" variants={staggerChildren}>
                <ContactItem
                  href="mailto:raghvendrasinghdhakar2@gmail.com"
                  label="raghvendrasinghdhakar2@gmail.com"
                  icon="email"
                />
                <ContactItem
                  href="https://linkedin.com/in/raghvendra1853"
                  label="linkedin.com/in/raghvendra1853"
                  icon="linkedin"
                />
                <ContactItem href="https://github.com/dhakarRaghu" label="github.com/dhakarRaghu" icon="github" />
                <ContactItem href="https://x.com/Raghvendra56595" label="x.com/Raghvendra56595" icon="twitter" />
                <ContactItem href="tel:+918435271074" label="+91 8435271074" icon="phone" />
              </motion.div>
              <motion.div className="mt-8" variants={childFadeIn}>
                <a
                  href="/raghvendra_s.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Resume
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <form className="bg-neutral-900 p-6 rounded-xl">
              <motion.div className="space-y-6" variants={staggerChildren}>
                <FormField className='py-1' label="Name" id="name" type="text"  />
                <FormField className='py-1' label="Email" id="email" type="email" />
                <FormField  className='py-1' label="Subject" id="subject" type="text" />
                <FormField  className='py-1'label="Message" id="message" type="textarea" />
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  variants={childFadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem: React.FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <motion.a
    href={href}
    className="flex items-center gap-4 text-gray-300 hover:text-blue-500 transition-colors"
    variants={childFadeIn}
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
  >
    <div className="bg-neutral-800 p-3 rounded-lg">
      {icon === "email" && (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.5 5L18 8M3 8l7.5 5L18 8M3 8l0 10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V8c0-1.104-.896-2-2-2H5c-1.104 0-2 .896-2 2z"
          />
        </svg>
      )}
      {icon === "phone" && (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 2h12c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2H6c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2zM12 18h0M8 2h8"
          />
        </svg>
      )}
      {icon === "twitter" && (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" viewBox="0 0 50 50">
          <path
            d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"
            fill="currentColor"
          />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 448 512">
          <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338C24.09 110 0 85.51 0 55.78 0 25.07 24.09 0 53.84 0c29.75 0 53.84 25.07 53.84 55.78 0 29.73-24.09 54.22-53.84 54.22zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.4-79.3-48.4 0-55.8 37.8-55.8 76.9V448h-92.7V148.9h89.1v40.8h1.3c12.4-23.5 42.5-48.4 87.5-48.4 93.7 0 111 61.6 111 141.3V448z" />
        </svg>
      )}
      {icon === "github" && (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216 .694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      )}
    </div>
    <span>{label}</span>
  </motion.a>
);

const FormField: React.FC<{ label: string; id: string; type: string; className?: string }> = ({ label, id, type, className }) => (
  <motion.div variants={childFadeIn}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        rows={4}
        className={`mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className || ''}`}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className={`mt-1 block w-full rounded-md bg-neutral-800 border-neutral-700 text-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className || ''}`}
      />
    )}
  </motion.div>
);

export default Contact;