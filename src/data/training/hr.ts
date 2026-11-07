import type { TrainingCategory } from "./types";

const hr: TrainingCategory = {
  slug: "hr",
  keywords: [
    "кадр", "персонал", "HR", "рекрутинг", "подбор", "адаптац",
    "оценк", "компетенц", "оплат труд", "нормирован", "трудов",
    "штатн", "кадров", "ИПР", "индивидуальн развит", "оргструктур",
    "аттестац", "мотивац", "KPI", "грейд",
  ],
  areas: [
    { id: "labor-law", keywords: ["трудов", "кодекс", "медиац", "спор", "консенсус", "согласительн"] },
    { id: "recruitment", keywords: ["рекрутинг", "подбор", "адаптац"] },
    { id: "compensation", keywords: ["оплат", "нормирован", "суммирован", "вахт"] },
    { id: "assessment", keywords: ["оценк", "компетенц", "ИПР", "индивидуальн", "оргструктур", "аттестац"] },
    { id: "performance", keywords: ["результативн", "KPI", "грейд", "мотивац", "эффективн"] },
    { id: "development", keywords: ["лидер", "коучинг", "наставнич", "развити"] },
  ],
  testimonials: ["narxoz", "pharma", "vitaprofi"],
};

export default hr;
