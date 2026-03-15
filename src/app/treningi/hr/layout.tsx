import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "HR-курсы и тренинги для кадровых специалистов — Abadan & Co.",
  description:
    "20+ курсов для HR-специалистов в Казахстане. Трудовое право, рекрутинг, оценка персонала, KPI, грейдирование. 200+ экспертов. Очно и онлайн.",
  keywords: [
    "HR курсы Казахстан",
    "тренинги для кадровиков Алматы",
    "курсы трудовое право",
    "обучение рекрутингу",
    "оценка персонала курсы",
    "HR аналитика обучение",
    "кадровое делопроизводство",
    "управление персоналом тренинги",
    "HR тренинги Астана",
    "курсы для HR директоров",
  ],
  openGraph: {
    title: "HR-курсы и тренинги для кадровых специалистов — Abadan & Co.",
    description:
      "20+ курсов для HR-специалистов в Казахстане. Трудовое право, рекрутинг, оценка персонала, KPI, грейдирование. 200+ экспертов.",
    url: "https://abadan.kz/treningi/hr",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/hr",
  },
};

const OG_KEYWORDS = [
  "кадр", "персонал", "HR", "рекрутинг", "подбор", "адаптац",
  "оценк", "компетенц", "оплат труд", "нормирован", "трудов",
  "штатн", "кадров", "ИПР", "индивидуальн развит", "оргструктур",
  "аттестац", "мотивац", "KPI", "грейд",
];

function isHRTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const hrCourses = SCHEDULE_DATA.filter((item) => isHRTraining(item.name));
  return hrCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `HR-курс: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

export default function HRLayout({
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
