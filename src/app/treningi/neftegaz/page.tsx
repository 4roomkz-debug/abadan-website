"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── helpers ── */

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "недр", "углеводород", "коррози",
  "насос", "компрессор", "резервуар", "нефтебаз", "ГСМ",
  "эксплуатац", "интенсификац", "нефтеотдач", "химреагент",
  "сероводород", "обессоливан", "обезвожив", "газлифт",
  "фонтан", "АСПО", "КИП", "автоматизац", "метрологи",
  "контрольно-измерит", "Ротор", "долот", "цементирован",
  "перфорац", "каротаж", "инклинометр", "горизонтальн",
  "газохранилищ", "сепарац", "гидравлик", "магистральн",
  "диспетчериз", "телемеханик", "факельн", "абсорбц",
  "ректификац", "крекинг", "катализ", "нефтехим",
  "битум", "мазут", "дизельн", "бензин",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const neftegazTrainings = SCHEDULE_DATA.filter((item) =>
  isNeftegazTraining(item.name)
);

const programAreas = [
  {
    title: "Бурение и строительство скважин",
    desc: "Проектирование, технологии бурения, крепление, цементирование, горизонтальное бурение",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Добыча и эксплуатация",
    desc: "Разработка месторождений, интенсификация, КРС, ГРП, механизированная добыча, газлифт",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Переработка и нефтехимия",
    desc: "Первичная и глубокая переработка, крекинг, ректификация, контроль качества нефтепродуктов",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Транспортировка и хранение",
    desc: "Магистральные трубопроводы, нефтебазы, газохранилища, диспетчеризация, телемеханика",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Промышленная безопасность",
    desc: "Сероводород, коррозия, экология, охрана труда, аварийные ситуации, стандарты ISO",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "КИПиА и автоматизация",
    desc: "Контрольно-измерительные приборы, метрология, SCADA, автоматизация технологических процессов",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

/* ── Oil Pump Jack Animation ── */

function OilPumpJack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
  });
  // Rocking angle: oscillates as user scrolls
  const rockAngle = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -18, 5, -18, 5, -10]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <div ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2628] via-[#1a2e30] to-[#0a1f21]"></div>

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[150px]"
        style={{ opacity: glowOpacity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[120px]"
        style={{ opacity: glowOpacity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            От <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">скважины</span> до{" "}
            <span className="bg-gradient-to-r from-[#00767D] to-[#009BA3] bg-clip-text text-transparent">переработки</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Полный цикл обучения для специалистов нефтегазовой отрасли
          </p>
        </div>

        {/* Pump Jack SVG */}
        <div className="max-w-lg mx-auto mb-16">
          <svg viewBox="0 0 400 280" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A9BA0" />
                <stop offset="100%" stopColor="#00767D" />
              </linearGradient>
              <linearGradient id="oilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F0BB1E" />
                <stop offset="100%" stopColor="#EBB417" />
              </linearGradient>
            </defs>

            {/* Ground line */}
            <line x1="40" y1="240" x2="360" y2="240" stroke="#00767D" strokeWidth={1} opacity={0.3} />
            <rect x="40" y="240" width="320" height="30" fill="#00767D" opacity={0.05} rx={2} />

            {/* Base / A-frame support */}
            <polygon points="180,240 220,240 210,160 190,160" fill="url(#metalGrad)" opacity={0.9} />
            {/* Cross beam on A-frame */}
            <rect x="188" y="190" width="24" height="3" fill="#009BA3" rx={1} />

            {/* Pivot point */}
            <circle cx="200" cy="155" r="6" fill="#1a2e30" stroke="#F0BB1E" strokeWidth={2} />

            {/* Rocking beam (the walking beam) — pivots at (200, 155) */}
            <motion.g style={{ rotate: rockAngle, x: 0, y: 0 }} transformTemplate={({ rotate }) => `rotate(${rotate} 200 155)`}>
              {/* Main beam */}
              <rect x="105" y="149" width="200" height="12" rx={3} fill="url(#metalGrad)" />

              {/* Horse head (left end) */}
              <path d="M 105 149 Q 95 149, 92 158 L 92 180 Q 92 185, 97 185 L 103 185 Q 108 185, 108 180 L 108 161" fill="url(#metalGrad)" />

              {/* Polished rod (hanging from horse head) */}
              <rect x="96" y="185" width="4" height="55" fill="#009BA3" opacity={0.8} />

              {/* Counterweight (right end) */}
              <rect x="280" y="145" width="30" height="20" rx={3} fill="#546569" />
              <rect x="283" y="148" width="24" height="14" rx={2} fill="#3d5153" />
            </motion.g>

            {/* Motor housing (right side, fixed) */}
            <rect x="240" y="210" width="40" height="30" rx={4} fill="url(#metalGrad)" opacity={0.7} />
            <circle cx="260" cy="225" r="8" fill="#1a2e30" stroke="#00767D" strokeWidth={1.5} />
            <circle cx="260" cy="225" r="3" fill="#F0BB1E" />

            {/* Wellhead (left side, fixed) */}
            <rect x="90" y="230" width="20" height="10" rx={2} fill="url(#metalGrad)" />
            <rect x="95" y="225" width="10" height="5" rx={1} fill="#009BA3" />

            {/* Oil drops — animated */}
            <motion.circle
              cx="100"
              cy="248"
              r="3"
              fill="#F0BB1E"
              style={{ opacity: useTransform(smoothProgress, [0.2, 0.35, 0.5], [0, 1, 0]) }}
            />
            <motion.circle
              cx="100"
              cy="256"
              r="2"
              fill="#EBB417"
              style={{ opacity: useTransform(smoothProgress, [0.4, 0.55, 0.7], [0, 1, 0]) }}
            />
            <motion.circle
              cx="97"
              cy="252"
              r="2.5"
              fill="#F0BB1E"
              style={{ opacity: useTransform(smoothProgress, [0.6, 0.75, 0.9], [0, 1, 0]) }}
            />

            {/* Labels */}
            <text x="200" y="270" textAnchor="middle" fill="#00767D" fontSize="10" fontFamily="Manrope, sans-serif" opacity={0.5}>
              качалка · добыча · обучение
            </text>
          </svg>
        </div>

        {/* Program areas grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {programAreas.map((area, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm scroll-fade-in scroll-delay-${(index % 3) + 1} hover:bg-white/10 transition-colors`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                {area.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Oil Flask Animation ── */

function OilFlask() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  // Oil level rises from bottom of flask: y goes from 260 (empty) to 130 (full)
  const oilLevel = useTransform(smoothProgress, [0, 1], [260, 130]);
  const bubbleOpacity1 = useTransform(smoothProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
  const bubbleOpacity2 = useTransform(smoothProgress, [0.4, 0.55, 0.7], [0, 1, 0]);
  const bubbleOpacity3 = useTransform(smoothProgress, [0.55, 0.7, 0.85], [0, 1, 0]);
  const bubbleY1 = useTransform(smoothProgress, [0.2, 0.5], [240, 180]);
  const bubbleY2 = useTransform(smoothProgress, [0.4, 0.7], [235, 170]);
  const bubbleY3 = useTransform(smoothProgress, [0.55, 0.85], [230, 165]);

  return (
    <div ref={ref} className="max-w-xs mx-auto">
      <svg viewBox="0 0 200 300" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="oilFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0BB1E" stopOpacity={0.9} />
            <stop offset="40%" stopColor="#EBB417" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1a2e30" stopOpacity={0.7} />
          </linearGradient>
          {/* Clip path for flask shape — Erlenmeyer style */}
          <clipPath id="flaskClip">
            <path d="M 75 60 L 75 120 L 35 260 Q 32 270, 42 270 L 158 270 Q 168 270, 165 260 L 125 120 L 125 60 Z" />
          </clipPath>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00767D" stopOpacity={0.3} />
            <stop offset="50%" stopColor="#009BA3" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#00767D" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        {/* Flask outline */}
        <path
          d="M 75 60 L 75 120 L 35 260 Q 32 270, 42 270 L 158 270 Q 168 270, 165 260 L 125 120 L 125 60"
          fill="none"
          stroke="#00767D"
          strokeWidth={2}
          opacity={0.5}
        />
        {/* Glass sheen */}
        <path
          d="M 75 60 L 75 120 L 35 260 Q 32 270, 42 270 L 158 270 Q 168 270, 165 260 L 125 120 L 125 60 Z"
          fill="url(#glassGrad)"
        />
        {/* Neck */}
        <rect x="73" y="40" width="54" height="20" rx={2} fill="none" stroke="#00767D" strokeWidth={2} opacity={0.5} />
        {/* Cork / stopper */}
        <rect x="78" y="32" width="44" height="10" rx={3} fill="#546569" opacity={0.6} />

        {/* Oil liquid — clipped to flask, level rises */}
        <g clipPath="url(#flaskClip)">
          <motion.rect
            x="30"
            width="140"
            height="240"
            fill="url(#oilFill)"
            style={{ y: oilLevel }}
          />
          {/* Oil surface wave */}
          <motion.path
            d="M 30 0 Q 65 -6, 100 0 Q 135 6, 170 0 L 170 10 L 30 10 Z"
            fill="#F0BB1E"
            opacity={0.6}
            style={{ y: oilLevel }}
          />
        </g>

        {/* Bubbles inside flask */}
        <g clipPath="url(#flaskClip)">
          <motion.circle cx="85" r="4" fill="#F0BB1E" opacity={0.4}
            style={{ cy: bubbleY1, opacity: bubbleOpacity1 }} />
          <motion.circle cx="110" r="3" fill="#EBB417" opacity={0.3}
            style={{ cy: bubbleY2, opacity: bubbleOpacity2 }} />
          <motion.circle cx="95" r="2.5" fill="#F0BB1E" opacity={0.35}
            style={{ cy: bubbleY3, opacity: bubbleOpacity3 }} />
        </g>

        {/* Measurement marks on flask */}
        {[160, 190, 220, 250].map((y, i) => (
          <g key={i}>
            <line x1="130" y1={y} x2="140" y2={y} stroke="#00767D" strokeWidth={1} opacity={0.3} />
            <text x="144" y={y + 3} fill="#00767D" fontSize="7" opacity={0.3} fontFamily="Manrope, sans-serif">
              {(4 - i) * 25}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Main Page ── */

export default function NeftegazPage() {
  const [showAll, setShowAll] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: `[Нефтегаз тренинги] Компания: ${fd.get("company") || "—"}`,
        }),
      });
    } catch { /* ok */ }
    setFormStatus("success");
  };

  const visibleTrainings = showAll
    ? neftegazTrainings
    : neftegazTrainings.slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]"
      >
        {/* Parallax ambient glows */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00767D]/10 rounded-full blur-[120px]"
          style={{ y: heroY }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[100px]"
          style={{ y: useTransform(heroScroll, [0, 1], [0, 80]) }}
        />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-white/70">Тренинги</span>
              <span>/</span>
              <span className="text-[#F0BB1E]">Нефтегаз</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F0BB1E] text-sm font-semibold mb-8 scroll-fade-in backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              65+ технических курсов
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight scroll-fade-in scroll-delay-1">
              Технические курсы для{" "}
              <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">
                нефтегазовой отрасли
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl scroll-fade-in scroll-delay-2">
              От бурения до переработки — практические курсы от экспертов с опытом
              работы на крупнейших месторождениях Казахстана
            </p>

            <div className="flex flex-wrap gap-4 mb-12 scroll-fade-in scroll-delay-3">
              <a href="#schedule" className="gold-button">
                Смотреть расписание
              </a>
              <a href="#form" className="dark-button-outline">
                Заказать для компании
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 scroll-fade-in scroll-delay-3">
              {[
                { value: "65+", label: "курсов" },
                { value: "200+", label: "экспертов" },
                { value: "10+", label: "лет опыта" },
                { value: "80%", label: "практики" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F0BB1E]">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Знакомые <span className="text-gradient-primary">проблемы?</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  problem: "Сотрудники учатся по устаревшим методичкам",
                  solution: "Актуальные технологии и стандарты отрасли",
                },
                {
                  problem: "Тренер — теоретик без опыта на производстве",
                  solution: "200+ экспертов-практиков с месторождений",
                },
                {
                  problem: "После обучения ничего не меняется",
                  solution: "80% практики на реальных кейсах вашей компании",
                },
                {
                  problem: "Сложно организовать обучение для вахтовиков",
                  solution: "Гибкие форматы: офлайн, онлайн, модульное",
                },
                {
                  problem: "Нет документов для аудита и сертификации",
                  solution: "Сертификаты и акты — в день завершения",
                },
                {
                  problem: "Один курс не покрывает все специальности",
                  solution: "65+ курсов: от бурения до переработки",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`glass-card p-6 scroll-fade-in scroll-delay-${(index % 3) + 1}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#2D3A3C] font-medium text-sm">{item.problem}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00767D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#00767D] font-medium text-sm">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GROWTH CHART ═══ */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Результат, который <span className="text-gradient-gold">измерим</span>
              </h2>
              <p className="text-lg text-[#546569]">
                Рост компетенций = рост производственных показателей
              </p>
            </div>

            <OilFlask />

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                { value: "↓ 40%", label: "снижение аварийности", desc: "после курсов промышленной безопасности" },
                { value: "↑ 25%", label: "рост производительности", desc: "через 3 месяца после обучения" },
                { value: "↓ 60%", label: "время адаптации", desc: "новых специалистов на объекте" },
              ].map((item, i) => (
                <div key={i} className={`text-center p-6 scroll-fade-in scroll-delay-${i + 1}`}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#00767D] mb-2">
                    {item.value}
                  </div>
                  <p className="text-[#2D3A3C] font-semibold mb-1">{item.label}</p>
                  <p className="text-[#546569] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PIPELINE ANIMATION + PROGRAM AREAS ═══ */}
      <OilPumpJack />

      {/* ═══ SCHEDULE ═══ */}
      <section id="schedule" className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Расписание <span className="text-gradient-primary">курсов</span>
              </h2>
              <p className="text-lg text-[#546569]">
                {neftegazTrainings.length} курсов по нефтегазовой тематике
              </p>
            </div>

            <div className="space-y-3">
              {visibleTrainings.map((training, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#F8FAFA] border border-[#00767D]/8 hover:border-[#00767D]/20 transition-colors scroll-fade-in`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2D3A3C] text-sm sm:text-base">
                      {training.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#7A8B8E]">
                      <span>{training.date}</span>
                      <span>{training.hours} ч.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#2D3A3C]">
                        {training.priceOffline.toLocaleString("ru-RU")} ₸
                      </div>
                      <div className="text-xs text-[#7A8B8E]">офлайн</div>
                    </div>
                    <Link
                      href="/schedule"
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#00767D]/10 text-[#00767D] hover:bg-[#00767D] hover:text-white transition-colors"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {neftegazTrainings.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="teal-button-outline"
                >
                  {showAll
                    ? "Свернуть"
                    : `Показать все ${neftegazTrainings.length} курсов`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CTA + FORM ═══ */}
      <section
        id="form"
        className="py-16 sm:py-24 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Закажите обучение для вашей команды
              </h2>
              <p className="text-lg text-white/60">
                Подберём программу под вашу специфику — от разведки до переработки
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="text-center py-12 scroll-fade-in">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена</h3>
                <p className="text-white/60">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 scroll-fade-in scroll-delay-1">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Ваше имя"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                </div>
                <input
                  name="company"
                  type="text"
                  placeholder="Компания"
                  className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full gold-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Отправка..." : "Получить предложение"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
