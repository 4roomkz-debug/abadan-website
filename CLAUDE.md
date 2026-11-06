# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Abadan & Co. — a marketing website for a business training and corporate education company based in Kazakhstan. Trilingual: Russian (primary), Kazakh, English — see **Internationalization** below. Deployed on Vercel, pushes to `main` trigger auto-deploy. Product context for design work: `PRODUCT.md`.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint (flat config)
npm run check:i18n  # How many kk/en keys are still untranslated (--strict exits 1)
```

## Tech Stack

- Next.js 16 (App Router) with Turbopack
- React 19, TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`)
- Framer Motion (animations), Swiper (carousels)
- Vercel Analytics

## Architecture

**Path alias:** `@/*` → `./src/*`
**Font:** Onest (Latin + Cyrillic + cyrillic-ext, weights 400–800, variable `--font-onest`). Not Manrope: Manrope has no Kazakh Ә Ғ Қ Ң Ұ. `body` references `--font-onest` directly — a `--font-sans` declared in `@theme inline` is not emitted as a CSS variable, which is why the site rendered in the system font until 06.11.2026.

### Internationalization

next-intl 4. All pages live in `src/app/[locale]/`; every URL has a language prefix: `/ru/...`, `/kk/...`, `/en/...`.

- `src/i18n/routing.ts` — locales, `INDEXED_LOCALES` (languages open to search engines; kk/en join only after a native speaker has proofread them — until then they are `noindex`, out of the sitemap and hreflang), `isRuOnlyPath()` (sections that exist only in Russian).
- `src/proxy.ts` — next-intl routing; `/kk/<ru-only section>` redirects to `/ru/...`.
- `next.config.ts` — old unprefixed URLs 308 → `/ru/...`; all `/ibirai` URLs 308 → `www.ibirai.com/ru` (ibirAi is a separate product with its own site).
- Strings: `src/messages/{ru,kk,en}/<namespace>.json`. **A new string goes into all three locales.** A key missing in kk/en falls back to Russian, so run `npm run check:i18n`.
- Internal links: `Link`, `usePathname`, `useRouter` from `@/i18n/navigation`, never `next/link` — they add the locale prefix.
- Page metadata: `generateMetadata` + `withLocale(baseMetadata, locale, path)` from `src/lib/seo.ts` (canonical, hreflang, og:locale).
- Russian-only for now: `/blog`, `/kejsy`, `/projects`, `/events/*`, `/breakfast`, `/welcome`, the seven `/treningi/neftegaz/*` subpages.
- `canon-guard` checks Russian retired phrasings only — a translation of a retired claim will not be caught; translate from current Russian copy.
- Testimonials stay verbatim; on kk/en a translation is marked as such.

### Routes

All routes below are under `/[locale]`.

| Route | Purpose |
|-------|---------|
| `/` | Homepage — «История обучения»: scroll-driven story of 5 illustrated eras (`src/components/story/*`), then upcoming courses, client logos, verbatim letter quotes, contact form, lead magnet. Scene data and hotspots: `story/scenes.ts`; texts: `messages/*/home.json`; art: `public/story/` (prompts in `.impeccable/mocks/`). The former 16 section components stay in `src/components/` unused for now. |
| `/about` | Company page — PGT framework, founder bio, hybrid model |
| `/welcome` | Founder's open letter to HR directors (not in footer, only header + direct link) |
| `/schedule` | Training schedule with category filters, modal registration, auto-hides past events |
| `/projects` | Projects showcase |
| `/coaching` | Executive coaching landing page — StoryBrand/PAS framework, 7-session program |
| `/events/business-breakfast-ai-hr` | Event detail page |
| `/breakfast` | Horizontal slide presentation |

Each route has a `layout.tsx` with SEO metadata (title, description, OpenGraph, canonical). When adding a new public route, also add it to `src/app/sitemap.ts`.

### API Routes

- `POST /api/contact` — Contact form → Telegram bot (uses `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). Receives `locale`; the lead carries «Язык сайта».
- `POST /api/chat` — AI chat assistant "Асем" via DeepSeek API (uses `DEEPSEEK_API_KEY`), auto-detects phone numbers and forwards leads to Telegram. Receives `locale` as the default reply language.

### Data Layer

No database. Static data files in `src/data/`:
- `schedule.ts` — `SCHEDULE_DATA` array of `ScheduleItem` (dates, prices, categories). Helper `parseDateForSort()`. Both `/schedule` page and `UpcomingTrainings` component consume this with `isEventPassed()` date filtering.
- `ai-knowledge.ts` — Large knowledge base for AI chat: company info, training catalog, 100+ technical seminars, pricing, FAQ.
- `testimonials.ts` — client testimonials, **verbatim quotes from thank-you letters only**. Used by `Testimonials` (homepage slider) and `ClientTestimonials` (training pages).

### Testimonials, cases and numbers — never invent

On 14.10.2026 the six `/treningi/*` pages turned out to carry 18 invented testimonials (fake names, stock "person" photos, made-up percentages) and 18 invented "case studies" with numbers — including a fake KMG project. All were removed. Rules:

- A testimonial comes only from `src/data/testimonials.ts`, and that file only from the vault note `Abadan Company/Отзывы клиентов — база.md` (scans of the letters). Quote verbatim; don't "improve" or add numbers.
- Signature = role + company, no personal names. KazMunayGas and Polpharma Santo are not named publicly — sign them by industry.
- Show which training the quote is about (`training` field), so a general quote on another course page doesn't pose as a review of that course.
- No client numbers, case studies or "results" without a source the founder confirmed. If a section needs proof and there is none — leave the section out rather than fill it.
- Confirmed by the founder on 14.10.2026, keep as is: the client logos (KMG, KazRosGaz, PetroKazakhstan, Kashagan, MMG, KBM, Samruk-Kazyna, Kazminerals) are real past clients — letters from those years were simply not archived; the header stats on `/treningi/*` ("65+ курсов", "200+ экспертов" etc.) are verified. Don't remove them for lack of a letter.

### Key Components

- `ScrollAnimationProvider` — Global in layout.tsx. Uses IntersectionObserver + MutationObserver to add `.visible` class to elements with `scroll-fade-in` (and variants) CSS classes.
- `AiChat` — Floating chat widget (hidden on `/breakfast`). Connects to `/api/chat`.
- `Header` / `Footer` — Shared navigation. Header has active route detection via `usePathname()` from `@/i18n/navigation` (path without the locale prefix) and holds `LanguageSwitcher`.
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
> **Under revision (06.11.2026).** The impeccable design audit (`.impeccable/critique/`) found that several patterns below read as AI slop: glow blurs, glass cards everywhere, `scroll-fade-in` on every block, gradient/two-tone headings, eyebrow chips, repeated stat bands, stock photos. The founder chose a **bold brand** direction. The future `DESIGN.md` replaces this block; until then, don't add new instances of those patterns. Brand palette and the "never invent" rules stay.

This site has a strong, established design identity. Preserve and extend it — do not drift toward generic "AI slop" aesthetics.

**Typography:** Always use Onest (already loaded, variable `--font-onest`). Never introduce Inter, Roboto, Arial, or system fonts. Use weight extremes: 400 for body, 700–800 for headings. Size jumps of 3x+, not 1.5x.

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
- Any font other than Onest
</frontend_aesthetics>

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
