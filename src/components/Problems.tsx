"use client";

export default function Problems() {
  const problems = [
    {
      pain: "Провели обучение — показатели не изменились",
      job: "Хотите, чтобы обучение реально влияло на результаты?"
    },
    {
      pain: "Сотрудники забыли 80% через неделю",
      job: "Хотите, чтобы знания закрепились и применялись?"
    },
    {
      pain: "Стандартные программы не под вашу специфику",
      job: "Нужна программа именно под вашу отрасль?"
    },
    {
      pain: "Тренер говорит теорию — применить не могут",
      job: "Хотите практику на ваших реальных кейсах?"
    },
    {
      pain: "После курса участники остались без поддержки",
      job: "Нужна поддержка до достижения результата?"
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 section-dark-1">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#EF4444]/[0.03] to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#14B8A6]/[0.03] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA]">
              Какую задачу <span className="text-gradient-gold">решаем?</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column - Problems as Jobs */}
            <div className="space-y-4">
              {problems.map((item, index) => (
                <div
                  key={index}
                  className="premium-card p-6 space-y-3 group hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  {/* Pain point - crossed out style */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#EF4444]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-[#71717A] text-sm line-through">{item.pain}</p>
                  </div>

                  {/* Job to be done - highlighted */}
                  <div className="flex items-start gap-4 pl-12">
                    <p className="text-[#FAFAFA] font-medium group-hover:text-[#D4AF37] transition-colors">
                      {item.job}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column - Solution highlight */}
            <div className="relative lg:sticky lg:top-8">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/10 to-[#14B8A6]/10 rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 sm:p-12 space-y-8 text-center relative">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                  <svg className="w-10 h-10 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                    Мы закрываем <span className="text-gradient-gold">именно эти задачи</span>
                  </h3>

                  <p className="text-lg text-[#A1A1AA] leading-relaxed">
                    Каждая программа = конкретный бизнес-результат, который вы сможете измерить
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href="#features"
                    className="gold-button inline-block cursor-pointer"
                  >
                    Как мы это делаем
                  </a>
                </div>

                {/* Results indicators */}
                <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-[#D4AF37]/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#A1A1AA]">Рост метрик</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#14B8A6]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#A1A1AA]">Применение</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[#A1A1AA]">Закрепление</span>
                  </div>
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
