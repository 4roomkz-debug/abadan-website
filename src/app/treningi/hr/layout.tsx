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

const HR_FAQ = [
  { question: "Какие HR-курсы доступны в Казахстане?", answer: "Abadan & Co. предлагает более 20 HR-курсов: трудовое право РК, рекрутинг, оценка персонала, KPI и грейдирование, кадровое делопроизводство, HR-аналитика. Курсы проводятся очно в Алматы и онлайн." },
  { question: "Сколько стоят HR-тренинги?", answer: "Стоимость HR-курсов от 100 000 до 180 000 тенге в зависимости от продолжительности и формата. Онлайн-формат дешевле очного. Корпоративным клиентам предоставляются скидки." },
  { question: "Какой сертификат выдаётся после обучения?", answer: "По окончании каждого курса выдаётся именной сертификат Abadan & Co., подтверждающий повышение квалификации. Сертификат признаётся работодателями Казахстана." },
  { question: "Можно ли пройти HR-курс онлайн?", answer: "Да, все HR-курсы доступны в онлайн-формате через Zoom. Вы получаете те же материалы, сертификат и доступ к записи занятий." },
  { question: "Какая продолжительность HR-курсов?", answer: "Курсы длятся от 16 до 40 академических часов (2-5 дней). Есть интенсивные форматы на выходных и вечерние программы." },
  { question: "Проводите ли вы корпоративное HR-обучение?", answer: "Да, мы проводим корпоративные тренинги с адаптацией под специфику компании. Выезжаем в регионы Казахстана. Более 9 000 специалистов обучено за 15 лет." },
];

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HR_FAQ.map((faq) => ({
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
            { "@type": "ListItem", position: 3, name: "HR и кадры", item: "https://abadan.kz/treningi/hr" },
          ],
        }) }}
      />
      {children}
    </>
  );
}
