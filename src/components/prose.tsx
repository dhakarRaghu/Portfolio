import { Diagrams } from "@/components/diagrams";
import { Widgets } from "@/components/widgets";
import { renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

type ProseProps = {
  markdown: string;
  className?: string;
};

/** Renders a markdown body as the article column. Server component. */
export async function Prose({ markdown, className }: ProseProps) {
  const html = await renderMarkdown(markdown);
  return (
    <>
      <div className={cn("prose", className)} dangerouslySetInnerHTML={{ __html: html }} />
      {html.includes('class="mermaid"') ? <Diagrams /> : null}
      {html.includes('class="widget"') ? <Widgets /> : null}
    </>
  );
}
