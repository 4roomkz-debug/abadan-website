"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero-dark overflow-hidden">
      {/* Luxury ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#D4AF37]/[0.07] via-[#D4AF37]/[0.02] to-transparent rounded-full blur-[120px]"></div>

        {/* Subtle side accents */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[800px] bg-gradient-to-r from-[#14B8A6]/[0.03] to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#D4AF37]/[0.04] to-transparent blur-[120px]"></div>
      </div>

      {/* Elegant vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[20%] w-px h-[40vh] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent"></div>
        <div className="absolute top-[10vh] left-[40%] w-px h-[30vh] bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/3 to-transparent"></div>
        <div className="absolute top-0 right-[25%] w-px h-[50vh] bg-gradient-to-b from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left column - Text content */}
            <div className="space-y-10 animate-fade-in-up">
              {/* Exclusive badge */}
              <div className="inline-flex items-center gap-3">
                <div className="status-badge">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  <span>С 2015 года на рынке</span>
                </div>
              </div>

              {/* Logo */}
              <div>
                <img
                  src="/images/logo.png"
                  alt="Abadan & Company"
                  className="h-16 sm:h-20 w-auto"
                />
              </div>

              {/* Main heading */}
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#FAFAFA]">
                  Превратите обучение
                  <br />
                  <span className="text-gradient-platinum">в рост показателей</span>
                </h2>

                <p className="text-xl sm:text-2xl text-[#A1A1AA] font-light leading-relaxed max-w-xl">
                  Ваша команда применит знания уже на следующий день — и это отразится в KPI
                </p>
              </div>

              {/* Exclusive features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#FAFAFA] font-medium">200+ экспертов</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#FAFAFA] font-medium">Казахстан · СНГ</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#contact"
                  className="gold-button text-center cursor-pointer inline-block"
                >
                  Запросить программу
                </a>
                <a
                  href="#about"
                  className="dark-button-outline text-center cursor-pointer inline-block"
                >
                  Узнать больше
                </a>
              </div>
            </div>

            {/* Right column - Premium card */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#14B8A6]/10 rounded-3xl blur-2xl opacity-50"></div>

              <div className="premium-card gradient-border-gold p-10 sm:p-12 space-y-8 relative luxury-shine">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#FAFAFA]">
                    Что вы получите
                  </h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                      <span className="text-[#050508] font-extrabold text-lg">01</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FAFAFA] text-lg">Применение с первого дня</h4>
                      <p className="text-[#A1A1AA] text-sm mt-1">Команда использует знания сразу после тренинга</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

                  <div className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FAFAFA] text-lg">Привязка к вашим метрикам</h4>
                      <p className="text-[#A1A1AA] text-sm mt-1">Каждый модуль работает на конкретные KPI</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

                  <div className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                      <svg className="w-7 h-7 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FAFAFA] text-lg">Доведём до результата</h4>
                      <p className="text-[#A1A1AA] text-sm mt-1">ДЗ, проверка, Q&A — пока навык не закрепится</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

                  <div className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FAFAFA] text-lg">Запуск за 3 дня</h4>
                      <p className="text-[#A1A1AA] text-sm mt-1">КП в день обращения, без бюрократии</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom luxury divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
      </div>
    </section>
  );
}
