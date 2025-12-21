"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 section-white">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#00767D]/[0.03] to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-tl from-[#F0BB1E]/[0.03] to-transparent blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D3A3C]">
              Начнем <span className="text-gradient-gold">сотрудничество?</span>
            </h2>
            <p className="text-xl text-[#7A8B8E] max-w-2xl mx-auto">
              Получите персональную консультацию и коммерческое предложение
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00767D]/5 to-transparent rounded-3xl blur-2xl"></div>

              <div className="premium-card p-10 sm:p-12 relative">
                <h3 className="text-2xl font-bold text-[#2D3A3C] mb-8">
                  Запросить программу
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#546569] mb-2 uppercase tracking-wide">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#F8FAFA] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#7A8B8E] focus:outline-none focus:border-[#00767D] focus:ring-2 focus:ring-[#00767D]/10 transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#546569] mb-2 uppercase tracking-wide">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#F8FAFA] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#7A8B8E] focus:outline-none focus:border-[#00767D] focus:ring-2 focus:ring-[#00767D]/10 transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#546569] mb-2 uppercase tracking-wide">
                      Комментарий
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-5 py-4 bg-[#F8FAFA] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#7A8B8E] focus:outline-none focus:border-[#00767D] focus:ring-2 focus:ring-[#00767D]/10 transition-all resize-none"
                      placeholder="Кратко опишите, что вас интересует..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gold-button text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить запрос"}
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-sm text-[#00767D] text-center font-medium">
                      Спасибо! Мы свяжемся с вами в ближайшее время.
                    </p>
                  )}

                  {submitStatus === "error" && (
                    <p className="text-sm text-[#EF4444] text-center font-medium">
                      Произошла ошибка. Попробуйте ещё раз или позвоните нам.
                    </p>
                  )}

                  <p className="text-xs text-[#7A8B8E] text-center">
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
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center shadow-[0_0_30px_rgba(240,187,30,0.2)]">
                    <svg className="w-8 h-8 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A8B8E] font-medium uppercase tracking-wide">Телефон</p>
                    <a href="tel:+77022413388" className="text-2xl font-bold text-[#2D3A3C] hover:text-[#00767D] transition-colors">
                      +7 702 241 33 88
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center shadow-[0_0_30px_rgba(0,118,125,0.2)]">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A8B8E] font-medium uppercase tracking-wide">Email</p>
                    <a href="mailto:i.islambek@abadan.kz" className="text-2xl font-bold text-[#2D3A3C] hover:text-[#00767D] transition-colors">
                      i.islambek@abadan.kz
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.2)]">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A8B8E] font-medium uppercase tracking-wide">WhatsApp</p>
                    <a
                      href="https://wa.me/77022413388"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-[#2D3A3C] hover:text-[#25D366] transition-colors"
                    >
                      Написать напрямую
                    </a>
                  </div>
                </div>

              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2D3A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#2D3A3C]">Консультация</p>
                  <p className="text-sm text-[#7A8B8E]">30 минут бесплатно</p>
                </div>

                <div className="card p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#2D3A3C]">КП в день запроса</p>
                  <p className="text-sm text-[#7A8B8E]">Быстрый расчёт</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
