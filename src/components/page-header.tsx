import type { ReactNode } from "react";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  count?: number;
  blurb?: string;
  /** Shown on the title line, at the right: an RSS link, for example. */
  actions?: ReactNode;
  children?: ReactNode;
};

/** Title block at the top of a page: title with a count, one-line blurb, then filters. */
export function PageHeader({ kicker, title, count, blurb, actions, children }: PageHeaderProps) {
  return (
    <header className="shell pb-6 pt-8 md:pt-10">
      {kicker ? <p className="label">{kicker}</p> : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h1 className="font-heading text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-fg md:text-[36px]">
          {title}
          {typeof count === "number" ? (
            <span className="ml-2 align-middle font-mono text-[15px] font-normal text-fg-faint">
              ({count})
            </span>
          ) : null}
        </h1>
        {actions}
      </div>
      {blurb ? (
        <p className="mt-2 max-w-[65ch] text-[15.5px] leading-relaxed text-fg-muted">{blurb}</p>
      ) : null}
      {children ? <div className="mt-5 border-t border-line pt-5">{children}</div> : null}
    </header>
  );
}
