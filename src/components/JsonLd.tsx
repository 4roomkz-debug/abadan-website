export function OrganizationJsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abadan & Co.",
    alternateName: "Абадан",
    url: "https://abadan.kz",
    logo: "https://abadan.kz/favicon.svg",
    description:
      "Корпоративное обучение и курсы повышения квалификации в Казахстане. Бизнес-тренинги, технические семинары.",
    foundingDate: "2015",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 200,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-XXX-XXX-XX-XX",
      contactType: "customer service",
      availableLanguage: ["Russian", "Kazakh"],
    },
    sameAs: [
      // Добавьте ссылки на соцсети
      // "https://www.linkedin.com/company/abadan",
      // "https://www.instagram.com/abadan_kz",
    ],
    areaServed: {
      "@type": "Country",
      name: "Kazakhstan",
    },
    knowsAbout: [
      "Корпоративное обучение",
      "Бизнес-тренинги",
      "Курсы повышения квалификации",
      "HR обучение",
      "Нефтегазовая отрасль",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://abadan.kz/#organization",
    name: "Abadan & Co.",
    image: "https://abadan.kz/og-image.svg",
    url: "https://abadan.kz",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressRegion: "Алматы",
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.238949,
      longitude: 76.945465,
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "359",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}

export function WebSiteJsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abadan & Co.",
    url: "https://abadan.kz",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://abadan.kz/schedule?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

export function CourseListJsonLd() {
  const courseListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Открытые тренинги Abadan & Co.",
    description: "Расписание бизнес-тренингов и технических семинаров на 2026 год",
    url: "https://abadan.kz/schedule",
    numberOfItems: 172,
    itemListElement: [
      {
        "@type": "Course",
        name: "Бизнес-тренинги и управление",
        description: "Курсы по управлению, HR, финансам и праву",
        provider: {
          "@type": "Organization",
          name: "Abadan & Co.",
        },
      },
      {
        "@type": "Course",
        name: "Технические семинары",
        description: "Курсы для нефтегазовой отрасли и производства",
        provider: {
          "@type": "Organization",
          name: "Abadan & Co.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListData) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
