import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Root, Heading, Text, InlineCode } from "mdast";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

const prettyCode: PrettyCodeOptions = {
  // Both palettes are rendered into the HTML. globals.css shows one of them
  // based on the .dark class, so the theme switch needs no re-render.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "text",
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
    content: { type: "text", value: "#" },
  })
  .use(rehypePrettyCode, prettyCode)
  .use(rehypeStringify);

/** Renders markdown to HTML with heading anchors and highlighted code. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown);
  return String(file);
}

/** Text of a heading node, including inline code. */
function headingText(node: Heading): string {
  return node.children
    .map((child) => {
      if (child.type === "text") return (child as Text).value;
      if (child.type === "inlineCode") return (child as InlineCode).value;
      if ("children" in child) {
        return (child.children as Array<Text | InlineCode>)
          .map((c) => ("value" in c ? c.value : ""))
          .join("");
      }
      return "";
    })
    .join("")
    .trim();
}

/** The same slug rule rehype-slug uses (github-slugger). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** H2 and H3 headings, for a table of contents. Ignores headings in code. */
export function extractToc(markdown: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  for (const node of tree.children) {
    if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3)) continue;
    const text = headingText(node);
    if (!text) continue;
    let id = slugify(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    items.push({ id, text, depth: node.depth });
  }
  return items;
}

/** Plain-text word count of the prose, with code blocks removed. */
export function wordCount(markdown: string): number {
  const prose = markdown.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ");
  return prose.split(/\s+/).filter(Boolean).length;
}
