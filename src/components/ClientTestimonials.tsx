import { TESTIMONIALS, signature, type TestimonialId } from "@/data/testimonials";

/**
 * Отзывы на страницах тренингов — три дословные цитаты из благодарственных
 * писем (см. src/data/testimonials.ts).
 *
 * Раньше на этом месте стояли блок «Результат, который измерим» с кейсами и
 * три отзыва с фото. И цифры, и люди, и компании были выдуманы — ни одного
 * из них нет в письмах. Убраны 14.10.2026 по решению Гани.
 *
 * Под каждой цитатой написано, какой это был тренинг: на странице курса
 * по праву или финансам стоит отзыв о другом тренинге Abadan, и читатель
 * должен это видеть, а не догадываться.
 */
export default function ClientTestimonials({ ids }: { ids: TestimonialId[] }) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00767D]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
              Что говорят <span className="text-[#F0BB1E]">клиенты</span>
            </h2>
            <p className="text-[#B8CDD0] max-w-2xl mx-auto">
              Цитаты из благодарственных писем — дословно. Под каждой указано, какой это был тренинг.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {ids.map((id, i) => {
              const t = TESTIMONIALS[id];
              return (
                <figure
                  key={id}
                  className={`flex flex-col p-6 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}
                >
                  <svg aria-hidden className="w-8 h-8 text-[#F0BB1E]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-[#D4E4E7] text-sm leading-relaxed mb-6 flex-1">{t.quote}</blockquote>
                  <figcaption>
                    <p className="text-white font-semibold text-sm">{signature(t)}</p>
                    <p className="text-[#8FB3B8] text-xs mt-1">{t.training}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
