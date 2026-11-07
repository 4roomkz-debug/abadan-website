// Сцены истории обучения на главной. Тексты — в messages/<locale>/home.json
// (story.s1…s5), иллюстрации без текста, поэтому одни и те же на трёх языках.
// Картинки — бумажная перекладка (стиль каруселей «Код кочевника»): композиция
// gpt-image-2, увеличение до 4K без изменений — Nano Banana Pro. Промпты и
// провенанс — .impeccable/mocks/story-papercut/*.png.json. Кадр 16:9: сцены 2–5 —
// последние кадры видео-переходов (.impeccable/mocks/story-video), увеличенные до 4K.

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
// align: "right" — точка справа, подпись растёт влево: для меток у правого края кадра.
export type Hotspot = { tag: HotspotTag; x: number; y: number; href: string; external?: boolean; align?: "right" };

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
  // Куда в последней сцене прилетает граф-логотип и становится аватаром ibirAi:
  // центр в процентах кадра 16:9, size — доля ширины кадра.
  avatar?: { x: number; y: number; size: number };
};

// Видео-переходы между эпохами (xAI grok-imagine-video-1.5, бумажная перекладка):
// ролик k ведёт из сцены k в сцену k+1, его последний кадр и есть картинка
// следующей сцены — переход бесшовный. Назад и на телефоне — дым.
export const STORY_TRANSITIONS = [
  { src: "/story/t-1-2.mp4" },
  { src: "/story/t-2-3.mp4" },
  { src: "/story/t-3-4.mp4" },
  { src: "/story/t-4-5.mp4" },
];

export const STORY_SCENES: StoryScene[] = [
  {
    id: "s1",
    hotspots: [
      { tag: "coaching", x: 84, y: 27, href: "/coaching", align: "right" },
      { tag: "leadership", x: 30, y: 77, href: "/treningi/liderstvo" },
      { tag: "corporate", x: 90, y: 71, href: "#contact", align: "right" },
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
      { tag: "schedule", x: 44, y: 20, href: "/schedule" },
      { tag: "hr", x: 96, y: 70, href: "/treningi/hr", align: "right" },
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
      { tag: "safety", x: 62, y: 12, href: "/treningi/neftegaz/bezopasnost" },
      { tag: "neftegaz", x: 96, y: 50, href: "/treningi/neftegaz", align: "right" },
      { tag: "onsite", x: 44, y: 86, href: "#contact" },
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
      { tag: "offline", x: 66, y: 12, href: "/schedule" },
      { tag: "online", x: 44, y: 12, href: "/schedule" },
      { tag: "finansy", x: 34, y: 82, href: "/treningi/finansy" },
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
    // Сфера-аватар ibirAi на кадре: центр и диаметр в процентах картинки; сюда прилетает граф логотипа.
    avatar: { x: 80, y: 62, size: 20 },
    hotspots: [
      { tag: "ibirai", x: 72, y: 84, href: "https://www.ibirai.com/ru", external: true },
      { tag: "ai", x: 70, y: 18, href: "/treningi/ai" },
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
