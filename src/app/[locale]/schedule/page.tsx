"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SCHEDULE_DATA, MONTHS, parseDateForSort, isEventPassed, formatMonth, type ScheduleItem,
} from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";
import CourseTable from "@/components/CourseTable";

const subscribe = () => () => {};
type Category = "all" | "business" | "technical";

// Расписание в бумажном мире главной: месяцы — разделы, курс — строка таблицы,
// запись раскрывается прямо под строкой, без всплывающего окна. Прошедшие курсы
// скрыты по дате браузера, поэтому список строится после гидратации.
export default function SchedulePage() {
  const t = useTranslations("schedule");
  const locale = useLocale();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [now] = useState(() => new Date());

  const [category, setCategory] = useState<Category>("all");
  const [month, setMonth] = useState("all");
  const [query, setQuery] = useState("");

  const future = useMemo(
    () => (hydrated ? SCHEDULE_DATA.filter((c) => !isEventPassed(c.date, c.month, now)) : []),
    [hydrated, now],
  );
  const months = useMemo(() => MONTHS.filter((m) => future.some((c) => c.month === m)), [future]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return future
      .filter((c) => category === "all" || c.category === category)
      .filter((c) => month === "all" || c.month === month)
      .filter((c) => !q || c.name.toLowerCase().includes(q) || localizeCourse(c.name, locale).toLowerCase().includes(q))
      .sort((a, b) => parseDateForSort(a.date, a.month) - parseDateForSort(b.date, b.month));
  }, [future, category, month, query, locale]);

  const groups = useMemo(() => {
    const out: { month: string; list: ScheduleItem[] }[] = [];
    for (const c of items) {
      const last = out[out.length - 1];
      if (last?.month === c.month) last.list.push(c); else out.push({ month: c.month, list: [c] });
    }
    return out;
  }, [items]);

  return (
    <>
      <Header />
      <main className="paper-section sched">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
          <h1 className="sched-title">{t("title")}</h1>
          <p className="paper-lead">{t("lead")}</p>

          <div className="sched-filters" role="search">
            <label className="sched-field sched-search">
              <span>{t("search")}</span>
              <input type="search" className="paper-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("searchPlaceholder")} />
            </label>
            <fieldset className="sched-field">
              <legend>{t("category")}</legend>
              <div className="sched-seg">
                {(["all", "business", "technical"] as const).map((c) => (
                  <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>{t(`categories.${c}`)}</button>
                ))}
              </div>
            </fieldset>
            <label className="sched-field">
              <span>{t("month")}</span>
              <select className="paper-input" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="all">{t("allMonths")}</option>
                {months.map((m) => <option key={m} value={m}>{formatMonth(m, locale)}</option>)}
              </select>
            </label>
          </div>

          <p className="sched-count" aria-live="polite">{hydrated ? t("found", { n: items.length }) : t("loading")}</p>

          {groups.map((g) => (
            <section key={g.month} className="sched-month" aria-labelledby={`m-${g.month}`}>
              <h2 id={`m-${g.month}`}>{formatMonth(g.month, locale)} 2026</h2>
              <CourseTable items={g.list} label={formatMonth(g.month, locale)} />
            </section>
          ))}

          {hydrated && items.length === 0 && (
            <div className="sched-empty">
              <p className="sched-empty-title">{t("empty")}</p>
              <p className="paper-lead">{t("emptyHint")}</p>
              <Link href="/#contact" className="story-btn story-btn-primary">{t("emptyCta")}</Link>
            </div>
          )}

          <p className="paper-note sched-note">{t("priceNote")}</p>
        </div></div>
      </main>
      <Footer />
    </>
  );
}
