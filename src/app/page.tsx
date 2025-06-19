"use client";

import Hero from '@/components/Hero';
import About from '@/components/about';
import Skills from '@/components/skill';
import Projects from '@/components/project';
import CP from '@/components/cp';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-neutral-950 to-neutral-900">
      <Navbar />
      <main className="flex-1 relative min-h-screen">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="particles" style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            animation: 'float 20s infinite linear',
          }}></div>
        </div>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CP />
        <Experience />
        <Contact />
        <Footer />
      </main>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}