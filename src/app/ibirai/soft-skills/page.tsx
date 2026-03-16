"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IconCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const IconX = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const skills = [
  {
    title: "Коммуникация",
    desc: "Убедительная речь, активное слушание, ясное изложение мыслей. AI симулирует сложные переговорные ситуации.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Обратная связь",
    desc: "Давать развивающую обратную связь без демотивации. Практика на реальных рабочих сценариях с AI-оппонентом.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    title: "Переговоры",
    desc: "Техники win-win переговоров, работа с возражениями, аргументация позиции под давлением.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Управление конфликтами",
    desc: "Деэскалация напряжённых ситуаций, поиск общих интересов, медиация между сторонами конфликта.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Тайм-менеджмент",
    desc: "Приоритизация задач, работа с прокрастинацией, планирование в условиях неопределённости.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Эмоциональный интеллект",
    desc: "Распознавание и управление эмоциями, эмпатия, работа со стрессом в напряжённых ситуациях.",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "Можно ли обучить soft skills через AI?",
    a: "Да. ibirAi использует диалоговые симуляции — AI моделирует реальные рабочие ситуации: трудный разговор с коллегой, переговоры с клиентом, ситуацию конфликта. Сотрудник практикует навык в безопасной среде и получает мгновенную персональную обратную связь по качеству своих ответов.",
  },
  {
    q: "Какие soft skills развивает ibirAi?",
    a: "Платформа охватывает 6 ключевых направлений: коммуникация и убедительная речь, обратная связь и коучинг, переговоры и влияние, управление конфликтами, тайм-менеджмент и приоритизация, эмоциональный интеллект.",
  },
  {
    q: "Как измеряется прогресс в развитии soft skills?",
    a: "ibirAi отслеживает качество ответов в симуляциях, динамику улучшения по каждому навыку и поведенческие изменения. HR-аналитика показывает прогресс по отделам и индивидуальным сотрудникам с возможностью сравнения со средними показателями по команде.",
  },
  {
    q: "Сколько времени нужно для развития soft skills через ibirAi?",
    a: "Первые измеримые результаты появляются через 4–6 недель ежедневных 3-минутных практик. Полноценное закрепление навыка требует 90 дней — именно такой горизонт рекомендуется для программ командного развития.",
  },
  {
    q: "Чем AI-обучение soft skills лучше тренингов?",
    a: "Тренинг даёт знание, но навык формируется через многократное повторение. ibirAi обеспечивает ежедневную практику в реалистичных симуляциях — это принципиально дешевле и масштабируемее, чем очные тренинги. Плюс данные по каждому сотруднику помогают HR видеть реальный прогресс.",
  },
];

