"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Send, Github, Linkedin, ExternalLink, CheckCircle, Twitter } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "../hooks/useScrollAnimation"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [contentRef, contentVisible] = useScrollAnimation(0.1)
  const [formRef, formVisible] = useScrollAnimation(0.1)
  const [contactInfoRef, contactInfoVisible] = useStaggerAnimation(3, 150)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  // Subtle tilt effect for contact info cards
  const handleContactCardTilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleContactCardReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  }

  // More pronounced tilt for social links
  const handleSocialTilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8

    e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.15, 1.15, 1.15) translateZ(20px)`
  }

  const handleSocialReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)"
  }

  // Form tilt effect
  const handleFormTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

    e.currentTarget.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleFormReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  }

  // CTA section tilt
  const handleCTATilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 25
    const rotateY = (centerX - x) / 25

    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
  }

  const handleCTAReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "raghvendrasinghdhakar2@gmail.com",
      href: "mailto:raghvendrasinghdhakar2@gmail.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8435271074",
      href: "tel:+918435271074",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/raghvendra1853/",
      href: "https://www.linkedin.com/in/raghvendra1853/",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/raghvendra1853/",
      color: "hover:text-blue-600",
    },
    {
      name: "X",
      icon: Twitter,
      href: "https://x.com/raghvendra1853",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/dhakarRaghu",
      color: "hover:text-gray-600 dark:hover:text-gray-300",
    },
    {
      name: "Portfolio",
      icon: ExternalLink,
      href: "https://portfolio.raghvendra.tech",
      color: "hover:text-primary",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 right-10 w-1.5 h-1.5 bg-green-500/60 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-red-500/50 rounded-full animate-bounce" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Animation */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Touch
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 animate-pulse" />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss opportunities, collaborations, or just want to connect? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information with Stagger Animation */}
          <div
            ref={contentRef}
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 relative">
                Let's Connect
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or potential collaborations.
                Whether you're looking for a competitive programmer, full-stack developer, or just want to chat about
                tech, feel free to reach out!
              </p>
            </div>

            {/* Contact Info Cards with Enhanced Tilting Animations */}
            <div ref={contactInfoRef} className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color }, index) => (
                <a
                  key={label}
                  href={href}
                  className={`group flex items-center space-x-4 p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 perspective-1000 ${
                    contactInfoVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    transformStyle: "preserve-3d",
                  }}
                  onMouseMove={handleContactCardTilt}
                  onMouseLeave={handleContactCardReset}
                >
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${color} group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <Icon className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {label}
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {value}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ml-auto relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 rounded-lg transition-all duration-500" />

                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              ))}
            </div>

            {/* Social Links with Enhanced Floating Tilt Effect */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href, color }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover:shadow-lg ${color} perspective-800`}
                    style={{ transformStyle: "preserve-3d" }}
                    aria-label={name}
                    onMouseMove={handleSocialTilt}
                    onMouseLeave={handleSocialReset}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />

                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status with Subtle Tilt */}
            <div
              className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg relative overflow-hidden group hover:bg-green-500/15 transition-colors duration-300 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = (y - centerY) / 40
                const rotateY = (centerX - x) / 40

                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center space-x-2 relative z-10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 dark:text-green-400 font-medium">Available for new opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 relative z-10 group-hover:text-foreground transition-colors duration-300">
                Open to full-time positions, internships, and freelance projects starting immediately.
              </p>
            </div>
          </div>

          {/* Contact Form with Enhanced Tilting Animations */}
          <div
            ref={formRef}
            className={`bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 perspective-1200 ${
              formVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleFormTilt}
            onMouseLeave={handleFormReset}
          >
            <h3 className="text-2xl font-semibold mb-6 relative z-10">
              Send a Message
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-secondary to-accent rounded-full" />
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4 animate-bounce">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 group-hover:border-primary/50 hover:scale-[1.01] focus:scale-[1.01]"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 group-hover:border-primary/50 hover:scale-[1.01] focus:scale-[1.01]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 group-hover:border-primary/50 hover:scale-[1.01] focus:scale-[1.01]"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none group-hover:border-primary/50 hover:scale-[1.01] focus:scale-[1.01]"
                    placeholder="Tell me more about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed relative overflow-hidden perspective-500"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseMove={(e) => {
                    if (!isSubmitting) {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const centerX = rect.width / 2
                      const rotateY = (centerX - x) / 10

                      e.currentTarget.style.transform = `perspective(500px) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(500px) rotateY(0deg) scale3d(1, 1, 1)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin relative z-10" />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Form background depth effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Quick CTA with Enhanced Tilting Animation */}
        <div className="mt-20 text-center">
          <div
            className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleCTATilt}
            onMouseLeave={handleCTAReset}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-semibold text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">
              Ready to work together?
            </h3>
            <p className="text-muted-foreground mb-6 relative z-10 group-hover:text-foreground transition-colors duration-300">
              I'm always excited to take on new challenges and contribute to meaningful projects. Let's build something
              amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a
                href="mailto:raghvendrasinghdhakar2@gmail.com"
                className="group/btn flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 perspective-500"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const centerX = rect.width / 2
                  const rotateY = (centerX - x) / 8

                  e.currentTarget.style.transform = `perspective(500px) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(500px) rotateY(0deg) scale3d(1, 1, 1)"
                }}
              >
                <Mail className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                <span>Email Me</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/25 perspective-500"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const centerX = rect.width / 2
                  const rotateY = (centerX - x) / 8

                  e.currentTarget.style.transform = `perspective(500px) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(500px) rotateY(0deg) scale3d(1, 1, 1)"
                }}
              >
                <ExternalLink className="h-5 w-5 group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-all duration-300" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* CTA background depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-500 {
          perspective: 500px;
        }
        .perspective-800 {
          perspective: 800px;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </section>
  )
}

export default Contact
