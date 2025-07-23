"use client"

import { useState, useEffect } from "react"
import { Mail, ExternalLink } from "lucide-react"

const Hero = () => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [isLoaded, setIsLoaded] = useState(false)

  const roles = ["Software Developer", "Competitive Programmer", "AI/ML Enthusiast", "Open Source Contributor"]

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleType()
    }, typingSpeed)
    return () => clearTimeout(timer)
  })

  const handleType = () => {
    const i = loopNum % roles.length
    const fullText = roles[i]
    setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))
    setTypingSpeed(isDeleting ? 30 : 100)
    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 500)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dhakarRaghu",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      ),
      color: "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/raghvendra1853",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512">
          <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338C24.09 110 0 85.51 0 55.78 0 25.07 24.09 0 53.84 0c29.75 0 53.84 25.07 53.84 55.78 0 29.73-24.09 54.22-53.84 54.22zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.4-79.3-48.4 0-55.8 37.8-55.8 76.9V448h-92.7V148.9h89.1v40.8h1.3c12.4-23.5 42.5-48.4 87.5-48.4 93.7 0 111 61.6 111 141.3V448z" />
        </svg>
      ),
      color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Twitter",
      url: "https://x.com/Raghvendra56595",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 50 50">
          <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z" />
        </svg>
      ),
      color: "hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20",
    },
    {
      name: "Email",
      url: "mailto:raghvendrasinghdhakar2@gmail.com",
      icon: <Mail className="h-6 w-6" />,
      color: "hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
    },
  ]

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />

          {/* Additional floating particles */}
          <div
            className="absolute top-1/3 right-1/2 w-1 h-1 bg-primary/60 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-2/3 left-1/5 w-0.5 h-0.5 bg-accent/80 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content with Entrance Animations */}
            <div className="space-y-8">
              <div className="space-y-4">
                {/* Availability Status with Slide In */}
                <div
                  className={`flex items-center space-x-2 transition-all duration-1000 ease-out ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: "0.2s" }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 dark:text-green-400 font-medium">Available for opportunities</span>
                </div>

                {/* Main Heading with Staggered Animation */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  <span
                    className={`block transition-all duration-1000 ease-out ${
                      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "0.4s" }}
                  >
                    Hi, I'm
                  </span>
                  <span
                    className={`block p-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient transition-all duration-1000 ease-out ${
                      isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                    }`}
                    style={{ transitionDelay: "0.6s" }}
                  >
                    Raghvendra Singh
                  </span>
                </h1>

                {/* Typing Animation with Fade In */}
                <div
                  className={`text-xl sm:text-2xl text-muted-foreground h-8 transition-all duration-1000 ease-out ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: "0.8s" }}
                >
                  <span>{text}</span>
                  <span className="animate-pulse">|</span>
                </div>

                {/* Description with Slide Up */}
                <p
                  className={`text-lg text-muted-foreground max-w-2xl leading-relaxed transition-all duration-1000 ease-out ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: "1s" }}
                >
                  Computer Science student at IIIT Nagpur with expertise in competitive programming and full-stack
                  development. Building AI-powered applications and solving complex problems with modern technologies.
                </p>
              </div>

              {/* CTA Buttons with Bounce In */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-1000 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "1.2s" }}
              >
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Get In Touch</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-primary rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 bg-secondary/20 border border-secondary/50 text-secondary rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 hover:bg-secondary/30 hover:scale-105 active:scale-95 transform hover:-translate-y-1"
                >
                  <span className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Resume</span>
                  </span>

                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-secondary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                </a>
              </div>

              {/* Social Links with Staggered Animation */}
              <div
                className={`space-y-4 transition-all duration-1000 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "1.4s" }}
              >
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ name, url, icon, color }, index) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 text-muted-foreground rounded-xl border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-transparent active:scale-95 transform hover:-translate-y-1 ${color}`}
                      style={{
                        animationDelay: `${1.6 + index * 0.1}s`,
                        transform: isLoaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                        opacity: isLoaded ? 1 : 0,
                        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                      aria-label={name}
                    >
                      {icon}

                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                      </div>

                      {/* Social icon glow */}
                      <div className="absolute inset-0 rounded-xl bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Image & Stats with Enhanced Animations */}
            <div
              className={`flex flex-col items-center space-y-8 transition-all duration-1200 ease-out ${
                isLoaded ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              {/* Profile Image with Advanced Effects */}
              <div className="relative group">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 animate-spin-slow">
                  <div className="w-full h-full bg-background rounded-full"></div>
                </div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 transform group-hover:scale-105">
                  <img
                    src="/me.jpg"
                    alt="Raghvendra Singh"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Image overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce">
                  <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse">
                  <div className="absolute inset-1 bg-secondary/40 rounded-full animate-bounce" />
                </div>

                {/* Additional floating particles */}
                <div className="absolute top-1/4 -left-8 w-3 h-3 bg-accent/30 rounded-full animate-ping" />
                <div className="absolute bottom-1/4 -right-8 w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </section>
    </>
  )
}

export default Hero
