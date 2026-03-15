"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Types ── */

type Category =
  | "Все"
  | "HR"
  | "Лидерство"
  | "Право"
  | "Финансы"
  | "ИИ"
  | "Тренды";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: Exclude<Category, "Все">;
  readingTime: number;
  author: string;
  authorRole: string;
  featured?: boolean;
}

/* ── Data ── */

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Как ИИ меняет HR-процессы в казахстанских компаниях",
    excerpt:
      "Искусственный интеллект уже перестал быть инструментом только крупных IT-гигантов — казахстанские компании активно внедряют ИИ в подбор, адаптацию и оценку персонала. Разбираем реальные кейсы и практику применения ChatGPT, Copilot и специализированных HR-платформ. Что автоматизировать в первую очередь и каких ошибок избежать на старте.",
    date: "12 марта 2026",
    category: "ИИ",
    readingTime: 8,
    author: "Гани Абадан",
    authorRole: "Основатель Abadan & Co.",
    featured: true,
  },
  {
    id: 2,
    title: "Изменения в Трудовом кодексе РК 2026: что нужно знать работодателю",
    excerpt:
      "В 2026 году вступили в силу поправки в Трудовой кодекс Республики Казахстан, затрагивающие дистанционную занятость, режим рабочего времени и процедуры увольнения. Разбираем ключевые изменения, которые прямо влияют на кадровое делопроизводство и систему оплаты труда. Юридическая консультация в форматах Q&A — самые частые вопросы от HR-директоров.",
    date: "26 февраля 2026",
    category: "Право",
    readingTime: 10,
    author: "Асель Нурланова",
    authorRole: "Эксперт по трудовому праву",
  },
  {
    id: 3,
    title: "ROI корпоративного обучения: как считать и доказать руководству",
    excerpt:
      "Главный вопрос, с которым сталкивается каждый HR-директор: как обосновать бюджет на обучение перед советом директоров? Представляем пошаговую методику расчёта ROI тренингов — от формул Филлипса до дашбордов в Excel, которые понятны финансистам. Реальные цифры из казахстанских компаний нефтегазового и банковского секторов.",
    date: "18 февраля 2026",
    category: "Тренды",
    readingTime: 12,
    author: "Дамир Сейткали",
    authorRole: "Бизнес-тренер, MBA",
  },
  {
    id: 4,
    title: "5 навыков лидера, которые нельзя заменить искусственным интеллектом",
    excerpt:
      "Когда ChatGPT пишет стратегии, а алгоритмы принимают решения о найме — зачем вообще развивать управленческие компетенции? Отвечаем честно: ИИ не может воспроизвести эмпатию в кризис, этическое суждение и доверие команды. Пять навыков, которые определяют лидерство в эпоху автоматизации — с конкретными упражнениями для развития.",
    date: "14 января 2026",
    category: "Лидерство",
    readingTime: 7,
    author: "Гани Абадан",
    authorRole: "Основатель Abadan & Co.",
  },
  {
    id: 5,
    title: "Грейдирование должностей: опыт внедрения в нефтегазовом секторе Казахстана",
    excerpt:
      "Как крупная нефтегазовая компания с 3 000 сотрудников выстроила прозрачную систему грейдов за 8 месяцев — и снизила текучесть на 18%. Разбираем методологию Hay Group, адаптацию под казахстанскую специфику и типичные ошибки при внедрении. Чек-лист из 20 пунктов в подарок.",
    date: "28 января 2026",
    category: "HR",
    readingTime: 9,
    author: "Жанар Бекова",
    authorRole: "HR-консультант",
  },
  {
    id: 6,
    title: "Промпт-инжиниринг для HR: 10 готовых шаблонов",
    excerpt:
      "Практическое руководство для HR-специалистов, которые хотят экономить 2–3 часа в день с помощью ChatGPT и Claude. Готовые промпты для написания вакансий, скриптов интервью, писем кандидатам и отчётов по обучению. Каждый шаблон проверен на реальных задачах казахстанских HR-команд.",
    date: "5 марта 2026",
    category: "ИИ",
    readingTime: 6,
    author: "Айгерим Досова",
    authorRole: "Тренер по цифровым инструментам",
  },
  {
    id: 7,
    title: "Бюджет на обучение в кризис: где сокращать нельзя",
    excerpt:
      "В период экономической турбулентности обучение персонала — первое, что режет финансовый директор. Объясняем, какие программы дают максимальный возврат инвестиций и почему их сокращение обходится дороже, чем сохранение. Данные по рынку Казахстана за 2024–2025 годы и сравнение с опытом российских и европейских компаний.",
    date: "7 февраля 2026",
    category: "Финансы",
    readingTime: 8,
    author: "Дамир Сейткали",
    authorRole: "Бизнес-тренер, MBA",
  },
  {
    id: 8,
    title: "Цифровая трансформация HR: с чего начать, если ничего нет",
    excerpt:
      "Практическая дорожная карта для HR-директора, который хочет перевести отдел на цифровые рельсы, но не знает, с чего начать. От выбора HRM-системы до обучения команды — пошаговый план на 12 месяцев. Разбираем опыт компаний из Алматы и Астаны, которые прошли этот путь с Abadan & Co.",
    date: "20 января 2026",
    category: "Тренды",
    readingTime: 11,
    author: "Жанар Бекова",
    authorRole: "HR-консультант",
  },
];

