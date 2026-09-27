"use client";

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations('Hero');
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // --- INITIAL ENTRANCE ---
    const tl = gsap.timeline();
    
    tl.fromTo('.scene-1-title', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(['.scene-1-subtitle', '.scene-1-buttons'], 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 },
      "-=1.1"
    )
    .fromTo('.phone-dark-wrapper', 
      { y: '30vh', opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=1.0"
    )
    .fromTo('.phone-light-wrapper', 
      { y: '40vh', opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=1.3"
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
      className="relative w-full h-[100svh] min-h-[800px] overflow-hidden bg-white"
    >
        {/* SCENE 1 */}
        <div className="absolute inset-0 flex flex-col items-center z-10 pt-[18vh] md:pt-[20vh]">
          
          {/* Concentric Circles Background */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vw] md:w-[130vw] md:h-[130vw] rounded-full border border-gray-50 bg-[#fafafa] -z-10"></div>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[100vw] md:h-[100vw] rounded-full border border-gray-100 bg-[#fdfdfd] -z-10"></div>
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] rounded-full border border-gray-100 bg-white -z-10 shadow-[0_0_100px_rgba(255,255,255,1)]"></div>

          {/* Text Content Block */}
          <div className="w-full flex flex-col items-center flex-shrink-0 relative z-20 px-4 pointer-events-auto">
            <h1 className="scene-1-title text-[11vw] sm:text-6xl md:text-[80px] lg:text-[85px] leading-[0.9] font-bold tracking-tight text-center max-w-5xl text-[#111]">
              {t('title1_line1')}<br/>
              {t('title1_line2')}
            </h1>
            
            <p className="scene-1-subtitle mt-4 md:mt-5 text-[12px] md:text-sm text-gray-400 max-w-xl text-center font-medium">
              {t('subtitle1')}
            </p>
            
            <div className="scene-1-buttons mt-8 flex items-center justify-center gap-4">
              <button 
                onClick={() => handleScroll('contact')}
                className="bg-white text-[#111] px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-gray-50 transition-colors border border-gray-100 shadow-[0_4px_14px_0_rgba(0,0,0,0.03)] focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                {t('btn1')}
              </button>
              <button 
                onClick={() => handleScroll('crm')}
                className="bg-[#6657E1] text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-[#5749C9] transition-colors shadow-[0_4px_14px_0_rgba(102,87,225,0.3)] focus:outline-none focus:ring-4 focus:ring-[var(--color-synck-accent)]"
              >
                {t('btn2')}
              </button>
            </div>
          </div>

          {/* Phones Container - Flat 2D Side-by-Side */}
          <div className="relative w-full flex-1 mt-12 md:mt-14 flex justify-center z-10 min-h-[500px]">
            
            {/* Dark Phone Wrapper (for GSAP animation) */}
            <div className="phone-dark-wrapper absolute inset-0 w-full h-full flex justify-center pointer-events-none">
              {/* Dark UI Mockup (Front/Left) */}
              <div 
                className="phone-dark absolute top-0 left-1/2 -translate-x-[95%] md:-translate-x-[90%] z-20 w-[50%] md:w-[360px] aspect-[1/2.05] bg-[#0A0A0A] rounded-[40px] md:rounded-[50px] border-[5px] md:border-[7px] border-[#333] shadow-[30px_0_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden pointer-events-auto flex flex-col items-center"
              >
                {/* Rainbow Wavy Background Effect */}
                <div 
                  className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 100% 0%, rgba(255,0,128,0.2) 0%, transparent 60%),
                      radial-gradient(circle at 0% 100%, rgba(0,255,255,0.2) 0%, transparent 60%),
                      repeating-radial-gradient(circle at top right, transparent, transparent 15px, rgba(255,255,255,0.05) 15px, rgba(255,255,255,0.05) 16px),
                      repeating-radial-gradient(circle at bottom left, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)
                    `
                  }}
                ></div>

                {/* Dynamic Island */}
                <div className="w-[85px] h-[26px] bg-black rounded-full mt-3 flex justify-between items-center px-2.5 z-30 shadow-md">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#111]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-green-900/50 flex justify-center items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                </div>

                {/* Phone Content */}
                <div className="w-full h-full p-5 flex flex-col gap-4 -mt-6 z-10 relative">
                  <div className="flex items-center gap-2.5 mt-8">
                     <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover"/></div>
                     <div className="text-white text-[13px] font-medium">Dhimas Mohammed <span className="text-gray-500 text-[10px]">v</span></div>
                  </div>
                  <div className="text-[#aaa] text-[12px] mt-4 font-medium tracking-wide">Available on card</div>
                  <div className="text-white text-[38px] font-bold tracking-tight -mt-1">$90,570.10</div>
                  
                  <div className="mt-4">
                    <div className="text-[#aaa] text-[12px] flex justify-between font-medium tracking-wide mb-1.5">
                      <span>Transfer limits</span><span className="text-gray-400">$15,000.00</span>
                    </div>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="w-[60%] h-full bg-gradient-to-r from-teal-400 to-cyan-300"></div>
                    </div>
                    <div className="text-[#aaa] text-[11px] mt-2">Spent $11,330.00</div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[85%] flex gap-3 z-10">
                   <div className="flex-1 h-12 bg-[#1A1A1A]/80 backdrop-blur-md rounded-[18px] flex items-center justify-center text-white text-[13px] font-medium gap-2 border border-[#333]"><span className="w-3.5 h-3.5 border border-white/40 rounded-[4px] block relative"><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span></span> Top Up</div>
                   <div className="flex-1 h-12 bg-[#1A1A1A]/80 backdrop-blur-md rounded-[18px] flex items-center justify-center text-white text-[13px] font-medium gap-2 border border-[#333]"><span className="w-3.5 h-3.5 border border-white/40 rounded-[4px] block"></span> Pay</div>
                </div>
              </div>
            </div>

            {/* Light Phone Wrapper (for GSAP animation) */}
            <div className="phone-light-wrapper absolute inset-0 w-full h-full flex justify-center pointer-events-none">
              {/* Light UI Mockup (Back/Right) */}
              <div 
                className="phone-light absolute top-[8%] left-1/2 -translate-x-[10%] md:-translate-x-[5%] z-10 w-[50%] md:w-[360px] aspect-[1/2.05] bg-white rounded-[40px] md:rounded-[50px] border-[5px] md:border-[7px] border-gray-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto flex flex-col items-center"
              >
                {/* Dynamic Island */}
                <div className="w-[85px] h-[26px] bg-black rounded-full mt-3 flex justify-between items-center px-2.5 z-30 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#111]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-green-900/50 flex justify-center items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                </div>

                {/* Phone Content */}
                <div className="w-full h-full p-6 flex flex-col gap-4 -mt-6 z-10 relative">
                  <div className="flex justify-between items-center w-full mt-8">
                    <div className="w-6 h-6 text-gray-400 font-bold flex items-center justify-center text-lg">{"<"}</div>
                    <div className="text-[15px] font-bold text-gray-800">Activities</div>
                    <div className="w-6 h-6 text-gray-400 font-bold flex items-center justify-center text-lg">...</div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                     <div className="flex flex-col">
                        <div className="text-gray-400 text-[13px] font-medium">Your Spent</div>
                        <div className="text-[32px] font-bold tracking-tight text-gray-900 leading-none mt-1">$11,330.00</div>
                     </div>
                     <div className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[11px] text-gray-600 font-medium">This month v</div>
                  </div>

                  {/* Mock Chart Area */}
                  <div className="w-full flex-1 mt-6 relative flex justify-center overflow-hidden">
                     <div className="absolute bottom-[-20px] w-64 h-64 rounded-full border-[40px] border-[#6657E1] border-r-cyan-300 border-b-transparent border-l-[#6657E1] rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </section>
  );
}
