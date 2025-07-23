'use client'

import React, { useState } from 'react'
import { Github, ExternalLink, Star, Zap, Brain, Code, Globe } from 'lucide-react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'web'>('all')
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [featuredRef, featuredVisible] = useStaggerAnimation(2, 200)
  const [projectsRef, projectsVisible] = useStaggerAnimation(5, 150)

  // Magnetic hover state
  const [magnetTarget, setMagnetTarget] = useState<{ x: number; y: number } | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Magnetic cursor effect
  const handleMagneticHover = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMagnetTarget({ x: centerX, y: centerY })
    setIsHovering(true)
  }
  const handleMagneticLeave = () => {
    setMagnetTarget(null)
    setIsHovering(false)
  }

  // Generic tilt handlers (now accept any HTMLElement)
  const tilt = (e: React.MouseEvent<HTMLElement>, intensity: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / intensity
    const rotateY = (centerX - x) / intensity
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
  }
  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  const projects = [
    {
      id: 1,
      title: 'Insights | AI-Powered E-Learning Platform',
      description:
        'AI-driven e-learning platform offering 100+ personalized courses with unit-wise breakdowns and interactive chapters to enhance user learning engagement.',
      longDescription:
        'Developed an intelligent content generation system that auto-generates structured materials, integrates YouTube videos, and enables users to create and share custom learning modules, fostering collaborative education.',
      image: '/insights.png',
      tags: ['Next.js', 'Google Gemini AI', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      category: 'ai',
      featured: true,
      github: 'https://github.com/dhakarRaghu/Insights',
      demo: 'https://insights.raghvendra.tech/',
      highlights: ['AI Content Generation', 'Interactive Quizzes', 'Progress Tracking', 'Collaborative Learning'],
    },
    {
      id: 2,
      title: 'GitBuddy | AI-Powered GitHub SaaS',
      description:
        'Full-stack AI-powered GitHub SaaS to enhance developer workflows with automatic code analysis, AI suggestions, and advanced code search capabilities.',
      longDescription:
        'Integrated Google Gemini AI and Assembly AI for real-time code analysis and meeting transcription. Features AI chatbot for codebase insights and multi-project management.',
      image: '/gitbuddy.png',
      tags: ['Next.js', 'Google Gemini AI', 'Assembly AI', 'Langchain', 'Prisma', 'TypeScript'],
      category: 'ai',
      featured: true,
      github: 'https://github.com/dhakarRaghu/GitBuddy',
      demo: 'https://gitbuddy.raghvendra.tech/',
      highlights: ['Code Analysis', 'AI Chatbot', 'Team Collaboration', 'Repository Analytics'],
    },
    {
      id: 3,
      title: 'WebGenie | Starter Kit Generator',
      description:
        'Web development starter kit generator that allows users to create projects with customizable tech stacks, including Prisma, Authentication, and various frameworks.',
      longDescription:
        'Engineered an efficient CLI-based automation system that streamlines project setup with pre-configured dependencies, reducing setup time by 50% while ensuring best coding practices.',
      image: '/webgenie.png',
      tags: ['Next.js', 'Node.js', 'React', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      featured: false,
      github: 'https://github.com/dhakarRaghu/WebGenie',
      demo: 'https://web-genie-one.vercel.app/',
      highlights: ['CLI Automation', '50% Faster Setup', 'Multiple Templates', 'Best Practices'],
    },
    {
      id: 4,
      title: 'Realtime Collaborative Workspace',
      description:
        'Real-time collaborative document workspace enabling multiple users to work simultaneously, featuring live cursors, text selection, and presence indicators.',
      longDescription:
        'Implemented WebSockets for instant UI updates and Redis Pub/Sub for efficient real-time messaging, ensuring smooth collaboration without server limitations.',
      image: '/cypress.png',
      tags: ['Next.js', 'Drizzle ORM', 'Supabase', 'WebSockets', 'Redis', 'Tailwind CSS'],
      category: 'web',
      featured: false,
      github: 'https://github.com/dhakarRaghu/Saas_colab_Space_',
      demo: '#',
      highlights: ['Real-time Collaboration', 'Live Cursors', 'Presence Indicators', 'Redis Pub/Sub'],
    },
    {
      id: 5,
      title: 'Learnify | AI-Powered Learning Platform',
      description: 'AI-powered learning platform offering personalized course generation.',
      longDescription:
        'Leveraging advanced AI algorithms to tailor learning experiences, Learnify adapts to individual user needs, providing customized content and assessments.',
      image: '/learnify.png',
      tags: ['Next.js', 'Drizzle ORM', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
      category: 'ai',
      featured: false,
      github: 'https://github.com/dhakarRaghu/Learnify',
      demo: 'https://learnify-omega.vercel.app/',
      highlights: ['Real-time Collaboration', 'Live Cursors', 'Presence Indicators', 'Redis Pub/Sub'],
    },
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'ai', name: 'AI-powered', icon: Brain },
    { id: 'web', name: 'Web Apps', icon: Code },
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const featuredProjects = projects.filter(p => p.featured)

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-500/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-10 w-1.5 h-1.5 bg-purple-500/60 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-green-500/50 rounded-full animate-bounce" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Innovative solutions built with cutting-edge technologies</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" /> Highlighted Projects
          </h3>
          <div ref={featuredRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 perspective-1000 ${featuredVisible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 200}ms`, transformStyle: 'preserve-3d' }}
                onMouseMove={e => tilt(e, 10)}
                onMouseLeave={resetTilt}
                onMouseEnter={handleMagneticHover}
                onMouseOut={handleMagneticLeave}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full">Featured</div>
                </div>
                <div className="p-6 relative z-10">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title.split('|')[0]} <span className="text-primary">|</span> {project.title.split('|')[1]}
                  </h4>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.highlights.map(h => (
                      <div key={h} className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-primary" /> <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md border border-secondary/30">{tag}</span>
                    ))}
                    {project.tags.length > 4 && <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">+{project.tags.length - 4} more</span>}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center justify-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/25 active:scale-95 border border-secondary/30 hover:border-secondary/50">
                      <Github className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" /> <span className="text-sm font-medium">View Code</span>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 active:scale-95">
                      <ExternalLink className="h-5 w-5 group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-all duration-300" /> <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-secondary/20 p-1 rounded-lg">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilter(cat.id as 'all' | 'ai' | 'web')} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${filter === cat.id ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}`}> <cat.icon className="h-4 w-4" /> <span>{cat.name}</span></button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 perspective-1000 ${projectsVisible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${idx * 150}ms`, transformStyle: 'preserve-3d' }}
              onMouseMove={e => tilt(e, 15)}
              onMouseLeave={resetTilt}
              onMouseEnter={handleMagneticHover}
              onMouseOut={handleMagneticLeave}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 relative z-10">
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{project.title.includes('|') ? project.title.split('|')[0] : project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">{project.tags.slice(0,3).map(tag => <span key={tag} className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md">{tag}</span>)}{project.tags.length>3&&<span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">+{project.tags.length-3}</span>}</div>
                <div className="flex space-x-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/btn flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-secondary/20 active:scale-95 border border-secondary/20 hover:border-secondary/40 text-sm">
                    <Github className="h-4 w-4 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                    <span className="font-medium">Code</span>
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group/btn flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/20 active:scale-95 text-sm">
                    <ExternalLink className="h-4 w-4 group-hover/btn:scale-110 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
                    <span className="font-medium">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 perspective-1000" style={{transformStyle:'preserve-3d'}} onMouseMove={e=>tilt(e,8)} onMouseLeave={resetTilt} onMouseEnter={handleMagneticHover} onMouseOut={handleMagneticLeave}>
            <h3 className="text-2xl font-semibold text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">Ready to see more?</h3>
            <p className="text-muted-foreground mb-6 relative z-10 group-hover:text-foreground transition-colors duration-300">Explore my full GitHub for more innovative projects and contributions.</p>
            <a href="https://github.com/dhakarRaghu" target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 perspective-500 relative z-10" onMouseMove={e=>tilt(e,8)} onMouseLeave={resetTilt}>
              <Github className="h-5 w-5 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
              <span className="font-medium">View All on GitHub</span>
              <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  )
}

export default Projects