const CATEGORIES: Category[] = [
  "Все",
  "HR",
  "Лидерство",
  "Право",
  "Финансы",
  "ИИ",
  "Тренды",
];

const CATEGORY_COLORS: Record<Exclude<Category, "Все">, { bg: string; text: string; border: string }> = {
  HR:         { bg: "#e6f7f8", text: "#006D77", border: "#b3dde0" },
  Лидерство:  { bg: "#fffbea", text: "#b08a00", border: "#f0e08a" },
  Право:      { bg: "#fef3f2", text: "#b42318", border: "#fecdca" },
  Финансы:    { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  ИИ:         { bg: "#f0f4ff", text: "#3730a3", border: "#c7d2fe" },
  Тренды:     { bg: "#fdf4ff", text: "#6b21a8", border: "#e9d5ff" },
};

/* ── Sub-components ── */

function CategoryBadge({ category }: { category: Exclude<Category, "Все"> }) {
  const c = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-700 leading-none"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {category}
    </span>
  );
}

function ReadingTimeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <article className="scroll-fade-in group relative bg-white border border-[#E0E8E9] rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
      {/* Decorative left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00767D] to-[#F0BB1E] rounded-l-2xl" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-8 lg:p-10 pl-9 lg:pl-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-800 bg-[#F0BB1E]/15 text-[#b08a00] border border-[#F0BB1E]/40 uppercase tracking-widest">
            Главная статья
          </span>
          <CategoryBadge category={article.category} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-800 text-[#2D3A3C] leading-snug mb-4 group-hover:text-[#00767D] transition-colors duration-200">
          {article.title}
        </h2>

        <p className="text-[#546569] leading-relaxed text-base mb-6 flex-1">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00767D] to-[#009BA3] flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-700">{article.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-700 text-[#2D3A3C]">{article.author}</p>
              <p className="text-xs text-[#7A8B8E]">{article.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#7A8B8E] text-sm">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <ReadingTimeIcon />
              {article.readingTime} мин
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[#00767D] font-700 text-sm hover:gap-3 transition-all duration-200"
          >
            Читать статью
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right decorative panel */}
      <div className="hidden lg:flex lg:w-72 xl:w-80 bg-gradient-to-br from-[#f0f9f9] to-[#e6f4f5] items-center justify-center p-10 shrink-0">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#009BA3] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-[#2D3A3C] font-700 text-sm leading-snug">ИИ + HR<br />в Казахстане</p>
          <p className="text-[#7A8B8E] text-xs mt-2">{article.readingTime} минут чтения</p>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const delay = `scroll-delay-${Math.min((index % 3) + 1, 6)}` as string;

  return (
    <article className={`scroll-fade-in ${delay} group bg-white border border-[#E0E8E9] rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:border-[#b3dde0] transition-all duration-200`}>
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#00767D] to-[#F0BB1E]" />

      <div className="flex flex-col flex-1 p-6">
        {/* Category + reading time */}
        <div className="flex items-center justify-between mb-4">
          <CategoryBadge category={article.category} />
          <span className="flex items-center gap-1 text-xs text-[#7A8B8E]">
            <ReadingTimeIcon />
            {article.readingTime} мин
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-800 text-[#2D3A3C] leading-snug mb-3 group-hover:text-[#00767D] transition-colors duration-200 flex-1">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#546569] leading-relaxed mb-5 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f0f4f4] mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00767D] to-[#009BA3] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-700">{article.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-xs font-700 text-[#2D3A3C]">{article.author}</p>
              <p className="text-[11px] text-[#7A8B8E]">{article.date}</p>
            </div>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1 text-[#00767D] text-xs font-700 hover:gap-2 transition-all duration-200"
          >
            Читать
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ── Main page ── */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Все");
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "sending" | "done">("idle");

  const featuredArticle = ARTICLES.find((a) => a.featured)!;
  const restArticles = ARTICLES.filter((a) => !a.featured);

  const filteredRest =
    activeCategory === "Все"
      ? restArticles
      : restArticles.filter((a) => a.category === activeCategory);

  const showFeatured =
    activeCategory === "Все" || featuredArticle.category === activeCategory;

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubState("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Подписка на блог",
          phone: email,
          message: `[Подписка на блог Abadan] Email: ${email}`,
          source: "Блог — подписка на рассылку",
        }),
      });
      setSubState("done");
      setEmail("");
    } catch {
      setSubState("done");
    }
  }

  return (
    <>
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-28 pb-16 overflow-hidden">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[-80px] left-[-100px] w-[480px] h-[480px] bg-[#00767D]/20 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-60px] right-[-80px] w-[360px] h-[360px] bg-[#F0BB1E]/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#00767D]/8 rounded-full blur-[80px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-white/70">Блог</span>
            </nav>

            <div className="scroll-fade-in max-w-2xl">
              <p className="text-[#F0BB1E] text-sm font-700 uppercase tracking-widest mb-4">
                Экспертиза &amp; практика
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-[1.08] mb-6">
                Блог{" "}
                <span className="text-gradient-gold">Abadan & Co.</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                Делимся знаниями о HR, лидерстве, трудовом праве Казахстана и применении ИИ в бизнесе. Только практика — никакой воды.
              </p>
            </div>

            {/* Stats */}
            <div className="scroll-fade-in scroll-delay-2 mt-12 flex flex-wrap gap-8">
              {[
                { value: "8", label: "статей" },
                { value: "6", label: "тем" },
                { value: "Раз в неделю", label: "обновление" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-800 text-[#F0BB1E]">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <div className="sticky top-0 z-30 bg-[#f0f9f9] border-b border-[#d0e8ea]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#00767D] text-white shadow-sm"
                      : "bg-white border border-[#d0e8ea] text-[#546569] hover:border-[#00767D] hover:text-[#00767D]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Articles ── */}
        <section className="bg-[#f8fafa] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">

            {/* Featured article */}
            {showFeatured && <FeaturedArticleCard article={featuredArticle} />}

            {/* Grid */}
            {filteredRest.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRest.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
            ) : !showFeatured ? (
              <p className="text-center text-[#546569] py-20">
                Нет статей в этой категории
              </p>
            ) : null}

          </div>
        </section>

        {/* ── Subscribe CTA ── */}
        <section className="bg-[#00767D] py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="scroll-fade-in text-center mb-10">
              <p className="text-white/70 text-sm font-700 uppercase tracking-widest mb-3">
                Рассылка
              </p>
              <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4">
                Подписаться на рассылку
              </h2>
              <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto">
                Раз в две недели — дайджест лучших статей, HR-трендов Казахстана и анонсы тренингов. Без спама.
              </p>
            </div>

            {subState === "done" ? (
              <div className="scroll-fade-in text-center bg-white/10 rounded-2xl p-10 border border-white/20">
                <div className="flex justify-center mb-4">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F0BB1E]">
                    <svg className="w-7 h-7 text-[#1a2e30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-white text-xl font-700 mb-2">Вы подписаны!</p>
                <p className="text-white/70">Первый дайджест придёт в ближайшие две недели.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="scroll-fade-in scroll-delay-1 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/50 text-base focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={subState === "sending"}
                  className="shrink-0 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-700 text-base hover:from-[#EBB417] hover:to-[#d9a500] transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {subState === "sending" ? "Отправляем..." : "Подписаться"}
                </button>
              </form>
            )}

            <p className="scroll-fade-in scroll-delay-2 text-center text-white/40 text-sm mt-5">
              Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
