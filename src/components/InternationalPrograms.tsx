"use client";

import Image from "next/image";
import Link from "next/link";

const locations = [
  {
    city: "Дубай",
    country: "ОАЭ",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    flag: "🇦🇪",
  },
  {
    city: "Стамбул",
    country: "Турция",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop",
    flag: "🇹🇷",
  },
  {
    city: "Баку",
    country: "Азербайджан",
    image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=400&h=300&fit=crop",
    flag: "🇦🇿",
  },
  {
    city: "Тбилиси",
    country: "Грузия",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    flag: "🇬🇪",
  },
];

const features = [
  {
    title: "Практические кейсы",
    description: "Международный опыт ведущих компаний",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Эксперты-практики",
    description: "Тренинги и мастер-классы",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Нетворкинг",
    description: "Обмен опытом с коллегами из СНГ",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Сертификат",
    description: "Международного образца",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function InternationalPrograms() {
  return (
    <section id="international" className="relative py-16 sm:py-20 bg-gradient-to-br from-[#00767D]/5 via-white to-[#F0BB1E]/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/10 text-[#00767D] text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Международные программы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4">
              Обучение в ведущих <span className="text-gradient-primary">деловых центрах мира</span>
            </h2>
            <p className="text-lg text-[#546569] max-w-3xl mx-auto">
              Курсы повышения квалификации для специалистов нефтегазовой отрасли
              и управленческого персонала с фокусом на практику и современные подходы
            </p>
          </div>

          {/* Locations Grid with Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={location.image}
                  alt={`${location.city}, ${location.country}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <p className="text-white font-bold">{location.city}</p>
                      <p className="text-white/70 text-sm">{location.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-[#00767D]/10 hover:shadow-lg hover:border-[#00767D]/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00767D]/10 text-[#00767D] flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[#2D3A3C] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#546569]">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Description & CTA */}
          <div className="bg-white rounded-2xl p-8 border border-[#00767D]/10 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#2D3A3C] mb-4">
                  Программы для нефтегазовой отрасли и управленцев
                </h3>
                <p className="text-[#546569] mb-4 leading-relaxed">
                  Программы разрабатываются с учетом актуальных вызовов отрасли,
                  требований к эффективности команд, управлению изменениями и развитию
                  лидерских компетенций.
                </p>
                <p className="text-[#546569] leading-relaxed">
                  Формат обучения сочетает практические кейсы международных компаний,
                  тренинги от экспертов-практиков, обмен опытом с коллегами из других
                  стран и профессиональный нетворкинг.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="bg-gradient-to-br from-[#F0BB1E]/10 to-[#F0BB1E]/5 rounded-xl p-6 text-center w-full max-w-xs">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-[#2D3A3C] font-bold mb-1">Сертификат</p>
                  <p className="text-sm text-[#546569]">международного образца</p>
                </div>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00767D]/20 transition-all"
                >
                  Узнать о программах
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
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
