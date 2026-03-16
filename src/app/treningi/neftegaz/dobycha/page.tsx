"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── Filtering ── */

const DOBYCHA_KEYWORDS = [
  "добыч", "эксплуатац", "нефтеотдач", "интенсификац",
  "КРС", "ГРП", "насос", "газлифт", "фонтан",
  "АСПО", "промыслов", "НГДУ", "обводнён",
];

function isProductionCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return DOBYCHA_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const productionCourses = SCHEDULE_DATA.filter((item) =>
  isProductionCourse(item.name)
);

/* ── FAQ Data ── */

const FAQ_ITEMS = [
  {
    q: "Какие курсы по добыче нефти и газа вы предлагаете?",
    a: "Мы предлагаем курсы по эксплуатации нефтяных и газовых скважин, методам увеличения нефтеотдачи пластов (МУН), гидравлическому разрыву пласта (ГРП), капитальному ремонту скважин (КРС), газлифтной добыче, борьбе с АСПО, механизированной добыче (ШСН, ЭЦН) и интенсификации добычи на обводнённых месторождениях. Все программы ведут практикующие эксперты нефтегазовой отрасли.",
  },
  {
    q: "Сколько стоит обучение по добыче нефти и газа?",
    a: "Стоимость курсов по добыче составляет от 110 000 до 230 000 тенге за программу. Онлайн-формат доступен по сниженной цене. При корпоративном заказе от 5 участников предоставляются групповые скидки. Для уточнения стоимости конкретного курса свяжитесь с нашим менеджером.",
  },
  {
    q: "Выдаётся ли сертификат после курса по добыче нефти?",
    a: "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации. Для ряда программ, связанных с промышленной безопасностью и эксплуатацией скважин, доступны удостоверения установленного образца, признаваемые нефтегазовыми предприятиями Казахстана.",
  },
  {
    q: "Проводите ли вы обучение непосредственно на промыслах?",
    a: "Да. Мы организуем корпоративные программы с выездом на нефтяные промыслы в Атырауской, Мангистауской, Актюбинской и Кызылординской областях. Программа адаптируется под конкретные условия добычи, оборудование и технологические регламенты заказчика.",
  },
  {
    q: "Для кого предназначены курсы по добыче нефти и газа?",
    a: "Программы рассчитаны на инженеров по добыче, мастеров по добыче нефти и газа, операторов ЦДНГ, технологов НГДУ, специалистов по капитальному ремонту и интенсификации скважин, а также руководителей производственных подразделений нефтедобывающих предприятий.",
  },
  {
    q: "Кто ведёт курсы по добыче нефти и газа?",
    a: "Все курсы ведут эксперты-практики с опытом работы в нефтедобывающих компаниях от 10 лет. В числе преподавателей — главные технологи и инженеры-нефтяники, работавшие в ТШО, КПО, НКОК, Казмунайгаз, а также в международных сервисных компаниях.",
  },
];

/* ── Topic blocks ── */

