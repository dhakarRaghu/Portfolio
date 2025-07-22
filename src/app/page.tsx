'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursor && cursorDot) {
        // Smooth cursor movement with slight delay
        requestAnimationFrame(() => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
          cursorDot.style.left = e.clientX + 'px';
          cursorDot.style.top = e.clientY + 'px';
        });
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLElement) {
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('cursor-pointer')) {
          setCursorVariant('hover');
        } else if (target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
          setCursorVariant('text');
        }
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <ThemeProvider>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out hidden md:block ${
          cursorVariant === 'hover' 
            ? 'w-12 h-12 border-2 border-primary bg-primary/20' 
            : cursorVariant === 'text'
            ? 'w-8 h-8 border border-secondary bg-secondary/10'
            : 'w-6 h-6 border border-primary/50'
        } rounded-full`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* Cursor trail effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 animate-pulse" />
      </div>
      <div 
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out hidden md:block ${
          cursorVariant === 'hover' 
            ? 'w-1 h-1 bg-primary' 
            : cursorVariant === 'text'
            ? 'w-1.5 h-1.5 bg-secondary'
            : 'w-2 h-2 bg-primary'
        } rounded-full`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Cursor glow effect */}
      <div 
        className="fixed pointer-events-none z-40 hidden md:block transition-all duration-500 ease-out"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: cursorVariant === 'hover' ? '100px' : '50px',
          height: cursorVariant === 'hover' ? '100px' : '50px',
          background: `radial-gradient(circle, ${
            cursorVariant === 'hover' 
              ? 'hsl(var(--primary) / 0.1)' 
              : 'hsl(var(--primary) / 0.05)'
          } 0%, transparent 70%)`,
        }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 transition-all duration-1000 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)] transition-all duration-1000 -z-10" />
      
      {/* Theme-specific background patterns */}
      <div className="fixed inset-0 opacity-30 transition-all duration-1000 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--secondary))_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      </div>
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float transition-all duration-1000 -z-10" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-float-delay transition-all duration-1000 -z-10" />
      <div className="fixed bottom-40 left-40 w-28 h-28 bg-accent/20 rounded-full blur-2xl animate-float transition-all duration-1000 -z-10" />
      <div className="fixed bottom-20 right-40 w-20 h-20 bg-primary/15 rounded-full blur-xl animate-float-delay transition-all duration-1000 -z-10" />
      <div className="fixed top-1/2 left-1/2 w-16 h-16 bg-secondary/15 rounded-full blur-xl animate-orbit transition-all duration-1000 -z-10" />

      <div className="min-h-screen text-foreground overflow-x-hidden relative">
        {/* Animated grid pattern */}
        <div className="fixed inset-0 opacity-[0.02] transition-all duration-1000 -z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Achievements />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}