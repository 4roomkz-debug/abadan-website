/**
 * Разбор диалога чата «Асем»: поиск контакта и текст диалога для лида.
 *
 * До 14.09.2026 в лид уходили три последние реплики клиента («От 20 /
 * Очно атырау / номер»), и о чём он спрашивал раньше, узнать было неоткуда —
 * теперь в лид идёт весь диалог. Тот же модуль с тестами живёт в
 * ibirai-landing (src/lib/chat/transcript.ts) — правки держать в обоих.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Id разговора, который генерирует виджет; формат сверяется и в sales-боте. */
export const SESSION_ID_RE = /^[A-Za-z0-9-]{8,64}$/;

const digitsOnly = (s: string) => s.replace(/\D/g, "");

// Казахстанский номер: обязательный префикс +7/7/8 и ровно 10 цифр после
// него. Границы не дают принять дату, ID заказа или другую длинную
// цифровую последовательность за телефон.
const PHONE_RE =
  /(?<!\d)(?:\+?7|8)[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}(?!\d)/g;

// «я» — только отдельным словом и только перед словом с заглавной. Раньше
// «для оптимизации процессов» давало имя «оптимизации» (лид #149).
// Буквы перечислены явно (с казахскими) — так же, как в ibirai-landing,
// где флаг `u` недоступен из-за target ES5.
const LETTERS = "A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі";
const NAME_PATTERNS = [
  new RegExp(`меня зовут\\s+([${LETTERS}]+)`, "i"),
  new RegExp(`(?<![${LETTERS}])[Яя]\\s+([А-ЯЁ][а-яё]+)(?=[\\s,.!?]|$)`),
  new RegExp(`(?<![${LETTERS}])имя[:\\s]+([${LETTERS}]+)`, "i"),
];

export type ExtractedContact =
  | { hasContact: false }
  | { hasContact: true; phone: string; name: string | null };

/**
 * Контакт ищем ТОЛЬКО в репликах пользователя: реплики ассистента содержат
 * имя бота («Я Асем…») и телефон компании — раньше регэксы цепляли их и слали
 * ложные лиды. Телефон засчитывается только в ПОСЛЕДНЕЙ реплике — иначе лид
 * перевыпускался бы на каждом сообщении, пока номер висит в истории.
 */
export function extractContactInfo(
  messages: ChatMessage[],
  opts: { botName: string; companyPhoneDigits: string }
): ExtractedContact {
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length === 0) return { hasContact: false };

  const last = userMessages[userMessages.length - 1].content;
  const phoneMatch = last.match(PHONE_RE);
  if (!phoneMatch) return { hasContact: false };

  const phone = phoneMatch[phoneMatch.length - 1];
  // Номер самой компании — цитата нашего, а не контакт собеседника.
  if (digitsOnly(phone).slice(-10) === opts.companyPhoneDigits.slice(-10)) {
    return { hasContact: false };
  }

  // Имя может быть в любом сообщении пользователя (часто представляется раньше).
  const userText = userMessages.map((m) => m.content).join(" ");
  let name: string | null = null;
  for (const pattern of NAME_PATTERNS) {
    const m = userText.match(pattern);
    if (!m) continue;
    if (m[1].toLowerCase() === opts.botName.toLowerCase()) continue; // «я Асем» — не лид
    name = m[1];
    break;
  }

  return { hasContact: true, phone, name };
}

/**
 * Диалог текстом «Клиент: … / Асем: …». Приветствие виджета до первой
 * реплики клиента выкидываем — оно одинаковое у всех.
 */
export function formatTranscript(messages: ChatMessage[], botName: string): string {
  const firstUser = messages.findIndex((m) => m.role === "user");
  if (firstUser === -1) return "";
  return messages
    .slice(firstUser)
    .map((m) => `${m.role === "user" ? "Клиент" : botName}: ${m.content.trim()}`)
    .join("\n");
}

/** Укоротить текст, сохранив начало (задача клиента) и конец (контакт). */
export function clipMiddle(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const marker = "\n… середина диалога обрезана …\n";
  const room = Math.max(limit - marker.length, 0);
  const head = Math.floor((room * 2) / 5);
  const tail = room - head;
  return text.slice(0, head) + marker + (tail ? text.slice(-tail) : "");
}
