"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useMedia, useStepPicker } from "./useStepPicker";

export type RouteStep = {
  id: string;
  title: string;
  desc: string;
  /** Живое число ближайших курсов; null — пока не известно или их нет. */
  countLabel: string | null;
  href?: string;
};

const BASE = "/stock/neftegaz";

// Фото на бумаге: постер всегда под видео, видео появляется поверх, когда пошло.
// Крутится только то, что на экране; при reduced-motion видео нет вообще.
function Clip({ id, run }: { id: string; run?: boolean }) {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = vid.current;
    if (!v || reduced) return;
    const stop = () => { v.pause(); };
    const go = () => { v.play().catch(() => {}); };
    if (run !== undefined) {
      if (run) go(); else stop();
      return stop;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? go() : stop()), { threshold: 0.45 });
    if (box.current) io.observe(box.current);
    return () => { io.disconnect(); stop(); };
  }, [run, reduced]);

  return (
    <div className="rt-photo" ref={box}>
      <Image src={`${BASE}/${id}-poster.webp`} alt="" width={960} height={540} sizes="(min-width: 900px) 50vw, 100vw" loading="lazy" unoptimized className="rt-img" />
      {!reduced && (
        <video
          ref={vid}
          className={`rt-video${playing ? " is-playing" : ""}`}
          src={`${BASE}/${id}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}

// «От скважины до переработки»: на экране от 900px слева закреплённая сцена с кадром
// активного шага, справа шаги прокручиваются мимо; на телефоне закрепления нет, у
// каждого шага свой кадр над текстом. Без JS остаётся список с постерами.
export default function OilRoute({
  steps, subLabel, onPick,
}: { steps: RouteStep[]; subLabel: string; onPick: (id: string) => void }) {
  const wide = useMedia("(min-width: 900px)");
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const active = useStepPicker(refs, steps.length, 0.62, wide);

  const list = (
    <ol className="rt-steps">
      {steps.map((s, i) => (
        <li
          key={s.id}
          ref={(el) => { refs.current[i] = el; }}
          className={`rt-step${wide && i === active ? " on" : ""}`}
        >
          {!wide && <div className="rt-media"><Clip id={s.id} /></div>}
          <span className="rt-n" aria-hidden="true">{i + 1}</span>
          <button type="button" className="rt-pick" onClick={() => onPick(s.id)}>
            <span className="rt-title">{s.title}</span>
            <span className="rt-desc">{s.desc}</span>
            {s.countLabel && <span className="rt-count">{s.countLabel} →</span>}
          </button>
          {s.href && <Link href={s.href} className="paper-link tr-area-sub">{subLabel} ↗</Link>}
        </li>
      ))}
    </ol>
  );

  if (!wide) return <div className="rt">{list}</div>;

  return (
    <div className="rt rt-wide">
      <div className="rt-stage" aria-hidden="true">
        <div className="rt-stage-in">
          <div className="rt-frames">
            {steps.map((s, i) => (
              <div key={s.id} className={`rt-frame${i === active ? " on" : ""}`}>
                <Clip id={s.id} run={i === active} />
              </div>
            ))}
          </div>
          <div className="rt-prog">
            <span className="rt-prog-bar"><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></span>
            <span>{active + 1} / {steps.length}</span>
          </div>
        </div>
      </div>
      {list}
    </div>
  );
}
