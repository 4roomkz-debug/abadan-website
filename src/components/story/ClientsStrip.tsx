import Image from "next/image";
import { useTranslations } from "next-intl";
import { CLIENT_LOGOS } from "@/data/clients";

// Логотипы клиентов — тихая полоса на бумаге, без карусели и счётчиков.
// Список подтверждён основателем 14.10.2026 (см. CLAUDE.md), новых не добавлять.
export default function ClientsStrip() {
  const t = useTranslations("home.clients");

  return (
    <section className="paper-section paper-section-tight" aria-labelledby="clients-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
        <h2 id="clients-title" className="paper-kicker">{t("title")}</h2>
        <ul className="clients-strip">
          {CLIENT_LOGOS.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={c.name} width={120} height={56} className="clients-logo" />
            </li>
          ))}
        </ul>
      </div></div>
    </section>
  );
}
