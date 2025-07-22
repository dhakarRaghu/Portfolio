'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'raghvendrasinghdhakar2@gmail.com',
      href: 'mailto:raghvendrasinghdhakar2@gmail.com',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-8435271074',
      href: 'tel:+918435271074',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nagpur, Maharashtra',
      href: '#',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: '#',
      color: 'hover:text-gray-600 dark:hover:text-gray-300',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
      color: 'hover:text-blue-600',
    },
    {
      name: 'Portfolio',
      icon: ExternalLink,
      href: '#',
      color: 'hover:text-primary',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss opportunities, collaborations, or just want to connect? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or potential collaborations. 
                Whether you're looking for a competitive programmer, full-stack developer, or just want to chat about tech, 
                feel free to reach out!
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center space-x-4 p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {label}
                    </div>
                    <div className="text-muted-foreground">{value}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 ml-auto" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href, color }) => (
                  <a
                    key={name}
                    href={href}
                    className={`group p-3 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover:scale-110 ${color}`}
                    aria-label={name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 dark:text-green-400 font-medium">Available for new opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Open to full-time positions, internships, and freelance projects starting immediately.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me more about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to work together?
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm always excited to take on new challenges and contribute to meaningful projects. 
              Let's build something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:raghvendrasinghdhakar2@gmail.com"
                className="group flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                <span>Email Me</span>
              </a>
              <button className="group flex items-center space-x-2 px-6 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50 rounded-lg transition-all duration-300 hover:scale-105">
                <ExternalLink className="h-5 w-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;