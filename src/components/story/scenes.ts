// Сцены истории обучения на главной. Тексты — в messages/<locale>/home.json
// (story.s1…s5), иллюстрации без текста, поэтому одни и те же на трёх языках.
// Картинки пока эскизы (Gemini Flash, 1K) — промпты и провенанс лежат в
// .impeccable/mocks/story-drafts/*.png.json; чистовики заменят файлы на месте.

// Полные ключи словаря: типизация next-intl проверяет, что каждый существует.
export type SceneLinkLabel =
  | "common.nav.liderstvo"
  | "common.nav.neftegaz"
  | "common.nav.hr"
  | "common.nav.finansy"
  | "common.nav.pravo"
  | "common.nav.ai"
  | "common.header.coaching"
  | "home.story.allCourses"
  | "home.story.ibiraiSite";

export type SceneLink = { href: string; label: SceneLinkLabel; external?: boolean };

// Ключи подписей меток — home.story.tags.*
export type HotspotTag =
  | "leadership" | "coaching" | "corporate" | "schedule" | "hr" | "neftegaz"
  | "safety" | "onsite" | "offline" | "online" | "finansy" | "ibirai" | "ai";

// x, y — в процентах кадра 16:9. Точка ставится на предмет сцены, который
// связывает эпоху с тем, что Abadan делает сегодня.
export type Hotspot = { tag: HotspotTag; x: number; y: number; href: string; external?: boolean };

export type StoryScene = {
  id: "s1" | "s2" | "s3" | "s4" | "s5";
  image: string;
  imageMobile: string;
  // Сколько узлов графа логотипа видно в этой сцене: от нескольких людей до полной сферы.
  graphNodes: number;
  links: SceneLink[];
  hotspots: Hotspot[];
  // Ссылка на источник факта в сцене — показывается рядом с текстом.
  sourceUrl?: string;
  sourceLabel?: "home.story.s2.source" | "home.story.s3.source";
  showUpcoming?: boolean;
  primaryCta?: boolean;
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: "s1",
    hotspots: [
      { tag: "coaching", x: 66, y: 29, href: "/coaching" },
      { tag: "leadership", x: 55, y: 70, href: "/treningi/liderstvo" },
      { tag: "corporate", x: 86, y: 62, href: "#contact" },
    ],
    image: "/story/scene-1.webp",
    imageMobile: "/story/scene-1-m.webp",
    graphNodes: 5,
    primaryCta: true,
    links: [
      { href: "/treningi/liderstvo", label: "common.nav.liderstvo" },
      { href: "/coaching", label: "common.header.coaching" },
    ],
  },
  {
    id: "s2",
    hotspots: [
      { tag: "schedule", x: 60, y: 36, href: "/schedule" },
      { tag: "hr", x: 78, y: 68, href: "/treningi/hr" },
    ],
    image: "/story/scene-2.webp",
    imageMobile: "/story/scene-2-m.webp",
    graphNodes: 10,
    sourceUrl: "https://e-history.kz/ru/news/show/3950",
    sourceLabel: "home.story.s2.source",
    links: [{ href: "/schedule", label: "home.story.allCourses" }],
  },
  {
    id: "s3",
    hotspots: [
      { tag: "safety", x: 60, y: 26, href: "/treningi/neftegaz/bezopasnost" },
      { tag: "neftegaz", x: 64, y: 78, href: "/treningi/neftegaz" },
      { tag: "onsite", x: 73, y: 46, href: "#contact" },
    ],
    image: "/story/scene-3.webp",
    imageMobile: "/story/scene-3-m.webp",
    graphNodes: 15,
    sourceUrl:
      "https://gufo.me/dict/bse/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0_%D1%84%D0%B0%D0%B1%D1%80%D0%B8%D1%87%D0%BD%D0%BE-%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0",
    sourceLabel: "home.story.s3.source",
    links: [{ href: "/treningi/neftegaz", label: "common.nav.neftegaz" }],
  },
  {
    id: "s4",
    hotspots: [
      { tag: "offline", x: 56, y: 36, href: "/schedule" },
      { tag: "online", x: 82, y: 28, href: "/schedule" },
      { tag: "finansy", x: 66, y: 72, href: "/treningi/finansy" },
    ],
    image: "/story/scene-4.webp",
    imageMobile: "/story/scene-4-m.webp",
    graphNodes: 20,
    showUpcoming: true,
    links: [
      { href: "/treningi/hr", label: "common.nav.hr" },
      { href: "/treningi/finansy", label: "common.nav.finansy" },
      { href: "/treningi/pravo", label: "common.nav.pravo" },
    ],
  },
  {
    id: "s5",
    hotspots: [
      { tag: "ibirai", x: 58, y: 74, href: "https://www.ibirai.com/ru", external: true },
      { tag: "ai", x: 71, y: 32, href: "/treningi/ai" },
    ],
    image: "/story/scene-5.webp",
    imageMobile: "/story/scene-5-m.webp",
    graphNodes: 26,
    primaryCta: true,
    links: [
      { href: "/treningi/ai", label: "common.nav.ai" },
      { href: "https://www.ibirai.com/ru", label: "home.story.ibiraiSite", external: true },
    ],
  },
];
