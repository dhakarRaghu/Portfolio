"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/dhakarRaghu", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/raghvendra1853", label: "LinkedIn" },
    { icon: Mail, href: "mailto:raghvendrasinghdhakar2@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="bg-card/20 backdrop-blur-sm border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left Side - Name & Social */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Raghvendra Singh
              </h3>
              <p className="text-sm text-muted-foreground">Full-Stack Developer & Competitive Programmer</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-muted-foreground hover:text-secondary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Quick Links */}
          <div className="flex items-center space-x-6">
            {quickLinks.map(({ name, href }) => (
              <button
                key={name}
                onClick={() => {
                  const element = document.querySelector(href)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>© {currentYear} Raghvendra Singh</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Built with Next.js & Tailwind CSS</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
