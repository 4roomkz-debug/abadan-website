import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по искусственному интеллекту для бизнеса — Abadan & Co.",
  description:
    "8+ корпоративных курсов по ИИ в Казахстане. Промпт-инжиниринг, автоматизация документооборота, ИИ-агенты, работа с данными. Практика на реальных задачах.",
  keywords: [
    "курсы ИИ Казахстан",
    "искусственный интеллект для бизнеса",
    "промпт-инжиниринг обучение",
    "AI тренинги Алматы",
    "курсы ChatGPT",
    "автоматизация ИИ",
    "ИИ для HR",
    "нейросети для бизнеса",
    "корпоративное обучение ИИ",
    "ИИ курсы Астана",
  ],
  openGraph: {
    title: "Курсы по искусственному интеллекту для бизнеса — Abadan & Co.",
    description:
      "8+ корпоративных курсов по ИИ в Казахстане. Промпт-инжиниринг, автоматизация документооборота, ИИ-агенты, работа с данными.",
    url: "https://abadan.kz/treningi/ai",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/ai",
  },
};

const OG_KEYWORDS = [
  "искусственн интеллект", "ИИ", "AI", "промпт", "нейросет",
  "ChatGPT", "Claude", "автоматизац документ", "ИИ-инструмент",
  "ИИ-агент", "GPT",
];

function isAITraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const aiCourses = SCHEDULE_DATA.filter((item) => isAITraining(item.name));
  return aiCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по ИИ: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

export default function AILayout({
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
