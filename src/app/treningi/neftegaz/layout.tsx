import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Технические курсы для нефтегазовой отрасли — Abadan & Co.",
  description:
    "65+ технических курсов и семинаров для нефтегазовой отрасли в Казахстане. Бурение, добыча, переработка, трубопроводы, промышленная безопасность. 200+ экспертов-практиков. Офлайн и онлайн.",
  keywords: [
    "технические курсы нефтегаз Казахстан",
    "обучение нефтегазовая отрасль Алматы",
    "курсы бурение скважин",
    "семинары добыча нефти",
    "повышение квалификации нефтяников",
    "промышленная безопасность нефтегаз",
    "курсы переработка нефти и газа",
    "обучение трубопроводный транспорт",
    "технические семинары Казахстан",
    "нефтегазовые тренинги",
  ],
  openGraph: {
    title: "Технические курсы для нефтегазовой отрасли — Abadan & Co.",
    description:
      "65+ курсов для специалистов нефтегазовой отрасли. Бурение, добыча, переработка, безопасность. 200+ экспертов.",
    url: "https://abadan.kz/treningi/neftegaz",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/neftegaz",
  },
};

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "коррози", "насос", "компрессор",
  "резервуар", "нефтебаз", "ГСМ", "эксплуатац", "интенсификац",
  "сероводород", "КИП", "автоматизац", "метрологи", "крекинг",
  "ректификац", "нефтехим", "битум", "мазут", "цементирован",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const neftegazCourses = SCHEDULE_DATA.filter((item) => isNeftegazTraining(item.name));
  return neftegazCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Технический курс: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

export default function NeftegazLayout({
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