const TOPICS = [
  {
    title: "Эксплуатация скважин",
    desc: "Режимы работы, подбор оборудования, оптимизация дебита, контроль параметров",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "КРС — капитальный ремонт",
    desc: "Технологии КРС, подбор оборудования, ликвидация осложнений, оценка эффективности",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "ГРП — гидроразрыв пласта",
    desc: "Геомеханика пласта, проектирование ГРП, жидкости и пропант, анализ результатов",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
      </svg>
    ),
  },
  {
    title: "Механизированная добыча",
    desc: "ШГН, ЭЦН, газлифт — выбор, монтаж, диагностика, оптимизация работы насосов",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    title: "Борьба с АСПО",
    desc: "Асфальтосмолопарафиновые отложения: причины, методы удаления, профилактика, ингибиторы",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Разработка месторождений",
    desc: "Проектирование разработки, МУН, заводнение, модели пластов, управление запасами",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
          message: `[Добыча нефти и газа] Запрос на обучение. Компания: ${fd.get("company") || "—"}`,
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
              Добыча и эксплуатация скважин
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

export default function DobychaPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#F0BB1E]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#00767D]/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8 scroll-fade-in">
            <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/treningi/neftegaz" className="hover:text-[#00767D] transition-colors">Нефтегаз</Link>
            <span>/</span>
            <span className="text-[#F0BB1E]">Добыча</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 mb-6 scroll-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
              <span className="text-sm text-[#B8CDD0] font-medium">Технические курсы · Нефтегаз</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 scroll-fade-in scroll-delay-1"
              style={{ color: "#ffffff" }}
            >
              Курсы по{" "}
              <span className="text-[#F0BB1E]">добыче</span> и эксплуатации{" "}
              <span className="text-[#00767D]">скважин</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#B8CDD0] leading-relaxed max-w-3xl mb-8 scroll-fade-in scroll-delay-2">
              Учебные программы для специалистов нефтепромыслов: от оператора добычи до главного инженера НГДУ. Эксплуатация скважин, КРС, ГРП, механизированная добыча, разработка пластов.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10 scroll-fade-in scroll-delay-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F0BB1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{productionCourses.length}+</p>
                  <p className="text-xs text-[#7A9EA3]">курсов по добыче</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00767D]/20 border border-[#00767D]/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">200+</p>
                  <p className="text-xs text-[#7A9EA3]">экспертов-практиков</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F0BB1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">15+</p>
                  <p className="text-xs text-[#7A9EA3]">регионов выезда</p>
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
                Обучение для специалистов{" "}
                <span className="text-[#00767D]">нефтепромыслов</span>
              </h2>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-1">
                Добыча нефти и газа требует постоянного повышения квалификации: технологии совершенствуются, пласты истощаются, а требования к безопасности и эффективности растут. Ошибки в режимах эксплуатации, выборе метода КРС или проектировании ГРП напрямую влияют на добычу и расходы компании.
              </p>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-2">
                Наши программы разработаны с учётом специфики казахстанских месторождений — Тенгиз, Кашаган, Карачаганак, Узень, Жетыбай. Эксперты-тренеры работали или работают в действующих нефтедобывающих компаниях и знают реальные производственные задачи изнутри.
              </p>
              <p className="text-[#546569] leading-relaxed scroll-fade-in scroll-delay-3">
                Участники курсов получают инструменты для оптимизации добычи, снижения обводнённости, грамотного планирования ремонтного фонда и обоснования геолого-технических мероприятий.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 scroll-fade-in scroll-delay-2">
              {[
                { value: "+15%", label: "прирост добычи", desc: "за счёт оптимизации режимов" },
                { value: "↓30%", label: "затраты на КРС", desc: "правильное планирование ремонтов" },
                { value: "95%", label: "практики", desc: "в каждой учебной программе" },
                { value: "RU/KZ", label: "языки обучения", desc: "русский и казахский язык" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl bg-[#F8FAFA] border border-[#e8eded] scroll-fade-in scroll-delay-${i + 1}`}
                >
                  <p className="text-3xl font-extrabold text-[#F0BB1E] mb-1">{stat.value}</p>
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
              От эксплуатации фонтанных скважин до сложных методов воздействия на пласт
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TOPICS.map((topic, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-[#e8eded] p-6 scroll-fade-in scroll-delay-${(i % 3) + 1} hover:border-[#F0BB1E]/30 hover:shadow-md transition-all`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center text-white mb-4">
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
                Расписание курсов по добыче
              </h2>
              <p className="text-[#546569] scroll-fade-in scroll-delay-1">
                {productionCourses.length} программ · очный и онлайн формат
              </p>
            </div>
            <Link href="/schedule" className="teal-button self-start sm:self-auto scroll-fade-in scroll-delay-2">
              Полное расписание
            </Link>
          </div>

          {productionCourses.length === 0 ? (
            <div className="text-center py-16 text-[#546569]">
              <p className="text-lg">Расписание курсов обновляется. Свяжитесь с нами для получения актуальной программы.</p>
              <button onClick={() => setModalOpen(true)} className="gold-button mt-6">
                Запросить программу
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {productionCourses.map((course, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border border-[#e8eded] p-6 hover:border-[#F0BB1E]/30 hover:shadow-md transition-all scroll-fade-in scroll-delay-${(i % 3) + 1}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-[#2D3A3C] text-sm leading-snug flex-1">
                      {course.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#F0BB1E]/10 text-[#EBB417] font-medium">
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
                    className="w-full py-2 rounded-xl border border-[#F0BB1E] text-[#EBB417] text-sm font-semibold hover:bg-[#F0BB1E] hover:text-[#1a2e30] transition-all"
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
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 scroll-fade-in"
              style={{ color: "#ffffff" }}
            >
              Преимущества обучения в{" "}
              <span className="text-[#F0BB1E]">Abadan & Co.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "Отраслевые эксперты",
                desc: "Тренеры — действующие специалисты нефтепромыслов, знающие реальные производственные задачи",
              },
              {
                title: "Под ваши процессы",
                desc: "Программа адаптируется под специфику месторождения, используемое оборудование и регламенты",
              },
              {
                title: "Гибкие форматы",
                desc: "Очное обучение в Алматы, онлайн или корпоративный выезд непосредственно на промысел",
              },
              {
                title: "Измеримый результат",
                desc: "Участники уходят с конкретными инструментами оптимизации и планами ГТМ для своих скважин",
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
                    className="w-5 h-5 text-[#F0BB1E] flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
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
            Повысьте квалификацию своей команды
          </h2>
          <p className="text-[#B8CDD0] text-lg mb-8 scroll-fade-in scroll-delay-1">
            Запишитесь на курс по добыче нефти и газа или получите консультацию по корпоративной программе для вашего промысла
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
