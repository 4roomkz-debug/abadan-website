"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IconCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const faqs = [
  {
    q: "Почему обучение в мессенджерах эффективнее LMS?",
    a: "Сотрудник не заходит в отдельное приложение — урок приходит туда, где он уже находится. Это снимает главный барьер корпоративного обучения — «вспомнить, зайти и открыть».",
  },
  {
    q: "Нужно ли сотрудникам устанавливать дополнительные приложения?",
    a: "Нет. ibirAi работает через Telegram или WhatsApp — оба мессенджера уже установлены у большинства сотрудников. Достаточно подписаться на бот, и обучение начинается. Никаких логинов, паролей и новых интерфейсов.",
  },
  {
    q: "Как обеспечивается безопасность корпоративного контента в мессенджерах?",
    a: "Весь контент передаётся через зашифрованные API мессенджеров. Корпоративные материалы хранятся на защищённых серверах ibirAi с шифрованием at rest. Для Энтерпрайз-сегмента доступно развёртывание в частном облаке.",
  },
  {
    q: "Можно ли отслеживать обучение сотрудников через мессенджеры?",
    a: "Да. HR-аналитика в реальном времени: кто открыл урок, кто завершил, результаты тестов, время прохождения. Данные доступны в веб-дашборде с фильтрацией по отделам, должностям и периодам.",
  },
  {
    q: "Работает ли ibirAi там, где нет интернета?",
    a: "Telegram поддерживает офлайн-режим для уже загруженного контента. Для отраслей с нестабильным соединением (нефтегаз, строительство, горнодобыча) доступна веб-версия с оффлайн-кешированием через PWA — данные синхронизируются при восстановлении соединения.",
  },
];

const platforms = [
  {
    name: "Telegram",
    color: "from-[#2CA5E0] to-[#1A8ECC]",
    textColor: "text-[#2CA5E0]",
    borderColor: "border-[#2CA5E0]/20",
    bgColor: "bg-[#2CA5E0]/5",
    features: [
      "Боты с интерактивными кнопками",
      "Офлайн-режим для загруженного контента",
      "Группы и каналы для командного обучения",
      "Мини-приложения (WebApp) внутри чата",
      "Поддержка файлов, видео, аудио",
    ],
    badge: "Рекомендовано",
  },
  {
    name: "WhatsApp",
    color: "from-[#25D366] to-[#1DA852]",
    textColor: "text-[#25D366]",
    borderColor: "border-[#25D366]/20",
    bgColor: "bg-[#25D366]/5",
    features: [
      "Широкий охват (95%+ пользователей в РК)",
      "Интерактивные сообщения с кнопками",
      "Шаблонные уведомления о новых уроках",
      "Групповые чаты для командных заданий",
      "Статусы прочтения для трекинга",
    ],
    badge: "Широкий охват",
  },
  {
    name: "Веб-версия",
    color: "from-[#00767D] to-[#006D77]",
    textColor: "text-[#00767D]",
    borderColor: "border-[#00767D]/20",
    bgColor: "bg-[#00767D]/5",
    features: [
      "Полноценный дашборд для HR",
      "PWA с офлайн-поддержкой",
      "Расширенная аналитика и отчёты",
      "Управление контентом и курсами",
      "Интеграции через API",
    ],
    badge: "Для HR",
  },
];

