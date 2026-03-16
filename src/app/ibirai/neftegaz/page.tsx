"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const useCases = [
  {
    title: "HSE обучение",
    desc: "Ежедневные микро-инструктажи по охране труда. Отслеживание прохождения для аудиторских проверок. Уведомления о новых регламентах HSE.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Промышленная безопасность",
    desc: "Симуляции аварийных ситуаций, отработка процедур эвакуации, знание регламентов ОПО. Документация для надзорных органов.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Техническое обучение",
    desc: "Изучение оборудования, технологических процессов, регламентов технического обслуживания. AI-тесты по специализации каждого сотрудника.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Сертификация H2S",
    desc: "Подготовка к аттестации по сероводородной безопасности: теория, тесты, симуляции экстренных ситуаций. Трекинг сроков переаттестации.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Знание регламентов",
    desc: "Регулярные проверки знания внутренних регламентов, стандартов и инструкций. Автоматические напоминания при обновлении документов.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Адаптация новичков",
    desc: "Структурированный онбординг для новых сотрудников на объектах: правила безопасности, процедуры, корпоративные стандарты. Результат за 2 недели вместо 2 месяцев.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "Подходит ли ibirAi для обучения вахтового персонала?",
    a: "Да. ibirAi разработан с учётом специфики вахтового режима: уроки доступны в любое время суток, поддерживается офлайн-режим для территорий со слабым сигналом, а расписание адаптируется под сменный график — утренние или вечерние смены.",
  },
  {
    q: "Как ibirAi помогает с HSE-обучением?",
    a: "Платформа поддерживает регулярные инструктажи по безопасности, тесты знаний регламентов и процедур, симуляции аварийных ситуаций. Все данные о прохождении фиксируются и доступны для аудиторских проверок надзорными органами.",
  },
  {
    q: "Можно ли использовать ibirAi для подготовки к сертификации H2S?",
    a: "Да. ibirAi включает модули подготовки к сертификации H2S: теоретическую базу, интерактивные проверочные тесты и симуляции экстренных процедур. Трекинг прогресса помогает HR видеть готовность каждого сотрудника к аттестации.",
  },
  {
    q: "Как быстро можно запустить ibirAi в нефтегазовой компании?",
    a: "Запуск занимает 2–3 недели. Мы конвертируем существующие материалы (PDF, презентации, видео) в формат микроуроков и настраиваем платформу под вашу структуру. Первый пилот — онбординг или HSE-инструктаж — запускается в течение 5 рабочих дней.",
  },
  {
    q: "Работает ли ibirAi без интернета на удалённых объектах?",
    a: "Да. Веб-версия ibirAi поддерживает PWA-кеширование: контент загружается заранее и доступен без интернета. Telegram также хранит последние сообщения офлайн. Данные синхронизируются при восстановлении соединения.",
  },
];

