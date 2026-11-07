"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { isRuOnlyPath } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const educationLinks = [
  { href: "/treningi/hr", key: "hr" },
  { href: "/treningi/finansy", key: "finansy" },
  { href: "/treningi/pravo", key: "pravo" },
  { href: "/treningi/liderstvo", key: "liderstvo" },
  { href: "/treningi/neftegaz", key: "neftegaz" },
  { href: "/treningi/ai", key: "ai" },
] as const;

const companyLinks = [
  { href: "/about", key: "about" },
  { href: "/kejsy", key: "kejsy" },
  { href: "/blog", key: "blog" },
  { href: "/projects", key: "projects" },
] as const;

// ibirAi — отдельный продукт со своим сайтом (решение Гани 06.11.2026).
const IBIRAI_URL = "https://www.ibirai.com/ru";

export default function Header() {
  const t = useTranslations("common.header");
  const tNav = useTranslations("common.nav");
  const locale = useLocale();
  const pathname = usePathname();

  // На kk/en помечаем разделы, которые пока есть только на русском.
  const navLabel = (href: string, key: Parameters<typeof tNav>[0]) =>
    locale !== "ru" && isRuOnlyPath(href) ? (
      <>
        {tNav(key)}{" "}
        <span title={t("ruOnlyTitle")} className="text-[10px] font-semibold text-[#7A8B8E]">
          RU
        </span>
      </>
    ) : (
      tNav(key)
    );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileEducationOpen, setIsMobileEducationOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

  const educationDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const educationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const isEducationActive =
    pathname.startsWith("/treningi") || pathname === "/coaching";

  const isCompanyActive =
    pathname === "/about" ||
    pathname.startsWith("/kejsy") ||
    pathname.startsWith("/blog") ||
    pathname === "/projects";

  const handleEducationEnter = () => {
    if (educationTimeoutRef.current) clearTimeout(educationTimeoutRef.current);
    setIsEducationOpen(true);
  };

  const handleEducationLeave = () => {
    educationTimeoutRef.current = setTimeout(() => setIsEducationOpen(false), 150);
  };

  const handleCompanyEnter = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    setIsCompanyOpen(true);
  };

  const handleCompanyLeave = () => {
    companyTimeoutRef.current = setTimeout(() => setIsCompanyOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (educationTimeoutRef.current) clearTimeout(educationTimeoutRef.current);
      if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-[#00767D]/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Abadan & Co. — People. Growth. Technology.">
            <Image src="/images/logo.png" alt="Abadan & Co. — People. Growth. Technology." width={651} height={140} priority className="h-9 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`py-2 text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              {t("home")}
            </Link>

            {/* Обучение dropdown */}
            <div
              ref={educationDropdownRef}
              className="relative"
              onMouseEnter={handleEducationEnter}
              onMouseLeave={handleEducationLeave}
            >
              <button
                className={`py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isEducationActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("education")}
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${isEducationOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-150 ${
                  isEducationOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-xl shadow-xl border border-[#00767D]/10 py-2 min-w-[200px]">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7A8B8E]">
                    {t("trainingsHeading")}
                  </div>
                  {educationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsEducationOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(link.href)
                          ? "text-[#00767D] bg-[#f0f9f9] font-medium"
                          : "text-[#546569] hover:text-[#00767D] hover:bg-[#f0f9f9]"
                      }`}
                    >
                      {navLabel(link.href, link.key)}
                    </Link>
                  ))}
                  <div className="border-t border-[#00767D]/10 my-1" />
                  <Link
                    href="/coaching"
                    onClick={() => setIsEducationOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      isActive("/coaching")
                        ? "text-[#00767D] bg-[#f0f9f9] font-medium"
                        : "text-[#546569] hover:text-[#00767D] hover:bg-[#f0f9f9]"
                    }`}
                  >
                    {t("coaching")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Расписание standalone */}
            <Link
              href="/schedule"
              className={`py-2 text-sm font-medium transition-colors ${
                isActive("/schedule")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              {t("schedule")}
            </Link>

            {/* Компания dropdown */}
            <div
              ref={companyDropdownRef}
              className="relative"
              onMouseEnter={handleCompanyEnter}
              onMouseLeave={handleCompanyLeave}
            >
              <button
                className={`py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isCompanyActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("company")}
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${isCompanyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-150 ${
                  isCompanyOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-xl shadow-xl border border-[#00767D]/10 py-2 min-w-[200px]">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsCompanyOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(link.href)
                          ? "text-[#00767D] bg-[#f0f9f9] font-medium"
                          : "text-[#546569] hover:text-[#00767D] hover:bg-[#f0f9f9]"
                      }`}
                    >
                      {navLabel(link.href, link.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ibirAi — внешняя ссылка на отдельный сайт */}
            <a
              href={IBIRAI_URL}
              target="_blank"
              rel="noopener"
              title={t("ibiraiTitle")}
              className="py-2 text-sm font-medium text-[#546569] hover:text-[#00767D] transition-colors flex items-center gap-1"
            >
              ibirAi
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </nav>

          {/* Language + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/#contact"
              className="px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2D3A3C]"
            aria-label={t("toggleMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#00767D]/10">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive("/")
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("home")}
              </Link>

              {/* Mobile Обучение accordion */}
              <button
                onClick={() => setIsMobileEducationOpen(!isMobileEducationOpen)}
                className={`text-sm font-medium py-2 transition-colors flex items-center justify-between w-full ${
                  isEducationActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("education")}
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileEducationOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileEducationOpen && (
                <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#00767D]/20 ml-2">
                  {educationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileEducationOpen(false); }}
                      className={`text-sm py-1.5 transition-colors ${
                        isActive(link.href)
                          ? "text-[#00767D] font-medium"
                          : "text-[#546569] hover:text-[#00767D]"
                      }`}
                    >
                      {navLabel(link.href, link.key)}
                    </Link>
                  ))}
                  <div className="border-t border-[#00767D]/10 my-1" />
                  <Link
                    href="/coaching"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileEducationOpen(false); }}
                    className={`text-sm py-1.5 transition-colors ${
                      isActive("/coaching")
                        ? "text-[#00767D] font-medium"
                        : "text-[#546569] hover:text-[#00767D]"
                    }`}
                  >
                    {t("coaching")}
                  </Link>
                </div>
              )}

              {/* Расписание standalone */}
              <Link
                href="/schedule"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive("/schedule")
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("schedule")}
              </Link>

              {/* Mobile Компания accordion */}
              <button
                onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                className={`text-sm font-medium py-2 transition-colors flex items-center justify-between w-full ${
                  isCompanyActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                {t("company")}
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileCompanyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileCompanyOpen && (
                <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#00767D]/20 ml-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileCompanyOpen(false); }}
                      className={`text-sm py-1.5 transition-colors ${
                        isActive(link.href)
                          ? "text-[#00767D] font-medium"
                          : "text-[#546569] hover:text-[#00767D]"
                      }`}
                    >
                      {navLabel(link.href, link.key)}
                    </Link>
                  ))}
                </div>
              )}

              {/* ibirAi — внешняя ссылка на отдельный сайт */}
              <a
                href={IBIRAI_URL}
                target="_blank"
                rel="noopener"
                title={t("ibiraiTitle")}
                className="text-sm font-medium py-2 text-[#546569] hover:text-[#00767D] transition-colors flex items-center gap-1"
              >
                ibirAi
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>

              <LanguageSwitcher className="-ml-2" />

              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg text-center text-sm"
              >
                {t("cta")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
