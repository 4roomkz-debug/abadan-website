"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── Filtering ── */

const BURENIE_KEYWORDS = [
  "бурен", "скважин", "цементирован", "долот", "каротаж",
  "перфорац", "инклинометр", "горизонтальн", "Ротор",
];

function isDrillCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return BURENIE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const drillCourses = SCHEDULE_DATA.filter((item) => isDrillCourse(item.name));

/* ── FAQ Data ── */

const FAQ_ITEMS = [
  {
    q: "Какие курсы по бурению скважин вы предлагаете?",
    a: "Мы предлагаем курсы по технологии бурения нефтяных и газовых скважин, горизонтальному и направленному бурению, цементированию обсадных колонн, долотному сервису, каротажу и геонавигации, инклинометрии, перфорации пластов, промывке скважин. Все программы разработаны практикующими буровыми инженерами.",
  },
  {
    q: "Сколько стоит обучение по бурению скважин?",
    a: "Стоимость курсов по бурению составляет от 120 000 до 220 000 тенге за программу. Онлайн-формат доступен по сниженной стоимости. При корпоративном заказе от 5 человек предоставляются групповые скидки.",
  },
  {
    q: "Выдаётся ли сертификат после курса по бурению?",
    a: "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации. Для ряда программ доступна дополнительная сертификация по международным стандартам IADC/IWCF.",
  },
  {
    q: "Проводите ли вы обучение по горизонтальному бурению?",
    a: "Да, курс по горизонтальному и направленному бурению — один из наиболее востребованных. Программа охватывает проектирование профиля скважины, управление инструментом, геонавигацию и типичные осложнения при бурении горизонтальных участков.",
  },
  {
    q: "Можно ли организовать корпоративное обучение с выездом на объект?",
    a: "Да. Мы проводим корпоративное обучение буровых бригад непосредственно на объектах в Атырау, Актобе, Мангистау, Кызылорде и других регионах Казахстана. Программа адаптируется под специфику оборудования и процессы заказчика.",
  },
  {
    q: "Кто ведёт курсы по бурению скважин?",
    a: "Все курсы ведут эксперты-практики с опытом работы в буровых компаниях от 10 лет. В числе преподавателей — главные инженеры, буровые супервайзеры и технические директора, работавшие в ТШО, НКОК, КПО, Schlumberger, Halliburton и других компаниях.",
  },
];

/* ── Topic blocks ── */

