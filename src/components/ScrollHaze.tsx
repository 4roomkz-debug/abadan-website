"use client";

import { useEffect, useRef } from "react";

// Дымка у нижнего края окна: намёк, что страница продолжается. Гаснет у самого
// конца страницы и пока в окне форма заявки (#contact), чтобы не размывать поля.
// Чат и модальные окна лежат выше (z-index 50), см. .scroll-haze в globals.css.
export default function ScrollHaze({ hideOver = "#contact" }: { hideOver?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let tick = false;
    const update = () => {
      tick = false;
      const doc = document.documentElement;
      const end = doc.scrollHeight - window.innerHeight - 60;
      let over = false;
      document.querySelectorAll(hideOver).forEach((t) => {
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) over = true;
      });
      node.classList.toggle("is-off", over || window.scrollY >= end);
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hideOver]);
  return (
    <div ref={el} className="scroll-haze" aria-hidden="true"><i /><i /><i /></div>
  );
}
