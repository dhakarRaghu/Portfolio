import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Element, Root as HtmlRoot } from "hast";
import type { Root, Heading, Text, InlineCode, Code } from "mdast";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

const prettyCode: PrettyCodeOptions = {
  // Both palettes are rendered into the HTML. globals.css shows one of them
  // based on the .dark class, so the theme switch needs no re-render.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "text",
};

/**
 * A post opens with its result: a first paragraph that starts with a bold
 * "In short". It gets a class so the page can set it apart, because it is
 * the one paragraph every visitor reads.
 */
function rehypeInShort() {
  return (tree: HtmlRoot) => {
    const first = tree.children.find(
      (node): node is Element => node.type === "element",
    );
    if (!first || first.tagName !== "p") return;
    const lead = first.children[0];
    if (!lead || lead.type !== "element" || lead.tagName !== "strong") return;
    const label = lead.children[0];
    if (!label || label.type !== "text" || !/^in short\b/i.test(label.value)) return;
    first.properties = { ...first.properties, className: ["in-short"] };
  };
}

/**
 * A ```mermaid block is a figure, not code: a flow diagram or a chart. It
 * becomes <figure class="diagram"><pre class="mermaid">source</pre></figure>,
 * which the Diagrams client component draws in the page's theme. The pre has
 * no <code> child, so rehype-pretty-code leaves it alone. A block may start
 * with a line `%% caption: ...`, shown under the figure.
 */
function remarkMermaid() {
  return (tree: Root) => {
    tree.children = tree.children.map((node) => {
      if (node.type === "code" && (node as Code).lang === "widget") return widget(node as Code);
      if (node.type !== "code" || (node as Code).lang !== "mermaid") return node;
      const source = (node as Code).value;
      const caption = /^%%\s*caption:\s*(.+)$/m.exec(source)?.[1]?.trim();
      const children: Element[] = [
        {
          type: "element",
          tagName: "pre",
          properties: { className: ["mermaid"] },
          children: [{ type: "text", value: source }],
        },
      ];
      if (caption) {
        children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: caption }],
        });
      }
      return {
        type: "paragraph",
        children: [],
        data: { hName: "figure", hProperties: { className: ["diagram"] }, hChildren: children },
      } as unknown as Root["children"][number];
    });
  };
}

/**
 * A ```widget <name> block is an interactive piece, such as a calculator.
 * Its body is JSON props. It becomes <div class="widget" data-widget=...
 * data-props=...>, which the Widgets client component mounts. The div holds
 * a plain-text fallback for readers without JavaScript.
 */
function widget(node: Code): Root["children"][number] {
  const name = (node.meta ?? "").trim();
  let props = "{}";
  try {
    props = JSON.stringify(JSON.parse(node.value || "{}"));
  } catch {
    throw new Error(`widget ${name}: its props are not valid JSON`);
  }
  return {
    type: "paragraph",
    children: [],
    data: {
      hName: "div",
      hProperties: { className: ["widget"], dataWidget: name, dataProps: props },
      hChildren: [
        {
          type: "element",
          tagName: "p",
          properties: { className: ["widget-fallback"] },
          children: [{ type: "text", value: "Loading the interactive calculator." }],
        },
      ],
    },
  } as unknown as Root["children"][number];
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMermaid)
  // Posts are written by the owner and his own pipeline, so they may carry
  // HTML: a callout, a <details> fold for the arithmetic, a comparison table.
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeInShort)
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
