import type { TrainingCategory } from "./types";

const ai: TrainingCategory = {
  slug: "ai",
  keywords: [
    "искусственн интеллект", "ИИ", "AI", "промпт", "нейросет",
    "ChatGPT", "Claude", "автоматизац документ", "ИИ-инструмент",
    "ИИ-агент", "GPT",
  ],
  areas: [
    { id: "ai-start", keywords: ["быстрый старт", "введение в ии", "основы ии", "начало работы"] },
    { id: "prompts", keywords: ["промпт", "prompt"] },
    { id: "docs", keywords: ["документ", "автоматизац", "отчёт", "переписк", "договор"] },
    { id: "ai-hr", keywords: ["hr", "рекрутинг", "резюме", "вакансий", "онбординг"] },
    { id: "data", keywords: ["данных", "аналитик", "таблиц", "визуализац", "суммариз"] },
    { id: "agents", keywords: ["агент", "gpt", "claude", "интеграц", "автоном"] },
  ],
  testimonials: ["pharma", "most", "asbis"],
};

export default ai;
