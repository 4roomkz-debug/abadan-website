"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Types ── */

type Industry =
  | "Все"
  | "Нефтегаз"
  | "Банки и финансы"
  | "Телеком"
  | "Логистика"
  | "Производство"
  | "Государственный сектор";

interface CaseStudy {
  id: number;
  industry: Exclude<Industry, "Все">;
  direction: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  resultLabel: string;
}

/* ── Data ── */

const INDUSTRY_COLORS: Record<Exclude<Industry, "Все">, { bg: string; text: string }> = {
  "Нефтегаз": { bg: "#00767D", text: "#ffffff" },
  "Банки и финансы": { bg: "#F0BB1E", text: "#1a2e30" },
  "Телеком": { bg: "#6366f1", text: "#ffffff" },
  "Логистика": { bg: "#059669", text: "#ffffff" },
  "Производство": { bg: "#d97706", text: "#ffffff" },
  "Государственный сектор": { bg: "#7c3aed", text: "#ffffff" },
};

const CASES: CaseStudy[] = [
  {
    id: 1,
    industry: "Нефтегаз",
    direction: "Лидерство",
    client: "Крупнейшая нефтегазовая компания Казахстана",
    challenge:
      "Высокая текучесть линейных руководителей на производственных объектах. Отсутствие системы наставничества и преемственности.",
    solution:
      "Разработали и провели программу «Лидер-наставник» для 120 линейных руководителей в 5 регионах. 6-месячное сопровождение с менторингом.",
    result: "↓ 25%",
    resultLabel: "снижение текучести руководителей за год",
  },
  {
    id: 2,
    industry: "Банки и финансы",
    direction: "Управление",
    client: "Крупнейший финтех-банк Центральной Азии",
    challenge:
      "Быстрый рост штата — руководители среднего звена не успевали адаптироваться к новым масштабам управления.",
    solution:
      "Провели серию тренингов «От Хаоса к Порядку» для 80 руководителей. Внедрили систему приоритизации задач и делегирования.",
    result: "×2",
    resultLabel: "рост эффективности управления задачами",
  },
  {
    id: 3,
    industry: "Государственный сектор",
    direction: "HR",
    client: "Национальный фонд благосостояния — управляющая компания крупнейших госактивов",
    challenge:
      "Устаревшие HR-процессы в портфельных компаниях. Разрозненные стандарты оценки и развития персонала.",
    solution:
      "Обучили HR-команды 12 портфельных компаний единой системе оценки компетенций и построения ИПР. 200+ HR-специалистов прошли сертификацию.",
    result: "200+",
    resultLabel: "HR-специалистов прошли сертификацию",
  },
  {
    id: 4,
    industry: "Телеком",
    direction: "Soft skills",
    client: "Ведущий мобильный оператор Казахстана",
    challenge:
      "Низкий уровень кросс-функционального взаимодействия между техническими и коммерческими подразделениями.",
    solution:
      "Провели программу развития коммуникативных навыков для 150 сотрудников. Включили практикумы по конфликтологии и командной работе.",
    result: "↑ 40%",
    resultLabel: "рост показателя внутреннего NPS",
  },
  {
    id: 5,
    industry: "Логистика",
    direction: "Промышленная безопасность",
    client: "Национальная железнодорожная компания Казахстана",
    challenge:
      "Необходимость повысить квалификацию технических специалистов по новым стандартам промышленной безопасности.",
    solution:
      "Разработали и провели 24 технических семинара для 500+ специалистов в 17 городах. Подготовили к аттестации по новым требованиям.",
    result: "500+",
    resultLabel: "специалистов аттестованы в 17 городах",
  },
  {
    id: 6,
    industry: "Нефтегаз",
    direction: "Техническое обучение",
    client: "Крупная горнодобывающая компания с международными операциями",
    challenge:
      "Внедрение новых технологий на производстве требовало переквалификации инженерного состава.",
    solution:
      "Организовали серию специализированных технических семинаров по новому оборудованию и технологиям. Обучение проводилось с привлечением международных экспертов.",
    result: "98%",
    resultLabel: "инженеров успешно прошли аттестацию",
  },
  {
    id: 7,
    industry: "Логистика",
    direction: "HR",
    client: "Крупная логистическая компания Казахстана",
    challenge:
      "Долгий цикл закрытия вакансий — в среднем 45 дней. Высокий отсев на испытательном сроке.",
    solution:
      "Провели интенсив для HR-команды из 12 рекрутеров. Внедрили воронку найма, скрипты интервью, чек-листы онбординга.",
    result: "22 дня",
    resultLabel: "среднее время закрытия вакансии (было 45)",
  },
  {
    id: 8,
    industry: "Производство",
    direction: "ИИ",
    client: "Производственный холдинг в Караганде, 500+ сотрудников",
    challenge:
      "Рутинная отчётность и документооборот занимали до 40% рабочего времени бэк-офиса.",
    solution:
      "Обучили команду из 25 специалистов работе с ИИ-инструментами для автоматизации документооборота и отчётности.",
    result: "80%",
    resultLabel: "экономии времени на подготовку документов",
  },
];

const CATEGORIES: Industry[] = [
  "Все",
  "Нефтегаз",
  "Банки и финансы",
  "Телеком",
  "Логистика",
  "Производство",
  "Государственный сектор",
];

/* ── Sub-components ── */

function ChallengeIcon() {
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 shrink-0">
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </span>
  );
}

