"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC and Resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', window.location.pathname);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Account for fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-[60] bg-[#0A0A0A] rounded-[40px] px-6 md:px-8 py-4 md:py-5 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-2">
          <a 
            href="#" 
            onClick={(e) => handleScroll(e, 'top')} 
            className="text-xl font-medium tracking-tight text-white flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-lg"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
               <div className="w-2.5 h-2.5 bg-[#0A0A0A] rounded-full -translate-x-[2px] -translate-y-[2px]"></div>
            </div>
            SyncK
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-300 text-[15px] font-medium">
          <a href="#crm" onClick={(e) => handleScroll(e, 'crm')} className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-md px-2 py-1">{t('crm')}</a>
          <a href="#tg-bot" onClick={(e) => handleScroll(e, 'tg-bot')} className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-md px-2 py-1">{t('bot')}</a>
          <a href="#business" onClick={(e) => handleScroll(e, 'business')} className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-md px-2 py-1">{t('business')}</a>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex gap-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            <Link href={pathname} locale="en" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-sm px-1">EN</Link>
            <Link href={pathname} locale="ru" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-sm px-1">RU</Link>
            <Link href={pathname} locale="hy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-synck-accent)] rounded-sm px-1">HY</Link>
          </div>
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, 'contact')}
            className="hidden md:block bg-white text-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-95"
          >
            {t('cta')}
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-[70]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute top-24 left-4 right-4 bg-[#111] border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex flex-col gap-4 text-center text-lg font-medium text-white">
              <a href="#crm" onClick={(e) => handleScroll(e, 'crm')} className="py-2 active:text-[var(--color-synck-accent)]">{t('crm')}</a>
              <div className="w-full h-px bg-gray-800"></div>
              <a href="#tg-bot" onClick={(e) => handleScroll(e, 'tg-bot')} className="py-2 active:text-[var(--color-synck-accent)]">{t('bot')}</a>
              <div className="w-full h-px bg-gray-800"></div>
              <a href="#business" onClick={(e) => handleScroll(e, 'business')} className="py-2 active:text-[var(--color-synck-accent)]">{t('business')}</a>
            </div>
            
            <div className="flex justify-center gap-6 text-sm font-semibold text-gray-400 uppercase tracking-widest mt-4">
              <Link href={pathname} locale="en" onClick={() => setIsOpen(false)} className="active:text-white">EN</Link>
              <Link href={pathname} locale="ru" onClick={() => setIsOpen(false)} className="active:text-white">RU</Link>
              <Link href={pathname} locale="hy" onClick={() => setIsOpen(false)} className="active:text-white">HY</Link>
            </div>
            
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')}
              className="mt-2 w-full text-center bg-white text-black px-6 py-4 rounded-full text-base font-bold hover:bg-gray-100 active:scale-95 transition-all"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
