"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// API Base URL
const API_BASE = "https://breakfast-bot-production.up.railway.app";

// Slide data
const slides = [
  { id: "cover", type: "cover" },
  { id: "telegram-start", type: "telegram" },
  { id: "program", type: "program" },
  { id: "about-gani", type: "about-gani" },
  { id: "story-1", type: "story-1" },
  { id: "story-2", type: "story-2" },
  { id: "story-3", type: "story-3" },
  { id: "top-requests", type: "top-requests" },
  { id: "dias-intro", type: "dias-intro" },
  { id: "daniel-intro", type: "daniel-intro" },
  { id: "ibirai-intro", type: "ibirai-intro" },
  { id: "ibirai-features", type: "ibirai-features" },
  { id: "ibirai-demo", type: "ibirai-demo" },
  { id: "panel", type: "panel" },
  { id: "insights", type: "insights" },
  { id: "next-steps", type: "next-steps" },
  { id: "telegram-end", type: "telegram" },
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
      case "telegram":
        return <TelegramSlide />;
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
      case "dias-intro":
        return <DiasIntroSlide />;
      case "daniel-intro":
        return <DanielIntroSlide />;
      case "ibirai-intro":
        return <IbiraiIntroSlide />;
      case "ibirai-features":
        return <IbiraiFeaturesSlide />;
      case "ibirai-demo":
        return <IbiraiDemoSlide />;
      case "panel":
        return <PanelSlide />;
      case "insights":
        return <InsightsSlide />;
      case "next-steps":
        return <NextStepsSlide />;
      case "final":
        return <FinalSlide />;
      default:
        return null;
    }
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-[#F8FAFB] to-white overflow-hidden relative select-none">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full w-full flex items-center justify-center p-8 md:p-16"
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
    <div className="text-center max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00767D]/10 rounded-full mb-8">
        <span className="text-2xl">🤖</span>
        <span className="text-[#00767D] font-semibold">Бизнес-завтрак</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-[#2D3A3C] mb-4">
        AI в <span className="text-[#00767D]">HR</span>
      </h1>

      <div className="w-32 h-1 bg-gradient-to-r from-[#00767D] to-[#F0BB1E] mx-auto mb-8" />

      <p className="text-2xl md:text-3xl text-[#546569] mb-12">
        Революция найма и обучения
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-lg text-[#2D3A3C]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <span className="font-semibold">30 января 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <span className="font-semibold">Алматы, Орда</span>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-2 text-[#00767D] animate-pulse">
        <span>Нажмите →</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

function TelegramSlide() {
  return (
    <div className="text-center max-w-3xl">
      <div className="text-6xl mb-6">🤖</div>

      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-4">
        Запустите <span className="text-[#00767D]">бота</span>
      </h2>

      <p className="text-xl text-[#546569] mb-10">
        Представьтесь, задавайте вопросы, делитесь инсайтами
      </p>

      {/* QR Code */}
      <div className="w-64 h-64 mx-auto bg-white rounded-2xl border-4 border-[#00767D] flex items-center justify-center mb-8 shadow-xl overflow-hidden">
        <Image
          src="/images/qr-bot.png"
          alt="QR код бота"
          width={240}
          height={240}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            // Fallback if image not found
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `
              <div class="text-center p-4">
                <div class="text-5xl mb-2">💬</div>
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

      <p className="mt-6 text-[#94A3B8]">
        Нажмите /start в боте
      </p>
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
    <div className="text-center max-w-4xl">
      <div className="text-6xl mb-8">💭</div>

      <blockquote className="text-3xl md:text-5xl font-bold text-[#2D3A3C] leading-tight mb-8">
        «Как измерить <span className="text-[#00767D]">ROI</span> от тренинга?»
      </blockquote>

      <p className="text-xl md:text-2xl text-[#546569]">
        Этот вопрос я слышал <span className="font-bold text-[#2D3A3C]">15 лет</span>.<br />
        От каждого клиента.
      </p>

      <div className="mt-12 text-lg text-[#94A3B8]">
        И не мог на него ответить.
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
      <div className="text-6xl mb-8">💡</div>

      <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A3C] mb-8">
        А потом появился <span className="text-[#00767D]">AI</span>
      </h2>

      <p className="text-xl text-[#546569] mb-8">
        AI работает как <span className="font-bold">T9</span> в телефоне:<br />
        предсказывает на основе данных.
      </p>

      <div className="bg-gradient-to-r from-[#00767D] to-[#006D77] rounded-2xl p-8 text-white">
        <p className="text-xl mb-4">Если собирать данные о том, как человек учится —</p>
        <p className="text-2xl font-bold">
          мы видим не просто «понял — не понял»,<br />
          а целый <span className="text-[#F0BB1E]">портрет</span>:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-white/20 rounded-full">Потенциал</span>
          <span className="px-4 py-2 bg-white/20 rounded-full">Таланты</span>
          <span className="px-4 py-2 bg-white/20 rounded-full">Готовность к росту</span>
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

function IbiraiIntroSlide() {
  return (
    <div className="text-center max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0BB1E]/20 rounded-full mb-8">
        <span className="text-2xl">🚀</span>
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
    "AI заберёт работу у HR?",
    "Главные ошибки при внедрении AI?",
    "С чего начать — первый шаг?",
    "Как изменится HR через 3 года?",
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
          <div className="space-y-3">
            {moderatorQuestions.map((question, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#00767D]/10"
              >
                <span className="text-xl text-[#F0BB1E]">❓</span>
                <span className="text-[#2D3A3C]">{question}</span>
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

function NextStepsSlide() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl md:text-5xl font-bold text-[#2D3A3C] mb-12 text-center">
        Что <span className="text-[#00767D]">дальше</span>?
      </h2>

      <div className="space-y-6">
        <div className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-[#00767D]/10 shadow-sm">
          <div className="text-4xl">📱</div>
          <div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">Telegram-группа</h3>
            <p className="text-[#546569]">Материалы, запись, контакты спикеров</p>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-[#F0BB1E]/20 to-[#F0BB1E]/5 rounded-2xl border-2 border-[#F0BB1E]">
          <div className="text-4xl">🚀</div>
          <div>
            <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">Попробовать ibirAi</h3>
            <p className="text-[#546569]">Бесплатный пилот для первых 3 компаний</p>
            <p className="text-[#00767D] font-semibold mt-2">Напишите @gani_abadan</p>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-white rounded-2xl border border-[#00767D]/10 shadow-sm">
          <div className="text-4xl">🤝</div>
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
    <div className="text-center max-w-4xl">
      <h2 className="text-5xl md:text-7xl font-bold text-[#2D3A3C] mb-6">
        Спасибо!
      </h2>

      <div className="w-32 h-1 bg-gradient-to-r from-[#00767D] to-[#F0BB1E] mx-auto mb-8" />

      <p className="text-2xl text-[#546569] mb-12">
        AI в HR • 30 января 2026
      </p>

      <div className="flex justify-center gap-8 items-center">
        <div className="text-center">
          <p className="text-lg text-[#2D3A3C] font-semibold">abadan.kz</p>
          <p className="text-sm text-[#546569]">Корпоративное обучение</p>
        </div>
        <div className="w-px h-12 bg-[#00767D]/20" />
        <div className="text-center">
          <p className="text-lg font-semibold"><span className="text-[#2D3A3C]">ibir</span><span className="text-[#00767D]">Ai</span></p>
          <p className="text-sm text-[#546569]">Микрообучение с AI</p>
        </div>
      </div>

      <div className="mt-16 text-6xl">
        🎯
      </div>
    </div>
  );
}
