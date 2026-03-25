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

    const { name, phone, email, message } = await request.json();

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
