# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Abadan & Co. landing page — a single-page marketing website for a business training and corporate education company based in Kazakhstan. The site is in Russian.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4

## Architecture

Single-page landing with sections composed in `src/app/page.tsx`. All section components are in `src/components/`:

- Hero, About, VisionMission — intro sections
- Problems, Features, Stats — value proposition
- Clients, TrainingDirections, Formats — services
- WhyChooseUs, Trainers — trust building
- Contact, Footer — CTA and footer

Path alias: `@/*` maps to `./src/*`

Font: Inter (Latin + Cyrillic via `next/font/google`)
