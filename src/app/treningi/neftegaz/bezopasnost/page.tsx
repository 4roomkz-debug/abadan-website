"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── Filtering ── */

const BEZOPASNOST_KEYWORDS = [
  "безопасност", "охран", "сероводород", "HSE", "hse",
  "пожар", "аварий", "экологи", "риск", "давлен",
  "радиац", "опасност", "коррози", "факельн",
];

function isSafetyCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return BEZOPASNOST_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const safetyCourses = SCHEDULE_DATA.filter((item) => isSafetyCourse(item.name));

/* ── FAQ Data ── */

const FAQ_ITEMS = [
  {
    q: "Какие курсы по промышленной безопасности вы предлагаете для нефтегазовой отрасли?",
    a: "Мы предлагаем курсы по промышленной безопасности на опасных производственных объектах, работе с сероводородом, HSE-менеджменту, охране труда в нефтегазовой отрасли, пожарной безопасности, управлению рисками и предотвращению аварийных ситуаций.",
  },
  {
    q: "Соответствуют ли курсы требованиям законодательства Казахстана?",
    a: "Да, все программы разработаны в соответствии с требованиями Закона РК «О промышленной безопасности», приказами Министерства энергетики и Министерства труда. По окончании выдаются удостоверения, признаваемые надзорными органами РК.",
  },
  {
    q: "Обязательно ли обучение по промышленной безопасности для нефтяников?",
    a: "Да. Все работники опасных производственных объектов нефтегазовой отрасли обязаны проходить инструктаж и обучение по промышленной безопасности согласно требованиям законодательства РК. Периодичность обучения — не реже одного раза в год.",
  },
  {
    q: "Что включает курс по работе с сероводородом (H₂S)?",
    a: "Курс охватывает свойства и токсикологию H₂S, средства индивидуальной защиты, действия при аварии, первую помощь при отравлении, мониторинг концентраций, правила безопасной работы на объектах с содержанием сероводорода. Включает практические занятия с СИЗОД.",
  },
  {
    q: "Предоставляете ли вы обучение по HSE-менеджменту?",
    a: "Да, мы проводим курсы по системам управления HSE в соответствии со стандартами ISO 45001 и ISO 14001, риск-менеджменту, аудиту безопасности, формированию культуры безопасного поведения на производстве.",
  },
  {
    q: "Можете ли вы организовать обучение на нашем объекте?",
    a: "Да, мы выезжаем на объекты в нефтегазовых регионах Казахстана: Атырау, Актау, Мангистау, Кызылорда. Корпоративные программы адаптируются под специфику вашего предприятия, конкретные риски и требования надзорных органов.",
  },
];

/* ── Topic blocks ── */