const TOPICS = [
  {
    title: "Технология бурения",
    desc: "Конструкция скважин, буровые растворы, промывка, предупреждение осложнений",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Горизонтальное бурение",
    desc: "Профиль скважины, управление BHA, геонавигация, инклинометрия",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    title: "Цементирование",
    desc: "Крепление обсадных колонн, тампонажные растворы, контроль качества",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Каротаж и геофизика",
    desc: "ГИС, MWD/LWD, интерпретация данных, геологическая навигация",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Перфорация и долотный сервис",
    desc: "Вскрытие продуктивных пластов, выбор долот, оценка износа, ТЗК",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    title: "Безопасность при бурении",
    desc: "Предупреждение ГНВП, управление противовыбросовым оборудованием, H₂S",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

/* ── Contact Modal ── */

function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: `[Бурение скважин] Запрос на обучение. Компания: ${fd.get("company") || "—"}`,
        }),
      });
    } catch {
      /* ok */
    }
    setStatus("success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] border border-white/10 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Заявка отправлена</h3>
            <p className="text-white/70 text-sm">Наш менеджер свяжется с вами в течение рабочего дня</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Записаться на курс</h2>
            <p className="text-[#F0BB1E] font-medium text-sm mb-6">
              Бурение и строительство скважин
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 bg-white/90 border border-white/60 rounded-xl text-[#2D3A3C] placeholder:text-[#546569] focus:outline-none focus:border-[#00767D] focus:bg-white transition-all text-sm"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Телефон"
                required
                className="w-full px-4 py-3 bg-white/90 border border-white/60 rounded-xl text-[#2D3A3C] placeholder:text-[#546569] focus:outline-none focus:border-[#00767D] focus:bg-white transition-all text-sm"
              />
              <input
                name="company"
                type="text"
                placeholder="Компания (необязательно)"
                className="w-full px-4 py-3 bg-white/90 border border-white/60 rounded-xl text-[#2D3A3C] placeholder:text-[#546569] focus:outline-none focus:border-[#00767D] focus:bg-white transition-all text-sm"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full gold-button text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function BureniePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8 scroll-fade-in">
            <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/treningi/neftegaz" className="hover:text-[#00767D] transition-colors">Нефтегаз</Link>
            <span>/</span>
            <span className="text-[#F0BB1E]">Бурение</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/20 border border-[#00767D]/30 mb-6 scroll-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
              <span className="text-sm text-[#B8CDD0] font-medium">Технические курсы · Нефтегаз</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 scroll-fade-in scroll-delay-1"
              style={{ color: "#ffffff" }}
            >
              Курсы по{" "}
              <span className="text-[#F0BB1E]">бурению</span> и строительству{" "}
              <span className="text-[#00767D]">скважин</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#B8CDD0] leading-relaxed max-w-3xl mb-8 scroll-fade-in scroll-delay-2">
              Специализированные учебные программы для буровых инженеров, мастеров и технических специалистов. Технология бурения, горизонтальные скважины, цементирование, каротаж, промышленная безопасность.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10 scroll-fade-in scroll-delay-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00767D]/20 border border-[#00767D]/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{drillCourses.length}+</p>
                  <p className="text-xs text-[#7A9EA3]">курсов по бурению</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F0BB1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">200+</p>
                  <p className="text-xs text-[#7A9EA3]">экспертов-практиков</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00767D]/20 border border-[#00767D]/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">10+</p>
                  <p className="text-xs text-[#7A9EA3]">лет на рынке</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 scroll-fade-in scroll-delay-4">
              <button onClick={() => setModalOpen(true)} className="gold-button">
                Записаться на курс
              </button>
              <Link href="/treningi/neftegaz" className="teal-button">
                Все курсы нефтегаз
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-6 scroll-fade-in"
                style={{ color: "#2D3A3C" }}
              >
                Почему важно специализированное{" "}
                <span className="text-[#00767D]">обучение по бурению</span>
              </h2>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-1">
                Бурение скважин — один из самых технически сложных и дорогостоящих процессов в нефтегазовой отрасли. Ошибки при проектировании конструкции, выборе бурового раствора или управлении противовыбросовым оборудованием могут привести к авариям, потере скважины и многомиллионным убыткам.
              </p>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-2">
                Наши программы построены на реальных кейсах с месторождений Казахстана — Тенгиз, Кашаган, Карачаганак, Жанажол. Участники не просто изучают теорию, но разбирают конкретные нештатные ситуации и отрабатывают действия при осложнениях.
              </p>
              <p className="text-[#546569] leading-relaxed scroll-fade-in scroll-delay-3">
                После обучения специалисты умеют самостоятельно принимать технические решения на буровой, снижать непроизводительное время (НПВ) и обеспечивать соответствие работ проектным показателям.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 scroll-fade-in scroll-delay-2">
              {[
                { value: "↓40%", label: "снижение НПВ", desc: "после обучения буровых бригад" },
                { value: "2×", label: "быстрее адаптация", desc: "новых инженеров-буровиков" },
                { value: "95%", label: "практики", desc: "в учебных программах" },
                { value: "15+", label: "регионов", desc: "корпоративного выезда" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl bg-[#F8FAFA] border border-[#e8eded] scroll-fade-in scroll-delay-${i + 1}`}
                >
                  <p className="text-3xl font-extrabold text-[#00767D] mb-1">{stat.value}</p>
                  <p className="font-bold text-[#2D3A3C] text-sm mb-1">{stat.label}</p>
                  <p className="text-[#546569] text-xs">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="py-20 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 scroll-fade-in"
              style={{ color: "#2D3A3C" }}
            >
              Направления обучения
            </h2>
            <p className="text-[#546569] max-w-2xl mx-auto scroll-fade-in scroll-delay-1">
              Полный охват технических дисциплин буровой инженерии
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TOPICS.map((topic, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-[#e8eded] p-6 scroll-fade-in scroll-delay-${(i % 3) + 1} hover:border-[#00767D]/30 hover:shadow-md transition-all`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                  {topic.icon}
                </div>
                <h3 className="font-bold text-[#2D3A3C] mb-2">{topic.title}</h3>
                <p className="text-[#546569] text-sm leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE LIST ── */}
      <section id="courses" className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-2 scroll-fade-in"
                style={{ color: "#2D3A3C" }}
              >
                Расписание курсов по бурению
              </h2>
              <p className="text-[#546569] scroll-fade-in scroll-delay-1">
                {drillCourses.length} программ · очный и онлайн формат
              </p>
            </div>
            <Link href="/schedule" className="teal-button self-start sm:self-auto scroll-fade-in scroll-delay-2">
              Полное расписание
            </Link>
          </div>

          {drillCourses.length === 0 ? (
            <div className="text-center py-16 text-[#546569]">
              <p className="text-lg">Расписание курсов обновляется. Свяжитесь с нами для получения актуальной программы.</p>
              <button onClick={() => setModalOpen(true)} className="gold-button mt-6">
                Запросить программу
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {drillCourses.map((course, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border border-[#e8eded] p-6 hover:border-[#00767D]/30 hover:shadow-md transition-all scroll-fade-in scroll-delay-${(i % 3) + 1}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-[#2D3A3C] text-sm leading-snug flex-1">
                      {course.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#00767D]/10 text-[#00767D] font-medium">
                      {course.date}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#F8FAFA] border border-[#e8eded] text-[#546569]">
                      {course.hours} часов
                    </span>
                  </div>
                  <div className="border-t border-[#e8eded] pt-4 mb-4">
                    <div className="flex items-center justify-between text-xs text-[#546569] mb-1">
                      <span>Онлайн</span>
                      <span className="font-semibold text-[#2D3A3C]">
                        {course.priceOnline.toLocaleString("ru-RU")} ₸
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#546569]">
                      <span>Очно</span>
                      <span className="font-semibold text-[#2D3A3C]">
                        {course.priceOffline.toLocaleString("ru-RU")} ₸
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-2 rounded-xl border border-[#00767D] text-[#00767D] text-sm font-semibold hover:bg-[#00767D] hover:text-white transition-all"
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY ABADAN ── */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00767D]/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 scroll-fade-in"
              style={{ color: "#ffffff" }}
            >
              Почему выбирают <span className="text-[#F0BB1E]">Abadan & Co.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "Практикующие эксперты",
                desc: "Тренеры — действующие специалисты с 10–25 годами опыта на нефтегазовых объектах",
              },
              {
                title: "Реальные кейсы",
                desc: "Программы строятся на разборе нештатных ситуаций с месторождений Казахстана",
              },
              {
                title: "Два формата",
                desc: "Очное обучение в Алматы или онлайн — выбирайте удобный вариант для своей команды",
              },
              {
                title: "Корпоративный выезд",
                desc: "Проводим обучение прямо на вашем объекте в любом регионе Казахстана",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}
              >
                <div className="w-3 h-3 rounded-full bg-[#F0BB1E] mb-4" />
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-[#B8CDD0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 text-center scroll-fade-in"
            style={{ color: "#2D3A3C" }}
          >
            Часто задаваемые вопросы
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className={`group bg-white rounded-2xl border border-[#e8eded] overflow-hidden scroll-fade-in scroll-delay-${(i % 3) + 1}`}
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-semibold text-[#2D3A3C] text-sm sm:text-base">
                    {item.q}
                  </span>
                  <svg
                    className="w-5 h-5 text-[#00767D] flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[#546569] text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 scroll-fade-in"
            style={{ color: "#ffffff" }}
          >
            Готовы начать обучение?
          </h2>
          <p className="text-[#B8CDD0] text-lg mb-8 scroll-fade-in scroll-delay-1">
            Запишитесь на курс по бурению или получите консультацию по корпоративной программе
          </p>
          <div className="flex flex-wrap gap-4 justify-center scroll-fade-in scroll-delay-2">
            <button onClick={() => setModalOpen(true)} className="gold-button">
              Записаться на курс
            </button>
            <Link href="/treningi/neftegaz" className="teal-button">
              Все курсы нефтегаз
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
