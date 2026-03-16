"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── Filtering ── */

const TRANSPORT_KEYWORDS = [
  "трубопровод", "магистральн", "транспорт", "резервуар",
  "нефтебаз", "ГСМ", "диспетчериз", "телемеханик", "коррози", "газохранилищ",
  "нефтеперекач", "нефтепровод", "газопровод",
];

function isTransportCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return TRANSPORT_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const transportCourses = SCHEDULE_DATA.filter((item) => isTransportCourse(item.name));

/* ── FAQ Data ── */

const FAQ_ITEMS = [
  {
    q: "Какие курсы по трубопроводному транспорту вы предлагаете?",
    a: "Мы предлагаем курсы по эксплуатации магистральных нефтепроводов и газопроводов, диспетчерскому управлению, обслуживанию нефтеперекачивающих станций, резервуарному парку и нефтебазам, коррозионной защите трубопроводов, телемеханике и автоматизации транспортных систем.",
  },
  {
    q: "Сколько стоит обучение по трубопроводному транспорту?",
    a: "Стоимость курсов по трубопроводному транспорту составляет от 120 000 до 220 000 тенге за программу. Онлайн-формат доступен по сниженной стоимости. При корпоративном заказе от 5 человек предоставляются групповые скидки.",
  },
  {
    q: "Выдаётся ли сертификат после курса по трубопроводному транспорту?",
    a: "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации, признаваемый предприятиями нефтегазовой отрасли Казахстана. По запросу доступна дополнительная сертификация по международным стандартам.",
  },
  {
    q: "Проводите ли вы обучение по диспетчеризации и телемеханике трубопроводов?",
    a: "Да. Курс охватывает системы диспетчерского управления и сбора данных (SCADA), телемеханику, автоматизацию нефтеперекачивающих станций, управление в нормальном и аварийном режимах, взаимодействие диспетчерских служб.",
  },
  {
    q: "Можно ли организовать корпоративное обучение с выездом на объект?",
    a: "Да. Мы проводим корпоративное обучение специалистов трубопроводного транспорта непосредственно на объектах в Атырау, Актау, Актобе и других регионах Казахстана. Программа адаптируется под специфику оборудования и регламенты вашего предприятия.",
  },
  {
    q: "Кто ведёт курсы по трубопроводному транспорту?",
    a: "Все курсы ведут эксперты-практики с опытом работы на магистральных трубопроводах от 10 лет. В числе преподавателей — главные инженеры, начальники служб диспетчеризации и специалисты по эксплуатации, работавшие в КазТрансОйл, КазТрансГаз и других трубопроводных компаниях.",
  },
];

/* ── Topic blocks ── */

const TOPICS = [
  {
    title: "Магистральные трубопроводы",
    desc: "Эксплуатация, техобслуживание и ремонт линейной части нефтепроводов и газопроводов",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Нефтеперекачивающие станции",
    desc: "Оборудование НПС, насосные агрегаты, электрооборудование, режимы эксплуатации",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Резервуарный парк и нефтебазы",
    desc: "Конструкция резервуаров, эксплуатация, зачистка, замер, приём и отпуск нефтепродуктов",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "Диспетчеризация и SCADA",
    desc: "Диспетчерское управление, автоматизация, телемеханика, работа с системами SCADA",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Коррозионная защита",
    desc: "Методы защиты трубопроводов от коррозии, катодная защита, изоляционные покрытия, диагностика",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Газохранилища и ГСМ",
    desc: "Подземные хранилища газа, хранение нефтепродуктов, учёт и контроль качества ГСМ",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
          message: `[Трубопроводный транспорт] Запрос на обучение. Компания: ${fd.get("company") || "—"}`,
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
              Трубопроводный транспорт нефти и газа
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

export default function TransportPage() {
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
            <span className="text-[#F0BB1E]">Транспорт</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/20 border border-[#00767D]/30 mb-6 scroll-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
              <span className="text-sm text-[#B8CDD0] font-medium">Технические курсы · Трубопроводный транспорт</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 scroll-fade-in scroll-delay-1"
              style={{ color: "#ffffff" }}
            >
              Курсы по{" "}
              <span className="text-[#F0BB1E]">трубопроводному</span>{" "}
              <span className="text-[#00767D]">транспорту</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#B8CDD0] leading-relaxed max-w-3xl mb-8 scroll-fade-in scroll-delay-2">
              Специализированные учебные программы для специалистов в области транспортировки нефти и газа. Магистральные трубопроводы, НПС, резервуарный парк, диспетчеризация, коррозионная защита, телемеханика.
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
                  <p className="text-2xl font-extrabold text-white">{transportCourses.length}+</p>
                  <p className="text-xs text-[#7A9EA3]">курсов по транспорту</p>
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
                <span className="text-[#00767D]">обучение по трубопроводному транспорту</span>
              </h2>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-1">
                Казахстан располагает одной из крупнейших трубопроводных систем в регионе. КТК, КазТрансОйл, Средняя Азия — Центр и другие магистрали ежегодно транспортируют миллионы тонн нефти и миллиарды кубометров газа. Надёжность этой инфраструктуры зависит от квалификации персонала.
              </p>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-2">
                Ошибки в управлении перекачкой, несвоевременная диагностика коррозии или сбои в работе диспетчерских систем могут привести к аварийным разливам, многомиллиардным потерям и экологическому ущербу. Профессиональное обучение — ключевой инструмент предотвращения таких рисков.
              </p>
              <p className="text-[#546569] leading-relaxed scroll-fade-in scroll-delay-3">
                Наши программы разработаны с учётом специфики казахстанских трубопроводных систем. Участники изучают реальные кейсы аварий и нештатных ситуаций, отрабатывают алгоритмы действий при различных режимах работы трубопроводов.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 scroll-fade-in scroll-delay-2">
              {[
                { value: "↓35%", label: "снижение аварийности", desc: "после систематического обучения персонала" },
                { value: "2×", label: "быстрее диагностика", desc: "неисправностей обученными специалистами" },
                { value: "95%", label: "практики", desc: "в учебных программах по транспорту" },
                { value: "10+", label: "регионов", desc: "корпоративного обучения в Казахстане" },
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
              Полный охват технических дисциплин трубопроводного транспорта нефти и газа
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
                Расписание курсов по транспорту
              </h2>
              <p className="text-[#546569] scroll-fade-in scroll-delay-1">
                {transportCourses.length} программ · очный и онлайн формат
              </p>
            </div>
            <Link href="/schedule" className="teal-button self-start sm:self-auto scroll-fade-in scroll-delay-2">
              Полное расписание
            </Link>
          </div>

          {transportCourses.length === 0 ? (
            <div className="text-center py-16 text-[#546569]">
              <p className="text-lg">Расписание курсов обновляется. Свяжитесь с нами для получения актуальной программы.</p>
              <button onClick={() => setModalOpen(true)} className="gold-button mt-6">
                Запросить программу
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {transportCourses.map((course, i) => (
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
                desc: "Тренеры — действующие специалисты КазТрансОйл, КазТрансГаз с 10–25 годами опыта",
              },
              {
                title: "Реальные кейсы",
                desc: "Программы строятся на разборе реальных аварий и нештатных ситуаций на казахстанских трубопроводах",
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
            Готовы повысить квалификацию?
          </h2>
          <p className="text-[#B8CDD0] text-lg mb-8 scroll-fade-in scroll-delay-1">
            Запишитесь на курс по трубопроводному транспорту или получите консультацию по корпоративной программе
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
