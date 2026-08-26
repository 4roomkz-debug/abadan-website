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

// На Vercel переменная называется DEEPSEEK_API; локально/исторически встречается DEEPSEEK_API_KEY.
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API ?? process.env.DEEPSEEK_API_KEY ?? "";
// Единственный источник имени модели. 24.07.2026 провайдер снял алиас
// `deepseek-chat`, поддерживаются только `deepseek-v4-flash` и `deepseek-v4-pro`.
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const digitsOnly = (s: string) => s.replace(/\D/g, "");
const COMPANY_PHONE_DIGITS = digitsOnly(COMPANY_INFO.phone);

// Лимиты входа. Защищают от запросов вида «10 000 сообщений в одном POST»,
// которые иначе сожгли бы баланс DeepSeek за один вызов.
const MAX_MESSAGES = 30;
const MAX_CONTENT_LEN = 2000;

// Rate limit в памяти инстанса. На Vercel serverless инстансы независимые,
// поэтому это best-effort. Для строгого лимита под нагрузкой — Upstash Redis.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipHits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > windowStart);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.every((t) => t < windowStart)) ipHits.delete(k);
    }
  }
  return true;
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// POST без Origin — почти всегда не-браузер (curl/бот). Принимаем только запросы
// со своего же домена; localhost оставлен для dev.
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get("host") ?? "";
    if (originHost === host) return true;
    if (originHost.startsWith("localhost")) return true;
    return false;
  } catch {
    return false;
  }
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessages(input: unknown): input is ChatMessage[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) return false;
  for (const m of input) {
    if (!m || typeof m !== "object") return false;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return false;
    if (typeof content !== "string" || content.length === 0 || content.length > MAX_CONTENT_LEN) return false;
  }
  return true;
}

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

// Проверяем, есть ли в сообщении контактные данные.
// ВАЖНО: ищем ТОЛЬКО в сообщениях пользователя. Реплики ассистента содержат
// имя бота («Я Асем…») и телефон компании из system prompt — раньше регэксы
// цепляли их и слали ложные лиды с данными бота вместо данных собеседника.
function extractContactInfo(messages: Array<{ role: string; content: string }>) {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return { hasContact: false };

  // Телефон засчитываем только в ПОСЛЕДНЕМ сообщении пользователя — это момент,
  // когда он действительно его поделился. Иначе лид перевыпускается на каждом
  // следующем сообщении, пока номер где-то висит в истории.
  const lastUserMessage = userMessages[userMessages.length - 1].content;
  const phoneRegex = /(\+?7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}/g;
  const phoneMatch = lastUserMessage.match(phoneRegex);
  if (!phoneMatch) return { hasContact: false };

  const phone = phoneMatch[phoneMatch.length - 1];
  // Игнорируем телефон самой компании — пользователь не делится своим контактом,
  // а цитирует наш номер (или вставил по ошибке). Сравниваем по последним 10 цифрам,
  // чтобы не зависеть от пробелов/+7/8.
  const phoneDigits = digitsOnly(phone);
  if (phoneDigits.slice(-10) === COMPANY_PHONE_DIGITS.slice(-10)) {
    return { hasContact: false };
  }

  // Имя может быть в любом сообщении пользователя (часто представляется раньше).
  const userText = userMessages.map((m) => m.content).join(" ");
  const namePatterns = [
    /меня зовут\s+([А-Яа-яЁёA-Za-z]+)/i,
    /я\s+([А-Яа-яЁё][а-яё]+)\s/i,
    /имя[:\s]+([А-Яа-яЁёA-Za-z]+)/i,
  ];

  const botName = AI_PERSONA.name.toLowerCase();
  let name: string | null = null;
  for (const pattern of namePatterns) {
    const match = userText.match(pattern);
    if (!match) continue;
    // Защита от имени бота: «я Асем», «меня зовут Асем» и т.п. — это явно не лид.
    if (match[1].toLowerCase() === botName) continue;
    name = match[1];
    break;
  }

  return {
    hasContact: true,
    phone,
    name: name || "Не указано",
  };
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
- Ты женщина. ВСЕГДА говори о себе в женском роде: «передала», «помогла», «рада», «готова», «уточнила», «думаю», «была» — никогда «передал/помог/рад/готов/уточнил/был».
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
    // 1. Принимаем только запросы с собственного домена (отсекает curl/боты с других сайтов).
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Rate limit по IP — гасит флуд с одного источника.
    const ip = getClientIp(request);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуй через минуту 🙏" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const messages = body?.messages;

    // 3. Валидация — ограничиваем размер диалога и каждого сообщения,
    // чтобы один запрос не мог отправить в DeepSeek килобайты текста.
    if (!isValidMessages(messages)) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

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
        model: DEEPSEEK_MODEL,
        messages: [{ role: "system", content: generateSystemPrompt() }, ...messages],
        stream: false,
        max_tokens: 250,
        temperature: 0.9,
        // У v4 рассуждение включено по умолчанию и съело бы весь бюджет
        // 250 токенов — ответ вернулся бы пустым.
        thinking: { type: "disabled" },
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
