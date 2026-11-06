"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Link } from "@/i18n/navigation";
import { getUpcomingTrainings, type ScheduleItem } from "@/data/schedule";
import KnowledgeGraph from "./KnowledgeGraph";
import { STORY_SCENES } from "./scenes";

gsap.registerPlugin(ScrollTrigger);

const subscribe = () => () => {};

// История обучения на прокрутке: сцены-эпохи закреплены, колесо мыши ведёт
// камеру наездом и переводит эпохи через туман. Без JS, на телефоне и при
// prefers-reduced-motion сцены идут друг за другом обычной страницей —
// закрепление включается только на десктопе (data-pinned).
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

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      el.dataset.pinned = "true";
      const lenis = new Lenis({ lerp: 0.09 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const scenes = gsap.utils.toArray<HTMLElement>(".story-scene", el);
      const fog = el.querySelector<HTMLElement>(".story-fog");
      gsap.set(scenes, { autoAlpha: 0 });
      gsap.set(scenes[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          pin: el.querySelector(".story-stage"),
          start: "top top",
          end: `+=${scenes.length * 100}%`,
          scrub: 0.7,
          onUpdate: (self) => setActive(Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length + 0.15))),
        },
      });

      scenes.forEach((scene, i) => {
        const art = scene.querySelector(".story-art");
        const copy = scene.querySelector(".story-copy");
        // Наезд камеры внутри эпохи.
        tl.fromTo(art, { scale: 1.0, xPercent: 0 }, { scale: 1.14, xPercent: -3, duration: 1 }, i);
        tl.fromTo(copy, { y: 24 }, { y: -12, duration: 1 }, i);
        if (i < scenes.length - 1 && fog) {
          // Туман: поднимается, пока эпоха уходит, и рассеивается над новой.
          tl.to(fog, { autoAlpha: 1, duration: 0.18 }, i + 0.72);
          tl.to(scene, { autoAlpha: 0, duration: 0.12 }, i + 0.84);
          tl.to(scenes[i + 1], { autoAlpha: 1, duration: 0.12 }, i + 0.86);
          tl.to(fog, { autoAlpha: 0, duration: 0.2 }, i + 0.92);
        }
      });

      // Панель «Найти курс» видна, пока идёт история, и уходит вместе с ней.
      const bar = el.querySelector(".story-bar");
      const barTrigger = bar
        ? ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", toggleClass: { targets: bar, className: "is-on" } })
        : null;

      return () => {
        barTrigger?.kill();
        delete el.dataset.pinned;
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  const scrollToScene = (i: number) => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.getAll().find((s) => s.trigger === el);
    if (st) window.scrollTo({ top: st.start + (st.end - st.start) * ((i + 0.05) / STORY_SCENES.length) });
    else el.querySelectorAll(".story-scene")[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="story" aria-label={t("progressLabel")}>
      <div className="story-stage">
        {STORY_SCENES.map((scene, i) => (
          <article key={scene.id} className="story-scene" aria-labelledby={`story-${scene.id}`}>
            <picture className="story-art-wrap">
              <source media="(max-width: 899px)" srcSet={scene.imageMobile} />
              <img
                src={scene.image}
                alt=""
                className="story-art"
                width={1600}
                height={900}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>

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
                  <Link href="/#contact" className="story-btn story-btn-primary">{t("requestProgram")}</Link>
                  <Link href="/schedule" className="story-btn story-btn-ghost">{t("findCourse")}</Link>
                </div>
              )}

              {scene.links.length > 0 && (
                <ul className="story-links">
                  {scene.links.map((l) => {
                    const label = tAll(l.label);
                    return (
                      <li key={l.href}>
                        {l.external ? (
                          <a href={l.href} target="_blank" rel="noopener">{label} ↗</a>
                        ) : (
                          <Link href={l.href}>{label} →</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </article>
        ))}

        <div className="story-fog" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

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
