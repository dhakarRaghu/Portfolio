import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

/**
 * Numbered section header: a mono index, a serif title, and a hairline rule
 * that runs to the end of the column.
 */
export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="label pt-1">{index}</span>
        <h2 className="font-serif text-[28px] font-normal leading-tight tracking-tight text-fg md:text-[34px]">
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 translate-y-[-6px] bg-line" />
      </div>
      {description ? (
        <p className="mt-4 max-w-prose pl-0 text-[15px] leading-relaxed text-fg-muted md:pl-[3.25rem]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
