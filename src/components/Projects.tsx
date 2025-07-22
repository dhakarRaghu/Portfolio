'use client';

import { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Users, Zap, Brain, Code, Globe } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Insights | AI-Powered E-Learning Platform',
      description: 'AI-driven e-learning platform offering 100+ personalized courses with unit-wise breakdowns and interactive chapters to enhance user learning engagement.',
      longDescription: 'Developed an intelligent content generation system that auto-generates structured materials, integrates YouTube videos, and enables users to create and share custom learning modules, fostering collaborative education.',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      tags: ['Next.js', 'Google Gemini AI', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      category: 'ai',
      featured: true,
      github: '#',
      demo: '#',
      stats: { stars: 42, forks: 18, users: '2.5k+' },
      highlights: ['AI Content Generation', 'Interactive Quizzes', 'Progress Tracking', 'Collaborative Learning'],
    },
    {
      id: 2,
      title: 'GitBuddy | AI-Powered GitHub SaaS',
      description: 'Full-stack AI-powered GitHub SaaS to enhance developer workflows with automatic code analysis, AI suggestions, and advanced code search capabilities.',
      longDescription: 'Integrated Google Gemini AI and Assembly AI for real-time code analysis and meeting transcription. Features AI chatbot for codebase insights and multi-project management.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      tags: ['Next.js', 'Google Gemini AI', 'Assembly AI', 'Langchain', 'Prisma', 'TypeScript'],
      category: 'ai',
      featured: true,
      github: '#',
      demo: '#',
      stats: { stars: 67, forks: 24, users: '1.8k+' },
      highlights: ['Code Analysis', 'AI Chatbot', 'Team Collaboration', 'Repository Analytics'],
    },
    {
      id: 3,
      title: 'WebGenie | Starter Kit Generator',
      description: 'Web development starter kit generator that allows users to create projects with customizable tech stacks, including Prisma, Authentication, and various frameworks.',
      longDescription: 'Engineered an efficient CLI-based automation system that streamlines project setup with pre-configured dependencies, reducing setup time by 50% while ensuring best coding practices.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      tags: ['Next.js', 'Node.js', 'React', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      featured: false,
      github: '#',
      demo: '#',
      stats: { stars: 89, forks: 32, users: '5k+' },
      highlights: ['CLI Automation', '50% Faster Setup', 'Multiple Templates', 'Best Practices'],
    },
    {
      id: 4,
      title: 'Realtime Collaborative Workspace',
      description: 'Real-time collaborative document workspace enabling multiple users to work simultaneously, featuring live cursors, text selection, and presence indicators.',
      longDescription: 'Implemented WebSockets for instant UI updates and Redis Pub/Sub for efficient real-time messaging, ensuring smooth collaboration without server limitations.',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      tags: ['Next.js', 'Drizzle ORM', 'Supabase', 'WebSockets', 'Redis', 'Tailwind CSS'],
      category: 'web',
      featured: false,
      github: '#',
      demo: '#',
      stats: { stars: 156, forks: 45, users: '3.2k+' },
      highlights: ['Real-time Collaboration', 'Live Cursors', 'Presence Indicators', 'Redis Pub/Sub'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'web', name: 'Web Apps', icon: Code },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions built with cutting-edge technologies
          </p>
        </div>

        {/* Featured Projects Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Highlighted Projects
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title.split('|')[0]} <span className="text-primary">|</span> {project.title.split('|')[1]}
                  </h4>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-primary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{project.stats.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{project.stats.forks}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.stats.users}</span>
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md border border-secondary/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      className="flex items-center space-x-1 px-3 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-secondary/20 p-1 rounded-lg">
            {categories.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  filter === id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title.includes('|') 
                    ? project.title.split('|')[0] 
                    : project.title
                  }
                </h4>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <a
                    href={project.github}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all duration-300 text-sm"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <a
            href="#"
            className="group inline-flex items-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Github className="h-5 w-5" />
            <span>View All on GitHub</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;