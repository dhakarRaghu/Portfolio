import type { TocItem } from "@/lib/markdown";

/** Table of contents for a post. Shown beside the column on wide screens. */
export function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="On this page" className="toc border-l border-line">
      <p className="label mb-2 pl-3">On this page</p>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} data-depth={item.depth}>
          {item.text}
        </a>
      ))}
    </nav>
  );
}
