import type { ReactNode } from "react";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  count?: number;
  blurb?: string;
  children?: ReactNode;
};

/** Title block at the top of a list page: kicker, serif title, one-line blurb. */
export function PageHeader({ kicker, title, count, blurb, children }: PageHeaderProps) {
  return (
    <header className="shell pb-10 pt-12 md:pb-12 md:pt-16">
      {kicker ? <p className="label">{kicker}</p> : null}
      <h1 className="mt-2 font-heading font-semibold text-[36px] leading-[1.1] tracking-[-0.015em] text-fg md:text-[44px]">
        {title}
        {typeof count === "number" ? (
          <span className="ml-3 align-middle font-mono text-[14px] tracking-normal text-fg-faint">
            {count}
          </span>
        ) : null}
      </h1>
      {blurb ? (
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-fg-muted">{blurb}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
