"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { getUpcomingTrainings, formatScheduleDate, type ScheduleItem } from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";
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
// эпохи прокрутка ведёт лёгкий наезд, а между эпохами кадр видео-перехода
// задаётся положением прокрутки — бумага перекладывается ровно в темпе
// колёсика и складывается обратно при прокрутке назад. Без JS, на телефоне и
// при prefers-reduced-motion сцены идут друг за другом обычной страницей.
// Прокрутка нативная: Lenis убран 06.11 — он спорил с scroll-behavior: smooth,
// и на трекпаде в Safari прокрутка залипала на первой сцене.
export default function StoryScroll() {
  const t = useTranslations("home.story");
  const tAll = useTranslations();
  const locale = useLocale();
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

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      el.dataset.pinned = "true";

      const scenes = gsap.utils.toArray<HTMLElement>(".story-scene", el);
      const frames = gsap.utils.toArray<HTMLElement>(".story-art-frame", el);
      const tagLayers = gsap.utils.toArray<HTMLElement>(".story-tags", el);
      const clips = gsap.utils.toArray<HTMLVideoElement>(".story-clip", el);
      const n = scenes.length;

      // Метки на рисунке: пересчёт при изменении размера окна.
      const ro = new ResizeObserver(() => tagLayers.forEach(placeArt));
      tagLayers.forEach((f) => { placeArt(f); ro.observe(f); });

      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });
      gsap.set(clips, { autoAlpha: 0 });

      // Ролики скачиваем целиком в память по цепочке: первый сразу, следующий — когда
      // готов предыдущий. Перемотка по недокачанному файлу на медленной сети замирает
      // на одном кадре, и превращения не видно. Пока ролик не готов (data-ready),
      // он скрыт стилями, и сцены растворяются друг в друга.
      const loaded = new Set<number>();
      const blobs: string[] = [];
      const preload = (i: number) => {
        const v = clips[i];
        if (!v || loaded.has(i)) return;
        loaded.add(i);
        fetch(v.dataset.src!)
          .then((r) => (r.ok ? r.blob() : Promise.reject(r.status)))
          .then((b) => {
            const url = URL.createObjectURL(b); blobs.push(url);
            v.addEventListener("loadeddata", () => { v.dataset.ready = "1"; preload(i + 1); }, { once: true });
            v.preload = "auto"; v.src = url; v.load();
          })
          .catch(() => preload(i + 1));
      };
      preload(0);

      // Кадр ролика задаётся положением прокрутки (как у Apple): крутишь — бумага
      // перекладывается, остановился — замерла, назад — складывается обратно.
      // Ролики закодированы так, что каждый кадр ключевой: перемотка мгновенная.
      const canVideo = clips.length > 0 && clips[0].canPlayType("video/mp4") !== "";
      const seek = (v: HTMLVideoElement, t: number) => {
        if (!Number.isFinite(v.duration) || v.duration <= 0 || v.readyState < 1) return;
        const time = Math.max(0, Math.min(v.duration - 0.04, t * v.duration));
        if (Math.abs(v.currentTime - time) > 0.02) v.currentTime = time;
      };

      // Разметка прокрутки, в экранах: эпоха — HOLD, переход между эпохами — TRANS.
      const HOLD = 0.6;
      const TRANS = 1;
      const total = n * HOLD + (n - 1) * TRANS;
      const starts = Array.from({ length: n }, (_, i) => i * (HOLD + TRANS));
      const indexAt = (progress: number) => {
        const t = progress * total;
        let i = 0;
        for (let k = 1; k < n; k++) if (t >= starts[k] - TRANS / 2) i = k;
        return i;
      };

      let active = 0;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          pin: el.querySelector(".story-stage"),
          start: "top top",
          end: `+=${total * 100}%`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = indexAt(self.progress);
            if (i !== active) { active = i; setActive(i); preload(i); preload(i + 1); }
          },
          onRefresh: (self) => {
            const i = indexAt(self.progress);
            active = i; setActive(i); preload(i); preload(i + 1);
          },
        },
      });

      // В финале граф-логотип из угла прилетает в кадр и становится аватаром ibirAi
      // (сфера из точек и связей, по которым бегут импульсы). Цель считаем от
      // рамки картинки, при смене размера окна ScrollTrigger пересчитает.
      const graph = el.querySelector<SVGElement>(".story-graph");
      const avatar = STORY_SCENES[n - 1].avatar;
      const landing = () => {
        if (!graph || !avatar) return { x: 0, y: 0, scale: 1 };
        const stage = el.querySelector<HTMLElement>(".story-stage")!;
        const w = stage.offsetWidth, h = stage.offsetHeight;
        const k = Math.max(w / ART_RATIO, h); const iw = k * ART_RATIO, ih = k; const ix = w - iw, iy = (h - ih) / 2;
        const cx = ix + iw * avatar.x / 100, cy = iy + ih * avatar.y / 100, size = iw * avatar.size / 100;
        const r = graph.getBoundingClientRect(); const sr = stage.getBoundingClientRect();
        const gx = r.left - sr.left + r.width / 2, gy = r.top - sr.top + r.height / 2;
        return { x: cx - gx, y: cy - gy, scale: size / r.width };
      };

      let pos = 0;
      scenes.forEach((scene, i) => {
        const copy = scene.querySelector(".story-copy");
        // Внутри эпохи — едва заметный наезд; движение дают переходы.
        tl.fromTo([frames[i], tagLayers[i]], { scale: 1 }, { scale: 1.03, duration: HOLD }, pos);
        tl.fromTo(copy, { y: 16 }, { y: -8, duration: HOLD }, pos);
        pos += HOLD;
        if (i < n - 1) {
          const next = scenes[i + 1];
          const nextCopy = next.querySelector(".story-copy");
          const v = clips[i];
          if (canVideo && v) {
            const proxy = { t: 0 };
            tl.to(v, { autoAlpha: 1, duration: 0.06 }, pos);
            tl.to(copy, { autoAlpha: 0, duration: 0.08 }, pos);
            tl.to(proxy, { t: 1, duration: TRANS, onUpdate: () => seek(v, proxy.t) }, pos);
            // Под роликом сцены растворяются одна в другую на середине перехода:
            // под готовым роликом этого не видно, без ролика остаётся мягкая смена.
            tl.to(scene, { autoAlpha: 0, duration: TRANS * 0.2 }, pos + TRANS * 0.4);
            tl.to(next, { autoAlpha: 1, duration: TRANS * 0.2 }, pos + TRANS * 0.4);
            tl.fromTo(nextCopy, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, pos + TRANS - 0.12);
            tl.to(v, { autoAlpha: 0, duration: 0.06 }, pos + TRANS - 0.06);
            if (i === n - 2 && graph && avatar) {
              tl.to(graph, { x: () => landing().x, y: () => landing().y, scale: () => landing().scale, duration: TRANS * 0.45, ease: "sine.inOut" }, pos + TRANS * 0.55);
            }
          } else {
            // Без видео — спокойное растворение.
            tl.to(scene, { autoAlpha: 0, duration: TRANS * 0.5 }, pos + TRANS * 0.25);
            tl.to(next, { autoAlpha: 1, duration: TRANS * 0.5 }, pos + TRANS * 0.25);
          }
          pos += TRANS;
        }
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
        blobs.forEach((u) => URL.revokeObjectURL(u));
        barTrigger?.kill();
        delete el.dataset.pinned;
      };
    });

    if (savedY !== null) {
      const y = savedY;
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
        ScrollTrigger.refresh();
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
    if (st) {
      const n = STORY_SCENES.length;
      const total = n * 0.6 + (n - 1) * 1;
      window.scrollTo({ top: st.start + (st.end - st.start) * ((i * 1.6 + 0.05) / total) });
    }
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
                          <span className="story-upcoming-date">{formatScheduleDate(c.date, locale)}</span>
                          <span>{localizeCourse(c.name, locale)}</span>
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

        {STORY_TRANSITIONS.map((tr) => (
          <video key={tr.src} className="story-clip" data-src={tr.src} muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
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
