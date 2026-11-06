"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { getUpcomingTrainings, type ScheduleItem } from "@/data/schedule";
import KnowledgeGraph from "./KnowledgeGraph";
import { STORY_SCENES, STORY_TRANSITIONS } from "./scenes";

gsap.registerPlugin(ScrollTrigger);

const subscribe = () => () => {};

// Пропорция картинки сцены (бумажная перекладка, 3:2): по ней считаем, где на
// экране оказалась точка рисунка после object-fit: cover (картинка прижата к
// правому краю, по вертикали по центру).
const ART_RATIO = 16 / 9;

function placeArt(frame: HTMLElement) {
  // offsetWidth/Height — размер до масштаба камеры: getBoundingClientRect
  // вернул бы уже увеличенный прямоугольник, и точки уезжали бы вправо.
  const w = frame.offsetWidth;
  const h = frame.offsetHeight;
  const scale = Math.max(w / ART_RATIO, h);
  const iw = scale * ART_RATIO;
  const ih = scale;
  frame.style.setProperty("--ix", `${w - iw}px`);
  frame.style.setProperty("--iy", `${(h - ih) / 2}px`);
  frame.style.setProperty("--iw", `${iw}px`);
  frame.style.setProperty("--ih", `${ih}px`);
}

// История обучения на прокрутке. На десктопе сцены-эпохи закреплены: внутри
// эпохи прокрутка ведёт камеру наездом, а смена эпох — дым — идёт по времени
// (≈1,3 с) и запускается, когда прокрутка пересекает границу сцены. Так переход
// одинаково плавный при любой скорости колёсика. Без JS, на телефоне и при
// prefers-reduced-motion сцены идут друг за другом обычной страницей.
// Прокрутка нативная: Lenis убран 06.11 — он спорил с scroll-behavior: smooth,
// и на трекпаде в Safari прокрутка залипала на первой сцене.
export default function StoryScroll() {
  const t = useTranslations("home.story");
  const tAll = useTranslations();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const upcoming: ScheduleItem[] = hydrated ? getUpcomingTrainings(3, new Date()) : [];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    // Возврат «назад» на историю. Next при возврате прокручивает к началу
    // страницы (пропуская прилипшую шапку — то есть к верху истории), и человек
    // терял место. Помечаем запись истории своим ключом и храним позицию в
    // sessionStorage: вернулись на ту же запись — ставим прокрутку обратно.
    type StoryState = { storyKey?: string } | null;
    const state = (window.history.state ?? null) as StoryState;
    const storyKey = state?.storyKey ?? `story-${Date.now().toString(36)}`;
    if (!state?.storyKey) window.history.replaceState({ ...(window.history.state ?? {}), storyKey }, "");
    let savedY: number | null = null;
    try { const v = sessionStorage.getItem(storyKey); savedY = v === null ? null : Number(v); } catch { /* приватный режим */ }
    let lastY = window.scrollY;
    const onScroll = () => { lastY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    let restoring = savedY !== null;

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      el.dataset.pinned = "true";

      const scenes = gsap.utils.toArray<HTMLElement>(".story-scene", el);
      const frames = gsap.utils.toArray<HTMLElement>(".story-art-frame", el);
      const tagLayers = gsap.utils.toArray<HTMLElement>(".story-tags", el);
      const smoke = el.querySelector<HTMLElement>(".story-smoke");
      const smoke2 = el.querySelector<HTMLElement>(".story-smoke-2");
      const wash = el.querySelector<HTMLElement>(".story-wash");
      const clips = gsap.utils.toArray<HTMLVideoElement>(".story-clip", el);
      const n = scenes.length;

      // Метки на рисунке: пересчёт при изменении размера окна.
      const ro = new ResizeObserver(() => tagLayers.forEach(placeArt));
      tagLayers.forEach((f) => { placeArt(f); ro.observe(f); });

      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set([smoke, smoke2, wash], { autoAlpha: 0 });
      gsap.set(clips, { autoAlpha: 0 });
      // Ролик следующего перехода подгружаем, когда его сцена стала активной.
      const loaded = new Set<number>();
      const preload = (i: number) => {
        const v = clips[i];
        if (!v || loaded.has(i)) return;
        loaded.add(i); v.preload = "auto"; v.load();
      };

      let shown = 0;
      let target = 0;
      let busy = false;

      const reveal = (i: number) => {
        gsap.set(scenes[shown], { autoAlpha: 0 });
        gsap.set(scenes[i], { autoAlpha: 1 });
        shown = i;
      };

      // Вперёд на одну эпоху — видео-трансформация: бумага сцены перекладывается в
      // следующую, последний кадр ролика и есть новая сцена. Если ролик не может
      // играть (нет файла, автозапуск запрещён) — дым, как и назад.
      const playClip = (k: number, to: number): Promise<boolean> =>
        new Promise((resolve) => {
          const v = clips[k];
          if (!v || !v.canPlayType("video/mp4")) return resolve(false);
          const copy = scenes[shown].querySelector(".story-copy");
          let settled = false;
          const finish = (ok: boolean) => {
            if (settled) return; settled = true;
            v.removeEventListener("ended", onEnded); v.removeEventListener("error", onError);
            if (!ok) { gsap.set(v, { autoAlpha: 0 }); gsap.set(copy, { autoAlpha: 1 }); return resolve(false); }
            reveal(to);
            gsap.set(copy, { autoAlpha: 1 });
            gsap.fromTo(scenes[to].querySelector(".story-copy"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 });
            gsap.to(v, { autoAlpha: 0, duration: 0.35, onComplete: () => { v.pause(); resolve(true); } });
          };
          const onEnded = () => finish(true);
          const onError = () => finish(false);
          v.addEventListener("ended", onEnded); v.addEventListener("error", onError);
          try { v.currentTime = 0; } catch { /* ещё не загружен */ }
          gsap.set(v, { autoAlpha: 1, scale: 1.03 });
          gsap.to(v, { scale: 1, duration: 0.8, ease: "sine.out" });
          gsap.to(copy, { autoAlpha: 0, duration: 0.4 });
          v.play().catch(() => finish(false));
        });

      const smokeTransition = () => {
        if (!smoke || !smoke2 || !wash) { reveal(target); busy = false; return; }
        gsap.timeline({ onComplete: () => { busy = false; transition(); } })
          .fromTo(smoke, { autoAlpha: 0, yPercent: 45, scale: 1 }, { autoAlpha: 1, yPercent: 0, scale: 1.25, duration: 0.9, ease: "sine.inOut" }, 0)
          .fromTo(smoke2, { autoAlpha: 0, yPercent: 60, scale: 1.1 }, { autoAlpha: 1, yPercent: 5, scale: 1.4, duration: 0.9, ease: "sine.inOut" }, 0.15)
          .to(wash, { autoAlpha: 1, duration: 0.35, ease: "sine.inOut" }, 0.7)
          .call(() => reveal(target), [], 1.05)
          .to(wash, { autoAlpha: 0, duration: 0.45, ease: "sine.inOut" }, 1.1)
          .to(smoke, { autoAlpha: 0, yPercent: -40, scale: 1.5, duration: 0.9, ease: "sine.inOut" }, 1.0)
          .to(smoke2, { autoAlpha: 0, yPercent: -35, scale: 1.6, duration: 0.9, ease: "sine.inOut" }, 1.1);
      };

      // Переход по времени. Пролистали сразу две эпохи — дым покажет последнюю.
      const transition = () => {
        if (busy || target === shown) return;
        busy = true;
        if (target === shown + 1 && clips[shown]) {
          playClip(shown, shown + 1).then((ok) => {
            if (ok) { busy = false; transition(); } else smokeTransition();
          });
          return;
        }
        smokeTransition();
      };

      // Наезд камеры внутри каждой эпохи — привязан к прокрутке.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          pin: el.querySelector(".story-stage"),
          start: "top top",
          end: `+=${n * 70}%`,
          scrub: 0.6,
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.floor(self.progress * n));
            if (i !== target) {
              target = i;
              setActive(i);
              preload(i);
              if (restoring) reveal(i); else transition();
            }
          },
          onRefresh: (self) => {
            // Страница открылась или вернулась «назад» с прокруткой посреди истории:
            // показываем нужную эпоху сразу, без дыма.
            const i = Math.min(n - 1, Math.floor(self.progress * n));
            target = i;
            setActive(i);
            preload(i);
            if (!busy) reveal(i);
          },
        },
      });
      scenes.forEach((scene, i) => {
        // Рисунок помещается в экран целиком; наезд едва заметный — движение дают ролики.
        tl.fromTo([frames[i], tagLayers[i]], { scale: 1, xPercent: 0 }, { scale: 1.03, xPercent: 0, duration: 1 }, i);
        tl.fromTo(scene.querySelector(".story-copy"), { y: 24 }, { y: -12, duration: 1 }, i);
      });

      // Панель «Найти курс» видна, пока идёт история, и уходит вместе с ней.
      const bar = el.querySelector(".story-bar");
      const barTrigger = bar
        ? ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", toggleClass: { targets: bar, className: "is-on" } })
        : null;

      // Safari возвращает страницу из кэша «назад» с прежним состоянием — пересчитываем позиции.
      const onShow = (e: PageTransitionEvent) => { if (e.persisted) ScrollTrigger.refresh(); };
      window.addEventListener("pageshow", onShow);
      const firstArt = el.querySelector<HTMLImageElement>(".story-art");
      if (firstArt && !firstArt.complete) firstArt.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

      return () => {
        window.removeEventListener("pageshow", onShow);
        ro.disconnect();
        barTrigger?.kill();
        delete el.dataset.pinned;
      };
    });

    if (savedY !== null) {
      const y = savedY;
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
        ScrollTrigger.refresh();
        restoring = false;
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      try { sessionStorage.setItem(storyKey, String(lastY)); } catch { /* приватный режим */ }
      mm.revert();
    };
  }, []);

  const scrollToScene = (i: number) => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.getAll().find((s) => s.trigger === el && s.pin);
    if (st) window.scrollTo({ top: st.start + (st.end - st.start) * ((i + 0.05) / STORY_SCENES.length) });
    else el.querySelectorAll(".story-scene")[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="story" aria-label={t("progressLabel")}>
      <div className="story-stage">
        {STORY_SCENES.map((scene, i) => (
          <article key={scene.id} className="story-scene" aria-labelledby={`story-${scene.id}`}>
            <div className="story-art-wrap">
              <div className="story-art-frame">
                <picture>
                  <source media="(max-width: 899px)" srcSet={scene.imageMobile} />
                  <img
                    src={scene.image}
                    alt=""
                    className="story-art"
                    width={2200}
                    height={1467}
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

            <div className="story-copy">
              {i === 0 ? (
                <h1 id={`story-${scene.id}`} className="story-title">{t(`${scene.id}.title`)}</h1>
              ) : (
                <h2 id={`story-${scene.id}`} className="story-title">{t(`${scene.id}.title`)}</h2>
              )}
              <p className="story-text">{t(`${scene.id}.text`)}</p>
              {scene.sourceUrl && scene.sourceLabel && (
                <p className="story-source">
                  {t("source")}:{" "}
                  <a href={scene.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {tAll(scene.sourceLabel)}
                  </a>
                </p>
              )}

              {scene.showUpcoming && upcoming.length > 0 && (
                <div className="story-upcoming">
                  <p className="story-upcoming-label">{t("upcoming")}</p>
                  <ul>
                    {upcoming.map((c) => (
                      <li key={`${c.date}-${c.name}`}>
                        <Link href="/schedule">
                          <span className="story-upcoming-date">{c.date}</span>
                          <span>{c.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scene.primaryCta && (
                <div className="story-actions">
                  <a href="#contact" className="story-btn story-btn-primary">{t("requestProgram")}</a>
                  <Link href="/schedule" className="story-btn story-btn-ghost">{t("findCourse")}</Link>
                </div>
              )}
            </div>

            {/* Метки на рисунке: что из этой эпохи есть у Abadan сегодня. Нажал — перешёл. */}
            <ul className="story-tags" aria-label={t("tagsLabel")}>
                {scene.hotspots.map((h) => (
                  <li key={h.tag} className={h.align === "right" ? "is-right" : undefined} style={{ "--hx": h.x / 100, "--hy": h.y / 100 } as React.CSSProperties}>
                    {h.external ? (
                      <a href={h.href} target="_blank" rel="noopener" className="story-tag">
                        <span className="story-tag-dot" aria-hidden="true" />
                        {t(`tags.${h.tag}`)} ↗
                      </a>
                    ) : h.href.startsWith("#") ? (
                      <a href={h.href} className="story-tag">
                        <span className="story-tag-dot" aria-hidden="true" />
                        {t(`tags.${h.tag}`)}
                      </a>
                    ) : (
                      <Link href={h.href} className="story-tag">
                        <span className="story-tag-dot" aria-hidden="true" />
                        {t(`tags.${h.tag}`)}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </article>
        ))}

        <div className="story-wash" aria-hidden="true" />
        <div className="story-smoke" aria-hidden="true" />
        <div className="story-smoke story-smoke-2" aria-hidden="true" />
        {STORY_TRANSITIONS.map((tr) => (
          <video key={tr.src} className="story-clip" src={tr.src} muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        ))}

        <KnowledgeGraph visible={STORY_SCENES[active].graphNodes} className="story-graph" />

        <nav className="story-eras" aria-label={t("progressLabel")}>
          {STORY_SCENES.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => scrollToScene(i)}
              aria-current={i === active ? "step" : undefined}
              className={i === active ? "is-active" : ""}
            >
              {t(`${scene.id}.era`)}
            </button>
          ))}
        </nav>
      </div>

      <div className="story-bar">
        <Link href="/schedule" className="story-btn story-btn-dark">{t("findCourse")}</Link>
        <a href="#after-story" className="story-skip">{t("skip")} ↓</a>
      </div>
    </section>
  );
}
