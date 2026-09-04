"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Switches between the light and dark palettes and remembers the choice. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be unavailable in private browsing. The toggle still works.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-8 w-8 place-items-center rounded border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {mounted && dark ? (
        <Sun className="h-[15px] w-[15px]" strokeWidth={1.6} />
      ) : (
        <Moon className="h-[15px] w-[15px]" strokeWidth={1.6} />
      )}
    </button>
  );
}
