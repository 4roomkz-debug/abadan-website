'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SUBSCRIBE_API = 'https://tracking-server-livid.vercel.app/api/subscribe';

type SubmitState = 'idle' | 'loading' | 'success' | 'already' | 'error';

interface NewsletterProps {
  /**
   * Трекер по этому полю решает, в какую дорожку поставить подписчика
   * (tracking-server/lib/subscriber_routing.py). Источники abadan-kz-* ведут
   * в личную серию с гайдом. Новый источник — сперва проверить маршрутизацию.
   */
  source?: string;
  /** paper — бумажный вариант для новой главной: без стекла и градиентов. */
  variant?: 'default' | 'paper';
}

export default function Newsletter({ source = 'abadan-kz-footer', variant = 'default' }: NewsletterProps) {
  const paper = variant === 'paper';
  const t = useTranslations('home.newsletter');
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
        setErrorMessage(data.error || t('error'));
      }
    } catch {
      setState('error');
      setErrorMessage(t('netError'));
    }
  };

  return (
    <section className={paper ? 'paper-section paper-section-tight' : 'section-subtle py-16'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={paper ? 'paper-box max-w-7xl mx-auto' : 'glass-card max-w-3xl mx-auto p-8 md:p-10'}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {!paper && (
                <p className="text-sm font-semibold uppercase tracking-wider text-gradient-gold mb-3">
                  {t('label')}
                </p>
              )}
              <h2 className={paper ? 'paper-display mb-3' : 'text-2xl md:text-3xl font-bold mb-4 text-gradient-primary'}>
                {t(paper ? 'title' : 'titleShort', { guide: t('guide') })}
              </h2>
              {/* Аудитория этого сайта — руководители и HR. Поэтому угол про
                  личную продуктивность управленца, а не про дневник рефлексии. */}
              <p className="text-gray-600 leading-relaxed">
                {t('text')}
              </p>
              {t('langNote') && <p className="mt-2 text-sm font-semibold text-[#546569]">{t('langNote')}</p>}
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
                      {state === 'already' ? t('already') : t('done')}
                    </p>
                    <p className="text-[#546569]">
                      {state === 'already' ? t('alreadyText') : t('doneText')}
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
                    placeholder={t('name')}
                    aria-label={t('name')}
                    disabled={state === 'loading'}
                    className="dark-input w-full"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('email')}
                    aria-label={t('email')}
                    required
                    disabled={state === 'loading'}
                    className="dark-input w-full"
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading' || !email.trim()}
                    className="gold-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state === 'loading' ? t('sending') : t('submit')}
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
