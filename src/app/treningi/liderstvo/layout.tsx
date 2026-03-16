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

const LIDERSTVO_FAQ = [
  { question: "Какие тренинги для руководителей вы предлагаете?", answer: "Более 12 тренингов: лидерство и управление командой, деловые переговоры, управление конфликтами, тайм-менеджмент, эмоциональный интеллект, публичные выступления, коучинг, стратегическое мышление." },
  { question: "Сколько стоят тренинги для руководителей?", answer: "Стоимость тренингов от 120 000 до 200 000 тенге. Корпоративный формат с адаптацией под компанию — по запросу. Онлайн-формат дешевле очного." },
  { question: "Подходят ли тренинги для линейных менеджеров?", answer: "Да, у нас есть программы для разных уровней: от линейных руководителей до топ-менеджмента. Тренер адаптирует кейсы и упражнения под уровень участников." },
  { question: "Как проходят тренинги по лидерству?", answer: "Формат: 20% теории, 80% практики. Деловые игры, кейсы из реального бизнеса, групповые упражнения, индивидуальная обратная связь от тренера." },
  { question: "Можно ли заказать корпоративный тренинг по лидерству?", answer: "Да, мы проводим корпоративные тренинги с адаптацией программы под задачи вашей компании. Предварительно проводим диагностику для точной настройки содержания." },
  { question: "Есть ли программы по переговорам?", answer: "Да, мы предлагаем несколько форматов: базовый курс деловых переговоров, жёсткие переговоры, переговоры в закупках, международные переговоры. Всё с практической отработкой." },
];

export default function LiderstvoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LIDERSTVO_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://abadan.kz" },
            { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://abadan.kz/treningi" },
            { "@type": "ListItem", position: 3, name: "Лидерство", item: "https://abadan.kz/treningi/liderstvo" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
