"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SCHEDULE_DATA, MONTHS, CATEGORIES, type ScheduleItem } from "@/data/schedule";

export default function SchedulePage() {
  const [categoryFilter, setCategoryFilter] = useState<"all" | "business" | "technical">("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique months from data
  const availableMonths = useMemo(() => {
    const months = new Set(SCHEDULE_DATA.map(item => item.month));
    return MONTHS.filter(m => months.has(m));
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    return SCHEDULE_DATA.filter(item => {
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesMonth = monthFilter === "all" || item.month === monthFilter;
      const matchesSearch = searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesMonth && matchesSearch;
    });
  }, [categoryFilter, monthFilter, searchQuery]);

  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU") + " тг";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2628] to-[#0f1819]">
      {/* Header */}
      <header className="bg-[#1a2628]/80 backdrop-blur-sm border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="text-[#F0BB1E]">Abadan</span> & Co.
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Расписание <span className="text-[#F0BB1E]">открытых тренингов</span>
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Выберите интересующий курс и запишитесь на обучение.
            Мы проводим тренинги онлайн и очно в Алматы.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#1e2d30] rounded-2xl p-6 mb-8 border border-white/5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-[#94A3B8] mb-2">Поиск по названию</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите название курса..."
                className="w-full px-4 py-3 bg-[#0f1819] border border-white/10 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
              />
            </div>

            {/* Category filter */}
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Категория</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as "all" | "business" | "technical")}
                className="w-full px-4 py-3 bg-[#0f1819] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all cursor-pointer"
              >
                <option value="all">{CATEGORIES.all}</option>
                <option value="business">{CATEGORIES.business}</option>
                <option value="technical">{CATEGORIES.technical}</option>
              </select>
            </div>

            {/* Month filter */}
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Месяц</label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f1819] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all cursor-pointer"
              >
                <option value="all">Все месяцы</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-[#64748B]">
            Найдено курсов: <span className="text-[#F0BB1E] font-semibold">{filteredData.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1e2d30] rounded-2xl border border-white/5 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f1819]/50 border-b border-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Дата</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Название курса</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#94A3B8]">Часов</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#94A3B8]">Онлайн</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#94A3B8]">Очно</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#94A3B8]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{item.date}</div>
                      <div className="text-xs text-[#64748B]">{item.month} 2026</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{item.name}</div>
                      <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                        item.category === "business"
                          ? "bg-[#00767D]/20 text-[#14B8A6]"
                          : "bg-[#F0BB1E]/20 text-[#F0BB1E]"
                      }`}>
                        {item.category === "business" ? "Бизнес" : "Технический"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-[#94A3B8]">{item.hours}</td>
                    <td className="px-6 py-4 text-right text-[#14B8A6] font-medium">{formatPrice(item.priceOnline)}</td>
                    <td className="px-6 py-4 text-right text-[#F0BB1E] font-medium">{formatPrice(item.priceOffline)}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/#contact?course=${encodeURIComponent(item.name)}`}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#00767D]/20 transition-all"
                      >
                        Записаться
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden divide-y divide-white/5">
            {filteredData.map((item, index) => (
              <div key={index} className="p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    item.category === "business"
                      ? "bg-[#00767D]/20 text-[#14B8A6]"
                      : "bg-[#F0BB1E]/20 text-[#F0BB1E]"
                  }`}>
                    {item.category === "business" ? "Бизнес" : "Технический"}
                  </div>
                  <div className="text-sm text-[#94A3B8]">{item.date}</div>
                </div>
                <h3 className="text-white font-medium mb-3">{item.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-[#64748B]">Онлайн: </span>
                    <span className="text-[#14B8A6] font-medium">{formatPrice(item.priceOnline)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#64748B]">Очно: </span>
                    <span className="text-[#F0BB1E] font-medium">{formatPrice(item.priceOffline)}</span>
                  </div>
                </div>
                <Link
                  href={`/#contact?course=${encodeURIComponent(item.name)}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Записаться
                </Link>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-[#64748B] mb-4">
                <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#94A3B8] text-lg">По вашему запросу ничего не найдено</p>
              <p className="text-[#64748B] text-sm mt-2">Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#64748B] text-sm">
            © 2025 Abadan & Co. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
