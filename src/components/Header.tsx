"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const educationLinks = [
  { href: "/treningi/hr", label: "HR и кадры" },
  { href: "/treningi/finansy", label: "Финансы и учёт" },
  { href: "/treningi/pravo", label: "Трудовое право" },
  { href: "/treningi/liderstvo", label: "Лидерство" },
  { href: "/treningi/neftegaz", label: "Нефтегаз" },
  { href: "/treningi/ai", label: "ИИ для бизнеса" },
];

const companyLinks = [
  { href: "/about", label: "О компании" },
  { href: "/kejsy", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/projects", label: "Проекты" },
];

export default function Header() {
  const pathname = usePathname();
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
          <Link href="/" className="flex items-center gap-2 text-[#2D3A3C] font-bold text-xl">
            <span className="text-[#F0BB1E]">Abadan</span> & Co.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              Главная
            </Link>

            {/* Обучение dropdown */}
            <div
              ref={educationDropdownRef}
              className="relative"
              onMouseEnter={handleEducationEnter}
              onMouseLeave={handleEducationLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isEducationActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Обучение
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
                    Тренинги
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
                      {link.label}
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
                    Коучинг
                  </Link>
                </div>
              </div>
            </div>

            {/* Расписание standalone */}
            <Link
              href="/schedule"
              className={`text-sm font-medium transition-colors ${
                isActive("/schedule")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              Расписание
            </Link>

            {/* Компания dropdown */}
            <div
              ref={companyDropdownRef}
              className="relative"
              onMouseEnter={handleCompanyEnter}
              onMouseLeave={handleCompanyLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isCompanyActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Компания
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
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ibirAi button — visually separated with extra horizontal margin */}
            <Link
              href="/ibirai"
              className="mx-4 px-3 py-1.5 bg-gradient-to-r from-[#00767D] to-[#00A3AD] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm flex items-center gap-1.5"
            >
              <span>🤖</span>
              ibirAi
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2D3A3C]"
            aria-label="Toggle menu"
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
                Главная
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
                Обучение
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
                      {link.label}
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
                    Коучинг
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
                Расписание
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
                Компания
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
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* ibirAi button */}
              <Link
                href="/ibirai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#00A3AD] text-white font-semibold rounded-lg text-center text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🤖</span>
                ibirAi
              </Link>

              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-[#F0BB1E] to-[#EBB417] text-[#2D3A3C] font-semibold rounded-lg text-center text-sm"
              >
                Оставить заявку
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
