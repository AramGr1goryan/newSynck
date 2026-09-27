"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function CrmEcosystem() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Ecosystem');

  useGSAP(() => {
    // 04 CRM ECOSYSTEM Adaptation
    // modules -> transform -> align -> connect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "center center",
        scrub: 1
      }
    });

    // Modules start scattered and converge into a single aligned structure
    tl.fromTo(".eco-module-sales", 
      { x: -150, y: -100, opacity: 0, rotate: -10 },
      { x: 0, y: 0, opacity: 1, rotate: 0, duration: 1 },
      0
    )
    .fromTo(".eco-module-clients", 
      { x: 150, y: -100, opacity: 0, rotate: 10 },
      { x: 0, y: 0, opacity: 1, rotate: 0, duration: 1 },
      0
    )
    .fromTo(".eco-module-analytics", 
      { y: 150, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1 },
      0
    )
    // Connections draw in
    .fromTo(".eco-connection", 
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.2 },
      0.5
    )
    // Central core pulse
    .fromTo(".eco-core", 
      { scale: 0.8, opacity: 0, boxShadow: "0px 0px 0px rgba(102,87,225,0)" },
      { scale: 1, opacity: 1, boxShadow: "0px 0px 40px rgba(102,87,225,0.4)", duration: 0.5 },
      0.8
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[100vh] bg-white flex flex-col items-center justify-center py-32 overflow-hidden relative z-10"
    >
      <div className="text-center max-w-3xl px-6 mb-24 z-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--color-synck-black)] mb-6">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-synck-text-secondary)]">
          {t('subtitle')}
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        
        {/* Core Node */}
        <div className="eco-core absolute w-24 h-24 bg-[var(--color-synck-accent)] rounded-full z-20 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Connections (Lines) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Top Left Line */}
          <div className="eco-connection absolute top-1/4 left-1/4 w-[2px] h-32 bg-gray-200 transform -rotate-45 origin-bottom"></div>
          {/* Top Right Line */}
          <div className="eco-connection absolute top-1/4 right-1/4 w-[2px] h-32 bg-gray-200 transform rotate-45 origin-bottom"></div>
          {/* Bottom Line */}
          <div className="eco-connection absolute bottom-1/4 w-[2px] h-32 bg-gray-200 origin-top"></div>
        </div>

        {/* Modules */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          
          {/* Sales Module (Top Left) */}
          <div className="eco-module-sales absolute top-[10%] left-[15%] md:left-[25%] bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-48 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-6 h-6 rounded-sm bg-blue-500"></div>
            </div>
            <span className="font-semibold text-gray-800">{t('module_sales')}</span>
          </div>

          {/* Clients Module (Top Right) */}
          <div className="eco-module-clients absolute top-[10%] right-[15%] md:right-[25%] bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-48 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-purple-500"></div>
            </div>
            <span className="font-semibold text-gray-800">{t('module_clients')}</span>
          </div>

          {/* Analytics Module (Bottom Center) */}
          <div className="eco-module-analytics absolute bottom-[10%] bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-48 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center gap-1">
              <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-3 bg-green-500 rounded-sm"></div>
            </div>
            <span className="font-semibold text-gray-800">{t('module_analytics')}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
