import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы корпоративного обучения — Abadan & Co.",
  description:
    "Реальные результаты обучения в крупнейших компаниях Казахстана. КазМунайГаз, Kaspi, Самрук-Казына и другие. 9 000+ обученных специалистов за 15 лет.",
  keywords: [
    "кейсы обучения Казахстан",
    "корпоративное обучение результаты",
    "Abadan кейсы",
    "тренинги для нефтегаза",
    "HR обучение кейсы",
  ],
  openGraph: {
    title: "Кейсы корпоративного обучения — Abadan & Co.",
    description:
      "Реальные результаты обучения в крупнейших компаниях Казахстана.",
    url: "https://www.abadan.kz/kejsy",
    type: "website",
  },
  alternates: { canonical: "https://www.abadan.kz/kejsy" },
};

export default function KejsyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://www.abadan.kz" },
      { "@type": "ListItem", position: 2, name: "Кейсы", item: "https://www.abadan.kz/kejsy" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
