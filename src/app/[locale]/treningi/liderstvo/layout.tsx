import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/liderstvo">): Promise<Metadata> {
  return trainingMetadata("liderstvo", (await params).locale);
}

export default async function LiderstvoLayout({ children, params }: LayoutProps<"/[locale]/treningi/liderstvo">) {
  return (
    <>
      <TrainingJsonLd slug="liderstvo" locale={(await params).locale} />
      {children}
    </>
  );
}
