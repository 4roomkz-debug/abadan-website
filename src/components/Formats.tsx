"use client";

import Image from "next/image";

export default function Formats() {
  return (
    <section className="relative py-20 sm:py-32 section-dark-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C]">
              Форматы <span className="text-gradient-primary">обучения</span>
            </h2>
            <p className="text-xl text-[#546569]">
              Выберите удобный для вас формат
            </p>
          </div>

          {/* Formats grid with real photos */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Corporate training - with photo */}
            <div className="glass-card overflow-hidden">
              <div className="relative h-56">
                <Image
                  src="/images/photos/IMG_1227.JPG"
                  alt="Корпоративный тренинг Abadan & Co."
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Корпоративные тренинги</h3>
                  <p className="text-white/90 text-sm mt-1 drop-shadow-md">Закрытые группы для вашей команды</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>На территории заказчика</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Адаптация под ваши задачи</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Конфиденциальность</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Open training - with photo */}
            <div className="glass-card overflow-hidden">
              <div className="relative h-56">
                <Image
                  src="/images/photos/IMG_6890.JPG"
                  alt="Открытый тренинг Abadan & Co."
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Открытые тренинги</h3>
                  <p className="text-white/90 text-sm mt-1 drop-shadow-md">Присоединяйтесь к группе</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>От 2 человек</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Нетворкинг с коллегами</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#546569]">
                    <svg className="w-5 h-5 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Фиксированные даты</span>
                  </li>
                </ul>
              </div>
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
