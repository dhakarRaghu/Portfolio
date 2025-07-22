'use client';

import { Trophy, Target, Medal, Users, Code, Star, TrendingUp, Award } from 'lucide-react';

const Achievements = () => {
  const platforms = [
    {
      name: 'Codeforces',
      rating: '1686',
      level: 'Expert',
      color: 'from-red-500 to-orange-500',
      icon: Code,
      stats: { rank: 'Expert', contests: '45+', problems: '600+' },
      highlights: ['Expert Level Rating', 'Consistent Performance', 'Algorithm Specialist'],
      link: '#',
    },
    {
      name: 'LeetCode',
      rating: '2043',
      level: 'Knight',
      color: 'from-yellow-500 to-orange-500',
      icon: Target,
      stats: { rank: 'Top 2%', contests: '25+', problems: '800+' },
      highlights: ['Knight Badge', 'Contest Specialist', 'Problem Solving'],
      link: '#',
    },
    {
      name: 'CodeChef',
      rating: '1818',
      level: '4-Star',
      color: 'from-purple-500 to-pink-500',
      icon: Medal,
      stats: { rank: '4-Star', contests: '30+', problems: '400+' },
      highlights: ['Global Rank 72', 'Starters 183', 'Consistent Performer'],
      link: '#',
    },
  ];

  const contestHighlights = [
    {
      title: 'LeetCode Weekly Contest 446',
      achievement: '220th Rank',
      description: 'Among over 27,000 participants worldwide',
      icon: TrendingUp,
      date: 'Recent',
    },
    {
      title: 'CodeChef Starters 183',
      achievement: 'Global Rank 72',
      description: 'Outstanding performance in monthly contest',
      icon: Award,
      date: '2024',
    },
    {
      title: 'Problem Solving Milestone',
      achievement: '1200+ Problems',
      description: 'Solved across multiple platforms',
      icon: Target,
      date: 'Ongoing',
    },
  ];

  const leadership = [
    {
      role: 'Core Member',
      organization: 'Google Developer Group IIIT Nagpur',
      description: 'Conducted interactive sessions on Competitive Programming (DSA) and mentored 100+ students to strengthen their foundational skills.',
      impact: '100+ Students Mentored',
      icon: Users,
    },
    {
      role: 'Organizing Committee Member',
      organization: 'Orator Club, IIIT Nagpur',
      description: 'Played a key role in successfully hosting MUN 23, attracting 200+ participants and fostering greater engagement in public speaking.',
      impact: '200+ Participants',
      icon: Star,
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Achievements & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Recognition</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for competitive programming excellence and community leadership
          </p>
        </div>

        {/* Platform Achievements */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            Competitive Programming Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-105"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative p-6">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color}`}>
                        <platform.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{platform.name}</h4>
                        <p className="text-sm text-muted-foreground">{platform.level}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                        {platform.rating}
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-secondary/20 rounded-lg">
                      <div className="text-sm font-medium text-foreground">{platform.stats.rank}</div>
                      <div className="text-xs text-muted-foreground">Rank</div>
                    </div>
                    <div className="text-center p-2 bg-secondary/20 rounded-lg">
                      <div className="text-sm font-medium text-foreground">{platform.stats.contests}</div>
                      <div className="text-xs text-muted-foreground">Contests</div>
                    </div>
                    <div className="text-center p-2 bg-secondary/20 rounded-lg">
                      <div className="text-sm font-medium text-foreground">{platform.stats.problems}</div>
                      <div className="text-xs text-muted-foreground">Problems</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {platform.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.color}`} />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Profile Button */}
                  <a
                    href={platform.link}
                    className={`block text-center py-2 px-4 bg-gradient-to-r ${platform.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    View Profile
                  </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <platform.icon className="h-16 w-16 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contest Highlights */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Medal className="h-6 w-6 text-purple-500 mr-2" />
            Contest Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contestHighlights.map((contest, index) => (
              <div
                key={contest.title}
                className="group p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                    <contest.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {contest.title}
                    </h4>
                    <div className="text-lg font-bold text-secondary mb-2">{contest.achievement}</div>
                    <p className="text-sm text-muted-foreground mb-2">{contest.description}</p>
                    <span className="inline-block px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md">
                      {contest.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Involvement */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Users className="h-6 w-6 text-green-500 mr-2" />
            Leadership & Community Impact
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadership.map((role, index) => (
              <div
                key={role.role}
                className="group relative p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg flex-shrink-0">
                    <role.icon className="h-6 w-6 text-green-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {role.role}
                      </h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                        {role.impact}
                      </span>
                    </div>
                    
                    <p className="text-primary font-medium mb-3">{role.organization}</p>
                    <p className="text-muted-foreground leading-relaxed">{role.description}</p>
                  </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <role.icon className="h-20 w-20 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Stats Summary */}
        <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl">
          <h3 className="text-2xl font-semibold text-center mb-8">Overall Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Problems Solved', value: '1200+', icon: Code },
              { label: 'Contest Participations', value: '100+', icon: Trophy },
              { label: 'Students Mentored', value: '100+', icon: Users },
              { label: 'Community Events', value: '10+', icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;