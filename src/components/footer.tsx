'use client';

import { Github, Linkedin, Mail, Heart, Code, Trophy } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:raghvendrasinghdhakar2@gmail.com', label: 'Email' },
  ];

  const quickStats = [
    { icon: Code, label: 'Problems Solved', value: '1200+' },
    { icon: Trophy, label: 'Contest Rank', value: 'Expert' },
  ];

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raghvendra Singh
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Competitive programmer and full-stack developer passionate about building innovative AI-powered solutions 
              and contributing to the tech community.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-muted-foreground hover:text-secondary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Achievements', href: '#achievements' },
                { name: 'Contact', href: '#contact' },
              ].map(({ name, href }) => (
                <button
                  key={name}
                  onClick={() => {
                    const element = document.querySelector(href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Stats</h3>
            <div className="space-y-3">
              {quickStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                    <div className="font-semibold text-foreground">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by Raghvendra Singh</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Built with Next.js & Tailwind CSS</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;