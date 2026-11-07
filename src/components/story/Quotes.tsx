import { useLocale, useTranslations } from "next-intl";
import { TESTIMONIALS, signature, type TestimonialId } from "@/data/testimonials";
import { TESTIMONIALS_I18N } from "@/data/testimonials-i18n";

// Три дословные цитаты из благодарственных писем. Источник и правила —
// src/data/testimonials.ts; ничего не сокращаем и не «улучшаем».
const PICK: TestimonialId[] = ["pharma", "kbtu", "narxoz"];

export default function Quotes({ ids = PICK, title, note }: { ids?: TestimonialId[]; title?: string; note?: string } = {}) {
  const t = useTranslations("home.quotes");
  const locale = useLocale();

  return (
    <section className="paper-section" aria-labelledby="quotes-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
        <div className="paper-head">
          <h2 id="quotes-title" className="paper-display">{title ?? t("title")}</h2>
          <p className="paper-note">{note ?? t("note")}</p>
        </div>
        <ul className="quotes">
          {ids.map((id) => {
            const tr = locale === "kk" || locale === "en" ? TESTIMONIALS_I18N[locale][id] : undefined;
            const q = tr ?? TESTIMONIALS[id];
            return (
              <li key={id} className="quote">
                <blockquote>
                  <p className="quote-text">«{q.quote}»</p>
                  <footer className="quote-sig">
                    <span>{signature(q)}</span>
                    <span className="quote-training">{q.training}</span>
                    {tr && <span className="quote-translated">{t("translated")}</span>}
                  </footer>
                </blockquote>
              </li>
            );
          })}
        </ul>
      </div></div>
    </section>
  );
}
