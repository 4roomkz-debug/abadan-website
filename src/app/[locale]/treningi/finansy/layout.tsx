import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/finansy">): Promise<Metadata> {
  return trainingMetadata("finansy", (await params).locale);
}

export default async function FinansyLayout({ children, params }: LayoutProps<"/[locale]/treningi/finansy">) {
  return (
    <>
      <TrainingJsonLd slug="finansy" locale={(await params).locale} />
      {children}
    </>
  );
}
