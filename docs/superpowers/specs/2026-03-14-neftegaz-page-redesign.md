# Neftegaz Page Redesign Spec

**Date:** 2026-03-14
**Page:** `/treningi/neftegaz`
**File:** `src/app/treningi/neftegaz/page.tsx`
**Goal:** Increase conversions (more course enrollments + corporate inquiries) through restructured funnel, real photography, better UX, and stronger social proof.

---

## Design Decisions

- **Depth:** Full rebuild — restructured sections, new components, removed decorative elements
- **Enrollment mechanic:** Modal form per course (click "Записаться" → modal with pre-filled course name)
- **Funnel structure:** "Expertise → Catalog → Trust" — show courses early, social proof reinforces after
- **Photography:** Stock video hero background, stock photos for testimonials and training gallery
- **Removed:** OilFlask animation (decorative, no conversion value)
- **Kept:** PumpJack (stays in directions section as visual element), pain/solution split screen (moved to bottom)

---

## New Section Order

### 1. Hero (reworked)

**Current:** CSS gradient background with animated glows.
**New:** Looping stock video background (oil rig, refinery, or field crew) with dark overlay (`bg-black/60`).

Changes:
- Replace CSS gradient with `<video autoPlay muted loop playsInline>` + dark overlay
- Video file: `/public/videos/neftegaz-hero.mp4` (stock, ~3-5 MB, 1080p, 10-15 sec loop)
- Provide WebM fallback for smaller size
- Keep breadcrumbs, badge "65+ курсов", headline, subheading, stats grid
- **CTAs simplified:** Primary "Заказать обучение" (gold-button → #form), Secondary "Смотреть курсы" (dark-button-outline → #schedule)
- Client logos marquee stays in hero (as-is)
- Remove parallax hero glows (video replaces them)

### 2. Directions + PumpJack (reworked)

**Current:** PumpJack SVG animation + 6 static cards.
**New:** 6 cards become clickable category filters that scroll to schedule.

Changes:
- Each card displays course count: e.g. "Бурение и строительство скважин — 12 курсов"
- Click on card: smooth scroll to #schedule + set active filter to that category
- Cards need a `category` field mapping to filter logic
- PumpJack stays as background visual element (no changes to animation)
- Category mapping: each `programArea` gets a `keywords: string[]` array matching `OG_KEYWORDS` subsets

Category-to-keyword mapping:
- Бурение: `["бурен", "скважин", "цементирован", "долот", "каротаж", "перфорац", "инклинометр", "горизонтальн", "Ротор"]`
- Добыча: `["добыч", "эксплуатац", "КРС", "ГРП", "НГДУ", "интенсификац", "нефтеотдач", "газлифт", "фонтан", "АСПО", "насос", "месторожден", "промыслов", "пласт"]`
- Переработка: `["переработк", "крекинг", "ректификац", "катализ", "нефтехим", "битум", "мазут", "дизельн", "бензин", "абсорбц", "обессоливан", "обезвожив", "сепарац"]`
- Транспортировка: `["трубопровод", "нефтебаз", "газохранилищ", "магистральн", "резервуар", "ГСМ", "диспетчериз", "телемеханик"]`
- Безопасность: `["сероводород", "коррози", "факельн"]`
- КИПиА: `["КИП", "автоматизац", "метрологи", "контрольно-измерит"]`

Course count per category: computed dynamically from `SCHEDULE_DATA` using these keyword subsets.

### 3. Schedule (full rebuild)

**Current:** Flat list, 12 items, "Подробнее" → /schedule, no filtering.
**New:** Filterable list with inline enrollment.

Changes:
- **Filter bar:** Horizontal scrollable row of category buttons: "Все", "Бурение", "Добыча", "Переработка", "Транспортировка", "Безопасность", "КИПиА"
- Active filter highlighted with teal background
- Clicking a direction card (section 2) sets the active filter and scrolls here
- State: `activeCategory: string | null` (null = show all)
- Each training item gets a **"Записаться" button** (gold-button, small) replacing "Подробнее"
- "Записаться" opens **enrollment modal**
- Keep "Показать все X курсов" expand button
- Keep existing item layout (name, date, hours, price)

**Enrollment Modal:**
- Overlay with dark backdrop (`bg-black/50`)
- Centered card (max-w-md) with:
  - Header: "Записаться на курс"
  - Course name displayed (pre-filled, read-only context)
  - Course date + price shown
  - Form fields: Имя (required), Телефон (required), Компания (optional)
  - Submit button: "Отправить заявку" (gold-button)
  - Close button (X in corner)
- POST to `/api/contact` with body:
  ```json
  {
    "name": "...",
    "phone": "...",
    "message": "[Нефтегаз: Название курса] Дата: X, Компания: Y"
  }
  ```
- States: idle → sending → success (checkmark + "Заявка отправлена")
- Close on backdrop click or Escape key
- Prevent body scroll when open

### 4. Training Process Gallery (new section)

**Purpose:** Show what training looks like — reduces anxiety, builds trust.

Content:
- Light background (`section-white` or `bg-[#F8FAFA]`)
- Heading: "Как проходит обучение"
- Subheading: "80% практики на реальных кейсах и оборудовании"
- 3-4 stock photos in a responsive grid (2 cols mobile, 4 cols desktop):
  1. Classroom/lecture setting with industrial workers
  2. Hands-on practice at facility/equipment
  3. Field training on site
  4. Certification/graduation moment
- Photos: `/public/images/neftegaz/training-1.jpg` through `training-4.jpg`
- Each photo has a short caption overlay at bottom (semi-transparent dark strip)
- Scroll fade-in with staggered delays

### 5. Metrics + Testimonials (reworked)

**Current:** OilFlask + 3 metrics cards + 1 testimonial.
**New:** Metrics cards + 2-3 testimonials with photos.

Changes:
- **Remove OilFlask** component entirely
- **Metrics:** 3 cards with icons, larger text, dark gradient background
  - ↓ 40% снижение аварийности
  - ↑ 25% рост производительности
  - ↓ 60% время адаптации
  - Each card: icon + large number + label + one-line context
- **Testimonials:** 2-3 testimonials in a horizontal carousel (Swiper) or grid
  - Each: quote, author photo (stock portrait), name, title, company/sector
  - Photos: `/public/images/neftegaz/person-1.jpg`, `person-2.jpg`, `person-3.jpg`
  - Testimonial data (extend existing):
    1. Марат Кенжебаев, Начальник отдела обучения, нефтесервисная компания (existing)
    2. Айгуль Нурланова, HR-директор, нефтеперерабатывающий завод (new)
    3. Серик Абдрахманов, Главный инженер, буровая компания (new)

### 6. Pain / Solution (moved to bottom, unchanged)

**Current position:** 2nd section. **New position:** 5th section.
No visual changes. Catches late-stage doubters who scroll past the catalog.

### 7. Corporate Form (improved)

**Current:** 3 fields (name, phone, company).
**New:** 4 fields + micro-guarantee.

Changes:
- Add field: "Количество сотрудников" (optional, type="number", placeholder="~количество")
- Add text below submit button: "Подготовим предложение за 24 часа" (small, white/60)
- POST body adds employee count: `message: "[Нефтегаз тренинги] Компания: X, Сотрудников: Y"`
- Visual layout unchanged (dark gradient + glows)

### Sticky CTA (reworked)

**Current:** "Заказать обучение" → #form.
**New:** "Записаться на курс" → #schedule.
- More relevant — directs to course selection, not generic form
- Same visual style (gold-button + shadow)

---

## Assets Needed

### Stock Video (Hero)
- Content: Oil rig, refinery panorama, or field crew at work
- Format: MP4 (H.264) + WebM (VP9) fallback
- Duration: 10-15 seconds, seamless loop
- Resolution: 1920x1080, compressed to ~3-5 MB
- Placement: `/public/videos/neftegaz-hero.mp4`, `/public/videos/neftegaz-hero.webm`
- Source: Pexels, Coverr, or Pixabay (free commercial use)

### Stock Photos — Training Gallery
- 4 photos showing industrial training scenarios
- Format: WebP, ~800x600, optimized
- Placement: `/public/images/neftegaz/training-1.webp` through `training-4.webp`

### Stock Photos — Testimonial Portraits
- 3 professional headshots (Central Asian features preferred for authenticity)
- Format: WebP, ~200x200, circular crop
- Placement: `/public/images/neftegaz/person-1.webp` through `person-3.webp`

---

## Components Changed/Added

| Component | Action | Notes |
|-----------|--------|-------|
| `OilFlask` | **Remove** | No conversion value |
| `OilPumpJack` | Keep | Stays in directions section |
| `StickyCTA` | Modify | Change text + href to #schedule |
| `EnrollmentModal` | **New** | Modal form for individual course enrollment |
| `CategoryFilter` | **New** | Horizontal filter bar for schedule |
| `TrainingGallery` | **New** | Photo grid section |
| `TestimonialCarousel` | **New** | Multi-testimonial section with photos |
| Hero section | Modify | Video background, simplified CTAs |
| Schedule section | Modify | Add filters + enrollment buttons |
| Corporate form | Modify | Add employee count field + guarantee text |
| Pain/Solution | Move | From position 2 → position 5 |

---

## Technical Notes

- Video lazy-loading: Use `preload="none"` or `preload="metadata"` + IntersectionObserver to load on viewport entry (hero is immediately visible, so `preload="auto"` is acceptable)
- Modal: Use React portal (`createPortal`) or inline with `fixed inset-0 z-50`
- Category state: Lifted to page level via `useState<string | null>(null)`, passed to both directions cards and schedule filter
- No new dependencies needed — Framer Motion and existing tools handle everything
- Scroll-to with offset: `element.scrollIntoView({ behavior: 'smooth' })` with slight timeout after filter state change
