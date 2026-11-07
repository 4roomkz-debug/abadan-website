"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { ScheduleItem } from "@/data/schedule";
import { localizeCourse } from "@/data/schedule-i18n";
import { submitContactForm } from "@/lib/contactForm";

// Запись на курс прямо под строкой расписания (/schedule и страницы направлений).
// Подписи — messages/*/schedule.json → form.
export default function CourseSignUp({ course, onDone, source }: { course: ScheduleItem; onDone: () => void; source?: string }) {
  const t = useTranslations("schedule.form");
  const locale = useLocale();
  const [loadedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      // В Telegram уходит русское название: команда ищет курс по нему.
      await submitContactForm({
        name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"), website: fd.get("website"),
        message: `🎓 Запись на курс: ${course.name} (${course.date})\n👥 Участников: ${fd.get("participants")}${source ? `\n📄 Страница: ${source}` : ""}`,
        locale, _elapsed: Date.now() - loadedAt,
      });
      setState("sent");
      setTimeout(onDone, 4000);
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="sched-form" role="status">
        <p className="sched-form-title">{t("successTitle")}</p>
        <p className="paper-lead">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form className="sched-form" onSubmit={submit}>
      <p className="sched-form-title">{t("title")}: {localizeCourse(course.name, locale)}</p>
      <div className="sched-form-grid">
        <label className="sched-field"><span>{t("name")}</span><input name="name" required autoComplete="name" className="paper-input" /></label>
        <label className="sched-field"><span>{t("phone")}</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+7 7__ ___ __ __" className="paper-input" /></label>
        <label className="sched-field"><span>{t("email")}</span><input name="email" type="email" required autoComplete="email" className="paper-input" /></label>
        <label className="sched-field"><span>{t("participants")}</span>
          <select name="participants" defaultValue="1" className="paper-input">
            {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            <option value="10+">{t("participantsMore")}</option>
          </select>
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sched-hp" />
        <button type="submit" className="story-btn story-btn-primary" disabled={state === "sending"}>
          {state === "sending" ? t("submitting") : t("submit")}
        </button>
      </div>
      {state === "error" && <p className="sched-error" role="alert">{t("error")}</p>}
    </form>
  );
}
