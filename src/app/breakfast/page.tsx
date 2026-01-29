"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// API Base URL
const API_BASE = "https://breakfast-bot-production.up.railway.app";

// === DECORATIVE SVG COMPONENTS ===

// Abstract decorative shapes for background
function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top right decorative circle */}
      <svg
        className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.03]"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="#00767D" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#00767D" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="#F0BB1E" strokeWidth="1" />
      </svg>

      {/* Bottom left decorative shape */}
      <svg
        className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.04]"
        viewBox="0 0 200 200"
      >
        <path
          d="M100 20 L180 100 L100 180 L20 100 Z"
          fill="none"
          stroke="#00767D"
          strokeWidth="2"
        />
        <path
          d="M100 40 L160 100 L100 160 L40 100 Z"
          fill="none"
          stroke="#F0BB1E"
          strokeWidth="1.5"
        />
      </svg>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(#00767D 1px, transparent 1px),
            linear-gradient(90deg, #00767D 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00767D]/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#F0BB1E]/[0.02] to-transparent" />
    </div>
  );
}

// SVG Icon components (replacing emojis)
const Icons = {
  microphone: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  robot: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="10" x="3" y="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" x2="8" y1="16" y2="16" />
      <line x1="16" x2="16" y1="16" y2="16" />
    </svg>
  ),
  lightning: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  coffee: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  ),
  phone: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  chat: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  target: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  question: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  play: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  ),
};

// Slide data
const slides = [
  { id: "cover", type: "cover" },
  { id: "hook", type: "hook" },
  { id: "telegram-start", type: "telegram-start" },
  { id: "program", type: "program" },
  { id: "about-gani", type: "about-gani" },
  { id: "story-1", type: "story-1" },
  { id: "story-2", type: "story-2" },
  { id: "story-3", type: "story-3" },
  { id: "top-requests", type: "top-requests" },
  { id: "section-speakers", type: "section-speakers" },
  { id: "dias-intro", type: "dias-intro" },
  { id: "daniel-intro", type: "daniel-intro" },
  { id: "coffee-break", type: "coffee-break" },
  { id: "section-ibirai", type: "section-ibirai" },
  { id: "ibirai-intro", type: "ibirai-intro" },
  { id: "ibirai-features", type: "ibirai-features" },
  { id: "big-number-completion", type: "big-number-completion" },
  { id: "ibirai-demo", type: "ibirai-demo" },
  { id: "panel", type: "panel" },
  { id: "insights", type: "insights" },
  { id: "takeaway", type: "takeaway" },
  { id: "next-steps", type: "next-steps" },
  { id: "telegram-end", type: "telegram-end" },
  { id: "final", type: "final" },
];

// Types for API responses
interface TopRequest {
  rank: string;
  text: string;
  count: number;
}

interface Insight {
  text: string;
  author: string;
  company?: string;
}

interface Question {
  text: string;
  author: string;
  for_speaker?: string;
}

// Hook to fetch data from bot API
function useApiData<T>(endpoint: string, defaultValue: T, refreshInterval = 30000): T {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (response.ok) {
          const json = await response.json();
          setData(json.data || json);
        }
      } catch (error) {
        console.log(`API fetch error for ${endpoint}:`, error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [endpoint, refreshInterval]);

  return data;
}

