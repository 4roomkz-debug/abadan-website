"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const stats = [
    { value: "10+", label: "лет на рынке", detail: "с 2014 года" },
    { value: "359", label: "компаний-клиентов", detail: "по всему Казахстану" },
    { value: "50K+", label: "выпускников", detail: "обученных специалистов" },
    { value: "200+", label: "экспертов", detail: "под любую задачу" },
  ];

  const pgtBlocks = [
    {
      letter: "P",
      title: "People",
      subtitle: "Люди",
      description: "Фокус на развитии людей. HR-компетенции, soft skills, лидерство, командная работа. Мы верим, что рост компании начинается с роста каждого сотрудника.",
      color: "teal",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      letter: "G",
      title: "Growth",
      subtitle: "Рост",
      description: "Измеримые результаты. KPI, ROI обучения, бизнес-показатели. Мы не просто проводим тренинги — мы добиваемся конкретных изменений в работе команд.",
      color: "gold",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      letter: "T",
      title: "Technology",
      subtitle: "Технологии",
      description: "Гибридный формат обучения. Офлайн тренинги, онлайн курсы, микрообучение в мессенджерах через платформу ibirAi с AI-аватарами.",
      color: "teal",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const hybridFormats = [
    {
      title: "Офлайн тренинги",
      description: "Живое обучение с практикой на реальных кейсах. Максимальное погружение и командная работа.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Онлайн обучение",
      description: "Вебинары и курсы для распределённых команд. Удобство без потери качества.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "ibirAi микрообучение",
      description: "3-минутные уроки в Telegram/WhatsApp с AI-аватаром. 87% доходимость vs 23% у традиционных LMS.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      highlight: true,
    },
  ];

  const advantages = [
    {
      title: "Решение в день обращения",
      desc: "Коммерческое предложение с расчётом ROI — в день запроса. Без бюрократии и долгих согласований.",
      num: "01",
    },
    {
      title: "Экономия до 50%",
      desc: "При рамочном договоре вы получаете существенную экономию на развитии команды.",
      num: "02",
    },
    {
      title: "Обучение от 2 участников",
      desc: "Не нужно собирать большую группу. Каждый участник получает персональную обратную связь.",
      num: "03",
    },
    {
      title: "200+ экспертов под любую задачу",
      desc: "Подберём тренера под вашу отрасль и специфику. Нефть, финансы, IT, HR — у нас есть все.",
      num: "04",
    },
    {
      title: "Документы в день завершения",
      desc: "Все закрывающие документы — в день окончания обучения. Ваша бухгалтерия будет довольна.",
      num: "05",
    },
    {
      title: "Логистика на нас",
      desc: "Организуем проживание и трансфер для участников из регионов — вам не нужно думать об этом.",
      num: "06",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ================================================
          HERO — dark gradient with ambient glows
          ================================================ */}
      <section className="relative min-h-[85vh] flex items-center py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
        {/* Ambient glow blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00767D]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#F0BB1E]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#00767D]/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-white/70 transition-colors">Главная</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/60 font-medium">О компании</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00767D]/40 bg-[#00767D]/15 text-[#009BA3] text-sm font-semibold mb-8 scroll-fade-in scroll-delay-1">
              <span className="w-2 h-2 rounded-full bg-[#009BA3] animate-pulse" />
              People Growth Technology
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 scroll-fade-in scroll-delay-2">
              Развиваем людей.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00767D] to-[#009BA3]">Растим показатели.</span><br />
              Через технологии.
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mb-14 scroll-fade-in scroll-delay-3">
              Abadan & Co. — это не просто тренинговый центр. Это компания нового типа,
              которая объединяет классическое обучение с современными технологиями.
            </p>

            {/* Hero stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 scroll-fade-in scroll-delay-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="relative p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#00767D]/40 hover:bg-[#00767D]/10 transition-all duration-300"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F0BB1E] to-[#F5CA3B] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-semibold text-sm leading-tight">{stat.label}</div>
                  <div className="text-white/35 text-xs mt-1">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          FOUNDER SECTION — light bg, prominent photo + quote
          ================================================ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle decorative teal wash top-right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00767D]/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section label */}
            <div className="flex justify-center mb-12 scroll-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 text-[#D4A017] text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Слово основателя
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
              {/* Photo column */}
              <div className="md:col-span-2 scroll-fade-in-left">
                <div className="relative">
                  {/* Glow halo */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#00767D]/20 to-[#F0BB1E]/15 rounded-3xl blur-2xl" />
                  {/* Photo frame */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl ring-1 ring-white/10">
                    <Image
                      src="/images/founder.jpg"
                      alt="Гани Абадан — основатель Abadan & Co."
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2628]/60 via-transparent to-transparent" />
                    {/* Name badge inside photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white text-xl font-extrabold leading-tight">Гани Абадан</p>
                      <p className="text-[#009BA3] font-semibold text-sm mt-0.5">Основатель и старший партнёр</p>
                    </div>
                  </div>

                  {/* Credential pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["10+ лет опыта", "359 клиентов", "Казахстан"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-[#F8FAFA] border border-[#00767D]/15 text-[#546569] text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Contact links */}
                  <div className="flex flex-col gap-2 mt-4">
                    <a href="tel:+87019188838" className="flex items-center gap-2 text-sm text-[#546569] hover:text-[#00767D] transition-colors font-medium">
                      <svg className="w-4 h-4 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +7 701 918-88-38
                    </a>
                    <a href="mailto:gani@abadan.kz" className="flex items-center gap-2 text-sm text-[#546569] hover:text-[#00767D] transition-colors font-medium">
                      <svg className="w-4 h-4 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      gani@abadan.kz
                    </a>
                  </div>
                </div>
              </div>

              {/* Letter column */}
              <div className="md:col-span-3 scroll-fade-in-right scroll-delay-1">
                {/* Pull quote */}
                <blockquote className="relative pl-6 mb-8 border-l-4 border-[#F0BB1E]">
                  <p className="text-2xl sm:text-3xl font-bold text-[#2D3A3C] leading-snug">
                    «Мы не&nbsp;«проводим тренинги» — мы решаем бизнес-задачи через развитие команд»
                  </p>
                </blockquote>

                <div className="text-[#546569] text-lg leading-relaxed space-y-5">
                  <p className="text-[#2D3A3C] text-xl font-semibold">Уважаемые коллеги,</p>
                  <p>
                    Меня зовут Гани Абадан, я основатель и старший партнер компании Abadan & Company.
                    За более чем 10 лет работы в корпоративном обучении мы прошли путь от небольшого
                    тренингового центра до одной из ведущих компаний в Казахстане по развитию персонала.
                  </p>
                  <p>
                    Я обращаюсь к вам лично, потому что знаю, с какими вызовами вы сталкиваетесь каждый день:
                    поиск квалифицированных тренеров, обоснование бюджетов на обучение перед руководством,
                    измерение реальной отдачи от инвестиций в людей. Я хочу рассказать, почему{" "}
                    <strong className="text-[#2D3A3C]">359 компаний</strong> уже выбрали нас в качестве партнёра.
                  </p>
                  <p>
                    Каждая наша программа — это 80% практики на реальных кейсах
                    вашей компании. Не абстрактные теории, а конкретные навыки, которые сотрудники применяют
                    уже на следующий день.
                  </p>
                  <p>
                    За годы работы мы собрали базу из{" "}
                    <strong className="text-[#2D3A3C]">более 200 экспертов-практиков</strong> в самых разных
                    областях — от нефтегазовой отрасли и промышленной безопасности до HR-менеджмента и
                    искусственного интеллекта.
                  </p>
                  <p>
                    Я лично гарантирую качество каждой программы. Если результат не оправдает ваших
                    ожиданий — мы проведём повторное занятие за наш счёт.
                  </p>

                  {/* Signature */}
                  <div className="pt-2">
                    <p className="text-[#2D3A3C] text-base mb-3">С уважением и теплотой,</p>
                    <div className="mb-2 w-48 h-16 relative">
                      <svg viewBox="0 0 200 80" className="w-full h-full text-[#2D3A3C]/60">
                        <path
                          d="M10 55 Q25 15 45 40 T80 30 Q95 25 110 45 T140 35 Q155 30 170 50 L190 45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M30 60 Q50 55 70 62 T110 58"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-[#2D3A3C]">Гани Абадан</p>
                    <p className="text-[#7A8B8E] text-sm">Abadan & Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          ADVANTAGES — dark card grid
          ================================================ */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00767D]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 scroll-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F0BB1E]/30 bg-[#F0BB1E]/10 text-[#F0BB1E] text-sm font-semibold mb-6">
                Наши преимущества
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Вот что конкретно мы даём<br className="hidden sm:block" /> нашим партнёрам:
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className={`group relative p-7 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm hover:border-[#00767D]/40 hover:bg-[#00767D]/10 transition-all duration-300 scroll-fade-in scroll-delay-${(index % 3) + 1}`}
                >
                  {/* Number watermark */}
                  <div className="absolute top-5 right-6 text-5xl font-extrabold text-white/5 select-none leading-none group-hover:text-[#00767D]/15 transition-colors">
                    {item.num}
                  </div>

                  {/* Check icon */}
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <p className="font-bold text-white text-base mb-2 leading-snug pr-8">{item.title}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          PGT — light bg with bold cards
          ================================================ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#00767D]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/8 text-[#00767D] text-sm font-semibold mb-6">
              Наш фреймворк
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2D3A3C] mb-4 leading-tight">
              People <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00767D] to-[#009BA3]">·</span> Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00767D] to-[#009BA3]">·</span> Technology
            </h2>
            <p className="text-xl text-[#546569] max-w-xl mx-auto">
              Три столпа нашего подхода к корпоративному обучению
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pgtBlocks.map((block, index) => (
              <div
                key={index}
                className={`relative p-8 pt-14 rounded-2xl scroll-fade-in scroll-delay-${index + 1} overflow-hidden group transition-all duration-300 ${
                  block.color === "gold"
                    ? "bg-gradient-to-br from-[#1a2e30] to-[#0d2628] border border-[#F0BB1E]/25 hover:border-[#F0BB1E]/50"
                    : "bg-gradient-to-br from-[#F8FAFA] to-white border border-[#00767D]/12 hover:border-[#00767D]/30 hover:shadow-lg hover:shadow-[#00767D]/8"
                }`}
              >
                {/* Glow in corner */}
                {block.color === "gold" && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0BB1E]/10 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Big letter badge */}
                <div className={`absolute top-5 left-8 text-7xl font-extrabold leading-none select-none ${
                  block.color === "gold" ? "text-[#F0BB1E]/20" : "text-[#00767D]/10"
                }`}>
                  {block.letter}
                </div>

                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  block.color === "gold"
                    ? "bg-[#F0BB1E]/15 text-[#F0BB1E]"
                    : "bg-[#00767D]/10 text-[#00767D]"
                }`}>
                  {block.icon}
                </div>

                <h3 className={`relative z-10 text-2xl font-extrabold mb-1 ${
                  block.color === "gold" ? "text-white" : "text-[#2D3A3C]"
                }`}>
                  {block.title}
                </h3>
                <p className={`relative z-10 text-sm font-bold mb-4 uppercase tracking-wider ${
                  block.color === "gold" ? "text-[#F0BB1E]" : "text-[#00767D]"
                }`}>
                  {block.subtitle}
                </p>
                <p className={`relative z-10 leading-relaxed ${
                  block.color === "gold" ? "text-white/65" : "text-[#546569]"
                }`}>
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          HYBRID MODEL — subtle bg
          ================================================ */}
      <section className="py-20 sm:py-28 bg-[#F8FAFA] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[#00767D]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/8 text-[#00767D] text-sm font-semibold mb-6">
              Форматы обучения
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
              Гибридная модель <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EBB417] to-[#F0BB1E]">обучения</span>
            </h2>
            <p className="text-xl text-[#546569] max-w-2xl mx-auto">
              Мы комбинируем разные форматы для максимального результата
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hybridFormats.map((format, index) => (
              <div
                key={index}
                className={`relative p-7 rounded-2xl scroll-fade-in scroll-delay-${index + 1} transition-all duration-300 group ${
                  format.highlight
                    ? "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white shadow-xl shadow-[#00767D]/25"
                    : "bg-white border border-[#00767D]/10 shadow-sm hover:shadow-md hover:border-[#00767D]/25"
                }`}
              >
                {format.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className={`w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  format.highlight
                    ? "bg-white/15 text-white"
                    : "bg-[#00767D]/10 text-[#00767D] group-hover:bg-[#00767D]/20 transition-colors"
                }`}>
                  {format.icon}
                </div>

                <h3 className={`text-xl font-extrabold mb-3 ${
                  format.highlight ? "text-white" : "text-[#2D3A3C]"
                }`}>
                  {format.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  format.highlight ? "text-white/75" : "text-[#546569]"
                }`}>
                  {format.description}
                </p>

                {format.highlight && (
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 mt-5 text-[#F0BB1E] font-bold text-sm hover:gap-3 transition-all"
                  >
                    Подробнее об ibirAi
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          CTA — dark with gold button
          ================================================ */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00767D]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F0BB1E]/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F0BB1E]/30 bg-[#F0BB1E]/10 text-[#F0BB1E] text-sm font-semibold mb-8">
              Начнём сотрудничество
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Готовы развивать<br />свою команду?
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
              Получите бесплатную консультацию и коммерческое предложение с расчётом ROI в день обращения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="gold-button px-10 py-4 text-base font-bold rounded-xl text-center"
              >
                Оставить заявку
              </Link>
              <Link
                href="/schedule"
                className="px-10 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#00767D]/60 hover:bg-[#00767D]/15 transition-all text-center text-base"
              >
                Смотреть расписание
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
