import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8351809456:AAF8OsK251bpvwNl60NOZZ0Np9fXRr7yQPY";
const TELEGRAM_CHAT_ID = "251499578";

export async function POST(request: Request) {
  try {
    const { name, company, phone, email, message } = await request.json();

    const text = `
🔔 *Новая заявка с сайта Abadan*

👤 *Имя:* ${name}
🏢 *Компания:* ${company}
📞 *Телефон:* ${phone}
📧 *Email:* ${email || "Не указан"}
💬 *Сообщение:* ${message || "Не указано"}
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
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
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
