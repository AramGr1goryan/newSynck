"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Mobile() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Mobile');

  useGSAP(() => {
    // 09 MOBILE Adaptation (3D rotation of device on scroll)
    gsap.fromTo(".mobile-device",
      { 
        rotationX: 45, 
        rotationY: -30, 
        rotationZ: -10,
        y: 200,
        opacity: 0
      },
      {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="mobile"
      ref={containerRef} 
      className="w-full bg-[#f8f9fc] py-32 flex flex-col items-center justify-center relative overflow-hidden z-10"
      style={{ perspective: "1000px" }}
    >
      <div className="text-center max-w-2xl px-6 mb-16 relative z-20">
        <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
          {t('status')}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#111] mb-6">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-500">
          {t('subtitle')}
        </p>
      </div>

      <div className="mobile-device w-[300px] h-[600px] bg-black rounded-[40px] shadow-2xl border-[8px] border-gray-900 relative overflow-hidden transform-style-3d">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-30"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-[#111] flex flex-col pt-12 px-4 gap-4 relative z-20">
          <div className="w-full h-32 bg-gradient-to-br from-[var(--color-synck-accent)] to-purple-600 rounded-2xl p-4 flex flex-col justify-end shadow-inner">
            <div className="text-white text-3xl font-bold">SyncK</div>
            <div className="text-white/80 text-sm">Mobile Preview</div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 h-20 bg-[#1c1c1e] rounded-2xl"></div>
            <div className="flex-1 h-20 bg-[#1c1c1e] rounded-2xl"></div>
          </div>
          
          <div className="w-full h-40 bg-[#1c1c1e] rounded-2xl mt-auto mb-4"></div>
        </div>

        {/* Glossy reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-40 transform -rotate-12 scale-150 translate-y-[-20%]"></div>
      </div>
    </section>
  );
}
