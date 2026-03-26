import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по промышленной безопасности в нефтегазе — Abadan & Co.",
  description:
    "Курсы по промышленной безопасности для нефтегазовой отрасли в Казахстане. Охрана труда, HSE-менеджмент, работа с сероводородом, пожарная безопасность. Соответствие требованиям РК.",
  keywords: [
    "промышленная безопасность обучение РК",
    "охрана труда нефтегаз",
    "HSE курсы",
    "сероводород обучение",
    "безопасность нефтегаз",
    "промбезопасность курсы Казахстан",
    "пожарная безопасность нефтегаз",
    "охрана труда нефтяники",
    "HSE менеджмент обучение",
    "риск-менеджмент нефтегаз",
  ],
  openGraph: {
    title: "Курсы по промышленной безопасности в нефтегазе — Abadan & Co.",
    description:
      "Обучение промышленной безопасности, охране труда и HSE для нефтегазовых предприятий. Соответствует требованиям законодательства РК.",
    url: "https://www.abadan.kz/treningi/neftegaz/bezopasnost",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/neftegaz/bezopasnost",
  },
};

const FILTER_KEYWORDS = [
  "сероводород", "коррози", "факельн", "безопасност", "охран труд",
  "HSE", "пожар", "давлен", "радиац", "опасност", "риск",
];

function isBezopasnostTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return FILTER_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const courses = SCHEDULE_DATA.filter((item) => isBezopasnostTraining(item.name));
  return courses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по промышленной безопасности: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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

const FAQ = [
  {
    question: "Какие курсы по промышленной безопасности вы предлагаете для нефтегазовой отрасли?",
    answer:
      "Мы предлагаем курсы по промышленной безопасности на опасных производственных объектах, работе с сероводородом, HSE-менеджменту, охране труда в нефтегазовой отрасли, пожарной безопасности, управлению рисками и предотвращению аварийных ситуаций.",
  },
  {
    question: "Соответствуют ли курсы требованиям законодательства Казахстана?",
    answer:
      "Да, все программы разработаны в соответствии с требованиями Закона РК «О промышленной безопасности», приказами Министерства энергетики и Министерства труда. По окончании выдаются удостоверения, признаваемые надзорными органами РК.",
  },
  {
    question: "Обязательно ли обучение по промышленной безопасности для нефтяников?",
    answer:
      "Да. Все работники опасных производственных объектов нефтегазовой отрасли обязаны проходить инструктаж и обучение по промышленной безопасности согласно требованиям законодательства РК. Периодичность обучения — не реже одного раза в год.",
  },
  {
    question: "Что включает курс по работе с сероводородом?",
    answer:
      "Курс охватывает свойства и токсикологию H₂S, средства индивидуальной защиты, действия при аварии, первую помощь при отравлении, мониторинг концентраций, правила безопасной работы на объектах с содержанием сероводорода. Включает практические занятия с СИЗОД.",
  },
  {
    question: "Предоставляете ли вы обучение по HSE-менеджменту?",
    answer:
      "Да, мы проводим курсы по системам управления HSE в соответствии со стандартами ISO 45001 и ISO 14001, риск-менеджменту, аудиту безопасности, формированию культуры безопасного поведения на производстве.",
  },
  {
    question: "Можете ли вы организовать обучение на нашем объекте?",
    answer:
      "Да, мы выезжаем на объекты в нефтегазовых регионах Казахстана: Атырау, Актау, Мангистау, Кызылорда. Корпоративные программы адаптируются под специфику вашего предприятия, конкретные риски и требования надзорных органов.",
  },
];

export default function BezopasnostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://www.abadan.kz" },
      { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://www.abadan.kz/treningi" },
      { "@type": "ListItem", position: 3, name: "Нефтегаз", item: "https://www.abadan.kz/treningi/neftegaz" },
      { "@type": "ListItem", position: 4, name: "Безопасность", item: "https://www.abadan.kz/treningi/neftegaz/bezopasnost" },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
