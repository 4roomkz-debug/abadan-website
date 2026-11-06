"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isRuOnlyPath, routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, { short: string; full: string }> = {
  ru: { short: "RU", full: "Русский" },
  kk: { short: "ҚАЗ", full: "Қазақша" },
  en: { short: "EN", full: "English" },
};

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("common.languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  // Страница только на русском: kk и en ведут на свою главную, иначе proxy
  // вернул бы посетителя на ту же русскую страницу.
  const targetFor = (l: Locale) => (l !== "ru" && isRuOnlyPath(pathname) ? "/" : pathname);

  return (
    <nav aria-label={t("label")} className={`flex items-center gap-1 text-sm ${className}`}>
      {routing.locales.map((l) => {
        const isCurrent = l === locale;
        return (
          <Link
            key={l}
            href={targetFor(l)}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-label={LABELS[l].full}
            aria-current={isCurrent ? "true" : undefined}
            className={`px-2 py-1.5 rounded-md font-semibold tracking-wide transition-colors ${
              isCurrent
                ? "text-[#00767D] bg-[#00767D]/10"
                : "text-[#546569] hover:text-[#00767D]"
            }`}
          >
            {LABELS[l].short}
          </Link>
        );
      })}
    </nav>
  );
}
