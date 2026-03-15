"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SCHEDULE_DATA } from "@/data/schedule";

/* ── helpers ── */

const OG_KEYWORDS = [
  "искусственн интеллект", "ИИ", "AI", "промпт", "нейросет",
  "ChatGPT", "Claude", "автоматизац документ", "ИИ-инструмент",
  "ИИ-агент", "GPT",
];

function isAITraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const aiTrainings = SCHEDULE_DATA.filter((item) =>
  isAITraining(item.name)
);

const programAreas = [
  {
    title: "Быстрый старт в ИИ",
    desc: "Обзор моделей, основы промптов, практика на ежедневных задачах",
    category: "ai-start",
    color: "#F59E0B",
    keywords: ["быстрый старт", "введение в ии", "основы ии", "начало работы"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Промпт-инжиниринг",
    desc: "Структура промптов, цепочки рассуждений, системные промпты, библиотеки",
    category: "prompts",
    color: "#10B981",
    keywords: ["промпт", "prompt"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Автоматизация документов",
    desc: "ИИ для отчётов, КП, деловой переписки, договоров. Экономия 80% времени",
    category: "docs",
    color: "#3B82F6",
    keywords: ["документ", "автоматизац", "отчёт", "переписк", "договор"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "ИИ для HR",
    desc: "Скрининг резюме, AI-видеоинтервью, генерация вакансий, онбординг",
    category: "ai-hr",
    color: "#8B5CF6",
    keywords: ["hr", "рекрутинг", "резюме", "вакансий", "онбординг"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Работа с данными",
    desc: "Анализ таблиц, визуализация, поиск аномалий, суммаризация документов",
    category: "data",
    color: "#06B6D4",
    keywords: ["данных", "аналитик", "таблиц", "визуализац", "суммариз"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "ИИ-агенты",
    desc: "Custom GPTs, Claude Projects, интеграция с почтой и мессенджерами",
    category: "agents",
    color: "#EF4444",
    keywords: ["агент", "gpt", "claude", "интеграц", "автоном"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function getTrainingsByCategory(category: string): typeof aiTrainings {
  const area = programAreas.find((a) => a.category === category);
  if (!area) return aiTrainings;
  return aiTrainings.filter((t) => {
    const lower = t.name.toLowerCase();
    return area.keywords.some((kw) => lower.includes(kw.toLowerCase()));
  });
}

function getCourseCount(category: string): number {
  return getTrainingsByCategory(category).length;
}

function getTrainingCategory(name: string): { label: string; color: string } | null {
  const lower = name.toLowerCase();
  for (const area of programAreas) {
    if (area.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return { label: area.title.split(" ")[0], color: area.color };
    }
  }
  return null;
}

const testimonials = [
  {
    quote: "После курса по промпт-инжинирингу наши юристы сократили время на подготовку договоров на 60%. Теперь ИИ — их ежедневный инструмент.",
    name: "Динара Касымова",
    title: "Директор по персоналу",
    company: "Логистическая компания",
    photo: "/images/ai/person-1.webp",
    initial: "Д",
  },
  {
    quote: "Скептически относился к ИИ, пока не прошёл курс. Теперь автоматизировал отчётность — то, что занимало 2 дня, делаю за 2 часа.",
    name: "Марат Нурланов",
    title: "Финансовый директор",
    company: "Производственный холдинг",
    photo: "/images/ai/person-2.webp",
    initial: "М",
  },
  {
    quote: "Отраслевая программа по ИИ для нефтегаза — именно то, чего нам не хватало. Внедрили ИИ-анализ геоданных, сэкономили миллионы.",
    name: "Алексей Петров",
    title: "Главный инженер",
    company: "Нефтесервисная компания",
    photo: "/images/ai/person-3.webp",
    initial: "А",
  },
];

const trainingPhotos = [
  { src: "/images/ai/training-1.webp", caption: "Практикум по промпт-инжинирингу" },
  { src: "/images/ai/training-2.webp", caption: "Воркшоп: ИИ в бизнес-процессах" },
  { src: "/images/ai/training-3.webp", caption: "Создание ИИ-агентов" },
  { src: "/images/ai/training-4.webp", caption: "Демонстрация ibirAi" },
];

/* ── Program Areas — category cards ── */

function ProgramAreas({ onCategoryClick }: { onCategoryClick: (category: string) => void }) {
  return (
    <div className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#f0f9f9]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-[#2D3A3C]">
            От <span className="text-[#F0BB1E]">промптов</span> до{" "}
            <span className="text-[#00767D]">ИИ-агентов</span>
          </h2>
          <p className="text-lg text-[#546569] max-w-2xl mx-auto">
            Полный цикл ИИ-обучения для вашей команды
          </p>
        </div>

        {/* Program areas grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {programAreas.map((area, index) => (
            <button
              key={index}
              onClick={() => onCategoryClick(area.category)}
              className={`p-6 rounded-2xl bg-white border border-[#E0E8E9] shadow-sm scroll-fade-in scroll-delay-${(index % 3) + 1} hover:bg-[#f0f9f9] hover:shadow-md transition-all text-left group cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mb-4">
                {area.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#2D3A3C]">{area.title}</h3>
              <p className="text-[#546569] text-sm leading-relaxed mb-3">{area.desc}</p>
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
        href="#schedule"
        className="gold-button shadow-2xl shadow-[#F0BB1E]/20 flex items-center gap-2 text-sm sm:text-base"
      >
        Записаться на курс
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
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
    if (!training) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [training, onClose]);

  useEffect(() => {
    if (!training) return;
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
  }, [training, status]);

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
          message: `[AI: ${training.name}] Дата: ${training.date}, Компания: ${fd.get("company") || "—"}`,
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
            <h3 className="text-xl font-bold mb-2" style={{ color: "#ffffff" }}>Заявка отправлена</h3>
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
              <input name="name" type="text" placeholder="Ваше имя" required className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
              <input name="phone" type="tel" placeholder="Телефон" required className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
              <input name="company" type="text" placeholder="Компания (необязательно)" className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all text-sm" />
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
    <div className={`p-6 rounded-2xl bg-white border border-[#E0E8E9] shadow-sm scroll-fade-in scroll-delay-${i + 1}`}>
      <svg className="w-8 h-8 text-[#F0BB1E]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="text-[#546569] text-sm leading-relaxed mb-6">{t.quote}</blockquote>
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
          <p className="text-[#2D3A3C] font-semibold text-sm">{t.name}</p>
          <p className="text-[#7A8B8E] text-xs">{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Metric Card — expandable case study ── */

function MetricCard({ item, index }: { item: { value: string; label: string; desc: string; caseStudy: string; icon: React.ReactNode }; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`text-center p-8 rounded-2xl bg-white border border-[#E0E8E9] shadow-sm scroll-fade-in scroll-delay-${index + 1} hover:bg-[#f0f9f9] hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer text-left`}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mx-auto mb-4">
        {item.icon}
      </div>
      <div className="text-4xl font-extrabold text-[#F0BB1E] mb-2 text-center">{item.value}</div>
      <p className="font-semibold mb-1 text-center text-[#2D3A3C]">{item.label}</p>
      <p className="text-[#546569] text-sm text-center">{item.desc}</p>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#E0E8E9]">
          <p className="text-[#546569] text-sm leading-relaxed">{item.caseStudy}</p>
        </div>
      )}
      <p className="text-[#00767D] text-xs mt-3 text-center font-medium">
        {expanded ? "Свернуть" : "Подробнее"}
      </p>
    </button>
  );
}

/* ── Client logos ── */

const AI_CLIENT_LOGOS = [
  { name: "Самрук-Казына", logo: "/images/clients/samruk.png" },
  { name: "Kaspi Bank", logo: "/images/clients/kaspi.png" },
  { name: "Kcell", logo: "/images/clients/kcell.png" },
  { name: "КТЖ", logo: "/images/clients/ktj.png" },
  { name: "inDrive", logo: "/images/clients/indrive.png" },
  { name: "Рахат", logo: "/images/clients/rakhat.png" },
  { name: "Santo", logo: "/images/clients/santo.png" },
  { name: "Атамекен", logo: "/images/clients/atameken.png" },
];

/* ── Neural Background — particle network animation ── */

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; color: string;
}

function NeuralBackground({ particleCount = 50, connectionDistance = 150, opacity = 0.35 }: {
  particleCount?: number; connectionDistance?: number; opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#00767D", "#14B8A6", "#F0BB1E", "#EBB417"];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > rect.width) { p.vx *= -1; p.x = Math.max(0, Math.min(rect.width, p.x)); }
        if (p.y < 0 || p.y > rect.height) { p.vy *= -1; p.y = Math.max(0, Math.min(rect.height, p.y)); }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * 2.5;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / connectionDistance) * opacity * 1.5;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => { resizeCanvas(); initParticles(); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener("resize", handleResize); };
  }, [particleCount, connectionDistance, opacity]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }} />;
}

/* ── AI Clients section ── */

function AIClients() {
  const duplicated = [...AI_CLIENT_LOGOS, ...AI_CLIENT_LOGOS];
  return (
    <section className="relative py-16 sm:py-24 bg-[#f0f9f9] overflow-hidden">
      <NeuralBackground particleCount={50} connectionDistance={150} opacity={0.35} />
      <div className="relative z-10">
        <div className="text-center mb-10 px-4">
          <span className="inline-block px-4 py-2 bg-[#00767D]/10 text-[#00767D] rounded-full text-sm font-medium mb-4 scroll-fade-in">
            Нам доверяют
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3A3C] mb-4 scroll-fade-in scroll-delay-1">
            Лидеры <span className="text-[#F0BB1E]">рынка</span> выбирают нас
          </h2>
          <p className="text-[#546569] max-w-2xl mx-auto text-lg scroll-fade-in scroll-delay-2">
            Крупнейшие компании Казахстана доверяют нам ИИ-обучение своих команд
          </p>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.div
            className="flex items-center gap-6 md:gap-8"
            animate={{ x: [0, -156 * AI_CLIENT_LOGOS.length] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
          >
            {duplicated.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-xl min-w-[130px] md:min-w-[140px] h-[70px] md:h-20 shadow-md hover:shadow-lg border border-[#00767D]/10 transition-shadow"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-10 md:max-h-12"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto text-center px-4">
          <div className="p-3 md:p-6 rounded-2xl bg-white shadow-sm border border-[#00767D]/10 scroll-fade-in">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#00767D] mb-1 md:mb-2">8+</div>
            <div className="text-[#546569] text-xs md:text-base">программ</div>
          </div>
          <div className="p-3 md:p-6 rounded-2xl bg-white shadow-sm border border-[#00767D]/10 scroll-fade-in scroll-delay-1">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F0BB1E] mb-1 md:mb-2">150+</div>
            <div className="text-[#546569] text-xs md:text-base">специалистов</div>
          </div>
          <div className="p-3 md:p-6 rounded-2xl bg-white shadow-sm border border-[#00767D]/10 scroll-fade-in scroll-delay-2">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#00767D] mb-1 md:mb-2">80%</div>
            <div className="text-[#546569] text-xs md:text-base">практики</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ── */

export default function AIPage() {
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
          message: `[AI тренинги] Компания: ${fd.get("company") || "—"}, Сотрудников: ${fd.get("employees") || "—"}, Направление: ${fd.get("direction") || "—"}`,
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
    : aiTrainings;
  const visibleTrainings = showAll
    ? filteredTrainings
    : filteredTrainings.slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background layer: image + overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
          <Image
            src="/images/ai/hero-poster.webp"
            alt=""
            fill
            className="object-cover"
            priority
            onError={() => {}}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          {/* Ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00767D]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#F0BB1E]/10 rounded-full blur-[100px]" />
        </div>

        {/* Content layer — above everything */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-[#7A9EA3] mb-8 scroll-fade-in">
              <Link href="/" className="hover:text-white transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-[#7A9EA3]">Тренинги</span>
              <span>/</span>
              <span className="text-[#F0BB1E]">ИИ для бизнеса</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F0BB1E] text-sm font-semibold mb-8 scroll-fade-in backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              8+ ИИ-курсов и практикумов
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight scroll-fade-in scroll-delay-1"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
            >
              Искусственный интеллект{" "}
              <br className="hidden sm:block" />
              для вашего{" "}
              <span className="text-[#F0BB1E]">бизнеса</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#D4E4E7] mb-10 max-w-2xl scroll-fade-in scroll-delay-2">
              От промпт-инжиниринга до создания ИИ-агентов — практические навыки для вашей команды
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
                { value: "8+", label: "программ ИИ" },
                { value: "150+", label: "специалистов" },
                { value: "80%", label: "экономии времени" },
                { value: "4.8", label: "средняя оценка" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F0BB1E]">
                    {stat.value}
                  </div>
                  <div className="text-[#B8CDD0] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>

      {/* ═══ CLIENTS (НАМ ДОВЕРЯЮТ) ═══ */}
      <AIClients />

      {/* ═══ PROGRAM AREAS ═══ */}
      <ProgramAreas onCategoryClick={setActiveCategory} />

      {/* ═══ SCHEDULE ═══ */}
      <section id="schedule" ref={scheduleRef} className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Расписание <span className="text-gradient-primary">курсов</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                {filteredTrainings.length} курсов {activeCategory ? "в выбранной категории" : "по ИИ-тематике"}
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
                Все ({aiTrainings.length})
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
            {visibleTrainings.length > 0 ? (
              <div className="space-y-3">
                {visibleTrainings.map((training, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#F8FAFA] border border-[#00767D]/8 hover:border-[#00767D]/20 transition-colors scroll-fade-in"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#2D3A3C] text-sm sm:text-base">{training.name}</h3>
                        {(() => {
                          const cat = getTrainingCategory(training.name);
                          return cat ? (
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white flex-shrink-0"
                              style={{ backgroundColor: cat.color }}
                            >
                              {cat.label}
                            </span>
                          ) : null;
                        })()}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#546569]">
                        <span>{training.date}</span>
                        <span>{training.hours} ч.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
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
                        className="px-4 py-2 text-xs font-semibold rounded-lg gold-button whitespace-nowrap"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-[#546569]">
                <div className="w-16 h-16 rounded-full bg-[#00767D]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[#2D3A3C] mb-2">Курсы в разработке</p>
                <p className="text-sm">Оставьте заявку — подберём программу под ваши задачи</p>
                <a href="#form" className="mt-6 inline-block gold-button">Оставить заявку</a>
              </div>
            )}

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

      {/* ═══ TRAINING GALLERY ═══ */}
      <section className="py-16 sm:py-24 bg-[#f8f7f4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Как проходит <span className="text-gradient-primary">обучение</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                80% практики на реальных кейсах и инструментах
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/3] group scroll-fade-in scroll-delay-${i + 1} bg-gradient-to-br from-[#1a2e30] to-[#0d2628]`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => {}}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ METRICS + TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-24 bg-[#f8f7f4] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Metrics */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#2D3A3C]">
                Результат, который <span className="text-[#F0BB1E]">измерим</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-20">
              {[
                {
                  value: "80%",
                  label: "экономии времени",
                  desc: "на рутинных документах с ИИ",
                  caseStudy: "Обучили команду бэк-офиса банка (25 человек) работе с ИИ для документооборота. Время подготовки типовых документов сократилось с 4 часов до 45 минут. Годовая экономия — 3,200 рабочих часов.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  value: "8",
                  label: "программ обучения",
                  desc: "от базового до продвинутого уровня",
                  caseStudy: "Разработали 8-модульную программу ИИ-трансформации для нефтегазовой компании. За 3 месяца обучили 150 сотрудников от менеджеров до инженеров. Каждый департамент внедрил минимум 3 ИИ-инструмента.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                },
                {
                  value: "150+",
                  label: "обученных специалистов",
                  desc: "в Казахстане и СНГ",
                  caseStudy: "Провели корпоративное обучение для 5 крупных компаний Казахстана. Средняя оценка курсов — 4.8/5. 92% участников активно используют ИИ через месяц после обучения.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <MetricCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* Testimonials */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#2D3A3C]">
                Отзывы <span className="text-[#00767D]">клиентов</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BEFORE / AFTER — Comparison ═══ */}
      <section className="py-16 sm:py-24 bg-[#f0f9f9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <span className="inline-block px-4 py-2 bg-[#00767D]/10 text-[#00767D] rounded-full text-sm font-medium mb-4">
                Сравните результаты
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C]">
                Что меняется после <span className="text-[#00767D]">обучения</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg scroll-fade-in scroll-delay-1">
              {/* Before */}
              <div className="bg-white p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3A3C] uppercase tracking-wider">До обучения</h3>
                </div>
                <div className="space-y-5">
                  {[
                    "Сотрудники боятся ИИ или не понимают, зачем он нужен",
                    "Рутинная работа отнимает 60% рабочего времени",
                    "Компания отстаёт от конкурентов в цифровизации",
                    "Нет понимания, какие процессы можно автоматизировать",
                  ].map((problem, i) => (
                    <div key={i} className={`flex items-start gap-3 scroll-fade-in-left scroll-delay-${(i % 3) + 1}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0 mt-2.5" />
                      <p className="text-[#546569] leading-relaxed">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="bg-[#00767D] p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">После обучения</h3>
                </div>
                <div className="space-y-5">
                  {[
                    "Каждый сотрудник уверенно использует ИИ-инструменты",
                    "Рутина автоматизирована — фокус на стратегических задачах",
                    "Компания — лидер цифровой трансформации в отрасли",
                    "Чёткая дорожная карта внедрения ИИ",
                  ].map((solution, i) => (
                    <div key={i} className={`flex items-start gap-3 scroll-fade-in-right scroll-delay-${(i % 3) + 1}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F0BB1E] flex-shrink-0 mt-2.5" />
                      <p className="text-white/90 leading-relaxed">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA + FORM ═══ */}
      <section
        id="form"
        className="py-16 sm:py-24 bg-[#00767D] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0BB1E]/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
                Закажите ИИ-обучение для вашей команды
              </h2>
              <p className="text-lg text-white/80">
                Подберём программу под ваши задачи — от быстрого старта до полной ИИ-трансформации
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="text-center py-12 scroll-fade-in">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Заявка отправлена</h3>
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
                    className="w-full px-5 py-4 bg-white/15 border border-white/20 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="w-full px-5 py-4 bg-white/15 border border-white/20 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                </div>
                <input
                  name="company"
                  type="text"
                  placeholder="Компания"
                  className="w-full px-5 py-4 bg-white/15 border border-white/20 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="employees"
                    type="number"
                    placeholder="Количество сотрудников (~)"
                    className="w-full px-5 py-4 bg-white/15 border border-white/20 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  <select
                    name="direction"
                    className="w-full px-5 py-4 bg-white/15 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Направление обучения</option>
                    {programAreas.map((area) => (
                      <option key={area.category} value={area.category}>
                        {area.title}
                      </option>
                    ))}
                    <option value="other">Другое</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full gold-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Отправка..." : "Получить предложение"}
                </button>
                <p className="text-center text-white/60 text-sm mt-3">Подготовим предложение за 24 часа</p>
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
