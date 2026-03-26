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
    url: "https://www.abadan.kz/treningi/finansy",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/finansy",
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
      url: "https://www.abadan.kz",
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

const FINANSY_FAQ = [
  { question: "Какие финансовые курсы доступны для бизнеса?", answer: "Более 18 курсов: МСФО/IFRS, налогообложение в РК, бюджетирование и планирование, казначейство, финансовый анализ, аудит, управленческий учёт, трансфертное ценообразование." },
  { question: "Сколько стоят курсы по финансам?", answer: "Стоимость финансовых курсов от 100 000 до 200 000 тенге в зависимости от программы и формата. Для корпоративных клиентов — специальные условия." },
  { question: "Есть ли курсы по МСФО в Казахстане?", answer: "Да, у нас есть несколько программ по МСФО: от базового курса до продвинутых тем (финансовые инструменты, консолидация, обесценение). Все курсы адаптированы под казахстанскую практику." },
  { question: "Кто проводит финансовые тренинги?", answer: "Тренеры — практикующие финансисты, аудиторы и консультанты с опытом работы в Big4, международных и казахстанских компаниях. Более 200 экспертов в нашем пуле." },
  { question: "Можно ли пройти финансовый курс онлайн?", answer: "Да, все финансовые курсы доступны в онлайн-формате через Zoom. Практические задания, кейсы и материалы те же, что и на очных занятиях." },
  { question: "Подходят ли курсы для финансистов нефтегазовых компаний?", answer: "Да, у нас есть специализированные программы с учётом специфики нефтегазовой отрасли: учёт в добывающих компаниях, налогообложение недропользователей, PRMS." },
];

export default function FinansyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FINANSY_FAQ.map((faq) => ({
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
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://www.abadan.kz" },
            { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://www.abadan.kz/treningi" },
            { "@type": "ListItem", position: 3, name: "Финансы", item: "https://www.abadan.kz/treningi/finansy" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
