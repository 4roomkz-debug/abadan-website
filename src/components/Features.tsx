"use client";

export default function Features() {
  const features = [
    {
      number: "01",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Применяют с первого дня",
      subtitle: "Не теория, а отработка на ваших реальных кейсах. Команда использует знания сразу после тренинга."
    },
    {
      number: "02",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Программа = ваши KPI",
      subtitle: "Каждый модуль привязан к метрикам, которые вы хотите улучшить. Измеримый результат."
    },
    {
      number: "03",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Доводим до результата",
      subtitle: "Не бросаем после тренинга. ДЗ, проверка, Q&A — пока навык не закрепится."
    },
    {
      number: "04",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "От запроса до старта — 3 дня",
      subtitle: "КП в день обращения, быстрый запуск без бюрократии. Ваше время ценно."
    }
  ];

  return (
    <section id="features" className="relative py-24 sm:py-32 section-dark-2">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/[0.04] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA]">
              Что вы <span className="text-gradient-gold">получите</span>
            </h2>

            <p className="text-xl text-[#71717A] max-w-2xl mx-auto">
              Не процесс обучения, а конкретный бизнес-результат
            </p>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="premium-card p-8 space-y-5 group hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-[#050508] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500">
                    {feature.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-[#27272A]">{feature.number}</span>
                </div>

                <h3 className="text-xl font-bold text-[#FAFAFA]">
                  {feature.title}
                </h3>

                <p className="text-[#A1A1AA] leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom highlight */}
          <div className="mt-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#14B8A6]/10 rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 sm:p-12 max-w-4xl mx-auto relative">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA]">
                        Готовы увидеть результат?
                      </h3>
                      <p className="text-[#A1A1AA]">
                        Получите КП с расчётом ROI в день запроса
                      </p>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="gold-button cursor-pointer inline-block whitespace-nowrap"
                  >
                    Запросить КП
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
    </section>
  );
}
