"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

// Countdown Timer Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

const EVENT_DATE = new Date("2026-01-30T09:00:00+06:00");

const speakers = [
  {
    name: "Диас Жумагалиев",
    role: "AI и рекрутинг",
    image: "/speakers/dias.jpg",
    bio: [
      "4+ года в AI",
      "Технический консультант inDrive",
      "Эксперт Astana Hub",
      "Единственный амбассадор FlutterFlow в Казахстане",
    ],
    topic: "Революция найма с помощью ИИ: кейсы и метрики",
    topicDetails: [
      "Отбор кандидатов с помощью ИИ",
      "Как объяснить кандидату, почему ИИ его отклонил",
      "Реальные кейсы и измеримые результаты",
    ],
  },
  {
    name: "Даниэль Алисов",
    role: "AI-агенты и автоматизация",
    image: "/speakers/daniel.jpg",
    bio: [
      "8+ лет в маркетинге",
      "5+ лет в автоматизации",
      "3000+ часов практики",
      "100+ ИИ-ассистентов и автоматизаций продано",
    ],
    topic: "ИИ-агенты для HR",
    topicDetails: [
      "Что такое AI-агенты и чем они отличаются от ботов",
      "Когда и как убрать человека и передать управление ИИ",
      "Как сохранить качество при автоматизации",
    ],
  },
  {
    name: "Гани Абадан",
    role: "Модератор + демо ibirAi",
    image: "/speakers/gani.jpg",
    bio: [
      "10+ лет в бизнес-обучении",
      "Основатель ibirAi",
      "14 000+ обученных",
    ],
    topic: "Тренды AI в HR 2026 + Демо ibirAi",
    topicDetails: [
      "Тренды AI в HR 2026",
      "Демо: как работает микрообучение через Telegram",
      "Кейс Polpharma Santo",
    ],
  },
];

const program = [
  { time: "08:30", title: "Кофе и нетворкинг", speaker: null, duration: "30 мин", icon: "☕" },
  { time: "09:00", title: "Открытие: AI меняет HR — факты и цифры", speaker: "Гани Абадан", duration: "10 мин", icon: "🎤" },
  { time: "09:10", title: "Революция найма с помощью ИИ: кейсы и метрики", speaker: "Диас Жумагалиев", duration: "20 мин", icon: "🤖" },
  { time: "09:30", title: "Q&A по рекрутингу", speaker: "Диас + аудитория", duration: "10 мин", icon: "❓" },
  { time: "09:40", title: "ИИ-агенты для HR: когда убрать человека", speaker: "Даниэль Алисов", duration: "20 мин", icon: "⚡" },
  { time: "10:00", title: "Q&A по автоматизации", speaker: "Даниэль + аудитория", duration: "10 мин", icon: "❓" },
  { time: "10:10", title: "Перерыв", speaker: null, duration: "10 мин", icon: "☕" },
  { time: "10:20", title: "Демо ibirAi: микрообучение в Telegram", speaker: "Гани Абадан", duration: "15 мин", icon: "📱" },
  { time: "10:35", title: "Панельная дискуссия: будущее HR", speaker: "Все спикеры", duration: "20 мин", icon: "💬" },
  { time: "10:55", title: "Закрытие + CTA", speaker: "Гани Абадан", duration: "5 мин", icon: "🎯" },
  { time: "11:00", title: "Нетворкинг + follow-up", speaker: null, duration: "30 мин", icon: "🤝" },
];

