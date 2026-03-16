"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── filter ── */

const FILTER_KEYWORDS = [
  "переработк", "крекинг", "ректификац", "катализ", "нефтехим",
  "битум", "мазут", "дизельн", "бензин", "абсорбц",
  "обессоливан", "обезвожив", "сепарац",
];

function isMatch(name: string): boolean {
  const lower = name.toLowerCase();
  return FILTER_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const courses = SCHEDULE_DATA.filter((item) => isMatch(item.name));

/* ── FAQ ── */

const FAQ = [
  {
    question: "Какие курсы по нефтепереработке предлагает Abadan & Co.?",
    answer:
      "Мы предлагаем курсы по первичной и глубокой переработке нефти, каталитическому крекингу, ректификации, нефтехимии, производству битума, мазута, дизельного топлива и бензина. Отдельные программы охватывают процессы обессоливания, обезвоживания и сепарации нефти.",
  },
  {
    question: "Для кого предназначены курсы по нефтепереработке?",
    answer:
      "Курсы предназначены для технологов и инженеров-технологов НПЗ, начальников установок и цехов, операторов технологических установок, специалистов лабораторий контроля качества, а также руководителей производственных подразделений нефтеперерабатывающих предприятий.",
  },
  {
    question: "Сколько длится обучение по нефтепереработке?",
    answer:
      "Продолжительность курсов составляет от 8 до 40 часов в зависимости от темы. Интенсивные двухдневные семинары охватывают 16 часов практических и теоретических занятий. Для глубокого изучения технологий доступны расширенные программы.",
  },
  {
    question: "Проводите ли вы обучение непосредственно на нефтеперерабатывающих заводах?",
    answer:
      "Да, мы организуем корпоративные программы с выездом на НПЗ в Павлодаре, Шымкенте и Атырау. Обучение адаптируется под конкретные установки и технологические регламенты предприятия.",
  },
  {
    question: "Каковы требования к подготовке для поступления на курс?",
    answer:
      "Для большинства курсов требуется высшее или среднее специальное техническое образование по специальностям нефтегазового профиля. Вводные курсы доступны для специалистов с базовым техническим образованием без опыта в переработке.",
  },
  {
    question: "Какой документ выдаётся по окончании курса?",
    answer:
      "Выпускники получают сертификат Abadan & Co. о повышении квалификации. Для ряда программ предусмотрена выдача удостоверений установленного образца, признаваемых предприятиями нефтегазовой отрасли Казахстана.",
  },
];

/* ── page ── */

export default function PererabotkaPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
          {/* Ambient glows */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00767D]/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#7A9EA3] mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/treningi" className="hover:text-[#00767D] transition-colors">Тренинги</Link>
              <span>/</span>
              <Link href="/treningi/neftegaz" className="hover:text-[#00767D] transition-colors">Нефтегаз</Link>
              <span>/</span>
              <span className="text-[#B8CDD0]">Переработка</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/20 border border-[#00767D]/30 text-[#00767D] text-sm font-semibold mb-6 scroll-fade-in scroll-delay-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Нефтепереработка и нефтехимия
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 scroll-fade-in scroll-delay-2"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
              >
                Курсы по{" "}
                <span className="text-[#F0BB1E]">нефтепереработке</span>{" "}
                и нефтехимии
              </h1>

              <p className="text-lg sm:text-xl text-[#B8CDD0] leading-relaxed mb-8 scroll-fade-in scroll-delay-3">
                Углублённое обучение технологиям переработки нефти и газа: от первичной перегонки
                и сепарации до каталитического крекинга, ректификации и производства нефтехимической
                продукции. Программы для инженеров-технологов, начальников установок и специалистов НПЗ.
              </p>

              <div className="flex flex-wrap gap-4 scroll-fade-in scroll-delay-4">
                <Link
                  href="#courses"
                  className="gold-button"
                >
                  Смотреть курсы
                </Link>
                <Link
                  href="/schedule"
                  className="teal-button-outline"
                >
                  Расписание
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-14 scroll-fade-in scroll-delay-5">
              {[
                { value: `${courses.length}+`, label: "курсов и семинаров" },
                { value: "16–40", label: "часов обучения" },
                { value: "3 НПЗ", label: "корпоративные выезды" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-3xl font-extrabold text-[#F0BB1E] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#7A9EA3]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Topics ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Направления обучения
              </h2>
              <p className="text-[#546569] max-w-2xl mx-auto">
                Полный спектр учебных программ для специалистов нефтеперерабатывающей и нефтехимической промышленности
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Первичная переработка нефти",
                  desc: "Технология атмосферной и вакуумной перегонки, обессоливание и обезвоживание нефтяного сырья, получение прямогонных фракций",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                },
                {
                  title: "Каталитический крекинг и риформинг",
                  desc: "Технологии глубокой переработки, каталитические процессы, повышение октанового числа, производство высококачественного бензина",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ),
                },
                {
                  title: "Ректификация и абсорбция",
                  desc: "Теория и практика разделения углеводородных смесей, расчёт ректификационных колонн, технология абсорбционных процессов",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  ),
                },
                {
                  title: "Нефтехимическое производство",
                  desc: "Производство нефтехимических полупродуктов и продуктов, технологические процессы нефтехимической промышленности",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  ),
                },
                {
                  title: "Производство битума и тёмных нефтепродуктов",
                  desc: "Технология висбрекинга, получение битума, мазута и котельного топлива, контроль качества тёмных нефтепродуктов",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Контроль качества нефтепродуктов",
                  desc: "Лабораторный анализ нефтепродуктов, стандарты качества ГОСТ и EN, методы испытаний топлива, масел и смазочных материалов",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
              ].map((topic, i) => (
                <div
                  key={topic.title}
                  className={`bg-white rounded-2xl border border-[#e8eded] p-6 hover:border-[#00767D]/40 hover:shadow-lg transition-all scroll-fade-in scroll-delay-${Math.min(i + 1, 6)}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 flex items-center justify-center text-[#00767D] mb-4">
                    {topic.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">{topic.title}</h3>
                  <p className="text-sm text-[#546569] leading-relaxed">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Courses ── */}
        <section id="courses" className="py-20 bg-[#F8FAFA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Расписание курсов по нефтепереработке
              </h2>
              <p className="text-[#546569] max-w-2xl mx-auto">
                {courses.length > 0
                  ? `${courses.length} курсов доступны в ближайшие месяцы`
                  : "Курсы формируются — оставьте заявку для уточнения расписания"}
              </p>
            </div>

            {courses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                  <div
                    key={`${course.name}-${course.date}`}
                    className={`bg-white rounded-2xl border border-[#e8eded] p-6 hover:border-[#00767D]/40 hover:shadow-md transition-all scroll-fade-in scroll-delay-${Math.min((i % 6) + 1, 6)}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-[#00767D] bg-[#00767D]/10 px-3 py-1 rounded-full">
                        {course.date} · {course.month}
                      </span>
                      <span className="text-xs text-[#546569]">{course.hours} ч.</span>
                    </div>
                    <h3 className="text-base font-bold text-[#2D3A3C] mb-4 leading-snug min-h-[3rem]">
                      {course.name}
                    </h3>
                    <div className="border-t border-[#e8eded] pt-4 flex justify-between items-end">
                      <div>
                        <div className="text-xs text-[#546569] mb-1">Онлайн</div>
                        <div className="text-lg font-extrabold text-[#2D3A3C]">
                          {course.priceOnline.toLocaleString("ru-RU")} ₸
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#546569] mb-1">Очно</div>
                        <div className="text-lg font-extrabold text-[#00767D]">
                          {course.priceOffline.toLocaleString("ru-RU")} ₸
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔧</div>
                <p className="text-[#546569] text-lg mb-6">
                  Расписание курсов по нефтепереработке формируется. Оставьте заявку — мы свяжемся с вами.
                </p>
                <Link href="/schedule" className="gold-button">
                  Смотреть все курсы
                </Link>
              </div>
            )}

            <div className="text-center mt-10 scroll-fade-in">
              <Link href="/schedule" className="teal-button">
                Полное расписание
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-[#F8FAFA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-[#546569]">
                Ответы на популярные вопросы об обучении нефтепереработке
              </p>
            </div>

            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <details
                  key={item.question}
                  className={`group bg-white rounded-2xl border border-[#e8eded] overflow-hidden scroll-fade-in scroll-delay-${Math.min(i + 1, 6)}`}
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-[#2D3A3C] hover:text-[#00767D] transition-colors">
                    <span>{item.question}</span>
                    <svg
                      className="w-5 h-5 shrink-0 text-[#00767D] transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-[#546569] leading-relaxed border-t border-[#e8eded] pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#006D77] via-[#00767D] to-[#009BA3]">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #F0BB1E 0%, transparent 50%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 50%)" }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 scroll-fade-in">
              Готовы повысить квалификацию?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 scroll-fade-in scroll-delay-1">
              Запишитесь на курс по нефтепереработке или запросите корпоративную программу для вашего НПЗ.
              Наши эксперты-практики помогут подобрать оптимальный формат обучения.
            </p>
            <div className="flex flex-wrap justify-center gap-4 scroll-fade-in scroll-delay-2">
              <Link href="/schedule" className="gold-button">
                Записаться на курс
              </Link>
              <Link href="/#contact" className="dark-button">
                Корпоративное обучение
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
