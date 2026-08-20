import { NextResponse } from "next/server";

/** Подпись источника в общем чате заявок. */
const SOURCE = "abadan.kz";

/**
 * Единый приёмник заявок — вебхук sales-бота: воронка + уведомление в чат
 * ботом заявок + синхронизация в nomad-crm. Если переменные не заданы,
 * работает прежний путь: прямой Telegram + прямой CRM-вебхук.
 */
const LEADS_WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const LEADS_WEBHOOK_SECRET = process.env.LEADS_WEBHOOK_SECRET;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
const CRM_WEBHOOK_SECRET = process.env.CRM_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { name, phone, email, message, website: honeypot, _elapsed: elapsedMs } = await request.json();

    // Anti-spam: honeypot field (bots fill it, humans don't see it)
    if (honeypot) {
      // Silently accept but don't process — bot won't know it failed
      return NextResponse.json({ success: true });
    }

    // Anti-spam: форма должна быть открыта хотя бы 3 секунды.
    // Клиент присылает именно длительность (_elapsed), а не абсолютную метку:
    // раньше сравнивались часы браузера и сервера, и у посетителя со сбитыми
    // часами заявка молча отбрасывалась при «Заявка принята» на экране.
    // Отрицательное значение (часы перевели между открытием и отправкой)
    // не считаем признаком бота.
    if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 3000) {
      console.warn(`Contact form rejected: submitted in ${elapsedMs}ms`);
      return NextResponse.json({ success: true });
    }

    // Anti-spam: basic validation
    const nameClean = (name || "").trim();
    const phoneClean = (phone || "").trim();
    const emailClean = (email || "").trim();

    // Имя: только буквы (кириллица с казахскими, латиница), пробелы, дефисы
    // и апострофы, минимум две буквы подряд. Проверяем состав символов, а не
    // число слов: «Aibek» одним словом латиницей — обычное имя, прежнее
    // правило (кириллица ИЛИ два латинских слова) отбрасывало такие заявки.
    const looksLikeName =
      /^\p{L}[\p{L}\s'’.-]*$/u.test(nameClean) && /\p{L}{2}/u.test(nameClean);
    if (!looksLikeName || nameClean.length > 100) {
      console.warn(`Contact form rejected: name "${nameClean}"`);
      return NextResponse.json({ success: true }); // silent reject
    }

    // Phone must look like a real phone number (7+ digits)
    const digitsOnly = phoneClean.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      console.warn(`Contact form rejected: phone "${phoneClean}"`);
      return NextResponse.json({ success: true }); // silent reject
    }

    // --- Единый приёмник (если настроен) ---
    if (LEADS_WEBHOOK_URL && LEADS_WEBHOOK_SECRET) {
      try {
        const wh = await fetch(`${LEADS_WEBHOOK_URL}/api/webhook/lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Secret": LEADS_WEBHOOK_SECRET,
          },
          body: JSON.stringify({
            source: SOURCE,
            name: nameClean,
            phone: phoneClean,
            email: emailClean || undefined,
            message: message || undefined,
            form_data: { raw_message: message },
          }),
        });
        if (!wh.ok) {
          const detail = await wh.text().catch(() => "");
          console.error("[contact] единый приёмник не принял заявку:", wh.status, detail.slice(0, 300));
          return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
        }
        // Приёмник сам уведомляет чат и синхронизирует в CRM — локальные
        // отправки ниже не выполняем, иначе будут дубли.
        return NextResponse.json({ success: true });
      } catch (err) {
        console.error("[contact] единый приёмник недоступен:", err);
        return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
      }
    }

    const text = `
🔔 Новая заявка с сайта Abadan

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || "Не указан"}
💬 Комментарий: ${message || "Не указан"}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", data);
      throw new Error(data.description || "Failed to send message to Telegram");
    }

    // Отправка в Nomad CRM (await, чтобы Vercel serverless не убила запрос)
    const crmUrl = process.env.CRM_WEBHOOK_URL;
    const crmSecret = process.env.CRM_WEBHOOK_SECRET;
    if (crmUrl && crmSecret) {
      try {
        await fetch(crmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email: email || undefined,
            comment: message || undefined,
            source: "website",
            secret: crmSecret,
          }),
        });
      } catch (err) {
        console.error("CRM webhook error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
