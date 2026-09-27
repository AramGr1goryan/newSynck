"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function SynckCrm() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations('Crm');

  useGSAP(() => {
    // Exact adaptation from reference: 00:04 - 00:08
    // Cards fade in and slide up when scrolling into view
    
    const cards = gsap.utils.toArray<HTMLElement>('.crm-card');
    
    cards.forEach((card, i) => {
      // 1. Card container entrance
      gsap.fromTo(card,
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // triggers when top of card hits 85% down viewport
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Internal UI element entrance (subtle slide up inside the card)
      const uiElement = card.querySelector('.crm-ui-element');
      if (uiElement) {
        gsap.fromTo(uiElement,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2, // slightly delayed after card appears
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="crm"
      ref={containerRef} 
      className="w-full bg-[#f8f9fc] pb-32 flex justify-center z-20 relative"
    >
      <div className="w-full max-w-7xl px-6 md:px-12">
        
        {/* 2-Column CSS Grid for CRM Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Card 1: Client Pipeline (Adapts Credit Cards from reference) */}
          <div className="crm-card bg-white rounded-[40px] overflow-hidden flex flex-col items-center pt-12 px-8 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] h-[550px] relative">
            <div className="w-full max-w-sm flex flex-col gap-4 relative z-20">
              <h3 className="text-3xl md:text-[34px] font-bold tracking-tight text-[#111] leading-[1.1]">
                {t('card1_title')}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {t('card1_desc')}
              </p>
            </div>
            
            {/* UI Mockup Bottom */}
            <div className="crm-ui-element absolute bottom-0 w-[110%] h-[280px] bg-gray-50/50 rounded-t-[32px] border-t border-x border-gray-200/50 p-6 flex gap-4 overflow-hidden translate-y-[20px]">
              {/* Kanban Column 1 */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-semibold text-gray-700">{t('card1_ui_new')}</span>
                </div>
                <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-full h-3 bg-gray-200 rounded-full mb-3"></div>
                  <div className="w-2/3 h-2 bg-gray-100 rounded-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div></div>
                    <div className="text-[10px] font-bold text-gray-400">$1,200</div>
                  </div>
                </div>
                <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 opacity-50">
                  <div className="w-full h-3 bg-gray-200 rounded-full mb-3"></div>
                </div>
              </div>
              
              {/* Kanban Column 2 */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-xs font-semibold text-gray-700">{t('card1_ui_progress')}</span>
                </div>
                <div className="w-full bg-[#6657E1] p-4 rounded-2xl shadow-md transform -rotate-2 scale-105 transition-transform z-10">
                  <div className="w-full h-3 bg-white/30 rounded-full mb-3"></div>
                  <div className="w-2/3 h-2 bg-white/20 rounded-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-[#6657E1]"></div>
                    <div className="text-[10px] font-bold text-white">$4,500</div>
                  </div>
                </div>
              </div>
              
              {/* Kanban Column 3 */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-semibold text-gray-700">{t('card1_ui_closed')}</span>
                </div>
                <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-full h-3 bg-gray-200 rounded-full mb-3"></div>
                  <div className="w-1/2 h-2 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mobile Sync (Adapts Dark Phone UI from reference) */}
          <div className="crm-card bg-white rounded-[40px] overflow-hidden flex flex-col items-center pt-12 px-8 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] h-[550px] relative">
            <div className="w-full max-w-sm flex flex-col gap-4 relative z-20">
              <h3 className="text-3xl md:text-[34px] font-bold tracking-tight text-[#111] leading-[1.1]">
                {t('card2_title')}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {t('card2_desc')}
              </p>
            </div>
            
            {/* UI Mockup Bottom */}
            <div className="crm-ui-element absolute bottom-0 w-[90%] md:w-[80%] h-[240px] bg-[#1a1a1a] rounded-t-[32px] p-6 flex flex-col overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="text-[#aaa] text-[13px] font-medium tracking-wide">{t('card2_ui_status')}</div>
                <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
              </div>
              <div className="text-white text-[42px] font-bold tracking-tight mb-6">{t('card2_ui_online')}</div>
              <div className="flex gap-3">
                <div className="flex-1 h-12 bg-[#333] rounded-[16px] flex items-center justify-center text-white text-[13px] font-medium border border-[#444]">{t('card2_ui_pause')}</div>
                <div className="flex-1 h-12 bg-[#6657E1] rounded-[16px] flex items-center justify-center text-white text-[13px] font-medium shadow-[0_4px_14px_0_rgba(102,87,225,0.4)]">{t('card2_ui_force')}</div>
              </div>
            </div>
          </div>

          {/* Card 3: Analytics (Adapts Donut Chart from reference) */}
          <div className="crm-card bg-white rounded-[40px] overflow-hidden flex flex-col items-center pt-12 px-8 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] h-[550px] relative">
            <div className="w-full max-w-sm flex flex-col gap-4 relative z-20">
              <h3 className="text-3xl md:text-[34px] font-bold tracking-tight text-[#111] leading-[1.1]">
                {t('card3_title')}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {t('card3_desc')}
              </p>
            </div>
            
            {/* UI Mockup Bottom */}
            <div className="crm-ui-element absolute bottom-[-50px] w-full flex justify-center items-end">
              <div className="relative w-[300px] h-[300px]">
                {/* Donut Chart Mockup */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-xl">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f1f1" strokeWidth="15" />
                  {/* Value Track 1 (Purple) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6657E1" strokeWidth="15" strokeDasharray="180 251.2" strokeLinecap="round" className="origin-center" />
                  {/* Value Track 2 (Teal) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#40e0d0" strokeWidth="15" strokeDasharray="50 251.2" strokeDashoffset="-190" strokeLinecap="round" className="origin-center" />
                </svg>
                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                  <div className="text-[32px] font-bold text-[#111] tracking-tight">84%</div>
                  <div className="text-[12px] text-gray-400 font-medium uppercase tracking-widest">{t('card3_ui_growth')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Global Ecosystem (Adapts World Map from reference) */}
          <div className="crm-card bg-white rounded-[40px] overflow-hidden flex flex-col items-center pt-12 px-8 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] h-[550px] relative">
            <div className="w-full max-w-sm flex flex-col gap-4 relative z-20">
              <h3 className="text-3xl md:text-[34px] font-bold tracking-tight text-[#111] leading-[1.1]">
                {t('card4_title')}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {t('card4_desc')}
              </p>
            </div>
            
            {/* UI Mockup Bottom */}
            <div className="crm-ui-element absolute bottom-0 w-full h-[280px] flex justify-center items-center overflow-hidden">
              {/* Mock World Map / Nodes */}
              <div className="relative w-[120%] h-full opacity-60">
                <svg viewBox="0 0 400 200" className="w-full h-full text-gray-200" fill="currentColor">
                  {/* Simplified Dotted Map Representation (Abstract) */}
                  <circle cx="100" cy="80" r="3" />
                  <circle cx="120" cy="90" r="3" />
                  <circle cx="140" cy="70" r="3" />
                  <circle cx="160" cy="110" r="3" />
                  <circle cx="200" cy="60" r="3" />
                  <circle cx="240" cy="85" r="3" />
                  <circle cx="280" cy="120" r="3" />
                  <circle cx="320" cy="75" r="3" />
                  <circle cx="350" cy="95" r="3" />
                  
                  {/* Connection Lines */}
                  <path d="M100,80 Q130,50 160,110 T240,85 T320,75" fill="none" stroke="#6657E1" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                  <path d="M140,70 Q200,30 280,120 T350,95" fill="none" stroke="#40e0d0" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                </svg>
                
                {/* Floating Avatars/Flags */}
                <div className="absolute top-[35%] left-[25%] w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-[10px]">US</div>
                </div>
                <div className="absolute top-[50%] left-[58%] w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-red-100 flex items-center justify-center text-[10px]">UK</div>
                </div>
                <div className="absolute top-[35%] left-[80%] w-8 h-8 bg-[#6657E1] rounded-full shadow-lg border border-[#5749C9] flex items-center justify-center p-1 transform scale-110">
                  <div className="w-full h-full rounded-full flex items-center justify-center text-[10px] text-white">JP</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
