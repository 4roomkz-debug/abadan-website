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

const AI_FAQ = [
  { question: "Какие курсы по искусственному интеллекту вы предлагаете?", answer: "8+ курсов: промпт-инжиниринг для бизнеса, ИИ для HR, автоматизация документооборота с ИИ, ИИ-агенты, работа с данными и аналитика, нейросети для маркетинга, ChatGPT и Claude для руководителей." },
  { question: "Нужен ли технический опыт для курсов по ИИ?", answer: "Нет, наши курсы разработаны для бизнес-пользователей без технического бэкграунда. Фокус на практическое применение ИИ в повседневных рабочих задачах." },
  { question: "Сколько стоят курсы по ИИ?", answer: "Стоимость от 90 000 до 160 000 тенге. Корпоративный формат с адаптацией под отрасль и задачи компании — по запросу." },
  { question: "Что такое промпт-инжиниринг?", answer: "Промпт-инжиниринг — это навык эффективного взаимодействия с ИИ-инструментами. На курсе вы научитесь писать точные запросы для ChatGPT, Claude и других нейросетей для решения бизнес-задач." },
  { question: "Как ИИ может помочь HR-отделу?", answer: "ИИ автоматизирует рутину HR: скрининг резюме, составление описаний вакансий, анализ вовлечённости, создание учебных материалов, ответы на типовые вопросы сотрудников." },
  { question: "Есть ли практика на курсах?", answer: "Да, 70% времени — практика на реальных задачах. Каждый участник работает с ИИ-инструментами и уходит с готовыми промптами и шаблонами для своей работы." },
];

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AI_FAQ.map((faq) => ({
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
            { "@type": "ListItem", position: 3, name: "Искусственный интеллект", item: "https://abadan.kz/treningi/ai" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
