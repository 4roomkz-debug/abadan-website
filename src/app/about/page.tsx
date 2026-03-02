"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const stats = [
    { value: "10+", label: "лет на рынке" },
    { value: "359", label: "компаний-клиентов" },
    { value: "50K+", label: "выпускников" },
    { value: "200+", label: "экспертов" },
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
    },
    {
      title: "Экономия до 50%",
      desc: "При рамочном договоре вы получаете существенную экономию на развитии команды.",
    },
    {
      title: "Обучение от 2 участников",
      desc: "Не нужно собирать большую группу. Каждый участник получает персональную обратную связь.",
    },
    {
      title: "200+ экспертов под любую задачу",
      desc: "Подберём тренера под вашу отрасль и специфику. Нефть, финансы, IT, HR — у нас есть все.",
    },
    {
      title: "Документы в день завершения",
      desc: "Все закрывающие документы — в день окончания обучения. Ваша бухгалтерия будет довольна.",
    },
    {
      title: "Логистика на нас",
      desc: "Организуем проживание и трансфер для участников из регионов — вам не нужно думать об этом.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00767D]/5 via-transparent to-[#F0BB1E]/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-[#7A8B8E] mb-6">
              <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#2D3A3C] font-medium">О компании</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/10 text-[#00767D] text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00767D] animate-pulse"></span>
              People Growth Technology
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C] mb-6">
              Развиваем людей.<br />
              <span className="text-gradient-primary">Растим показатели.</span><br />
              Через технологии.
            </h1>
            <p className="text-xl text-[#546569] max-w-2xl mx-auto">
              Abadan & Co. — это не просто тренинговый центр. Это компания нового типа,
              которая объединяет классическое обучение с современными технологиями.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-[#00767D] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#546569] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Letter */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-10 scroll-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 text-[#D4A017] text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Слово основателя
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
              {/* Photo + name */}
              <div className="md:col-span-2 scroll-fade-in">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#00767D]/15 to-[#F0BB1E]/15 rounded-3xl blur-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                    <Image
                      src="/images/founder.jpg"
                      alt="Гани Абадан — основатель Abadan & Co."
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-[#2D3A3C]">Гани Абадан</p>
                    <p className="text-[#00767D] font-medium text-sm">Основатель и старший партнёр</p>
                  </div>
                </div>
              </div>

              {/* Letter */}
              <div className="md:col-span-3 scroll-fade-in scroll-delay-1">
                <div className="text-[#546569] text-lg leading-relaxed space-y-5">
                  <p className="text-[#2D3A3C] text-xl sm:text-2xl font-semibold leading-snug">
                    Уважаемые коллеги,
                  </p>
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
                    Наш принцип прост:{" "}
                    <strong className="text-[#2D3A3C]">мы не «проводим тренинги» — мы решаем бизнес-задачи
                    через развитие команд</strong>. Каждая наша программа — это 80% практики на реальных кейсах
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
                    ожиданий — мы проведём повторное занятие за наш счёт. Буду рад обсудить, как мы можем
                    помочь именно вашей компании.
                  </p>

                  {/* Signature */}
                  <div className="pt-4">
                    <p className="text-[#2D3A3C] text-base mb-4">С уважением и теплотой,</p>
                    <div className="mb-3">
                      <div className="w-48 h-20 relative">
                        <svg viewBox="0 0 200 80" className="w-full h-full text-[#2D3A3C]/70">
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
                    </div>
                    <p className="text-lg font-bold text-[#2D3A3C]">Гани Абадан</p>
                    <p className="text-[#7A8B8E] text-sm mb-3">Abadan & Company</p>
                    <div className="flex flex-wrap gap-4 text-sm text-[#546569]">
                      <a href="tel:+87019188838" className="flex items-center gap-1.5 hover:text-[#00767D] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +7 701 918-88-38
                      </a>
                      <a href="mailto:gani@abadan.kz" className="flex items-center gap-1.5 hover:text-[#00767D] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        gani@abadan.kz
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3A3C] mb-8 scroll-fade-in">
              Вот что конкретно мы даём нашим партнёрам:
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-5 rounded-xl bg-white border border-[#00767D]/8 scroll-fade-in scroll-delay-${(index % 3) + 1}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3A3C] text-base mb-1">{item.title}</p>
                    <p className="text-[#546569] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PGT Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-4">
              People Growth Technology
            </h2>
            <p className="text-xl text-[#546569]">
              Три столпа нашего подхода
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pgtBlocks.map((block, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl scroll-fade-in scroll-delay-${index + 1} ${
                  block.color === "gold"
                    ? "bg-gradient-to-br from-[#F0BB1E]/10 to-[#F0BB1E]/5 border border-[#F0BB1E]/20"
                    : "bg-white border border-[#00767D]/10 shadow-sm"
                }`}
              >
                <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-extrabold ${
                  block.color === "gold"
                    ? "bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C]"
                    : "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white"
                }`}>
                  {block.letter}
                </div>
                <div className="pt-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    block.color === "gold"
                      ? "bg-[#F0BB1E]/20 text-[#D4A017]"
                      : "bg-[#00767D]/10 text-[#00767D]"
                  }`}>
                    {block.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D3A3C] mb-1">{block.title}</h3>
                  <p className={`text-sm font-medium mb-4 ${
                    block.color === "gold" ? "text-[#D4A017]" : "text-[#00767D]"
                  }`}>
                    {block.subtitle}
                  </p>
                  <p className="text-[#546569] leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hybrid Model Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-4">
              Гибридная модель <span className="text-gradient-gold">обучения</span>
            </h2>
            <p className="text-xl text-[#546569] max-w-2xl mx-auto">
              Мы комбинируем разные форматы для максимального результата
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hybridFormats.map((format, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl scroll-fade-in scroll-delay-${index + 1} ${
                  format.highlight
                    ? "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white"
                    : "bg-white border border-[#00767D]/10 shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  format.highlight
                    ? "bg-white/20 text-white"
                    : "bg-[#00767D]/10 text-[#00767D]"
                }`}>
                  {format.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  format.highlight ? "text-white" : "text-[#2D3A3C]"
                }`}>
                  {format.title}
                </h3>
                <p className={format.highlight ? "text-white/80" : "text-[#546569]"}>
                  {format.description}
                </p>
                {format.highlight && (
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 mt-4 text-[#F0BB1E] font-semibold hover:gap-3 transition-all"
                  >
                    Подробнее
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-6">
              Готовы развивать свою команду?
            </h2>
            <p className="text-xl text-[#546569] mb-8">
              Получите бесплатную консультацию и коммерческое предложение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold rounded-xl hover:shadow-lg hover:shadow-[#F0BB1E]/20 transition-all text-center"
              >
                Оставить заявку
              </Link>
              <Link
                href="/schedule"
                className="px-8 py-4 border-2 border-[#00767D] text-[#00767D] font-bold rounded-xl hover:bg-[#00767D] hover:text-white transition-all text-center"
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
