import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по бурению скважин — Abadan & Co.",
  description:
    "Профессиональные курсы по бурению и строительству скважин в Казахстане. Технология бурения, цементирование, каротаж, горизонтальное бурение, перфорация. Очный и онлайн формат.",
  keywords: [
    "бурение скважин обучение",
    "технология бурения курсы",
    "курсы бурение Казахстан",
    "строительство скважин обучение",
    "каротаж обучение",
    "цементирование скважин курсы",
    "горизонтальное бурение курс",
    "повышение квалификации бурение",
    "курсы буровиков Алматы",
    "обучение буровых инженеров",
  ],
  openGraph: {
    title: "Курсы по бурению скважин — Abadan & Co.",
    description:
      "Курсы по бурению и строительству скважин: технология, цементирование, каротаж, горизонтальное бурение. 200+ экспертов-практиков из нефтегазовой отрасли.",
    url: "https://www.abadan.kz/treningi/neftegaz/burenie",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/neftegaz/burenie",
  },
};

const BURENIE_KEYWORDS = [
  "бурен", "скважин", "цементирован", "долот", "каротаж",
  "перфорац", "инклинометр", "горизонтальн", "Ротор",
];

function isDrillCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return BURENIE_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const courses = SCHEDULE_DATA.filter((item) => isDrillCourse(item.name));
  return courses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по бурению скважин: ${course.name}. ${course.hours} часов, очный и онлайн формат. Проводится в Алматы, Казахстан.`,
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

const BURENIE_FAQ = [
  {
    question: "Какие курсы по бурению скважин вы предлагаете?",
    answer:
      "Мы предлагаем курсы по технологии бурения нефтяных и газовых скважин, горизонтальному и направленному бурению, цементированию обсадных колонн, долотному сервису, каротажу и геонавигации, инклинометрии, перфорации пластов, промывке скважин. Все программы разработаны практикующими буровыми инженерами.",
  },
  {
    question: "Сколько стоит обучение по бурению скважин?",
    answer:
      "Стоимость курсов по бурению составляет от 120 000 до 220 000 тенге за программу. Онлайн-формат доступен по сниженной стоимости. При корпоративном заказе от 5 человек предоставляются групповые скидки.",
  },
  {
    question: "Выдаётся ли сертификат после курса по бурению?",
    answer:
      "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации. Для ряда программ доступна дополнительная сертификация по международным стандартам IADC/IWCF.",
  },
  {
    question: "Проводите ли вы обучение по горизонтальному бурению?",
    answer:
      "Да, курс по горизонтальному и направленному бурению — один из наиболее востребованных. Программа охватывает проектирование профиля скважины, управление инструментом, геонавигацию и типичные осложнения при бурении горизонтальных участков.",
  },
  {
    question: "Можно ли организовать корпоративное обучение с выездом на объект?",
    answer:
      "Да. Мы проводим корпоративное обучение буровых бригад непосредственно на объектах в Атырау, Актобе, Мангистау, Кызылорде и других регионах Казахстана. Программа адаптируется под специфику оборудования и процессы заказчика.",
  },
  {
    question: "Кто ведёт курсы по бурению скважин?",
    answer:
      "Все курсы ведут эксперты-практики с опытом работы в буровых компаниях от 10 лет. В числе преподавателей — главные инженеры, буровые супервайзеры и технические директора, работавшие в ТШО, НКОК, КПО, Schlumberger, Halliburton и других компаниях.",
  },
];

export default function BurenieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BURENIE_FAQ.map((faq) => ({
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
      { "@type": "ListItem", position: 4, name: "Бурение", item: "https://www.abadan.kz/treningi/neftegaz/burenie" },
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
