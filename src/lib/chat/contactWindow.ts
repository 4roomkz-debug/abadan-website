// Когда Индира реально сможет связаться с клиентом. Асем раньше обещала
// «в ближайшее время» и «в течение дня» даже в субботу ночью (Гани 12.10.2026).
// Казахстан с 01.03.2024 живёт в UTC+5 круглый год — считаем сдвигом, без
// зависимости от версии tzdata на сервере.

const ALMATY_OFFSET_MS = 5 * 60 * 60 * 1000;
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
// Позже этого часа в тот же день уже не обещаем.
const LAST_PROMISE_HOUR = 17;

// Государственные праздники РК с фиксированной датой (ММ-ДД). Курбан айт
// и переносы выходных сюда не входят: в такие дни Асем пообещает рабочий день,
// это лучше, чем пообещать субботу.
const HOLIDAYS = new Set([
  "01-01", "01-02", "03-08", "03-21", "03-22", "03-23",
  "05-01", "05-07", "05-09", "07-06", "08-30", "10-25", "12-16",
]);

const WEEKDAY_NAMES = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
// «в понедельник», «во вторник», «в среду»…
const WEEKDAY_ACCUSATIVE = ["в воскресенье", "в понедельник", "во вторник", "в среду", "в четверг", "в пятницу", "в субботу"];

export type ContactWindow = {
  /** «понедельник, 10:31» — сейчас по Алматы */
  now: string;
  /** «сегодня до 18:00», «завтра утром», «в понедельник утром» */
  promise: string;
};

/** Дата «по Алматы», упакованная в UTC-поля — дальше работаем через getUTC*. */
function almatyClock(date: Date): Date {
  return new Date(date.getTime() + ALMATY_OFFSET_MS);
}

function dayKey(day: Date): string {
  return `${String(day.getUTCMonth() + 1).padStart(2, "0")}-${String(day.getUTCDate()).padStart(2, "0")}`;
}

function isWeekend(day: Date): boolean {
  const weekday = day.getUTCDay();
  return weekday === 0 || weekday === 6;
}

/** Праздник выпал на субботу/воскресенье — выходным становится следующий
 *  рабочий день (ТК РК): 25.10.2026 — воскресенье, значит 26.10 не работаем.
 *  Идём вперёд от трёх недель назад и копим такие праздники. */
function isWorkingDay(day: Date): boolean {
  const probe = new Date(day.getTime());
  probe.setUTCDate(probe.getUTCDate() - 21);
  let pending = 0;
  let working = false;
  while (probe.getTime() <= day.getTime()) {
    const holiday = HOLIDAYS.has(dayKey(probe));
    if (isWeekend(probe)) {
      if (holiday) pending++;
      working = false;
    } else if (holiday) {
      working = false;
    } else if (pending > 0) {
      pending--;
      working = false;
    } else {
      working = true;
    }
    probe.setUTCDate(probe.getUTCDate() + 1);
  }
  return working;
}

export function contactWindow(date: Date = new Date()): ContactWindow {
  const local = almatyClock(date);
  const hour = local.getUTCHours();
  const minutes = String(local.getUTCMinutes()).padStart(2, "0");
  const now = `${WEEKDAY_NAMES[local.getUTCDay()]}, ${hour}:${minutes}`;

  if (isWorkingDay(local)) {
    if (hour < WORK_START_HOUR) return { now, promise: `сегодня после ${WORK_START_HOUR}:00` };
    if (hour < LAST_PROMISE_HOUR) return { now, promise: `сегодня до ${WORK_END_HOUR}:00` };
  }

  // Следующий рабочий день: максимум ~2 недели вперёд даже с праздниками подряд.
  const next = new Date(local.getTime());
  for (let i = 1; i <= 14; i++) {
    next.setUTCDate(next.getUTCDate() + 1);
    if (isWorkingDay(next)) {
      const promise = i === 1
        ? "завтра утром"
        : i <= 6
          ? `${WEEKDAY_ACCUSATIVE[next.getUTCDay()]} утром`
          : `${next.getUTCDate()}.${String(next.getUTCMonth() + 1).padStart(2, "0")} утром`;
      return { now, promise };
    }
  }
  return { now, promise: "в ближайший рабочий день" };
}
