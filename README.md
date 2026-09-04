# Portfolio — Raghvendra Singh Dhakar

Personal site built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Where the content lives

All résumé content sits in one file: `src/lib/content.ts`.
Edit that file to update the profile, experience, projects, skills, ratings, and
education. The section components read from it, so no other file needs changes.

| Export | Used by |
| --- | --- |
| `profile`, `socials`, `navItems` | header, hero, contact, footer |
| `experience` | Experience section |
| `projects` | Selected work section |
| `skills` | Technical toolkit section |
| `ratings`, `highlights`, `education` | Competitive programming section |

## Structure

```
src/
  app/
    layout.tsx      fonts, metadata, theme script, header and footer
    page.tsx        section order
    globals.css     design tokens, base styles, reveal animation
  components/
    site-nav.tsx        sticky header with active-section tracking
    site-footer.tsx
    section-heading.tsx numbered section header
    reveal.tsx          scroll-into-view fade
    theme-toggle.tsx    light and dark switch
    sections/           one file per page section
  lib/
    content.ts      all résumé data
    utils.ts        className helper
```

## Design notes

- Two themes, light and dark, defined as HSL custom properties in `globals.css`.
  A blocking script in `layout.tsx` applies the stored theme before first paint.
- One accent colour, used only for links, focus rings, and small markers.
- Motion is limited to a single fade-and-rise on scroll. It turns off when the
  visitor sets `prefers-reduced-motion`.
- Typography: Newsreader for display text, Inter for body text, JetBrains Mono
  for labels and metadata.

## Assets

- `public/Raghvendra-Singh-Dhakar-Resume.pdf` — the file the Résumé links open.
- `public/me.jpg` — hero portrait.
- Project screenshots are PNGs in `public/`.
