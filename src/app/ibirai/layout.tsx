import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ibirAi — AI-платформа микрообучения в мессенджерах | Abadan & Co.",
  description:
    "ibirAi — микрообучение нового поколения. 3-минутные уроки в Telegram и WhatsApp с AI-аватаром. 87% доходимость vs 23% у LMS. Геймификация, HR-аналитика, быстрый запуск за 2-3 недели.",
  keywords: [
    "AI платформа обучения",
    "микрообучение Казахстан",
    "LMS Казахстан",
    "обучение через Telegram",
    "WhatsApp обучение",
    "микрообучение сотрудников",
    "корпоративное обучение AI",
    "ibirAi",
    "обучение в мессенджерах",
    "AI обучение персонала",
    "альтернатива LMS",
    "геймификация обучения",
  ],
  openGraph: {
    title: "ibirAi — AI-платформа микрообучения в мессенджерах",
    description:
      "3-минутные уроки в Telegram и WhatsApp с AI-аватаром. 87% доходимость. Геймификация и HR-аналитика.",
    url: "https://abadan.kz/ibirai",
    type: "website",
    images: [
      {
        url: "https://abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi — платформа микрообучения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibirAi — AI-платформа микрообучения в мессенджерах",
    description:
      "3-минутные уроки в Telegram и WhatsApp с AI-аватаром. 87% доходимость.",
  },
  alternates: { canonical: "https://abadan.kz/ibirai" },
};

export default function IbiraiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, Telegram, WhatsApp",
    description:
      "AI-платформа микрообучения в мессенджерах. 3-минутные уроки с AI-аватаром, геймификация, HR-аналитика.",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Что такое ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ibirAi — это AI-платформа микрообучения, которая доставляет 3-минутные уроки прямо в Telegram и WhatsApp. Вместо традиционных LMS, сотрудники учатся там, где уже проводят время.",
        },
      },
      {
        "@type": "Question",
        name: "Чем ibirAi лучше традиционной LMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "87% доходимость у ibirAi vs 23% у традиционных LMS. Не нужна установка приложений, обучение идёт в привычных мессенджерах, 3-минутные уроки не отрывают от работы.",
        },
      },
      {
        "@type": "Question",
        name: "Как быстро можно запустить ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Запуск занимает 2-3 недели от первого контакта. Мы помогаем с переносом контента и настройкой платформы под вашу компанию.",
        },
      },
      {
        "@type": "Question",
        name: "Какие мессенджеры поддерживает ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ibirAi работает в Telegram и WhatsApp. Также доступна веб-версия и интеграция с корпоративными HR-системами.",
        },
      },
      {
        "@type": "Question",
        name: "Сколько стоит ibirAi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Стоимость зависит от количества пользователей и набора функций. Мы предлагаем бесплатную демо-версию и гибкие тарифы для компаний от 50 сотрудников.",
        },
      },
    ],
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
