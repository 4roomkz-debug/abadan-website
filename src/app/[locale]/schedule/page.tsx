"use client";

import { Fragment, useMemo, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SCHEDULE_DATA, MONTHS, parseDateForSort, isEventPassed, formatScheduleDate, formatMonth, type ScheduleItem,
} from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";
import { submitContactForm } from "@/lib/contactForm";

const subscribe = () => () => {};
type Category = "all" | "business" | "technical";
const keyOf = (c: ScheduleItem) => `${c.month}|${c.date}|${c.name}`;

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
  const [open, setOpen] = useState<string | null>(null);

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

  const price = (n: number) => n.toLocaleString(locale === "en" ? "en-US" : "ru-RU");

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
              <div className="sched-table" role="table" aria-label={formatMonth(g.month, locale)}>
                <div className="sched-row sched-headrow" role="row">
                  <span role="columnheader">{t("cols.date")}</span>
                  <span role="columnheader">{t("cols.course")}</span>
                  <span role="columnheader" className="num">{t("cols.hours")}</span>
                  <span role="columnheader" className="num">{t("cols.online")}</span>
                  <span role="columnheader" className="num">{t("cols.offline")}</span>
                  <span role="columnheader" />
                </div>
                {g.list.map((c) => {
                  const k = keyOf(c);
                  const isOpen = open === k;
                  return (
                    <Fragment key={k}>
                      <div className={`sched-row${isOpen ? " is-open" : ""}`} role="row">
                        <span role="cell" className="sched-date">{formatScheduleDate(c.date, locale)}</span>
                        <span role="cell" className="sched-name">
                          {localizeCourse(c.name, locale)}
                          <em className={c.category === "technical" ? "is-tech" : undefined}>{t(c.category)}</em>
                        </span>
                        <span role="cell" className="num sched-hours">{t("hours", { n: c.hours })}</span>
                        <span role="cell" className="num"><b className="sched-m">{t("cols.online")} </b>{price(c.priceOnline)} ₸</span>
                        <span role="cell" className="num"><b className="sched-m">{t("cols.offline")} </b>{price(c.priceOffline)} ₸</span>
                        <span role="cell" className="sched-act">
                          <button type="button" className={isOpen ? "story-btn-ghost sched-btn" : "story-btn-dark sched-btn"} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : k)}>
                            {isOpen ? t("close") : t("register")}
                          </button>
                        </span>
                      </div>
                      {isOpen && <SignUp course={c} onDone={() => setOpen(null)} />}
                    </Fragment>
                  );
                })}
              </div>
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

function SignUp({ course, onDone }: { course: ScheduleItem; onDone: () => void }) {
  const t = useTranslations("schedule.form");
  const locale = useLocale();
  const [loadedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      // В Telegram уходит русское название: команда ищет курс по нему.
      await submitContactForm({
        name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"), website: fd.get("website"),
        message: `🎓 Запись на курс: ${course.name} (${course.date})\n👥 Участников: ${fd.get("participants")}`,
        locale, _elapsed: Date.now() - loadedAt,
      });
      setState("sent");
      setTimeout(onDone, 4000);
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="sched-form" role="status">
        <p className="sched-form-title">{t("successTitle")}</p>
        <p className="paper-lead">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form className="sched-form" onSubmit={submit}>
      <p className="sched-form-title">{t("title")}: {localizeCourse(course.name, locale)}</p>
      <div className="sched-form-grid">
        <label className="sched-field"><span>{t("name")}</span><input name="name" required autoComplete="name" className="paper-input" /></label>
        <label className="sched-field"><span>{t("phone")}</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+7 7__ ___ __ __" className="paper-input" /></label>
        <label className="sched-field"><span>{t("email")}</span><input name="email" type="email" required autoComplete="email" className="paper-input" /></label>
        <label className="sched-field"><span>{t("participants")}</span>
          <select name="participants" defaultValue="1" className="paper-input">
            {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            <option value="10+">{t("participantsMore")}</option>
          </select>
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sched-hp" />
        <button type="submit" className="story-btn story-btn-primary" disabled={state === "sending"}>
          {state === "sending" ? t("submitting") : t("submit")}
        </button>
      </div>
      {state === "error" && <p className="sched-error" role="alert">{t("error")}</p>}
    </form>
  );
}
