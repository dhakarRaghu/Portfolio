import Link from "next/link";

import { nav, site } from "@/lib/site";

const elsewhere = [
  { label: "GitHub", href: site.github },
  { label: "X", href: site.x },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading text-[17px] font-semibold tracking-tight text-fg">{site.name}</p>
          <p className="mt-2 max-w-[28ch] text-[13.5px] leading-relaxed text-fg-muted">
            Software engineer in Bengaluru. Backend systems and applied AI.
          </p>
        </div>

        <div>
          <p className="label">Read</p>
          <ul className="mt-3 space-y-1.5 text-[13.5px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="quiet text-fg-muted hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/papershelf" className="quiet text-fg-muted hover:text-fg">
                Papershelf
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="quiet text-fg-muted hover:text-fg">
                RSS
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="label">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-[13.5px]">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="quiet text-fg-muted hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-fg-faint">
          © {new Date().getFullYear()} {site.name}. Text is mine unless a source says otherwise.
        </p>
        <p className="label">Next.js · Markdown · No tracking</p>
      </div>
    </footer>
  );
}
