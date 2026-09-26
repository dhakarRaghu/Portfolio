/**
 * Résumé content, used by the About page only. Everything a visitor reads
 * (posts, notes, projects) lives as markdown under content/.
 */

export const profile = {
  name: "Raghvendra Singh Dhakar",
  shortName: "Raghvendra",
  role: "Software Engineer",
  company: "Juspay",
  location: "Bengaluru, India",
  email: "raghvendrasinghdhakar2@gmail.com",
  resume: "/Raghvendra-Singh-Dhakar-Resume.pdf",
  photo: "/me-portrait.jpg",
} as const;

export type Metric = { value: string; label: string };

export type Role = {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  points: string[];
  metrics?: Metric[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Juspay",
    companyUrl: "https://juspay.io/",
    title: "Product Engineer I",
    period: "Jul 2026 — Present",
    location: "Bengaluru, India",
    current: true,
    summary:
      "I work on the escalation, safety, and policy layers of BreezeBuddy.ai's conversational AI.",
    points: [
      "Built BreezeBuddy.ai's chatbot-to-human handoff system. The escalation workflow routes complex conversations to live agents and preserves the full context and state.",
      "Designed and implemented a unified AI guardrail layer for voice and text agents, enforcing system-level checks for prompt injection, toxicity, policy violations, and off-topic responses.",
      "Built a configurable guardrail engine that lets tenants define custom compliance rules, business boundaries, and agent behaviour without code changes, supporting per-agent and per-tenant policies.",
    ],
    stack: ["Go", "LLM Guardrails", "Voice Agents", "Multi-tenancy"],
  },
  {
    company: "Mindtickle",
    companyUrl: "https://www.mindtickle.com/",
    title: "Software Development Engineer Intern — AI & Backend Systems",
    period: "Aug 2025 — Jul 2026",
    location: "Bengaluru, India",
    summary:
      "I built the voice platform service, the provider sync pipeline, and the evaluation pipeline for AI roleplay.",
    points: [
      "Architected and shipped LanguageAndVoiceService, a Go gRPC microservice built on hexagonal architecture. It replaced hard-coded voice configuration with a DB-backed model and enabled no-deploy onboarding across 25+ languages and 800+ voices.",
      "Built an automated voice lifecycle pipeline with ElevenLabs, using Kubernetes CronJobs, webhooks, and Redis-backed async processing. It syncs providers, removes duplicate voices, processes feedback, and flags voices that perform badly.",
      "Shipped the AI roleplay LLMOps evaluation pipeline with Maxim, streaming session transcripts and per-bot metadata to LLM evaluators for automated quality scoring and continuous assessment.",
    ],
    metrics: [
      { value: "25+", label: "Languages supported" },
      { value: "800+", label: "Voices onboarded" },
      { value: "Zero", label: "Deploys to add a voice" },
    ],
    stack: ["Go", "gRPC", "Kubernetes", "Redis", "ElevenLabs", "Maxim"],
  },
];

export const ratings = [
  {
    platform: "LeetCode",
    rating: "2147",
    badge: "Guardian",
    note: "Top 1.2% of users",
    href: "https://leetcode.com/u/cGJXZbKT0C/",
  },
  {
    platform: "CodeChef",
    rating: "1993",
    badge: "4 Star",
    note: "Global rank 72 in Starters 183",
    href: "https://www.codechef.com/users/raghvendra_04",
  },
  {
    platform: "Codeforces",
    rating: "1800",
    badge: "Expert",
    note: "Maximum rating",
    href: "https://codeforces.com/profile/00.ghost",
  },
] as const;

export const highlights = [
  "Secured rank 220 in LeetCode Weekly Contest 446 among more than 27,000 participants.",
  "Core Member, Google Developer Group at IIIT Nagpur. Ran competitive programming sessions and mentored 100+ students.",
  "Organising Committee, Orator Club at IIIT Nagpur. Helped host MUN 23 with 200+ participants.",
] as const;

export const education = {
  institute: "Indian Institute of Information Technology, Nagpur",
  degree: "B.Tech, Computer Science and Engineering",
  period: "Nov 2022 — 2026",
  location: "Nagpur, Maharashtra",
  gpa: "8.03 / 10",
} as const;