export default function BreakfastPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(Math.min(currentSlide + 1, slides.length - 1));
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(Math.max(currentSlide - 1, 0));
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "Home") {
        goToSlide(0);
      } else if (e.key === "End") {
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, goToSlide]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const renderSlide = (type: string) => {
    switch (type) {
      case "cover":
        return <CoverSlide />;
      case "hook":
        return <HookSlide />;
      case "telegram-start":
        return <TelegramStartSlide />;
      case "telegram-end":
        return <TelegramEndSlide />;
      case "program":
        return <ProgramSlide />;
      case "about-gani":
        return <AboutGaniSlide />;
      case "story-1":
        return <Story1Slide />;
      case "story-2":
        return <Story2Slide />;
      case "story-3":
        return <Story3Slide />;
      case "top-requests":
        return <TopRequestsSlide />;
      case "section-speakers":
        return <SectionSpeakersSlide />;
      case "dias-intro":
        return <DiasIntroSlide />;
      case "daniel-intro":
        return <DanielIntroSlide />;
      case "coffee-break":
        return <CoffeeBreakSlide />;
      case "section-ibirai":
        return <SectionIbiraiSlide />;
      case "ibirai-intro":
        return <IbiraiIntroSlide />;
      case "ibirai-features":
        return <IbiraiFeaturesSlide />;
      case "big-number-completion":
        return <BigNumberCompletionSlide />;
      case "ibirai-demo":
        return <IbiraiDemoSlide />;
      case "panel":
        return <PanelSlide />;
      case "insights":
        return <InsightsSlide />;
      case "takeaway":
        return <TakeawaySlide />;
      case "next-steps":
        return <NextStepsSlide />;
      case "final":
        return <FinalSlide />;
      default:
        return null;
    }
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-[#FAFBFC] via-white to-[#F8FAFB] overflow-hidden relative select-none">
      {/* Decorative Background */}
      <DecorativeBackground />

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full w-full flex items-center justify-center p-8 md:p-16 relative z-10"
        >
          {renderSlide(slides[currentSlide].type)}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-[#00767D]/20 flex items-center justify-center text-[#00767D] hover:bg-[#00767D] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-[#00767D]/20 flex items-center justify-center text-[#00767D] hover:bg-[#00767D] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#00767D] w-6"
                : "bg-[#00767D]/30 hover:bg-[#00767D]/50"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 text-sm text-[#546569]">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/80 backdrop-blur border border-[#00767D]/20 flex items-center justify-center text-[#00767D] hover:bg-[#00767D] hover:text-white transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isFullscreen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          )}
        </svg>
      </button>

      {/* Keyboard Hints */}
      <div className="absolute bottom-6 left-6 text-xs text-[#94A3B8] hidden md:block">
        ← → навигация • F полный экран
      </div>
    </main>
  );
}

// === SLIDE COMPONENTS ===

function CoverSlide() {
  return (
    <div className="text-center max-w-4xl relative">
      {/* Decorative rings behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
        <div className="absolute inset-0 border-2 border-[#00767D]/5 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-8 border border-[#F0BB1E]/5 rounded-full animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-[#00767D]/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white">
            {Icons.robot}
          </div>
          <span className="text-[#2D3A3C] font-semibold tracking-wide">Бизнес-завтрак</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-[#2D3A3C] mb-6 tracking-tight">
          AI в <span className="text-[#00767D] relative">
            HR
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F0BB1E]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0 6 Q25 0, 50 6 T100 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#00767D]/30" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#00767D]/30" />
        </div>

        <p className="text-2xl md:text-3xl text-[#546569] mb-12 font-light">
          Революция найма и обучения
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-lg">
          <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-[#00767D]/10">
            <svg className="w-5 h-5 text-[#00767D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="font-semibold text-[#2D3A3C]">30 января 2026</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-[#00767D]/10">
            <svg className="w-5 h-5 text-[#00767D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-semibold text-[#2D3A3C]">Алматы, Орда</span>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-[#00767D]">
          <span className="text-sm font-medium">Нажмите для продолжения</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Hook slide - provocative opening statistic
function HookSlide() {
  return (
    <div className="text-center max-w-4xl">
      <div className="text-8xl md:text-9xl font-bold text-[#00767D] mb-6">
        76%
      </div>

      <p className="text-2xl md:text-3xl text-[#2D3A3C] mb-8">
        HR-директоров считают, что <span className="font-bold">AI изменит</span><br />
        их работу в ближайшие <span className="text-[#00767D] font-bold">2 года</span>
      </p>

      <div className="w-24 h-1 bg-gradient-to-r from-[#F0BB1E] to-[#00767D] mx-auto mb-8" />

      <p className="text-xl text-[#546569]">
        Gartner, 2025
      </p>

      <div className="mt-12 p-6 bg-[#F0BB1E]/10 rounded-2xl border border-[#F0BB1E]/30 inline-block">
        <p className="text-xl text-[#2D3A3C] font-semibold">
          Вопрос не «будет ли AI в HR?»<br />
          Вопрос — <span className="text-[#00767D]">«вы готовы?»</span>
        </p>
      </div>
    </div>
  );
}

// Telegram slide - START (onboarding)
function TelegramStartSlide() {
  return (
    <div className="text-center max-w-3xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00767D]/10 rounded-full mb-6">
        <span className="text-xl">👋</span>
        <span className="text-[#00767D] font-semibold">Давайте знакомиться</span>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-4">
        Запустите <span className="text-[#00767D]">бота</span>
      </h2>

      <p className="text-xl text-[#546569] mb-8">
        Представьтесь — мы хотим знать, кто в зале!
      </p>

      {/* QR Code */}
      <div className="w-56 h-56 mx-auto bg-white rounded-2xl border-4 border-[#00767D] flex items-center justify-center mb-6 shadow-xl overflow-hidden">
        <Image
          src="/images/qr-bot.png"
          alt="QR код бота"
          width={220}
          height={220}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `
              <div class="text-center p-4">
                <div class="text-4xl mb-2">💬</div>
                <p class="text-[#00767D] font-semibold">@aihr_breakfast_bot</p>
              </div>
            `;
          }}
        />
      </div>

      <a
        href="https://t.me/aihr_breakfast_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00767D] text-white font-semibold rounded-xl hover:bg-[#006D77] transition-colors text-lg"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
        @aihr_breakfast_bot
      </a>

      <div className="mt-6 flex justify-center gap-6 text-[#546569]">
        <div className="flex items-center gap-2">
          <span className="text-[#F0BB1E]">1</span>
          <span>Нажмите /start</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#F0BB1E]">2</span>
          <span>Представьтесь</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#F0BB1E]">3</span>
          <span>Готово!</span>
        </div>
      </div>
    </div>
  );
}

