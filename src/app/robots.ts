import { MetadataRoute } from "next";

// Явный allow-list AI-краулеров. Группа `*` уже разрешает всё, но перечисление
// делает намерение читаемым и защищает от смены умолчания в будущем.
// GPTBot отвечает за обучение, OAI-SearchBot — за выдачу ChatGPT; нужны оба.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  // Прочие
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
];

// Yandex важен для казахстанской выдачи.
const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "YandexBot"];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: "https://www.abadan.kz/sitemap.xml",
    host: "https://www.abadan.kz",
  };
}
