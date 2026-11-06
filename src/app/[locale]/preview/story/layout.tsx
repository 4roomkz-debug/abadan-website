import type { Metadata } from "next";

// Закрытое превью истории обучения: не индексируется и не входит в sitemap.
// Удалить после переноса истории на главную.
export const metadata: Metadata = {
  title: "Превью: история обучения",
  robots: { index: false, follow: false },
};

export default function StoryPreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
