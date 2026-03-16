"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ARTICLES, CATEGORIES, CATEGORY_COLORS, type Category, type Article } from "@/data/blog";

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
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-2 text-[#00767D] font-700 text-sm hover:gap-3 transition-all duration-200"
          >
            Читать статью
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right image panel */}
      <div className="hidden lg:block lg:w-72 xl:w-80 shrink-0 relative">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
      </div>
    </article>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const delay = `scroll-delay-${Math.min((index % 3) + 1, 6)}` as string;

  return (
    <article className={`scroll-fade-in ${delay} group bg-white border border-[#E0E8E9] rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:border-[#b3dde0] transition-all duration-200`}>
      {/* Article image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

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
            href={`/blog/${article.slug}`}
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
                { value: "16", label: "статей" },
                { value: "7", label: "тем" },
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
