import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// ibirAi — отдельный продукт со своим сайтом; раздела на abadan.kz больше нет
// (решение Гани 06.11.2026). Подстраниц у ibirai.com нет, ведём на главную.
const IBIRAI_URL = "https://www.ibirai.com/ru";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ibirai", destination: IBIRAI_URL, permanent: true },
      { source: "/ibirai/:path*", destination: IBIRAI_URL, permanent: true },
      { source: "/:locale(ru|kk|en)/ibirai", destination: IBIRAI_URL, permanent: true },
      { source: "/:locale(ru|kk|en)/ibirai/:path*", destination: IBIRAI_URL, permanent: true },
      // Сайт переехал на адреса с префиксом языка. Старые русские адреса без
      // префикса (/about, /treningi/hr) — постоянным 308 на /ru/..., чтобы
      // поисковики перенесли позиции. Корень "/" сюда не попадает: его по
      // cookie и Accept-Language разводит next-intl в proxy.ts.
      // Не трогаем: префиксы языков, API, служебные пути и файлы (путь с точкой).
      {
        source: "/:path((?!(?:ru|kk|en|api|_next|_vercel)(?:/|$))[^.]+)",
        destination: "/ru/:path",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
