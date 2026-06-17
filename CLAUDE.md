# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run Playwright E2E tests (requires dev server running)
npm run test:ui      # Playwright interactive UI mode
npm run test:report  # Open last HTML report
```

Install browsers on first run: `npx playwright install chromium`

## Environment

Requires `.env.local` with:
```
RESEND_API_KEY=re_...
```

Contact form at `POST /api/contact` sends emails to `erickfrancodelgado@hotmail.com` via Resend.

## Architecture

**Single-page portfolio** — all sections on one page with anchor scroll. No routing.

```
app/
  layout.tsx          # SEO metadata, Google Fonts (Inter + JetBrains Mono)
  page.tsx            # Assembles all sections in order
  globals.css         # Custom animations, utility classes (.gradient-text, .card-hover, .grid-bg)
  api/contact/route.ts # POST handler — validates body, sends email via Resend SDK

components/
  layout/             # Navbar (sticky, blur on scroll, hamburger mobile) + Footer (3-col grid)
  sections/           # One component per page section
  ui/                 # AnimatedCounter, SectionWrapper (IntersectionObserver fade-in), Icons (GitHub/LinkedIn SVG)

data/
  cv.ts               # Single source of truth for ALL content — personal info, experiences, skills, projects, certifications, blog posts
```

**Content updates:** edit only `data/cv.ts`. Components read from it — no content is hardcoded in components.

## Design tokens (tailwind.config.ts)

| Token | Value | Use |
|-------|-------|-----|
| `bg` | `#09090B` | Page background |
| `surface` | `#18181B` | Cards |
| `elevated` | `#27272A` | Inputs, badges |
| `accent` | `#818CF8` | Indigo — primary brand color |
| `pass` | `#4ADE80` | Green — QA "test pass" motif |

## Experience section specifics

Experiences in `data/cv.ts` have an `employer` field that drives grouping:
- `TECH_EMPLOYERS = ["IBM", "Auchan Retail", "Modis"]` → shown in main alternating timeline
- `OTHER_EMPLOYERS = ["TEJE", "Oidhaco"]` → shown in the same timeline below
- IBM defaults open (`defaultOpen: true`) and has visual prominence (`prominent: true`)
- New employer types need a corresponding entry in `employerMeta` and `typeStyle` in `Experience.tsx`

## Projects section specifics

Projects with `featured: true` get accent border + "Live ↗" badge. `github`/`demo` set to `"#"` = disabled (dimmed icon). The "Claude Code" tech tag renders with accent color.

## lucide-react caveat

Version 1.x removed brand icons. `Github` and `Linkedin` are NOT available from lucide-react. Use `components/ui/Icons.tsx` which exports `GithubIcon` and `LinkedinIcon` as inline SVGs.
