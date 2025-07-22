'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, Code, Trophy } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Full Stack Developer',
    'Competitive Programmer',
    'AI/ML Enthusiast',
    'Open Source Contributor'
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  });

  const handleType = () => {
    const i = loopNum % roles.length;
    const fullText = roles[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    setTypingSpeed(isDeleting ? 30 : 100);

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const stats = [
    { label: 'Problems Solved', value: '1200+', icon: Code },
    { label: 'Codeforces Rating', value: '1686', icon: Trophy },
    { label: 'GitHub Projects', value: '15+', icon: Github },
    { label: 'Contest Rank', value: 'Top 2%', icon: ExternalLink },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">Available for opportunities</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="block">Hi, I'm</span>
                <span className="block p-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                  Raghvendra Singh
                </span>
              </h1>

              <div className="text-xl sm:text-2xl text-muted-foreground h-8">
                <span>{text}</span>
                <span className="animate-pulse">|</span>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Computer Science student at IIIT Nagpur with expertise in competitive programming 
                and full-stack development. Building AI-powered applications and solving complex problems 
                with modern technologies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Get In Touch</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group relative px-6 py-3 bg-secondary/20 border border-secondary/50 text-secondary rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25 hover:bg-secondary/30 hover:scale-105">
                <span className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:raghvendrasinghdhakar2@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group p-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image & Stats */}
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <img
                  src="/me.jpg"
                  alt="Raghvendra Singh"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse" />
            </div>

            {/* Quick Stats Grid
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {stats.map(({ label, value, icon: Icon }, index) => (
                <div
                  key={label}
                  className="group relative p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <div className="text-xl font-bold text-foreground">{value}</div>
                  
                  {/* Hover Effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;