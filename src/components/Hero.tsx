"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Subtle ambient lighting - simplified */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#00767D]/[0.04] to-transparent rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left column - Text content */}
            <div className="space-y-10 animate-fade-in-up">
              {/* PGT Badge */}
              <div className="inline-flex items-center gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/10 text-[#00767D] text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00767D] animate-pulse"></span>
                  People Growth Technology
                </div>
                <div className="status-badge">
                  <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse"></span>
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#2D3A3C]">
                  Превратите обучение
                  <br />
                  <span className="text-gradient-primary">в рост показателей</span>
                </h2>

                <p className="text-xl sm:text-2xl text-[#546569] font-light leading-relaxed max-w-xl">
                  Ваша команда применит знания уже на следующий день — и это отразится в KPI
                </p>
              </div>

              {/* Exclusive features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00767D]/15 bg-[#00767D]/[0.03]">
                  <svg className="w-5 h-5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#2D3A3C] font-medium">200+ экспертов</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00767D]/15 bg-[#00767D]/[0.03]">
                  <svg className="w-5 h-5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#2D3A3C] font-medium">Казахстан · СНГ</span>
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
                  className="teal-button-outline text-center cursor-pointer inline-block"
                >
                  Узнать больше
                </a>
              </div>
            </div>

            {/* Right column - Real photo */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Photo container with styling */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/photos/IMG_6890.JPG"
                  alt="Тренинг по лидерству — Abadan & Co."
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Overlay with caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">Тренинг «Лидерство»</p>
                  <p className="text-white/80 text-sm">Реальные кейсы, практика, результат</p>
                </div>
              </div>

              {/* Stats badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#00767D]/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2D3A3C]">50 000+</p>
                    <p className="text-sm text-[#546569]">обучено специалистов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00767D]/20 to-transparent"></div>
      </div>
    </section>
  );
}
