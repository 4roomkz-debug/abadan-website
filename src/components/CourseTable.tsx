"use client";

import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatScheduleDate, type ScheduleItem } from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";
import CourseSignUp from "@/components/CourseSignUp";

const keyOf = (c: ScheduleItem) => `${c.month}|${c.date}|${c.name}`;

// Таблица курсов в бумажном мире: дата, курс, часы, цены, «Записаться».
// Запись раскрывается под строкой. Общая для /schedule и страниц направлений.
export default function CourseTable({ items, label, source }: { items: ScheduleItem[]; label: string; source?: string }) {
  const t = useTranslations("schedule");
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const price = (n: number) => n.toLocaleString(locale === "en" ? "en-US" : "ru-RU");

  return (
    <div className="sched-table" role="table" aria-label={label}>
      <div className="sched-row sched-headrow" role="row">
        <span role="columnheader">{t("cols.date")}</span>
        <span role="columnheader">{t("cols.course")}</span>
        <span role="columnheader" className="num">{t("cols.hours")}</span>
        <span role="columnheader" className="num">{t("cols.online")}</span>
        <span role="columnheader" className="num">{t("cols.offline")}</span>
        <span role="columnheader" />
      </div>
      {items.map((c) => {
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
            {isOpen && <CourseSignUp course={c} source={source} onDone={() => setOpen(null)} />}
          </Fragment>
        );
      })}
    </div>
  );
}
