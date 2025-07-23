"use client"

import { Trophy, Target, Medal, Users, Code, Star, TrendingUp, Award } from "lucide-react"
import { useScrollAnimation, useStaggerAnimation } from "../hooks/useScrollAnimation"

const Achievements = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.2)
  const [platformsRef, platformsVisible] = useStaggerAnimation(3, 200)
  const [contestsRef, contestsVisible] = useStaggerAnimation(3, 150)
  const [leadershipRef, leadershipVisible] = useStaggerAnimation(2, 200)

  const platforms = [
    {
      name: "Codeforces",
      rating: "1787",
      level: "Expert",
      color: "from-red-500 to-orange-500",
      icon: Code,
      stats: { rank: "Expert", contests: "50+", problems: "1000+" },
      highlights: ["Expert Rated", "Consistent Performance", "Algorithm Specialist"],
      link: "https://codeforces.com/profile/00.ghost",
    },
    {
      name: "LeetCode",
      rating: "2043",
      level: "Knight",
      color: "from-yellow-500 to-orange-500",
      icon: Target,
      stats: { rank: "Top 2%", contests: "10+", problems: "400+" },
      highlights: ["Knight Badge", "Contest Specialist", "Problem Solving"],
      link: "https://leetcode.com/u/cGJXZbKT0C/",
    },
    {
      name: "CodeChef",
      rating: "1929",
      level: "4-Star",
      color: "from-purple-500 to-pink-500",
      icon: Medal,
      stats: { rank: "4-Star", contests: "30+", problems: "200+" },
      highlights: ["Global Rank 72", "Starters 183", "Consistent Performer"],
      link: "https://www.codechef.com/users/raghvendra_04",
    },
  ]

  const contestHighlights = [
    {
      title: "LeetCode Weekly Contest 446",
      achievement: "220th Rank",
      description: "Among over 27,000 participants worldwide",
      icon: TrendingUp,
      date: "Recent",
    },
    {
      title: "CodeChef Starters 183",
      achievement: "Global Rank 72",
      description: "Outstanding performance in weekly contest",
      icon: Award,
      date: "2024",
    },
    {
      title: "Problem Solving Milestone",
      achievement: "1200+ Problems",
      description: "Solved across multiple platforms",
      icon: Target,
      date: "Ongoing",
    },
  ]

  const leadership = [
    {
      role: "Core Member",
      organization: "Google Developer Group IIIT Nagpur",
      description:
        "Conducted interactive sessions on Competitive Programming (DSA) and mentored 100+ students to strengthen their foundational skills.",
      impact: "100+ Students Mentored",
      icon: Users,
    },
    {
      role: "Organizing Committee Member",
      organization: "Orator Club, IIIT Nagpur",
      description:
        "Played a key role in successfully hosting MUN 23, attracting 200+ participants and fostering greater engagement in public speaking.",
      impact: "200+ Participants",
      icon: Star,
    },
  ]

  return (
    <section id="achievements" className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-500/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-10 w-1.5 h-1.5 bg-purple-500/60 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Entrance Animation */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
            Achievements &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative">
              Recognition
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 animate-pulse" />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for competitive programming excellence and community leadership
          </p>
        </div>

        {/* Platform Achievements with Enhanced Animations */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2 animate-bounce" />
            Competitive Programming Achievements
          </h3>
          <div ref={platformsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-card/50 to-background border border-border/50 hover:border-primary/30 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 hover:-translate-y-2 ${
                  platformsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                </div>

                {/* Floating Orbs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${platform.color} blur-xl animate-pulse`}
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${platform.color} blur-lg animate-pulse`}
                  />
                </div>

                <div className="relative p-8 z-10">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${platform.color} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <platform.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                          {platform.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">{platform.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-black bg-gradient-to-br ${platform.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}
                      >
                        {platform.rating}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Rating</div>
                    </div>
                  </div>

                  {/* Animated Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {Object.entries(platform.stats).map(([key, value], statIndex) => (
                      <div
                        key={key}
                        className="relative overflow-hidden rounded-xl bg-background/60 backdrop-blur-sm border border-border/30 p-3 group-hover:bg-background/80 transition-all duration-500 hover:scale-105"
                        style={{ animationDelay: `${statIndex * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative text-center">
                          <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize font-medium">
                            {key === "rank" ? "Rank" : key === "contests" ? "Contests" : "Problems"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights with Animation */}
                  <div className="space-y-3 mb-6">
                    {platform.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlight}
                        className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-500"
                        style={{ animationDelay: `${highlightIndex * 100}ms` }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color} group-hover:scale-125 transition-transform duration-300 animate-pulse`}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Button */}
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative block w-full overflow-hidden rounded-xl bg-gradient-to-r from-background to-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500`}
                    />
                    <div className="relative flex items-center justify-center space-x-2 py-3 px-4">
                      <span className="font-semibold text-foreground group-hover/btn:text-primary transition-colors duration-300">
                        View Profile
                      </span>
                      <div className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all duration-300">
                        →
                      </div>
                    </div>
                  </a>
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <platform.icon className="h-20 w-20 text-primary" />
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contest Highlights with Stagger Animation */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Medal className="h-6 w-6 text-purple-500 mr-2 animate-pulse" />
            Contest Highlights
          </h3>
          <div ref={contestsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contestHighlights.map((contest, index) => (
              <div
                key={contest.title}
                className={`group p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 ${
                  contestsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                    <contest.icon className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {contest.title}
                    </h4>
                    <div className="text-lg font-bold text-secondary mb-2 group-hover:scale-105 transition-transform duration-300">
                      {contest.achievement}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 group-hover:text-foreground transition-colors duration-300">
                      {contest.description}
                    </p>
                    <span className="inline-block px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md group-hover:bg-secondary/30 transition-colors duration-300">
                      {contest.date}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 rounded-xl transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Involvement with Enhanced Animations */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Users className="h-6 w-6 text-green-500 mr-2 animate-bounce" />
            Leadership & Community Impact
          </h3>
          <div ref={leadershipRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadership.map((role, index) => (
              <div
                key={role.role}
                className={`group relative p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 ${
                  leadershipVisible[index]
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg flex-shrink-0 group-hover:bg-green-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <role.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {role.role}
                      </h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full group-hover:bg-green-500/30 group-hover:scale-105 transition-all duration-300">
                        {role.impact}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-3 group-hover:text-secondary transition-colors duration-300">
                      {role.organization}
                    </p>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {role.description}
                    </p>
                  </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <role.icon className="h-20 w-20 text-green-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-xl transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Overall Stats Summary with Pulse Animation */}
        <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-semibold text-center mb-8 relative z-10">Overall Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {[
              { label: "Total Problems Solved", value: "1200+", icon: Code },
              { label: "Contest Participations", value: "100+", icon: Trophy },
              { label: "Students Mentored", value: "100+", icon: Users },
              { label: "Community Events", value: "10+", icon: Star },
            ].map(({ label, value, icon: Icon }, index) => (
              <div
                key={label}
                className="text-center group-hover:scale-105 transition-transform duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-2">
                  <Icon className="h-8 w-8 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  )
}

export default Achievements
