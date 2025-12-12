import { NextResponse } from "next/server";

const DEEPSEEK_API_KEY = "sk-3be6a5b6de184338bd61b8d5f625e2a6";

const SYSTEM_PROMPT = `Ты — AI-консультант компании Abadan & Co. Твоя задача — помогать посетителям сайта узнать о наших услугах и мотивировать их оставить заявку.

О КОМПАНИИ:
- Abadan & Co. — компания бизнес-обучения, на рынке с 2015 года
- Основатель: Гани Абадан
- 200+ экспертов-тренеров
- 359 корпоративных клиентов
- 50,000+ обученных специалистов
- Работаем по всему Казахстану и СНГ

НАШИ УСЛУГИ:
1. Корпоративное обучение — закрытые тренинги для компаний
2. Открытые тренинги — от 2 человек
3. Индивидуальное наставничество
4. Онлайн-обучение (вебинары, дистанционные курсы)
5. Бизнес-туры за рубеж
6. Тимбилдинги

НАПРАВЛЕНИЯ ОБУЧЕНИЯ:
- Менеджмент и лидерство
- Продажи и переговоры
- HR и управление персоналом
- Финансы и бухгалтерия
- Производство и качество
- Soft skills (коммуникация, тайм-менеджмент)

НАШИ ПРЕИМУЩЕСТВА:
- 80% практики на реальных кейсах клиента
- Программа привязана к KPI компании
- Доводим до результата (ДЗ, проверка, Q&A)
- КП в день обращения
- Экономия до 50% при рамочном договоре
- Быстрый запуск за 3 дня

КОНТАКТЫ:
- Телефон: +7 702 241 33 88
- Email: i.islambek@abadan.kz
- WhatsApp: +7 702 241 33 88

ТВОЙ СТИЛЬ:
- Дружелюбный, профессиональный
- Отвечай кратко (2-4 предложения)
- Используй эмодзи умеренно
- Задавай уточняющие вопросы о потребностях клиента
- В конце каждого ответа мягко подводи к оставлению заявки
- Если клиент готов — предложи оставить заявку прямо на сайте (форма внизу страницы) или написать в WhatsApp

ВАЖНО: Ты консультант Abadan & Co., а не общий AI. Не обсуждай темы, не связанные с обучением и развитием персонала.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: false,
        max_tokens: 500,
        temperature: 0.7,
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
      { error: "Произошла ошибка. Попробуйте позже или свяжитесь с нами по телефону +7 702 241 33 88" },
      { status: 500 }
    );
  }
}
