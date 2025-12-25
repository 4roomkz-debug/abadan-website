"use client";

import Link from "next/link";

export default function Formats() {
  return (
    <section className="relative py-16 sm:py-20 section-dark-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C]">
              Форматы <span className="text-gradient-primary">обучения</span>
            </h2>
            <p className="text-xl text-[#546569]">
              Выберите удобный для вас формат
            </p>
          </div>

          {/* Formats grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Corporate training */}
            <div className="glass-card p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">Корпоративные тренинги</h3>
              <p className="text-[#546569] text-sm mb-4">Закрытые группы для вашей команды</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>На территории заказчика</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Адаптация под ваши задачи</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Конфиденциальность</span>
                </li>
              </ul>
            </div>

            {/* Open training */}
            <div className="glass-card-gold p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center text-[#2D3A3C] mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">Открытые тренинги</h3>
              <p className="text-[#546569] text-sm mb-4">Присоединяйтесь к группе</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#F0BB1E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>От 2 человек</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#F0BB1E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Нетворкинг с коллегами</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#F0BB1E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Фиксированные даты</span>
                </li>
              </ul>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#F0BB1E]/20 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Расписание
              </Link>
            </div>

            {/* International programs */}
            <div className="glass-card p-6 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-[#00767D] text-white text-xs font-semibold rounded-full">NEW</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">Международные программы</h3>
              <p className="text-[#546569] text-sm mb-4">Обучение за рубежом с сертификатом</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Дубай, Стамбул, Баку, Грузия</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Международный сертификат</span>
                </li>
                <li className="flex items-center gap-2 text-[#546569] text-sm">
                  <svg className="w-4 h-4 text-[#00767D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Нетворкинг с коллегами из СНГ</span>
                </li>
              </ul>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#00767D] text-[#00767D] font-semibold rounded-lg hover:bg-[#00767D] hover:text-white transition-all text-sm"
              >
                Узнать подробнее
              </Link>
            </div>
          </div>

          {/* Additional benefits - horizontal */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="glass-card-teal px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2D3A3C]">Гибкий график</p>
                <p className="text-xs text-[#546569]">Подстраиваемся под ваш процесс</p>
              </div>
            </div>

            <div className="glass-card-gold px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center text-[#2D3A3C]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2D3A3C]">Группы от 2 человек</p>
                <p className="text-xs text-[#546569]">Даже для малых команд</p>
              </div>
            </div>

            <div className="glass-card-teal px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#2D3A3C]">На вашей территории</p>
                <p className="text-xs text-[#546569]">Обучение в удобном месте</p>
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