export default function BusinessBreakfastPage() {
  const timeLeft = useCountdown(EVENT_DATE);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    position: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `🎯 Новая регистрация на Бизнес-завтрак "AI в HR"!\n\n👤 Имя: ${formData.name}\n📱 Телефон: ${formData.phone}\n📧 Email: ${formData.email || "не указан"}\n🏢 Компания: ${formData.company || "не указана"}\n💼 Должность: ${formData.position || "не указана"}`;

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `Регистрация на Бизнес-завтрак "AI в HR". Email: ${formData.email || "не указан"}. Компания: ${formData.company || "не указана"}. Должность: ${formData.position || "не указана"}`,
        }),
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFB] to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00767D]/10 via-[#F8FAFB] to-[#F0BB1E]/10" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00767D]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F0BB1E]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00767D]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#7A8B8E] mb-8">
            <Link href="/" className="hover:text-[#00767D] transition-colors">Главная</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/schedule" className="hover:text-[#00767D] transition-colors">Расписание</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#2D3A3C] font-medium">Бизнес-завтрак</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00767D]/10 rounded-full mb-6">
              <span className="text-2xl">🤖</span>
              <span className="text-[#00767D] font-semibold">Бесплатное мероприятие</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3A3C] mb-6">
              Бизнес-завтрак:<br />
              <span className="text-[#00767D]">AI в HR</span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#546569] mb-8 max-w-3xl mx-auto">
              Революция найма и обучения — кейсы, метрики, практика
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
              <div className="flex items-center gap-2 text-[#2D3A3C]">
                <span className="text-2xl">📅</span>
                <span className="font-semibold">30 января 2026</span>
              </div>
              <div className="flex items-center gap-2 text-[#2D3A3C]">
                <span className="text-2xl">⏰</span>
                <span className="font-semibold">09:00 - 11:30</span>
              </div>
              <div className="flex items-center gap-2 text-[#2D3A3C]">
                <span className="text-2xl">📍</span>
                <span className="font-semibold">Алматы, Променад</span>
              </div>
              <div className="flex items-center gap-2 text-[#2D3A3C]">
                <span className="text-2xl">👥</span>
                <span className="font-semibold">25-30 мест</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-10">
              <p className="text-[#546569] text-sm mb-4">До начала мероприятия:</p>
              <div className="flex justify-center gap-3 sm:gap-6">
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-[#00767D]/10 min-w-[70px] sm:min-w-[80px]">
                  <div className="text-2xl sm:text-4xl font-bold text-[#00767D]">{timeLeft.days}</div>
                  <div className="text-xs sm:text-sm text-[#546569]">дней</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-[#00767D]/10 min-w-[70px] sm:min-w-[80px]">
                  <div className="text-2xl sm:text-4xl font-bold text-[#00767D]">{timeLeft.hours}</div>
                  <div className="text-xs sm:text-sm text-[#546569]">часов</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-[#00767D]/10 min-w-[70px] sm:min-w-[80px]">
                  <div className="text-2xl sm:text-4xl font-bold text-[#00767D]">{timeLeft.minutes}</div>
                  <div className="text-xs sm:text-sm text-[#546569]">минут</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-[#00767D]/10 min-w-[70px] sm:min-w-[80px]">
                  <div className="text-2xl sm:text-4xl font-bold text-[#F0BB1E]">{timeLeft.seconds}</div>
                  <div className="text-xs sm:text-sm text-[#546569]">секунд</div>
                </div>
              </div>
            </div>

            <a
              href="#register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#F0BB1E]/30 transition-all transform hover:scale-105"
            >
              Зарегистрироваться бесплатно
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#2D3A3C] mb-12">
            Что вы <span className="text-[#00767D]">узнаете</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#00767D]/10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Как казахстанские компании используют AI в HR</h3>
              <p className="text-[#546569]">Реальные кейсы внедрения AI в процессы найма и обучения</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#00767D]/10">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Практические инструменты</h3>
              <p className="text-[#546569]">AI-инструменты, которые можно внедрить уже завтра</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#00767D]/10">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-[#2D3A3C] mb-3">Нетворкинг с HR-директорами</h3>
              <p className="text-[#546569]">Общение с коллегами, обмен опытом и контактами</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F8FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#2D3A3C] mb-12">
            <span className="text-[#00767D]">Спикеры</span> мероприятия
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#00767D]/10 shadow-sm hover:shadow-lg transition-shadow">
                {/* Photo */}
                <div className="relative h-64 bg-gradient-to-br from-[#00767D]/20 to-[#F0BB1E]/20">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-[#00767D]/20 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D3A3C] mb-1">{speaker.name}</h3>
                  <p className="text-[#00767D] font-medium mb-4">{speaker.role}</p>

                  <ul className="space-y-1 mb-4">
                    {speaker.bio.map((item, i) => (
                      <li key={i} className="text-sm text-[#546569] flex items-start gap-2">
                        <span className="text-[#F0BB1E]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#00767D]/10">
                    <p className="text-sm font-semibold text-[#2D3A3C] mb-2">Тема выступления:</p>
                    <p className="text-[#00767D] font-medium">{speaker.topic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#2D3A3C] mb-12">
            <span className="text-[#00767D]">Программа</span> мероприятия
          </h2>

          <div className="max-w-3xl mx-auto">
            {program.map((item, index) => (
              <div
                key={index}
                className={`flex gap-4 py-4 ${index !== program.length - 1 ? "border-b border-[#00767D]/10" : ""}`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#00767D] font-bold">{item.time}</span>
                    <span className="text-xs text-[#94A3B8] bg-[#F8FAFB] px-2 py-0.5 rounded">{item.duration}</span>
                  </div>
                  <h3 className="font-semibold text-[#2D3A3C]">{item.title}</h3>
                  {item.speaker && (
                    <p className="text-sm text-[#546569]">{item.speaker}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 bg-[#F8FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#2D3A3C] mb-12">
            <span className="text-[#00767D]">Место</span> проведения
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#00767D]/10 shadow-sm">
              {/* Map */}
              <div className="h-64 sm:h-80 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.5123!2d76.9456!3d43.2387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb5!2z0J_RgNC-0LzQtdC90LDQtCDQkdC40LfQvdC10YEt0L_QsNGA0Lo!5e0!3m2!1sru!2skz!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              {/* Address Info */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#00767D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2D3A3C] mb-1">Адрес</h3>
                        <p className="text-[#546569]">г. Алматы, ул. Абая 44а</p>
                        <p className="text-[#546569]">Променад бизнес-парк, цокольный этаж</p>
                        <p className="text-[#00767D] font-medium">Конференц-зал «Орда»</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#F0BB1E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🚗</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2D3A3C] mb-1">Как добраться</h3>
                        <p className="text-[#546569]">Рядом с пересечением Абая и Достык</p>
                        <p className="text-[#546569]">Есть бесплатная парковка</p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://2gis.kz/almaty/search/%D0%9F%D1%80%D0%BE%D0%BC%D0%B5%D0%BD%D0%B0%D0%B4%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D0%BF%D0%B0%D1%80%D0%BA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#00767D]/10 text-[#00767D] font-medium rounded-lg hover:bg-[#00767D]/20 transition-colors"
                >
                  <span>Открыть в 2ГИС</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-16 bg-gradient-to-b from-white to-[#F8FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-4">
                <span className="text-[#00767D]">Регистрация</span>
              </h2>
              <p className="text-[#546569]">
                Количество мест ограничено. Зарегистрируйтесь, чтобы забронировать своё место.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-white rounded-2xl p-8 border border-[#00767D]/10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00767D]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#00767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2D3A3C] mb-2">Вы зарегистрированы!</h3>
                <p className="text-[#546569] mb-4">Мы отправим вам подтверждение и детали мероприятия на указанные контакты.</p>
                <p className="text-sm text-[#94A3B8]">До встречи 30 января!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#00767D]/10 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#546569] mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#546569] mb-1">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#546569] mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#546569] mb-1">Компания</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="Название компании"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#546569] mb-1">Должность</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFB] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#94A3B8] focus:outline-none focus:border-[#00767D] focus:ring-1 focus:ring-[#00767D] transition-all"
                      placeholder="Ваша должность"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#F0BB1E]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Отправка..." : "Зарегистрироваться бесплатно"}
                </button>

                <p className="mt-4 text-center text-sm text-[#94A3B8]">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00767D]/10 py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#94A3B8] text-sm">
            © 2026 Abadan & Co. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
