import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ARTICLES, CATEGORY_COLORS } from "@/data/blog";

/* ── Static params for SSG ── */

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

/* ── Helpers ── */

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS as Record<string, { bg: string; text: string; border: string }>;
  const c = colors[category] ?? { bg: "#f0f4ff", text: "#3730a3", border: "#c7d2fe" };
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-bold leading-none"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {category}
    </span>
  );
}

function ReadingTimeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

/* ── Page ── */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  /* Related articles: same category first, then others, max 3, exclude current */
  const related = [
    ...ARTICLES.filter((a) => a.id !== article.id && a.category === article.category),
    ...ARTICLES.filter((a) => a.id !== article.id && a.category !== article.category),
  ].slice(0, 3);

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
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Главная
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white/70 transition-colors">
                Блог
              </Link>
              <span>/</span>
              <span className="text-white/60 line-clamp-1">{article.title}</span>
            </nav>

            {/* Category + reading time */}
            <div className="scroll-fade-in flex flex-wrap items-center gap-3 mb-6">
              <CategoryBadge category={article.category} />
              <span className="flex items-center gap-1.5 text-white/50 text-sm">
                <ReadingTimeIcon />
                {article.readingTime} минут чтения
              </span>
            </div>

            {/* Title */}
            <h1 className="scroll-fade-in scroll-delay-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-8">
              {article.title}
            </h1>

            {/* Author + date */}
            <div className="scroll-fade-in scroll-delay-2 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00767D] to-[#009BA3] flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-white font-bold text-base">
                  {article.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">{article.author}</p>
                <p className="text-white/50 text-xs">{article.authorRole}</p>
              </div>
              <div className="ml-4 pl-4 border-l border-white/20 text-white/40 text-sm">
                {article.date}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero image ── */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 -mt-1">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* ── Article body + sidebar ── */}
        <section className="bg-white py-12 lg:py-16 -mt-16 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

              {/* Main content */}
              <article className="flex-1 min-w-0 scroll-fade-in">
                {/* Excerpt lead */}
                <p className="text-lg text-[#546569] leading-relaxed mb-8 border-l-4 border-[#00767D] pl-5 bg-[#f0f9f9] py-4 pr-4 rounded-r-xl">
                  {article.excerpt}
                </p>

                {/* Article HTML content */}
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>

              {/* Sidebar */}
              <aside className="lg:w-72 xl:w-80 shrink-0">
                <div className="sticky top-24 flex flex-col gap-6">

                  {/* Author card */}
                  <div className="bg-[#f0f9f9] border border-[#d0e8ea] rounded-2xl p-6 scroll-fade-in scroll-delay-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#7A8B8E] mb-4">
                      Об авторе
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00767D] to-[#009BA3] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">
                          {article.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D3A3C] text-sm">{article.author}</p>
                        <p className="text-[#7A8B8E] text-xs">{article.authorRole}</p>
                      </div>
                    </div>
                    <p className="text-[#546569] text-sm leading-relaxed">
                      Эксперт Abadan & Co. в области корпоративного обучения и HR-трансформации в Казахстане.
                    </p>
                  </div>

                  {/* Share */}
                  <div className="bg-white border border-[#E0E8E9] rounded-2xl p-6 scroll-fade-in scroll-delay-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#7A8B8E] mb-4">
                      Поделиться
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={`https://t.me/share/url?url=https://abadan.kz/blog/${article.slug}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 transition-colors"
                        aria-label="Поделиться в Telegram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(article.title + ' — https://abadan.kz/blog/' + article.slug)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                        aria-label="Поделиться в WhatsApp"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* CTA sidebar */}
                  <div className="bg-gradient-to-br from-[#1a2e30] to-[#0d2628] border border-[#2a4548] rounded-2xl p-6 scroll-fade-in scroll-delay-3">
                    <p className="text-[#F0BB1E] text-xs font-bold uppercase tracking-widest mb-3">
                      Корпоративное обучение
                    </p>
                    <p className="text-white font-bold text-base leading-snug mb-4">
                      Хотите провести тренинг на эту тему для команды?
                    </p>
                    <Link
                      href="/#contact"
                      className="block text-center py-3 px-5 rounded-xl bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold text-sm hover:from-[#EBB417] hover:to-[#d9a500] transition-all duration-200 shadow-md"
                    >
                      Оставить заявку
                    </Link>
                  </div>

                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Related articles ── */}
        {related.length > 0 && (
          <section className="bg-[#f0f9f9] py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2 className="scroll-fade-in text-2xl sm:text-3xl font-extrabold text-[#2D3A3C] mb-10">
                Читайте также
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel, i) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className={`scroll-fade-in scroll-delay-${i + 1} group bg-white border border-[#E0E8E9] rounded-2xl overflow-hidden hover:shadow-md hover:border-[#b3dde0] transition-all duration-200 flex flex-col`}
                  >
                    {/* Top accent */}
                    <div className="h-1 bg-gradient-to-r from-[#00767D] to-[#F0BB1E]" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <CategoryBadge category={rel.category} />
                        <span className="flex items-center gap-1 text-xs text-[#7A8B8E]">
                          <ReadingTimeIcon />
                          {rel.readingTime} мин
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#2D3A3C] leading-snug mb-3 group-hover:text-[#00767D] transition-colors flex-1">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-[#546569] leading-relaxed line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#f0f4f4] mt-auto">
                        <span className="text-xs text-[#7A8B8E]">{rel.date}</span>
                        <span className="flex items-center gap-1 text-[#00767D] text-xs font-bold group-hover:gap-2 transition-all duration-200">
                          Читать
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10 scroll-fade-in scroll-delay-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-[#d0e8ea] text-[#00767D] font-bold text-sm hover:bg-[#e6f7f8] hover:border-[#00767D] transition-all duration-200"
                >
                  Все статьи блога
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="bg-[#00767D] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="scroll-fade-in">
              <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
                Корпоративное обучение
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Хотите узнать больше?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Оставьте заявку — расскажем, как темы из этой статьи можно применить в вашей компании. Первая консультация бесплатно.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold text-base hover:from-[#EBB417] hover:to-[#d9a500] transition-all duration-200 shadow-lg"
              >
                Оставить заявку
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
