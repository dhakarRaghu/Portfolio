"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the nav item for the section currently in the upper viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((node): node is Element => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="font-serif text-[17px] tracking-tight text-fg transition-opacity hover:opacity-70"
        >
          {profile.shortName}
          <span className="text-fg-faint">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded px-3 py-1.5 text-[13px] transition-colors",
                active === item.href
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded border border-line px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-block"
          >
            Résumé
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-8 w-8 place-items-center rounded border border-line text-fg-muted transition-colors hover:text-fg md:hidden"
          >
            {open ? (
              <X className="h-[15px] w-[15px]" strokeWidth={1.6} />
            ) : (
              <Menu className="h-[15px] w-[15px]" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="shell flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-[15px] text-fg-muted last:border-0 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="py-3 text-[15px] text-fg-muted hover:text-fg"
            >
              Résumé
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
