import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обучение через Telegram и WhatsApp — ibirAi | Abadan & Co.",
  description:
    "ibirAi доставляет корпоративное обучение прямо в Telegram и WhatsApp. Никаких новых приложений — 87% открываемость, 3-минутные уроки там, где сотрудники уже общаются.",
  keywords: [
    "обучение через Telegram",
    "WhatsApp обучение",
    "микрообучение мессенджеры",
    "Telegram бот обучение",
    "корпоративное обучение мессенджер",
    "Telegram LMS",
    "обучение в мессенджерах Казахстан",
    "бот обучение сотрудников",
    "ibirAi Telegram",
    "микрообучение без приложений",
  ],
  openGraph: {
    title: "Обучение через Telegram и WhatsApp — ibirAi",
    description:
      "Корпоративное микрообучение в привычных мессенджерах. 87% открываемость, 3-минутные уроки, HR-аналитика.",
    url: "https://www.abadan.kz/ibirai/messenger",
    type: "website",
    images: [
      {
        url: "https://www.abadan.kz/og-ibirai.png",
        width: 1200,
        height: 630,
        alt: "ibirAi — обучение через Telegram и WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Обучение через Telegram и WhatsApp — ibirAi",
    description:
      "Корпоративное микрообучение в привычных мессенджерах. 87% открываемость.",
  },
  alternates: { canonical: "https://www.abadan.kz/ibirai/messenger" },
};

export default function MessengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ibirAi",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Messenger-Based Learning",
    operatingSystem: "Telegram, WhatsApp, Web",
    description:
      "Платформа корпоративного микрообучения в мессенджерах. 3-минутные уроки в Telegram и WhatsApp без установки приложений.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KZT",
      description: "Бесплатная демо-версия",
    },
    provider: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://www.abadan.kz",
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
        item: "https://www.abadan.kz",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ibirAi",
        item: "https://www.abadan.kz/ibirai",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Мессенджеры",
        item: "https://www.abadan.kz/ibirai/messenger",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Почему обучение в мессенджерах эффективнее LMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мессенджеры открывают в 4 раза чаще, чем письма LMS: 87% vs 23%. Сотрудник не заходит в отдельное приложение — урок приходит туда, где он уже находится. Это снимает главный барьер корпоративного обучения.",
        },
      },
      {
        "@type": "Question",
        name: "Нужно ли сотрудникам устанавливать дополнительные приложения?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет. ibirAi работает через Telegram или WhatsApp — оба мессенджера уже установлены у большинства сотрудников. Достаточно подписаться на бот, и обучение начинается.",
        },
      },
      {
        "@type": "Question",
        name: "Как обеспечивается безопасность корпоративного контента в мессенджерах?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Весь контент передаётся через зашифрованные API мессенджеров. Корпоративные материалы хранятся на защищённых серверах ibirAi. Для Энтерпрайз-сегмента доступно развёртывание в частном облаке.",
        },
      },
      {
        "@type": "Question",
        name: "Можно ли отслеживать обучение сотрудников через мессенджеры?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. HR-аналитика в реальном времени: кто открыл урок, кто завершил, результаты тестов, время прохождения. Данные доступны в веб-дашборде с фильтрацией по отделам, должностям и периодам.",
        },
      },
      {
        "@type": "Question",
        name: "Работает ли ibirAi там, где нет интернета?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Telegram поддерживает офлайн-режим для уже загруженного контента. Для отраслей с нестабильным соединением (нефтегаз, строительство) доступна веб-версия с оффлайн-кешированием через PWA.",
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
