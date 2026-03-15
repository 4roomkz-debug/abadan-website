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
  "лидер", "руковод", "управлен", "менеджмент", "команд", "мотивац",
  "делегирован", "переговор", "коммуникац", "презентац", "конфликт",
  "стресс", "тайм-менеджмент", "эмоциональн интеллект", "публичн выступлен",
  "обратн связ", "коучинг", "наставнич", "изменен", "стратег",
  "принятие решен", "критическ мышлен",
];

function isLeadershipTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const leadershipTrainings = SCHEDULE_DATA.filter((item) =>
  isLeadershipTraining(item.name)
);

const programAreas = [
  {
    title: "Лидерство и управление",
    desc: "Управление командой, делегирование, принятие решений",
    category: "leadership",
    color: "#3B82F6",
    keywords: ["лидер", "руковод", "управлен команд", "делегирован", "принятие решен"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Переговоры и коммуникации",
    desc: "Деловые переговоры, публичные выступления, презентации",
    category: "negotiation",
    color: "#10B981",
    keywords: ["переговор", "коммуникац", "презентац", "публичн выступлен", "обратн связ"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Управление конфликтами",
    desc: "Конфликтология, медиация, управление стрессом",
    category: "conflict",
    color: "#F59E0B",
    keywords: ["конфликт", "медиац", "стресс", "эмоциональн"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    title: "Тайм-менеджмент",
    desc: "Управление временем, приоритеты, продуктивность, самоорганизация",
    category: "time",
    color: "#8B5CF6",
    keywords: ["тайм-менеджмент", "управлен собой", "продуктивн", "приоритет"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Управление изменениями",
    desc: "Change management, трансформация, стратегическое мышление",
    category: "change",
    color: "#EF4444",
    keywords: ["изменен", "трансформац", "стратег", "критическ мышлен"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Коучинг и наставничество",
    desc: "Коучинг для руководителей, наставничество, менторинг",
    category: "coaching",
    color: "#06B6D4",
    keywords: ["коучинг", "наставнич", "ментор", "развити"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

function getTrainingsByCategory(category: string): typeof leadershipTrainings {
  const area = programAreas.find((a) => a.category === category);
  if (!area) return leadershipTrainings;
  return leadershipTrainings.filter((t) => {
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

const TREND_KEYWORDS = ["ИИ", "искусственн", "AI", "цифров", "нейро", "agile", "Agile", "SCRUM"];

function isTrendCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return TREND_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

const testimonials = [
  {
    quote: "Тренинг по лидерству полностью изменил мой подход к управлению. Команда стала инициативнее, а моя загрузка как руководителя снизилась на 40%",
    name: "Кайрат Жунусов",
    title: "Генеральный директор",
    company: "IT-компания",
    initial: "К",
  },
  {
    quote: "Курс по переговорам окупился на первой же крупной сделке. Наши менеджеры научились вести переговоры системно, а не интуитивно",
    name: "Лаура Бекмуратова",
    title: "Коммерческий директор",
    company: "Дистрибьюторская компания",
    initial: "Л",
  },
  {
    quote: "Программа управления изменениями помогла нам провести реструктуризацию без потери ключевых сотрудников. Вовлечённость даже выросла",
    name: "Дамир Искаков",
    title: "HR-директор",
    company: "Банковский сектор",
    initial: "Д",
  },
];

const trainingPhotos = [
  { src: "/images/liderstvo/training-1.webp", caption: "Тренинг по лидерству" },
  { src: "/images/liderstvo/training-2.webp", caption: "Практикум по переговорам" },
  { src: "/images/liderstvo/training-3.webp", caption: "Командная работа" },
  { src: "/images/liderstvo/training-4.webp", caption: "Вручение сертификатов" },
];

/* ── Program Areas — category cards ── */

function ProgramAreas({ onCategoryClick }: { onCategoryClick: (category: string) => void }) {
  return (
    <div className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2628] via-[#1a2e30] to-[#0a1f21]"></div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "#ffffff", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
            От <span className="text-[#F0BB1E]">управления</span> до{" "}
            <span className="text-[#00767D]">трансформации</span>
          </h2>
          <p className="text-lg text-[#B8CDD0] max-w-2xl mx-auto">
            Полный цикл развития управленческих компетенций
          </p>
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
              <h3 className="text-lg font-bold mb-2" style={{ color: "#ffffff" }}>{area.title}</h3>
              <p className="text-[#D4E4E7] text-sm leading-relaxed mb-3">{area.desc}</p>
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
        Записаться на тренинг
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
          message: `[Лидерство: ${training.name}] Дата: ${training.date}, Компания: ${fd.get("company") || "—"}`,
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
            <h2 id="modal-title" className="text-xl font-bold text-white mb-1">Записаться на тренинг</h2>
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
  return (
    <div className={`p-6 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${i + 1}`}>
      <svg className="w-8 h-8 text-[#F0BB1E]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="text-[#D4E4E7] text-sm leading-relaxed mb-6">{t.quote}</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center">
            <span className="text-white font-bold text-sm">{t.initial}</span>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-[#6B9196] text-xs">{t.title}, {t.company}</p>
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
      className={`text-center p-8 rounded-2xl bg-white/[0.06] border border-white/10 scroll-fade-in scroll-delay-${index + 1} hover:bg-white/[0.1] hover:scale-105 transition-all duration-300 cursor-pointer text-left`}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white mx-auto mb-4">
        {item.icon}
      </div>
      <div className="text-4xl font-extrabold text-[#F0BB1E] mb-2 text-center">{item.value}</div>
      <p className="font-semibold mb-1 text-center" style={{ color: "#ffffff" }}>{item.label}</p>
      <p className="text-[#7A9EA3] text-sm text-center">{item.desc}</p>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-[#B8CDD0] text-sm leading-relaxed">{item.caseStudy}</p>
        </div>
      )}
      <p className="text-[#00767D] text-xs mt-3 text-center font-medium">
        {expanded ? "Свернуть" : "Подробнее"}
      </p>
    </button>
  );
}

/* ── Client logos ── */

const CLIENT_LOGOS = [
  { name: "Самрук-Казына", logo: "/images/clients/samruk.png" },
  { name: "Kaspi Bank", logo: "/images/clients/kaspi.png" },
  { name: "Kcell", logo: "/images/clients/kcell.png" },
  { name: "inDrive", logo: "/images/clients/indrive.png" },
  { name: "КТЖ", logo: "/images/clients/ktj.png" },
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

/* ── Clients section ── */

function LeadershipClients() {
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="relative py-16 sm:py-24 bg-[#FAFAFA] overflow-hidden">
      <NeuralBackground particleCount={50} connectionDistance={150} opacity={0.35} />
      <div className="relative z-10">
        <div className="text-center mb-10 px-4">
          <span className="inline-block px-4 py-2 bg-[#00767D]/10 text-[#00767D] rounded-full text-sm font-medium mb-4 scroll-fade-in">
            Нам доверяют
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3A3C] mb-4 scroll-fade-in scroll-delay-1">
            Лидеры <span className="text-[#F0BB1E]">выбирают нас</span>
          </h2>
          <p className="text-[#546569] max-w-2xl mx-auto text-lg scroll-fade-in scroll-delay-2">
            Крупнейшие компании Казахстана доверяют нам развитие руководителей
          </p>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.div
            className="flex items-center gap-6 md:gap-8"
            animate={{ x: [0, -156 * CLIENT_LOGOS.length] }}
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
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#00767D] mb-1 md:mb-2">12+</div>
            <div className="text-[#546569] text-xs md:text-base">курсов</div>
          </div>
          <div className="p-3 md:p-6 rounded-2xl bg-white shadow-sm border border-[#00767D]/10 scroll-fade-in scroll-delay-1">
            <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F0BB1E] mb-1 md:mb-2">200+</div>
            <div className="text-[#546569] text-xs md:text-base">экспертов</div>
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

export default function LiderstvoPage() {
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
          message: `[Тренинги лидерства] Компания: ${fd.get("company") || "—"}, Сотрудников: ${fd.get("employees") || "—"}, Направление: ${fd.get("direction") || "—"}`,
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
    : leadershipTrainings;
  const visibleTrainings = showAll
    ? filteredTrainings
    : filteredTrainings.slice(0, 12);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Video background with fallback */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
          <Image
            src="/images/liderstvo/hero-poster.webp"
            alt=""
            fill
            className="object-cover sm:hidden"
            priority
          />
          <video
            autoPlay muted loop playsInline
            poster="/images/liderstvo/hero-poster.webp"
            className="absolute inset-0 w-full h-full object-cover hidden sm:block"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none"; }}
          >
            <source src="/videos/neftegaz-hero.webm" type="video/webm" />
            <source src="/videos/neftegaz-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content layer */}
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
              <span className="text-[#F0BB1E]">Лидерство</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F0BB1E] text-sm font-semibold mb-8 scroll-fade-in backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              12+ тренингов для руководителей
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight scroll-fade-in scroll-delay-1"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
            >
              Тренинги для{" "}
              <span className="text-[#F0BB1E]">
                лидеров и руководителей
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#D4E4E7] mb-10 max-w-2xl scroll-fade-in scroll-delay-2">
              От управления командой до стратегического мышления — практические программы для тех, кто ведёт за собой
            </p>

            <div className="flex flex-wrap gap-4 mb-12 scroll-fade-in scroll-delay-3">
              <a href="#form" className="gold-button">
                Заказать обучение
              </a>
              <a href="#schedule" className="dark-button-outline">
                Смотреть тренинги
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 scroll-fade-in scroll-delay-3">
              {[
                { value: "12+", label: "курсов" },
                { value: "200+", label: "экспертов" },
                { value: "10+", label: "лет опыта" },
                { value: "80%", label: "практики" },
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

      {/* ═══ CLIENTS ═══ */}
      <LeadershipClients />

      {/* ═══ PROGRAM AREAS ═══ */}
      <ProgramAreas onCategoryClick={setActiveCategory} />

      {/* ═══ SCHEDULE ═══ */}
      <section id="schedule" ref={scheduleRef} className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Расписание <span className="text-gradient-primary">тренингов</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                {filteredTrainings.length} тренингов {activeCategory ? "в выбранной категории" : "по лидерству и управлению"}
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
                Все ({leadershipTrainings.length})
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
                      {isTrendCourse(training.name) && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] flex-shrink-0">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v1a4 4 0 004 4h4a4 4 0 004-4V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 9a1 1 0 112 0 1 1 0 01-2 0zm-2-2a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0zM5 14a5 5 0 0110 0v1H5v-1z" /></svg>
                          TREND
                        </span>
                      )}
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

            {filteredTrainings.length > 12 && (
              <div className="text-center mt-8">
                <button onClick={() => setShowAll(!showAll)} className="teal-button-outline">
                  {showAll ? "Свернуть" : `Показать все ${filteredTrainings.length} тренингов`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TRAINING GALLERY ═══ */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Как проходит <span className="text-gradient-primary">обучение</span>
              </h2>
              <p className="text-lg text-[#3d5153]">
                80% практики на реальных кейсах и ситуациях
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/3] group scroll-fade-in scroll-delay-${i + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00767D]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Metrics */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#ffffff", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                Результат, который <span className="text-[#F0BB1E]">измерим</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-20">
              {[
                {
                  value: "↑ 40%",
                  label: "вовлечённость команды",
                  desc: "после программы лидерства",
                  caseStudy: "Провели модульную программу для 50 руководителей среднего звена нефтесервисной компании. Через полгода замеры показали рост вовлечённости команд на 40% и снижение текучести на 25%.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  value: "×3",
                  label: "эффективность переговоров",
                  desc: "после тренинга по переговорам",
                  caseStudy: "Обучили коммерческий отдел дистрибьюторской компании (20 человек). Средний размер закрываемых сделок вырос втрое, а цикл продаж сократился на 30%.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  value: "↓ 40%",
                  label: "загрузка руководителя",
                  desc: "после курса по делегированию",
                  caseStudy: "Топ-менеджер IT-компании прошёл индивидуальную программу. Научился делегировать и выстроил систему контроля. Его рабочая неделя сократилась с 70 до 45 часов без потери результатов.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <MetricCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* Testimonials */}
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#ffffff", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
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

      {/* ═══ PAIN POINTS — Split Screen ═══ */}
      <section className="py-0 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left — Problems (dark) */}
          <div className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] p-10 sm:p-16 lg:p-20">
            <div className="max-w-lg ml-auto">
              <p className="text-red-400/80 text-xs uppercase tracking-widest font-semibold mb-4 scroll-fade-in">Знакомые проблемы?</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 scroll-fade-in scroll-delay-1" style={{ color: "#ffffff", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                Без системного развития <span className="text-red-400">теряете</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Руководители работают «в» бизнесе, а не «над» бизнесом",
                  "Переговоры ведутся интуитивно, без системы",
                  "Конфликты в команде снижают продуктивность",
                  "Ключевые сотрудники выгорают и уходят",
                ].map((problem, i) => (
                  <div key={i} className={`flex items-start gap-4 scroll-fade-in-left scroll-delay-${(i % 3) + 1}`}>
                    <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-[#B8CDD0] font-medium">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Solutions (light) */}
          <div className="bg-[#EEF4F4] p-10 sm:p-16 lg:p-20">
            <div className="max-w-lg">
              <p className="text-[#00767D] text-xs uppercase tracking-widest font-semibold mb-4 scroll-fade-in">Лидерство, которое вдохновляет</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-10 scroll-fade-in scroll-delay-1">
                С нами вы <span className="text-gradient-primary">получаете</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Руководители, которые развивают, а не контролируют",
                  "Переговоры по системе, а не по настроению",
                  "Конструктивное управление конфликтами",
                  "Устойчивость и энергия на долгой дистанции",
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
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#ffffff", textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}>
                Закажите программу развития для вашей команды
              </h2>
              <p className="text-lg text-[#B8CDD0]">
                Подберём формат и содержание под ваши задачи — от коучинга до командных тренингов
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="text-center py-12 scroll-fade-in">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>Заявка отправлена</h3>
                <p className="text-[#B8CDD0]">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 scroll-fade-in scroll-delay-1">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Ваше имя"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                </div>
                <input
                  name="company"
                  type="text"
                  placeholder="Компания"
                  className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="employees"
                    type="number"
                    placeholder="Количество сотрудников (~)"
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#6B9196] focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                  <select
                    name="direction"
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all appearance-none"
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
                <p className="text-center text-[#7A9EA3] text-sm mt-3">Подготовим предложение за 24 часа</p>
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
