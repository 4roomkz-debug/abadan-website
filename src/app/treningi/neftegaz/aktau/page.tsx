"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── helpers ── */

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "коррози", "насос", "компрессор",
  "резервуар", "нефтебаз", "ГСМ", "эксплуатац", "интенсификац",
  "сероводород", "КИП", "автоматизац", "метрологи", "крекинг",
  "ректификац", "нефтехим", "битум", "мазут", "цементирован",
  "недр", "углеводород", "нефтеотдач", "газлифт", "фонтан",
  "перфорац", "каротаж", "сепарац", "гидравлик", "магистральн",
  "дизельн", "бензин",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const neftegazTrainings = SCHEDULE_DATA.filter((item) =>
  isNeftegazTraining(item.name)
);

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ").format(price) + " ₸";
}

const AKTAU_FAQ = [
  {
    question: "Проводите ли вы тренинги непосредственно в Актау?",
    answer:
      "Да, мы организуем обучение в Актау: в учебных помещениях города, на базе заказчика или на производственном объекте. Возможны очный, онлайн и смешанный форматы.",
  },
  {
    question: "Работаете ли вы с КПО и Озенмунайгазом?",
    answer:
      "Мы обучаем специалистов крупнейших нефтегазовых компаний Мангистауского региона: КПО (Карачаганак Петролеум Оперейтинг), Озенмунайгаз, Мангистаумунайгаз и их подрядчиков. Программы адаптируются под корпоративные стандарты заказчика.",
  },
  {
    question: "Есть ли у вас курсы по шельфовым и морским операциям?",
    answer:
      "Да, в нашем каталоге есть программы, актуальные для шельфовых проектов: безопасность на морских платформах, коррозионная защита в агрессивных средах, эксплуатация насосно-компрессорного оборудования в условиях высокой солёности. Уточните запрос — подберём оптимальную программу.",
  },
  {
    question: "Как организован выезд тренера в Актау?",
    answer:
      "Тренер прилетает в Актау заблаговременно. Транспортные и командировочные расходы рассчитываются индивидуально и включаются в корпоративное предложение. Возможна организация нескольких курсов подряд в рамках одной командировки для оптимизации затрат.",
  },
  {
    question: "Какие курсы наиболее востребованы среди мангистауских нефтяников?",
    answer:
      "В Мангистауском регионе высокий спрос на курсы по эксплуатации нефтяных скважин и насосного оборудования, методам интенсификации добычи, промышленной безопасности, коррозионной защите, а также по КРС (капитальный ремонт скважин).",
  },
  {
    question: "Предусмотрено ли корпоративное ценообразование?",
    answer:
      "Да. При корпоративном заказе от 3 курсов или группы от 5 специалистов действуют пакетные условия. Для компаний Мангистауского региона разрабатываем годовые программы обучения — это удобно для планирования бюджета и графика повышения квалификации.",
  },
];