// Telegram slide - END (stay connected)
function TelegramEndSlide() {
  return (
    <div className="text-center max-w-3xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0BB1E]/20 rounded-full mb-6">
        <span className="text-xl">🔗</span>
        <span className="text-[#2D3A3C] font-semibold">Оставайтесь на связи</span>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-4">
        Не теряйте <span className="text-[#00767D]">контакт</span>
      </h2>

      <p className="text-xl text-[#546569] mb-8">
        Материалы, запись и контакты спикеров — в боте
      </p>

      <div className="w-48 h-48 mx-auto bg-white rounded-2xl border-4 border-[#F0BB1E] flex items-center justify-center mb-6 shadow-xl overflow-hidden">
        <Image
          src="/images/qr-bot.png"
          alt="QR код бота"
          width={180}
          height={180}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `
              <div class="text-center p-4">
                <div class="text-4xl mb-2">💬</div>
                <p class="text-[#F0BB1E] font-semibold">@aihr_breakfast_bot</p>
              </div>
            `;
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="p-4 bg-white rounded-xl border border-[#00767D]/10">
          <div className="text-2xl mb-2">📹</div>
          <p className="text-sm text-[#546569]">Запись</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-[#00767D]/10">
          <div className="text-2xl mb-2">📑</div>
          <p className="text-sm text-[#546569]">Слайды</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-[#00767D]/10">
          <div className="text-2xl mb-2">👥</div>
          <p className="text-sm text-[#546569]">Контакты</p>
        </div>
      </div>
    </div>
  );
}

function ProgramSlide() {
  const program = [
    { time: "08:30", title: "Сбор участников, регистрация", speaker: "", icon: "☕" },
    { time: "09:00", title: "Открытие", speaker: "Гани Абадан", icon: "🎤" },
    { time: "09:10", title: "AI в рекрутинге", speaker: "Диас Жумагалиев", icon: "🤖" },
    { time: "09:50", title: "AI-агенты для HR", speaker: "Даниэль Алисов", icon: "⚡" },
    { time: "10:30", title: "Кофе-брейк", speaker: "", icon: "☕" },
    { time: "11:00", title: "Демо ibirAi", speaker: "Гани Абадан", icon: "📱" },
    { time: "11:20", title: "Панельная дискуссия", speaker: "Все спикеры", icon: "💬" },
    { time: "11:40", title: "Нетворкинг", speaker: "", icon: "🤝" },
  ];

  return (
    <div className="max-w-3xl w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-12 text-center">
        <span className="text-[#00767D]">Программа</span>
      </h2>

      <div className="space-y-4">
        {program.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#00767D]/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="w-20 text-[#00767D] font-bold text-lg">{item.time}</div>
            <div className="flex-1">
              <div className="font-semibold text-[#2D3A3C] text-lg">{item.title}</div>
              {item.speaker && (
                <div className="text-[#546569] text-sm">{item.speaker}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutGaniSlide() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] overflow-hidden shadow-2xl">
          <Image
            src="/speakers/gani.jpg"
            alt="Гани Абадан"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-2">
          Гани <span className="text-[#00767D]">Абадан</span>
        </h2>
        <p className="text-xl text-[#00767D] mb-6">Основатель Abadan & Co. и ibirAi</p>

        <div className="space-y-3 text-lg text-[#546569]">
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">✓</span>
            <span>15 лет в корпоративном обучении</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">✓</span>
            <span>10 000+ обученных специалистов</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">✓</span>
            <span>Все регионы Казахстана</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">✓</span>
            <span>Автор программы «Бастау Бизнес»</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Story1Slide() {
  return (
    <div className="text-center max-w-4xl relative">
      {/* Large decorative quote marks */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[200px] font-serif text-[#00767D]/5 leading-none pointer-events-none select-none">
        "
      </div>

      <div className="relative">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#00767D]/10 to-[#00767D]/5 flex items-center justify-center border border-[#00767D]/10">
          <svg className="w-8 h-8 text-[#00767D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
            <path d="M12 12 2.1 9.1" />
            <path d="m12 12 4.9 7.1" />
          </svg>
        </div>

        <blockquote className="text-3xl md:text-5xl font-bold text-[#2D3A3C] leading-tight mb-8">
          «Как измерить <span className="text-[#00767D]">ROI</span> от тренинга?»
        </blockquote>

        <p className="text-xl md:text-2xl text-[#546569]">
          Этот вопрос я слышал <span className="font-bold text-[#2D3A3C]">15 лет</span>.<br />
          От каждого клиента.
        </p>

        <div className="mt-12 inline-block px-6 py-3 bg-[#F8FAFB] rounded-full border border-[#00767D]/10">
          <p className="text-lg text-[#94A3B8] italic">
            И не мог на него ответить.
          </p>
        </div>
      </div>
    </div>
  );
}

function Story2Slide() {
  return (
    <div className="text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A3C] mb-12">
        Почему тренинги <span className="text-[#F0BB1E]">не работают</span>?
      </h2>

      <div className="space-y-6 text-xl md:text-2xl text-[#546569]">
        <p>
          <span className="font-bold text-[#2D3A3C]">Soft skills</span> — это не знания.
        </p>
        <p>
          Это <span className="text-[#00767D] font-bold">поведение</span>.
        </p>
        <p>
          Поведение — это <span className="text-[#00767D] font-bold">привычки</span>.
        </p>
        <p>
          Привычки меняются <span className="text-[#F0BB1E] font-bold">каждый день</span>.
        </p>
      </div>

      <div className="mt-12 p-6 bg-[#00767D]/10 rounded-2xl">
        <p className="text-2xl font-bold text-[#00767D]">
          Не за 2 дня тренинга.
        </p>
      </div>
    </div>
  );
}

function Story3Slide() {
  return (
    <div className="text-center max-w-4xl">
      <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center shadow-lg shadow-[#F0BB1E]/20">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A3C] mb-8">
        А потом появился <span className="text-[#00767D]">AI</span>
      </h2>

      <p className="text-xl text-[#546569] mb-8">
        AI работает как <span className="font-bold">T9</span> в телефоне:<br />
        предсказывает на основе данных.
      </p>

      <div className="bg-gradient-to-br from-[#00767D] to-[#006D77] rounded-3xl p-8 text-white shadow-xl shadow-[#00767D]/20">
        <p className="text-xl mb-4 text-white/80">Если собирать данные о том, как человек учится —</p>
        <p className="text-2xl font-bold">
          мы видим не просто «понял — не понял»,<br />
          а целый <span className="text-[#F0BB1E]">портрет</span>:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur rounded-full border border-white/20 font-medium">Потенциал</span>
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur rounded-full border border-white/20 font-medium">Таланты</span>
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur rounded-full border border-white/20 font-medium">Готовность к росту</span>
        </div>
      </div>
    </div>
  );
}

function TopRequestsSlide() {
  const ranks = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  const apiData = useApiData<{ top_requests?: TopRequest[]; analysis?: string }>("/api/top-requests", {});

  // Default data if API not available
  const defaultRequests: TopRequest[] = [
    { rank: "🥇", text: "Ожидаем ваши запросы...", count: 0 },
  ];

  const requests = apiData.top_requests || defaultRequests;
  const hasData = requests.length > 0 && requests[0].count > 0;

  return (
    <div className="max-w-3xl w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-4 text-center">
        Ваши <span className="text-[#00767D]">запросы</span>
      </h2>
      <p className="text-center text-[#546569] mb-8">
        {hasData ? "Что вы хотите узнать сегодня" : "Напишите боту @aihr_breakfast_bot"}
      </p>

      {/* Live indicator */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 text-sm font-medium">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto">
        {requests.slice(0, 10).map((request, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 p-5 rounded-2xl transition-all ${
              index === 0
                ? "bg-gradient-to-r from-[#F0BB1E]/20 to-[#F0BB1E]/5 border-2 border-[#F0BB1E]"
                : index < 3
                ? "bg-white border-2 border-[#00767D]/20"
                : "bg-white border border-[#00767D]/10"
            }`}
          >
            <div className="text-3xl">{ranks[index] || `${index + 1}`}</div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-[#2D3A3C]">{request.text}</div>
            </div>
            {request.count > 0 && (
              <div className="text-[#00767D] font-bold text-lg">
                {request.count} чел.
              </div>
            )}
          </div>
        ))}
      </div>

      {hasData && (
        <p className="text-center mt-8 text-[#00767D] font-semibold text-lg">
          Спикеры, держите это в голове →
        </p>
      )}
    </div>
  );
}

// Section divider - Speakers
function SectionSpeakersSlide() {
  return (
    <div className="text-center max-w-3xl relative">
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
        <div className="absolute inset-0 border border-[#00767D]/10 rounded-full" />
        <div className="absolute inset-8 border border-[#00767D]/5 rounded-full" />
      </div>

      <div className="relative">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center shadow-lg shadow-[#00767D]/20">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-[#2D3A3C] mb-6 tracking-tight">
          Эксперты
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00767D]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#F0BB1E]" />
        </div>

        <p className="text-2xl text-[#546569] font-light">
          Практики, которые уже внедряют AI в HR
        </p>
      </div>
    </div>
  );
}

function DiasIntroSlide() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
      <div className="flex-shrink-0">
        <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] overflow-hidden shadow-2xl">
          <Image
            src="/speakers/dias.jpg"
            alt="Диас Жумагалиев"
            width={224}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-center md:text-left">
        <p className="text-[#00767D] font-semibold mb-2">Следующий спикер</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-2">
          Диас <span className="text-[#00767D]">Жумагалиев</span>
        </h2>
        <p className="text-xl text-[#546569] mb-6">AI в рекрутинге</p>

        <div className="space-y-3 text-lg text-[#546569] mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>4+ года в AI</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>Консультант inDrive</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>Эксперт Astana Hub</span>
          </div>
        </div>

        <div className="p-4 bg-[#00767D]/10 rounded-xl">
          <p className="font-semibold text-[#2D3A3C]">
            → Революция найма с помощью AI
          </p>
        </div>
      </div>
    </div>
  );
}

function DanielIntroSlide() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
      <div className="flex-shrink-0">
        <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] overflow-hidden shadow-2xl">
          <Image
            src="/speakers/daniel.jpg"
            alt="Даниэль Алисов"
            width={224}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-center md:text-left">
        <p className="text-[#00767D] font-semibold mb-2">Следующий спикер</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-2">
          Даниэль <span className="text-[#00767D]">Алисов</span>
        </h2>
        <p className="text-xl text-[#546569] mb-6">AI-агенты для HR</p>

        <div className="space-y-3 text-lg text-[#546569] mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>8+ лет в маркетинге</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>5+ лет в автоматизации</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#F0BB1E]">•</span>
            <span>100+ AI-ассистентов внедрено</span>
          </div>
        </div>

        <div className="p-4 bg-[#00767D]/10 rounded-xl">
          <p className="font-semibold text-[#2D3A3C]">
            → Когда и как убрать человека из процесса
          </p>
        </div>
      </div>
    </div>
  );
}

// Coffee Break slide
function CoffeeBreakSlide() {
  return (
    <div className="text-center max-w-3xl relative">
      {/* Decorative steam lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
        <motion.div
          className="absolute left-1/3 top-0 w-0.5 h-16 bg-gradient-to-t from-[#F0BB1E]/30 to-transparent rounded-full"
          animate={{ y: [-10, -20, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 h-20 bg-gradient-to-t from-[#F0BB1E]/30 to-transparent rounded-full"
          animate={{ y: [-10, -25, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="absolute left-2/3 top-0 w-0.5 h-16 bg-gradient-to-t from-[#F0BB1E]/30 to-transparent rounded-full"
          animate={{ y: [-10, -20, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </div>

      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center shadow-xl shadow-[#F0BB1E]/30">
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" x2="6" y1="2" y2="4" />
            <line x1="10" x2="10" y1="2" y2="4" />
            <line x1="14" x2="14" y1="2" y2="4" />
          </svg>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold text-[#2D3A3C] mb-6 tracking-tight">
          Кофе-брейк
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00767D]" />
        </div>

        <p className="text-2xl text-[#546569] font-light mb-8">
          30 минут на общение и нетворкинг
        </p>

        <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#F0BB1E]/20">
          <span className="text-4xl font-bold text-[#00767D]">10:30</span>
          <span className="text-xl text-[#546569]">—</span>
          <span className="text-4xl font-bold text-[#00767D]">11:00</span>
        </div>
      </div>
    </div>
  );
}

// Section divider - ibirAi
function SectionIbiraiSlide() {
  return (
    <div className="text-center max-w-3xl relative">
      {/* Decorative diamond shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
        <div className="absolute inset-0 border border-[#F0BB1E]/10 rotate-45" />
        <div className="absolute inset-8 border border-[#F0BB1E]/5 rotate-45" />
      </div>

      <div className="relative">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center shadow-lg shadow-[#F0BB1E]/20">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-[#2D3A3C] mb-6 tracking-tight">
          Решение
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00767D]" />
        </div>

        <p className="text-2xl text-[#546569] font-light">
          Как мы решили проблему измерения ROI
        </p>
      </div>
    </div>
  );
}

function IbiraiIntroSlide() {
  return (
    <div className="text-center max-w-4xl">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-[#F0BB1E]/20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center text-white">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span className="text-[#2D3A3C] font-semibold">Демо</span>
      </div>

      <h2 className="text-5xl md:text-6xl font-bold text-[#2D3A3C] mb-6">
        ibir<span className="text-[#00767D]">Ai</span>
      </h2>

      <p className="text-2xl text-[#546569] mb-12">
        Микрообучение + AI
      </p>

      <div className="bg-gradient-to-r from-[#00767D] to-[#006D77] rounded-2xl p-8 text-white">
        <p className="text-xl mb-6">Так родилась идея:</p>
        <p className="text-2xl font-bold">
          Вшить сбор данных в само обучение.
        </p>
        <p className="text-xl mt-4 text-white/80">
          Человек учится 3-5 минут в день — и раскрывает свой профиль.
        </p>
      </div>
    </div>
  );
}

function IbiraiFeaturesSlide() {
  const features = [
    { icon: "📱", title: "3-5 минут в день", desc: "Микроуроки прямо в Telegram — не нужно учить новые системы" },
    { icon: "🤖", title: "AI-аватар тренера", desc: "Персональная обратная связь 24/7 на основе вашего контента" },
    { icon: "📊", title: "HR-аналитика", desc: "ROI, прогресс и профиль компетенций каждого сотрудника" },
    { icon: "🎯", title: "87% завершаемость", desc: "vs 20-30% у обычных онлайн-курсов" },
  ];

  return (
    <div className="max-w-5xl">
      <h2 className="text-4xl font-bold text-[#2D3A3C] mb-4 text-center">
        Как работает <span className="text-[#2D3A3C]">ibir</span><span className="text-[#00767D]">Ai</span>
      </h2>
      <p className="text-center text-[#546569] mb-10">
        Платформа микрообучения с AI для корпоративных команд
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow ${
              index === 3
                ? "bg-gradient-to-br from-[#00767D]/10 to-[#00767D]/5 border-[#00767D]/30"
                : "bg-white border-[#00767D]/10"
            }`}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-2">{feature.title}</h3>
            <p className="text-[#546569]">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Key differentiator */}
      <div className="text-center p-4 bg-[#F0BB1E]/10 rounded-xl border border-[#F0BB1E]/30">
        <p className="text-[#2D3A3C] font-medium">
          ⚡ Запуск программы за <span className="font-bold text-[#00767D]">2 недели</span> — быстрее любой LMS
        </p>
      </div>
    </div>
  );
}

// Big Number slide - Completion rate comparison
function BigNumberCompletionSlide() {
  return (
    <div className="text-center max-w-4xl">
      <p className="text-xl text-[#546569] mb-6">
        Завершаемость онлайн-курсов
      </p>

      <div className="flex items-end justify-center gap-12 mb-12">
        {/* Traditional */}
        <div className="text-center">
          <div className="text-6xl md:text-7xl font-bold text-[#94A3B8] mb-2">
            20-30%
          </div>
          <p className="text-lg text-[#546569]">Традиционные<br />онлайн-курсы</p>
        </div>

        {/* Arrow */}
        <div className="text-4xl text-[#F0BB1E] pb-8">→</div>

        {/* ibirAi */}
        <div className="text-center">
          <div className="text-7xl md:text-8xl font-bold text-[#00767D] mb-2">
            87%
          </div>
          <p className="text-lg text-[#00767D] font-semibold">ibir<span className="text-[#00767D]">Ai</span></p>
        </div>
      </div>

      <div className="inline-block p-6 bg-gradient-to-r from-[#00767D]/10 to-[#00767D]/5 rounded-2xl border border-[#00767D]/20">
        <p className="text-xl text-[#2D3A3C]">
          <span className="font-bold text-[#00767D]">В 3-4 раза выше</span> благодаря микроформату<br />
          и персональному AI-коучу
        </p>
      </div>
    </div>
  );
}

function IbiraiDemoSlide() {
  // Santo/Polpharma case study data
  const caseStats = [
    { value: "117", label: "менеджеров", highlight: false },
    { value: "3", label: "страны", highlight: false },
    { value: "80%+", label: "дошли до финала", highlight: true },
    { value: "100%", label: "применили на практике", highlight: true },
  ];

  return (
    <div className="max-w-5xl w-full">
      <h2 className="text-4xl font-bold text-[#2D3A3C] mb-2 text-center">
        Кейс: <span className="text-[#00767D]">Santo/Polpharma</span>
      </h2>
      <p className="text-center text-[#546569] mb-8">
        Программа развития управленческих навыков • 12 недель
      </p>

      {/* Case study metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {caseStats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-5 rounded-2xl ${
              stat.highlight
                ? "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white"
                : "bg-white border border-[#00767D]/10"
            }`}
          >
            <div className={`text-3xl md:text-4xl font-bold mb-1 ${
              stat.highlight ? "text-white" : "text-[#00767D]"
            }`}>
              {stat.value}
            </div>
            <div className={`text-sm ${stat.highlight ? "text-white/80" : "text-[#546569]"}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* AI avatar rating */}
      <div className="bg-gradient-to-r from-[#F0BB1E]/20 to-[#F0BB1E]/5 rounded-2xl p-6 border border-[#F0BB1E]/30 mb-8">
        <div className="flex items-center justify-center gap-6">
          <div className="text-5xl">🤖</div>
          <div className="text-left">
            <div className="text-3xl font-bold text-[#2D3A3C]">
              8.38<span className="text-xl text-[#546569]">/10</span>
            </div>
            <div className="text-[#546569]">Оценка AI-аватара тренера участниками</div>
          </div>
          <div className="text-left border-l border-[#F0BB1E]/30 pl-6">
            <div className="text-xl font-bold text-[#00767D]">60%+</div>
            <div className="text-sm text-[#546569]">отметили изменение<br/>поведения коллег</div>
          </div>
        </div>
      </div>

      {/* Demo CTA */}
      <div className="text-center p-6 bg-[#F8FAFB] rounded-2xl border-2 border-dashed border-[#00767D]/30">
        <div className="text-4xl mb-3">📱</div>
        <p className="text-xl text-[#2D3A3C] font-semibold">Сейчас — живая демонстрация</p>
        <p className="text-[#546569] mt-2">Как проходит обучение в Telegram с AI-коучем</p>
      </div>
    </div>
  );
}

function PanelSlide() {
  const moderatorQuestions = [
    "Многие HR-специалисты боятся, что AI заменит их работу. Где грань — какие задачи AI точно заберёт, а где человек незаменим?",
    "Если HR-директор завтра хочет начать внедрять AI — какой один первый шаг вы бы порекомендовали? Что даст быстрый результат?",
    "Какую главную ошибку совершают компании при внедрении AI в HR? Что вы видели на практике?",
    "Как изменится роль HR-директора через 2-3 года? Какие навыки станут критичными?",
  ];

  const apiData = useApiData<{ questions?: Question[] }>("/api/questions", {});
  const audienceQuestions = apiData.questions || [];

  return (
    <div className="max-w-4xl w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-8 text-center">
        Панельная <span className="text-[#00767D]">дискуссия</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Moderator questions */}
        <div>
          <h3 className="text-lg font-semibold text-[#546569] mb-4">Вопросы модератора:</h3>
          <div className="space-y-2">
            {moderatorQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#00767D]/10"
              >
                <span className="text-sm text-[#F0BB1E] mt-0.5">{index + 1}.</span>
                <span className="text-sm text-[#2D3A3C] leading-snug">{question}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience questions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-[#546569]">Вопросы из зала:</h3>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 text-xs font-medium">Live</span>
            </div>
          </div>

          {audienceQuestions.length > 0 ? (
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
              {audienceQuestions.slice(0, 5).map((q, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#F0BB1E]/10 to-transparent rounded-xl border border-[#F0BB1E]/30"
                >
                  <p className="text-[#2D3A3C] mb-1">«{q.text}»</p>
                  <p className="text-sm text-[#546569]">— {q.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-[#F8FAFB] rounded-xl border-2 border-dashed border-[#00767D]/20 text-center">
              <p className="text-[#546569]">Ожидаем вопросы...</p>
              <p className="text-sm text-[#94A3B8] mt-1">@aihr_breakfast_bot</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8 p-4 bg-[#00767D]/10 rounded-xl">
        <p className="text-[#00767D] font-semibold">
          💬 Пишите вопросы боту — они появятся здесь!
        </p>
      </div>
    </div>
  );
}

function InsightsSlide() {
  const apiData = useApiData<{ insights?: Insight[] }>("/api/insights", {});

  const insights = apiData.insights || [];
  const hasData = insights.length > 0;

  return (
    <div className="max-w-3xl w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-4 text-center">
        Ваши <span className="text-[#00767D]">инсайты</span>
      </h2>

      {/* Live indicator */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 text-sm font-medium">Live</span>
        </div>
      </div>

      {hasData ? (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {insights.slice(0, 5).map((insight, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-[#00767D]/10 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl text-[#F0BB1E]">💡</span>
                <div>
                  <p className="text-xl text-[#2D3A3C] mb-2">«{insight.text}»</p>
                  <p className="text-[#546569]">
                    — {insight.author}{insight.company ? `, ${insight.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-[#F8FAFB] rounded-2xl border-2 border-dashed border-[#00767D]/30">
          <div className="text-5xl mb-4">💬</div>
          <p className="text-xl text-[#546569]">Ожидаем ваши инсайты...</p>
          <p className="text-[#94A3B8] mt-2">Напишите боту @aihr_breakfast_bot</p>
        </div>
      )}
    </div>
  );
}

// Takeaway slide - one memorable message
function TakeawaySlide() {
  return (
    <div className="text-center max-w-4xl relative">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#00767D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center shadow-lg shadow-[#F0BB1E]/20">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-8">
          Одна мысль на сегодня
        </h2>

        <div className="bg-gradient-to-br from-[#00767D] to-[#006D77] rounded-3xl p-10 text-white mb-8 shadow-xl shadow-[#00767D]/20">
          <p className="text-3xl md:text-4xl font-bold leading-tight">
            AI не заменит HR.<br />
            <span className="text-[#F0BB1E]">HR с AI</span> заменит<br />
            HR без AI.
          </p>
        </div>

        <p className="text-xl text-[#546569] font-light">
          Начните с малого. Экспериментируйте. Масштабируйте.
        </p>
      </div>
    </div>
  );
}

function NextStepsSlide() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-12 text-center">
        Что <span className="text-[#00767D]">дальше</span>?
      </h2>

      <div className="space-y-5">
        <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-[#00767D]/10 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#00767D]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">Telegram-бот</h3>
            <p className="text-[#546569]">Материалы, запись, контакты спикеров</p>
          </div>
        </div>

        <div className="flex items-start gap-5 p-6 bg-gradient-to-r from-[#F0BB1E]/10 to-transparent rounded-2xl border-2 border-[#F0BB1E]/30 hover:border-[#F0BB1E]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#E5A91A] flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">Попробовать ibirAi</h3>
            <p className="text-[#546569]">Бесплатный пилот для первых 3 компаний</p>
            <a href="tel:+77022413388" className="inline-flex items-center gap-2 text-[#00767D] font-semibold mt-2 hover:underline">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +7 702 241 33 88 (Индира)
            </a>
          </div>
        </div>

        <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-[#00767D]/10 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#00767D]/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#00767D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">Нетворкинг</h3>
            <p className="text-[#546569]">30 минут — общайтесь, обменивайтесь контактами!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalSlide() {
  return (
    <div className="text-center max-w-4xl relative">
      {/* Decorative concentric circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
        <div className="absolute inset-0 border border-[#00767D]/5 rounded-full" />
        <div className="absolute inset-12 border border-[#F0BB1E]/5 rounded-full" />
        <div className="absolute inset-24 border border-[#00767D]/5 rounded-full" />
      </div>

      <div className="relative">
        <h2 className="text-6xl md:text-8xl font-bold text-[#2D3A3C] mb-6 tracking-tight">
          Спасибо!
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00767D]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-2 h-2 rounded-full bg-[#F0BB1E]" />
          <div className="w-2 h-2 rounded-full bg-[#00767D]" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#F0BB1E]" />
        </div>

        <p className="text-2xl text-[#546569] mb-12 font-light">
          AI в HR • 30 января 2026
        </p>

        <div className="inline-flex items-center gap-6 px-8 py-5 bg-white rounded-2xl shadow-sm border border-[#00767D]/10">
          <div className="text-center">
            <p className="text-lg text-[#2D3A3C] font-semibold">abadan.kz</p>
            <p className="text-sm text-[#546569]">Корпоративное обучение</p>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-[#00767D]/20 via-[#F0BB1E]/20 to-[#00767D]/20" />
          <div className="text-center">
            <p className="text-lg font-semibold"><span className="text-[#2D3A3C]">ibir</span><span className="text-[#00767D]">Ai</span></p>
            <p className="text-sm text-[#546569]">Микрообучение с AI</p>
          </div>
        </div>

        <div className="mt-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center shadow-lg shadow-[#00767D]/20">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
