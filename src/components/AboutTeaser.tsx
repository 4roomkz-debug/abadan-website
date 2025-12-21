"use client";

import Link from "next/link";

export default function AboutTeaser() {
  const stats = [
    { value: "359", label: "компаний" },
    { value: "50K+", label: "выпускников" },
    { value: "200+", label: "экспертов" },
  ];

  return (
    <section className="relative py-16 sm:py-20 section-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/10 text-[#00767D] text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00767D]"></span>
                People Growth Technology
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-4">
                Компания <span className="text-gradient-primary">нового типа</span>
              </h2>

              <p className="text-lg text-[#546569] mb-6 leading-relaxed">
                Abadan & Co. — это не просто тренинги. Это гибридная модель обучения:
                офлайн + онлайн + AI-платформа ibirAi. Мы развиваем людей и растим
                показатели через технологии.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#00767D] font-semibold hover:gap-3 transition-all"
              >
                Подробнее о компании
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right side - Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#F8FAFA] to-white border border-[#00767D]/10"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#00767D] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#546569] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
