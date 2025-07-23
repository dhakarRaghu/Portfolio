"use client"

import type React from "react"

import { Calendar, MapPin, Users, Target } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "../hooks/useScrollAnimation"

const Experience = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [timelineRef, timelineVisible] = useStaggerAnimation(2, 300)

  const experiences = [
    {
      title: "Core Member",
      organization: "Google Developer Group IIIT Nagpur",
      period: "2023 - Present",
      location: "Nagpur, Maharashtra",
      type: "Leadership",
      description:
        "Conducted interactive sessions on Competitive Programming (DSA) and mentored 100+ students to strengthen their foundational skills.",
      achievements: [
        "Mentored 100+ students in competitive programming",
        "Conducted weekly DSA workshops",
        "Improved students' problem-solving capabilities",
        "Built a strong programming community",
      ],
      skills: ["Mentoring", "Competitive Programming", "Community Building", "Public Speaking"],
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Organizing Committee Member",
      organization: "Orator Club, IIIT Nagpur",
      period: "2023 - Present",
      location: "Nagpur, Maharashtra",
      type: "Leadership",
      description:
        "Played a key role in successfully hosting MUN 23, attracting 200+ participants and fostering greater engagement in public speaking.",
      achievements: [
        "Successfully organized MUN 23 with 200+ participants",
        "Coordinated with multiple teams for event execution",
        "Enhanced public speaking culture in college",
        "Managed logistics for large-scale events",
      ],
      skills: ["Event Management", "Team Coordination", "Public Speaking", "Leadership"],
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
  ]

  interface Project {
    title: string
    organization: string
    period: string
    type: string
    description: string
    technologies: string[]
    impact: string
    icon: React.ElementType
    color: string
  }

  const projects: Project[] = [
    // {
    //   title: 'AI-Powered E-Learning Platform',
    //   organization: 'Personal Project',
    //   period: '2024',
    //   type: 'Development',
    //   description: 'Developed Insights - an AI-driven e-learning platform with 100+ personalized courses and interactive content generation.',
    //   technologies: ['Next.js', 'Google Gemini AI', 'PostgreSQL', 'TypeScript'],
    //   impact: '2.5k+ active users',
    //   icon: Code,
    //   color: 'from-green-500 to-emerald-500',
    // },
    // {
    //   title: 'GitHub SaaS Platform',
    //   organization: 'Personal Project',
    //   period: '2024',
    //   type: 'Development',
    //   description: 'Built GitBuddy - AI-powered GitHub SaaS for developer workflow enhancement with code analysis and team collaboration.',
    //   technologies: ['Next.js', 'Assembly AI', 'Langchain', 'Prisma'],
    //   impact: '1.8k+ developers using',
    //   icon: Lightbulb,
    //   color: 'from-orange-500 to-red-500',
    // },
  ]

  const allExperiences = [...experiences, ...projects]

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-500/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-10 w-1.5 h-1.5 bg-purple-500/60 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-green-500/50 rounded-full animate-bounce" />
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
            Experience &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Leadership
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 animate-pulse" />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building communities, mentoring students, and creating impactful projects
          </p>
        </div>

        {/* Timeline with Enhanced Animations */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          <div ref={timelineRef} className="space-y-12">
            {allExperiences.map((experience, index) => (
              <div
                key={`${experience.title}-${experience.organization}`}
                className={`group relative flex items-start space-x-8 transition-all duration-1000 ${
                  timelineVisible[index]
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Timeline Dot with Enhanced Animation */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${experience.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center group-hover:bg-card/50 transition-colors duration-300">
                      <experience.icon className="h-7 w-7 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                  </div>
                  {/* Connection Line */}
                  {index < allExperiences.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-0.5 h-12 bg-border transform -translate-x-1/2" />
                  )}
                  {/* Floating Ring */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${experience.color} opacity-0 group-hover:opacity-20 animate-ping`}
                  />
                </div>

                {/* Content with Enhanced Styling */}
                <div className="flex-1 min-w-0">
                  <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 hover:scale-[1.02]">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                          {experience.title}
                        </h3>
                        <p className="text-lg text-primary font-medium mb-2 group-hover:text-secondary transition-colors duration-300">
                          {experience.organization}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                            <Calendar className="h-4 w-4" />
                            <span>{experience.period}</span>
                          </span>
                          {"location" in experience && (
                            <span className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                              <MapPin className="h-4 w-4" />
                              <span>{experience.location}</span>
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              experience.type === "Leadership"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {experience.type}
                          </span>
                        </div>
                      </div>
                      {"impact" in experience && (
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Impact</div>
                          <div className="text-lg font-bold text-secondary group-hover:scale-105 transition-transform duration-300">
                            {experience.impact}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {experience.description}
                    </p>

                    {/* Achievements or Technologies */}
                    {"achievements" in experience ? (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <div
                              key={achievement}
                              className="flex items-start space-x-2 group-hover:translate-x-1 transition-transform duration-300"
                              style={{ transitionDelay: `${achievementIndex * 100}ms` }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {("technologies" in experience ? experience.technologies : []).map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-secondary/20 text-secondary text-sm rounded-md border border-secondary/30 group-hover:bg-secondary/30 group-hover:scale-105 transition-all duration-300"
                              style={{ transitionDelay: `${techIndex * 50}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {"skills" in experience && experience.skills && (
                      <div>
                        <h4 className="font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          Skills Developed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30 group-hover:bg-primary/30 group-hover:scale-105 transition-all duration-300"
                              style={{ transitionDelay: `${skillIndex * 50}ms` }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Students Mentored', value: '100+', color: 'text-blue-500' },
            { label: 'Events Organized', value: '5+', color: 'text-purple-500' },
            { label: 'Projects Built', value: '15+', color: 'text-green-500' },
            { label: 'Community Impact', value: '300+', color: 'text-orange-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300">
              <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default Experience
