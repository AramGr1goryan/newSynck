"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Business() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Business');

  useGSAP(() => {
    // Large cards overlapping parallax
    const cards = gsap.utils.toArray('.business-card');
    
    cards.forEach((card: any, i) => {
      gsap.to(card, {
        yPercent: -20 * (cards.length - i),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      id="business"
      ref={containerRef} 
      className="w-full bg-[#fafafa] py-32 flex flex-col items-center z-10 relative overflow-hidden"
    >
      <div className="text-center max-w-3xl px-6 mb-24 z-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--color-synck-black)] mb-6">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-synck-text-secondary)]">
          {t('subtitle')}
        </p>
      </div>

      <div className="w-full max-w-5xl px-6 flex flex-col items-center gap-16 relative">
        
        {/* Step 1: Brief */}
        <div className="business-card w-full md:w-3/4 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 z-10 transform translate-y-0">
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Step 01</div>
            <h3 className="text-3xl font-bold mb-4 text-[#111]">{t('step1')}</h3>
            <div className="w-12 h-1 bg-black rounded-full mb-6"></div>
          </div>
          <div className="flex-1 w-full bg-gray-50 h-[200px] rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
            <div className="w-1/3 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-full h-2 bg-gray-200 rounded-full"></div>
            <div className="w-full h-2 bg-gray-200 rounded-full"></div>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Step 2: Design */}
        <div className="business-card w-full md:w-3/4 bg-[#111] text-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-800 flex flex-col md:flex-row-reverse items-center gap-8 z-20 transform translate-y-12">
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Step 02</div>
            <h3 className="text-3xl font-bold mb-4 text-white">{t('step2')}</h3>
            <div className="w-12 h-1 bg-white rounded-full mb-6"></div>
          </div>
          <div className="flex-1 w-full bg-[#1c1c1e] h-[200px] rounded-2xl border border-gray-800 p-4 flex gap-4 overflow-hidden">
            <div className="w-1/2 h-full bg-[#2c2c2e] rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#333]"></div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-4">
              <div className="flex-1 bg-[#2c2c2e] rounded-xl"></div>
              <div className="flex-1 bg-[var(--color-synck-accent)] rounded-xl opacity-80"></div>
            </div>
          </div>
        </div>

        {/* Step 3: Development */}
        <div className="business-card w-full md:w-3/4 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 z-30 transform translate-y-24">
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Step 03</div>
            <h3 className="text-3xl font-bold mb-4 text-[#111]">{t('step3')}</h3>
            <div className="w-12 h-1 bg-black rounded-full mb-6"></div>
          </div>
          <div className="flex-1 w-full bg-black h-[200px] rounded-2xl p-6 flex flex-col gap-2 font-mono text-[10px] text-green-400 overflow-hidden shadow-inner">
            <div><span className="text-pink-500">const</span> <span className="text-blue-400">SyncK</span> = new App();</div>
            <div><span className="text-blue-400">SyncK</span>.init(&#123;</div>
            <div className="pl-4">mode: <span className="text-yellow-300">'production'</span>,</div>
            <div className="pl-4">speed: <span className="text-orange-400">999</span></div>
            <div>&#125;);</div>
            <div className="mt-4 text-gray-500">// Compiling...</div>
            <div className="text-gray-500">// Done in 0.1s</div>
          </div>
        </div>

      </div>
    </section>
  );
}
