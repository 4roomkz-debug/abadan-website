import type { Metadata } from "next";
import { trainingMetadata, TrainingJsonLd } from "@/lib/training-layout";

export async function generateMetadata({ params }: LayoutProps<"/[locale]/treningi/hr">): Promise<Metadata> {
  return trainingMetadata("hr", (await params).locale);
}

export default async function HRLayout({ children, params }: LayoutProps<"/[locale]/treningi/hr">) {
  return (
    <>
      <TrainingJsonLd slug="hr" locale={(await params).locale} />
      {children}
    </>
  );
}
