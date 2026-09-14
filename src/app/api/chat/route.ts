import { NextResponse, after } from "next/server";
import {
  AI_PERSONA,
  COMPANY_INFO,
  TRAININGS,
  FAQ,
  EVENTS,
} from "@/data/ai-knowledge";
import {
  isUnifiedLeadWebhookConfigured,
  saveChatSession,
  sendUnifiedLead,
} from "@/lib/server/leadWebhook";
import {
  SESSION_ID_RE,
  clipMiddle,
  extractContactInfo,
  formatTranscript,
  type ChatMessage,
} from "@/lib/chat/transcript";

// На Vercel переменная называется DEEPSEEK_API; локально/исторически встречается DEEPSEEK_API_KEY.
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API ?? process.env.DEEPSEEK_API_KEY ?? "";
// Единственный источник имени модели. 24.07.2026 провайдер снял алиас
// `deepseek-chat`, поддерживаются только `deepseek-v4-flash` и `deepseek-v4-pro`.
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const CHAT_SOURCE = "abadan.kz — чат Асем";
const COMPANY_PHONE_DIGITS = COMPANY_INFO.phone.replace(/\D/g, "");

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

// Резервная отправка в Telegram, если единый приёмник не настроен или не ответил.
async function sendLeadToTelegram(leadInfo: string) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      // Лимит Telegram — 4096 символов; весь диалог может быть длиннее.
      text: clipMiddle(`🤖 Заявка из чата с Асем\n\n${leadInfo}`, 3900),
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Telegram returned ${response.status}: ${detail.slice(0, 300)}`);
  }
}

async function sendChatLead(input: {
  name: string;
  phone: string;
  context: string;
  sessionId: string | null;
}) {
  if (isUnifiedLeadWebhookConfigured()) {
    try {
      await sendUnifiedLead({
        source: CHAT_SOURCE,
        name: input.name,
        phone: input.phone,
        message: input.context,
        form_data: {
          channel: "asem_chat",
          raw_message: input.context,
          session_id: input.sessionId ?? undefined,
        },
      });
      return;
    } catch (err) {
      // Приёмник на Railway бывает недоступен десятки секунд. Раньше исключение
      // роняло весь ответ чата: клиент только что оставил номер и видел «Упс».
      console.error("[chat] единый приёмник не принял лид, шлём напрямую в Telegram:", err);
    }
  } else {
    console.warn("[chat] Unified lead webhook is not configured; using Telegram fallback");
  }

  await sendLeadToTelegram(
    `👤 Имя: ${input.name}\n📞 Телефон: ${input.phone}\n\n💬 Диалог:\n${input.context}`
  );
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

    // 3. Валидация — ограничиваем размер диалога и каждого сообщения,
    // чтобы один запрос не мог отправить в DeepSeek килобайты текста.
    if (!isValidMessages(body?.messages)) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const messages: ChatMessage[] = body.messages;
    const sessionId =
      typeof body?.sessionId === "string" && SESSION_ID_RE.test(body.sessionId)
        ? body.sessionId
        : null;

    // 4. Весь диалог — в sales-бот, после того как ответ ушёл клиенту. Раньше
    // разговор жил только во вкладке браузера. `after` читает reply в момент
    // выполнения, поэтому в базу попадает и последняя реплика Асем.
    let reply: string | null = null;
    if (sessionId && isUnifiedLeadWebhookConfigured()) {
      after(async () => {
        const transcript: ChatMessage[] = reply
          ? [...messages, { role: "assistant", content: reply }]
          : messages;
        try {
          await saveChatSession({ session_id: sessionId, source: CHAT_SOURCE, messages: transcript });
        } catch (err) {
          console.error("[chat] диалог не сохранён:", err);
        }
      });
    }

    // 5. Номер в последнем сообщении → лид со всем диалогом, а не с тремя
    // последними репликами (лид #151: «От 20 / Очно атырау / номер»).
    const contactInfo = extractContactInfo(messages, {
      botName: AI_PERSONA.name,
      companyPhoneDigits: COMPANY_PHONE_DIGITS,
    });
    if (contactInfo.hasContact) {
      try {
        await sendChatLead({
          name: contactInfo.name ?? "Не указано",
          phone: contactInfo.phone,
          context: formatTranscript(messages, AI_PERSONA.name),
          sessionId,
        });
      } catch (err) {
        // Последний след лида, если не сработал ни один путь доставки.
        console.error("[chat] лид не доставлен:", contactInfo.phone, err);
      }
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

    reply = data.choices[0].message.content as string;
    return NextResponse.json({ message: reply });
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
