'use client';

import { useState } from 'react';
import { GraduationCap, MapPin, Calendar, Star, Code, Database, Globe, Zap } from 'lucide-react';

const About = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');

  const skillCategories = {
    languages: {
      icon: Code,
      title: 'Languages',
      skills: ['C', 'C++', 'Python', 'Go', 'JavaScript', 'TypeScript'],
    },
    web: {
      icon: Globe,
      title: 'Web Development',
      skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Langchain', 'WebSockets'],
    },
    database: {
      icon: Database,
      title: 'Databases & ORMs',
      skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'Supabase', 'Redis', 'Drizzle ORM'],
    },
    tools: {
      icon: Zap,
      title: 'Developer Tools',
      skills: ['VS Code', 'Postman', 'Git', 'GitHub', 'Docker'],
    },
  };

  // const quickFacts = [
  //   { label: 'Current GPA', value: '7.9/10', icon: Star },
  //   { label: 'Problems Solved', value: '1200+', icon: Code },
  //   { label: 'Contest Participations', value: '50+', icon: Zap },
  //   { label: 'Years of Experience', value: '3+', icon: Calendar },
  // ];

  return (
    <section id="about" className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about solving complex problems and building innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <div className="space-y-6">
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                I'm a Computer Science student at <strong className="text-foreground">IIIT Nagpur</strong> with a 
                passion for competitive programming and full-stack development. My journey in tech started with 
                curiosity about algorithms and has evolved into building AI-powered applications.
              </p>
              
              <p>
                With an <strong className="text-foreground">Expert rating on Codeforces</strong> and 
                <strong className="text-foreground"> Knight badge on LeetCode</strong>, I've solved over 1200 
                algorithmic problems. This strong foundation in data structures and algorithms drives my approach 
                to building efficient, scalable applications.
              </p>
              
              <p>
                Currently focused on <strong className="text-foreground">AI/ML integration</strong> in web applications, 
                I've developed projects like an AI-powered e-learning platform and GitHub SaaS tool that help 
                thousands of users worldwide.
              </p>
            </div>

            {/* Education */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">B.Tech in Computer Science Engineering</h4>
                <p className="text-muted-foreground">Indian Institute of Information Technology Nagpur</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Nov 2022 - Present</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Nagpur, Maharashtra</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>GPA: 7.9</span>
                  </span>
                </div>
                
               <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <h5 className="font-medium text-foreground mb-2">Academic Focus</h5>
                      <p className="text-sm text-muted-foreground">
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

          {/* Skills Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            
            {/* Skill Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(skillCategories).map(([key, { icon: Icon, title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveSkillCategory(key)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSkillCategory === key
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary/20 text-muted-foreground hover:bg-primary/30 hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{title}</span>
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skillCategories[activeSkillCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:bg-primary/10 hover:border-primary hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill}
                  </span>
                  
                  {/* Skill Level Indicator */}
                  <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:from-secondary group-hover:to-primary group-hover:w-[90%]"
                      style={{ width: `${Math.random() * 30 + 70}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Highlights */}
            <div className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Current Focus Areas</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Building AI-powered applications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  <span>Advanced Competitive Programming Techniques</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <p> Advanced System Design Patterns</p>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Contributing to community projects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Learn , Grow and Improve</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;