"use client";

import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { number: "359", label: "компаний возвращаются снова", suffix: "" },
    { number: "14 275", label: "сотрудников применяют знания", suffix: "" },
    { number: "200", label: "экспертов под любую задачу", suffix: "+" },
    { number: "2015", label: "год первого результата", suffix: "" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 section-dark-2">
      {/* Luxury ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#D4AF37]/[0.03] via-transparent to-[#14B8A6]/[0.03] blur-[100px]"></div>
      </div>

      {/* Elegant vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA]">
              Цифры, которые <span className="text-gradient-gold">говорят</span>
            </h2>
          </div>

          {/* Stats grid - luxury style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1 bg-[#D4AF37]/5 rounded-2xl p-1">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative bg-[#050508] p-10 text-center space-y-3 ${
                  index === 0 ? 'rounded-tl-xl rounded-bl-xl sm:rounded-bl-none lg:rounded-bl-xl' : ''
                } ${
                  index === stats.length - 1 ? 'rounded-br-xl rounded-tr-xl sm:rounded-tr-none lg:rounded-tr-xl' : ''
                } ${
                  isVisible ? 'animate-number' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-gold tracking-tight whitespace-nowrap">
                  {stat.number}<span className="text-[#D4AF37]">{stat.suffix}</span>
                </div>
                <div className="text-[#71717A] font-medium text-sm leading-relaxed uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Additional info - premium banner */}
          <div className="mt-20">
            <div className="premium-card p-12 max-w-4xl mx-auto text-center relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#D4AF37]/20 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#D4AF37]/20 rounded-br-2xl"></div>

              <p className="text-xl sm:text-2xl text-[#A1A1AA] leading-relaxed">
                <span className="font-bold text-gradient-gold">10 лет</span> мы помогаем компаниям в{" "}
                <span className="font-semibold text-[#FAFAFA]">Казахстане и СНГ</span> превращать обучение в{" "}
                <span className="font-bold text-gradient-gold">измеримый рост эффективности</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
    </section>
  );
}
