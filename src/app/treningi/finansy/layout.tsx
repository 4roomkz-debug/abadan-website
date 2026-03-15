import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Финансовые курсы и семинары для бизнеса — Abadan & Co.",
  description:
    "18+ курсов для финансистов в Казахстане. МСФО, налоги, бюджетирование, казначейство, аудит. 200+ экспертов-практиков. Очно и онлайн.",
  keywords: [
    "финансовые курсы Казахстан",
    "курсы МСФО Алматы",
    "обучение бухгалтеров",
    "курсы налогообложение",
    "бюджетирование обучение",
    "казначейство курсы",
    "семинары финансы Астана",
    "курсы для финансистов",
    "аудит обучение Казахстан",
    "финансовый анализ курсы",
  ],
  openGraph: {
    title: "Финансовые курсы и семинары для бизнеса — Abadan & Co.",
    description:
      "18+ курсов для финансистов в Казахстане. МСФО, налоги, бюджетирование, казначейство, аудит. 200+ экспертов-практиков.",
    url: "https://abadan.kz/treningi/finansy",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/finansy",
  },
};

const OG_KEYWORDS = [
  "финанс", "бухгалтер", "бюджет", "МСФО", "IFRS", "налог", "НДС",
  "аудит", "учёт", "учет", "баланс", "отчётност", "отчетност",
  "казначейств", "инвестиц", "себестоимост", "калькуляц", "амортизац",
  "дебитор", "кредитор", "cash flow", "бизнес-план", "оценк стоимост",
  "ликвидац", "банкрот", "ценообразован", "трансфертн",
];

function isFinanceTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const financeCourses = SCHEDULE_DATA.filter((item) => isFinanceTraining(item.name));
  return financeCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Финансовый курс: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://abadan.kz",
    },
    offers: [
      {
        "@type": "Offer",
        price: course.priceOffline,
        priceCurrency: "KZT",
        name: "Очный формат",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        price: course.priceOnline,
        priceCurrency: "KZT",
        name: "Онлайн формат",
        availability: "https://schema.org/InStock",
      },
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      duration: `PT${course.hours}H`,
      inLanguage: "ru",
      location: {
        "@type": "Place",
        name: "Алматы, Казахстан",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Алматы",
          addressCountry: "KZ",
        },
      },
    },
  }));
}

export default function FinansyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      {children}
    </>
  );
}
