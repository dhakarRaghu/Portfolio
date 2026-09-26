"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the phone menu when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The bottom border appears only once the page scrolls under the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "header-bg sticky top-0 z-40 border-b transition-colors duration-200",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="group flex items-center gap-2.5 text-fg"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-fg font-mono text-[12px] font-medium tracking-tight text-bg transition-transform group-hover:scale-105"
          >
            RD
          </span>
          <span className="font-heading text-[16px] font-semibold tracking-tight">
            {site.shortName}
            <span className="text-fg-faint"> Dhakar</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <span aria-hidden className="mx-2 hidden h-5 w-px bg-line md:block" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="icon-btn md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={1.8} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <div className="shell flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="nav-link h-11 justify-start px-4 text-[15px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
