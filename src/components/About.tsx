"use client";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 section-white">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-[#00767D]/[0.03] to-transparent blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Партнёр по <span className="text-gradient-gold">развитию команд</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Main text */}
            <div className="space-y-8 scroll-fade-in-left scroll-delay-1">
              <div className="space-y-6">
                <p className="text-xl text-[#546569] leading-relaxed">
                  <span className="text-[#2D3A3C] font-semibold">Abadan & Company</span> — это не курсы. Это партнёр, который берёт на себя развитие вашей команды с гарантией результата.
                </p>

                <p className="text-lg text-[#7A8B8E] leading-relaxed">
                  С 2015 года мы помогаем <span className="text-[#F0BB1E] font-semibold">359 компаниям</span> превращать обучение в измеримый рост эффективности. Не «провести тренинг», а решить бизнес-задачу.
                </p>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-gradient-gold">10</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Лет на рынке</p>
                </div>
                <div className="text-center border-x border-[#00767D]/10">
                  <p className="text-4xl font-extrabold text-gradient-gold">359</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Клиентов</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-gradient-gold">200+</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Экспертов</p>
                </div>
              </div>
            </div>

            {/* Right - Founder card */}
            <div className="relative scroll-fade-in-right scroll-delay-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00767D]/5 to-[#F0BB1E]/5 rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 space-y-6 relative">
                <div className="flex items-start gap-6">
                  {/* Founder photo */}
                  <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,118,125,0.15)] ring-2 ring-[#00767D]/20">
                    <img
                      src="/images/founder.jpg"
                      alt="Гани Абадан"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2D3A3C]">Гани Абадан</h3>
                    <p className="text-[#00767D] font-medium">Основатель и руководитель</p>
                    <p className="text-sm text-[#7A8B8E] mt-2">Предприниматель, автор книги «Бизнес по любви 2.0»</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>

                <blockquote className="text-[#546569] italic leading-relaxed">
                  «Когда к нам приходит клиент, первый вопрос не "какой тренинг нужен?", а "какую бизнес-задачу решаем?". Только так обучение становится инвестицией, а не расходом.»
                </blockquote>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-[#7A8B8E]">
                    <svg className="w-4 h-4 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Certified Business Trainer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7A8B8E]">
                    <svg className="w-4 h-4 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>YBI International</span>
                  </div>
                </div>
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
