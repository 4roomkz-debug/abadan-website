import { NextResponse } from "next/server";
import {
  AI_PERSONA,
  COMPANY_INFO,
  TRAINING_FORMATS,
  TRAININGS,
  PRICING_INFO,
  FAQ,
  EVENTS,
} from "@/data/ai-knowledge";

const DEEPSEEK_API_KEY = "sk-3be6a5b6de184338bd61b8d5f625e2a6";
const TELEGRAM_BOT_TOKEN = "8351809456:AAF8OsK251bpvwNl60NOZZ0Np9fXRr7yQPY";
const TELEGRAM_CHAT_ID = "-5032889199"; // Группа "Заявки Абадан"

// Отправка заявки в Telegram
async function sendLeadToTelegram(leadInfo: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `🤖 Заявка из чата с Асем\n\n${leadInfo}`,
      }),
    });
  } catch (error) {
    console.error("Failed to send lead to Telegram:", error);
  }
}

// Проверяем, есть ли в сообщении контактные данные
function extractContactInfo(messages: Array<{ role: string; content: string }>) {
  const allText = messages.map((m) => m.content).join(" ");

  // Ищем телефон (казахстанский формат)
  const phoneMatch = allText.match(/(\+?7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}/g);

  // Ищем имя (после "меня зовут", "я", "имя" и т.д.)
  const namePatterns = [
    /меня зовут\s+([А-Яа-яЁёA-Za-z]+)/i,
    /я\s+([А-Яа-яЁё][а-яё]+)\s/i,
    /имя[:\s]+([А-Яа-яЁёA-Za-z]+)/i,
  ];

  let name = null;
  for (const pattern of namePatterns) {
    const match = allText.match(pattern);
    if (match) {
      name = match[1];
      break;
    }
  }

  if (phoneMatch) {
    return {
      hasContact: true,
      phone: phoneMatch[phoneMatch.length - 1], // Берём последний найденный номер
      name: name || "Не указано",
    };
  }

  return { hasContact: false };
}

// Генерируем промпт на основе базы знаний
const generateSystemPrompt = () => {
  const trainingsText = TRAININGS.map(
    (cat) =>
      `${cat.category}: ${cat.programs.map((p) => p.name).join(", ")}`
  ).join("\n");

  const faqText = FAQ.map((f) => `В: ${f.question}\nО: ${f.answer}`).join("\n\n");

  return `Отвечай на таком же языке на котором к тебе обратились.

Ты ${AI_PERSONA.name} — ${AI_PERSONA.role} компании ${COMPANY_INFO.name}.

ТВОЯ ЛИЧНОСТЬ:
- Общайся максимально естественно, как живой человек
- В начале диалога НЕ используй длинные сообщения
- Добавляй юмор и аутентичность
- НЕ используй жирный шрифт, звездочки, нумерованные списки
- Пиши короткие сообщения (1-3 предложения)
- Можешь использовать эмодзи, но умеренно

СТРАТЕГИЯ ОБЩЕНИЯ:
- В первых сообщениях — расслабленный small talk
- Постепенно узнай, интересуется ли собеседник тренингами
- Если интересуется — узнай подробнее о задачах
- Если готов оставить контакт — попроси телефон, обещай что менеджер перезвонит

СБОР КОНТАКТОВ:
- Когда человек готов — попроси номер телефона
- Скажи что Индира перезвонит в течение дня
- После получения номера поблагодари и скажи что передал заявку

О КОМПАНИИ (используй если спросят):
- ${COMPANY_INFO.name} — бизнес-обучение с ${COMPANY_INFO.foundedYear} года
- ${COMPANY_INFO.stats.experts} экспертов, ${COMPANY_INFO.stats.companies} клиентов
- Работаем по ${COMPANY_INFO.workRegions}
- Телефон/WhatsApp: ${COMPANY_INFO.phone}

ТРЕНИНГИ (кратко):
${trainingsText}

ФОРМАТЫ: очно в Алматы, выезд по РК, онлайн, корпоративные и открытые группы от 2 чел.

ЦЕНЫ: зависят от программы, точный расчет после уточнения задач. Скидки при рамочном договоре.

FAQ:
${faqText}

БЛИЖАЙШЕЕ МЕРОПРИЯТИЕ — БИЗНЕС-ЗАВТРАК "AI В HR":
- Дата: ${EVENTS.businessBreakfastAiHr.date}, ${EVENTS.businessBreakfastAiHr.time}
- Место: ${EVENTS.businessBreakfastAiHr.location}
- Как добраться: ${EVENTS.businessBreakfastAiHr.howToGet}
- Стоимость: ${EVENTS.businessBreakfastAiHr.price}
- Мест: ${EVENTS.businessBreakfastAiHr.seats}
- Для кого: ${EVENTS.businessBreakfastAiHr.targetAudience.join(", ")}
- Спикеры: ${EVENTS.businessBreakfastAiHr.speakers.map(s => `${s.name} (${s.topic})`).join("; ")}
- Регистрация: ${EVENTS.businessBreakfastAiHr.registrationUrl}

Если спрашивают про AI в HR, про мероприятия, про бизнес-завтрак — активно рассказывай про это событие и предлагай зарегистрироваться!

ВАЖНО:
- Не будь навязчивым с продажами
- Сначала установи контакт, потом предлагай
- Если вопрос не по теме — можешь поболтать, но мягко возвращай к обучению`;
};

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Проверяем, есть ли новые контактные данные
    const contactInfo = extractContactInfo(messages);
    if (contactInfo.hasContact) {
      const lastUserMessages = messages
        .filter((m: { role: string }) => m.role === "user")
        .slice(-3)
        .map((m: { content: string }) => m.content)
        .join("\n");

      await sendLeadToTelegram(
        `👤 Имя: ${contactInfo.name}\n📞 Телефон: ${contactInfo.phone}\n\n💬 Контекст диалога:\n${lastUserMessages}`
      );
    }

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
        max_tokens: 250,
        temperature: 0.9,
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
        error: `Упс, что-то пошло не так 😅 Напиши в WhatsApp ${COMPANY_INFO.whatsapp} — там точно ответят!`,
      },
      { status: 500 }
    );
  }
}
