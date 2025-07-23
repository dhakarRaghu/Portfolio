"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, Zap, Gamepad2, Monitor, Palette, Waves, TreePine, Sunset, Square } from "lucide-react"
import { useTheme } from "./ui/ThemeProvider"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navRef = useRef<HTMLElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "achievements", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const themes = {
    light: { icon: Sun, name: "Light", color: "from-yellow-400 to-orange-500" },
    dark: { icon: Moon, name: "Dark", color: "from-slate-600 to-slate-800" },
    cyber: { icon: Zap, name: "Cyber", color: "from-cyan-400 to-blue-600" },
    neon: { icon: Gamepad2, name: "Neon", color: "from-pink-500 to-purple-600" },
    midnight: { icon: Monitor, name: "Midnight", color: "from-indigo-900 to-purple-900" },
    ocean: { icon: Waves, name: "Ocean", color: "from-blue-500 to-teal-500" },
    forest: { icon: TreePine, name: "Forest", color: "from-green-600 to-emerald-600" },
    sunset: { icon: Sunset, name: "Sunset", color: "from-orange-500 to-red-500" },
    monochrome: { icon: Square, name: "Mono", color: "from-gray-600 to-gray-800" },
    system: { icon: Palette, name: "System", color: "from-purple-500 to-pink-500" },
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
      >
        {/* Animated background bar */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 relative">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                Raghvendra Singh
              </span>
              <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2 bg-card/30 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                      activeSection === item.href.slice(1)
                        ? "text-primary bg-primary/20 shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                    {activeSection === item.href.slice(1) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse" />
                    )}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="group relative p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${themes[theme].color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  {(() => {
                    const CurrentThemeIcon = themes[theme].icon
                    return (
                      <CurrentThemeIcon className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    )
                  })()}
                </button>

                {isThemeMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
                    <div className="p-2">
                      <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
                        Choose Theme
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {Object.entries(themes).map(([themeName, themeData]) => (
                          <button
                            key={themeName}
                            onClick={() => {
                              setTheme(themeName as any)
                              setIsThemeMenuOpen(false)
                            }}
                            className={`group relative p-3 rounded-xl text-left flex flex-col items-center space-y-2 hover:bg-secondary/20 transition-all duration-300 ${
                              theme === themeName
                                ? "bg-primary/20 border border-primary/30"
                                : "border border-transparent"
                            }`}
                          >
                            <div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${themeData.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />
                            {(() => {
                              const ThemeOptionIcon = themeData.icon
                              return (
                                <ThemeOptionIcon
                                  className={`h-5 w-5 relative z-10 transition-all duration-300 ${
                                    theme === themeName
                                      ? "text-primary scale-110"
                                      : "text-muted-foreground group-hover:scale-110"
                                  }`}
                                />
                              )
                            })()}
                            <span
                              className={`text-xs font-medium relative z-10 transition-colors duration-300 ${
                                theme === themeName
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              {themeData.name}
                            </span>
                            {theme === themeName && (
                              <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="group relative p-3 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300" />
                  {isMenuOpen ? (
                    <X className="h-6 w-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`group relative block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/20 border border-primary/30"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent"
                  }`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.slice(1) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close theme menu */}
      {isThemeMenuOpen && <div className="fixed inset-0 z-30" onClick={() => setIsThemeMenuOpen(false)} />}
    </>
  )
}

export default Navigation
