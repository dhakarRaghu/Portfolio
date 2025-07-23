"use client"

import { useState } from "react"
import { GraduationCap, MapPin, Calendar, Star, Code, Database, Globe, Zap } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "../hooks/useScrollAnimation"

const About = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState("languages")
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [contentRef, contentVisible] = useScrollAnimation(0.1)
  const [skillsRef, skillsVisible] = useStaggerAnimation(4, 150)

  const skillCategories = {
    languages: {
      icon: Code,
      title: "Languages",
      skills: ["C", "C++", "Python", "Go", "JavaScript", "TypeScript"],
    },
    web: {
      icon: Globe,
      title: "Web Development",
      skills: ["React", "Next.js", "Node.js", "Express.js", "Langchain", "WebSockets"],
    },
    database: {
      icon: Database,
      title: "Databases & ORMs",
      skills: ["MongoDB", "PostgreSQL", "Prisma", "Supabase", "Redis", "Drizzle ORM"],
    },
    tools: {
      icon: Zap,
      title: "Developer Tools",
      skills: ["VS Code", "Postman", "Git", "GitHub", "Docker"],
    },
  }

  // const quickFacts = [
  //   { label: 'Current GPA', value: '7.9/10', icon: Star },
  //   { label: 'Problems Solved', value: '1200+', icon: Code },
  //   { label: 'Contest Participations', value: '50+', icon: Zap },
  //   { label: 'Years of Experience', value: '3+', icon: Calendar },
  // ];

  return (
    <section id="about" className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary/40 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-secondary/60 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" />
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
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Me
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg opacity-0 animate-pulse" />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about solving complex problems and building innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story - Combined into one cohesive section */}
          <div
            ref={contentRef}
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Combined Personal Story */}
            <div className="group relative p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 hover:bg-card/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 prose prose-lg text-muted-foreground space-y-6">
                <div className="space-y-4">
                  <p className="leading-relaxed text-base group-hover:text-foreground transition-colors duration-300">
                    I'm a Computer Science student at{" "}
                    <strong className="text-foreground bg-gradient-to-r from-primary/20 to-secondary/20 px-2 py-1 rounded-md group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                      IIIT Nagpur
                    </strong>{" "}
                    with a passion for competitive programming and full-stack development. My journey in tech started
                    with curiosity about algorithms and has evolved into building AI-powered applications that serve
                    thousands of users worldwide.
                  </p>

                  <p className="leading-relaxed text-base group-hover:text-foreground transition-colors duration-300">
                    With an{" "}
                    <strong className="text-foreground bg-gradient-to-r from-orange-500/20 to-red-500/20 px-2 py-1 rounded-md group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                      Expert rating on Codeforces
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-md group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                      Knight badge on LeetCode
                    </strong>
                    , I've solved over 1200 algorithmic problems. This strong foundation in data structures and
                    algorithms drives my approach to building efficient, scalable applications.
                  </p>

                  {/* <p className="leading-relaxed text-base group-hover:text-foreground transition-colors duration-300">
                    Currently focused on{" "}
                    <strong className="text-foreground bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-2 py-1 rounded-md group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      AI/ML integration
                    </strong>{" "}
                    in web applications, I've developed projects like an AI-powered e-learning platform and GitHub SaaS
                    tool. Beyond coding, I'm passionate about sharing knowledge and building communities through my role
                    at Google Developer Group IIIT Nagpur, where I've mentored 100+ students.
                  </p> */}
                </div>

                {/* Key Highlights */}
                {/* <div className="mt-6 pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                  <h4 className="font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    What Drives Me
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "🏆 1200+ Problems Solved",
                      "🤖 AI-Powered Applications",
                      "👥 100+ Students Mentored",
                      "🚀 Open Source Contributor",
                    ].map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-background/50 rounded-lg group-hover:bg-primary/10 group-hover:translate-x-1 transition-all duration-300"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <span className="text-sm font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Education with Enhanced Hover Effects */}
            <div className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <GraduationCap className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                  Education
                </h3>
              </div>
              <div className="space-y-2 relative z-10">
                <h4 className="font-medium text-foreground">B.Tech in Computer Science Engineering</h4>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Indian Institute of Information Technology Nagpur
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                    <Calendar className="h-4 w-4" />
                    <span>Nov 2022 - Present</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                    <MapPin className="h-4 w-4" />
                    <span>Nagpur, Maharashtra</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                    <Star className="h-4 w-4" />
                    <span>GPA: 7.9</span>
                  </span>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                  <h5 className="font-medium text-foreground mb-2">Academic Focus</h5>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Specializing in algorithms, data structures, and software engineering with a focus on AI-powered
                    applications. Active participant in coding competitions and technical societies.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Facts
            <div className="grid grid-cols-2 gap-4">
              {quickFacts.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="group p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">{value}</div>
                </div>
              ))}
            </div>
            */}
          </div>

          {/* Skills Section with Advanced Animations */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6 relative">
              Technical Skills
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </h3>

            {/* Skill Category Tabs with Floating Effect */}
            <div ref={skillsRef} className="flex flex-wrap gap-3 mt-4 mb-6">
              {Object.entries(skillCategories).map(([key, { icon: Icon, title }], index) => (
                <button
                  key={key}
                  onClick={() => setActiveSkillCategory(key)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                    activeSkillCategory === key
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-105"
                      : "bg-secondary/20 text-muted-foreground hover:bg-primary/30 hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                  } ${skillsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span>{title}</span>
                  {activeSkillCategory === key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Skills Grid with Stagger Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skillCategories[activeSkillCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-primary/10 hover:border-primary hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-500 text-center transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: `translateY(${Math.sin(index * 0.5) * 2}px)`,
                  }}
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 relative z-10">
                    {skill}
                  </span>
                  {/* Skill Level Indicator with Animation */}
                  <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 group-hover:from-secondary group-hover:to-primary"
                      style={{
                        width: `${Math.random() * 30 + 70}%`,
                        animation: "skillProgress 2s ease-out forwards",
                      }}
                    />
                  </div>
                  {/* Floating Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Skill Highlights with Pulse Animation */}
            <div className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="font-semibold text-foreground mb-3 relative z-10">Current Focus Areas</h4>
              <ul className="space-y-2 text-muted-foreground relative z-10">
                {[
                  "Building AI-powered applications",
                  "Advanced Competitive Programming Techniques",
                  "Advanced System Design Patterns",
                  "Contributing to community projects",
                  "Learn, Grow and Improve",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-secondary" : "bg-accent"
                      }`}
                    />
                    <span className="group-hover:text-foreground transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes skillProgress {
          from { width: 0%; }
          to { width: var(--final-width); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default About
