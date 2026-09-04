import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        "bg-subtle": "hsl(var(--bg-subtle))",
        surface: "hsl(var(--surface))",
        fg: "hsl(var(--fg))",
        "fg-muted": "hsl(var(--fg-muted))",
        "fg-faint": "hsl(var(--fg-faint))",
        line: "hsl(var(--border))",
        "line-strong": "hsl(var(--border-strong))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          wash: "hsl(var(--accent-wash))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
