"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── ROI Calculator helper ───────────────────────────────────────────────────
function calcROI(employees: number, budget: number, currentCompletion: number) {
  const savings = Math.round(budget * 0.35);
  // Потолок — 80%: канонический показатель «дошли до финала» из кейса Santo.
  const newCompletion = Math.min(80, Math.round(currentCompletion * 3.5));
  const roi = budget > 0 ? Math.round(((savings * 12) / (budget * 0.65)) * 100) : 0;
  return { savings, newCompletion, roi };
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const IconX = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function IbiraiPage() {
  // ── ROI Calculator state ──
  const [employees, setEmployees] = useState(200);
  const [budget, setBudget] = useState(5000000);
  const [completion, setCompletion] = useState(25);
  const [roiRequested, setRoiRequested] = useState(false);

  const { savings, newCompletion, roi } = calcROI(employees, budget, completion);

  const handleRoiRequest = async () => {
    setRoiRequested(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "ROI-запрос с ibirAi",
          phone: "—",
          message: `[ibirAi ROI-калькулятор]\nСотрудников: ${employees}\nБюджет на обучение: ${budget.toLocaleString("ru")} ₸\nТекущая доходимость: ${completion}%\nОжидаемая экономия: ${savings.toLocaleString("ru")} ₸/мес\nROI за 12 мес: ${roi}%`,
        }),
      });
    } catch {
      // silently ignore
    }
  };

  // ── Comparison table data ──
  const comparisonRows = [
    { param: "Доходят до финала", lms: "не измеряется", ibirai: "80%+ (кейс Santo)" },
    { param: "Время на урок", lms: "45–90 мин", ibirai: "3–10 мин" },
    { param: "Установка приложений", lms: "Требуется", ibirai: "Не нужна" },
    { param: "Запуск", lms: "2–6 месяцев", ibirai: "2–3 недели" },
    { param: "Вовлечённость", lms: "Низкая", ibirai: "Высокая (геймификация)" },
    { param: "AI-персонализация", lms: "Нет", ibirai: "Да" },
  ];

  // ── Pricing tiers ──
  const tiers = [
    {
      name: "Старт",
      sub: "до 100 сотрудников",
      features: [
        "До 5 курсов одновременно",
        "Telegram-бот",
        "Базовая аналитика",
        "Готовые шаблоны уроков",
        "Email-поддержка",
      ],
      cta: "Попробовать",
      highlight: false,
    },
    {
      name: "Бизнес",
      sub: "до 500 сотрудников",
      features: [
        "Неограниченные курсы",
        "Уроки в Telegram, напоминания в WhatsApp",
        "Расширенная HR-аналитика",
        "AI-генерация контента",
        "Геймификация и бейджи",
        "Проверка ответа голосом с AI-оценкой",
        "Приоритетная поддержка",
      ],
      cta: "Выбрать тариф",
      highlight: true,
    },
    {
      name: "Энтерпрайз",
      sub: "500+ сотрудников",
      features: [
        "Всё из тарифа Бизнес",
        "Выделенный менеджер",
        "SLA 99.9%",
        "Кастомный AI-аватар",
        "On-premise по запросу — для госкомпаний и квазигоса",
        "Итоговый отчёт по программе для руководства",
        "Обучение команды HR",
      ],
      cta: "Связаться",
      highlight: false,
    },
  ];

  // ── FAQ items ──
  const faqs = [
    {
      q: "Что такое ibirAi?",
      a: "ibirAi — самостоятельная казахстанская платформа обучения, которая доставляет короткие уроки в Telegram. Вместо традиционных LMS сотрудник учится там, где уже проводит время — в мессенджере, без установки отдельного приложения. Abadan & Co. использует ibirAi в своих корпоративных программах.",
    },
    {
      q: "Чем ibirAi отличается от традиционной LMS?",
      a: "Не нужна установка приложений, обучение идёт в привычных мессенджерах, короткие уроки не отрывают от работы. Главное отличие — усвоение проверяется, а не фиксируется факт открытия урока: компания видит поимённо, кто готов, а кто в зоне риска. AI адаптирует темп и сложность под каждого сотрудника.",
    },
    {
      q: "Как быстро можно запустить ibirAi?",
      a: "Запуск занимает 2–3 недели от первого контакта. Мы помогаем с переносом контента и настройкой платформы под вашу компанию. Для тарифа Старт первый курс можно запустить уже через 5 рабочих дней.",
    },
    {
      q: "Какие мессенджеры поддерживает ibirAi?",
      a: "Урок открывается в Telegram — в мини-приложении, скачивать ничего не нужно. Напоминание о занятии дублируется в WhatsApp и ведёт обратно в Telegram. Для HR есть веб-дашборд с результатами по каждому сотруднику.",
    },
    {
      q: "Сколько стоит ibirAi?",
      a: "Стоимость зависит от количества пользователей и набора функций. Мы предлагаем бесплатную демо-версию и гибкие тарифы для компаний от 50 сотрудников. Свяжитесь с нами для расчёта стоимости под ваш масштаб.",
    },
  ];

  return (
    <>
      <Header />

      <main>

        {/* ═══════════════════════════════════════════════════════
            SECTION 1 — HERO (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-32 pb-24 relative">
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00767D]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#009BA3] font-600 mb-8 scroll-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse" />
              Обучение в мессенджерах с проверкой усвоения
            </div>

            {/* Logo / Brand mark */}
            <div className="text-7xl md:text-8xl font-800 tracking-tight mb-6 scroll-fade-in scroll-delay-1">
              <span className="text-[#00767D]">ibir</span><span className="text-[#F0BB1E]">Ai</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-800 text-white mb-6 leading-tight scroll-fade-in scroll-delay-2">
              Обучение, которое доходит до каждого<br className="hidden md:block" />
              <span className="text-gradient-mixed"> прямо в мессенджере</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed scroll-fade-in scroll-delay-3">
              Короткие уроки в Telegram с проверкой усвоения — напоминание придёт и в WhatsApp. Сотрудник учится там, где уже проводит время, а вы видите поимённо, кто прошёл и что запомнил.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 scroll-fade-in scroll-delay-4">
              <a href="#roi-calc" className="gold-button inline-block text-center">
                Запросить демо
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-[18px] rounded-lg border border-white/20 text-white font-600 text-[0.95rem] transition-all hover:bg-white/5 hover:border-white/40"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Смотреть как работает
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto scroll-fade-in scroll-delay-5">
              {[
                { value: "80%+", label: "дошли до финала" },
                { value: "3–10 мин", label: "на урок" },
                { value: "2–3 нед", label: "до запуска" },
              ].map((s) => (
                <div key={s.value} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
                  <div className="text-3xl font-800 text-[#F0BB1E] mb-1">{s.value}</div>
                  <div className="text-sm text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — Problem → Solution (White bg)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Почему это важно</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Проблема и решение</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem card */}
              <div className="scroll-fade-in-left bg-white border border-red-100 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-700 text-[#2D3A3C]">Проблема</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "70% сотрудников не завершают онлайн-курсы",
                    "Нет времени на длинные обучающие программы",
                    "Невозможно измерить реальный ROI обучения",
                    "LMS скучна — никто не заходит добровольно",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#546569]">
                      <span className="mt-0.5 text-red-400 flex-shrink-0">
                        <IconX />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution card */}
              <div className="scroll-fade-in-right bg-gradient-to-br from-[#1a2e30] to-[#0d2628] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00767D]/15 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00767D]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#009BA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-700 text-white">Решение ibirAi</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Обучение приходит в мессенджер, где сотрудник уже есть",
                      "Короткие уроки встраиваются в рабочий день",
                      "Проверка усвоения и поимённая аналитика по каждому",
                      "Геймификация и AI делают обучение вовлекающим",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/80">
                        <span className="mt-0.5 text-[#F0BB1E] flex-shrink-0">
                          <IconCheck />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3 — How It Works (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="bg-[#F8FAFA] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Процесс</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Как работает ibirAi</h2>
              <p className="mt-4 text-[#546569] text-lg max-w-xl mx-auto">
                От ваших материалов до обученных сотрудников — за 2–3 недели
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Загружаем контент",
                  desc: "Передаём существующие материалы или создаём новый контент с помощью AI. Адаптируем под формат 10-минутных уроков.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  ),
                },
                {
                  num: "02",
                  title: "Запускаем в мессенджерах",
                  desc: "Ежедневные 10-минутные уроки приходят в Telegram, напоминание дублируется в WhatsApp. AI-аватар адаптирует темп под каждого.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  num: "03",
                  title: "Отслеживаем результаты",
                  desc: "HR-дашборд с real-time аналитикой: доходимость, прогресс, вовлечённость по каждому сотруднику и отделу.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((step, i) => (
                <div key={step.num} className={`scroll-fade-in scroll-delay-${i + 1} premium-card p-8`}>
                  <div className="flex items-start gap-5 mb-5">
                    <div className="icon-box icon-box-teal flex-shrink-0">
                      {step.icon}
                    </div>
                    <span className="text-5xl font-800 text-[#00767D]/10 leading-none">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-700 text-[#2D3A3C] mb-3">{step.title}</h3>
                  <p className="text-[#546569] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4 — Key Metrics (White bg)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Результаты</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Результаты флагманской программы</h2>
              <p className="mt-4 text-[#546569] max-w-2xl mx-auto">
                «Лидер открытого диалога» для Polpharma Santo: 117 руководителей, 3 страны,
                12 недель. Данные — итоговый отчёт декабря 2025 года.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "80%+", label: "дошли до финала", note: "программа для руководителей, 2025", color: "teal" },
                { value: "95,8%", label: "вовлечённость на старте", note: "117 руководителей", color: "gold" },
                { value: "100%", label: "применили на работе", note: "по итогам программы", color: "teal" },
                { value: "8,38", label: "оценка наставника", note: "из 10 баллов", color: "gold" },
              ].map((m, i) => (
                <div key={m.label} className={`scroll-fade-in scroll-delay-${i + 1} premium-card p-8 text-center`}>
                  <div
                    className={`text-5xl font-800 mb-2 ${
                      m.color === "teal" ? "text-gradient-primary" : "text-gradient-gold"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="text-[#2D3A3C] font-700 mb-1">{m.label}</div>
                  <div className="text-sm text-[#7A8B8E]">{m.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5 — LMS Comparison Table (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Сравнение</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">
                ibirAi vs Традиционная LMS
              </h2>
            </div>

            <div className="scroll-fade-in overflow-hidden rounded-2xl border border-[#e8eded] bg-white shadow-sm">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-[#F8FAFA] border-b border-[#e8eded]">
                <div className="px-6 py-4 text-sm font-700 text-[#546569]">Параметр</div>
                <div className="px-6 py-4 text-sm font-700 text-[#7A8B8E] text-center border-l border-[#e8eded]">Традиционная LMS</div>
                <div className="px-6 py-4 text-sm font-700 text-[#00767D] text-center border-l border-[#e8eded]">
                  <span className="text-[#00767D]">ibir</span><span className="text-[#F0BB1E]">Ai</span>
                </div>
              </div>

              {comparisonRows.map((row, i) => (
                <div
                  key={row.param}
                  className={`grid grid-cols-3 border-b border-[#f0f4f4] last:border-0 transition-colors hover:bg-[#F8FAFA] ${
                    i % 2 === 0 ? "" : "bg-[#FAFCFC]"
                  }`}
                >
                  <div className="px-6 py-4 text-[#2D3A3C] font-600 text-sm">{row.param}</div>
                  <div className="px-6 py-4 text-center border-l border-[#f0f4f4]">
                    <span className="inline-flex items-center gap-2 text-[#7A8B8E] text-sm">
                      <span className="text-red-300"><IconX /></span>
                      {row.lms}
                    </span>
                  </div>
                  <div className="px-6 py-4 text-center border-l border-[#f0f4f4]">
                    <span className="inline-flex items-center gap-2 text-[#00767D] font-600 text-sm">
                      <span className="text-[#00767D]"><IconCheck /></span>
                      {row.ibirai}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6 — Case Study (White bg)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Кейс</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Реальные результаты</h2>
            </div>

            <div className="scroll-fade-in premium-card p-0 overflow-hidden max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2">
                {/* Left: company info + quote */}
                <div className="p-10 bg-gradient-to-br from-[#1a2e30] to-[#0d2628] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#00767D]/20 rounded-full blur-[80px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-white/60 mb-6">
                      Фармацевтика
                    </div>
                    <h3 className="text-2xl font-800 text-white mb-2">117 руководителей</h3>
                    <p className="text-white/50 text-sm mb-8">Polpharma Santo · 3 страны · 12 недель · отчёт декабря 2025</p>

                    <blockquote className="border-l-2 border-[#F0BB1E] pl-5">
                      <p className="text-white/80 italic leading-relaxed mb-4">
                        "Впервые у нас такая высокая дисциплина в обучении. Сотрудники стабильно проходят уроки, и мы видим реальные изменения в поведении."
                      </p>
                      <footer className="text-sm">
                        <span className="text-[#F0BB1E] font-700">L&amp;D-менеджер</span>
                        <span className="text-white/40">, Polpharma Santo</span>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Right: before/after metrics */}
                <div className="p-10 bg-white">
                  <h4 className="text-sm font-700 text-[#546569] uppercase tracking-widest mb-8">До и после ibirAi</h4>
                  <div className="space-y-7">
                    {[
                      { label: "Дошли до финала", before: "не измеряется", after: "80%+", good: true },
                      { label: "Применили на работе", before: "не измерялось", after: "100%", good: true },
                      { label: "Изменения в поведении", before: "не измерялось", after: "60%+", good: true },
                    ].map((m) => (
                      <div key={m.label}>
                        <p className="text-xs font-600 text-[#7A8B8E] uppercase tracking-wider mb-2">{m.label}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-[#F8FAFA] rounded-lg px-4 py-3 text-center">
                            <span className="text-lg font-800 text-[#7A8B8E]">{m.before}</span>
                            <div className="text-xs text-[#7A8B8E] mt-0.5">до</div>
                          </div>
                          <svg className="w-5 h-5 text-[#F0BB1E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <div className="flex-1 bg-gradient-to-br from-[#00767D]/10 to-[#009BA3]/5 border border-[#00767D]/15 rounded-lg px-4 py-3 text-center">
                            <span className="text-lg font-800 text-[#00767D]">{m.after}</span>
                            <div className="text-xs text-[#00767D]/60 mt-0.5">после</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7 — ROI Calculator (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section id="roi-calc" className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-24 relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#00767D]/8 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/6 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#F0BB1E] uppercase tracking-widest mb-3">ROI-калькулятор</p>
              <h2 className="text-4xl md:text-5xl font-800 text-white">Рассчитайте ROI от ibirAi</h2>
              <p className="mt-4 text-white/50 max-w-lg mx-auto">
                Введите данные вашей компании — получите прогноз экономии и роста доходимости
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Inputs */}
              <div className="scroll-fade-in-left space-y-8">
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-white/70 text-sm font-600">Количество сотрудников</label>
                    <span className="text-[#F0BB1E] font-700">{employees.toLocaleString("ru")}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={5000}
                    step={50}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer rounded-full bg-white/10 accent-[#F0BB1E]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>50</span>
                    <span>5 000</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-white/70 text-sm font-600">Бюджет на обучение в год (₸)</label>
                    <span className="text-[#F0BB1E] font-700">{budget.toLocaleString("ru")} ₸</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={50000000}
                    step={500000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer rounded-full bg-white/10 accent-[#F0BB1E]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>500 000 ₸</span>
                    <span>50 000 000 ₸</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-white/70 text-sm font-600">Текущая доходимость курсов</label>
                    <span className="text-[#F0BB1E] font-700">{completion}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={1}
                    value={completion}
                    onChange={(e) => setCompletion(Number(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer rounded-full bg-white/10 accent-[#F0BB1E]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>5%</span>
                    <span>80%</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="scroll-fade-in-right bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-700 text-white/80 mb-6">Прогноз для вашей компании</h3>

                <div className="space-y-5 mb-8">
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <div>
                      <div className="text-white/60 text-sm mb-0.5">Ожидаемая экономия</div>
                      <div className="text-xs text-white/30">в месяц при переходе на ibirAi</div>
                    </div>
                    <div className="text-2xl font-800 text-[#F0BB1E]">
                      {savings.toLocaleString("ru")} ₸
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <div>
                      <div className="text-white/60 text-sm mb-0.5">Рост доходимости</div>
                      <div className="text-xs text-white/30">с {completion}% до</div>
                    </div>
                    <div className="text-2xl font-800 text-[#009BA3]">
                      {newCompletion}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <div className="text-white/60 text-sm mb-0.5">ROI за 12 месяцев</div>
                      <div className="text-xs text-white/30">возврат инвестиций</div>
                    </div>
                    <div className="text-3xl font-800 text-gradient-gold">
                      {roi > 0 ? `${roi}%` : "—"}
                    </div>
                  </div>
                </div>

                {!roiRequested ? (
                  <button
                    onClick={handleRoiRequest}
                    className="gold-button w-full text-center"
                  >
                    Получить детальный расчёт
                  </button>
                ) : (
                  <div className="w-full py-4 text-center bg-white/5 border border-[#00767D]/30 rounded-lg text-[#009BA3] font-600 text-sm">
                    Запрос отправлен — свяжемся в течение 2 часов
                  </div>
                )}

                <p className="text-xs text-white/30 text-center mt-3">
                  Расчёт приблизительный. Точные цифры — после аудита вашего обучения.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 8 — Integrations + Pricing (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-6xl mx-auto px-6">

            {/* Integrations */}
            <div className="text-center mb-12 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Каналы</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">Работает там, где сотрудник уже есть</h2>
              <p className="text-[#546569] max-w-xl mx-auto">
                Урок — в Telegram, напоминание — в WhatsApp, результаты — в веб-дашборде для HR. Сотруднику устанавливать нечего.
              </p>
            </div>

            <div className="scroll-fade-in flex flex-wrap items-center justify-center gap-4 mb-20">
              {[
                { name: "Telegram — урок", bg: "bg-[#2CA5E0]/10", text: "text-[#2CA5E0]" },
                { name: "WhatsApp — напоминание", bg: "bg-[#25D366]/10", text: "text-[#25D366]" },
                { name: "Веб — дашборд для HR", bg: "bg-[#00767D]/10", text: "text-[#00767D]" },
              ].map((int) => (
                <div
                  key={int.name}
                  className={`${int.bg} ${int.text} px-8 py-4 rounded-2xl font-700 text-lg border border-current/10 transition-all hover:scale-105`}
                >
                  {int.name}
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="text-center mb-12 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Тарифы</p>
              <h2 className="text-4xl font-800 text-[#2D3A3C]">Выберите подходящий план</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`scroll-fade-in scroll-delay-${i + 1} flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-1 ${
                    tier.highlight
                      ? "bg-gradient-to-br from-[#1a2e30] to-[#0d2628] shadow-xl ring-1 ring-[#00767D]/30"
                      : "bg-white border border-[#e8eded] shadow-sm"
                  }`}
                >
                  {tier.highlight && (
                    <div className="bg-[#F0BB1E] text-[#2D3A3C] text-xs font-800 text-center py-2 tracking-widest uppercase">
                      Популярный выбор
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className={`text-2xl font-800 mb-1 ${tier.highlight ? "text-white" : "text-[#2D3A3C]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm mb-6 ${tier.highlight ? "text-white/50" : "text-[#7A8B8E]"}`}>{tier.sub}</p>

                    <ul className="space-y-3 flex-1 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className={`flex items-start gap-3 text-sm ${tier.highlight ? "text-white/80" : "text-[#546569]"}`}>
                          <span className={tier.highlight ? "text-[#F0BB1E]" : "text-[#00767D]"}>
                            <IconCheck />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: `Тариф ibirAi: ${tier.name}`,
                            phone: "—",
                            message: `[ibirAi] Интерес к тарифу: ${tier.name} (${tier.sub})`,
                          }),
                        }).catch(() => {});
                      }}
                      className={`w-full text-center ${tier.highlight ? "gold-button" : "dark-button-outline"}`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 9 — FAQ (White bg)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Вопросы и ответы</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Часто задаваемые вопросы</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className={`scroll-fade-in scroll-delay-${i + 1} group premium-card overflow-hidden`}
                >
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none select-none">
                    <span className="font-700 text-[#2D3A3C] group-open:text-[#00767D] transition-colors text-[0.97rem]">
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#e8eded] flex items-center justify-center text-[#7A8B8E] group-open:bg-[#00767D] group-open:border-[#00767D] group-open:text-white transition-all">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-7 pb-6 pt-1 text-[#546569] leading-relaxed border-t border-[#f5f7f7]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center scroll-fade-in">
              <p className="text-[#546569] mb-6">Остались вопросы? Запросите персональную демонстрацию.</p>
              <a href="#roi-calc" className="gold-button inline-block">
                Запросить демо ibirAi
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
