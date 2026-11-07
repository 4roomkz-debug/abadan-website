import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { localeUrl, withLocale } from "@/lib/seo";
import { SCHEDULE_DATA } from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";

const pick = (raw: string) => (hasLocale(routing.locales, raw) ? raw : routing.defaultLocale);

export async function generateMetadata({ params }: LayoutProps<"/[locale]/schedule">): Promise<Metadata> {
  const locale = pick((await params).locale);
  const t = await getTranslations({ locale, namespace: "schedule" });
  return withLocale(
    { title: t("metaTitle"), description: t("metaDescription"), openGraph: { title: t("metaTitle"), description: t("metaDescription"), type: "website" } },
    locale,
    "/schedule",
  );
}

// Разметка schema.org на языке страницы: список курсов и хлебные крошки.
export default async function ScheduleLayout({ children, params }: LayoutProps<"/[locale]/schedule">) {
  const locale = pick((await params).locale);
  const t = await getTranslations({ locale, namespace: "schedule" });
  const tr = await getTranslations({ locale, namespace: "training" });
  const url = localeUrl(locale, "/schedule");
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t("title"),
      url,
      numberOfItems: SCHEDULE_DATA.length,
      itemListElement: SCHEDULE_DATA.slice(0, 30).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: localizeCourse(c.name, locale),
          description: `${localizeCourse(c.name, locale)}. ${c.hours} h.`,
          provider: { "@type": "Organization", name: "Abadan & Co.", url: localeUrl(locale, "/") },
          offers: { "@type": "Offer", price: c.priceOffline, priceCurrency: "KZT", availability: "https://schema.org/InStock" },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tr("home"), item: localeUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: t("title"), item: url },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      {children}
    </>
  );
}
