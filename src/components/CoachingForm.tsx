"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitContactForm } from "@/lib/contactForm";

// Заявка на диагностический звонок со страницы /coaching.
export default function CoachingForm() {
  const t = useTranslations("coaching");
  const locale = useLocale();
  const [loadedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      await submitContactForm({
        name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"), website: fd.get("website"),
        message: `[Коучинг первых руководителей]\nДолжность: ${fd.get("position") || "—"}\nКомпания: ${fd.get("company") || "—"}`,
        locale, _elapsed: Date.now() - loadedAt,
      });
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="paper-box" role="status">
        <p className="sched-form-title">{t("form.successTitle")}</p>
        <p className="paper-lead">{t("form.successText")}</p>
      </div>
    );
  }

  return (
    <form className="paper-box co-form" onSubmit={submit}>
      <label className="sched-field"><span>{t("form.name")}</span><input name="name" required autoComplete="name" className="paper-input" /></label>
      <label className="sched-field"><span>{t("form.phone")}</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+7 7__ ___ __ __" className="paper-input" /></label>
      <label className="sched-field co-wide"><span>{t("form.email")}</span><input name="email" type="email" required autoComplete="email" className="paper-input" /></label>
      <label className="sched-field"><span>{t("form.position")}</span><input name="position" autoComplete="organization-title" className="paper-input" /></label>
      <label className="sched-field"><span>{t("form.company")}</span><input name="company" autoComplete="organization" className="paper-input" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sched-hp" />
      <button type="submit" className="story-btn story-btn-primary co-wide" disabled={state === "sending"}>
        {state === "sending" ? t("form.submitting") : t("form.submit")}
      </button>
      {state === "error" && <p className="sched-error co-wide" role="alert">{t("form.error")}</p>}
    </form>
  );
}
