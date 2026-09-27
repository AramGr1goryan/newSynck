"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function TgBot() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('TgBot');

  useGSAP(() => {
    // Horizontal scroll section
    const track = trackRef.current;
    if (!track) return;
    
    // Calculate how far to translate (the scroll width minus viewport width)
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
    
    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef });

  return (
    <section 
      id="tg-bot"
      ref={containerRef} 
      className="w-full h-screen bg-[#111] text-white flex flex-col justify-center overflow-hidden relative z-20"
    >
      <div className="absolute top-24 left-6 md:left-12 z-30">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-400 text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div ref={trackRef} className="flex gap-12 w-max px-6 md:px-12 pt-32 h-full items-center">
        
        {/* Step 1: Telegram Command Input */}
        <div className="w-[350px] md:w-[450px] shrink-0 bg-[#1c1c1e] rounded-3xl p-6 border border-[#2c2c2e] shadow-2xl flex flex-col justify-end h-[400px]">
          <div className="w-full flex items-center justify-between mb-auto pb-4 border-b border-[#2c2c2e]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3390ec] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.18-5.18 3.44-.49.34-.93.5-1.33.49-.44-.01-1.28-.25-1.9-.46-.77-.25-1.37-.39-1.31-.83.03-.23.35-.46.96-.71 3.76-1.64 6.27-2.72 7.51-3.24 3.58-1.5 4.33-1.75 4.82-1.76.11 0 .35.03.48.14.11.09.14.22.15.34-.01.07-.01.21-.02.32z"/></svg>
              </div>
              <div className="font-semibold">SyncK Bot</div>
            </div>
            <div className="text-gray-500 text-sm">Bot</div>
          </div>
          
          <div className="w-full bg-[#000] p-4 rounded-xl text-white font-mono text-sm shadow-inner mb-4 flex items-center gap-2">
            <span className="text-blue-400">/add_client</span>
            <span>John Doe</span>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-[#3390ec] text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
              {t('cmd_input')}
            </div>
          </div>
        </div>

        {/* Step 2: Automation Processing */}
        <div className="w-[350px] md:w-[450px] shrink-0 bg-transparent flex flex-col items-center justify-center h-[400px]">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#3390ec] animate-[spin_4s_linear_infinite] opacity-50"></div>
            <div className="absolute w-16 h-16 rounded-full bg-[var(--color-synck-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(102,87,225,0.5)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
          </div>
          <div className="mt-8 text-[var(--color-synck-accent)] font-mono text-sm tracking-widest uppercase">
            {t('cmd_processing')}
          </div>
        </div>

        {/* Step 3: CRM Result */}
        <div className="w-[350px] md:w-[450px] shrink-0 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xl h-[400px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-synck-accent)]"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-400">JD</div>
            <div>
              <div className="text-xl font-bold text-gray-900">John Doe</div>
              <div className="text-sm text-gray-500">Added via Telegram API</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-bold">New Lead</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase">Assigned To</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-700 font-medium">Auto-Router</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm font-semibold text-gray-400">
            {t('cmd_result')}
          </div>
        </div>

      </div>
    </section>
  );
}
