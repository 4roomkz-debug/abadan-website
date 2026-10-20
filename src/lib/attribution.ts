/**
 * Откуда человек пришёл на сайт — чтобы у каждой заявки был источник.
 *
 * Сервер подсчёта кликов дописывает к ссылкам на abadan.kz параметры
 * utm_source/utm_campaign/utm_content (content — номер получателя). Здесь мы
 * запоминаем их на 30 дней в cookie, а /api/contact и /api/chat прикладывают
 * их к заявке. До 13.10.2026 связь «письмо → заявка» обрывалась на клике.
 *
 * С 20.10.2026 источник пишется и без utm — по сайту, с которого пришёл
 * посетитель (google, yandex, instagram, chatgpt…), или «direct». До этого
 * метка была у 1 заявки из 156: подписывались только переходы из ChatGPT,
 * который сам дописывает utm_source=chatgpt.com.
 */
export const ATTRIBUTION_COOKIE = "abadan_attr";
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const SAFE_VALUE = /^[A-Za-z0-9._-]{1,100}$/;
const SAFE_LANDING = /^\/[A-Za-z0-9/._~%-]{0,200}$/;

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landed_at?: string;
  landing?: string;
};

// Сайт-источник → короткое имя и тип канала. Поисковики — organic,
// ИИ-ассистенты — ai, остальное — referral.
const KNOWN_SOURCES: Array<[RegExp, string, string]> = [
  [/(^|\.)google\./, "google", "organic"],
  [/(^|\.)(yandex\.|ya\.ru$)/, "yandex", "organic"],
  [/(^|\.)bing\.com$/, "bing", "organic"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "chatgpt.com", "ai"],
  [/(^|\.)perplexity\.ai$/, "perplexity", "ai"],
  [/(^|\.)claude\.ai$/, "claude", "ai"],
  [/(^|\.)instagram\.com$/, "instagram", "social"],
  [/(^|\.)(facebook\.com|fb\.com)$/, "facebook", "social"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin", "social"],
  [/(^|\.)(t\.me|telegram\.org)$/, "telegram", "social"],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, "whatsapp", "social"],
  [/(^|\.)2gis\./, "2gis", "maps"],
];

function referrerHost(referrer: string): string {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isOwnHost(host: string, ownHost: string): boolean {
  const own = ownHost.toLowerCase().replace(/^www\./, "");
  return host === own || host.endsWith("." + own);
}

function sourceFromHost(host: string): { source: string; medium: string } | null {
  // Gemini живёт на google.com — проверяем ИИ раньше поисковиков
  if (host === "gemini.google.com") return { source: "gemini", medium: "ai" };
  for (const [re, source, medium] of KNOWN_SOURCES) {
    if (re.test(host)) return { source, medium };
  }
  const bare = host.replace(/^www\./, "");
  return SAFE_VALUE.test(bare) ? { source: bare, medium: "referral" } : null;
}

function safeLanding(pathname: string): string | undefined {
  const path = (pathname || "/").slice(0, 200);
  return SAFE_LANDING.test(path) ? path : undefined;
}

/**
 * Решить, что записать в cookie. Чистая функция — вся логика здесь.
 *
 * - utm в ссылке → пишем всегда (последнее касание, письма и реклама);
 * - пришёл с другого сайта → пишем, если метки нет или прежняя тоже была
 *   «по сайту» с другим источником. Метку письма переход из Google не стирает;
 * - прямой заход → только если метки нет совсем.
 * null — ничего не менять.
 */
export function resolveAttribution(
  search: string,
  referrer: string,
  ownHost: string,
  pathname: string,
  existing: Attribution | undefined,
  now: Date,
): Attribution | null {
  const params = new URLSearchParams(search);
  const fromUrl: Attribution = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value && SAFE_VALUE.test(value)) fromUrl[key] = value;
  }
  const base = { landed_at: now.toISOString(), landing: safeLanding(pathname) };
  if (fromUrl.utm_source) return { ...fromUrl, ...base };

  const organicMediums = ["organic", "ai", "social", "maps", "referral", "direct"];
  const existingIsOrganic = !!existing && organicMediums.includes(existing.utm_medium ?? "") && !existing.utm_campaign;

  const host = referrerHost(referrer);
  if (host && isOwnHost(host, ownHost)) return null; // переход внутри сайта

  const ref = host ? sourceFromHost(host) : null;
  if (ref) {
    if (!existing || (existingIsOrganic && existing.utm_source !== ref.source)) {
      return { utm_source: ref.source, utm_medium: ref.medium, ...base };
    }
    return null;
  }
  return existing ? null : { utm_source: "direct", utm_medium: "direct", ...base };
}

/** Записать источник визита в cookie. Вызывается при входе на любую страницу. */
export function captureAttributionFromUrl(): void {
  if (typeof window === "undefined") return;
  const existing = parseAttributionCookie(document.cookie);
  const attr = resolveAttribution(
    window.location.search,
    document.referrer,
    window.location.hostname,
    window.location.pathname,
    existing,
    new Date(),
  );
  if (!attr) return;
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
    if (typeof source.landing === "string" && SAFE_LANDING.test(source.landing)) {
      attr.landing = source.landing;
    }
    return attr.utm_source ? attr : undefined;
  } catch {
    return undefined;
  }
}
