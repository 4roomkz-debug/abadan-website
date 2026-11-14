import TrainingCategoryPage from "@/components/training/TrainingCategoryPage";

// Порядок пути нефти: бурение, добыча, транспорт, переработка, безопасность, автоматизация.
const ROUTE_ORDER = ["drilling", "extraction", "transport", "refining", "safety", "automation"] as const;

export default function NeftegazPage() {
  return <TrainingCategoryPage slug="neftegaz" routeOrder={ROUTE_ORDER} programFlow />;
}
