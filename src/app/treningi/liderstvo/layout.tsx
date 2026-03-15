import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Тренинги для руководителей и лидеров — Abadan & Co.",
  description:
    "12+ тренингов для руководителей в Казахстане. Лидерство, переговоры, управление конфликтами, тайм-менеджмент, коучинг. 200+ экспертов. Очно и онлайн.",
  keywords: [
    "тренинги для руководителей Казахстан",
    "курсы лидерства Алматы",
    "обучение переговорам",
    "управление конфликтами тренинг",
    "тайм-менеджмент курсы",
    "коучинг для руководителей",
    "soft skills тренинги Астана",
    "управление командой обучение",
    "деловые переговоры курсы",
    "лидерство обучение Казахстан",
  ],
  openGraph: {
    title: "Тренинги для руководителей и лидеров — Abadan & Co.",
    description:
      "12+ тренингов для руководителей в Казахстане. Лидерство, переговоры, управление конфликтами, коучинг. 200+ экспертов.",
    url: "https://abadan.kz/treningi/liderstvo",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/liderstvo",
  },
};

const OG_KEYWORDS = [
  "лидер", "руковод", "управлен", "менеджмент", "команд", "мотивац",
  "делегирован", "переговор", "коммуникац", "презентац", "конфликт",
  "стресс", "тайм-менеджмент", "эмоциональн интеллект", "публичн выступлен",
  "обратн связ", "коучинг", "наставнич", "изменен", "стратег",
  "принятие решен", "критическ мышлен",
];

function isLeadershipTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const leadershipCourses = SCHEDULE_DATA.filter((item) => isLeadershipTraining(item.name));
  return leadershipCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Тренинг для руководителей: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

export default function LiderstvoLayout({
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
