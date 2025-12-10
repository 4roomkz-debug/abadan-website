"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030305]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            {/* Company info */}
            <div className="lg:col-span-2 space-y-8">
              <img
                src="/images/logo.png"
                alt="Abadan & Company"
                className="h-14 w-auto"
              />

              <p className="text-[#A1A1AA] leading-relaxed max-w-md">
                Ведущий провайдер корпоративного обучения в Казахстане и СНГ.
                С 2015 года помогаем компаниям превращать обучение в измеримый рост эффективности.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03] text-sm">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A1A1AA]">На рынке с 2015</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03] text-sm">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A1A1AA]">Алматы, Казахстан</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-bold text-[#FAFAFA] mb-6 uppercase tracking-[0.15em]">Навигация</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#about" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300">
                    О компании
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300">
                    Наш подход
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-[#FAFAFA] mb-6 uppercase tracking-[0.15em]">Контакты</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+77022413388" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 text-[#71717A] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +7 702 241 33 88
                  </a>
                </li>
                <li>
                  <a href="mailto:i.islambek@abadan.kz" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 text-[#71717A] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    i.islambek@abadan.kz
                  </a>
                </li>
                <li>
                  <a href="http://www.abadan.kz" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-3 group">
                    <svg className="w-4 h-4 text-[#71717A] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    www.abadan.kz
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-10 border-t border-[#D4AF37]/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-[#71717A] text-sm text-center sm:text-left">
                © {currentYear} Abadan & Company. Все права защищены.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#71717A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#71717A] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 4.813.109 4.086.278 3.45.525a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 00.525 3.45C.278 4.086.109 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0016.55.525C15.914.278 15.187.109 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.986.01 4.04.058.975.045 1.504.207 1.857.344.466.181.8.398 1.15.748.35.35.567.684.748 1.15.137.353.3.882.344 1.857.048 1.054.058 1.37.058 4.04 0 2.67-.01 2.986-.058 4.04-.045.975-.207 1.504-.344 1.857-.181.466-.398.8-.748 1.15-.35.35-.684.567-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.04.058-2.67 0-2.986-.01-4.04-.058-.975-.045-1.504-.207-1.857-.344a3.097 3.097 0 01-1.15-.748 3.097 3.097 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.054-.058-1.37-.058-4.04 0-2.67.01-2.986.058-4.04.045-.975.207-1.504.344-1.857.181-.466.398-.8.748-1.15.35-.35.684-.567 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.04-.058zM10 13.533a3.533 3.533 0 110-7.066 3.533 3.533 0 010 7.066zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm6.538-.203a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
