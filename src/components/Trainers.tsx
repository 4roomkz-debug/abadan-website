"use client";

export default function Trainers() {
  const trainers = [
    {
      name: "Шамсутдинова Земфира Ильясовна",
      role: "Эксперт по HR и трудовому законодательству",
      description: "Семинары и вебинары по трудовому законодательству, кадровому администрированию и делопроизводству, кадровому аудиту, регистрации трудовых договоров на веб-портале enbek.kz, оформлению документов на привлечение иностранной рабочей силы.",
      photo: "/images/shamsutdinova.png",
      scale: "scale-[1.65]"
    },
    {
      name: "Курпенов Бакыт Касымович",
      role: "Старший преподаватель АУЭС",
      description: "Старший преподаватель АУЭС кафедры: Электрические станций, сети и системы. Исследования изменения влагосодержания яблок в гелиосушильном модуле.",
      photo: "/images/kurpenov.png",
      scale: "scale-150"
    },
    {
      name: "Серикбекулы Асхат",
      role: "Бизнес-консультант, MSc in Finance",
      description: "Консультант крупнейших организаций Республики Казахстан. Бизнес-консультант в области управления финансами и привлечения инвестиций, Управляющий партнер.",
      photo: "/images/serikbekuly.png",
      scale: "scale-150"
    }
  ];

  const expertises = ["HR", "Финансы", "Закупки", "Логистика", "Soft Skills", "Управление проектами", "Нефтегаз"];

  return (
    <section className="relative py-16 sm:py-20 section-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C]">
              Наши <span className="text-gradient-primary">тренеры</span>
            </h2>

            <p className="text-xl text-[#546569]">
              200+ экспертов-практиков с реальным опытом
            </p>
          </div>

          {/* Trainers grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className={`glass-card p-6 space-y-5 scroll-fade-in scroll-delay-${index + 1}`}
              >
                {/* Avatar with photo */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={trainer.photo}
                      alt={trainer.name}
                      className={`w-full h-full object-cover ${trainer.scale}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D3A3C]">
                      {trainer.name.split(' ').slice(0, 2).join(' ')}
                    </h3>
                    <p className="text-xs text-[#00767D]">
                      {trainer.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#546569] leading-relaxed line-clamp-4">
                  {trainer.description}
                </p>

                {/* Badges */}
                <div className="flex gap-2 pt-3 border-t border-[#00767D]/10">
                  <span className="px-3 py-1 rounded-lg bg-[#00767D]/5 text-xs font-medium text-[#546569]">
                    Эксперт
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#00767D]/5 text-xs font-medium text-[#546569]">
                    Практик
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Expert base highlight */}
          <div className="glass-card-teal p-8 sm:p-10 max-w-4xl mx-auto space-y-6 scroll-scale-in scroll-delay-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-bold text-[#2D3A3C]">200+ экспертов</p>
                <p className="text-[#546569]">в нашей базе</p>
              </div>
            </div>

            <p className="text-lg text-[#546569] text-center">
              У нас есть специалисты по любому направлению. Каждый тренер — практик с реальным опытом работы в своей области.
            </p>

            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {expertises.map((expertise, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg border border-[#00767D]/10 text-sm font-medium text-[#546569] hover:border-[#00767D]/30 hover:text-[#2D3A3C] transition-colors duration-300"
                >
                  {expertise}
                </span>
              ))}
            </div>

            <div className="pt-4 text-center">
              <a
                href="#contact"
                className="teal-button inline-block cursor-pointer"
              >
                Подобрать тренера
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/10 to-transparent"></div>
    </section>
  );
}