function SolutionIcon() {
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 shrink-0">
      <svg className="w-4 h-4 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}

function CaseCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const colors = INDUSTRY_COLORS[cs.industry];
  const delay = `scroll-delay-${Math.min((index % 3) + 1, 6)}` as string;

  return (
    <article
      className={`scroll-fade-in ${delay} bg-white border border-[#E0E8E9] rounded-2xl shadow-sm flex flex-col overflow-hidden`}
    >
      {/* Card header */}
      <div className="p-6 pb-0 flex items-start gap-3">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-700 leading-none"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {cs.industry}
        </span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-600 bg-[#f0f9f9] text-[#00767D] border border-[#b3dde0]">
          {cs.direction}
        </span>
      </div>

      {/* Client */}
      <div className="px-6 pt-4">
        <p className="text-[15px] font-700 text-[#2D3A3C] leading-snug">{cs.client}</p>
      </div>

      {/* Body */}
      <div className="px-6 pt-5 flex flex-col gap-4 flex-1">
        {/* Challenge */}
        <div className="flex gap-3">
          <ChallengeIcon />
          <div>
            <p className="text-[11px] font-700 uppercase tracking-wider text-red-400 mb-1">Задача</p>
            <p className="text-[13px] text-[#546569] leading-relaxed">{cs.challenge}</p>
          </div>
        </div>

        {/* Solution */}
        <div className="flex gap-3">
          <SolutionIcon />
          <div>
            <p className="text-[11px] font-700 uppercase tracking-wider text-[#00767D] mb-1">Решение</p>
            <p className="text-[13px] text-[#546569] leading-relaxed">{cs.solution}</p>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mx-6 mt-5 mb-6 rounded-xl bg-gradient-to-br from-[#fffbea] to-[#fff8d6] border border-[#f0e08a] px-5 py-4">
        <p className="text-[11px] font-700 uppercase tracking-wider text-[#b08a00] mb-1">Результат</p>
        <p className="text-3xl font-800 text-[#EBB417] leading-none">{cs.result}</p>
        <p className="text-[13px] text-[#7A8B8E] mt-1">{cs.resultLabel}</p>
      </div>
    </article>
  );
}

/* ── Main page ── */

export default function KejsyPage() {
  const [activeFilter, setActiveFilter] = useState<Industry>("Все");
  const [formData, setFormData] = useState({ name: "", phone: "", company: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const filtered = activeFilter === "Все" ? CASES : CASES.filter((c) => c.industry === activeFilter);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Страница кейсов" }),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", phone: "", company: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-28 pb-16 overflow-hidden">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[-80px] left-[-100px] w-[420px] h-[420px] bg-[#00767D]/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-60px] right-[-80px] w-[320px] h-[320px] bg-[#F0BB1E]/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-white/70">Кейсы</span>
            </nav>

            <div className="scroll-fade-in max-w-2xl">
              <p className="text-[#F0BB1E] text-sm font-700 uppercase tracking-widest mb-4">
                Результаты обучения
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-[1.08] mb-6">
                Реальные результаты<br />
                наших{" "}
                <span className="text-gradient-gold">клиентов</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                За 15 лет мы обучили более 9 000 специалистов в 359 компаниях Казахстана
              </p>
            </div>

            {/* Stats bar */}
            <div className="scroll-fade-in scroll-delay-2 mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
              {[
                { value: "9 000+", label: "обученных" },
                { value: "359", label: "клиентов" },
                { value: "15 лет", label: "опыта" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-800 text-[#F0BB1E]">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <div className="sticky top-0 z-30 bg-[#f0f9f9] border-b border-[#d0e8ea]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-[#00767D] text-white shadow-sm"
                      : "bg-white border border-[#d0e8ea] text-[#546569] hover:border-[#00767D] hover:text-[#00767D]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cases grid ── */}
        <section className="bg-[#f8fafa] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {filtered.length === 0 ? (
              <p className="text-center text-[#546569] py-20">Нет кейсов в этой категории</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((cs, i) => (
                  <CaseCard key={cs.id} cs={cs} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA / Contact form ── */}
        <section className="bg-[#00767D] py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="scroll-fade-in text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4">
                Хотите таких же результатов?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Расскажите о задачах вашей компании — подберём программу обучения
              </p>
            </div>

            {formState === "sent" ? (
              <div className="scroll-fade-in text-center bg-white/10 rounded-2xl p-10 border border-white/20">
                <div className="flex justify-center mb-4">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F0BB1E]">
                    <svg className="w-7 h-7 text-[#1a2e30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-white text-xl font-700 mb-2">Заявка отправлена!</p>
                <p className="text-white/70">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="scroll-fade-in scroll-delay-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-white/80 text-sm font-600">Ваше имя</label>
                    <input
                      className="dark-input"
                      type="text"
                      placeholder="Алия Смагулова"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-white/80 text-sm font-600">Телефон</label>
                    <input
                      className="dark-input"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/80 text-sm font-600">Компания</label>
                  <input
                    className="dark-input"
                    type="text"
                    placeholder="Название компании"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/80 text-sm font-600">Ваша задача</label>
                  <textarea
                    className="dark-input resize-none"
                    rows={4}
                    placeholder="Расскажите коротко о задаче — мы подберём подходящую программу"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                {formState === "error" && (
                  <p className="text-red-300 text-sm text-center">
                    Ошибка при отправке. Пожалуйста, попробуйте ещё раз или напишите нам напрямую.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="gold-button mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "sending" ? "Отправляем..." : "Отправить заявку"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
