"use client";

export default function WhyChooseUs() {
  const reasons = [
    {
      number: "01",
      title: "Решение в день обращения",
      description: "КП с расчётом ROI в день запроса. Без долгих согласований и бюрократии.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Экономия до 50%",
      description: "При рамочном договоре — существенная экономия на развитии команды.",
      highlight: true,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Внимание каждому",
      description: "Обучение от 2 участников. Каждый получает обратную связь.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Эксперт под любую задачу",
      description: "200+ специалистов в базе. Подберём под вашу специфику.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      number: "05",
      title: "Закрытие без задержек",
      description: "Все документы в день завершения. Бухгалтерия будет довольна.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "06",
      title: "Заботимся о логистике",
      description: "Жильё и трансфер для участников из регионов — на нас.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 section-white">
      {/* Ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#00767D]/[0.03] to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#F0BB1E]/[0.03] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 space-y-4 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Почему нас <span className="text-gradient-primary">выбирают?</span>
            </h2>
            <p className="text-xl text-[#7A8B8E] max-w-2xl mx-auto">
              6 причин работать с Abadan & Company
            </p>
          </div>

          {/* Reasons grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 pt-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`relative group overflow-visible scroll-fade-in scroll-delay-${(index % 3) + 1} ${
                  reason.highlight
                    ? 'glass-card-gold p-8'
                    : 'glass-card p-8'
                }`}
              >
                {/* Highlight badge for special offer */}
                {reason.highlight && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] rounded-full text-[#2D3A3C] text-xs font-bold uppercase tracking-wide shadow-[0_0_20px_rgba(240,187,30,0.3)]">
                    Акция
                  </div>
                )}

                <div className="space-y-5">
                  {/* Number and icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      reason.highlight
                        ? 'bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] group-hover:shadow-[0_0_30px_rgba(240,187,30,0.3)]'
                        : 'bg-gradient-to-br from-[#00767D] to-[#006D77] text-white group-hover:shadow-[0_0_30px_rgba(0,118,125,0.3)]'
                    }`}>
                      {reason.icon}
                    </div>
                    <span className={`text-3xl font-extrabold ${
                      reason.highlight ? 'text-[#F0BB1E]/30' : 'text-[#E0E5E6]'
                    }`}>
                      {reason.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold ${
                    reason.highlight ? 'text-gradient-gold' : 'text-[#2D3A3C]'
                  }`}>
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#546569] leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  reason.highlight
                    ? 'bg-gradient-to-br from-[#F0BB1E]/5 to-transparent'
                    : 'bg-gradient-to-br from-[#00767D]/5 to-transparent'
                }`}></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00767D]/5 via-transparent to-[#F0BB1E]/5 rounded-3xl blur-2xl"></div>

            <div className="premium-card p-10 sm:p-12 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#00767D]/15 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#00767D]/15 rounded-br-2xl"></div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left space-y-3">
                  <p className="text-2xl sm:text-3xl font-bold text-[#2D3A3C]">
                    Присоединяйтесь к <span className="text-gradient-gold">359 компаниям</span>
                  </p>
                  <p className="text-[#546569] text-lg">
                    которые уже доверяют нам развитие своих команд
                  </p>
                </div>

                <a
                  href="#contact"
                  className="gold-button text-center cursor-pointer whitespace-nowrap"
                >
                  Начать сотрудничество
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
