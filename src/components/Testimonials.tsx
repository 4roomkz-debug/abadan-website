"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, signature, type TestimonialId } from "@/data/testimonials";

/**
 * Отзывы на главной: одна цитата крупно, листается стрелками, точками и
 * свайпом. Цитата появляется по словам — приём из разбора SceneAI.
 *
 * Слова анимируются только после того, как секция попала в экран или
 * пользователь сам листнул: до этого текст виден сразу (без JS, в превью
 * ссылок, на печати). Все цитаты лежат в одной ячейке сетки, видна одна —
 * высота блока равна самой длинной цитате, и стрелки не прыгают.
 *
 * Только дословные цитаты из писем, см. src/data/testimonials.ts.
 */

const HOME_IDS: TestimonialId[] = [
  "pharma",
  "vitaprofi",
  "k7",
  "kaspi",
  "oilGasAtyrau",
  "narxoz",
  "nuris",
  "most",
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  // Сколько раз запускали появление: меняет key, чтобы анимация шла заново.
  const [run, setRun] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setRun((r) => (r === 0 ? 1 : r));
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const go = (next: number) => {
    setIndex((next + HOME_IDS.length) % HOME_IDS.length);
    setRun((r) => r + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="otzyvy"
      className="py-20 sm:py-28 bg-gradient-to-br from-[#1a2e30] via-[#0d2628] to-[#0a1f21] relative overflow-hidden"
    >
      <div className="absolute -top-24 right-1/4 w-[420px] h-[420px] bg-[#00767D]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-[20%] w-[320px] h-[320px] bg-[#F0BB1E]/5 rounded-full blur-[110px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white scroll-fade-in">
            Клиенты о наших <span className="text-[#F0BB1E]">тренингах</span>
          </h2>
          <p className="mt-3 text-[#B8CDD0] scroll-fade-in scroll-delay-1">
            Дословно из благодарственных писем.
          </p>

          <div
            className="mt-10 sm:mt-12 grid"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
            }}
          >
            {HOME_IDS.map((id, i) => {
              const t = TESTIMONIALS[id];
              const active = i === index;
              return (
                <figure
                  key={id}
                  aria-hidden={!active}
                  aria-live={active ? "polite" : undefined}
                  className={`col-start-1 row-start-1 ${active ? "" : "invisible"}`}
                >
                  <blockquote className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold leading-snug text-white text-pretty">
                    {active && run > 0 ? (
                      <span key={run}>
                        {t.quote.split(" ").map((word, w) => (
                          <span key={w}>
                            <span className="word-in" style={{ animationDelay: `${w * 32}ms` }}>
                              {word}
                            </span>{" "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      t.quote
                    )}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-[#F0BB1E] font-semibold">{signature(t)}</p>
                    <p className="mt-1 text-sm text-[#8FB3B8]">{t.training}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Предыдущий отзыв"
              className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0BB1E]"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Следующий отзыв"
              className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0BB1E]"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <div className="ml-2 flex flex-wrap items-center gap-1">
              {HOME_IDS.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Отзыв ${i + 1} из ${HOME_IDS.length}`}
                  aria-current={i === index ? "true" : undefined}
                  className="w-6 h-11 flex items-center justify-center group focus-visible:outline-none"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#F0BB1E] ${
                      i === index ? "w-5 bg-[#F0BB1E]" : "w-1.5 bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
