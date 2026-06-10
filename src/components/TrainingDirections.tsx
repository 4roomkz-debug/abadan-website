"use client";

export default function TrainingDirections() {
  const businessPrograms = [
    "Soft-skills и личная эффективность",
    "Управление проектами",
    "Risk-management и оценка рисков",
    "Финансы и бюджетирование",
    "HR, кадровое делопроизводство",
    "Закупки и снабжение",
    "Логистика и складское хозяйство",
    "Юриспруденция и трудовое право",
    "Командообразование и тимбилдинг",
    "Когнитивная гибкость",
    "Цифровой маркетинг"
  ];

  const industryPrograms = [
    "Промышленная безопасность и экология",
    "Нефтегазовый сектор",
    "Строительство",
    "Microsoft Office для бизнеса"
  ];

  const aiPrograms = [
    "Внедрение ИИ-инструментов в бизнес-процессы",
    "AI STEP — массовое обучение по ИИ",
    "Промпт-инжиниринг для корпоративных задач",
    "ИИ для автоматизации документооборота",
    "ИИ в HR-процессах: подбор, обучение, оценка",
    "ИИ для отчётности и аналитики",
    "Создание прикладных ИИ-агентов для бизнеса",
    "Информационная безопасность в корпоративной среде",
    "Отраслевые AI-программы (нефтегаз, энергетика, телеком)"
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
      {/* Soft transitions from/to neighboring light sections */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#FAFAFA]/25 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent to-[#F8FAFA]/30 pointer-events-none"></div>

      {/* Ambient glows */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#00767D]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/[0.07] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Направления <span className="text-gradient-gold">обучения</span>
            </h2>
            <p className="text-lg text-[#9DB4B6] max-w-2xl mx-auto">
              От soft-skills до искусственного интеллекта — программы под задачи вашего бизнеса
            </p>
          </div>

          {/* Programs grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Business and Management */}
            <div className="night-glass-card p-8 space-y-6 scroll-fade-in scroll-delay-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#009BA3] to-[#00767D] flex items-center justify-center text-white shadow-lg shadow-[#00767D]/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Бизнес и управление</h3>
              </div>

              <ul className="space-y-3">
                {businessPrograms.map((program, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <svg className="w-5 h-5 text-[#009BA3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#9DB4B6] group-hover:text-white transition-colors duration-200">{program}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Programs */}
            <div className="night-glass-card night-glass-card-gold p-8 space-y-6 scroll-fade-in scroll-delay-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center text-[#2D3A3C] shadow-lg shadow-[#F0BB1E]/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Отраслевые программы</h3>
              </div>

              <ul className="space-y-3">
                {industryPrograms.map((program, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <svg className="w-5 h-5 text-[#F0BB1E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#9DB4B6] group-hover:text-white transition-colors duration-200">{program}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-[#7A9EA3] italic">
                  И более 50+ других направлений под запрос
                </p>
              </div>
            </div>

            {/* AI Programs */}
            <div className="night-glass-card p-8 space-y-6 relative overflow-hidden scroll-fade-in scroll-delay-3">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] text-xs font-bold rounded-full shadow-lg shadow-[#F0BB1E]/20">NEW</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#009BA3] via-[#00767D] to-[#F0BB1E] flex items-center justify-center text-white shadow-lg shadow-[#00767D]/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Искусственный интеллект</h3>
              </div>

              <ul className="space-y-3">
                {aiPrograms.map((program, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <svg className="w-5 h-5 text-[#009BA3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#9DB4B6] group-hover:text-white transition-colors duration-200">{program}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-[#7A9EA3] italic">
                  Онлайн и офлайн форматы
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center scroll-fade-in scroll-delay-2">
            <div className="night-glass-card p-8 max-w-3xl mx-auto">
              <p className="text-lg text-[#9DB4B6] mb-6">
                Не нашли нужное направление? У нас{" "}
                <span className="font-bold text-[#F0BB1E]">200+ экспертов</span> в базе.
                Подберём программу под любой запрос!
              </p>
              <a
                href="#contact"
                className="gold-button inline-block cursor-pointer"
              >
                Получить консультацию
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
