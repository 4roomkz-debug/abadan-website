import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isRuOnlyPath, routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // /kk/blog и /en/blog: раздел есть только на русском — ведём на /ru/blog,
  // а не отдаём 404.
  const match = request.nextUrl.pathname.match(/^\/(kk|en)(\/.*)$/);
  if (match && isRuOnlyPath(match[2])) {
    const url = request.nextUrl.clone();
    url.pathname = `/ru${match[2]}`;
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Всё, кроме API, служебных путей Next/Vercel и файлов с расширением.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
