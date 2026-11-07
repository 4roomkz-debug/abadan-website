import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/pravo">): Promise<Metadata> {
  return trainingMetadata("pravo", (await params).locale);
}

export default async function PravoLayout({ children, params }: LayoutProps<"/[locale]/treningi/pravo">) {
  return (
    <>
      <TrainingJsonLd slug="pravo" locale={(await params).locale} />
      {children}
    </>
  );
}
