"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 section-white">
      {/* Minimal ambient effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-bl from-[#00767D]/[0.02] to-transparent blur-[80px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Партнёр по <span className="text-gradient-gold">развитию команд</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Main text */}
            <div className="space-y-8 scroll-fade-in-left scroll-delay-1">
              <div className="space-y-6">
                <p className="text-xl text-[#546569] leading-relaxed">
                  <span className="text-[#2D3A3C] font-semibold">Abadan & Company</span> — это не курсы. Это партнёр, который берёт на себя развитие вашей команды с гарантией результата.
                </p>

                <p className="text-lg text-[#7A8B8E] leading-relaxed">
                  С 2015 года мы помогаем <span className="text-[#F0BB1E] font-semibold">359 компаниям</span> превращать обучение в измеримый рост эффективности. Не «провести тренинг», а решить бизнес-задачу.
                </p>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-gradient-gold">10</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Лет на рынке</p>
                </div>
                <div className="text-center border-x border-[#00767D]/10">
                  <p className="text-4xl font-extrabold text-gradient-gold">359</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Клиентов</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-gradient-gold">200+</p>
                  <p className="text-sm text-[#7A8B8E] mt-1">Экспертов</p>
                </div>
              </div>
            </div>

            {/* Right - Photo and Founder */}
            <div className="space-y-8 scroll-fade-in-right scroll-delay-2">
              {/* Real training photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/photos/20241113_114950139_iOS.jpg"
                  alt="Команда Abadan & Co. с участниками тренинга"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-medium">Гани Абадан с участниками тренинга</p>
                </div>
              </div>

              {/* Founder mini card */}
              <div className="premium-card p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden ring-2 ring-[#00767D]/20">
                    <img
                      src="/images/founder.jpg"
                      alt="Гани Абадан"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D3A3C]">Гани Абадан</h3>
                    <p className="text-[#00767D] text-sm font-medium">Основатель Abadan & Co.</p>
                  </div>
                </div>
                <p className="text-[#546569] text-sm mt-4 italic">
                  «Мы не "проводим тренинги" — мы решаем бизнес-задачи через развитие команд»
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
