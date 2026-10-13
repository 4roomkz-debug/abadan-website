/**
 * Метка письма, с которого человек пришёл на сайт.
 *
 * Сервер подсчёта кликов дописывает к ссылкам на abadan.kz параметры
 * utm_source/utm_campaign/utm_content (content — номер получателя). Здесь мы
 * запоминаем их на 30 дней в cookie, а /api/contact и /api/chat прикладывают
 * их к заявке. До 13.10.2026 связь «письмо → заявка» обрывалась на клике.
 */
export const ATTRIBUTION_COOKIE = "abadan_attr";
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const SAFE_VALUE = /^[A-Za-z0-9._-]{1,100}$/;

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landed_at?: string;
};

/** Последнее касание: новый переход из письма перезаписывает прежний. */
export function captureAttributionFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const attr: Attribution = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value && SAFE_VALUE.test(value)) attr[key] = value;
  }
  if (!attr.utm_source) return;
  attr.landed_at = new Date().toISOString();
  document.cookie =
    `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attr))}` +
    `; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

/** Разбор cookie на сервере. Чужие и испорченные значения отбрасываются. */
export function parseAttributionCookie(cookieHeader: string | null): Attribution | undefined {
  if (!cookieHeader) return undefined;
  const raw = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ATTRIBUTION_COOKIE}=`));
  if (!raw) return undefined;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw.slice(ATTRIBUTION_COOKIE.length + 1)));
    if (!parsed || typeof parsed !== "object") return undefined;
    const source = parsed as Record<string, unknown>;
    const attr: Attribution = {};
    for (const key of KEYS) {
      const value = source[key];
      if (typeof value === "string" && SAFE_VALUE.test(value)) attr[key] = value;
    }
    if (typeof source.landed_at === "string" && !Number.isNaN(Date.parse(source.landed_at))) {
      attr.landed_at = source.landed_at;
    }
    return attr.utm_source ? attr : undefined;
  } catch {
    return undefined;
  }
}
