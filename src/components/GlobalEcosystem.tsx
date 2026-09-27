"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalEcosystem() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Global');

  useGSAP(() => {
    // 08 SYNCK ECOSYSTEM Adaptation (Infinite zoom into the node network)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1
      }
    });

    tl.to(".global-network", {
      scale: 3,
      opacity: 0,
      ease: "power2.in"
    })
    .fromTo(".global-text", 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, ease: "power2.out" },
      "<0.5"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden z-20"
    >
      {/* Background Network Graphic */}
      <div className="global-network absolute inset-0 flex items-center justify-center opacity-40">
        <svg viewBox="0 0 1000 1000" className="w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] text-[var(--color-synck-accent)]" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Concentric circles and connecting lines */}
          <circle cx="500" cy="500" r="100" strokeDasharray="10 10" />
          <circle cx="500" cy="500" r="250" strokeDasharray="20 20" opacity="0.5" />
          <circle cx="500" cy="500" r="450" strokeDasharray="30 30" opacity="0.2" />
          
          <path d="M500,400 L500,250" />
          <path d="M500,600 L500,750" />
          <path d="M400,500 L250,500" />
          <path d="M600,500 L750,500" />
          
          <path d="M429,429 L323,323" />
          <path d="M571,571 L677,677" />
          <path d="M429,571 L323,677" />
          <path d="M571,429 L677,323" />
        </svg>
      </div>

      <div className="global-text relative z-30 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}
