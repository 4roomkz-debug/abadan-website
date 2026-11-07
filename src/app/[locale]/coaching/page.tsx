import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoachingForm from "@/components/CoachingForm";

type Item = { t: string; d: string };

// Коучинг первых руководителей в бумажном мире главной. Стоковое видео героя
// убрано (PRODUCT.md: «подлежит замене»), на его месте — сам коуч. Факты о Гани —
// из canon.json; «освобождаете 20–30% времени» и «окупается за месяц» сняты:
// источника нет.
export default function CoachingPage() {
  const t = useTranslations("coaching");
  const tr = useTranslations("training");

  return (
    <>
      <Header />
      <main>
        <section className="paper-section tr-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto co-hero">
            <div>
              <nav className="tr-crumbs" aria-label="breadcrumbs">
                <Link href="/">{tr("home")}</Link><span aria-hidden="true">/</span>
                <span aria-current="page">{t("crumb")}</span>
              </nav>
              <h1 className="sched-title co-title">{t("title")}</h1>
              <p className="paper-lead tr-lead">{t("lead")}</p>
              <ul className="tr-facts">
                {(t.raw("facts") as string[]).map((x) => <li key={x}>{x}</li>)}
              </ul>
              <div className="story-actions">
                <a href="#form" className="story-btn story-btn-primary">{t("cta")}</a>
              </div>
            </div>
            <Image src="/images/founder.jpg" alt={t("coachPhotoAlt")} width={640} height={853} sizes="(max-width: 900px) 70vw, 30vw" className="co-hero-photo" priority />
          </div></div>
        </section>

        <section className="paper-section paper-section-tight" aria-labelledby="traps-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="traps-title" className="paper-display">{t("trapsTitle")}</h2>
            <ul className="co-traps">
              {(t.raw("traps") as { t: string; q: string; d: string }[]).map((x) => (
                <li key={x.t}>
                  <h3>{x.t}</h3>
                  <p className="co-trap-q">«{x.q}»</p>
                  <p>{x.d}</p>
                </li>
              ))}
            </ul>
            <p className="co-note">{t("trapsNote")}</p>
          </div></div>
        </section>

        <section className="paper-section" aria-labelledby="results-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="results-title" className="paper-display">{t("resultsTitle")}</h2>
            <ul className="co-results">
              {(t.raw("results") as string[]).map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div></div>
        </section>

        <section className="paper-section" aria-labelledby="sessions-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <div className="paper-head">
              <h2 id="sessions-title" className="paper-display">{t("sessionsTitle")}</h2>
              <p className="paper-note">{t("sessionsLead")}</p>
            </div>
            <ol className="co-sessions">
              {(t.raw("sessions") as (Item & { r: string })[]).map((s, i) => (
                <li key={s.t}>
                  <span className="co-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                    <p className="co-res"><b>{t("resultLabel")}:</b> {s.r}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div></div>
        </section>

        <section className="paper-section paper-section-tight" aria-labelledby="method-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="method-title" className="paper-display">{t("methodTitle")}</h2>
            <ul className="ab-formats">
              {(t.raw("method") as Item[]).map((m) => <li key={m.t}><h3>{m.t}</h3><p>{m.d}</p></li>)}
            </ul>
          </div></div>
        </section>

        <section className="paper-section" aria-labelledby="coach-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="coach-title" className="paper-display">{t("coachTitle")}</h2>
            <p className="paper-note co-role">{t("coachRole")}</p>
            <div className="co-coach">
              <ul className="co-results co-facts">
                {(t.raw("coachFacts") as string[]).map((x) => <li key={x}>{x}</li>)}
              </ul>
              <blockquote className="ab-quote co-quote">«{t("coachQuote")}»</blockquote>
            </div>
          </div></div>
        </section>

        <section className="paper-section paper-section-tight" aria-labelledby="steps-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="steps-title" className="paper-display">{t("stepsTitle")}</h2>
            <ol className="co-steps">
              {(t.raw("steps") as Item[]).map((s, i) => (
                <li key={s.t}><span className="co-num" aria-hidden="true">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
              ))}
            </ol>
          </div></div>
        </section>

        <section className="paper-section" aria-labelledby="faq-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="faq-title" className="paper-display">{t("faqTitle")}</h2>
            <div className="tr-faq">
              {(t.raw("faq") as { q: string; a: string }[]).map((x) => (
                <details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>
              ))}
            </div>
          </div></div>
        </section>

        <section id="form" className="paper-section" aria-labelledby="form-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto co-form-wrap">
            <div>
              <h2 id="form-title" className="paper-display">{t("formTitle")}</h2>
              <p className="paper-lead">{t("formLead")}</p>
              <p className="co-contacts">
                <a href="tel:+77019188838">+7 701 918-88-38</a>
                <a href="mailto:gani@abadan.kz">gani@abadan.kz</a>
              </p>
            </div>
            <CoachingForm />
          </div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
