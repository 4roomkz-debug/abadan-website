"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00767D]/5 via-transparent to-[#F0BB1E]/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center gap-2 text-sm text-[#7A8B8E] mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#2D3A3C] font-medium">Приветствие</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 text-[#D4A017] text-sm font-semibold mb-6 scroll-fade-in scroll-delay-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Открытое письмо основателя
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4 scroll-fade-in scroll-delay-2">
              Добро пожаловать в{" "}
              <span className="text-gradient-primary">Abadan & Company</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#546569] scroll-fade-in scroll-delay-3">
              Обращение к HR-директорам, руководителям и тем,<br className="hidden sm:block" />
              кто вкладывает в развитие своих команд
            </p>
          </div>
        </div>
      </section>

      {/* Founder intro + Photo */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
              {/* Photo */}
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
                    <p className="text-[#00767D] font-medium text-sm">Старший партнер, Abadan & Company</p>
                  </div>
                </div>
              </div>

              {/* Letter beginning */}
              <div className="md:col-span-3 scroll-fade-in scroll-delay-1">
                <div className="text-[#546569] text-lg leading-relaxed space-y-6">
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
                    измерение реальной отдачи от инвестиций в людей. Я хочу рассказать, почему <strong className="text-[#2D3A3C]">359 компаний</strong> уже
                    выбрали нас в качестве партнёра.
                  </p>

                  <p>
                    Наш принцип прост: <strong className="text-[#2D3A3C]">мы не «проводим тренинги» — мы решаем
                    бизнес-задачи через развитие команд</strong>. Каждая наша программа — это 80% практики
                    на реальных кейсах вашей компании. Не абстрактные теории, а конкретные навыки,
                    которые сотрудники применяют уже на следующий день.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Letter continuation */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-[#546569] text-lg leading-relaxed space-y-6">
            <p className="scroll-fade-in">
              За годы работы мы собрали базу из <strong className="text-[#2D3A3C]">более 200 экспертов-практиков</strong> в
              самых разных областях — от нефтегазовой отрасли и промышленной безопасности до
              HR-менеджмента и искусственного интеллекта. Какую бы задачу вы ни поставили —
              мы подберём специалиста, который говорит на вашем языке и понимает специфику
              вашего бизнеса.
            </p>

            <p className="scroll-fade-in scroll-delay-1">
              Более <strong className="text-[#2D3A3C]">50 000 специалистов</strong> прошли обучение в наших программах.
              Среди наших клиентов — крупнейшие компании Казахстана из нефтегазового сектора,
              горнодобывающей промышленности, банковской сферы, телекоммуникаций.
            </p>

            {/* Advantages block */}
            <div className="my-10 scroll-fade-in scroll-delay-2">
              <p className="text-[#2D3A3C] text-xl font-semibold mb-6">
                Вот что конкретно мы даём нашим партнёрам:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
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
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-xl bg-[#F8FAFA] border border-[#00767D]/8"
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

            <p className="scroll-fade-in">
              Я лично гарантирую качество каждой программы. Если результат обучения
              не оправдает ваших ожиданий — мы проведём повторное занятие за наш счёт.
              Это не маркетинговый ход, а наш принцип работы.
            </p>

            <p className="scroll-fade-in scroll-delay-1">
              Буду рад обсудить, как мы можем помочь именно вашей компании. Напишите
              или позвоните — я или мой партнёр свяжемся с вами лично.
            </p>

            {/* Signature */}
            <div className="pt-8 pb-4 scroll-fade-in scroll-delay-2">
              <p className="text-[#2D3A3C] text-lg mb-6">С уважением и теплотой,</p>

              {/* Facsimile placeholder */}
              <div className="mb-4">
                <div className="w-48 h-20 relative">
                  {/* Стилизованная подпись-placeholder (заменить на реальное факсимиле) */}
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

              <p className="text-xl font-bold text-[#2D3A3C]">Гани Абадан</p>
              <p className="text-[#00767D] font-medium">
                Основатель и старший партнер
              </p>
              <p className="text-[#7A8B8E] text-sm">
                Abadan & Company
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center scroll-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3A3C] mb-4">
              Готовы обсудить сотрудничество?
            </h2>
            <p className="text-lg text-[#546569] mb-8">
              Оставьте заявку — и мы подготовим предложение под вашу компанию
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/#contact"
                className="gold-button text-center"
              >
                Оставить заявку
              </Link>
              <Link
                href="/schedule"
                className="dark-button-outline text-center"
              >
                Расписание тренингов
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#546569]">
              <a
                href="tel:+77272505637"
                className="flex items-center gap-2 hover:text-[#00767D] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (727) 250-56-37
              </a>
              <a
                href="mailto:info@abadan.kz"
                className="flex items-center gap-2 hover:text-[#00767D] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@abadan.kz
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
