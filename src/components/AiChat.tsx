"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { captureAttributionFromUrl } from "@/lib/attribution";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Страницы где чат скрыт
const HIDDEN_PATHS = ["/breakfast"];

const QUICK_ACTIONS = ["trainings", "price", "request"] as const;

// Вне компонента: генерация id — побочный эффект, React-линтер не пускает его в тело компонента.
function newSessionId(): string {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export default function AiChat() {
  const t = useTranslations("common.chat");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Id разговора: по нему сервер сохраняет весь диалог и связывает его с лидом.
  // Живёт, пока открыта вкладка, — как и сама переписка.
  const sessionIdRef = useRef<string | null>(null);
  const getSessionId = () => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = newSessionId();
    }
    return sessionIdRef.current;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Чат стоит в общем layout, поэтому здесь — единая точка, где сайт
  // запоминает метку письма при входе на любую страницу.
  useEffect(() => {
    captureAttributionFromUrl();
  }, [pathname]);

  const sendMessage = async (textOverride?: string) => {
    // Принимаем явный текст из быстрых кнопок — иначе setInput+setTimeout
    // ловит stale closure (input ещё пустой в момент клика → ранний return).
    const content = (textOverride ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    if (textOverride === undefined) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          locale,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.error || t("error") }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: t("errorCall") }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Скрываем чат на определённых страницах
  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-[#546569]"
            : "bg-gradient-to-br from-[#00767D] to-[#006D77] hover:scale-110"
        }`}
        aria-label={isOpen ? t("close") : t("open")}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <Image
              src="/asem-avatar.jpg"
              alt={t("avatarAlt")}
              width={192}
              height={192}
              className="absolute inset-0 w-full h-full rounded-full object-cover ring-2 ring-white/50"
              priority
              unoptimized
            />
            <span
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#4ADE80] ring-2 ring-white"
              aria-hidden
            />
          </>
        )}
      </button>

      {/* Badge */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white px-4 py-2 rounded-full shadow-lg border border-[#00767D]/20">
          <span className="text-sm font-medium text-[#2D3A3C]">{t("badge")}</span>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-[#00767D]/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00767D] to-[#006D77] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/30">
              <Image
                src="/asem-avatar.jpg"
                alt={t("name")}
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
            </div>
            <div>
              <h3 className="text-white font-bold">{t("name")}</h3>
              <p className="text-white/80 text-xs">{t("role")}</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
              <span className="text-white/80 text-xs">{t("online")}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFA]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#00767D] to-[#006D77] text-white rounded-br-md"
                      : "bg-white text-[#2D3A3C] shadow-sm border border-[#00767D]/10 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-[#00767D]/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00767D] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-[#00767D] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-[#00767D] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-white border-t border-[#00767D]/10 flex gap-2 overflow-x-auto">
            {QUICK_ACTIONS.map((key) => (
              <button
                key={key}
                onClick={() => sendMessage(t(`quick.${key}`))}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-medium text-[#00767D] bg-[#00767D]/5 rounded-full hover:bg-[#00767D]/10 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {t(`quick.${key}`)}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#00767D]/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#F8FAFA] border border-[#00767D]/20 rounded-xl text-[#2D3A3C] placeholder-[#7A8B8E] text-sm focus:outline-none focus:border-[#00767D] focus:ring-2 focus:ring-[#00767D]/10 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                aria-label={t("send")}
                className="px-4 py-3 bg-gradient-to-br from-[#F0BB1E] to-[#EBB417] rounded-xl text-[#2D3A3C] font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
