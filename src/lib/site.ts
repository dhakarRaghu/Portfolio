/**
 * Site-wide settings: name, URL, navigation, the fixed set of blog
 * categories, and the social handles. Résumé content stays in content.ts.
 */

/** The live domain. NEXT_PUBLIC_SITE_URL on Vercel overrides it. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.raghvendra.xyz";

export const site = {
  name: "Raghvendra Singh Dhakar",
  shortName: "Raghvendra",
  title: "Raghvendra Singh Dhakar",
  description:
    "Software engineer in Bengaluru working on backend systems and applied AI: agents, retrieval, guardrails and evals. Blog posts, notes, videos and projects.",
  locale: "en_IN",
  twitterHandle: "@Raghvendra56595",
  github: "https://github.com/dhakarRaghu",
  linkedin: "https://www.linkedin.com/in/raghvendra1853/",
  x: "https://x.com/Raghvendra56595",
  email: "raghvendrasinghdhakar2@gmail.com",
  /** One line under the name in a post's byline. */
  tagline: "Backend systems and applied AI. Always building.",
  portrait: "/me-portrait.jpg",
} as const;

/** Contact rows shown beside the photo on the home and About pages. */
export const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: "dhakarRaghu", href: site.github },
  { label: "X", value: "Raghvendra56595", href: site.x },
  { label: "LinkedIn", value: "raghvendra1853", href: site.linkedin },
] as const;

export const nav = [
  { label: "Blog", href: "/blog" },
  { label: "Notes", href: "/notes" },
  { label: "Videos", href: "/videos" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

/** Sections that live in the content folder. */
export type Section = "blog" | "notes" | "papershelf" | "projects";

export const sections: Record<
  Section,
  { label: string; singular: string; blurb: string }
> = {
  blog: {
    label: "Blog",
    singular: "post",
    blurb:
      "Long-form essays on AI systems, retrieval, LLM inference, evals and the backend systems around them. Each one teaches one topic from first principles.",
  },
  notes: {
    label: "Notes",
    singular: "note",
    blurb: "One idea per note, with the source it came from.",
  },
  papershelf: {
    label: "Papershelf",
    singular: "paper note",
    blurb: "Papers I read closely: what they claim, what they measured, and where the result stops holding.",
  },
  projects: {
    label: "Projects",
    singular: "project",
    blurb: "Things I built, with links to the code or the product where they are public.",
  },
};

/**
 * The fixed list of categories. A post names one of these in its
 * frontmatter. Keep the list short so the filter row stays readable.
 */
export const categories = [
  { slug: "inference", label: "Inference and serving" },
  { slug: "retrieval", label: "Retrieval" },
  { slug: "agents", label: "Agents" },
  { slug: "evals", label: "Evals and observability" },
  { slug: "backend", label: "Backend systems" },
  { slug: "career", label: "Career and learning" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function categoryLabel(slug: string | undefined): string | undefined {
  return categories.find((c) => c.slug === slug)?.label;
}
