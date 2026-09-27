"use client";

import { useRef, useState, useTransition } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/actions/contact';

gsap.registerPlugin(ScrollTrigger);

export default function Cta() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Cta');

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isPersisted, setIsPersisted] = useState(false);
  const [error, setError] = useState('');

  useGSAP(() => {
    // 10 FINAL CTA Adaptation
    gsap.fromTo(".cta-content",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  const handleAction = async (formData: FormData) => {
    setError('');
    
    // Client-side quick checks (UX only, real security is on server)
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      setError(t('error_required'));
      return;
    }

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setIsSuccess(true);
        setIsDelivered(result.isDelivered);
        setIsPersisted(result.isPersisted);
      } else {
        setError(result.message);
      }
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setError('');
    }, 300); // Wait for modal close animation if any
  };

  return (
    <>
      <section 
        id="contact"
        ref={containerRef} 
        className="w-full min-h-[70vh] bg-white flex flex-col items-center justify-center py-32 z-10 relative"
      >
        <div className="cta-content text-center max-w-4xl px-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-[var(--color-synck-accent)] rounded-2xl mb-8 flex items-center justify-center shadow-[0_10px_30px_rgba(102,87,225,0.4)] transform rotate-12">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#111] leading-[1.1] mb-12">
            {t('title')}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#111] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[var(--color-synck-accent)] hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            {t('button')}
          </button>
        </div>
        
        {/* Footer minimal */}
        <div className="absolute bottom-6 w-full text-center text-sm text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Project SyncK. All rights reserved.
        </div>
      </section>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close dialog"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {isSuccess ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                
                {isDelivered ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">{t('success_delivered_title')}</h3>
                    <p className="text-gray-500">{t('success_delivered_desc')}</p>
                  </>
                ) : isPersisted ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">{t('success_persisted_title')}</h3>
                    <p className="text-gray-500">{t('success_persisted_desc')}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">{t('success_validated_title')}</h3>
                    <p className="text-gray-500">{t('success_validated_desc')}</p>
                  </>
                )}
                
                <button 
                  onClick={handleClose}
                  className="mt-6 bg-[#111] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  {t('form_close')}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{t('form_title')}</h3>
                <p className="text-gray-500 mb-8">{t('form_subtitle')}</p>

                {error && (
                  <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-100 text-sm rounded-lg font-medium" role="alert">
                    {error}
                  </div>
                )}

                <form action={handleAction} className="flex flex-col gap-5">
                  {/* Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">{t('form_name')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      disabled={isPending}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] focus:border-transparent disabled:bg-gray-50 transition-shadow"
                      placeholder={t('form_name_placeholder')}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">{t('form_email')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      disabled={isPending}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] focus:border-transparent disabled:bg-gray-50 transition-shadow"
                      placeholder={t('form_email_placeholder')}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-gray-700">{t('form_message')}</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      required
                      disabled={isPending}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] focus:border-transparent disabled:bg-gray-50 transition-shadow resize-none"
                      placeholder={t('form_message_placeholder')}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full mt-4 bg-[var(--color-synck-accent)] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5749C9] transition-colors focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-70 flex justify-center items-center h-[60px]"
                  >
                    {isPending ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      t('form_submit')
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
