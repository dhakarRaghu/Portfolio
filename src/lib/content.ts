/**
 * Single source of truth for every piece of résumé content on the site.
 * Update this file when the résumé changes; the sections read from it.
 */

export const profile = {
  name: "Raghvendra Singh Dhakar",
  shortName: "Raghvendra",
  role: "Product Engineer",
  company: "Juspay",
  location: "Bengaluru, India",
  email: "raghvendrasinghdhakar2@gmail.com",
  phone: "+91 84352 71074",
  resume: "/Raghvendra-Singh-Dhakar-Resume.pdf",
  photo: "/me.jpg",
  tagline:
    "I build backend services, and the AI systems that run on top of them.",
  summary: [
    "My work sits between a language model and the person using it. That layer decides what context the model gets, what it is allowed to say, and when a conversation should go to a human instead.",
    "Today I work on conversational AI infrastructure at Juspay. Before this I built voice and evaluation systems at Mindtickle. I also co-founded Verly, an AI customer support platform.",
  ],
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/dhakarRaghu", handle: "dhakarRaghu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raghvendra1853/", handle: "raghvendra1853" },
  { label: "X", href: "https://x.com/raghvendra1853", handle: "raghvendra1853" },
  { label: "Email", href: "mailto:raghvendrasinghdhakar2@gmail.com", handle: "raghvendrasinghdhakar2@gmail.com" },
] as const;

export const navItems = [
  { label: "Focus", href: "#focus" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

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

/**
 * The three areas of engineering I work in. Each one is drawn from shipped
 * work, not from a list of interests.
 */
export const focusAreas = [
  {
    title: "Backend services",
    body:
      "I build services with clear boundaries between transport, domain logic, and storage. Services talk to each other over defined contracts. Configuration lives in the database, so behaviour changes without a deploy.",
    items: ["Go", "gRPC / Protobuf", "Hexagonal architecture", "Multi-tenant data models"],
  },
  {
    title: "AI systems",
    body:
      "This is the layer between a language model and a real user. Retrieval finds the context the model needs. Guardrails check each reply for prompt injection, toxicity, and policy violations. When the model should stop, the conversation goes to a person.",
    items: ["RAG", "Guardrails", "Scoped tool access", "Human handoff"],
  },
  {
    title: "Evaluation and operations",
    body:
      "A system in production has to be measured, not assumed. Scheduled jobs and webhooks keep provider data in sync. Evaluation pipelines score sessions after they end. Analytics show where conversations fail.",
    items: ["Kubernetes", "Redis", "LLM evaluation", "Conversation analytics"],
  },
] as const;

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

export type Project = {
  name: string;
  kind: string;
  period?: string;
  role?: string;
  description: string;
  points: string[];
  metrics?: Metric[];
  stack: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Verly",
    kind: "AI customer support platform",
    period: "Nov 2025 — May 2026",
    role: "Co-Founder & Software Engineer",
    description:
      "A production AI support platform for businesses across web chat, WhatsApp, and voice, with agent deployment, knowledge base ingestion, and human escalation in one workflow.",
    points: [
      "Engineered the AI agent stack in Go: a graph-based RAG pipeline, identity verification, and custom MCP server integrations that give each business per-tenant tool access.",
      "Built an analytics layer capturing conversation metrics, failure modes, and CSAT signals to drive continuous agent improvement.",
    ],
    stack: ["Go", "RAG", "MCP", "WhatsApp API", "Voice", "PostgreSQL"],
    demo: "https://verlyai.xyz",
    featured: true,
  },
  {
    name: "Insights",
    kind: "AI-powered e-learning platform",
    description:
      "An AI-driven learning platform delivering 100+ personalised courses with unit-wise breakdowns, interactive chapters, and shareable user-created modules.",
    points: [
      "Built a Gemini-powered content generation pipeline that auto-structures course material and pulls in matching YouTube videos.",
      "Added a contextual MCQ quiz system for automated learner assessment.",
    ],
    stack: ["Next.js", "Google Gemini", "TypeScript", "PostgreSQL", "Prisma"],
    image: "/insights.png",
    github: "https://github.com/dhakarRaghu/Insights",
    demo: "https://insights.raghvendra.tech/",
  },
  {
    name: "GitBuddy",
    kind: "AI GitHub SaaS for developers",
    description:
      "A full-stack SaaS that analyses repositories automatically, answers questions about a codebase, and summarises commit history for teams.",
    points: [
      "Integrated Google Gemini and AssemblyAI for code analysis and meeting transcription.",
      "Supports multi-project management with team collaboration and repository analytics.",
    ],
    stack: ["Next.js", "Google Gemini", "AssemblyAI", "LangChain", "Prisma"],
    image: "/gitbuddy.png",
    github: "https://github.com/dhakarRaghu/GitBuddy",
    demo: "https://gitbuddy.raghvendra.tech/",
  },
  {
    name: "Realtime Collaborative Workspace",
    kind: "Collaborative SaaS application",
    description:
      "A real-time document workspace where several people edit together, with live cursors, text selection, and presence indicators.",
    points: [
      "Used WebSockets for instant UI updates and Redis Pub/Sub for real-time message fan-out.",
    ],
    stack: ["Next.js", "Drizzle ORM", "Supabase", "WebSockets", "Redis"],
    image: "/cypress.png",
    github: "https://github.com/dhakarRaghu/Saas_colab_Space_",
  },
  {
    name: "WebGenie",
    kind: "Starter kit generator",
    description:
      "A CLI-driven generator that scaffolds web projects with a chosen stack, including Prisma, authentication, and framework presets.",
    points: [
      "Pre-configured dependencies and project structure cut setup time by roughly half.",
    ],
    stack: ["Next.js", "Node.js", "React", "TypeScript"],
    image: "/webgenie.png",
    github: "https://github.com/dhakarRaghu/WebGenie",
    demo: "https://web-genie-one.vercel.app/",
  },
  {
    name: "Learnify",
    kind: "AI learning platform",
    description:
      "A learning platform that generates a personalised course, unit by unit, from a topic the learner picks.",
    points: [],
    stack: ["Next.js", "Drizzle ORM", "PostgreSQL", "TypeScript"],
    image: "/learnify.png",
    github: "https://github.com/dhakarRaghu/Learnify",
    demo: "https://learnify-omega.vercel.app/",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "Python", "Java", "C++", "C", "SQL"],
  },
  {
    group: "Backend",
    items: ["gRPC / Protobuf", "REST APIs", "Node.js", "WebSockets", "Microservices", "Hexagonal Architecture"],
  },
  {
    group: "AI / LLM",
    items: ["RAG", "LangChain", "Google Gemini", "AssemblyAI", "ElevenLabs", "MCP", "LLM Evaluation (Maxim)"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes / Helm", "AWS (Bedrock, EC2, RDS)", "Redis", "Datadog", "Grafana", "GitLab CI", "Vercel"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Drizzle ORM", "Supabase"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
] as const;

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
  period: "Nov 2022 — Present",
  location: "Nagpur, Maharashtra",
  gpa: "8.03 / 10",
} as const;
