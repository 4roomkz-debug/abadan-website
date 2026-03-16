import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ibirAi для soft skills — AI-обучение мягким навыкам | Abadan & Co.",
  description:
    "ibirAi развивает soft skills через AI-диалоги и микро-сценарии в Telegram и WhatsApp. Коммуникация, лидерство, обратная связь, переговоры — 3-минутные уроки с персональным AI-коучем.",
  keywords: [
    "микрообучение soft skills",
    "AI коуч",
    "обучение soft skills AI",
    "развитие мягких навыков Казахстан",
    "коммуникация обучение AI",
    "soft skills обучение Казахстан",
    "развитие лидерства онлайн",
    "эмоциональный интеллект обучение",
    "обратная связь обучение",
    "ibirAi soft skills",
  ],
  openGraph: {
    title: "ibirAi для soft skills — AI-обучение мягким навыкам",
    description:
      "AI-диалоги и микро-сценарии для развития коммуникации, лидерства и эмоционального интеллекта в Telegram и WhatsApp.",
    url: "https://abadan.kz/ibirai/soft-skills",
    type: "website",
    images: [
      {
        url: "https://abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi — AI-обучение soft skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibirAi для soft skills — AI-обучение мягким навыкам",
    description:
      "AI-диалоги и микро-сценарии для развития soft skills в Telegram и WhatsApp.",
  },
  alternates: { canonical: "https://abadan.kz/ibirai/soft-skills" },
};

export default function SoftSkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Soft Skills Training",
    operatingSystem: "Web, Telegram, WhatsApp",
    description:
      "AI-платформа для развития soft skills через микро-сценарии и диалоговые симуляции в мессенджерах.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KZT",
      description: "Бесплатная демо-версия",
    },
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://abadan.kz",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://abadan.kz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ibirAi",
        item: "https://abadan.kz/ibirai",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Soft Skills",
        item: "https://abadan.kz/ibirai/soft-skills",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Можно ли обучить soft skills через AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. ibirAi использует диалоговые симуляции — AI моделирует реальные рабочие ситуации: трудный разговор с коллегой, переговоры с клиентом, ситуация конфликта. Сотрудник практикует навык в безопасной среде и получает мгновенную обратную связь.",
        },
      },
      {
        "@type": "Question",
        name: "Какие soft skills развивает ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Платформа охватывает 6 ключевых направлений: коммуникация и убедительная речь, обратная связь и коучинг, переговоры и влияние, управление конфликтами, тайм-менеджмент и приоритизация, эмоциональный интеллект.",
        },
      },
      {
        "@type": "Question",
        name: "Как измеряется прогресс в развитии soft skills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ibirAi отслеживает качество ответов в симуляциях, динамику улучшения по каждому навыку и поведенческие изменения. HR-аналитика показывает прогресс по отделам и индивидуальным сотрудникам.",
        },
      },
      {
        "@type": "Question",
        name: "Сколько времени нужно для развития soft skills через ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Первые измеримые результаты появляются через 4–6 недель ежедневных 3-минутных практик. Полноценное закрепление навыка требует 90 дней — именно такой горизонт рекомендуется для программ командного развития.",
        },
      },
      {
        "@type": "Question",
        name: "Чем AI-обучение soft skills лучше тренингов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Тренинг даёт знание, но навык формируется через повторение. ibirAi обеспечивает ежедневную практику в реалистичных симуляциях — это принципиально дешевле и масштабируемее, чем очные тренинги. Плюс данные по каждому сотруднику.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
