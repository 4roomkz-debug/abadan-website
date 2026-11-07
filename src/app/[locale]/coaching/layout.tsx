import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { withLocale } from "@/lib/seo";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/coaching">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "coaching" });
  return withLocale(
    { title: t("metaTitle"), description: t("metaDescription"), openGraph: { title: t("metaTitle"), description: t("metaDescription"), type: "website" } },
    locale,
    "/coaching",
  );
}

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
