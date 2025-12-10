import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8351809456:AAF8OsK251bpvwNl60NOZZ0Np9fXRr7yQPY";
const TELEGRAM_CHAT_ID = "251499578";

export async function POST(request: Request) {
  try {
    const { name, company, phone, email, message } = await request.json();

    // Экранируем специальные символы Markdown
    const escapeMarkdown = (text: string) => {
      if (!text) return "";
      return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
    };

    const text = `
🔔 Новая заявка с сайта Abadan

👤 Имя: ${escapeMarkdown(name)}
🏢 Компания: ${escapeMarkdown(company)}
📞 Телефон: ${escapeMarkdown(phone)}
📧 Email: ${escapeMarkdown(email) || "Не указан"}
💬 Сообщение: ${escapeMarkdown(message) || "Не указано"}
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
