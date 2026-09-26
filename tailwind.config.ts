import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-faint": "var(--fg-faint)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          wash: "var(--accent-wash)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius)",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
