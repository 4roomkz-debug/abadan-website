import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Юридические курсы и семинары для бизнеса — Abadan & Co.",
  description:
    "25+ юридических курсов в Казахстане. Трудовое право, договорная работа, налоги, госзакупки, комплаенс. 200+ экспертов-практиков. Очно и онлайн.",
  keywords: [
    "юридические курсы Казахстан",
    "семинары трудовое право Алматы",
    "курсы договорная работа",
    "обучение госзакупки",
    "комплаенс тренинги",
    "налоговое право курсы",
    "юридические семинары Астана",
    "курсы для юристов Казахстан",
    "корпоративное право обучение",
    "правовое обучение бизнес",
  ],
  openGraph: {
    title: "Юридические курсы и семинары для бизнеса — Abadan & Co.",
    description:
      "25+ юридических курсов в Казахстане. Трудовое право, договорная работа, налоги, госзакупки, комплаенс. 200+ экспертов.",
    url: "https://abadan.kz/treningi/pravo",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/pravo",
  },
};

const OG_KEYWORDS = [
  "юрид", "юрист", "правов", "закон", "кодекс", "договор", "контракт",
  "трудов", "налог", "НДС", "регулирован", "комплаенс", "антикоррупц",
  "корпоративн", "лицензи", "разрешени", "недропользован", "экологическ",
  "экспорт", "импорт", "таможен", "ВЭД", "арбитраж", "претензи",
  "нотариальн", "земельн", "госзакуп", "тендер", "субподряд", "аудит",
];

function isPravoTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const pravoCourses = SCHEDULE_DATA.filter((item) => isPravoTraining(item.name));
  return pravoCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Юридический курс: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

export default function PravoLayout({
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
