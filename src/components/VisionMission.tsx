"use client";

export default function VisionMission() {
  const steps = [
    {
      number: "01",
      title: "Диагностика",
      description: "Понимаем вашу бизнес-задачу, а не просто запрос на тренинг"
    },
    {
      number: "02",
      title: "Программа",
      description: "Привязываем каждый модуль к конкретным KPI"
    },
    {
      number: "03",
      title: "Практика",
      description: "Отрабатываем на ваших реальных кейсах"
    },
    {
      number: "04",
      title: "Результат",
      description: "Измеряем изменения и доводим до закрепления"
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 section-subtle">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#00767D]/[0.03] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Не тренинг, а <span className="text-gradient-gold">бизнес-результат</span>
            </h2>
          </div>

          {/* Main belief card */}
          <div className="mb-16 scroll-scale-in scroll-delay-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00767D]/5 to-transparent rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 sm:p-12 relative">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center shadow-[0_0_30px_rgba(240,187,30,0.2)]">
                    <svg className="w-8 h-8 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2D3A3C]">
                    Наше убеждение
                  </h3>

                  <p className="text-xl sm:text-2xl text-[#546569] leading-relaxed">
                    Обучение должно решать <span className="text-[#2D3A3C] font-semibold">конкретную бизнес-задачу</span>.
                    Не «провести тренинг», а{" "}
                    <span className="text-gradient-gold font-semibold">«увеличить конверсию»</span>,{" "}
                    <span className="text-gradient-gold font-semibold">«сократить текучесть»</span>,{" "}
                    <span className="text-gradient-gold font-semibold">«ускорить онбординг»</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="premium-card p-8 space-y-4 group hover:border-[#00767D]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold text-gradient-gold">{step.number}</span>
                  {index < steps.length - 1 && (
                    <svg className="w-6 h-6 text-[#E0E5E6] hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#2D3A3C]">
                  {step.title}
                </h3>

                <p className="text-[#546569] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
