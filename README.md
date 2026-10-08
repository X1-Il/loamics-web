# Loamics website

A complete redesign of [loamics.com](https://loamics.com): new minimalist identity, same film,
same content, rebuilt with Next.js 16 (App Router, Cache Components), React 19, TypeScript and
Tailwind CSS 4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + unit tests
npm run build      # every page is prerendered static; only /api/contact is dynamic
```

## What is in the box

| Area | Highlights |
| --- | --- |
| **Identity** | New monoline wordmark where the "O" becomes the symbol: an open orbit and a docking node. One geometry source (`src/components/brand/paths.ts`) feeds the React logo, favicon, Apple icon, OG image, downloadable SVGs and the film. |
| **Film** (`/film`) | 44-second marketing film rendered live on canvas: `render(ctx, t)` is a pure function of time, so it scrubs, deep-links (`/film?t=19`), honours reduced motion, has a generative WebAudio soundtrack and exports to MP4/WebM with `MediaRecorder`. |
| **Interactive explainers** | Live ingest stream (DataCollect), schema-on-read vs write with metadata catalog (DataLake), a real 4-step data-cleaning pipeline (AlgoEngine), ETL vs ELT, k-means++ clustering with elbow chart (Augmented BI). |
| **Brand page** (`/brand`) | Logo system, construction drawing, palette with copy-to-clipboard, type scale, icon set, SVG downloads. |
| **Navigation** | ⌘K / Ctrl+K command palette, scroll-spy tables of contents, breadcrumbs with JSON-LD. |

## Architecture

```
src/
  app/                    routes (all static) + /api/contact + metadata files (sitemap, robots, OG…)
  content/                every word of copy, typed; pages render data, not hard-coded text
  components/
    brand/                logo, icon set, shared geometry
    film/                 engine.ts (pure renderer) · audio.ts · FilmPlayer.tsx
    viz/                  interactive explainers
    home/ software/ sections/ layout/ ui/
  lib/                    kmeans · dataquality · contact schema · hooks · math (unit tested)
scripts/                  snap.mjs (full-page visual QA) · snap-film.mjs (one still per scene)
```

Engineering choices worth knowing:

- **Zero animation libraries.** Scroll reveals use CSS scroll-driven animations
  (`animation-timeline: view()`), progressive: without support, content is simply visible.
- **No hydration hazards.** Browser state (media queries, scroll, feature detection) is read through
  `useSyncExternalStore` hooks in `src/lib/hooks.ts`; random data is seeded and quantized so the
  server and the browser render byte-identical SVG.
- **Off-screen work stops.** The pipeline's SMIL animations, the live stream and the film pause when
  not visible.
- **Accessible by default.** Skip link, WAI-ARIA tabs and combobox, focus rings, reduced-motion
  support, validated categorical palette (shape + label secondary encoding), descriptive link text.

## Contact form

`POST /api/contact` validates with the same schema as the client (`src/lib/contact.ts`), drops bots
through a honeypot and rate-limits per IP. Set `CONTACT_WEBHOOK_URL` to forward submissions
(CRM, Slack, e-mail relay). Without it, production returns `503` rather than pretending a message
was delivered.

## Quality bar (measured locally, production build)

- Lighthouse desktop: Performance 98–100 · Accessibility 100 · Best practices 100 · SEO 100
- Lighthouse mobile (simulated slow 4G): Performance 84–93 · Accessibility 96–100 · Best practices 100 · SEO 100
- 11 unit tests (k-means, data-quality pipeline, contact validation), ESLint and TypeScript clean.

## Content notes for the Loamics team

Copy is reproduced from loamics.com. A few source errors were corrected and should be validated:

- References to *Energisme* (consent text, legal notice, DPO e-mail) were replaced with Loamics /
  contact@loamics.com.
- A paragraph about the *French Accreditation Committee* in the legal notice was generalised.
- The "ETL (Extract Transform Load)" section on /software actually describes ELT; it is now titled "ETL vs ELT".
