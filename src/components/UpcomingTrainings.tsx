"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SCHEDULE_DATA, MONTHS, parseDateForSort, type ScheduleItem } from "@/data/schedule";

// Функция для получения текущей даты как числа для сравнения
function getCurrentDateValue(): number {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentDay = now.getDate();
  // Поскольку расписание на 2026 год, а сейчас 2025 - показываем все тренинги
  // Когда наступит 2026, эта логика будет фильтровать прошедшие
  const currentYear = now.getFullYear();

  if (currentYear < 2026) {
    // Показываем все тренинги, начиная с января
    return 0;
  }

  return currentMonth * 100 + currentDay;
}

// Фильтрация только будущих тренингов
function getUpcomingTrainings(count: number): ScheduleItem[] {
  const currentDateValue = getCurrentDateValue();

  return SCHEDULE_DATA
    .filter(item => parseDateForSort(item.date, item.month) >= currentDateValue)
    .sort((a, b) => parseDateForSort(a.date, a.month) - parseDateForSort(b.date, b.month))
    .slice(0, count);
}

export default function UpcomingTrainings() {
  const [activeCategory, setActiveCategory] = useState<"all" | "business" | "technical">("all");

  const upcomingTrainings = useMemo(() => {
    const all = getUpcomingTrainings(12);
    if (activeCategory === "all") return all.slice(0, 6);
    return all.filter(t => t.category === activeCategory).slice(0, 6);
  }, [activeCategory]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[#00767D]/10 text-[#00767D] rounded-full text-sm font-medium mb-4">
            Расписание 2026
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D3A3C] mb-4">
            Ближайшие <span className="text-[#F0BB1E]">открытые тренинги</span>
          </h2>
          <p className="text-[#546569] max-w-2xl mx-auto text-lg">
            Выберите курс и запишитесь на обучение. Актуальное расписание на 2026 год.
          </p>
        </div>

        {/* Фильтр по категориям */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-[#00767D] text-white shadow-lg shadow-[#00767D]/20"
                : "bg-[#F8FAFB] text-[#546569] hover:bg-[#00767D]/10"
            }`}
          >
            Все курсы
          </button>
          <button
            onClick={() => setActiveCategory("business")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === "business"
                ? "bg-[#00767D] text-white shadow-lg shadow-[#00767D]/20"
                : "bg-[#F8FAFB] text-[#546569] hover:bg-[#00767D]/10"
            }`}
          >
            Бизнес и управление
          </button>
          <button
            onClick={() => setActiveCategory("technical")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === "technical"
                ? "bg-[#00767D] text-white shadow-lg shadow-[#00767D]/20"
                : "bg-[#F8FAFB] text-[#546569] hover:bg-[#00767D]/10"
            }`}
          >
            Технические семинары
          </button>
        </div>

        {/* Карточки курсов */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {upcomingTrainings.map((training, index) => (
            <div
              key={index}
              className="bg-[#F8FAFB] rounded-2xl p-5 border border-[#00767D]/10 hover:border-[#00767D]/30 hover:shadow-lg transition-all group"
            >
              {/* Дата и категория */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#00767D] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#2D3A3C] font-semibold">{training.date}</div>
                    <div className="text-xs text-[#94A3B8]">{training.month} 2026</div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  training.category === "business"
                    ? "bg-[#00767D]/10 text-[#00767D]"
                    : "bg-[#F0BB1E]/20 text-[#B8860B]"
                }`}>
                  {training.category === "business" ? "Бизнес" : "Технический"}
                </span>
              </div>

              {/* Название */}
              <h3 className="text-[#2D3A3C] font-semibold mb-3 line-clamp-2 min-h-[48px] group-hover:text-[#00767D] transition-colors">
                {training.name}
              </h3>

              {/* Детали */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1.5 text-[#546569]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {training.hours} ч.
                </div>
                <div className="flex items-center gap-1.5 text-[#00767D] font-medium">
                  от {formatPrice(training.priceOnline)} ₸
                </div>
              </div>

              {/* Кнопка */}
              <Link
                href={`/schedule?search=${encodeURIComponent(training.name)}`}
                className="block w-full text-center py-2.5 bg-white border border-[#00767D]/20 text-[#00767D] font-medium rounded-xl hover:bg-[#00767D] hover:text-white transition-all"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>

        {/* Кнопка "Все расписание" */}
        <div className="text-center">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#00767D]/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Смотреть всё расписание
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">172 курса</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
