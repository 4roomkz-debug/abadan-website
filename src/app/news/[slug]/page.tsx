import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles, getNewsArticleBySlug, formatNewsDate, getCategoryLabel } from "@/data/news";

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена | Abadan & Co.",
    };
  }

  return {
    title: `${article.title} | Abadan & Co.`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFB] to-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#7A8B8E] mb-8">
            <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/news" className="hover:text-[#00767D] transition-colors">Новости</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#2D3A3C] font-medium truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[#00767D]/10 text-[#00767D] text-sm font-semibold rounded-full">
                {getCategoryLabel(article.category)}
              </span>
              <span className="text-[#7A8B8E]">{formatNewsDate(article.date)}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3A3C] mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-[#546569] mb-8">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#F8FAFB] text-[#7A8B8E] text-sm rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {article.coverImage && (
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#00767D]/20 to-[#F0BB1E]/20">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content - This will be customized per article */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {slug === "business-breakfast-ai-hr-results" && (
              <BusinessBreakfastContent gallery={article.gallery} />
            )}
          </div>
        </div>
      </section>

      {/* Back to News */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#00767D] font-medium hover:underline"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Все новости
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Content component for the Business Breakfast article
function BusinessBreakfastContent({ gallery }: { gallery?: string[] }) {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 mb-8 border border-[#00767D]/10">
        <h2 className="text-2xl font-bold text-[#2D3A3C] mt-0 mb-4">Ключевые цифры</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#00767D]">25</div>
            <div className="text-[#546569]">участников</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#00767D]">3</div>
            <div className="text-[#546569]">спикера</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#00767D]">2.5</div>
            <div className="text-[#546569]">часа</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#F0BB1E]">1</div>
            <div className="text-[#546569]">живое демо</div>
          </div>
        </div>
      </div>

      <p className="text-[#546569] text-lg leading-relaxed">
        30 января 2026 года в конференц-зале «Орда» бизнес-парка Променад прошёл наш первый
        бизнес-завтрак для HR-директоров и L&D специалистов. Тема — «AI в HR: революция найма и обучения».
      </p>

      <p className="text-[#546569] text-lg leading-relaxed">
        Мы собрали HR-руководителей, которые не просто интересуются искусственным интеллектом,
        а хотят применять его в своей работе. Ещё до начала мероприятия участники написали свои
        запросы в Telegram-группу — и мы проанализировали их с помощью AI, чтобы спикеры могли
        ответить на самые актуальные вопросы зала.
      </p>

      <h2 className="text-2xl font-bold text-[#2D3A3C] mt-10 mb-4">Три спикера — три угла зрения</h2>

      <div className="space-y-6 mb-10">
        <div className="bg-white rounded-xl p-6 border border-[#00767D]/10">
          <h3 className="text-lg font-bold text-[#2D3A3C] mb-2 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            Диас Жумагалиев: Революция найма с помощью ИИ
          </h3>
          <p className="text-[#546569] mb-3">
            Диас — технический консультант inDrive с 4-летним опытом в AI. Он показал реальные
            кейсы автоматизации рекрутинга: как AI отбирает кандидатов, измеряет качество найма
            и — важный момент — как объяснять соискателям, почему их отклонили.
          </p>
          <div className="text-sm text-[#7A8B8E] italic">
            «Люди хотят понимать решения. AI должен быть прозрачным»
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#00767D]/10">
          <h3 className="text-lg font-bold text-[#2D3A3C] mb-2 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Даниэль Алисов: ИИ-агенты для HR
          </h3>
          <p className="text-[#546569] mb-3">
            Даниэль — 8 лет в маркетинге, 100+ внедрённых AI-ассистентов. Он объяснил разницу
            между чат-ботами и полноценными AI-агентами. Главный вопрос: когда и как передать
            управление искусственному интеллекту без потери качества?
          </p>
          <div className="text-sm text-[#7A8B8E] italic">
            «AI-агент — это не бот. Он принимает решения, а не просто отвечает на вопросы»
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#00767D]/10">
          <h3 className="text-lg font-bold text-[#2D3A3C] mb-2 flex items-center gap-2">
            <span className="text-2xl">📱</span>
            Гани Абадан: Демо ibirAi
          </h3>
          <p className="text-[#546569] mb-3">
            Гани — основатель ibirAi и корпоративный тренер с 15-летним опытом. Он показал
            живое демо платформы микрообучения: как сотрудники учатся в Telegram по 5-7 минут в день,
            как AI-коуч даёт персональную обратную связь, и как HR-руководители отслеживают ROI.
          </p>
          <div className="text-sm text-[#7A8B8E] italic">
            «Soft skills — это не знания. Это поведение. А поведение меняется не за два дня тренинга»
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#2D3A3C] mt-10 mb-4">Панельная дискуссия: главные вопросы</h2>

      <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#00767D]/10 mb-10">
        <ul className="space-y-4 mb-0">
          <li className="flex items-start gap-3">
            <span className="text-[#00767D] font-bold">1.</span>
            <div>
              <span className="font-semibold text-[#2D3A3C]">Где грань?</span>
              <span className="text-[#546569]"> — какие HR-задачи AI точно заберёт, а где человек незаменим?</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00767D] font-bold">2.</span>
            <div>
              <span className="font-semibold text-[#2D3A3C]">Главные ошибки</span>
              <span className="text-[#546569]"> — что компании делают не так при внедрении AI в HR?</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00767D] font-bold">3.</span>
            <div>
              <span className="font-semibold text-[#2D3A3C]">С чего начать?</span>
              <span className="text-[#546569]"> — один первый шаг, который даст быстрый результат</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00767D] font-bold">4.</span>
            <div>
              <span className="font-semibold text-[#2D3A3C]">Прогноз</span>
              <span className="text-[#546569]"> — как изменится роль HR через 2-3 года?</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Gallery placeholder */}
      {gallery && gallery.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#2D3A3C] mt-10 mb-4">Фотографии с мероприятия</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {gallery.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#00767D]/20 to-[#F0BB1E]/20"
              >
                <Image
                  src={photo}
                  alt={`Фото ${index + 1} с бизнес-завтрака`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold text-[#2D3A3C] mt-10 mb-4">Что дальше</h2>
      <p className="text-[#546569] text-lg leading-relaxed">
        Telegram-группа участников остаётся активной — там мы делимся материалами, записью
        и продолжаем обсуждение. Планируем проводить подобные мероприятия регулярно.
      </p>

      <div className="bg-gradient-to-r from-[#00767D] to-[#006D77] rounded-2xl p-6 sm:p-8 mt-10 text-white">
        <h3 className="text-xl font-bold mb-3 text-white">Хотите попробовать ibirAi?</h3>
        <p className="text-white/90 mb-4">
          Бесплатный пилот для первых компаний. Закажите демонстрацию платформы микрообучения.
        </p>
        <a
          href="https://ibirai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00767D] font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Перейти на ibirAi
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}
