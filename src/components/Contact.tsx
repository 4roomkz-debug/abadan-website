"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Спасибо за запрос! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", company: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 section-dark-1">
      {/* Luxury ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#D4AF37]/[0.04] to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-tl from-[#14B8A6]/[0.03] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA]">
              Начнем <span className="text-gradient-gold">сотрудничество?</span>
            </h2>
            <p className="text-xl text-[#71717A] max-w-2xl mx-auto">
              Получите персональную консультацию и коммерческое предложение
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/5 to-transparent rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 sm:p-12 relative">
                <h3 className="text-2xl font-bold text-[#FAFAFA] mb-8">
                  Запросить программу
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#A1A1AA] mb-2 uppercase tracking-wide">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="dark-input"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#A1A1AA] mb-2 uppercase tracking-wide">
                      Компания *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="dark-input"
                      placeholder="Название компании"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#A1A1AA] mb-2 uppercase tracking-wide">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="dark-input"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#A1A1AA] mb-2 uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="dark-input"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#A1A1AA] mb-2 uppercase tracking-wide">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="dark-input resize-none"
                      placeholder="Расскажите о ваших потребностях в обучении..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-button text-center cursor-pointer"
                  >
                    Отправить запрос
                  </button>

                  <p className="text-xs text-[#71717A] text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </div>
            </div>

            {/* Contact information */}
            <div className="space-y-8">
              {/* Main contact card */}
              <div className="premium-card p-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] font-medium uppercase tracking-wide">Телефон</p>
                    <a href="tel:+77022413388" className="text-2xl font-bold text-[#FAFAFA] hover:text-[#D4AF37] transition-colors">
                      +7 702 241 33 88
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] font-medium uppercase tracking-wide">Email</p>
                    <a href="mailto:i.islambek@abadan.kz" className="text-2xl font-bold text-[#FAFAFA] hover:text-[#14B8A6] transition-colors">
                      i.islambek@abadan.kz
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] font-medium uppercase tracking-wide">Локация</p>
                    <p className="text-2xl font-bold text-[#FAFAFA]">
                      г. Алматы, мкр. Атырау, д. 11/1, 56
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="dark-card p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#FAFAFA]">Консультация</p>
                  <p className="text-sm text-[#71717A]">30 минут бесплатно</p>
                </div>

                <div className="dark-card p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#FAFAFA]">КП в день запроса</p>
                  <p className="text-sm text-[#71717A]">Быстрый расчёт</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
    </section>
  );
}
