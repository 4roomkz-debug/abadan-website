"use client";

export default function Formats() {
  const formats = [
    {
      number: "01",
      title: "Очное",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-[#FBBF24] to-[#F59E0B]",
      items: [
        "В Алматы и других городах РК",
        "На территории заказчика",
        "Бизнес-туры за рубеж",
        "Тимбилдинги и выезды"
      ]
    },
    {
      number: "02",
      title: "По составу",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-[#14B8A6] to-[#0D9488]",
      items: [
        "Индивидуальное наставничество",
        "Корпоративное (закрытые группы)",
        "Открытые тренинги (от 2 чел.)"
      ]
    },
    {
      number: "03",
      title: "Онлайн",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-[#14B8A6] to-[#0D9488]",
      items: [
        "Вебинары (Zoom / MS Teams)",
        "Дистанционное обучение на портале",
        "100% техническая поддержка"
      ]
    }
  ];

  return (
    <section className="relative py-20 sm:py-32 section-dark-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F1F5F9]">
              Форматы <span className="text-gradient-primary">обучения</span>
            </h2>
            <p className="text-xl text-[#94A3B8]">
              Выберите удобный для вас формат
            </p>
          </div>

          {/* Formats grid - horizontal layout */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {formats.map((format, index) => (
              <div key={index} className="dark-card p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center`}>
                    {format.icon}
                  </div>
                  <span className="text-2xl font-bold text-[#64748B]/50">{format.number}</span>
                </div>

                <h3 className="text-2xl font-bold text-[#F1F5F9]">{format.title}</h3>

                <ul className="space-y-3">
                  {format.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#94A3B8]">
                      <span className="text-[#14B8A6] mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional benefits - horizontal */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="dark-glass px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#F1F5F9]">Гибкий график</p>
                <p className="text-xs text-[#64748B]">Подстраиваемся под ваш процесс</p>
              </div>
            </div>

            <div className="dark-glass px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#F1F5F9]">Группы от 2 человек</p>
                <p className="text-xs text-[#64748B]">Даже для малых команд</p>
              </div>
            </div>

            <div className="dark-glass px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#F1F5F9]">На вашей территории</p>
                <p className="text-xs text-[#64748B]">Обучение в удобном месте</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}
