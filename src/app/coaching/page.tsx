"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CoachingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const company = formData.get("company") as string;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: `[Коучинг первых руководителей]\nДолжность: ${position}\nКомпания: ${company}`,
        }),
      });
      setFormStatus("success");
    } catch {
      setFormStatus("success");
    }
  };

  const traps = [
    {
      title: "Ловушка контроля",
      quote: "Проверяю всё лично, потому что никто не сделает так же хорошо",
      desc: "Страх делегировать. За этим — конкретный негативный опыт: подвёл человек, обманули. Защитная реакция, которая душит рост.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "Ловушка незаменимости",
      quote: "Не могу уехать в отпуск — без меня всё встаёт",
      desc: "Нет преемника. Вы — бутылочное горлышко. Не можете расти выше, потому что некому передать текущую роль.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Ловушка эмоций",
      quote: "Злюсь на ошибки, критикую вместо обратной связи",
      desc: "Команда боится говорить правду. Вы принимаете решения на неполной информации. Результаты страдают.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Ловушка одиночества",
      quote: "Не с кем поговорить честно",
      desc: "Подчинённые говорят то, что хотите слышать. Семья не понимает контекст. Коллеги — конкуренты. Вы варитесь в собственных мыслях.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const results = [
    "Видите корень проблемы, а не симптомы",
    "Строите систему делегирования — не «отдал и забыл»",
    "Готовите преемника на свою текущую роль",
    "Меняете стиль обратной связи — команда начинает говорить правду",
    "Находите баланс между контролем и доверием",
    "Выходите из операционки, освобождая 20-30% времени на стратегию",
  ];

  const sessions = [
    { num: 1, title: "Диагностика", desc: "Анкета лидерского стиля. Определение главного запроса. Оцифровка «где я сейчас».", result: "Понимание приоритетной зоны роста" },
    { num: 2, title: "Цель и план", desc: "Постановка конкретной цели на 7 недель. Первичный план действий.", result: "Чёткая стратегия трансформации" },
    { num: 3, title: "Мотивация и первые шаги", desc: "Работа с сопротивлением. Усиление мотивации. Система «минимум — 100% — максимум».", result: "Прохождение первого кризиса мотивации" },
    { num: 4, title: "Ценности и убеждения", desc: "Иерархия ценностей. Конфликт между целями и старыми убеждениями. Синхронизация.", result: "Внутренняя гармония между целью и ценностями" },
    { num: 5, title: "Новая идентичность", desc: "Кто я как руководитель? Выход за рамки старого самовосприятия. Стратегия Диснея.", result: "Новый взгляд на себя — и новые действия" },
    { num: 6, title: "Люди и команда", desc: "Анализ окружения. Кто помогает, кто мешает? Планирование взаимодействия.", result: "Конкретные шаги по построению команды" },
    { num: 7, title: "Итоги и дальнейший путь", desc: "Цифровые итоги «было — стало». Празднование результатов. План на следующий этап.", result: "Оцифрованная трансформация" },
  ];

  const methodology = [
    {
      title: "Новый Код Коучинга",
      desc: "Нейро-логические уровни Дилтса, шкалирование для оцифровки прогресса, 7-этапная трансформационная модель",
      color: "teal",
    },
    {
      title: "Эриксоновский коучинг",
      desc: "5 принципов коучинга, формула Бекхарда для преодоления сопротивления, рамка обратной связи вместо рамки провала",
      color: "gold",
    },
    {
      title: "Практика, а не учебник",
      desc: "12+ лет корпоративных тренингов, 14 000+ обученных. Казахстанский контекст: культура, менталитет, специфика управления",
      color: "teal",
    },
  ];

  const faqs = [
    {
      q: "Чем коучинг отличается от тренинга?",
      a: "Тренинг даёт знания и навыки группе. Коучинг — индивидуальная работа с вашим конкретным запросом. Коуч не учит, а помогает найти ваши решения через правильные вопросы, структуру и внешний взгляд.",
    },
    {
      q: "У меня нет времени на 7 недель",
      a: "Одна сессия — 60-90 минут в неделю. Меньше, чем совещание. При этом вы освободите 20-30% времени за счёт правильного делегирования. Инвестиция окупается в первый же месяц.",
    },
    {
      q: "Как понять, что это мне подходит?",
      a: "Начните с бесплатного 15-минутного звонка. Мы разберём ваш запрос и честно скажем, поможет ли коучинг именно в вашей ситуации. Никаких обязательств.",
    },
    {
      q: "Это работает онлайн?",
      a: "Да. Большинство сессий проходят по Zoom. Результат не зависит от формата — важен ваш запрос и готовность работать. Офлайн-встречи возможны в Алматы.",
    },
    {
      q: "Какая стоимость?",
      a: "Стоимость обсуждается индивидуально и зависит от формата и объёма работы. Свяжитесь с нами для обсуждения — мы подберём оптимальный вариант.",
    },
    {
      q: "Что если после первой сессии не подойдёт?",
      a: "Решение о продолжении вы принимаете после первой сессии — без обязательств. Первая сессия — это диагностика, которая ценна сама по себе.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background: video + gradient fallback */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21]" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover hidden sm:block"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none"; }}
          >
            <source src="/videos/coaching-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00767D]/10 rounded-full blur-[120px] z-[1]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0BB1E]/5 rounded-full blur-[100px] z-[1]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F0BB1E] text-sm font-semibold mb-8 scroll-fade-in backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Индивидуальная программа
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 scroll-fade-in scroll-delay-1 leading-tight">
              Вы построили компанию.<br />
              <span className="bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] bg-clip-text text-transparent">Но кто построит вас?</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto scroll-fade-in scroll-delay-2">
              Коучинг первых руководителей — 7 сессий, которые меняют стиль управления, команду и результаты
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm mb-10 scroll-fade-in scroll-delay-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00767D]"></span>
                7 сессий
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F0BB1E]"></span>
                60-90 мин каждая
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00767D]"></span>
                Онлайн или Алматы
              </span>
            </div>

            <a
              href="#form"
              className="gold-button inline-block scroll-fade-in scroll-delay-3"
            >
              Записаться на диагностику
            </a>
          </div>
        </div>
      </section>

      {/* ===== PAIN: 4 TRAPS ===== */}
      <section className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4">
                Узнаёте <span className="text-gradient-primary">себя?</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {traps.map((trap, index) => (
                <div
                  key={index}
                  className={`glass-card p-7 scroll-fade-in scroll-delay-${(index % 2) + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white">
                      {trap.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">{trap.title}</h3>
                      <p className="text-[#00767D] font-medium italic mb-3">«{trap.quote}»</p>
                      <p className="text-[#546569] text-sm leading-relaxed">{trap.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[#546569] text-lg max-w-2xl mx-auto scroll-fade-in">
              Это не дефект характера — это защитная реакция.{" "}
              <strong className="text-[#2D3A3C]">Но она душит и вас, и вашу команду.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ===== TRANSFORMATION ===== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4">
                Что меняется за <span className="text-gradient-gold">7 сессий</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-5 rounded-xl bg-white border border-[#00767D]/8 scroll-fade-in scroll-delay-${(index % 3) + 1}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#2D3A3C] font-medium">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7 SESSIONS TIMELINE ===== */}
      <section className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4">
                Программа из <span className="text-gradient-primary">7 сессий</span>
              </h2>
              <p className="text-lg text-[#546569]">Каждая сессия — конкретный шаг к трансформации</p>
            </div>

            <div className="space-y-0">
              {sessions.map((session, index) => (
                <div
                  key={index}
                  className={`relative flex gap-6 scroll-fade-in scroll-delay-${(index % 3) + 1}`}
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 || index === 6
                        ? "bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C]"
                        : "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white"
                    }`}>
                      {session.num}
                    </div>
                    {index < sessions.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-[#00767D]/20 to-transparent min-h-[60px]"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 flex-1">
                    <h3 className="text-lg font-bold text-[#2D3A3C] mb-1">{session.title}</h3>
                    <p className="text-[#546569] text-sm mb-2">{session.desc}</p>
                    <p className="text-[#00767D] text-sm font-medium">
                      Результат: {session.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== METHODOLOGY ===== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3A3C] mb-4">
                На чём <span className="text-gradient-primary">основана</span> программа
              </h2>
              <p className="text-lg text-[#546569]">Три подхода, которые доказали свою эффективность</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {methodology.map((item, index) => (
                <div
                  key={index}
                  className={`p-7 rounded-2xl scroll-fade-in scroll-delay-${index + 1} ${
                    item.color === "gold"
                      ? "bg-gradient-to-br from-[#F0BB1E]/10 to-[#F0BB1E]/5 border border-[#F0BB1E]/20"
                      : "bg-white border border-[#00767D]/10 shadow-sm"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-3 ${
                    item.color === "gold" ? "text-gradient-gold" : "text-[#2D3A3C]"
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-[#546569] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== COACH ===== */}
      <section className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
              {/* Photo */}
              <div className="md:col-span-2 scroll-fade-in">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#00767D]/15 to-[#F0BB1E]/15 rounded-3xl blur-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                    <Image
                      src="/images/founder.jpg"
                      alt="Гани Абадан — бизнес-коуч"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-3 scroll-fade-in scroll-delay-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0BB1E]/10 text-[#D4A017] text-sm font-semibold mb-4">
                  Ваш коуч
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3A3C] mb-2">
                  Гани Абадан
                </h2>
                <p className="text-[#00767D] font-medium mb-6">
                  Бизнес-тренер, коуч, предприниматель
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "12+ лет в корпоративном обучении",
                    "14 000+ обученных руководителей",
                    "CEO ibir.ai — платформа AI-микрообучения",
                    "Автор книги «Бизнес по любви 2.0»",
                    "Независимый директор АО «НК «Казахстан Ғарыш Сапары»",
                  ].map((fact, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00767D]/10 flex items-center justify-center text-[#00767D] flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#546569] text-sm">{fact}</span>
                    </div>
                  ))}
                </div>

                <blockquote className="border-l-4 border-[#F0BB1E] pl-4 py-2">
                  <p className="text-[#2D3A3C] italic">
                    «Не теоретик. Сам строю бизнес, управляю командой, принимаю сложные решения каждый день. Коучинг — из практики, не из учебника.»
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW TO START ===== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C] mb-4">
                Как <span className="text-gradient-gold">начать</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Короткий звонок", desc: "15 минут — понять ваш запрос и подходит ли формат" },
                { step: "02", title: "Анкета", desc: "Заполните анкету лидерского стиля до первой сессии" },
                { step: "03", title: "Первая сессия", desc: "Диагностика и контрактинг — уже ценна сама по себе" },
                { step: "04", title: "Ваше решение", desc: "Продолжить или нет — без обязательств" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`text-center p-6 scroll-fade-in scroll-delay-${index + 1}`}
                >
                  <div className="text-4xl font-extrabold text-[#00767D]/15 mb-3">{item.step}</div>
                  <h3 className="text-lg font-bold text-[#2D3A3C] mb-2">{item.title}</h3>
                  <p className="text-[#546569] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 sm:py-24 section-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3C]">
                Частые <span className="text-gradient-primary">вопросы</span>
              </h2>
            </div>

            <div className="space-y-3 scroll-fade-in scroll-delay-1">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#00767D]/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F8FAFA] transition-colors"
                  >
                    <span className="font-semibold text-[#2D3A3C] pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-[#00767D] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-[#546569] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA + FORM ===== */}
      <section id="form" className="py-16 sm:py-24 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00767D]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0BB1E]/5 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10 scroll-fade-in">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Готовы к изменениям?
              </h2>
              <p className="text-lg text-white/60">
                Запишитесь на бесплатную диагностическую сессию — 15 минут, которые дадут ясность
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
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="position"
                    type="text"
                    placeholder="Должность"
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                  <input
                    name="company"
                    type="text"
                    placeholder="Компания"
                    className="w-full px-5 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00767D] focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full gold-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Отправка..." : "Записаться на диагностику"}
                </button>
              </form>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-white/50 text-sm">
              <a href="tel:+87019188838" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 701 918-88-38
              </a>
              <a href="mailto:gani@abadan.kz" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                gani@abadan.kz
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
