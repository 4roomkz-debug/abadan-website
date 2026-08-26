'use client';

import { useState } from 'react';

const SUBSCRIBE_API = 'https://tracking-server-livid.vercel.app/api/subscribe';
const GUIDE_TITLE = 'От хаоса к порядку';

type SubmitState = 'idle' | 'loading' | 'success' | 'already' | 'error';

interface NewsletterProps {
  /**
   * Трекер по этому полю решает, в какую дорожку поставить подписчика
   * (tracking-server/lib/subscriber_routing.py). Источники abadan-kz-* ведут
   * в личную серию с гайдом. Новый источник — сперва проверить маршрутизацию.
   */
  source?: string;
}

export default function Newsletter({ source = 'abadan-kz-footer' }: NewsletterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch(SUBSCRIBE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          source,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setState(data.message === 'already_subscribed' ? 'already' : 'success');
        if (data.message !== 'already_subscribed') {
          setName('');
          setEmail('');
        }
      } else {
        setState('error');
        setErrorMessage(data.error || 'Произошла ошибка');
      }
    } catch {
      setState('error');
      setErrorMessage('Ошибка сети. Попробуйте позже.');
    }
  };

  return (
    <section className="section-subtle py-16">
      <div className="container mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gradient-gold mb-3">
                Бесплатный гайд
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-primary">
                «{GUIDE_TITLE}»
              </h2>
              {/* Аудитория этого сайта — руководители и HR. Поэтому угол про
                  личную продуктивность управленца, а не про дневник рефлексии. */}
              <p className="text-gray-600 leading-relaxed">
                Шесть методов, которые возвращают контроль над рабочим днём
                руководителя. 11 страниц, рабочий лист на неделю и ссылки
                на исследования — без сложных систем.
              </p>
            </div>

            <div>
              {state === 'success' || state === 'already' ? (
                <div className="flex items-start gap-4" role="status" aria-live="polite">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#00767D] to-[#006D77] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-lg font-bold text-[#2D3A3C]">
                      {state === 'already' ? 'Вы уже подписаны' : 'Готово'}
                    </p>
                    <p className="text-[#546569]">
                      {state === 'already'
                        ? 'Гайд мы уже отправляли — проверьте почту, в том числе «Промоакции» и «Спам».'
                        : 'Гайд уже в пути — проверьте почту, в том числе «Промоакции» и «Спам».'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Имя необязательное: письма серии обращаются по имени,
                      но обязательное поле роняет конверсию. */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    disabled={state === 'loading'}
                    className="dark-input w-full"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    required
                    disabled={state === 'loading'}
                    className="dark-input w-full"
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading' || !email.trim()}
                    className="gold-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === 'loading' ? 'Отправка…' : 'Получить гайд'}
                  </button>
                  {state === 'error' && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
