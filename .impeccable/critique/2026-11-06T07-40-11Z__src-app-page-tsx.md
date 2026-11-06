---
target: abadan.kz core pages
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/Users/macbookpro/Проекты/Сайт Abadan/src/app/page.tsx"
target_fingerprint: "sha256:07ee9859c62332f88253e472acaf41a6647a99ef9c7b772e0ca781bb22779b49"
target_path: /Users/macbookpro/Проекты/Сайт Abadan/src/app/page.tsx
timestamp: 2026-11-06T07-40-11Z
slug: src-app-page-tsx
---
# Critique: abadan.kz core pages (home, about, treningi/hr, treningi/ai, coaching, ibirai, schedule) — 2026-11-06

Heuristics: 1=3, 2=3, 3=3, 4=2, 5=3, 6=3, 7=n/a (Persuade), 8=1, 9=3, 10=n/a (Persuade). Total 21/32 (66%, Acceptable).
Audit: A11y 2, Perf 2, Theming 2, Responsive 3, Integrity 1 = 10/20 (Acceptable).

Design specificity: category-interchangeable template (eyebrow chip + two-tone heading + icon-card grid repeated on every page) draped over real assets (Gallery photos 2024, verbatim testimonials, trainer photos, founder bio).

Priority issues:
- [P1] One compositional move repeated; home = 16 sections, 26 411px at 375px; "6 причин" duplicated home/about; stat trio repeated. -> distill, shape
- [P1] Unsplash stock skylines in src/components/InternationalPrograms.tsx:10-28 next to real photos. -> polish
- [P1] No <h1> on home: src/components/Hero.tsx:71 uses h2. -> harden
- [P1] Logo "Abadan" #F0BB1E on white, 1.77:1: src/components/Header.tsx:81. -> harden
- [P2] 6 /treningi/*/page.tsx ~1000 lines, 65-70% identical. -> extract
- [P2] 7+ CTA wordings without hierarchy. -> clarify
- [P2] Tap targets 17-20px in header/footer; Newsletter.tsx:104,112 inputs without labels; focus-visible not global; #7A8B8E on white 3.55:1. -> harden
Detector: CLI 7 (gradient-text x5 about/coaching, bounce-easing x2 AiChat). Browser overlay counts: / 107, /treningi/hr 40, /ibirai 44.
False positive dropped: "empty Stats block" was a capture artifact (count-up on IntersectionObserver), verified live.
