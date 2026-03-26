import type { Metadata } from "next";
import { SCHEDULE_DATA } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Нефтегазовые тренинги в Атырау — Abadan & Co.",
  description:
    "Нефтегазовые тренинги и программы повышения квалификации для специалистов Атырауской области. Обучение для ТШО, НКОК и других крупнейших операторов. Выезд на объект по всему Казахстану.",
  keywords: [
    "тренинги нефтегаз Атырау",
    "обучение Атырау",
    "курсы ТШО",
    "обучение нефтяников Атырау",
    "повышение квалификации Атырау",
    "семинары нефтегаз Атырау",
    "корпоративное обучение Атырау",
    "НКОК обучение",
    "Тенгиз обучение",
    "нефтегазовые курсы Казахстан Атырау",
  ],
  openGraph: {
    title: "Нефтегазовые тренинги в Атырау — Abadan & Co.",
    description:
      "65+ технических курсов для специалистов нефтегазовой отрасли Атырауской области. Выезд на объект, корпоративные программы для ТШО, НКОК, КМГ.",
    url: "https://www.abadan.kz/treningi/neftegaz/atyrau",
    type: "website",
  },
  alternates: {
    canonical: "https://www.abadan.kz/treningi/neftegaz/atyrau",
  },
};

const OG_KEYWORDS = [
  "нефт", "газ", "скважин", "бурен", "добыч", "переработк",
  "трубопровод", "месторожден", "геолог", "промыслов", "пласт",
  "КРС", "ГРП", "НГДУ", "коррози", "насос", "компрессор",
  "резервуар", "нефтебаз", "ГСМ", "эксплуатац", "интенсификац",
  "сероводород", "КИП", "автоматизац", "метрологи", "крекинг",
  "ректификац", "нефтехим", "битум", "мазут", "цементирован",
  "недр", "углеводород", "нефтеотдач", "газлифт", "фонтан",
  "перфорац", "каротаж", "сепарац", "гидравлик", "магистральн",
  "ректификац", "дизельн", "бензин",
];

function isNeftegazTraining(name: string): boolean {
  const lower = name.toLowerCase();
  return OG_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function buildCourseJsonLd() {
  const neftegazCourses = SCHEDULE_DATA.filter((item) =>
    isNeftegazTraining(item.name)
  );
  return neftegazCourses.slice(0, 20).map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: `Технический курс для нефтегазовой отрасли: ${course.name}. ${course.hours} часов. Доступен с выездом на объекты в Атырауской области.`,
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
        name: "Очный / выезд на объект",
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
        name: "Атырау, Казахстан",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Атырау",
          addressRegion: "Атырауская область",
          addressCountry: "KZ",
        },
      },
    },
  }));
}

const ATYRAU_FAQ = [
  {
    question: "Проводите ли вы тренинги непосредственно в Атырау?",
    answer:
      "Да, мы регулярно организуем обучение в Атырау: как в учебных центрах города, так и с выездом на производственные объекты заказчика. Форматы — очный, онлайн или смешанный.",
  },
  {
    question: "Работаете ли вы с компаниями ТШО и НКОК?",
    answer:
      "Мы обучаем специалистов крупнейших нефтегазовых компаний Атырауского региона, включая подрядчиков и сервисные организации, работающие на объектах Tengizchevroil и НКОК. Программы адаптируются под требования конкретного заказчика.",
  },
  {
    question: "Как организован выезд тренера в Атырау?",
    answer:
      "Мы берём на себя все вопросы логистики. Тренер прибывает в Атырау заблаговременно. Стоимость командировочных расходов рассчитывается индивидуально и включается в корпоративное предложение.",
  },
  {
    question: "Можно ли провести обучение прямо на месторождении?",
    answer:
      "Да, мы организуем выездное обучение на месторождениях Тенгиз, Кашаган и других объектах. Для допуска на охраняемые территории координируем оформление пропусков совместно с вашим отделом безопасности.",
  },
  {
    question: "Какие курсы наиболее востребованы среди атырауских нефтяников?",
    answer:
      "Наибольший спрос в Атырауском регионе — на курсы по эксплуатации нефтегазового оборудования, промышленной безопасности, КИПиА, коррозионной защите трубопроводов и работе с сероводородсодержащими средами.",
  },
  {
    question: "Предусмотрены ли корпоративные скидки при заказе нескольких курсов?",
    answer:
      "Да. При корпоративном заказе от 3 курсов или группы от 5 специалистов мы предлагаем пакетные условия. Запросите коммерческое предложение — рассчитаем персональные условия для вашей компании.",
  },
];

export default function AtyrauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesJsonLd = buildCourseJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ATYRAU_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://www.abadan.kz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Тренинги",
        item: "https://www.abadan.kz/treningi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Нефтегаз",
        item: "https://www.abadan.kz/treningi/neftegaz",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Атырау",
        item: "https://www.abadan.kz/treningi/neftegaz/atyrau",
      },
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