export default function SoftSkillsPage() {
  return (
    <>
      <Header />

      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — Dark gradient
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00767D]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F0BB1E]/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10 scroll-fade-in">
              <a href="/" className="hover:text-white/70 transition-colors">Главная</a>
              <span>/</span>
              <a href="/ibirai" className="hover:text-white/70 transition-colors">ibirAi</a>
              <span>/</span>
              <span className="text-white/60">Soft Skills</span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#009BA3] font-600 mb-8 scroll-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#F0BB1E] animate-pulse" />
                ibirAi · Soft Skills
              </div>

              <h1 className="text-4xl md:text-6xl font-800 text-white mb-6 leading-tight scroll-fade-in scroll-delay-1">
                AI-обучение soft skills<br className="hidden md:block" />
                <span className="text-gradient-mixed"> через мессенджеры</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed scroll-fade-in scroll-delay-2">
                ibirAi развивает коммуникацию, лидерство и эмоциональный интеллект через ежедневные 3-минутные диалоговые симуляции в Telegram и WhatsApp. Без отрыва от работы, без новых приложений.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 scroll-fade-in scroll-delay-3">
                <a href="/ibirai" className="gold-button inline-block text-center">
                  Попробуйте бесплатно
                </a>
                <a
                  href="#skills"
                  className="inline-flex items-center justify-center gap-2 px-8 py-[18px] rounded-lg border border-white/20 text-white font-600 text-[0.95rem] transition-all hover:bg-white/5 hover:border-white/40"
                >
                  Смотреть навыки
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — Problems (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: heading */}
              <div className="scroll-fade-in-left">
                <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Проблема</p>
                <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-6 leading-tight">
                  Почему традиционные методы не работают для soft skills
                </h2>
                <p className="text-[#546569] text-lg leading-relaxed">
                  Тренинг по коммуникации — это ещё не коммуникативный навык. Навык формируется только через многократное повторение в реальных ситуациях.
                </p>
              </div>

              {/* Right: problem list */}
              <div className="scroll-fade-in-right space-y-4">
                {[
                  {
                    problem: "Тренинги дорогие и одноразовые",
                    detail: "Компания тратит миллионы на выездной тренинг, который забывается через 2 недели — без практики знания не закрепляются.",
                  },
                  {
                    problem: "Сложно масштабировать",
                    detail: "Провести качественный тренинг по soft skills одновременно для 500 сотрудников в разных городах — практически невозможно.",
                  },
                  {
                    problem: "Невозможно измерить результат",
                    detail: "«После тренинга сотрудники лучше общаются» — это не метрика. HR не может показать ROI обучения мягким навыкам.",
                  },
                  {
                    problem: "Нет систематической практики",
                    detail: "Одного интенсива раз в год недостаточно. Soft skills требуют регулярных повторений — ежедневно или еженедельно.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.problem}
                    className={`scroll-fade-in scroll-delay-${i + 1} flex gap-4 p-5 rounded-xl border border-red-50 bg-red-50/40`}
                  >
                    <span className="mt-0.5 text-red-400 flex-shrink-0">
                      <IconX />
                    </span>
                    <div>
                      <p className="font-700 text-[#2D3A3C] mb-1">{item.problem}</p>
                      <p className="text-sm text-[#546569] leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3 — How ibirAi teaches soft skills (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Подход</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                Как ibirAi развивает мягкие навыки
              </h2>
              <p className="text-[#546569] text-lg max-w-2xl mx-auto leading-relaxed">
                Не лекции — практика. AI создаёт реалистичные диалоговые симуляции, где сотрудник отрабатывает навык в безопасной среде с мгновенной обратной связью.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "AI-диалоговые симуляции",
                  desc: "Сотрудник получает рабочий сценарий: недовольный клиент, конфликт в команде, трудный разговор с руководителем. AI играет роль оппонента и адаптирует поведение под ответы пользователя.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  num: "02",
                  title: "Микро-сценарии в мессенджере",
                  desc: "3-минутный урок приходит в Telegram или WhatsApp в удобное для сотрудника время. Ответы на симуляцию — прямо в чате, без перехода в другие приложения.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  num: "03",
                  title: "Персональные петли обратной связи",
                  desc: "После каждой симуляции AI анализирует качество ответов: структуру, тон, эффективность техник. Сотрудник видит, что сработало, что нет, и получает конкретные рекомендации.",
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
              ].map((step, i) => (
                <div key={step.num} className={`scroll-fade-in scroll-delay-${i + 1} premium-card p-8`}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <span className="text-5xl font-800 text-[#00767D]/10 leading-none pt-1">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-700 text-[#2D3A3C] mb-3">{step.title}</h3>
                  <p className="text-[#546569] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4 — Skills Grid (White)
        ═══════════════════════════════════════════════════════ */}
        <section id="skills" className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Навыки</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-4">
                6 направлений soft skills
              </h2>
              <p className="text-[#546569] text-lg max-w-xl mx-auto">
                Каждое направление — отдельный трек с прогрессивными симуляциями от базового до продвинутого уровня.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <div
                  key={skill.title}
                  className={`scroll-fade-in scroll-delay-${(i % 3) + 1} glass-card-teal p-7 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center mb-5">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-700 text-[#2D3A3C] mb-2">{skill.title}</h3>
                  <p className="text-[#546569] text-sm leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5 — Results / Metrics (Dark gradient)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#00767D]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F0BB1E]/6 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 scroll-fade-in">
              <p className="text-sm font-700 text-[#F0BB1E] uppercase tracking-widest mb-3">Результаты</p>
              <h2 className="text-4xl md:text-5xl font-800 text-white mb-4">
                Измеримые изменения в поведении
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Данные по клиентам ibirAi, прошедшим 90-дневные программы soft skills
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { value: "+29%", label: "качество обратной связи", note: "по оценке 360°" },
                { value: "−34%", label: "эскалация конфликтов", note: "в командах" },
                { value: "+41%", label: "удовлетворённость коммуникацией", note: "внутри компании" },
                { value: "87%", label: "доходимость курсов", note: "vs 18% у традиционных тренингов" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`scroll-fade-in scroll-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/8 transition-all`}
                >
                  <div className="text-4xl font-800 text-[#F0BB1E] mb-2">{m.value}</div>
                  <div className="text-white font-700 mb-1">{m.label}</div>
                  <div className="text-xs text-white/40">{m.note}</div>
                </div>
              ))}
            </div>

            {/* Case quote */}
            <div className="scroll-fade-in max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-[#F0BB1E] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div>
                  <p className="text-white/80 text-lg leading-relaxed italic mb-5">
                    «После 90-дневной программы ibirAi по коммуникации и обратной связи мы увидели реальный сдвиг в культуре. Руководители начали давать структурированную обратную связь, а не просто критиковать. Пульс-опрос показал рост eNPS на 18 пунктов.»
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00767D]/30 flex items-center justify-center text-[#009BA3] font-700 text-sm">
                      ДС
                    </div>
                    <div>
                      <p className="text-white font-700 text-sm">Дарья Сейткали</p>
                      <p className="text-white/40 text-xs">HR-директор, производственная компания, 1 200 сотрудников</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6 — FAQ (White)
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-white py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14 scroll-fade-in">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-3">Вопросы и ответы</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C]">Часто задаваемые вопросы</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className={`scroll-fade-in scroll-delay-${i + 1} group premium-card overflow-hidden`}
                >
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none select-none">
                    <span className="font-700 text-[#2D3A3C] group-open:text-[#00767D] transition-colors text-[0.97rem]">
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#e8eded] flex items-center justify-center text-[#7A8B8E] group-open:bg-[#00767D] group-open:border-[#00767D] group-open:text-white transition-all">
                      <svg className="w-4 h-4 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-7 pb-6 pt-1 text-[#546569] leading-relaxed border-t border-[#f5f7f7]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 7 — CTA (bg-[#F8FAFA])
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#F8FAFA] py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="scroll-fade-in premium-card p-12">
              <p className="text-sm font-700 text-[#00767D] uppercase tracking-widest mb-4">Начните сегодня</p>
              <h2 className="text-4xl md:text-5xl font-800 text-[#2D3A3C] mb-6 leading-tight">
                Попробуйте ibirAi для<br className="hidden md:block" /> soft skills бесплатно
              </h2>
              <p className="text-[#546569] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Запустите пилот на вашей команде за 2 недели. Мы настроим первый трек под ваш запрос и поможем сделать первые замеры.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="/ibirai" className="gold-button inline-block text-center">
                  Попробуйте бесплатно
                </a>
                <a href="/schedule" className="dark-button inline-block text-center">
                  Посмотреть тренинги по soft skills
                </a>
              </div>

              <p className="text-sm text-[#7A8B8E]">
                Или свяжитесь с нами напрямую — расскажем о возможностях под ваш запрос.
              </p>

              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
                {[
                  { icon: <IconCheck />, text: "Запуск за 2–3 недели" },
                  { icon: <IconCheck />, text: "Без новых приложений" },
                  { icon: <IconCheck />, text: "Бесплатная демо-версия" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-[#546569]">
                    <span className="text-[#00767D]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