export default function IbiraiNeftegazPage() {
  return (
    <>
      <Header />

      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — Dark gradient with oil & gas atmosphere
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#00767D]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#00767D 1px, transparent 1px), linear-gradient(90deg, #00767D 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10 scroll-fade-in">
              <a href="/" className="hover:text-white/70 transition-colors">Главная</a>
              <span>/</span>
              <a href="/ibirai" className="hover:text-white/70 transition-colors">ibirAi</a>
              <span>/</span>
              <span className="text-white/60">Нефтегаз</span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#009BA3] font-600 mb-8 scroll-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse" />
                ibirAi · Нефтегазовая отрасль
              </div>

              <h1 className="text-4xl md:text-6xl font-800 text-white mb-6 leading-tight scroll-fade-in scroll-delay-1">
                ibirAi для<br className="hidden md:block" />
                <span className="text-gradient-mixed">нефтегазовой отрасли</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed scroll-fade-in scroll-delay-2">
                AI-микрообучение для нефтяников, вахтовиков и специалистов ОПО. HSE, промышленная безопасность, сертификация — в мессенджере, офлайн и в сменном режиме.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-14 scroll-fade-in scroll-delay-3">
                <a href="/ibirai" className="gold-button inline-block text-center">
                  Запросить демо для нефтегаза
                </a>
                <a
                  href="/treningi/neftegaz"
                  className="inline-flex items-center justify-center gap-2 px-8 py-[18px] rounded-lg border border-white/20 text-white font-600 text-[0.95rem] transition-all hover:bg-white/5 hover:border-white/40"
                >
                  Смотреть курсы для нефтегаза
                </a>
              </div>

              {/* Stats */}
              <div className="scroll-fade-in scroll-delay-4 grid grid-cols-3 gap-4 max-w-2xl">
                {[
                  { value: "65+", label: "курсов для нефтегаза", sub: "в каталоге Abadan" },
                  { value: "87%", label: "доходимость", sub: "vs 18% у LMS" },
                  { value: "2 нед", label: "онбординг", sub: "вместо 2 месяцев" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-2xl font-800 text-[#F0BB1E] mb-1">{s.value}</div>
                    <div className="text-white text-xs font-700 mb-0.5">{s.label}</div>
                    <div className="text-white/30 text-xs">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — Industry Challenges (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Специфика отрасли</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                Почему обучение в нефтегазе — это сложно
              </h2>
              <p className="text-[#546569] text-lg max-w-2xl mx-auto">
                Стандартные LMS не спроектированы под реалии нефтегазовых компаний. ibirAi создавался с учётом этих ограничений.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenges */}
              <div className="scroll-fade-in-left space-y-4">
                <h3 className="text-lg font-700 text-[#2D3A3C] mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400"><IconX /></span>
                  Типичные проблемы
                </h3>
                {[
                  {
                    title: "Удалённые объекты и слабый интернет",
                    desc: "Месторождения, буровые, вахтовые посёлки — зоны нестабильного соединения, где LMS просто не работает.",
                  },
                  {
                    title: "Сменный и вахтовый режим",
                    desc: "Расписание тренингов не совпадает со сменами. 28/28, ночные смены — сотрудники физически не могут участвовать в стандартных обучениях.",
                  },
                  {
                    title: "Обязательные требования регуляторов",
                    desc: "HSE, сертификация H2S, аттестация по промышленной безопасности — всё нужно документировать и регулярно повторять.",
                  },
                  {
                    title: "Высокая текучесть вахтового персонала",
                    desc: "Новые сотрудники появляются постоянно. Классический онбординг занимает 2–3 месяца. За это время большинство уже совершают первые нарушения.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className={`scroll-fade-in scroll-delay-${i + 1} flex gap-4 p-5 rounded-xl border border-red-50 bg-red-50/30`}
                  >
                    <span className="mt-0.5 text-red-400 flex-shrink-0">
                      <IconX />
                    </span>
                    <div>
                      <p className="font-700 text-[#2D3A3C] mb-1">{item.title}</p>
                      <p className="text-sm text-[#546569] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Solutions */}
              <div className="scroll-fade-in-right space-y-4">
                <h3 className="text-lg font-700 text-[#2D3A3C] mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#00767D]/10 flex items-center justify-center text-[#00767D]"><IconCheck /></span>
                  Как решает ibirAi
                </h3>
                {[
                  {
                    title: "Офлайн-режим и PWA-кеширование",
                    desc: "Контент загружается заранее. Сотрудник проходит урок без интернета, данные синхронизируются при появлении связи.",
                  },
                  {
                    title: "Адаптация под сменный график",
                    desc: "Уроки приходят в удобное для сотрудника время. Никаких фиксированных расписаний — платформа работает 24/7.",
                  },
                  {
                    title: "Автоматическая документация",
                    desc: "Все прохождения фиксируются с временными метками. HR экспортирует отчёты для Ростехнадзора, аудиторов и внутренних проверок.",
                  },
                  {
                    title: "Онбординг за 2 недели",
                    desc: "Структурированный трек для новичков: от первого дня до допуска к работе. Доходимость 87% vs 18% у классических программ адаптации.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className={`scroll-fade-in scroll-delay-${i + 1} flex gap-4 p-5 rounded-xl border border-[#00767D]/10 bg-[#00767D]/5`}
                  >
                    <span className="mt-0.5 text-[#00767D] flex-shrink-0">
                      <IconCheck />
                    </span>
                    <div>
                      <p className="font-700 text-[#2D3A3C] mb-1">{item.title}</p>
                      <p className="text-sm text-[#546569] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3 — Use Cases Grid (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Применение</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                6 задач обучения в нефтегазе
              </h2>
              <p className="text-[#546569] text-lg max-w-xl mx-auto">
                ibirAi закрывает весь спектр задач корпоративного обучения нефтегазовых компаний.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div
                  key={uc.title}
                  className={`scroll-fade-in scroll-delay-${(i % 3) + 1} premium-card p-7 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mb-5">
                    {uc.icon}
                  </div>
                  <h3 className="text-lg font-700 text-[#2D3A3C] mb-2">{uc.title}</h3>
                  <p className="text-[#546569] text-sm leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4 — Results (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00767D]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/6 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#F0BB1E] uppercase tracking-widest mb-3">Результаты</p>
              <h2 className="text-4xl md:text-5xl font-800 text-white mb-4">
                Цифры из нефтегазовых проектов
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Данные по клиентам ibirAi из нефтегазовой отрасли Казахстана
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {[
                { value: "−60%", label: "стоимость обучения", note: "по сравнению с очными тренингами" },
                { value: "2 нед", label: "онбординг новичков", note: "вместо стандартных 2–3 месяцев" },
                { value: "89%", label: "доходимость HSE", note: "у персонала на объектах" },
                { value: "100%", label: "соответствие документации", note: "для аудиторских проверок" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`scroll-fade-in scroll-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-7 text-center`}
                >
                  <div className="text-4xl font-800 text-[#F0BB1E] mb-2">{m.value}</div>
                  <div className="text-white font-700 mb-1">{m.label}</div>
                  <div className="text-xs text-white/40">{m.note}</div>
                </div>
              ))}
            </div>

            {/* Case Study */}
            <div className="scroll-fade-in grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 text-[#F0BB1E] text-xs font-700 mb-5">
                  Кейс: Нефтесервисная компания
                </div>
                <blockquote className="text-white/70 italic leading-relaxed mb-5">
                  "Запустили HSE-онбординг для 400 новых вахтовиков за 10 дней. Раньше на это уходило 3 месяца очных занятий. Доходимость 91% — такого у нас никогда не было."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00767D]/30 flex items-center justify-center text-[#009BA3] font-700 text-xs">
                    АМ
                  </div>
                  <div>
                    <p className="text-white font-700 text-sm">Асхат Магжанов</p>
                    <p className="text-white/40 text-xs">Директор по персоналу, нефтесервис</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#009BA3]/10 border border-[#009BA3]/20 text-[#009BA3] text-xs font-700 mb-5">
                  Кейс: Добывающая компания
                </div>
                <blockquote className="text-white/70 italic leading-relaxed mb-5">
                  "Нарушения HSE снизились на 38% за первые 6 месяцев после внедрения ежедневных микро-инструктажей через ibirAi. Регуляторы отметили улучшение качества документации."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F0BB1E]/20 flex items-center justify-center text-[#F0BB1E] font-700 text-xs">
                    НК
                  </div>
                  <div>
                    <p className="text-white font-700 text-sm">Назгуль Кенжебаева</p>
                    <p className="text-white/40 text-xs">HSE Manager, добывающая компания</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5 — Abadan Partnership (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="scroll-fade-in premium-card p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 text-[#EBB417] text-sm font-700 mb-6">
                    Синергия ibirAi + Abadan & Co.
                  </div>
                  <h2 className="text-3xl md:text-4xl font-800 text-[#2D3A3C] mb-6 leading-tight">
                    65+ курсов для нефтегаза — теперь в мессенджерах
                  </h2>
                  <p className="text-[#546569] leading-relaxed mb-6">
                    Abadan & Co. — один из ведущих провайдеров обучения нефтегазовой отрасли в Казахстане с 15-летним опытом. Более 65 специализированных курсов для нефтяников теперь доступны в формате ibirAi-микроуроков.
                  </p>
                  <p className="text-[#546569] leading-relaxed">
                    Экспертиза Abadan в нефтегазовом обучении + технология ibirAi = максимально эффективная программа развития персонала на объектах.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Бурение и нефтедобыча",
                    "Промышленная безопасность на ОПО",
                    "Переработка нефти и газа",
                    "Охрана труда и HSE",
                    "Транспорт углеводородов",
                    "Экологическая безопасность",
                    "Сертификация H2S / BOSIET",
                    "Управление персоналом в нефтегазе",
                  ].map((course, i) => (
                    <div
                      key={course}
                      className={`scroll-fade-in scroll-delay-${(i % 4) + 1} flex items-center gap-3 py-3 border-b border-[#f0f4f4] last:border-0`}
                    >
                      <span className="text-[#00767D] flex-shrink-0">
                        <IconCheck />
                      </span>
                      <span className="text-[#2D3A3C] font-600">{course}</span>
                    </div>
                  ))}

                  <a
                    href="/treningi/neftegaz"
                    className="mt-4 inline-flex items-center gap-2 text-[#00767D] font-700 text-sm hover:gap-3 transition-all"
                  >
                    Смотреть все курсы для нефтегаза
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6 — FAQ (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
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
            SECTION 7 — CTA (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#F0BB1E]/6 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="scroll-fade-in">
              <p className="text-sm font-700 text-[#F0BB1E] uppercase tracking-widest mb-4">Начните сегодня</p>
              <h2 className="text-4xl md:text-5xl font-800 text-white mb-6 leading-tight">
                Запустите ibirAi<br className="hidden md:block" /> на вашем объекте
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Начните с пилота — HSE-онбординг для нового персонала или инструктаж для вахты. За 2 недели покажем измеримый результат.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a href="/ibirai" className="gold-button inline-block text-center">
                  Запросить демо для нефтегаза
                </a>
                <a
                  href="/treningi/neftegaz"
                  className="inline-flex items-center justify-center gap-2 px-8 py-[18px] rounded-lg border border-white/20 text-white font-600 text-[0.95rem] transition-all hover:bg-white/5 hover:border-white/40"
                >
                  Каталог курсов нефтегаза
                </a>
              </div>

              <div className="flex items-center justify-center gap-6 flex-wrap">
                {[
                  "Офлайн-режим",
                  "Сменный график",
                  "Документация для регуляторов",
                  "Запуск за 2–3 недели",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="text-[#F0BB1E] flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
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
