import { NextResponse } from "next/server";

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

    const { name, phone, email, message, website: honeypot, _t: timestamp } = await request.json();

    // Anti-spam: honeypot field (bots fill it, humans don't see it)
    if (honeypot) {
      // Silently accept but don't process — bot won't know it failed
      return NextResponse.json({ success: true });
    }

    // Anti-spam: timestamp check — form must be open at least 3 seconds
    if (timestamp && Date.now() - timestamp < 3000) {
      return NextResponse.json({ success: true });
    }

    // Anti-spam: basic validation
    const nameClean = (name || "").trim();
    const phoneClean = (phone || "").trim();
    const emailClean = (email || "").trim();

    // Name must contain at least one space or Cyrillic letter (real names, not random strings)
    const hasRealName = /[а-яёА-ЯЁ]/.test(nameClean) || /^[a-zA-Z]+ [a-zA-Z]+/.test(nameClean);
    if (!hasRealName || nameClean.length < 2 || nameClean.length > 100) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Phone must look like a real phone number (7+ digits)
    const digitsOnly = phoneClean.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return NextResponse.json({ success: true }); // silent reject
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
