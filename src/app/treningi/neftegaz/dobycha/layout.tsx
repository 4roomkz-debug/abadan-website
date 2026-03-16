import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Курсы по добыче нефти и газа — Abadan & Co.",
  description:
    "Профессиональные курсы по добыче нефти и газа в Казахстане. Эксплуатация скважин, КРС, ГРП, газлифт, АСПО, интенсификация добычи, разработка пластов. Очный и онлайн формат.",
  keywords: [
    "добыча нефти обучение",
    "эксплуатация скважин курсы",
    "КРС обучение",
    "ГРП курсы",
    "нефтеотдача обучение",
    "газлифт курс",
    "АСПО курсы",
    "интенсификация добычи обучение",
    "разработка месторождений курс",
    "повышение нефтеотдачи пластов курс",
  ],
  openGraph: {
    title: "Курсы по добыче нефти и газа — Abadan & Co.",
    description:
      "Курсы по добыче и эксплуатации скважин: КРС, ГРП, газлифт, АСПО, интенсификация. 200+ экспертов-практиков нефтегазовой отрасли Казахстана.",
    url: "https://abadan.kz/treningi/neftegaz/dobycha",
    type: "website",
  },
  alternates: {
    canonical: "https://abadan.kz/treningi/neftegaz/dobycha",
  },
};

const DOBYCHA_KEYWORDS = [
  "добыч", "эксплуатац", "нефтеотдач", "интенсификац",
  "КРС", "ГРП", "насос", "газлифт", "фонтан",
  "АСПО", "промыслов", "НГДУ", "обводнён",
];

function isProductionCourse(name: string): boolean {
  const lower = name.toLowerCase();
  return DOBYCHA_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const courses = SCHEDULE_DATA.filter((item) => isProductionCourse(item.name));
  return courses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Курс по добыче нефти и газа: ${course.name}. ${course.hours} часов, очный и онлайн формат. Проводится в Алматы, Казахстан.`,
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

const DOBYCHA_FAQ = [
  {
    question: "Какие курсы по добыче нефти и газа вы предлагаете?",
    answer:
      "Мы предлагаем курсы по эксплуатации нефтяных и газовых скважин, методам увеличения нефтеотдачи пластов (МУН), гидравлическому разрыву пласта (ГРП), капитальному ремонту скважин (КРС), газлифтной добыче, борьбе с АСПО, механизированной добыче (ШСН, ЭЦН) и интенсификации добычи на обводнённых месторождениях. Все программы ведут практикующие эксперты нефтегазовой отрасли.",
  },
  {
    question: "Сколько стоит обучение по добыче нефти и газа?",
    answer:
      "Стоимость курсов по добыче составляет от 110 000 до 230 000 тенге за программу. Онлайн-формат доступен по сниженной цене. При корпоративном заказе от 5 участников предоставляются групповые скидки. Для уточнения стоимости конкретного курса свяжитесь с нашим менеджером.",
  },
  {
    question: "Выдаётся ли сертификат после курса по добыче нефти?",
    answer:
      "По окончании каждого курса выдаётся сертификат Abadan & Co. о повышении квалификации. Для ряда программ, связанных с промышленной безопасностью и эксплуатацией скважин, доступны удостоверения установленного образца, признаваемые нефтегазовыми предприятиями Казахстана.",
  },
  {
    question: "Проводите ли вы обучение непосредственно на промыслах?",
    answer:
      "Да. Мы организуем корпоративные программы с выездом на нефтяные промыслы в Атырауской, Мангистауской, Актюбинской и Кызылординской областях. Программа адаптируется под конкретные условия добычи, оборудование и технологические регламенты заказчика.",
  },
  {
    question: "Для кого предназначены курсы по добыче нефти и газа?",
    answer:
      "Программы рассчитаны на инженеров по добыче, мастеров по добыче нефти и газа, операторов ЦДНГ, технологов НГДУ, специалистов по капитальному ремонту и интенсификации скважин, а также руководителей производственных подразделений нефтедобывающих предприятий.",
  },
  {
    question: "Кто ведёт курсы по добыче нефти и газа?",
    answer:
      "Все курсы ведут эксперты-практики с опытом работы в нефтедобывающих компаниях от 10 лет. В числе преподавателей — главные технологи и инженеры-нефтяники, работавшие в ТШО, КПО, НКОК, Казмунайгаз, а также в международных сервисных компаниях.",
  },
];

export default function DobychaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DOBYCHA_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://abadan.kz" },
      { "@type": "ListItem", position: 2, name: "Тренинги", item: "https://abadan.kz/treningi" },
      { "@type": "ListItem", position: 3, name: "Нефтегаз", item: "https://abadan.kz/treningi/neftegaz" },
      { "@type": "ListItem", position: 4, name: "Добыча", item: "https://abadan.kz/treningi/neftegaz/dobycha" },
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
