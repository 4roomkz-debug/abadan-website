import { NextResponse } from "next/server";
import {
  AI_PERSONA,
  COMPANY_INFO,
  TRAINING_FORMATS,
  TRAININGS,
  PRICING_INFO,
  FAQ,
} from "@/data/ai-knowledge";

const DEEPSEEK_API_KEY = "sk-3be6a5b6de184338bd61b8d5f625e2a6";

// Генерируем промпт на основе базы знаний
const generateSystemPrompt = () => {
  const trainingsText = TRAININGS.map(
    (cat) =>
      `${cat.category}:\n${cat.programs
        .map((p) => `- ${p.name} (${p.duration}) — ${p.description}`)
        .join("\n")}`
  ).join("\n\n");

  const faqText = FAQ.map((f) => `В: ${f.question}\nО: ${f.answer}`).join("\n\n");

  return `Ты — ${AI_PERSONA.name}, ${AI_PERSONA.role} компании ${COMPANY_INFO.name}.

ТВОЯ ЛИЧНОСТЬ:
- Тебя зовут ${AI_PERSONA.name}
- Ты дружелюбная, живая, общаешься как реальный человек
- Пишешь просто и понятно, без канцелярита
- НЕ используй жирный шрифт, звездочки, нумерованные списки
- НЕ пиши длинные ответы — максимум 2-3 коротких предложения
- Используй эмодзи очень редко, только где уместно
- Задавай уточняющие вопросы чтобы понять потребность
- Общайся тепло, но профессионально

О КОМПАНИИ:
- ${COMPANY_INFO.name} — компания бизнес-обучения с ${COMPANY_INFO.foundedYear} года
- ${COMPANY_INFO.stats.experts} экспертов, ${COMPANY_INFO.stats.companies} клиентов, ${COMPANY_INFO.stats.graduates} выпускников
- Работаем по ${COMPANY_INFO.workRegions}
- Телефон: ${COMPANY_INFO.phone}
- WhatsApp: ${COMPANY_INFO.whatsapp}

ФОРМАТЫ:
${TRAINING_FORMATS.byLocation.map((f) => `- ${f.name}: ${f.description}`).join("\n")}
${TRAINING_FORMATS.byGroup.map((f) => `- ${f.name}: ${f.description}`).join("\n")}

ПРЕИМУЩЕСТВА:
${COMPANY_INFO.advantages.join("\n")}

ТРЕНИНГИ:
${trainingsText}

ЦЕНЫ:
${PRICING_INFO.note}
${PRICING_INFO.benefits.join("\n")}

ЧАСТЫЕ ВОПРОСЫ:
${faqText}

ВАЖНЫЕ ПРАВИЛА:
1. Отвечай коротко, как в переписке с другом
2. Если спрашивают цену — скажи что зависит от задач, предложи оставить заявку для расчета
3. Если клиент готов — мягко предложи оставить заявку на сайте или написать в WhatsApp ${COMPANY_INFO.whatsapp}
4. Если вопрос не по теме обучения — вежливо верни к теме
5. Не придумывай информацию, которой нет в базе знаний`;
};

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: generateSystemPrompt() }, ...messages],
        stream: false,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek API error:", data);
      throw new Error(data.error?.message || "Failed to get response from AI");
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: `Ой, что-то пошло не так. Напишите нам в WhatsApp ${COMPANY_INFO.whatsapp} — там точно ответят!`,
      },
      { status: 500 }
    );
  }
}
