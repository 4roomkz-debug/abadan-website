"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { SCHEDULE_DATA, MONTHS, CATEGORIES, parseDateForSort } from "@/data/schedule";

export default function SchedulePage() {
  const [categoryFilter, setCategoryFilter] = useState<"all" | "business" | "technical">("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    participants: "1"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const openModal = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
    setSubmitSuccess(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse("");
    setFormData({ name: "", phone: "", email: "", participants: "1" });
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Telegram bot
      const message = `🎓 Новая заявка на курс!\n\n📚 Курс: ${selectedCourse}\n👤 Имя: ${formData.name}\n📱 Телефон: ${formData.phone}\n📧 Email: ${formData.email || "не указан"}\n👥 Участников: ${formData.participants}`;

      await fetch("https://api.telegram.org/bot8351809456:AAF8OsK251bpvwNl60NOZZ0Np9fXRr7yQPY/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "127052678",
          text: message
        })
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get unique months from data
  const availableMonths = useMemo(() => {
    const months = new Set(SCHEDULE_DATA.map(item => item.month));
    return MONTHS.filter(m => months.has(m));
  }, []);

  // Filter and sort data by calendar date
  const filteredData = useMemo(() => {
    return SCHEDULE_DATA
      .filter(item => {
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
        const matchesMonth = monthFilter === "all" || item.month === monthFilter;
        const matchesSearch = searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesMonth && matchesSearch;
      })
      .sort((a, b) => parseDateForSort(a.date, a.month) - parseDateForSort(b.date, b.month));
  }, [categoryFilter, monthFilter, searchQuery]);

  // Format price (without currency suffix - footnote explains it's in tenge)
  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFB] to-white">
      <Header />

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#7A8B8E] mb-8">
          <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#2D3A3C] font-medium">Расписание</span>
        </nav>

        {/* Page title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C] mb-4">
            <span className="text-[#00767D]">Расписание</span> открытых тренингов
          </h1>
          <p className="text-[#546569] text-lg max-w-2xl mx-auto">
            Выберите интересующий курс и запишитесь на обучение.
            Мы проводим тренинги онлайн и очно в Алматы.
          </p>
        </div>

        {/* Special Event Banner */}
        <Link
          href="/events/business-breakfast-ai-hr"
          className="block mb-8 bg-gradient-to-r from-[#00767D] to-[#006D77] rounded-2xl p-6 sm:p-8 text-white hover:shadow-xl hover:shadow-[#00767D]/20 transition-all group"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                🤖
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#F0BB1E] text-[#2D3A3C] text-xs font-bold rounded-full">БЕСПЛАТНО</span>
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">30 января 2026</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Бизнес-завтрак: AI в HR</h3>
              <p className="text-white/80 text-sm sm:text-base">Революция найма и обучения — кейсы, метрики, практика. 3 спикера, нетворкинг, демо ibirAi.</p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 text-[#F0BB1E] font-semibold group-hover:translate-x-1 transition-transform">
                Подробнее
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#00767D]/10 shadow-sm">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-[#546569] mb-2">Поиск по названию</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите название курса..."
                className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
              />
            </div>

            {/* Category filter */}
            <div>
              <label className="block text-sm text-[#546569] mb-2">Категория</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as "all" | "business" | "technical")}
                className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all cursor-pointer"
              >
                <option value="all">{CATEGORIES.all}</option>
                <option value="business">{CATEGORIES.business}</option>
                <option value="technical">{CATEGORIES.technical}</option>
              </select>
            </div>

            {/* Month filter */}
            <div>
              <label className="block text-sm text-[#546569] mb-2">Месяц</label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all cursor-pointer"
              >
                <option value="all">Все месяцы</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-[#546569]">
            Найдено курсов: <span className="text-[#00767D] font-semibold">{filteredData.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#00767D]/10 shadow-sm overflow-hidden">
          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFB] border-b border-[#00767D]/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#546569]">Дата</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#546569]">Название курса</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#546569]">Часов</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#546569]">Онлайн</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#546569]">Очно</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#546569]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#00767D]/5 hover:bg-[#F8FAFB]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-[#2D3A3C] font-medium">{item.date}</div>
                      <div className="text-xs text-[#94A3B8]">{item.month} 2026</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#2D3A3C]">{item.name}</div>
                      <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                        item.category === "business"
                          ? "bg-[#00767D]/10 text-[#00767D]"
                          : "bg-[#F0BB1E]/20 text-[#B8860B]"
                      }`}>
                        {item.category === "business" ? "Бизнес" : "Технический"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-[#546569]">{item.hours}</td>
                    <td className="px-6 py-4 text-right text-[#00767D] font-medium">{formatPrice(item.priceOnline)}</td>
                    <td className="px-6 py-4 text-right text-[#B8860B] font-medium">{formatPrice(item.priceOffline)}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(item.name)}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#00767D]/20 transition-all cursor-pointer"
                      >
                        Записаться
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden divide-y divide-[#00767D]/5">
            {filteredData.map((item, index) => (
              <div key={index} className="p-4 hover:bg-[#F8FAFB]/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    item.category === "business"
                      ? "bg-[#00767D]/10 text-[#00767D]"
                      : "bg-[#F0BB1E]/20 text-[#B8860B]"
                  }`}>
                    {item.category === "business" ? "Бизнес" : "Технический"}
                  </div>
                  <div className="text-sm text-[#546569]">{item.date}</div>
                </div>
                <h3 className="text-[#2D3A3C] font-medium mb-3">{item.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-[#94A3B8]">Онлайн: </span>
                    <span className="text-[#00767D] font-medium">{formatPrice(item.priceOnline)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#94A3B8]">Очно: </span>
                    <span className="text-[#B8860B] font-medium">{formatPrice(item.priceOffline)}</span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(item.name)}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all cursor-pointer"
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-[#94A3B8] mb-4">
                <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#546569] text-lg">По вашему запросу ничего не найдено</p>
              <p className="text-[#94A3B8] text-sm mt-2">Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>

        {/* Price footnote */}
        <p className="mt-4 text-sm text-[#94A3B8] text-center">
          * Все цены указаны в тенге (₸)
        </p>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#546569] hover:text-[#00767D] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00767D]/10 py-8 mt-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#94A3B8] text-sm">
            © 2025 Abadan & Co. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl border border-[#00767D]/10 w-full max-w-md p-6 shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#2D3A3C] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00767D]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">Заявка отправлена!</h3>
                <p className="text-[#546569]">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">Записаться на курс</h3>
                <p className="text-[#546569] text-sm mb-6 line-clamp-2">{selectedCourse}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#546569] mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#546569] mb-1">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#546569] mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#546569] mb-1">Количество участников</label>
                    <select
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "человек" : n < 5 ? "человека" : "человек"}</option>
                      ))}
                      <option value="10+">Более 10</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00767D]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
