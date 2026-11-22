"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

// Подписка на media query без гидратационного мигания: на сервере — false.
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// Активный шаг по положению на экране: последний, чей верх уже выше линии
// (доля высоты окна). Обычный scroll + rAF, без закрепления прокрутки.
export function useStepPicker(
  refs: RefObject<(HTMLElement | null)[]>,
  count: number,
  line: number,
  enabled: boolean,
): number {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let tick = false;
    const pick = () => {
      tick = false;
      const y = window.innerHeight * line;
      let best = 0;
      for (let k = 0; k < count; k++) {
        const el = refs.current?.[k];
        if (el && el.getBoundingClientRect().top < y) best = k;
      }
      setActive(best);
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(pick); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    pick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refs, count, line, enabled]);
  return active;
}
