"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
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
    category: "drilling",
    keywords: ["бурен", "скважин", "цементирован", "долот", "каротаж", "перфорац", "инклинометр", "горизонтальн", "Ротор"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Добыча и эксплуатация",
    desc: "Разработка месторождений, интенсификация, КРС, ГРП, механизированная добыча, газлифт",
    category: "extraction",
    keywords: ["добыч", "эксплуатац", "КРС", "ГРП", "НГДУ", "интенсификац", "нефтеотдач", "газлифт", "фонтан", "АСПО", "насос", "месторожден", "промыслов", "пласт"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Переработка и нефтехимия",
    desc: "Первичная и глубокая переработка, крекинг, ректификация, контроль качества нефтепродуктов",
    category: "refining",
    keywords: ["переработк", "крекинг", "ректификац", "катализ", "нефтехим", "битум", "мазут", "дизельн", "бензин", "абсорбц", "обессоливан", "обезвожив", "сепарац"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Транспортировка и хранение",
    desc: "Магистральные трубопроводы, нефтебазы, газохранилища, диспетчеризация, телемеханика",
    category: "transport",
    keywords: ["трубопровод", "нефтебаз", "газохранилищ", "магистральн", "резервуар", "ГСМ", "диспетчериз", "телемеханик"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Промышленная безопасность",
    desc: "Сероводород, коррозия, экология, охрана труда, аварийные ситуации, стандарты ISO",
    category: "safety",
    keywords: ["сероводород", "коррози", "факельн"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "КИПиА и автоматизация",
    desc: "Контрольно-измерительные приборы, метрология, SCADA, автоматизация технологических процессов",
    category: "automation",
    keywords: ["КИП", "автоматизац", "метрологи", "контрольно-измерит"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function getTrainingsByCategory(category: string): typeof neftegazTrainings {
  const area = programAreas.find((a) => a.category === category);
  if (!area) return neftegazTrainings;
  return neftegazTrainings.filter((t) => {
    const lower = t.name.toLowerCase();
    return area.keywords.some((kw) => lower.includes(kw.toLowerCase()));
  });
}

function getCourseCount(category: string): number {
  return getTrainingsByCategory(category).length;
}

const testimonials = [
  {
    quote: "После внедрения программы обучения от Abadan аварийность на наших объектах снизилась на 40%, а время адаптации новых специалистов сократилось вдвое",
    name: "Марат Кенжебаев",
    title: "Начальник отдела обучения",
    company: "Нефтесервисная компания",
    photo: "/images/neftegaz/person-1.webp",
    initial: "М",
  },
  {
    quote: "Мы обучили более 150 сотрудников за год. Качество подготовки и гибкость форматов — именно то, что нужно для нашего производственного графика",
    name: "Айгуль Нурланова",
    title: "HR-директор",
    company: "Нефтеперерабатывающий завод",
    photo: "/images/neftegaz/person-2.webp",
    initial: "А",
  },
  {
    quote: "Курсы по бурению и КРС полностью соответствуют реалиям месторождений Западного Казахстана. Наши инженеры сразу применяют полученные знания",
    name: "Серик Абдрахманов",
    title: "Главный инженер",
    company: "Буровая компания",
    photo: "/images/neftegaz/person-3.webp",
    initial: "С",
  },
];

const trainingPhotos = [
  { src: "/images/neftegaz/training-1.webp", caption: "Теоретическая подготовка" },
  { src: "/images/neftegaz/training-2.webp", caption: "Практика на оборудовании" },
  { src: "/images/neftegaz/training-3.webp", caption: "Обучение на объекте" },
  { src: "/images/neftegaz/training-4.webp", caption: "Выдача сертификатов" },
];

/* ── Pitman arm — imperatively updates SVG line attributes from motion values ── */

import type { MotionValue } from "framer-motion";

function PitmanArm({ x1, y1, y2 }: { x1: MotionValue<number>; y1: MotionValue<number>; y2: MotionValue<number> }) {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const unsubs = [
      x1.on("change", (v) => lineRef.current?.setAttribute("x1", String(v))),
      y1.on("change", (v) => lineRef.current?.setAttribute("y1", String(v))),
      y2.on("change", (v) => lineRef.current?.setAttribute("y2", String(v))),
    ];
    return () => unsubs.forEach((u) => u());
  }, [x1, y1, y2]);

  return (
    <line
      ref={lineRef}
      x1={355} y1={182} x2={300} y2={137}
      stroke="#5CB8BD"
      strokeWidth={5}
      strokeLinecap="round"
      opacity={0.9}
    />
  );
}

/* ── Oil Pump Jack Animation — continuous mechanical motion ── */

function OilPumpJack({ onCategoryClick }: { onCategoryClick: (category: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const crankAngle = useMotionValue(0);

  // Start animation when section enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Continuous crank rotation — 6 seconds per revolution (realistic 10 strokes/min)
  useAnimationFrame((t) => {
    if (!isVisible) return;
    crankAngle.set((t / 6000) * 360 % 360);
  });

  // Crank geometry: center (355, 222), radius 40
  const CRANK_CX = 355, CRANK_CY = 222, CRANK_R = 40;
  const PIVOT_X = 205, PIVOT_Y = 137;
  const BEAM_RIGHT = 300; // pitman attaches here on the beam

  // Walking beam angle from crank — direct geometry
  const beamAngle = useTransform(crankAngle, (angle) => {
    const rad = (angle * Math.PI) / 180;
    const crankTipY = Math.sin(rad) * CRANK_R;
    return Math.atan2(crankTipY, BEAM_RIGHT - PIVOT_X) * (180 / Math.PI);
  });

  // Sucker rod: leverage ratio amplifies horsehead movement
  // Lever = (PIVOT_X - HORSEHEAD_X) / (BEAM_RIGHT - PIVOT_X) ≈ 1.5
  const rodY = useTransform(crankAngle, (angle) => {
    const rad = (angle * Math.PI) / 180;
    const crankTipY = Math.sin(rad) * CRANK_R;
    return -crankTipY * 1.5; // negative = opposite direction, amplified by lever
  });

  // Pitman arm: connects crank pin to beam attachment
  const pitmanX1 = useTransform(crankAngle, (a) => {
    return CRANK_CX + CRANK_R * Math.sin((a * Math.PI) / 180);
  });
  const pitmanY1 = useTransform(crankAngle, (a) => {
    return CRANK_CY - CRANK_R * Math.cos((a * Math.PI) / 180);
  });
  const pitmanY2 = useTransform(beamAngle, (a) => {
    return PIVOT_Y + (BEAM_RIGHT - PIVOT_X) * Math.sin((a * Math.PI) / 180);
  });

  // Oil drop cycle tied to crank (drops appear on upstroke)
  const dropOpacity1 = useTransform(crankAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    const upstroke = Math.sin(rad);
    return upstroke > 0.3 ? (upstroke - 0.3) / 0.7 : 0;
  });
  const dropOpacity2 = useTransform(crankAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    const upstroke = Math.sin(rad);
    return upstroke > 0.6 ? (upstroke - 0.6) / 0.4 * 0.7 : 0;
  });
  const dropY1 = useTransform(crankAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    const phase = (Math.sin(rad) + 1) / 2;
    return 260 + phase * 12;
  });
  const dropY2 = useTransform(crankAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    const phase = (Math.sin(rad - 1) + 1) / 2;
    return 262 + phase * 10;
  });

  return (
    <div ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2628] via-[#1a2e30] to-[#0a1f21]"></div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            От <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">скважины</span> до{" "}
            <span className="bg-gradient-to-r from-[#00767D] to-[#009BA3] bg-clip-text text-transparent">переработки</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Полный цикл обучения для специалистов нефтегазовой отрасли
          </p>
        </div>

        {/* Pump Jack SVG — realistic proportions */}
        <div className="max-w-lg mx-auto mb-16">
          <svg viewBox="0 0 500 300" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5CB8BD" />
                <stop offset="100%" stopColor="#00767D" />
              </linearGradient>
              <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3d5153" />
                <stop offset="100%" stopColor="#2D3A3C" />
              </linearGradient>
            </defs>

            {/* Ground */}
            <rect x="30" y="258" width="440" height="2" fill="#00767D" opacity={0.2} rx={1} />
            <rect x="30" y="260" width="440" height="35" fill="#00767D" opacity={0.04} rx={4} />

            {/* ── Fixed elements ── */}

            {/* Base platform */}
            <rect x="170" y="248" width="70" height="10" rx={2} fill="url(#darkMetal)" />

            {/* Samson Post (A-frame) */}
            <polygon points="185,248 225,248 215,140 195,140" fill="url(#metalGrad)" />
            {/* Cross braces */}
            <rect x="193" y="180" width="24" height="3" rx={1} fill="#009BA3" opacity={0.8} />
            <rect x="196" y="210" width="18" height="2" rx={1} fill="#009BA3" opacity={0.5} />

            {/* Pivot bearing at top of Samson Post */}
            <circle cx="205" cy="137" r="7" fill="#0d2628" stroke="#F0BB1E" strokeWidth={2.5} />

            {/* ── Walking beam — pivots at (205, 137) ── */}
            <motion.g
              style={{ rotate: beamAngle }}
              transformTemplate={({ rotate }) => `rotate(${rotate} 205 137)`}
            >
              {/* Main beam */}
              <rect x="65" y="130" width="260" height="14" rx={4} fill="url(#metalGrad)" />
              {/* Top highlight */}
              <rect x="65" y="130" width="260" height="4" rx={2} fill="#5CB8BD" opacity={0.3} />

              {/* Horsehead (left end — curved profile) */}
              <path
                d="M 72 130 Q 55 128, 50 140 L 48 170 Q 47 178, 55 180 L 68 180 Q 76 180, 76 172 L 76 144"
                fill="url(#metalGrad)"
              />
              {/* Horsehead arc detail */}
              <path
                d="M 55 180 L 55 188 Q 55 192, 60 192 L 65 192 Q 70 192, 70 188 L 70 180"
                fill="#009BA3"
              />

              {/* Pitman arm attachment point (right side of beam) */}
              <circle cx="300" cy="137" r="4" fill="#0d2628" stroke="#009BA3" strokeWidth={1.5} />
            </motion.g>

            {/* ── Sucker rod — moves up/down with horsehead ── */}
            <motion.g style={{ y: rodY }}>
              <rect x="59" y="192" width="5" height="66" rx={1} fill="#009BA3" opacity={0.8} />
              {/* Rod clamp */}
              <rect x="56" y="195" width="11" height="4" rx={1} fill="#546569" />
            </motion.g>

            {/* Wellhead (fixed) */}
            <rect x="52" y="243" width="20" height="15" rx={2} fill="url(#metalGrad)" />
            <rect x="56" y="238" width="12" height="5" rx={1} fill="#009BA3" />
            {/* Wellhead valve */}
            <circle cx="62" cy="240" r="2.5" fill="#F0BB1E" />

            {/* ── Crank mechanism (right side) ── */}

            {/* Gear box */}
            <rect x="330" y="225" width="50" height="33" rx={5} fill="url(#darkMetal)" />
            <rect x="333" y="228" width="44" height="27" rx={3} fill="#2D3A3C" />

            {/* Crank shaft bearing ring */}
            <circle cx="355" cy="222" r="14" fill="none" stroke="#5CB8BD" strokeWidth={2} opacity={0.4} />
            <circle cx="355" cy="222" r="18" fill="none" stroke="#00767D" strokeWidth={1} opacity={0.2} />
            {/* Crank shaft center */}
            <circle cx="355" cy="222" r="8" fill="#0d2628" stroke="#F0BB1E" strokeWidth={2.5} />

            {/* Rotating crank arm + counterweight */}
            <motion.g
              style={{ rotate: crankAngle }}
              transformTemplate={({ rotate }) => `rotate(${rotate} 355 222)`}
            >
              {/* Crank arm */}
              <rect x="350" y="178" width="10" height="88" rx={3} fill="url(#metalGrad)" />
              {/* Counterweight (heavy block at bottom) */}
              <rect x="336" y="254" width="38" height="18" rx={4} fill="#546569" />
              <rect x="339" y="257" width="32" height="12" rx={3} fill="#3d5153" />
              {/* Crank pin (top — where pitman connects) */}
              <circle cx="355" cy="182" r="5" fill="#F0BB1E" />
            </motion.g>

            {/* Gearbox support legs */}
            <rect x="335" y="258" width="8" height="10" rx={1} fill="url(#metalGrad)" opacity={0.6} />
            <rect x="367" y="258" width="8" height="10" rx={1} fill="url(#metalGrad)" opacity={0.6} />

            {/* Motor */}
            <rect x="390" y="238" width="30" height="20" rx={3} fill="url(#metalGrad)" opacity={0.7} />
            {/* Motor flywheel */}
            <circle cx="390" cy="248" r="6" fill="none" stroke="#009BA3" strokeWidth={1.5} opacity={0.5} />
            {/* Belt/drive line */}
            <line x1="384" y1="248" x2="380" y2="240" stroke="#009BA3" strokeWidth={1.5} opacity={0.4} />
            <line x1="380" y1="240" x2="355" y2="234" stroke="#009BA3" strokeWidth={1} opacity={0.3} strokeDasharray="3,2" />

            {/* ── Pitman arm — connects crank pin to beam ── */}
            <PitmanArm
              x1={pitmanX1} y1={pitmanY1} y2={pitmanY2}
            />

            {/* ── Oil drops from wellhead ── */}
            <motion.circle
              cx="62"
              r="3"
              fill="#F0BB1E"
              style={{ cy: dropY1, opacity: dropOpacity1 }}
            />
            <motion.circle
              cx="58"
              r="2"
              fill="#EBB417"
              style={{ cy: dropY2, opacity: dropOpacity2 }}
            />
          </svg>
        </div>

        {/* Program areas grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {programAreas.map((area, index) => (
            <button
              key={index}
              onClick={() => onCategoryClick(area.category)}
              className={`p-6 rounded-2xl bg-white/[0.12] border border-white/20 backdrop-blur-sm scroll-fade-in scroll-delay-${(index % 3) + 1} hover:bg-white/[0.18] transition-all text-left group cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                {area.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-3">{area.desc}</p>
              <span className="text-[#F0BB1E] text-sm font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                {getCourseCount(area.category)} курсов
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */

/* ── Sticky CTA — appears after hero ── */

function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <a
        href="#form"
        className="gold-button shadow-2xl shadow-[#F0BB1E]/20 flex items-center gap-2 text-sm sm:text-base"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Заказать обучение
      </a>
    </div>
  );
}

/* ── Enrollment Modal ── */

function EnrollmentModal({
  training,
  onClose,
}: {
  training: { name: string; date: string; priceOffline: number } | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [status]);

  if (!training) return null;

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
          message: `[Нефтегаз: ${training.name}] Дата: ${training.date}, Компания: ${fd.get("company") || "—"}`,
        }),
      });
    } catch { /* ok */ }
    setStatus("success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
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
          <div className="text-center py-6" aria-live="polite">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена</h3>
            <p className="text-white/70 text-sm">Мы свяжемся с вами для подтверждения записи</p>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-xl font-bold text-white mb-1">Записаться на курс</h2>
            <p className="text-[#F0BB1E] font-medium text-sm mb-1">{training.name}</p>
            <div className="flex gap-4 text-white/60 text-xs mb-6">
              <span>{training.date}</span>
              <span>{training.priceOffline.toLocaleString("ru-RU")} ₸</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" type="text" placeholder="Ваше имя" required className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
              <input name="phone" type="tel" placeholder="Телефон" required className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
              <input name="company" type="text" placeholder="Компания (необязательно)" className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
              <button type="submit" disabled={status === "sending"} className="w-full gold-button text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "sending" ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Testimonial Card ── */

function TestimonialCard({ testimonial: t, index: i }: { testimonial: typeof testimonials[0]; index: number }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  return (
    <div className={`p-6 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}>
      <svg className="w-8 h-8 text-[#F0BB1E]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="text-white/90 text-sm leading-relaxed mb-6">{t.quote}</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          {photoFailed ? (
            <div className="w-full h-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t.initial}</span>
            </div>
          ) : (
            <Image src={t.photo} alt={t.name} width={40} height={40} className="object-cover w-full h-full" onError={() => setPhotoFailed(true)} />
          )}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-white/50 text-xs">{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Client logos — oil & gas companies with real images ── */

const OG_CLIENT_LOGOS = [
  { name: "КазМунайГаз", logo: "/images/clients/kmg.png" },
  { name: "КазРосГаз", logo: "/images/clients/kazrosgaz.png" },
  { name: "ПетроКазахстан", logo: "/images/clients/petro.png" },
  { name: "Кашаган", logo: "/images/clients/kashagan.png" },
  { name: "ММГ", logo: "/images/clients/mmg.png" },
  { name: "КБМ", logo: "/images/clients/kbm.png" },
  { name: "Самрук-Казына", logo: "/images/clients/samruk.png" },
  { name: "Kazminerals", logo: "/images/clients/kazminerals.png" },
];

/* ── Main Page ── */

export default function NeftegazPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [enrollTraining, setEnrollTraining] = useState<{ name: string; date: string; priceOffline: number } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
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

  useEffect(() => {
    if (activeCategory !== null && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeCategory]);

  const filteredTrainings = activeCategory
    ? getTrainingsByCategory(activeCategory)
    : neftegazTrainings;
  const visibleTrainings = showAll
    ? filteredTrainings
    : filteredTrainings.slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Video background with fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]">
          <video
            autoPlay muted loop playsInline
            poster="/images/neftegaz/hero-poster.webp"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none"; }}
          >
            <source src="/videos/neftegaz-hero.webm" type="video/webm" />
            <source src="/videos/neftegaz-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-white transition-colors">
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

            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl scroll-fade-in scroll-delay-2">
              От бурения до переработки — практические курсы от экспертов с опытом
              работы на крупнейших месторождениях Казахстана
            </p>

            <div className="flex flex-wrap gap-4 mb-12 scroll-fade-in scroll-delay-3">
              <a href="#form" className="gold-button">
                Заказать обучение
              </a>
              <a href="#schedule" className="dark-button-outline">
                Смотреть курсы
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
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Client logos — scrolling marquee with real images */}
            <div className="mt-14 scroll-fade-in scroll-delay-3">
              <p className="text-white/80 text-xs uppercase tracking-widest mb-6 text-center font-semibold">Нам доверяют</p>
              <div className="overflow-hidden">
                <motion.div
                  className="flex items-center gap-5"
                  animate={{ x: [0, -148 * OG_CLIENT_LOGOS.length] }}
                  transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
                >
                  {[...OG_CLIENT_LOGOS, ...OG_CLIENT_LOGOS].map((client, i) => (
                    <div
                      key={`${client.name}-${i}`}
                      className="flex-shrink-0 flex items-center justify-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl min-w-[120px] h-[56px] border border-white/10"
                    >
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={90}
                        height={40}
                        className="object-contain max-h-8 brightness-0 invert opacity-80"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ PUMP JACK + PROGRAM AREAS ═══ */}
      <OilPumpJack onCategoryClick={setActiveCategory} />

      {/* ═══ SCHEDULE ═══ */}
      <section id="schedule" ref={scheduleRef} className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Расписание <span className="text-gradient-primary">курсов</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                {filteredTrainings.length} курсов {activeCategory ? "в выбранной категории" : "по нефтегазовой тематике"}
              </p>
            </div>

            {/* Category filter bar */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center scroll-fade-in">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeCategory === null
                    ? "bg-[#00767D] text-white"
                    : "bg-[#00767D]/10 text-[#00767D] hover:bg-[#00767D]/20"
                }`}
              >
                Все ({neftegazTrainings.length})
              </button>
              {programAreas.map((area) => (
                <button
                  key={area.category}
                  onClick={() => setActiveCategory(area.category)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === area.category
                      ? "bg-[#00767D] text-white"
                      : "bg-[#00767D]/10 text-[#00767D] hover:bg-[#00767D]/20"
                  }`}
                >
                  {area.title.split(" ")[0]} ({getCourseCount(area.category)})
                </button>
              ))}
            </div>

            {/* Training list */}
            <div className="space-y-3">
              {visibleTrainings.map((training, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#F8FAFA] border border-[#00767D]/8 hover:border-[#00767D]/20 transition-colors scroll-fade-in"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2D3A3C] text-sm sm:text-base">{training.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#546569]">
                      <span>{training.date}</span>
                      <span>{training.hours} ч.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#2D3A3C]">
                        {training.priceOffline.toLocaleString("ru-RU")} ₸
                      </div>
                      <div className="text-xs text-[#546569]">офлайн</div>
                    </div>
                    <button
                      onClick={() => setEnrollTraining({
                        name: training.name,
                        date: training.date,
                        priceOffline: training.priceOffline,
                      })}
                      className="px-4 py-2 text-xs font-semibold rounded-lg gold-button"
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrainings.length > 12 && (
              <div className="text-center mt-8">
                <button onClick={() => setShowAll(!showAll)} className="teal-button-outline">
                  {showAll ? "Свернуть" : `Показать все ${filteredTrainings.length} курсов`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ PAIN POINTS — Split Screen ═══ */}
      <section className="py-0 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left — Problems (dark) */}
          <div className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] p-10 sm:p-16 lg:p-20">
            <div className="max-w-lg ml-auto">
              <p className="text-red-400/80 text-xs uppercase tracking-widest font-semibold mb-4 scroll-fade-in">Знакомые проблемы?</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 scroll-fade-in scroll-delay-1">
                Без системного обучения <span className="text-red-400">теряете</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Сотрудники учатся по устаревшим методичкам",
                  "Тренер — теоретик без опыта на производстве",
                  "После обучения ничего не меняется",
                  "Сложно организовать обучение для вахтовиков",
                  "Нет документов для аудита и сертификации",
                  "Один курс не покрывает все специальности",
                ].map((problem, i) => (
                  <div key={i} className={`flex items-start gap-4 scroll-fade-in-left scroll-delay-${(i % 3) + 1}`}>
                    <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white/80 font-medium">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Solutions (light) */}
          <div className="bg-[#F8FAFA] p-10 sm:p-16 lg:p-20">
            <div className="max-w-lg">
              <p className="text-[#00767D] text-xs uppercase tracking-widest font-semibold mb-4 scroll-fade-in">Наш подход</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-10 scroll-fade-in scroll-delay-1">
                С нами вы <span className="text-gradient-primary">получаете</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Актуальные технологии и стандарты отрасли",
                  "200+ экспертов-практиков с месторождений",
                  "80% практики на реальных кейсах вашей компании",
                  "Гибкие форматы: офлайн, онлайн, модульное",
                  "Сертификаты и акты — в день завершения",
                  "65+ курсов: от бурения до переработки",
                ].map((solution, i) => (
                  <div key={i} className={`flex items-start gap-4 scroll-fade-in-right scroll-delay-${(i % 3) + 1}`}>
                    <div className="w-7 h-7 rounded-full bg-[#00767D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#00767D]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#2D3A3C] font-medium">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
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
              <p className="text-lg text-white/80">
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
                <p className="text-white/80">Мы свяжемся с вами в ближайшее время</p>
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

      {/* Sticky CTA */}
      <StickyCTA />

      {/* Enrollment Modal */}
      <EnrollmentModal training={enrollTraining} onClose={() => setEnrollTraining(null)} />
    </div>
  );
}
