import Hero from '@/components/Hero';
import About from '@/components/about';
import Skills from '@/components/skill';
import Projects from '@/components/project';
import CP from '@/components/cp';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="flex-1 relative h-full">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CP />
      <Experience />
      <Contact />
      <Footer />
    </main>
  </>
  );
}