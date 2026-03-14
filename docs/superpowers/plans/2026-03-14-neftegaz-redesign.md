# Neftegaz Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/treningi/neftegaz` page for higher conversions — restructured funnel, video hero, category filtering, enrollment modal, stronger social proof.

**Architecture:** Single `page.tsx` file with inline components (matching existing pattern). Data structures extended with category/keyword fields. New components: `EnrollmentModal`, `CategoryFilter`, `TrainingGallery`, `TestimonialGrid` — all defined inline in page.tsx. Stock assets sourced from free services.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-14-neftegaz-page-redesign.md`

---

## Chunk 1: Assets & Data Layer

### Task 1: Download and place stock assets

All assets are sourced from free stock services (Pexels, Pixabay, Coverr). This task creates the directory structure and downloads placeholder assets.

**Files:**
- Create: `public/videos/neftegaz-hero.mp4`
- Create: `public/videos/neftegaz-hero.webm`
- Create: `public/images/neftegaz/hero-poster.webp`
- Create: `public/images/neftegaz/training-1.webp` through `training-4.webp`
- Create: `public/images/neftegaz/person-1.webp` through `person-3.webp`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p public/videos public/images/neftegaz
```

- [ ] **Step 2: Download hero video**

Use WebSearch to find a free stock video on Pexels/Pixabay. Search: "oil refinery aerial drone". Download a 10-15 sec 1080p clip.

```bash
# First, check if ffmpeg is available (needed for video conversion)
which ffmpeg || echo "INSTALL REQUIRED: brew install ffmpeg"
which cwebp || echo "INSTALL REQUIRED: brew install webp"
```

Download the video (use the actual URL from Pexels/Pixabay):
```bash
curl -L "<ACTUAL_PEXELS_DOWNLOAD_URL>" -o public/videos/neftegaz-hero.mp4
```

Convert to WebM + extract poster:
```bash
ffmpeg -i public/videos/neftegaz-hero.mp4 -c:v libvpx-vp9 -b:v 1M -an public/videos/neftegaz-hero.webm
ffmpeg -i public/videos/neftegaz-hero.mp4 -vframes 1 -q:v 2 /tmp/poster.jpg
cwebp /tmp/poster.jpg -o public/images/neftegaz/hero-poster.webp -q 80 -resize 1920 1080
```

**If ffmpeg/cwebp not installed:** Download MP4 only, skip WebM and poster. The hero has a CSS gradient fallback so the page works without video assets.

- [ ] **Step 3: Download training gallery photos**

Use WebSearch to find 4 free stock photos on Pexels/Pixabay. Search terms:
1. "industrial training classroom workers" → download as `training-1`
2. "oil refinery workers equipment practice" → download as `training-2`
3. "field engineer oil rig safety" → download as `training-3`
4. "corporate certificate ceremony" → download as `training-4`

Convert to WebP (or download as JPEG and use Next.js Image optimization):
```bash
# If cwebp available:
for i in 1 2 3 4; do
  cwebp /tmp/training-$i.jpg -o public/images/neftegaz/training-$i.webp -q 80 -resize 800 600
done
# If cwebp NOT available: save as .jpg and update trainingPhotos data to use .jpg extension
```

- [ ] **Step 4: Download testimonial portrait photos**

Use WebSearch for 3 free professional headshot photos on Pexels/Pixabay (Central Asian features preferred):
```bash
# If cwebp available:
for i in 1 2 3; do
  cwebp /tmp/person-$i.jpg -o public/images/neftegaz/person-$i.webp -q 80 -resize 200 200
done
# If cwebp NOT available: save as .jpg and update testimonials data to use .jpg extension
```

- [ ] **Step 5: Verify all assets exist**

```bash
ls -la public/videos/neftegaz-hero.mp4 public/videos/neftegaz-hero.webm
ls -la public/images/neftegaz/hero-poster.webp
ls -la public/images/neftegaz/training-{1,2,3,4}.webp
ls -la public/images/neftegaz/person-{1,2,3}.webp
```

Expected: All 10 files present.

- [ ] **Step 6: Commit assets**

```bash
git add public/videos/neftegaz-hero.mp4 public/videos/neftegaz-hero.webm
git add public/images/neftegaz/
git commit -m "feat(neftegaz): add stock video and photos for page redesign"
```

---

