'use client'
import Hero from "../components/Hero"
import About from "../components/About"
import Achievements from "../components/Achievements"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import Experience from "../components/Experience"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"
import FloatingElements from "../components/ui/FloatingElements"

export default function Page() {
  return (
    <div className="relative">
      <FloatingElements />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Achievements />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
