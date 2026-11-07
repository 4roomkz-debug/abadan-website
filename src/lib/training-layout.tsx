import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { localeUrl, withLocale } from "@/lib/seo";
import { coursesOf, factsOf, type TrainingSlug } from "@/data/training";
import { localizeCourse } from "@/data/schedule-i18n";

// Общие метаданные и разметка schema.org для страниц /treningi/<slug>:
// тексты из messages/*/training-<slug>.json, курсы и цены — из расписания.

export async function trainingMetadata(slug: TrainingSlug, rawLocale: string): Promise<Metadata> {
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const p = await getTranslations({ locale, namespace: `training.${slug}` });
  const base: Metadata = {
    title: p("metaTitle"),
    description: p("metaDescription"),
    openGraph: { title: p("metaTitle"), description: p("metaDescription"), type: "website" },
  };
  return withLocale(base, locale, `/treningi/${slug}`);
}

export async function TrainingJsonLd({ slug, locale: rawLocale }: { slug: TrainingSlug; locale: string }) {
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "training" });
  const p = await getTranslations({ locale, namespace: `training.${slug}` });
  const facts = factsOf(slug);
  const money = (n: number) => n.toLocaleString(locale === "en" ? "en-US" : "ru-RU");
  const values = {
    minPrice: money(facts.minPrice), maxPrice: money(facts.maxPrice), count: facts.count,
    hours: facts.minHours === facts.maxHours ? `${facts.minHours}` : `${facts.minHours}–${facts.maxHours}`,
  };
  const faq = p.raw("faq") as unknown[];
  const url = localeUrl(locale, `/treningi/${slug}`);

  const data = [
    ...coursesOf(slug).slice(0, 20).map((c) => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: localizeCourse(c.name, locale),
      description: `${localizeCourse(c.name, locale)}. ${c.hours} h.`,
      provider: { "@type": "Organization", name: "Abadan & Co.", url: localeUrl(locale, "/") },
      offers: [
        { "@type": "Offer", price: c.priceOffline, priceCurrency: "KZT", category: "onsite" },
        { "@type": "Offer", price: c.priceOnline, priceCurrency: "KZT", category: "online" },
      ],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["onsite", "online"],
        duration: `PT${c.hours}H`,
        inLanguage: "ru",
        location: { "@type": "Place", name: "Almaty", address: { "@type": "PostalAddress", addressLocality: "Almaty", addressCountry: "KZ" } },
      },
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((_, i) => ({
        "@type": "Question",
        name: p(`faq.${i}.q`),
        acceptedAnswer: { "@type": "Answer", text: (p as unknown as (k: string, v: object) => string)(`faq.${i}.a`, values) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("home"), item: localeUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: p("name"), item: url },
      ],
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
