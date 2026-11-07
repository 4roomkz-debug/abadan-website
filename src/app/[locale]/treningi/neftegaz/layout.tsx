import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/neftegaz">): Promise<Metadata> {
  return trainingMetadata("neftegaz", (await params).locale);
}

export default async function NeftegazLayout({ children, params }: LayoutProps<"/[locale]/treningi/neftegaz">) {
  return (
    <>
      <TrainingJsonLd slug="neftegaz" locale={(await params).locale} />
      {children}
    </>
  );
}
