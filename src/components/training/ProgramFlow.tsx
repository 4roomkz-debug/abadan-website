"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useMedia, useStepPicker } from "./useStepPicker";

// Схема «Как идёт корпоративная программа»: четыре части, каждая нарисована
// тонкой линией. Части — геометрия 360×110, одна и та же на телефоне (у каждого
// шага своя) и на десктопе (все четыре в закреплённой схеме, рисуются по шагам).
const d = (children: ReactNode) => <g className="pf-draw">{children}</g>;

const PARTS: ((on: boolean) => ReactNode)[] = [
  // 1. Запрос → коммерческое предложение
  () => d(<>
    <rect x="30" y="14" width="64" height="82" pathLength={1} />
    <path d="M44 38h36M44 54h36M44 70h24" pathLength={1} />
    <path d="M118 55h96m-14-10 14 10-14 10" pathLength={1} />
    <rect x="238" y="14" width="64" height="82" pathLength={1} />
    <path d="M252 38h36M252 54h36" pathLength={1} />
    <rect x="252" y="68" width="22" height="16" className="pf-fill" />
  </>),
  // 2. Старт: три квадрата, последний закрашен
  () => d(<>
    <rect x="34" y="27" width="56" height="56" pathLength={1} />
    <path d="M90 55h44" pathLength={1} />
    <rect x="134" y="27" width="56" height="56" pathLength={1} />
    <path d="M190 55h44" pathLength={1} />
    <rect x="234" y="27" width="56" height="56" className="pf-fill" />
  </>),
  // 3. 80% практики: кольцо с дугой 80% и три столбца
  () => d(<>
    <circle cx="70" cy="55" r="38" className="pf-track" />
    <circle cx="70" cy="55" r="38" className="pf-arc" pathLength={1} transform="rotate(-90 70 55)" />
    <path d="M70 29v52M44 55h52" className="pf-fine" />
    <path d="M130 55h40" pathLength={1} />
    <path d="M190 96V70M240 96V46M290 96V20" className="pf-bar" />
    <rect x="283" y="14" width="14" height="10" className="pf-fill" />
  </>),
  // 4. Домашнее задание, проверка, поддержка: лист с галочкой и петля
  () => d(<>
    <rect x="40" y="14" width="64" height="82" pathLength={1} />
    <path d="M54 40h36M54 56h24" pathLength={1} />
    <path d="M56 76l10 10 20-22" className="pf-tick" pathLength={1} />
    <path d="M150 55a46 46 0 1 1 46 46" pathLength={1} />
    <path d="M186 90l10 11-14 6" pathLength={1} />
    <circle cx="256" cy="55" r="8" className="pf-fill" />
  </>),
];

export default function ProgramFlow() {
  const t = useTranslations("training.program");
  const wide = useMedia("(min-width: 900px)");
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const active = useStepPicker(refs, PARTS.length, 0.62, wide);
  const svg = useRef<SVGSVGElement>(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const shown = useRef(-1);
  // Новая часть схемы рисуется линией: Web Animations по длине пути (pathLength = 1).
  useLayoutEffect(() => {
    if (!wide) { shown.current = -1; return; }
    const prev = shown.current;
    shown.current = active;
    if (reduced || prev < 0 || active <= prev) return;
    const ease = "cubic-bezier(.16, 1, .3, 1)";
    svg.current?.querySelectorAll<SVGGeometryElement>(".pf-part.on .pf-draw [pathLength]").forEach((el) => {
      const part = Number(el.closest(".pf-part")?.getAttribute("data-i"));
      if (part <= prev) return;
      if (el.classList.contains("pf-arc")) {
        el.animate({ strokeDasharray: ["0px 1px", ".8px 1px"] }, { duration: 1000, easing: ease });
      } else {
        el.animate({ strokeDashoffset: ["1px", "0px"] }, { duration: 1000, easing: ease });
      }
    });
  }, [active, wide, reduced]);
  const text = (i: number) => (
    <>
      <span className="pf-n" aria-hidden="true">{i + 1}</span>
      <h3 className="pf-title">{t(`steps.${i}.title`)}</h3>
      <p className="pf-desc">{t(`steps.${i}.desc`)}</p>
    </>
  );

  return (
    <section className="paper-section paper-section-tight has-sticky" aria-labelledby="program-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
        <h2 id="program-title" className="paper-display pf-head">{t("title")}</h2>
        <div className={`pf${wide ? " pf-wide" : ""}`}>
          {wide && (
            <div className="pf-stage" aria-hidden="true">
              <svg ref={svg} className="pf-svg" viewBox="0 0 360 500" focusable="false">
                <path d="M16 8v484" className="pf-spine" />
                {PARTS.map((part, i) => (
                  <g key={i} data-i={i} transform={`translate(0 ${i * 128 + 4})`} className={`pf-part${i <= active ? " on" : ""}${i === active ? " now" : ""}`}>
                    {part(i <= active)}
                  </g>
                ))}
              </svg>
            </div>
          )}
          <ol className="pf-steps">
            {PARTS.map((part, i) => (
              <li key={i} ref={(el) => { refs.current[i] = el; }} className={`pf-step${wide && i === active ? " on" : ""}`}>
                {!wide && (
                  <svg className="pf-mini pf-part on" viewBox="0 0 360 110" aria-hidden="true" focusable="false">{part(true)}</svg>
                )}
                {text(i)}
              </li>
            ))}
          </ol>
        </div>
      </div></div>
    </section>
  );
}
