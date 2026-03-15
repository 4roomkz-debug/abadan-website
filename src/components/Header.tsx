"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const trainingLinks = [
  { href: "/treningi/hr", label: "HR и кадры" },
  { href: "/treningi/finansy", label: "Финансы и учёт" },
  { href: "/treningi/pravo", label: "Трудовое право" },
  { href: "/treningi/liderstvo", label: "Лидерство" },
  { href: "/treningi/neftegaz", label: "Нефтегаз" },
  { href: "/treningi/ai", label: "ИИ для бизнеса" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isMobileTrainingOpen, setIsMobileTrainingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const isTrainingActive = pathname.startsWith("/treningi");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTrainingOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsTrainingOpen(false), 150);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
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
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              О компании
            </Link>
            {/* Тренинги dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isTrainingActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Тренинги
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${isTrainingOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTrainingOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white rounded-xl shadow-xl border border-[#00767D]/10 py-2 min-w-[200px]">
                    {trainingLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
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
              )}
            </div>
            <Link
              href="https://ibirai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gradient-to-r from-[#00767D] to-[#00A3AD] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm flex items-center gap-1.5"
            >
              <span>🤖</span>
              ibirAi
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors ${
                isActive("/projects")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              Проекты
            </Link>
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
            <Link
              href="/coaching"
              className={`text-sm font-medium transition-colors ${
                isActive("/coaching")
                  ? "text-[#00767D]"
                  : "text-[#546569] hover:text-[#00767D]"
              }`}
            >
              Коучинг
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-[#546569] hover:text-[#00767D] transition-colors"
            >
              Контакты
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
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive("/about")
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                О компании
              </Link>
              {/* Mobile Тренинги accordion */}
              <button
                onClick={() => setIsMobileTrainingOpen(!isMobileTrainingOpen)}
                className={`text-sm font-medium py-2 transition-colors flex items-center justify-between w-full ${
                  isTrainingActive
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Тренинги
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileTrainingOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileTrainingOpen && (
                <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#00767D]/20 ml-2">
                  {trainingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileTrainingOpen(false); }}
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
              <Link
                href="https://ibirai.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#00767D] to-[#00A3AD] text-white font-semibold rounded-lg text-center text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🤖</span>
                ibirAi
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive("/projects")
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Проекты
              </Link>
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
              <Link
                href="/coaching"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  isActive("/coaching")
                    ? "text-[#00767D]"
                    : "text-[#546569] hover:text-[#00767D]"
                }`}
              >
                Коучинг
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium py-2 text-[#546569] hover:text-[#00767D] transition-colors"
              >
                Контакты
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
