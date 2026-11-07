import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ClientsStrip from "@/components/story/ClientsStrip";

type Item = { t: string; d: string };

// О компании в бумажном мире главной: заголовок и факты из canon.json, письмо
// основателя (его голос, дословно), что мы даём партнёрам, PGT, форматы, форма.
// Цифры — только канонические: с 2015 года, 360+ компаний, 50 000+, 200+.
export default function AboutPage() {
  const t = useTranslations("about");
  const tr = useTranslations("training");

  return (
    <>
      <Header />
      <main>
        <section className="paper-section tr-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <nav className="tr-crumbs" aria-label="breadcrumbs">
              <Link href="/">{tr("home")}</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{t("crumb")}</span>
            </nav>
            <h1 className="sched-title ab-title">{t("title")}</h1>
            <p className="paper-lead tr-lead">{t("lead")}</p>
            <ul className="tr-facts">
              {(t.raw("facts") as string[]).map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div></div>
        </section>

        <section className="paper-section ab-founder" aria-labelledby="founder-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto ab-founder-grid">
            <figure className="ab-photo">
              <Image src="/images/founder.jpg" alt={t("founder.photoAlt")} width={720} height={1080} sizes="(max-width: 900px) 100vw, 34vw" className="ab-photo-img" priority />
              <figcaption>
                <span className="ab-name">{t("founder.name")}</span>
                <span>{t("founder.role")}</span>
                <a href="tel:+77019188838">+7 701 918-88-38</a>
                <a href="mailto:gani@abadan.kz">gani@abadan.kz</a>
              </figcaption>
            </figure>
            <div className="ab-letter">
              <h2 id="founder-title" className="paper-display">{t("founder.title")}</h2>
              <blockquote className="ab-quote">«{t("founder.quote")}»</blockquote>
              <p className="ab-greeting">{t("founder.greeting")}</p>
              {(["p1", "p2", "p3", "p4", "p5"] as const).map((k) => <p key={k}>{t(`founder.${k}`)}</p>)}
              <p className="ab-sign">{t("founder.sign")}<br /><strong>{t("founder.name")}</strong><br />Abadan &amp; Company</p>
            </div>
          </div></div>
        </section>

        <section className="paper-section paper-section-tight" aria-labelledby="adv-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="adv-title" className="paper-display">{t("advTitle")}</h2>
            <ul className="tr-areas ab-list">
              {(t.raw("adv") as Item[]).map((a) => (
                <li key={a.t}><div className="tr-area ab-row"><span className="tr-area-title">{a.t}</span><span className="tr-area-desc">{a.d}</span></div></li>
              ))}
            </ul>
          </div></div>
        </section>

        <section className="paper-section" aria-labelledby="pgt-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <div className="paper-head">
              <h2 id="pgt-title" className="paper-display">{t("pgtTitle")}</h2>
              <p className="paper-note">{t("pgtLead")}</p>
            </div>
            <ol className="ab-pgt">
              {(t.raw("pgt") as (Item & { k: string })[]).map((b) => (
                <li key={b.k}>
                  <span className="ab-letter-mark" aria-hidden="true">{b.k}</span>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </li>
              ))}
            </ol>
          </div></div>
        </section>

        <section className="paper-section paper-section-tight" aria-labelledby="formats-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
            <h2 id="formats-title" className="paper-display">{t("formatsTitle")}</h2>
            <ul className="ab-formats">
              {(t.raw("formats") as Item[]).map((x, i) => (
                <li key={x.t}>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                  {i === 2 && <a href="https://www.ibirai.com/ru" target="_blank" rel="noopener" className="paper-link">{t("ibiraiLink")} ↗</a>}
                </li>
              ))}
            </ul>
          </div></div>
        </section>

        <ClientsStrip />
        <Contact variant="paper" title={t("ctaTitle")} subtitle={t("ctaLead")} />
      </main>
      <Footer />
    </>
  );
}
