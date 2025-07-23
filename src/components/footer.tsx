'use client';

import { Mail, Heart } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { SlSocialTwitter } from 'react-icons/sl';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: SiGithub,
      href: 'https://github.com/dhakarRaghu',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
    },
    {
      icon: SiLinkedin,
      href: 'https://linkedin.com/in/raghvendra1853',
      label: 'LinkedIn',
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      icon: SlSocialTwitter,
      href: 'https://x.com/raghvendra1853',
      label: 'Twitter',
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      icon: Mail,
      href: 'mailto:raghvendrasinghdhakar2@gmail.com',
      label: 'Email',
      color: 'hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
    },
  ];

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Connect with me:</span>
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                className={`group p-2 rounded-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-transparent active:scale-95 ${color}`}
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Credits */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>by</span>
            <span className="text-base font-semibold text-foreground">Raghvendra Singh</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;