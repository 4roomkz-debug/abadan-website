# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Abadan & Co. — a marketing website for a business training and corporate education company based in Kazakhstan. All content is in Russian. Deployed on Vercel, pushes to `main` trigger auto-deploy.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint (flat config)
```

## Tech Stack

- Next.js 16 (App Router) with Turbopack
- React 19, TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`)
- Framer Motion (animations), Swiper (carousels)
- Vercel Analytics

## Architecture

**Path alias:** `@/*` → `./src/*`
**Font:** Manrope (Latin + Cyrillic, weights 400–800, variable `--font-manrope`)

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage — single-page landing composed of 16 section components |
| `/about` | Company page — PGT framework, founder bio, hybrid model |
| `/welcome` | Founder's open letter to HR directors (not in footer, only header + direct link) |
| `/schedule` | Training schedule with category filters, modal registration, auto-hides past events |
| `/projects` | ibirAi platform showcase |
| `/coaching` | Executive coaching landing page — StoryBrand/PAS framework, 7-session program |
| `/events/business-breakfast-ai-hr` | Event detail page |
| `/breakfast` | Horizontal slide presentation |

Each route has a `layout.tsx` with SEO metadata (title, description, OpenGraph, canonical). When adding a new public route, also add it to `src/app/sitemap.ts`.

### API Routes

- `POST /api/contact` — Contact form → Telegram bot (uses `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- `POST /api/chat` — AI chat assistant "Асем" via DeepSeek API (uses `DEEPSEEK_API_KEY`), auto-detects phone numbers and forwards leads to Telegram

### Data Layer

No database. Static data files in `src/data/`:
- `schedule.ts` — `SCHEDULE_DATA` array of `ScheduleItem` (dates, prices, categories). Helper `parseDateForSort()`. Both `/schedule` page and `UpcomingTrainings` component consume this with `isEventPassed()` date filtering.
- `ai-knowledge.ts` — Large knowledge base for AI chat: company info, training catalog, 100+ technical seminars, pricing, FAQ.

### Key Components

- `ScrollAnimationProvider` — Global in layout.tsx. Uses IntersectionObserver + MutationObserver to add `.visible` class to elements with `scroll-fade-in` (and variants) CSS classes.
- `AiChat` — Floating chat widget (hidden on `/breakfast`). Connects to `/api/chat`.
- `Header` / `Footer` — Shared navigation. Header has active route detection via `usePathname()`.
- `Contact` — Form that POSTs to `/api/contact`.

### Scroll Animation System

CSS classes in `globals.css` start with `opacity: 0` and transition to visible:
- `.scroll-fade-in`, `.scroll-fade-in-left`, `.scroll-fade-in-right`, `.scroll-scale-in`, `.scroll-blur-in`
- Stagger delays: `.scroll-delay-1` through `.scroll-delay-6`
- `ScrollAnimationProvider` adds `.visible` class on scroll intersection

### Custom CSS Classes

Defined in `globals.css` — use these instead of reinventing:
- **Cards:** `.premium-card`, `.glass-card`, `.glass-card-teal`, `.glass-card-gold`, `.dark-card`
- **Buttons:** `.gold-button` (primary CTA), `.dark-button` / `.teal-button` (secondary), `*-outline` variants
- **Text gradients:** `.text-gradient-primary`, `.text-gradient-gold`, `.text-gradient-mixed`
- **Inputs:** `.dark-input`
- **Sections:** `.section-white`, `.section-subtle` (alternating backgrounds)

### Brand Colors

- Primary (Teal): `#00767D` / dark `#006D77` / light `#009BA3`
- Gold (Mustard): `#F0BB1E` / dark `#EBB417`
- Foreground: `#2D3A3C`, muted `#546569`, subtle `#7A8B8E`
- Background: `#FFFFFF`, elevated `#F8FAFA`

## UI & Design Principles

<frontend_aesthetics>
This site has a strong, established design identity. Preserve and extend it — do not drift toward generic "AI slop" aesthetics.

**Typography:** Always use Manrope (already loaded, variable `--font-manrope`). Never introduce Inter, Roboto, Arial, or system fonts. Use weight extremes: 400 for body, 700–800 for headings. Size jumps of 3x+, not 1.5x.

**Color discipline:** Commit to the teal + gold palette. Dominant dark backgrounds (`#1a2e30`, `#0d2628`) with teal and gold accents — not timid, evenly-distributed colors. Avoid purple gradients or blue-heavy schemes entirely.

**Backgrounds:** Add atmosphere with layered gradients, ambient glow blurs (`bg-[color]/10 rounded-full blur-[120px]`), or subtle geometric patterns. Never default to a plain white or grey section without purpose.

**Motion:** Use `scroll-fade-in` + `scroll-delay-*` classes for entrance animations. For interactive elements, CSS transitions (`transition-all`, `hover:gap-3`) over heavy JS animation. One well-orchestrated page-load sequence is better than scattered micro-interactions.

**Component patterns to follow (not reinvent):**
- Section alternation: `.section-white` / `bg-[#F8FAFA]` / dark gradient hero
- Cards: `.glass-card`, `.premium-card`, `.dark-card` — pick by context
- CTAs: `.gold-button` (primary), `.teal-button` / `.dark-button` (secondary)
- Dark hero sections use `bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]`

**Avoid:**
- New color variables that aren't in the brand palette
- Shadows that look "Material Design" or corporate-flat
- Layouts that look like a Bootstrap template
- Any font other than Manrope
</frontend_aesthetics>
