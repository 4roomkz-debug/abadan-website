"use client";

import Link from "next/link";

const trainingLinks = [
  { href: "/treningi/hr", label: "HR и кадры" },
  { href: "/treningi/finansy", label: "Финансы и учёт" },
  { href: "/treningi/pravo", label: "Трудовое право" },
  { href: "/treningi/liderstvo", label: "Лидерство" },
  { href: "/treningi/neftegaz", label: "Нефтегаз" },
  { href: "/treningi/ai", label: "ИИ для бизнеса" },
  { href: "/coaching", label: "Коучинг" },
  { href: "/schedule", label: "Расписание" },
];

const companyLinks = [
  { href: "/about", label: "О компании" },
  { href: "/kejsy", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/projects", label: "Проекты" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

            {/* Company info */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
                <span className="text-[#F0BB1E]">Abadan</span> & Co.
              </Link>

              <p className="text-[#7A9EA3] text-sm leading-relaxed">
                Ведущий провайдер корпоративного обучения в Казахстане и СНГ.
                С 2015 года помогаем компаниям превращать обучение в измеримый рост эффективности.
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#7A9EA3]">
                  <svg className="w-3.5 h-3.5 text-[#00A3AD]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  На рынке с 2015
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#7A9EA3]">
                  <svg className="w-3.5 h-3.5 text-[#00A3AD]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Алматы, Казахстан
                </div>
              </div>
            </div>

            {/* Обучение column */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Обучение</h4>
              <ul className="space-y-2.5">
                {trainingLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#7A9EA3] hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Компания column */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Компания</h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#7A9EA3] hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контакты column */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Контакты</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+77022413388"
                    className="text-[#7A9EA3] hover:text-white text-sm transition-colors flex items-center gap-2.5 group"
                  >
                    <svg className="w-4 h-4 text-[#00A3AD] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +7 702 241 33 88
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:i.islambek@abadan.kz"
                    className="text-[#7A9EA3] hover:text-white text-sm transition-colors flex items-center gap-2.5 group"
                  >
                    <svg className="w-4 h-4 text-[#00A3AD] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    i.islambek@abadan.kz
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[#7A9EA3] text-sm">
                  <svg className="w-4 h-4 text-[#00A3AD] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Алматы, Казахстан
                </li>
                <li className="pt-2">
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com/abadan_co"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/company/abadan-co"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[#7A9EA3] text-sm text-center sm:text-left">
                © {currentYear} Abadan & Company. Все права защищены.
              </p>
              <p className="text-[#546569] text-xs text-center sm:text-right">
                Алматы, Казахстан · Корпоративное обучение и развитие
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
