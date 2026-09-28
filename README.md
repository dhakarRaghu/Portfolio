# Raghvendra Singh Dhakar — personal site

A blog-first personal site. Posts, notes, paper notes and projects are
markdown files. The résumé lives on one page, `/about`.

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000. `npm run build` must pass before a push.

## Where the content lives

```
content/
  blog/         posts             -> /blog/<slug>
  notes/        short takeaways   -> /notes/<slug>
  papershelf/   paper notes       -> /papershelf/<slug>
  projects/     one file each     -> /projects (list only)
src/lib/content.ts   résumé data for /about
src/lib/site.ts      name, URL, navigation, categories, handles
```

One file per item: `content/<section>/<slug>.md`. The file name is the URL slug.

### Frontmatter

```yaml
---
title: "Why were the dashboards green while the model talked nonsense"
date: 2026-09-16
summary: "One line. Shown in lists, in the RSS feed and as the page description."
tags: [inference, vllm, evals]
category: inference          # one of the slugs in src/lib/site.ts
project: mission-hq          # optional: a slug in content/projects; shown under the byline
section: blog
draft: true                  # true = visible in dev only
---
```

Optional fields:

| Field | Used by | Meaning |
| --- | --- | --- |
| `updated` | all | date of the last change after publishing |
| `source`, `sourceTitle` | notes, papershelf | where the idea came from; shown under the title |
| `link`, `repo`, `image` | projects | live URL, source URL, screenshot in `public/` |
| `period`, `role`, `status` | projects | `status` is `active`, `shipped` or `archived` |
| `metric` | projects, blog | the one number the piece stands on |
| `featured` | projects | listed first |

`title`, `date`, `summary`, `tags`, `section`, `draft` are the fields Mission HQ's
`publish_post` writes, so a draft it produces needs no editing to build.

### Drafts

`draft: true` files render in `npm run dev` with a "draft" marker, so the layout
can be checked. Production builds skip them, and so do `/rss.xml` and
`/sitemap.xml`. To preview drafts in a production build, set `SHOW_DRAFTS=1`.

## Publishing flow

1. A markdown file lands in `content/` (written by hand, or drafted by Mission HQ).
2. Read it, edit it, set `draft: false`.
3. `git push`. Vercel builds and deploys.

Nothing else is needed. Categories and tags are read from the files at build time.

## Site settings

- The public URL is read from `NEXT_PUBLIC_SITE_URL`. Set it on Vercel when the
  domain exists. It is used for canonical URLs, Open Graph, RSS and the sitemap.
- Fonts are loaded as a Google Fonts stylesheet from `src/app/layout.tsx`.
  `next/font/google` failed at build time with this Next version, so it is not used.

## Structure

```
src/
  app/
    layout.tsx             fonts, metadata, theme script, header and footer
    page.tsx               home: intro, photo, recent posts, notes and featured projects
    blog/  notes/  papershelf/   list page + [slug] page each
    projects/page.tsx      project cards from content/projects
    about/page.tsx         the résumé
    rss.xml/route.ts       one feed for posts, notes and paper notes
    sitemap.ts  robots.ts  not-found.tsx
    globals.css            design tokens, prose styles, code block theme
  components/
    site-nav.tsx  site-footer.tsx  theme-toggle.tsx
    page-header.tsx        title block for list pages
    filters.tsx            category and tag chips (URL query filters)
    entry-list.tsx         rows, optionally grouped by year
    entry-page.tsx         one post or note: header, TOC, prose, related
    section-list-page.tsx  shared list page for the three sections
    prose.tsx  toc.tsx
  lib/
    posts.ts               reads and parses content/, draft rule, grouping
    markdown.ts            remark/rehype pipeline, TOC extraction, word count
    entry-metadata.ts      per-entry <head> metadata
    site.ts  content.ts
```

## Design notes

- The palette is the Mission HQ console palette: a warm cream page, white
  cards, warm hairline borders, radius 0.75rem. Tokens are oklch custom
  properties in `globals.css`. Light is the default; dark applies only when
  the visitor chooses it, and a blocking script applies the stored choice
  before first paint.
- One accent colour, used only for links, focus rings and small markers.
- Typography: Geist for text and headings, Geist Mono for labels and code.
  The reading column is 44rem.
- Code blocks are highlighted at build time with Shiki through
  `rehype-pretty-code`. Both palettes are in the HTML; `.dark` picks one.
- No animation apart from hover states. No analytics.