### Task 2: Extend programAreas data with categories and keywords

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` (lines 38-94, `programAreas` array)

- [ ] **Step 1: Add `category` and `keywords` fields to each programArea**

In `src/app/treningi/neftegaz/page.tsx`, replace the `programAreas` array. Each item gains `category: string` and `keywords: string[]`:

```tsx
const programAreas = [
  {
    title: "Бурение и строительство скважин",
    desc: "Проектирование, технологии бурения, крепление, цементирование, горизонтальное бурение",
    category: "drilling",
    keywords: ["бурен", "скважин", "цементирован", "долот", "каротаж", "перфорац", "инклинометр", "горизонтальн", "Ротор"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Добыча и эксплуатация",
    desc: "Разработка месторождений, интенсификация, КРС, ГРП, механизированная добыча, газлифт",
    category: "extraction",
    keywords: ["добыч", "эксплуатац", "КРС", "ГРП", "НГДУ", "интенсификац", "нефтеотдач", "газлифт", "фонтан", "АСПО", "насос", "месторожден", "промыслов", "пласт"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Переработка и нефтехимия",
    desc: "Первичная и глубокая переработка, крекинг, ректификация, контроль качества нефтепродуктов",
    category: "refining",
    keywords: ["переработк", "крекинг", "ректификац", "катализ", "нефтехим", "битум", "мазут", "дизельн", "бензин", "абсорбц", "обессоливан", "обезвожив", "сепарац"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Транспортировка и хранение",
    desc: "Магистральные трубопроводы, нефтебазы, газохранилища, диспетчеризация, телемеханика",
    category: "transport",
    keywords: ["трубопровод", "нефтебаз", "газохранилищ", "магистральн", "резервуар", "ГСМ", "диспетчериз", "телемеханик"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Промышленная безопасность",
    desc: "Сероводород, коррозия, экология, охрана труда, аварийные ситуации, стандарты ISO",
    category: "safety",
    keywords: ["сероводород", "коррози", "факельн"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "КИПиА и автоматизация",
    desc: "Контрольно-измерительные приборы, метрология, SCADA, автоматизация технологических процессов",
    category: "automation",
    keywords: ["КИП", "автоматизац", "метрологи", "контрольно-измерит"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];
```

- [ ] **Step 2: Add category filter helper function**

Below the existing `isNeftegazTraining` function, add:

```tsx
function getTrainingsByCategory(category: string): typeof neftegazTrainings {
  const area = programAreas.find((a) => a.category === category);
  if (!area) return neftegazTrainings;
  return neftegazTrainings.filter((t) => {
    const lower = t.name.toLowerCase();
    return area.keywords.some((kw) => lower.includes(kw.toLowerCase()));
  });
}

function getCourseCount(category: string): number {
  return getTrainingsByCategory(category).length;
}
```

- [ ] **Step 3: Add testimonials data**

Below the `programAreas` array, add:

```tsx
const testimonials = [
  {
    quote: "После внедрения программы обучения от Abadan аварийность на наших объектах снизилась на 40%, а время адаптации новых специалистов сократилось вдвое",
    name: "Марат Кенжебаев",
    title: "Начальник отдела обучения",
    company: "Нефтесервисная компания",
    photo: "/images/neftegaz/person-1.webp",
    initial: "М",
  },
  {
    quote: "Мы обучили более 150 сотрудников за год. Качество подготовки и гибкость форматов — именно то, что нужно для нашего производственного графика",
    name: "Айгуль Нурланова",
    title: "HR-директор",
    company: "Нефтеперерабатывающий завод",
    photo: "/images/neftegaz/person-2.webp",
    initial: "А",
  },
  {
    quote: "Курсы по бурению и КРС полностью соответствуют реалиям месторождений Западного Казахстана. Наши инженеры сразу применяют полученные знания",
    name: "Серик Абдрахманов",
    title: "Главный инженер",
    company: "Буровая компания",
    photo: "/images/neftegaz/person-3.webp",
    initial: "С",
  },
];
```

- [ ] **Step 4: Add training gallery data**

```tsx
const trainingPhotos = [
  { src: "/images/neftegaz/training-1.webp", caption: "Теоретическая подготовка" },
  { src: "/images/neftegaz/training-2.webp", caption: "Практика на оборудовании" },
  { src: "/images/neftegaz/training-3.webp", caption: "Обучение на объекте" },
  { src: "/images/neftegaz/training-4.webp", caption: "Выдача сертификатов" },
];
```

- [ ] **Step 5: Verify build compiles**

```bash
npm run build
```

Expected: Build succeeds. No type errors.

- [ ] **Step 6: Commit data layer changes**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): extend data with categories, testimonials, training photos"
```

---

## Chunk 2: Page Rebuild — Components & Section Reorder

### Task 3: Build EnrollmentModal component

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — add new `EnrollmentModal` function component

- [ ] **Step 1: Add EnrollmentModal component**

Add this component above the `NeftegazPage` export in `page.tsx`:

```tsx
function EnrollmentModal({
  training,
  onClose,
}: {
  training: { name: string; date: string; priceOffline: number } | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [status]);

  if (!training) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: `[Нефтегаз: ${training.name}] Дата: ${training.date}, Компания: ${fd.get("company") || "—"}`,
        }),
      });
    } catch { /* ok */ }
    setStatus("success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] border border-white/10 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-6" aria-live="polite">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена</h3>
            <p className="text-white/70 text-sm">Мы свяжемся с вами для подтверждения записи</p>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-xl font-bold text-white mb-1">Записаться на курс</h2>
            <p className="text-[#F0BB1E] font-medium text-sm mb-1">{training.name}</p>
            <div className="flex gap-4 text-white/60 text-xs mb-6">
              <span>{training.date}</span>
              <span>{training.priceOffline.toLocaleString("ru-RU")} ₸</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm"
              />
              <input
                name="company"
                type="text"
                placeholder="Компания (необязательно)"
                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full gold-button text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Compiles (component not yet used, but no errors).

- [ ] **Step 3: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): add EnrollmentModal component"
```

---

### Task 4: Rebuild Hero section with video background

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — hero section (lines 557-671)

- [ ] **Step 1: Replace hero background**

Replace the hero section (from `{/* ═══ HERO ═══ */}` to end of hero `</section>`) in the `NeftegazPage` component. Key changes:
- Add `<video>` element with MP4/WebM sources + poster + fallback gradient
- Remove `<motion.div>` animated glows (3 gradient blobs)
- Simplify CTAs to "Заказать обучение" (#form) and "Смотреть курсы" (#schedule)
- Keep everything else (breadcrumbs, badge, h1, stats, logo marquee)

```tsx
      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden"
      >
        {/* Video background with fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/neftegaz/hero-poster.webp"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none"; }}
          >
            <source src="/videos/neftegaz-hero.webm" type="video/webm" />
            <source src="/videos/neftegaz-hero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          {/* ... breadcrumbs, badge, h1, subheading — UNCHANGED from current code ... */}
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-white/70">Тренинги</span>
              <span>/</span>
              <span className="text-[#F0BB1E]">Нефтегаз</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F0BB1E] text-sm font-semibold mb-8 scroll-fade-in backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              65+ технических курсов
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight scroll-fade-in scroll-delay-1">
              Технические курсы для{" "}
              <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">
                нефтегазовой отрасли
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl scroll-fade-in scroll-delay-2">
              От бурения до переработки — практические курсы от экспертов с опытом
              работы на крупнейших месторождениях Казахстана
            </p>

            <div className="flex flex-wrap gap-4 mb-12 scroll-fade-in scroll-delay-3">
              <a href="#form" className="gold-button">Заказать обучение</a>
              <a href="#schedule" className="dark-button-outline">Смотреть курсы</a>
            </div>

            {/* Stats — UNCHANGED */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 scroll-fade-in scroll-delay-3">
              {[
                { value: "65+", label: "курсов" },
                { value: "200+", label: "экспертов" },
                { value: "10+", label: "лет опыта" },
                { value: "80%", label: "практики" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F0BB1E]">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Client logos marquee — UNCHANGED */}
            <div className="mt-14 scroll-fade-in scroll-delay-3">
              <p className="text-white/80 text-xs uppercase tracking-widest mb-6 text-center font-semibold">Нам доверяют</p>
              <div className="overflow-hidden">
                <motion.div
                  className="flex items-center gap-5"
                  animate={{ x: [0, -148 * OG_CLIENT_LOGOS.length] }}
                  transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
                >
                  {[...OG_CLIENT_LOGOS, ...OG_CLIENT_LOGOS].map((client, i) => (
                    <div
                      key={`${client.name}-${i}`}
                      className="flex-shrink-0 flex items-center justify-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl min-w-[120px] h-[56px] border border-white/10"
                    >
                      <Image src={client.logo} alt={client.name} width={90} height={40} className="object-contain max-h-8 brightness-0 invert opacity-80" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
```

- [ ] **Step 2: Remove unused heroY motion value**

The `heroY` was used for parallax on the gradient blobs. Remove it from the component:

Find and remove this line from `NeftegazPage`:
```tsx
const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
```

- [ ] **Step 3: Verify dev server renders correctly**

```bash
npm run dev
```

Open http://localhost:3000/treningi/neftegaz — verify video plays (or gradient fallback shows if video not yet downloaded).

- [ ] **Step 4: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): replace hero CSS gradient with video background"
```

---

### Task 5: Reorder sections and add page-level state

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — `NeftegazPage` component

- [ ] **Step 1: Add category state and enrollment modal state to NeftegazPage**

At the top of `NeftegazPage`, add:

```tsx
const [activeCategory, setActiveCategory] = useState<string | null>(null);
const [enrollTraining, setEnrollTraining] = useState<{
  name: string; date: string; priceOffline: number;
} | null>(null);
const scheduleRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 2: Add useEffect for scroll-to-schedule on category change**

```tsx
useEffect(() => {
  if (activeCategory !== null && scheduleRef.current) {
    scheduleRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [activeCategory]);
```

- [ ] **Step 3: Compute filtered trainings**

Replace existing `visibleTrainings` logic:

```tsx
const filteredTrainings = activeCategory
  ? getTrainingsByCategory(activeCategory)
  : neftegazTrainings;
const visibleTrainings = showAll
  ? filteredTrainings
  : filteredTrainings.slice(0, 12);
```

- [ ] **Step 4: Reorder sections in JSX**

**Note:** The file already has `"use client"` at line 1 — no change needed.

In the `return (...)` of `NeftegazPage`, reorder the section blocks. Identify each block by its comment marker `{/* ═══ SECTION_NAME ═══ */}`. The new order:

```tsx
return (
  <div className="min-h-screen bg-white">
    <Header />

    {/* ═══ HERO ═══ */}
    {/* (already rebuilt in Task 4 — keep as-is) */}

    {/* ═══ PUMP JACK + PROGRAM AREAS ═══ */}
    <OilPumpJack onCategoryClick={setActiveCategory} />

    {/* ═══ SCHEDULE ═══ */}
    {/* (will be rebuilt in Task 7 — for now move existing schedule here) */}

    {/* ═══ TRAINING GALLERY ═══ */}
    {/* (new — added in Task 8) */}

    {/* ═══ METRICS + TESTIMONIALS ═══ */}
    {/* (new — added in Task 9, replaces old GROWTH CHART + TESTIMONIAL) */}

    {/* ═══ PAIN POINTS — Split Screen ═══ */}
    {/* (moved from position 2 to here — cut entire <section> block, paste here) */}

    {/* ═══ CTA + FORM ═══ */}
    {/* (improved in Task 10 — keep at bottom) */}

    <Footer />
    <StickyCTA />
    <EnrollmentModal training={enrollTraining} onClose={() => setEnrollTraining(null)} />
  </div>
);
```

**Concrete moves:**
- **Cut** the `{/* ═══ PAIN POINTS — Split Screen ═══ */}` block (from `<section className="py-0 overflow-hidden">` to its closing `</section>`) — move it AFTER the Metrics+Testimonials placeholder, BEFORE the `{/* ═══ CTA + FORM ═══ */}` block.
- **Cut** the `<OilPumpJack />` line — move it to right after the Hero section closing `</section>`.
- **Delete** the old `{/* ═══ GROWTH CHART ═══ */}` section (Flask + metrics) and old `{/* ═══ TESTIMONIAL ═══ */}` section — these are replaced in Task 9.
- **Add** `<EnrollmentModal training={enrollTraining} onClose={() => setEnrollTraining(null)} />` before the closing `</div>`.

- [ ] **Step 5: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): reorder sections, add category state and enrollment wiring"
```

---

### Task 6: Make direction cards clickable with course counts

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — `OilPumpJack` component

- [ ] **Step 1: Pass setActiveCategory prop to OilPumpJack**

Change `OilPumpJack` signature to accept a prop:

```tsx
function OilPumpJack({ onCategoryClick }: { onCategoryClick: (category: string) => void }) {
```

Update the call site in `NeftegazPage`:
```tsx
<OilPumpJack onCategoryClick={setActiveCategory} />
```

- [ ] **Step 2: Update direction cards to be clickable with course counts**

Replace the card rendering in `OilPumpJack`'s program areas grid:

```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
  {programAreas.map((area, index) => (
    <button
      key={index}
      onClick={() => onCategoryClick(area.category)}
      className={`p-6 rounded-2xl bg-white/[0.12] border border-white/20 backdrop-blur-sm scroll-fade-in scroll-delay-${(index % 3) + 1} hover:bg-white/[0.18] transition-all text-left group cursor-pointer`}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
        {area.icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
      <p className="text-white/90 text-sm leading-relaxed mb-3">{area.desc}</p>
      <span className="text-[#F0BB1E] text-sm font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
        {getCourseCount(area.category)} курсов
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  ))}
</div>
```

- [ ] **Step 3: Verify clicking a card scrolls to schedule**

```bash
npm run dev
```

Open page, click "Бурение" card → page scrolls to #schedule section.

- [ ] **Step 4: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): make direction cards clickable with course counts"
```

---

### Task 7: Rebuild Schedule section with filters and enrollment

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — schedule section

- [ ] **Step 1: Add category filter bar**

Replace the schedule section. Add filter buttons above the training list:

```tsx
<section id="schedule" ref={scheduleRef} className="py-16 sm:py-24 section-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 scroll-fade-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
          Расписание <span className="text-gradient-primary">курсов</span>
        </h2>
        <p className="text-lg text-[#3d5153]">
          {filteredTrainings.length} курсов {activeCategory ? "в выбранной категории" : "по нефтегазовой тематике"}
        </p>
      </div>

      {/* Category filter bar */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center scroll-fade-in">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeCategory === null
              ? "bg-[#00767D] text-white"
              : "bg-[#00767D]/10 text-[#00767D] hover:bg-[#00767D]/20"
          }`}
        >
          Все ({neftegazTrainings.length})
        </button>
        {programAreas.map((area) => (
          <button
            key={area.category}
            onClick={() => setActiveCategory(area.category)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeCategory === area.category
                ? "bg-[#00767D] text-white"
                : "bg-[#00767D]/10 text-[#00767D] hover:bg-[#00767D]/20"
            }`}
          >
            {area.title.split(" ")[0]} ({getCourseCount(area.category)})
          </button>
        ))}
      </div>

      {/* Training list */}
      <div className="space-y-3">
        {visibleTrainings.map((training, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#F8FAFA] border border-[#00767D]/8 hover:border-[#00767D]/20 transition-colors scroll-fade-in"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-[#2D3A3C] text-sm sm:text-base">{training.name}</h3>
              <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#546569]">
                <span>{training.date}</span>
                <span>{training.hours} ч.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-[#2D3A3C]">
                  {training.priceOffline.toLocaleString("ru-RU")} ₸
                </div>
                <div className="text-xs text-[#546569]">офлайн</div>
              </div>
              <button
                onClick={() => setEnrollTraining({
                  name: training.name,
                  date: training.date,
                  priceOffline: training.priceOffline,
                })}
                className="px-4 py-2 text-xs font-semibold rounded-lg gold-button"
              >
                Записаться
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTrainings.length > 12 && (
        <div className="text-center mt-8">
          <button onClick={() => setShowAll(!showAll)} className="teal-button-outline">
            {showAll ? "Свернуть" : `Показать все ${filteredTrainings.length} курсов`}
          </button>
        </div>
      )}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify filters work**

```bash
npm run dev
```

Click "Бурение" filter → only drilling courses shown. Click "Все" → all courses. Click "Записаться" → modal opens with course name.

- [ ] **Step 3: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): add category filters and enrollment buttons to schedule"
```

---

### Task 8: Add Training Gallery section

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — add new section in JSX

- [ ] **Step 1: Add TrainingGallery section after Schedule**

Insert this section between Schedule and Metrics+Testimonials:

```tsx
      {/* ═══ TRAINING GALLERY ═══ */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Как проходит <span className="text-gradient-primary">обучение</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                80% практики на реальных кейсах и оборудовании
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/3] group scroll-fade-in scroll-delay-${i + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): add training process photo gallery section"
```

---

### Task 9: Rebuild Metrics + Testimonials section

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — replace old Growth Chart + Testimonial sections

- [ ] **Step 1: Remove OilFlask component**

Delete the entire `function OilFlask()` component definition (search for `function OilFlask()` — delete from that line through its closing `}`) and its associated scroll-related imports (`useSpring` if no longer used elsewhere). The old Growth Chart and Testimonial JSX sections should already be removed in Task 5 Step 4.

- [ ] **Step 2: Add TestimonialCard component (with React-based photo fallback)**

Add this component above `NeftegazPage`:

```tsx
function TestimonialCard({ testimonial: t, index: i }: { testimonial: typeof testimonials[0]; index: number }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className={`p-6 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}>
      <svg className="w-8 h-8 text-[#F0BB1E]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="text-white/90 text-sm leading-relaxed mb-6">{t.quote}</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          {photoFailed ? (
            <div className="w-full h-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t.initial}</span>
            </div>
          ) : (
            <Image
              src={t.photo}
              alt={t.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-white/50 text-xs">{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add combined Metrics + Testimonials section**

```tsx
      {/* ═══ METRICS + TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00767D]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Metrics */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Результат, который <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">измерим</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-20">
              {[
                {
                  value: "↓ 40%",
                  label: "снижение аварийности",
                  desc: "после курсов промышленной безопасности",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  value: "↑ 25%",
                  label: "рост производительности",
                  desc: "через 3 месяца после обучения",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  value: "↓ 60%",
                  label: "время адаптации",
                  desc: "новых специалистов на объекте",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className={`text-center p-8 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-extrabold text-[#F0BB1E] mb-2">{item.value}</div>
                  <p className="text-white font-semibold mb-1">{item.label}</p>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Отзывы <span className="bg-gradient-to-r from-[#00767D] to-[#009BA3] bg-clip-text text-transparent">клиентов</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 4: Verify multi-category filtering works**

```bash
npm run dev
```

Find a course that matches multiple categories (e.g. a course with both "бурение" and "добыча" in the name). Verify it appears when filtering by either "Бурение" or "Добыча" in the schedule.

- [ ] **Step 5: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): replace OilFlask with metrics cards + testimonial grid"
```

---

### Task 10: Improve Corporate Form + Sticky CTA

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx` — form section + StickyCTA

- [ ] **Step 1: Add employee count field and guarantee text to corporate form**

In the form section (`id="form"`), add after the company input:

```tsx
<input
  name="employees"
  type="number"
  placeholder="Количество сотрудников (~)"
  className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
/>
```

After the submit button, add:

```tsx
<p className="text-center text-white/60 text-sm mt-3">Подготовим предложение за 24 часа</p>
```

Update the `handleSubmit` message format:

```tsx
message: `[Нефтегаз тренинги] Компания: ${fd.get("company") || "—"}, Сотрудников: ${fd.get("employees") || "—"}`,
```

- [ ] **Step 2: Update StickyCTA**

Change StickyCTA text and href:

```tsx
<a
  href="#schedule"
  className="gold-button shadow-2xl shadow-[#F0BB1E]/20 flex items-center gap-2 text-sm sm:text-base"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Записаться на курс
</a>
```

- [ ] **Step 3: Verify full page in dev**

```bash
npm run dev
```

Walk through the full page flow:
1. Hero with video (or gradient fallback)
2. PumpJack + clickable direction cards with counts
3. Schedule with filters → click "Записаться" → modal works
4. Training gallery photos
5. Metrics + testimonials
6. Pain/solution (moved)
7. Corporate form with employee count + guarantee text
8. Sticky CTA points to #schedule

- [ ] **Step 4: Run production build**

```bash
npm run build
```

Expected: Build succeeds, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "feat(neftegaz): improve corporate form, update sticky CTA to point to schedule"
```

---

### Task 11: Final cleanup

**Files:**
- Modify: `src/app/treningi/neftegaz/page.tsx`

- [ ] **Step 1: Remove unused imports and code**

Check for:
- `useSpring` — was used by OilFlask, remove if no longer referenced
- Any `OilFlask`-related motion values or refs
- Unused `heroY` transform (removed in Task 4)

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Fix any issues.

- [ ] **Step 3: Final production build**

```bash
npm run build
```

Expected: Clean build, no warnings.

- [ ] **Step 4: Commit**

```bash
git add src/app/treningi/neftegaz/page.tsx
git commit -m "refactor(neftegaz): remove OilFlask, unused imports, final cleanup"
```
