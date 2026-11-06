"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getUpcomingTrainings } from "@/data/schedule";

const subscribe = () => () => {};

// Ближайшие курсы под историей — в бумажном мире: таблица без карточек.
// Дата берётся после гидратации, чтобы статический HTML не расходился с браузером.
export default function UpcomingList({ count = 6 }: { count?: number }) {
  const t = useTranslations("home.upcoming");
  const locale = useLocale();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const items = hydrated ? getUpcomingTrainings(count, new Date()) : [];
  const price = (n: number) => `${n.toLocaleString(locale === "en" ? "en-US" : "ru-RU")} ₸`;

  return (
    <section className="paper-section" aria-labelledby="upcoming-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
        <div className="paper-head">
          <h2 id="upcoming-title" className="paper-display">{t("title")}</h2>
          <Link href="/schedule" className="paper-link">{t("all")} →</Link>
        </div>
        <ul className="upcoming-list">
          {items.map((c) => (
            <li key={`${c.date}-${c.name}`}>
              <Link href="/schedule" className="upcoming-row">
                <span className="upcoming-date">{c.date}</span>
                <span className="upcoming-name">{c.name}</span>
                <span className="upcoming-meta">{t("hours", { n: c.hours })}</span>
                <span className="upcoming-price">{price(c.priceOffline)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div></div>
    </section>
  );
}
