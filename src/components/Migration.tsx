"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Migration() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Migration');

  useGSAP(() => {
    // 05 MIGRATION Adaptation (Based on reference 6-grid stagger, adapted to 3-step flow)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // Staggered reveal of the migration steps
    tl.fromTo(".migration-step",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Micro-animations inside steps
    gsap.to(".migration-row", {
      x: 10,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[var(--color-synck-bg-alt)] py-32 flex justify-center z-10 relative"
    >
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Content */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-synck-black)] max-w-md">
            {t('title')}
          </h2>
          <p className="text-lg text-[var(--color-synck-text-secondary)] max-w-md">
            {t('subtitle')}
          </p>
        </div>

        {/* Right: Step-by-Step UI */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1: Messy Data */}
          <div className="migration-step bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 relative">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('step_old')}</div>
            <div className="flex flex-col gap-2">
              <div className="migration-row w-full h-3 bg-gray-200 rounded-sm"></div>
              <div className="migration-row w-4/5 h-3 bg-gray-200 rounded-sm"></div>
              <div className="migration-row w-full h-3 bg-gray-200 rounded-sm"></div>
              <div className="migration-row w-3/4 h-3 bg-gray-200 rounded-sm"></div>
            </div>
            {/* Arrow connecting */}
            <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>

          {/* Step 2: Transition */}
          <div className="migration-step bg-[#f0f3ff] p-6 rounded-2xl shadow-inner border border-blue-100 flex flex-col gap-4 items-center justify-center relative">
            <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{t('step_migrating')}</div>
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            {/* Arrow connecting */}
            <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>

          {/* Step 3: Structured SyncK */}
          <div className="migration-step bg-white p-6 rounded-2xl shadow-lg border border-[var(--color-synck-border)] flex flex-col gap-4">
            <div className="text-xs font-semibold text-[var(--color-synck-accent)] uppercase tracking-wider">{t('step_new')}</div>
            <div className="flex flex-col gap-3">
              <div className="w-full flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <div className="w-full flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-purple-100"></div>
                <div className="flex-1 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