const TOPICS = [
  {
    title: "Промышленная безопасность на ОПО",
    desc: "Требования к опасным производственным объектам, надзор, ответственность руководителей",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Работа с сероводородом (H₂S)",
    desc: "Токсикология, СИЗОД, мониторинг, действия при аварии и первая помощь",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "HSE-менеджмент",
    desc: "ISO 45001, ISO 14001, системы управления охраной труда и окружающей средой",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Пожарная безопасность",
    desc: "Системы пожаротушения, планы эвакуации, первичные средства, проверки",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: "Управление рисками",
    desc: "Идентификация опасностей, HAZOP, HAZID, количественная оценка рисков",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Охрана труда на производстве",
    desc: "Специальная оценка условий труда, СИЗ, расследование несчастных случаев",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
          message: `[Промышленная безопасность] Запрос на обучение. Компания: ${fd.get("company") || "—"}`,
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
              Промышленная безопасность в нефтегазе
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

export default function BezopasnostPage() {
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
            <span className="text-[#F0BB1E]">Безопасность</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00767D]/20 border border-[#00767D]/30 mb-6 scroll-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
              <span className="text-sm text-[#B8CDD0] font-medium">HSE · Охрана труда · Нефтегаз</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 scroll-fade-in scroll-delay-1"
              style={{ color: "#ffffff" }}
            >
              Промышленная{" "}
              <span className="text-[#F0BB1E]">безопасность</span>{" "}
              в <span className="text-[#00767D]">нефтегазе</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#B8CDD0] leading-relaxed max-w-3xl mb-8 scroll-fade-in scroll-delay-2">
              Специализированные курсы по промышленной безопасности, охране труда и HSE-менеджменту для нефтегазовых предприятий Казахстана. Соответствие требованиям законодательства РК, сертификаты государственного образца.
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
                  <p className="text-2xl font-extrabold text-white">{safetyCourses.length}+</p>
                  <p className="text-xs text-[#7A9EA3]">курсов по безопасности</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0BB1E]/10 border border-[#F0BB1E]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F0BB1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">Соотв.</p>
                  <p className="text-xs text-[#7A9EA3]">требованиям РК</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00767D]/20 border border-[#00767D]/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                Почему промышленная безопасность —{" "}
                <span className="text-[#00767D]">приоритет для нефтегаза</span>
              </h2>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-1">
                Нефтегазовая отрасль входит в число наиболее опасных производств. Работа с горючими и токсичными веществами под высоким давлением, сероводородные риски, возможность взрывов и пожаров требуют постоянного поддержания компетенций персонала на высоком уровне.
              </p>
              <p className="text-[#546569] leading-relaxed mb-4 scroll-fade-in scroll-delay-2">
                Законодательство Казахстана обязывает нефтегазовые компании регулярно обучать сотрудников. Несоблюдение требований влечёт административную ответственность, приостановку деятельности и — что важнее — реальную угрозу жизни людей на объектах.
              </p>
              <p className="text-[#546569] leading-relaxed scroll-fade-in scroll-delay-3">
                Наши программы построены на реальных кейсах с казахстанских месторождений: Тенгиз, Кашаган, Карачаганак. Участники отрабатывают действия при аварийных ситуациях, изучают лучшие практики HSE и формируют культуру безопасного поведения.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 scroll-fade-in scroll-delay-2">
              {[
                { value: "↓60%", label: "снижение травматизма", desc: "на предприятиях после обучения" },
                { value: "100%", label: "соответствие", desc: "требованиям надзорных органов РК" },
                { value: "95%", label: "практики", desc: "в учебных программах HSE" },
                { value: "1 год", label: "периодичность", desc: "обязательного обучения по закону РК" },
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
              Полный охват дисциплин промышленной безопасности для нефтегазовой отрасли
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
                Расписание курсов по безопасности
              </h2>
              <p className="text-[#546569] scroll-fade-in scroll-delay-1">
                {safetyCourses.length} программ · очный и онлайн формат
              </p>
            </div>
            <Link href="/schedule" className="teal-button self-start sm:self-auto scroll-fade-in scroll-delay-2">
              Полное расписание
            </Link>
          </div>

          {safetyCourses.length === 0 ? (
            <div className="text-center py-16 text-[#546569]">
              <p className="text-lg">Расписание курсов обновляется. Свяжитесь с нами для получения актуальной программы.</p>
              <button onClick={() => setModalOpen(true)} className="gold-button mt-6">
                Запросить программу
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {safetyCourses.map((course, i) => (
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
                title: "Эксперты-практики",
                desc: "Тренеры — действующие HSE-специалисты с 10–25 годами опыта на нефтегазовых объектах",
              },
              {
                title: "Соответствие РК",
                desc: "Программы разработаны с учётом Закона РК «О промышленной безопасности» и приказов Минэнерго",
              },
              {
                title: "Практические занятия",
                desc: "Отработка действий при аварии, работа с СИЗОД, учения по пожарной безопасности",
              },
              {
                title: "Корпоративный выезд",
                desc: "Обучаем персонал прямо на объекте в Атырау, Актау, Мангистау и других регионах",
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
            Обеспечьте безопасность вашего производства
          </h2>
          <p className="text-[#B8CDD0] text-lg mb-8 scroll-fade-in scroll-delay-1">
            Запишитесь на курс по промышленной безопасности или получите консультацию по корпоративной программе HSE
          </p>
          <div className="flex flex-wrap gap-4 justify-center scroll-fade-in scroll-delay-2">
            <button onClick={() => setModalOpen(true)} className="gold-button">
              Записаться на курс
            </button>
            <Link href="/schedule" className="teal-button">
              Все расписание
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
