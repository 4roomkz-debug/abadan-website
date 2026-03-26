import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по нефтепереработке и нефтехимии — Abadan & Co.",
  description:
    "Профессиональные курсы по нефтепереработке и нефтехимии в Казахстане. Крекинг, ректификация, каталитические процессы, контроль качества нефтепродуктов. Очно и онлайн.",
  keywords: [
    "нефтепереработка курсы",
    "нефтехимия обучение",
    "крекинг курсы",
    "ректификация обучение",
    "каталитические процессы нефть",
    "переработка нефти Казахстан",
    "обучение нефтепереработчиков",
    "битум курсы",
    "контроль качества нефтепродуктов",
    "семинары нефтехимия Алматы",
  ],
  openGraph: {
    title: "Курсы по нефтепереработке и нефтехимии — Abadan & Co.",
    description:
      "Курсы по нефтепереработке: крекинг, ректификация, нефтехимия, контроль качества. Эксперты-практики, очный и онлайн форматы.",
    url: "https://www.abadan.kz/treningi/neftegaz/pererabotka",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/neftegaz/pererabotka",
  },
};

const FILTER_KEYWORDS = [
  "переработк", "крекинг", "ректификац", "катализ", "нефтехим",
  "битум", "мазут", "дизельн", "бензин", "абсорбц",
  "обессоливан", "обезвожив", "сепарац",
];

function isPeregrabotkaTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return FILTER_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const courses = SCHEDULE_DATA.filter((item) => isPeregrabotkaTraining(item.name));
  return courses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по нефтепереработке: ${course.name}. ${course.hours} часов, очный и онлайн формат.`,
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
    question: "Какие курсы по нефтепереработке предлагает Abadan & Co.?",
    answer:
      "Мы предлагаем курсы по первичной и глубокой переработке нефти, каталитическому крекингу, ректификации, нефтехимии, производству битума, мазута, дизельного топлива и бензина. Отдельные программы охватывают процессы обессоливания, обезвоживания и сепарации нефти.",
  },
  {
    question: "Для кого предназначены курсы по нефтепереработке?",
    answer:
      "Курсы предназначены для технологов и инженеров-технологов НПЗ, начальников установок и цехов, операторов технологических установок, специалистов лабораторий контроля качества, а также руководителей производственных подразделений нефтеперерабатывающих предприятий.",
  },
  {
    question: "Сколько длится обучение по нефтепереработке?",
    answer:
      "Продолжительность курсов составляет от 8 до 40 часов в зависимости от темы. Интенсивные двухдневные семинары охватывают 16 часов практических и теоретических занятий. Для глубокого изучения технологий доступны расширенные программы.",
  },
  {
    question: "Проводите ли вы обучение непосредственно на нефтеперерабатывающих заводах?",
    answer:
      "Да, мы организуем корпоративные программы с выездом на НПЗ в Павлодаре, Шымкенте и Атырау. Обучение адаптируется под конкретные установки и технологические регламенты предприятия.",
  },
  {
    question: "Каковы требования к подготовке для поступления на курс?",
    answer:
      "Для большинства курсов требуется высшее или среднее специальное техническое образование по специальностям нефтегазового профиля. Вводные курсы доступны для специалистов с базовым техническим образованием без опыта в переработке.",
  },
  {
    question: "Какой документ выдаётся по окончании курса?",
    answer:
      "Выпускники получают сертификат Abadan & Co. о повышении квалификации. Для ряда программ предусмотрена выдача удостоверений установленного образца, признаваемых предприятиями нефтегазовой отрасли Казахстана.",
  },
];

export default function PererabotkaLayout({
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
      { "@type": "ListItem", position: 4, name: "Переработка", item: "https://www.abadan.kz/treningi/neftegaz/pererabotka" },
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
