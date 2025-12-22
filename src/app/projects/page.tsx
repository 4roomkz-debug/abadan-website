"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const ibiraiFeatures = [
    {
      title: "Микроуроки 3 минуты",
      description: "Короткие уроки, которые легко вписываются в рабочий день. Без отрыва от работы.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Telegram & WhatsApp",
      description: "Обучение там, где ваши сотрудники уже проводят время. Без установки новых приложений.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: "AI-аватар",
      description: "Персонализированные видео-уроки с виртуальным ментором. Живое общение без живого тренера.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "HR-дашборд",
      description: "Аналитика вовлечённости в реальном времени. Видите, кто учится, а кто нет.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Геймификация",
      description: "Баллы, лидерборды, призы. Сотрудники соревнуются и учатся с удовольствием.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: "Быстрый запуск",
      description: "2-3 недели от первого контакта до запуска. Без долгой интеграции и внедрения.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: "87%", label: "доходимость", sublabel: "vs 23% у LMS" },
    { value: "3", label: "минуты", sublabel: "на урок" },
    { value: "2-3", label: "недели", sublabel: "до запуска" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00767D]/5 via-transparent to-[#F0BB1E]/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center gap-2 text-sm text-[#7A8B8E] mb-6">
              <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#2D3A3C] font-medium">Проекты</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 text-[#D4A017] text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse"></span>
              Наши проекты
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C] mb-6">
              Технологии для<br />
              <span className="text-gradient-primary">развития людей</span>
            </h1>
            <p className="text-xl text-[#546569] max-w-2xl mx-auto">
              Мы создаём инструменты, которые делают корпоративное обучение
              эффективнее, доступнее и измеримее.
            </p>
          </div>
        </div>
      </section>

      {/* ibirAi Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* ibirAi Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="text-5xl sm:text-6xl font-extrabold">
                  <span className="text-[#00767D]">ibir</span>
                  <span className="text-[#F0BB1E]">Ai</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3A3C] mb-4">
                Платформа микрообучения нового поколения
              </h2>
              <p className="text-lg text-[#546569] max-w-2xl mx-auto">
                Микроуроки в мессенджерах с AI-аватаром. Обучение без отрыва от работы
                с измеримым результатом.
              </p>
            </div>

            {/* Problem-Solution */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Problem */}
              <div className="bg-white rounded-2xl p-8 border border-red-100">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Проблема</h3>
                <ul className="space-y-3 text-[#546569]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    70% сотрудников не доходят до конца курсов
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    Нет времени на длинные тренинги
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    Невозможно измерить ROI обучения
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">×</span>
                    LMS — это скучно и неудобно
                  </li>
                </ul>
              </div>

              {/* Solution */}
              <div className="bg-gradient-to-br from-[#00767D] to-[#006D77] rounded-2xl p-8 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Решение ibirAi</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F0BB1E] mt-1">✓</span>
                    87% доходимость до конца программы
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F0BB1E] mt-1">✓</span>
                    3-минутные уроки в привычных мессенджерах
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F0BB1E] mt-1">✓</span>
                    Real-time аналитика и расчёт ROI
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F0BB1E] mt-1">✓</span>
                    Геймификация и AI-персонализация
                  </li>
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl border border-[#00767D]/10">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#00767D] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#2D3A3C] font-semibold">{stat.label}</div>
                  <div className="text-sm text-[#546569]">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ibiraiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-[#00767D]/10 hover:border-[#00767D]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 text-[#00767D] flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">{feature.title}</h3>
                  <p className="text-[#546569] text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://ibirai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00767D] to-[#006D77] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00767D]/20 transition-all"
              >
                Перейти на ibirai.com
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-8 text-center">
              Для кого <span className="text-gradient-gold">ibirAi</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8FAFA] text-center">
                <div className="w-16 h-16 rounded-full bg-[#00767D]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">HR и L&D</h3>
                <p className="text-sm text-[#546569]">
                  Повысьте доходимость обучения и покажите ROI руководству
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFA] text-center">
                <div className="w-16 h-16 rounded-full bg-[#F0BB1E]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">Компании 50+</h3>
                <p className="text-sm text-[#546569]">
                  Масштабируйте обучение на филиалы без увеличения бюджета
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFA] text-center">
                <div className="w-16 h-16 rounded-full bg-[#00767D]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">CEO/CFO</h3>
                <p className="text-sm text-[#546569]">
                  Получите прозрачную аналитику и измеримый результат
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abadan Tests Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="text-4xl sm:text-5xl font-extrabold">
                  <span className="text-[#2D3A3C]">Abadan</span>
                  <span className="text-[#F0BB1E]"> Tests</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3A3C] mb-4">
                Платформа диагностики и самопознания
              </h2>
              <p className="text-lg text-[#546569] max-w-2xl mx-auto">
                Онлайн-тесты для определения карьерного и бизнес-профиля.
                Узнайте свои сильные стороны и найдите подходящее направление развития.
              </p>
            </div>

            {/* Tests Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* B-Type Test */}
              <div className="bg-white rounded-2xl p-8 border border-[#F0BB1E]/20 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Б-Тип тест</h3>
                <p className="text-[#546569] mb-4">Для предпринимателей</p>
                <ul className="space-y-2 text-[#546569] text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Определяет стиль предпринимательства
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Помогает найти бизнес-нишу
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F0BB1E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Предлагает стратегию развития
                  </li>
                </ul>
                <div className="flex items-center gap-4 text-sm text-[#7A8B8E]">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ~15 минут
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    54 вопроса
                  </span>
                </div>
              </div>

              {/* Career Test */}
              <div className="bg-white rounded-2xl p-8 border border-[#00767D]/20 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Карьерный тест</h3>
                <p className="text-[#546569] mb-4">Для специалистов и соискателей</p>
                <ul className="space-y-2 text-[#546569] text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Выявляет профиль сильных сторон
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Рекомендует подходящие профессии
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Предлагает направления квалификации
                  </li>
                </ul>
                <div className="flex items-center gap-4 text-sm text-[#7A8B8E]">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ~15 минут
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    54 вопроса
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 border border-[#00767D]/10 mb-12">
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-6 text-center">Особенности платформы</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#2D3A3C]">9 типов профилей</p>
                  <p className="text-xs text-[#546569]">Детальная классификация</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#F0BB1E]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#2D3A3C]">Научная основа</p>
                  <p className="text-xs text-[#546569]">50K+ протестированных</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#2D3A3C]">Бесплатно</p>
                  <p className="text-xs text-[#546569]">Базовый отчёт</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#F0BB1E]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#2D3A3C]">Персональный отчёт</p>
                  <p className="text-xs text-[#546569]">Рекомендации развития</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://test.abadan.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold rounded-xl hover:shadow-lg hover:shadow-[#F0BB1E]/20 transition-all"
              >
                Пройти тест бесплатно
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#00767D] to-[#006D77]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Готовы попробовать наши продукты?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Выберите инструмент для развития вашей команды или себя
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://ibirai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#F0BB1E] text-[#2D3A3C] font-bold rounded-xl hover:shadow-lg transition-all text-center"
              >
                Демо ibirAi
              </a>
              <a
                href="https://test.abadan.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#00767D] transition-all text-center"
              >
                Пройти тест
              </a>
              <Link
                href="/#contact"
                className="px-8 py-4 border-2 border-white/50 text-white/90 font-bold rounded-xl hover:bg-white hover:text-[#00767D] transition-all text-center"
              >
                Связаться
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