export default function MessengerPage() {
  return (
    <>
      <Header />

      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — Dark gradient
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2CA5E0]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10 scroll-fade-in">
              <a href="/" className="hover:text-white/70 transition-colors">Главная</a>
              <span>/</span>
              <a href="/ibirai" className="hover:text-white/70 transition-colors">ibirAi</a>
              <span>/</span>
              <span className="text-white/60">Мессенджеры</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#009BA3] font-600 mb-8 scroll-fade-in">
                  <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse" />
                  Telegram · WhatsApp · Web
                </div>

                <h1 className="text-4xl md:text-6xl font-800 text-white mb-6 leading-tight scroll-fade-in scroll-delay-1">
                  Обучение там,<br />
                  <span className="text-gradient-mixed">где ваши сотрудники</span>
                </h1>

                <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed scroll-fade-in scroll-delay-2">
                  ibirAi доставляет уроки прямо в Telegram и WhatsApp. Никаких новых приложений, никаких забытых паролей — обучение там, где люди уже проводят время.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 scroll-fade-in scroll-delay-3">
                  <a href="/ibirai" className="gold-button inline-block text-center">
                    Запросить демо
                  </a>
                  <a
                    href="#platforms"
                    className="inline-flex items-center justify-center gap-2 px-8 py-[18px] rounded-lg border border-white/20 text-white font-600 text-[0.95rem] transition-all hover:bg-white/5 hover:border-white/40"
                  >
                    Сравнить платформы
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="scroll-fade-in-right grid grid-cols-2 gap-4">
                {[
                  { value: "80%+", label: "дошли до финала", sub: "кейс Santo, 117 руководителей" },
                  { value: "~20%", label: "доходят до финала", sub: "у традиционных длинных курсов" },
                  { value: "95%+", label: "охват", sub: "Telegram/WA в Казахстане" },
                  { value: "0", label: "новых приложений", sub: "для сотрудников" },
                ].map((s, i) => (
                  <div
                    key={s.label + s.sub}
                    className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${i === 1 ? "opacity-60" : ""}`}
                  >
                    <div className={`text-3xl font-800 mb-1 ${i === 1 ? "text-white/50" : "text-[#F0BB1E]"}`}>
                      {s.value}
                    </div>
                    <div className={`text-sm font-700 mb-0.5 ${i === 1 ? "text-white/40" : "text-white"}`}>{s.label}</div>
                    <div className="text-xs text-white/30">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — Why Messengers (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Почему это работает</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                Мессенджеры выигрывают у LMS
              </h2>
              <p className="text-[#546569] text-lg max-w-2xl mx-auto">
                Сотрудники не хотят заходить в ещё один корпоративный инструмент. Они хотят учиться там, где уже общаются.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: "4×",
                  title: "Выше открываемость",
                  desc: "Урок не теряется в почте — он приходит в мессенджер, куда заглядывают в течение дня. Не нужно помнить пароль от портала и специально выделять время.",
                  color: "teal",
                },
                {
                  value: "0",
                  title: "Барьеров для входа",
                  desc: "Не нужно устанавливать новое приложение, придумывать пароль или проходить онбординг в системе. Подписка на бот — и обучение начинается.",
                  color: "gold",
                },
                {
                  value: "3 мин",
                  title: "На урок в любом месте",
                  desc: "Сотрудник проходит урок в перерыве, в транспорте, между встречами. Привычный интерфейс мессенджера снижает когнитивную нагрузку.",
                  color: "teal",
                },
              ].map((item, i) => (
                <div key={item.title} className={`scroll-fade-in scroll-delay-${i + 1} premium-card p-8 text-center`}>
                  <div className={`text-5xl font-800 mb-3 ${item.color === "teal" ? "text-gradient-primary" : "text-gradient-gold"}`}>
                    {item.value}
                  </div>
                  <h3 className="text-xl font-700 text-[#2D3A3C] mb-3">{item.title}</h3>
                  <p className="text-[#546569] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3 — Platforms (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section id="platforms" className="bg-[#F8FAFA] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Платформы</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                Поддерживаемые мессенджеры
              </h2>
              <p className="text-[#546569] text-lg max-w-xl mx-auto">
                Выберите удобный канал для вашей аудитории. Все три работают в единой системе аналитики.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, i) => (
                <div
                  key={platform.name}
                  className={`scroll-fade-in scroll-delay-${i + 1} premium-card overflow-hidden`}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${platform.color} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]" />
                    <div className="relative z-10 flex items-center justify-between">
                      <h3 className="text-2xl font-800 text-white">{platform.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-700">
                        {platform.badge}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {platform.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-[#546569]">
                          <span className={`mt-0.5 ${platform.textColor} flex-shrink-0`}>
                            <IconCheck />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4 — How It Works (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Запуск</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                Три шага до старта
              </h2>
              <p className="text-[#546569] text-lg max-w-xl mx-auto">
                От подписания договора до первого урока у сотрудников — за 2–3 недели.
              </p>
            </div>

            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-[#00767D]/30 via-[#F0BB1E]/50 to-[#00767D]/30" />

              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {[
                  {
                    num: "01",
                    title: "Подключение",
                    desc: "Заключаем договор, настраиваем бот для Telegram или WhatsApp под ваш корпоративный стиль. Подключаем домены и интеграции.",
                    time: "1–3 дня",
                    icon: (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    ),
                  },
                  {
                    num: "02",
                    title: "Настройка контента",
                    desc: "Конвертируем ваши материалы в формат микроуроков. AI-генерация помогает быстро создать тесты, симуляции и подсказки из существующих документов.",
                    time: "1–2 недели",
                    icon: (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    num: "03",
                    title: "Запуск",
                    desc: "Приглашаем сотрудников в бот, запускаем первый трек. С первого дня HR видит дашборд с метриками: доходимость, прогресс, результаты тестов.",
                    time: "День X",
                    icon: (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    ),
                  },
                ].map((step, i) => (
                  <div key={step.num} className={`scroll-fade-in scroll-delay-${i + 1}`}>
                    {/* Icon circle */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center shadow-lg flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-3xl font-800 text-[#00767D]/20">{step.num}</span>
                        <div className="text-xs text-[#F0BB1E] font-700 uppercase tracking-wider">{step.time}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-700 text-[#2D3A3C] mb-3">{step.title}</h3>
                    <p className="text-[#546569] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5 — Integrations (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00767D]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#F0BB1E] uppercase tracking-widest mb-3">Интеграции</p>
              <h2 className="text-4xl md:text-5xl font-800 text-white mb-4">
                Работает с вашими системами
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                ibirAi подключается к существующей HR-инфраструктуре через открытый API — без дорогостоящих кастомных разработок.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {[
                {
                  name: "1C:ЗУП",
                  desc: "Синхронизация структуры компании, автоматическое назначение треков по должностям",
                  color: "text-[#F0BB1E]",
                  bg: "bg-[#F0BB1E]/10",
                },
                {
                  name: "Bitrix24",
                  desc: "Интеграция с HR-модулем, трекинг обучения в карточке сотрудника",
                  color: "text-[#00A2E8]",
                  bg: "bg-[#00A2E8]/10",
                },
                {
                  name: "SAP HCM",
                  desc: "Двусторонняя синхронизация данных о сотрудниках и результатах обучения",
                  color: "text-[#0070F2]",
                  bg: "bg-[#0070F2]/10",
                },
                {
                  name: "Любой API",
                  desc: "Открытый REST API для интеграции с любой корпоративной системой",
                  color: "text-[#009BA3]",
                  bg: "bg-[#009BA3]/10",
                },
              ].map((int, i) => (
                <div
                  key={int.name}
                  className={`scroll-fade-in scroll-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all`}
                >
                  <div className={`${int.bg} ${int.color} w-12 h-12 rounded-xl flex items-center justify-center text-sm font-800 mb-4`}>
                    {int.name.slice(0, 2)}
                  </div>
                  <h3 className="text-white font-700 mb-2">{int.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{int.desc}</p>
                </div>
              ))}
            </div>

            <div className="scroll-fade-in text-center">
              <p className="text-white/40 text-sm mb-4">
                Нет нужной интеграции? Мы разработаем коннектор под ваш стек.
              </p>
              <a href="/ibirai" className="gold-button inline-block">
                Обсудить интеграцию
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6 — FAQ (White)
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
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7 — CTA (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="scroll-fade-in premium-card p-12">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-4">Начните сегодня</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-6 leading-tight">
                Запустите обучение<br className="hidden md:block" /> в Telegram за 5 дней
              </h2>
              <p className="text-[#546569] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Мы настроим первый трек, пригласим сотрудников в бот и покажем дашборд с первыми результатами. Без риска — начните с пилота на 20–50 человек.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/ibirai" className="gold-button inline-block text-center">
                  Запустить пилот
                </a>
                <a href="/ibirai" className="dark-button inline-block text-center">
                  Посмотреть ibirAi
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
                {[
                  "Без новых приложений",
                  "Запуск за 2–3 недели",
                  "Бесплатная демо-версия",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#546569]">
                    <span className="text-[#00767D]"><IconCheck /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
