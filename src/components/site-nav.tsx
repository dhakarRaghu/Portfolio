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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="header-bg sticky top-0 z-40 border-b border-line">
      <nav className="shell flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading font-semibold text-[19px] tracking-tight text-fg transition-opacity hover:opacity-70"
        >
          {site.shortName}
          <span className="text-fg-faint"> Dhakar</span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded px-3 py-1.5 text-[13.5px] transition-colors",
                isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
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
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-line py-3 text-[15px] last:border-0",
                  isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
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
