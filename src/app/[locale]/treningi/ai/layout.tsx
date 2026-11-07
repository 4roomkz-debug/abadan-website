import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/ai">): Promise<Metadata> {
  return trainingMetadata("ai", (await params).locale);
}

export default async function AILayout({ children, params }: LayoutProps<"/[locale]/treningi/ai">) {
  return (
    <>
      <TrainingJsonLd slug="ai" locale={(await params).locale} />
      {children}
    </>
  );
}
