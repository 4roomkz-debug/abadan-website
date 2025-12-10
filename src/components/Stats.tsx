"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function formatNumber(num: number, format: string): string {
  if (format === "space") {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return num.toString();
}

function AnimatedStat({
  targetNumber,
  label,
  suffix,
  format,
  isVisible,
  delay
}: {
  targetNumber: number;
  label: string;
  suffix: string;
  format: string;
  isVisible: boolean;
  delay: number;
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const count = useCountUp(targetNumber, 2000, shouldAnimate);

  return (
    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-gold tracking-tight whitespace-nowrap">
      {formatNumber(count, format)}<span className="text-[#F0BB1E]">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { number: 359, label: "компаний возвращаются снова", suffix: "", format: "plain" },
    { number: 14275, label: "сотрудников применяют знания", suffix: "", format: "space" },
    { number: 200, label: "экспертов под любую задачу", suffix: "+", format: "plain" },
    { number: 2015, label: "год первого результата", suffix: "", format: "plain" }
  ];

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observerCallback]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 section-subtle">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#00767D]/[0.02] via-transparent to-[#F0BB1E]/[0.02] blur-[100px]"></div>
      </div>

      {/* Elegant vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00767D]/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00767D]/5 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#00767D]/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Цифры, которые <span className="text-gradient-primary">говорят</span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-1 bg-[#00767D]/5 rounded-2xl p-1">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative bg-white p-10 text-center space-y-3 ${
                  index === 0 ? 'rounded-tl-xl rounded-bl-xl sm:rounded-bl-none lg:rounded-bl-xl' : ''
                } ${
                  index === stats.length - 1 ? 'rounded-br-xl rounded-tr-xl sm:rounded-tr-none lg:rounded-tr-xl' : ''
                } ${
                  isVisible ? 'animate-number' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <AnimatedStat
                  targetNumber={stat.number}
                  label={stat.label}
                  suffix={stat.suffix}
                  format={stat.format}
                  isVisible={isVisible}
                  delay={index * 150}
                />
                <div className="text-[#7A8B8E] font-medium text-sm leading-relaxed uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Additional info - premium banner */}
          <div className="mt-20">
            <div className="premium-card p-12 max-w-4xl mx-auto text-center relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#00767D]/15 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#00767D]/15 rounded-br-2xl"></div>

              <p className="text-xl sm:text-2xl text-[#546569] leading-relaxed">
                <span className="font-bold text-gradient-gold">10 лет</span> мы помогаем компаниям в{" "}
                <span className="font-semibold text-[#2D3A3C]">Казахстане и СНГ</span> превращать обучение в{" "}
                <span className="font-bold text-gradient-gold">измеримый рост эффективности</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
