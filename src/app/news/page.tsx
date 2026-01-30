import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles, formatNewsDate, getCategoryLabel } from "@/data/news";

export const metadata = {
  title: "Новости | Abadan & Co.",
  description: "Новости, события и статьи от Abadan & Co. — бизнес-обучение и корпоративное развитие в Казахстане",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFB] to-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#7A8B8E] mb-8">
            <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#2D3A3C] font-medium">Новости</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C] mb-6">
              <span className="text-[#00767D]">Новости</span> и события
            </h1>
            <p className="text-xl text-[#546569]">
              Отчёты о мероприятиях, анонсы тренингов и полезные материалы о развитии бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {newsArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#00767D]/10 shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#00767D]/20 to-[#F0BB1E]/20 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-50">
                          {article.category === "event" ? "📅" : article.category === "announcement" ? "📣" : "📝"}
                        </span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#00767D] text-xs font-semibold rounded-full">
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-[#7A8B8E] mb-2">{formatNewsDate(article.date)}</p>
                    <h2 className="text-xl font-bold text-[#2D3A3C] mb-3 group-hover:text-[#00767D] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[#546569] line-clamp-3">{article.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#F8FAFB] text-[#7A8B8E] text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h2 className="text-2xl font-bold text-[#2D3A3C] mb-2">Пока нет новостей</h2>
              <p className="text-[#546569]">Скоро здесь появятся материалы о наших мероприятиях</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
