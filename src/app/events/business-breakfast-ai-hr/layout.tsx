import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бизнес-завтрак: AI в HR — 30 января 2026",
  description:
    "Бесплатный бизнес-завтрак для HR-директоров и L&D специалистов. Революция найма и обучения — кейсы, метрики, практика. 3 спикера, нетворкинг, демо ibirAi. Алматы, 30 января 2026.",
  keywords: [
    "AI в HR",
    "искусственный интеллект HR",
    "бизнес-завтрак HR",
    "HR мероприятие Алматы",
    "автоматизация HR",
    "AI рекрутинг",
    "микрообучение",
    "ibirAi",
    "HR тренды 2026",
    "бесплатное мероприятие HR",
  ],
  openGraph: {
    title: "Бизнес-завтрак: AI в HR — 30 января 2026 | Бесплатно",
    description:
      "Бесплатный бизнес-завтрак для HR-директоров. Узнайте, как AI меняет найм и обучение. 3 спикера, живые кейсы, демо ibirAi.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.abadan.kz/events/business-breakfast-ai-hr",
    siteName: "Abadan & Co.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Бизнес-завтрак: AI в HR — Abadan & Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бизнес-завтрак: AI в HR — 30 января 2026",
    description:
      "Бесплатно для HR-директоров. AI в найме и обучении — кейсы, метрики, практика.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.abadan.kz/events/business-breakfast-ai-hr",
  },
};

function EventJsonLd() {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: "Бизнес-завтрак: AI в HR",
    description:
      "Бесплатный бизнес-завтрак для HR-директоров и L&D специалистов. Революция найма и обучения — кейсы, метрики, практика.",
    startDate: "2026-01-30T09:00:00+06:00",
    endDate: "2026-01-30T11:30:00+06:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Променад бизнес-парк, конференц-зал «Орда»",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Абая 44а",
        addressLocality: "Алматы",
        addressCountry: "KZ",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Abadan & Co.",
      url: "https://www.abadan.kz",
    },
    performer: [
      { "@type": "Person", name: "Диас Жумагалиев", jobTitle: "AI и рекрутинг эксперт" },
      { "@type": "Person", name: "Даниэль Алисов", jobTitle: "AI-агенты и автоматизация эксперт" },
      { "@type": "Person", name: "Гани Абадан", jobTitle: "Основатель ibirAi" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      url: "https://www.abadan.kz/events/business-breakfast-ai-hr",
    },
    image: "https://www.abadan.kz/og-image.png",
    url: "https://www.abadan.kz/events/business-breakfast-ai-hr",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
    />
  );
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventJsonLd />
      {children}
    </>
  );
}
