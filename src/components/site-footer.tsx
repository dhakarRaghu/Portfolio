import Link from "next/link";

import { site } from "@/lib/site";

const links = [
  { label: "GitHub", href: site.github },
  { label: "X", href: site.x },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "RSS", href: "/rss.xml" },
];

/** One quiet line: who, the year, and where else to find him. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="shell flex flex-col gap-3 py-6 text-[13px] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link href="/about" className="quiet text-fg hover:text-accent">
            {site.name}
          </Link>
          . Backend systems and applied AI, Bengaluru.
        </p>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-4 gap-y-1">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="quiet hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
