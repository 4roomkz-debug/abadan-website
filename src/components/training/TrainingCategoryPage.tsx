"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import CourseTable from "@/components/CourseTable";
import ScrollHaze from "@/components/ScrollHaze";
import OilRoute from "./OilRoute";
import ProgramFlow from "./ProgramFlow";
import Quotes from "@/components/story/Quotes";
import ClientsStrip from "@/components/story/ClientsStrip";
import { isEventPassed, parseDateForSort } from "@/data/schedule";
import { TRAINING_CATEGORIES, coursesOf, factsOf, inArea, type TrainingSlug } from "@/data/training";

const subscribe = () => () => {};
const PAGE = 12;

// Страница направления (/treningi/<slug>) в бумажном мире главной: заголовок и
// факты, области направления списком (клик — фильтр расписания), ближайшие
// курсы с записью под строкой, цитаты из писем, форма заявки, вопросы.
// Курсы — из SCHEDULE_DATA по ключевым словам (src/data/training/<slug>.ts),
// тексты — messages/*/training-<slug>.json.
// routeOrder — порядок областей в маршруте со сценой и клипами (пока только нефтегаз);
// programFlow — схема «Как идёт корпоративная программа» перед формой заявки.
export default function TrainingCategoryPage({
  slug, routeOrder, programFlow = false,
}: { slug: TrainingSlug; routeOrder?: readonly string[]; programFlow?: boolean }) {
  const t = useTranslations("training");
  const p = useTranslations(`training.${slug}`);
  const locale = useLocale();
  const cfg = TRAINING_CATEGORIES[slug];
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [now] = useState(() => new Date());
  const [area, setArea] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const scheduleRef = useRef<HTMLElement>(null);

  const upcoming = useMemo(
    () => (hydrated ? coursesOf(slug).filter((c) => !isEventPassed(c.date, c.month, now))
      .sort((a, b) => parseDateForSort(a.date, a.month) - parseDateForSort(b.date, b.month)) : []),
    [hydrated, now, slug],
  );
  const filtered = area ? upcoming.filter((c) => inArea(c, slug, area)) : upcoming;
  const visible = showAll ? filtered : filtered.slice(0, PAGE);
  const countIn = (id: string) => upcoming.filter((c) => inArea(c, slug, id)).length;
  // В фильтре — только области, где есть ближайшие даты; одна область — фильтр не нужен.
  const liveAreas = cfg.areas.filter((a) => countIn(a.id) > 0);

  const facts = factsOf(slug);
  const money = (n: number) => n.toLocaleString(locale === "en" ? "en-US" : "ru-RU");
  const faqValues = {
    minPrice: money(facts.minPrice), maxPrice: money(facts.maxPrice), count: facts.count,
    hours: facts.minHours === facts.maxHours ? `${facts.minHours}` : `${facts.minHours}–${facts.maxHours}`,
  };
  const faq = p.raw("faq") as { q: string; a: string }[];

  const pickArea = (id: string | null) => {
    setArea(id); setShowAll(false);
    scheduleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />
      <main>
        <section className="paper-section tr-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <nav className="tr-crumbs" aria-label="breadcrumbs">
              <Link href="/">{t("home")}</Link><span aria-hidden="true">/</span>
              <span>{t("trainings")}</span><span aria-hidden="true">/</span>
              <span aria-current="page">{p("name")}</span>
            </nav>
            <h1 className="sched-title tr-title">{p("title")}</h1>
            <p className="paper-lead tr-lead">{p("lead")}</p>
            <ul className="tr-facts">
              {(p.raw("facts") as string[]).map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="story-actions">
              <a href="#schedule" className="story-btn story-btn-primary">{t("ctaCourses")}</a>
              <a href="#contact" className="story-btn story-btn-ghost">{t("ctaOrder")}</a>
            </div>
          </div></div>
        </section>

        <section className={`paper-section paper-section-tight${routeOrder ? " has-sticky" : ""}`} aria-labelledby="areas-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <div className="paper-head">
              <h2 id="areas-title" className="paper-display">{p("areasTitle")}</h2>
              <p className="paper-note">{p("areasLead")}</p>
            </div>
            {routeOrder ? (
              <OilRoute
                steps={routeOrder.map((id) => {
                  const a = cfg.areas.find((x) => x.id === id)!;
                  return {
                    id,
                    title: p(`areas.${id}.title`),
                    desc: p(`areas.${id}.desc`),
                    countLabel: hydrated && countIn(id) > 0 ? t("courses", { n: countIn(id) }) : null,
                    href: "href" in a ? a.href : undefined,
                  };
                })}
                subLabel={t("areaSub")}
                onPick={pickArea}
              />
            ) : (
              <ul className="tr-areas">
                {cfg.areas.map((a) => (
                  <li key={a.id}>
                    <button type="button" className="tr-area" onClick={() => pickArea(a.id)}>
                      <span className="tr-area-title">{p(`areas.${a.id}.title`)}</span>
                      <span className="tr-area-desc">{p(`areas.${a.id}.desc`)}</span>
                      {hydrated && countIn(a.id) > 0 && <span className="tr-area-count">{t("courses", { n: countIn(a.id) })} →</span>}
                    </button>
                    {"href" in a && a.href && <Link href={a.href} className="paper-link tr-area-sub">{t("areaSub")} ↗</Link>}
                  </li>
                ))}
              </ul>
            )}
          </div></div>
        </section>

        <section id="schedule" ref={scheduleRef} className="paper-section" aria-labelledby="schedule-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <div className="paper-head">
              <h2 id="schedule-title" className="paper-display">{t("scheduleTitle")}</h2>
              <Link href="/schedule" className="paper-link">{t("fullSchedule")} →</Link>
            </div>
            {liveAreas.length > 1 && (
              <div className="sched-seg tr-seg" role="group" aria-label={p("areasTitle")}>
                <button type="button" aria-pressed={area === null} onClick={() => { setArea(null); setShowAll(false); }}>{t("all")}</button>
                {liveAreas.map((a) => (
                  <button key={a.id} type="button" aria-pressed={area === a.id} onClick={() => { setArea(a.id); setShowAll(false); }}>
                    {p(`areas.${a.id}.title`)}
                  </button>
                ))}
              </div>
            )}
            {area && liveAreas.length <= 1 && (
              <button type="button" className="paper-link tr-reset" onClick={() => setArea(null)}>← {t("all")}</button>
            )}
            {!hydrated ? (
              <p className="sched-count">{t("loading")}</p>
            ) : filtered.length === 0 ? (
              <p className="paper-lead tr-empty">{t("empty")}</p>
            ) : (
              <>
                <CourseTable items={visible} label={p("name")} source={`/treningi/${slug}`} />
                {filtered.length > PAGE && (
                  <button type="button" className="story-btn story-btn-ghost tr-more" onClick={() => setShowAll(!showAll)}>
                    {showAll ? t("collapse") : t("showAll", { n: filtered.length })}
                  </button>
                )}
              </>
            )}
          </div></div>
        </section>

        <Quotes ids={cfg.testimonials} title={t("quotesTitle")} note={t("quotesNote")} />
        <ClientsStrip />
        {programFlow && <ProgramFlow />}
        <Contact variant="paper" title={p("formTitle")} subtitle={p("formLead")} />

        <section className="paper-section" aria-labelledby="faq-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="faq-title" className="paper-display">{t("faqTitle")}</h2>
            <div className="tr-faq">
              {faq.map((_, i) => (
                <details key={i}>
                  <summary>{p(`faq.${i}.q`)}</summary>
                  <p>{(p as unknown as (k: string, v: object) => string)(`faq.${i}.a`, faqValues)}</p>
                </details>
              ))}
            </div>
          </div></div>
        </section>
      </main>
      <Footer />
      <ScrollHaze />
    </>
  );
}
