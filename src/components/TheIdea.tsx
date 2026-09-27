"use client";

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheIdea() {
  const t = useTranslations('Hero'); // Or a new namespace, reusing Hero for now or hardcoding English
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Exact adaptation from reference: 00:02 - 00:04
    // Items fade in and slide up when scrolling into view
    gsap.fromTo('.idea-item',
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // triggers when top of container hits 75% down viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#f8f9fc] pt-32 pb-24 md:pt-48 md:pb-32 flex justify-center z-20 relative"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-7xl px-6 md:px-12 flex flex-col gap-20"
      >
        {/* Top Row: Title and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          <h2 className="idea-item w-full md:w-3/5 text-5xl md:text-6xl lg:text-[72px] leading-[1.05] font-semibold tracking-tight text-[#111]">
            Everything in sync. Everything in one place.
          </h2>
          
          <div className="idea-item w-full md:w-2/5 flex flex-col items-start gap-6 pt-4">
            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-xs">
              Everything connects. Everything communicates. Everything moves together. A fully integrated ecosystem for your business.
            </p>
            <button 
              onClick={() => handleScroll('crm')}
              className="bg-[#6657E1] text-white px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-[#5749C9] transition-colors shadow-[0_4px_14px_0_rgba(102,87,225,0.3)] focus:outline-none focus:ring-4 focus:ring-[var(--color-synck-accent)]"
            >
              Discover Ecosystem
            </button>
          </div>
        </div>

        {/* Bottom Row: 3 Pillars */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 w-full pt-8 md:pt-12 border-t border-gray-200/60">
          
          {/* Pillar 1 */}
          <div className="idea-item flex-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Users</span>
            </div>
            <div className="text-5xl font-semibold tracking-tight text-[#111] mb-4">
              10k+
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Active businesses synchronized daily across our complete ecosystem of tools.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="idea-item flex-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Sync Speed</span>
            </div>
            <div className="text-5xl font-semibold tracking-tight text-[#111] mb-4">
              &lt; 1ms
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Data synchronizes instantly across all platforms, ensuring your team is always updated.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="idea-item flex-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Integrations</span>
            </div>
            <div className="text-5xl font-semibold tracking-tight text-[#111] mb-4">
              50+
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Seamlessly connected modules including CRM, Telegram Bot, Web, and Mobile.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
