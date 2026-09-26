import type { ReactNode } from "react";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  count?: number;
  blurb?: string;
  children?: ReactNode;
};

/** Title block at the top of a page: kicker, title with an optional count, blurb. */
export function PageHeader({ kicker, title, count, blurb, children }: PageHeaderProps) {
  return (
    <header className="shell pb-10 pt-12 md:pb-12 md:pt-16">
      {kicker ? <p className="label">{kicker}</p> : null}
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="font-heading text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg md:text-[46px]">
          {title}
        </h1>
        {typeof count === "number" ? (
          <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[12px] text-fg-muted">
            {count}
          </span>
        ) : null}
      </div>
      {blurb ? (
        <p className="mt-4 max-w-[60ch] text-[16.5px] leading-relaxed text-fg-muted">{blurb}</p>
      ) : null}
      {children ? <div className="mt-7">{children}</div> : null}
    </header>
  );
}
