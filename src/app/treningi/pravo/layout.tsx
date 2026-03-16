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

const PRAVO_FAQ = [
  { question: "Какие юридические курсы вы предлагаете в Казахстане?", answer: "Более 25 курсов: трудовое право РК, договорная работа, госзакупки, налоговое право, комплаенс, корпоративное право, недропользование, таможенное регулирование, арбитражная практика." },
  { question: "Сколько стоят юридические семинары?", answer: "Стоимость юридических курсов от 110 000 до 190 000 тенге. Онлайн-формат дешевле. Корпоративным клиентам предоставляются специальные условия." },
  { question: "Актуальны ли программы с учётом последних изменений законодательства?", answer: "Да, все программы обновляются с учётом последних изменений в законодательстве РК. Тренеры — практикующие юристы, которые отслеживают все поправки в реальном времени." },
  { question: "Есть ли курсы по трудовому праву Казахстана?", answer: "Да, это одно из ключевых направлений. Курсы покрывают Трудовой кодекс РК, трудовые споры, медиацию, оформление документации, особенности для нефтегазовой отрасли." },
  { question: "Подходят ли курсы для юристов без опыта?", answer: "У нас есть программы разного уровня — от базовых для специалистов смежных профессий до продвинутых для практикующих юристов. Тренер адаптирует материал под уровень группы." },
  { question: "Выдаётся ли сертификат по юридическим курсам?", answer: "Да, каждый участник получает сертификат Abadan & Co. о повышении квалификации с указанием темы и количества часов обучения." },
];

export default function PravoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRAVO_FAQ.map((faq) => ({
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
            { "@type": "ListItem", position: 3, name: "Право", item: "https://abadan.kz/treningi/pravo" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