export default function AktauPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#00767D]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#F0BB1E]/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#7A8B8E] mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-[#009BA3] transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/treningi/neftegaz" className="hover:text-[#009BA3] transition-colors">Нефтегаз</Link>
              <span>/</span>
              <span className="text-[#F0BB1E]">Актау</span>
            </nav>

            {/* "Выезд на объект" badge */}
            <div className="inline-flex items-center gap-2 bg-[#F0BB1E]/15 border border-[#F0BB1E]/30 rounded-full px-4 py-1.5 mb-6 scroll-fade-in scroll-delay-1">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse" />
              <span className="text-[#F0BB1E] text-sm font-600">Выезд на объект — все курсы доступны в Актау и Мангистау</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight mb-6 scroll-fade-in scroll-delay-2">
              Нефтегазовые тренинги<br />
              <span className="text-gradient-primary">в Актау и Мангистау</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#7A8B8E] max-w-2xl mb-10 scroll-fade-in scroll-delay-3">
              Программы повышения квалификации для специалистов КПО, Озенмунайгаз и шельфовых
              операций на Каспии. Очный формат, выезд на объект, корпоративное обучение.
            </p>

            <div className="flex flex-wrap gap-4 scroll-fade-in scroll-delay-4">
              <a href="#courses" className="gold-button">
                Смотреть курсы
              </a>
              <a href="#cta" className="dark-button">
                Корпоративное обучение
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 scroll-fade-in scroll-delay-5">
              {[
                { value: "65+", label: "технических курсов" },
                { value: "200+", label: "экспертов-практиков" },
                { value: "15+", label: "лет в нефтегазе" },
                { value: "500+", label: "компаний обучено" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-800 text-[#F0BB1E]">{stat.value}</div>
                  <div className="text-sm text-[#7A8B8E] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Regional context ── */}
        <section className="section-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-800 text-[#2D3A3C] mb-6 scroll-fade-in">
                  Мангистау — стратегический нефтегазовый регион
                </h2>
                <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-1">
                  Мангистауская область — один из ключевых центров нефтегазодобычи Казахстана.
                  Здесь расположены крупнейшие сухопутные месторождения страны: Узень, Жетыбай,
                  Каламкас, а также инфраструктура шельфовых проектов Каспийского моря.
                </p>
                <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-2">
                  Актау — морской порт и промышленный центр с развитой нефтесервисной инфраструктурой.
                  Компании КПО (Карачаганак Петролеум Оперейтинг), Озенмунайгаз и Мангистаумунайгаз
                  требуют от специалистов высокого уровня технической компетенции.
                </p>
                <p className="text-[#546569] leading-relaxed scroll-fade-in scroll-delay-3">
                  Abadan&nbsp;&amp;&nbsp;Co. адаптирует программы под специфику Мангистауского региона:
                  шельфовую добычу, работу с высоковязкими нефтями, требования морских операций
                  и международных операторов.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 scroll-fade-in scroll-delay-2">
                {[
                  { name: "КПО", desc: "Карачаганак Петролеум Оперейтинг", color: "#00767D" },
                  { name: "Озенмунайгаз", desc: "Крупнейший добытчик Мангистау", color: "#F0BB1E" },
                  { name: "Мангистаумунайгаз", desc: "Региональная нефтяная компания", color: "#00767D" },
                  { name: "Каспийский шельф", desc: "Морские операции и платформы", color: "#F0BB1E" },
                ].map((company) => (
                  <div
                    key={company.name}
                    className="bg-white rounded-2xl border border-[#e8eded] p-5 hover:border-[#00767D]/30 transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full mb-3"
                      style={{ backgroundColor: company.color }}
                    />
                    <div className="font-700 text-[#2D3A3C] text-sm mb-1">{company.name}</div>
                    <div className="text-xs text-[#546569]">{company.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── On-site banner ── */}
        <section className="bg-gradient-to-r from-[#00767D] to-[#006D77] py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-700 text-lg">Выезд на объект — Актау и Мангистауская область</div>
                  <div className="text-white/80 text-sm">Тренер приезжает к вам: на завод, базу, месторождение или морскую платформу</div>
                </div>
              </div>
              <a href="#cta" className="bg-[#F0BB1E] hover:bg-[#EBB417] text-[#2D3A3C] font-700 px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex-shrink-0">
                Запросить выезд
              </a>
            </div>
          </div>
        </section>

        {/* ── Courses ── */}
        <section id="courses" className="bg-[#F8FAFA] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-800 text-[#2D3A3C] mb-4 scroll-fade-in">
                Все нефтегазовые курсы — доступны в Актау
              </h2>
              <p className="text-[#546569] max-w-xl mx-auto scroll-fade-in scroll-delay-1">
                Любой курс из расписания можно организовать с выездом тренера в Актау или онлайн.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {neftegazTrainings.map((course, i) => (
                <div
                  key={`${course.name}-${i}`}
                  className={`bg-white rounded-2xl border border-[#e8eded] p-6 hover:border-[#00767D]/30 hover:shadow-md transition-all scroll-fade-in scroll-delay-${Math.min(i % 6 + 1, 6)}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-block bg-[#00767D]/10 text-[#00767D] text-xs font-600 px-2.5 py-1 rounded-full">
                      {course.date} {course.month}
                    </span>
                    <span className="inline-block bg-[#F0BB1E]/15 text-[#2D3A3C] text-xs font-600 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {course.hours} ч
                    </span>
                  </div>
                  <h3 className="font-700 text-[#2D3A3C] text-sm leading-snug mb-4 min-h-[2.8rem]">
                    {course.name}
                  </h3>
                  <div className="border-t border-[#e8eded] pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#546569] mb-0.5">Онлайн</div>
                      <div className="font-700 text-[#2D3A3C] text-sm">{formatPrice(course.priceOnline)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#546569] mb-0.5">Очно / выезд</div>
                      <div className="font-700 text-[#00767D] text-sm">{formatPrice(course.priceOffline)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 scroll-fade-in">
              <Link href="/treningi/neftegaz" className="teal-button">
                Полный каталог нефтегазовых курсов
              </Link>
            </div>
          </div>
        </section>

        {/* ── Local expertise ── */}
        <section className="section-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-800 text-[#2D3A3C] mb-4 scroll-fade-in">
                Почему нас выбирают нефтяники Мангистау
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🌊",
                  title: "Шельфовая специфика",
                  desc: "Понимаем особенности морских операций на Каспии: требования к безопасности, коррозионную агрессивность среды, специфику оборудования шельфовых проектов.",
                },
                {
                  icon: "🚗",
                  title: "Приедем к вам",
                  desc: "Организуем обучение прямо на вашем предприятии в Актау или на производственном объекте — без отрыва сотрудников от работы.",
                },
                {
                  icon: "🛢️",
                  title: "Опыт с высоковязкими нефтями",
                  desc: "Эксперты знакомы со спецификой месторождений Узень и Жетыбай: высоковязкие нефти, методы интенсификации добычи, тепловые методы воздействия на пласт.",
                },
                {
                  icon: "👥",
                  title: "Корпоративные группы",
                  desc: "Обучаем группы от 5 до 50 человек. Разрабатываем кастомные программы под задачи конкретного предприятия и требования операторов.",
                },
                {
                  icon: "📜",
                  title: "Официальные сертификаты",
                  desc: "По итогам обучения выдаём сертификат о повышении квалификации, признаваемый крупными операторами Казахстана, включая КПО и международные компании.",
                },
                {
                  icon: "📋",
                  title: "Соответствие стандартам",
                  desc: "Программы соответствуют требованиям РК по промышленной безопасности, международным стандартам OPITO и другим отраслевым требованиям.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-[#e8eded] p-6 scroll-fade-in"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-700 text-[#2D3A3C] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#546569] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#F8FAFA] py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-800 text-[#2D3A3C] mb-10 text-center scroll-fade-in">
              Вопросы об обучении в Актау
            </h2>
            <div className="space-y-3">
              {AKTAU_FAQ.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-[#e8eded] overflow-hidden scroll-fade-in"
                  open={openFaq === i}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) {
                      setOpenFaq(i);
                    } else {
                      setOpenFaq(null);
                    }
                  }}
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none hover:bg-[#F8FAFA] transition-colors">
                    <span className="font-700 text-[#2D3A3C]">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-[#00767D] flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-[#546569] leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#F0BB1E]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#00767D]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4 scroll-fade-in">
              Запросить обучение в Актау
            </h2>
            <p className="text-[#7A8B8E] mb-8 scroll-fade-in scroll-delay-1">
              Расскажите о задаче — подберём программу, учтём специфику Мангистауского региона
              и организуем выезд тренера. Ответим в течение рабочего дня.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-fade-in scroll-delay-2">
              <Link href="/schedule" className="gold-button">
                Посмотреть расписание
              </Link>
              <Link href="/#contact" className="dark-button">
                Отправить запрос
              </Link>
            </div>
            <p className="text-[#546569] text-sm mt-6 scroll-fade-in scroll-delay-3">
              Или напишите напрямую:{" "}
              <a href="tel:+77771234567" className="text-[#009BA3] hover:underline">
                +7 (777) 123-45-67
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
