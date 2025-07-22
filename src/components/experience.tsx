'use client';

import { Calendar, MapPin, Users, Code, Lightbulb, Target } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Core Member',
      organization: 'Google Developer Group IIIT Nagpur',
      period: '2023 - Present',
      location: 'Nagpur, Maharashtra',
      type: 'Leadership',
      description: 'Conducted interactive sessions on Competitive Programming (DSA) and mentored 100+ students to strengthen their foundational skills.',
      achievements: [
        'Mentored 100+ students in competitive programming',
        'Conducted weekly DSA workshops',
        'Improved students\' problem-solving capabilities',
        'Built a strong programming community'
      ],
      skills: ['Mentoring', 'Competitive Programming', 'Community Building', 'Public Speaking'],
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Organizing Committee Member',
      organization: 'Orator Club, IIIT Nagpur',
      period: '2023 - Present',
      location: 'Nagpur, Maharashtra',
      type: 'Leadership',
      description: 'Played a key role in successfully hosting MUN 23, attracting 200+ participants and fostering greater engagement in public speaking.',
      achievements: [
        'Successfully organized MUN 23 with 200+ participants',
        'Coordinated with multiple teams for event execution',
        'Enhanced public speaking culture in college',
        'Managed logistics for large-scale events'
      ],
      skills: ['Event Management', 'Team Coordination', 'Public Speaking', 'Leadership'],
      icon: Target,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const projects = [
    {
      title: 'AI-Powered E-Learning Platform',
      organization: 'Personal Project',
      period: '2024',
      type: 'Development',
      description: 'Developed Insights - an AI-driven e-learning platform with 100+ personalized courses and interactive content generation.',
      technologies: ['Next.js', 'Google Gemini AI', 'PostgreSQL', 'TypeScript'],
      impact: '2.5k+ active users',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'GitHub SaaS Platform',
      organization: 'Personal Project',
      period: '2024',
      type: 'Development',
      description: 'Built GitBuddy - AI-powered GitHub SaaS for developer workflow enhancement with code analysis and team collaboration.',
      technologies: ['Next.js', 'Assembly AI', 'Langchain', 'Prisma'],
      impact: '1.8k+ developers using',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const allExperiences = [...experiences, ...projects];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building communities, mentoring students, and creating impactful projects
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          <div className="space-y-12">
            {allExperiences.map((experience, index) => (
              <div
                key={`${experience.title}-${experience.organization}`}
                className="group relative flex items-start space-x-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${experience.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center group-hover:bg-card/50 transition-colors duration-300">
                      <experience.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Connection Line */}
                  {index < allExperiences.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-0.5 h-12 bg-border transform -translate-x-1/2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                          {experience.title}
                        </h3>
                        <p className="text-lg text-primary font-medium mb-2">{experience.organization}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{experience.period}</span>
                          </span>
                          {'location' in experience && (
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{experience.location}</span>
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            experience.type === 'Leadership' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {experience.type}
                          </span>
                        </div>
                      </div>
                      
                      {'impact' in experience && (
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Impact</div>
                          <div className="text-lg font-bold text-secondary">{experience.impact}</div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Achievements or Technologies */}
                    {'achievements' in experience ? (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Key Achievements</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {experience.achievements.map((achievement) => (
                            <div key={achievement} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {('technologies' in experience ? experience.technologies : []).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-secondary/20 text-secondary text-sm rounded-md border border-secondary/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {('skills' in experience && experience.skills) && (
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Skills Developed</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
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
        </div>
      </div>
    </section>
  );
};

export default Experience;