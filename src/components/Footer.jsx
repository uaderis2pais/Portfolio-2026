import { useLanguage } from '../context/LanguageContext';
import { Contact } from './Contact';

export const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="fixed bottom-0 w-full h-[100dvh] bg-[#020617] flex flex-col items-center justify-between pt-24 md:pt-32 pb-8 md:pb-12 z-0 overflow-hidden border-t border-cyan-900/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-cyan-600/20 blur-[130px] rounded-full pointer-events-none" />
      
      {/* Scrollable container for Contact in case it's too tall */}
      <div className="w-full relative z-10 flex-1 flex flex-col overflow-y-auto no-scrollbar pointer-events-auto px-2">
        <div className="my-auto w-full">
          <Contact />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 mt-4">

        <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-cyan-500 uppercase flex items-center gap-4 text-center">
          <span className="hidden md:block w-12 h-px bg-cyan-500"></span>
          {language === 'es' ? 'SISTEMA DESPLEGADO POR FACUNDO PAIS © 2026' : 'SYSTEM DEPLOYED BY FACUNDO PAIS © 2026'}
          <span className="hidden md:block w-12 h-px bg-cyan-500"></span>
        </p>
      </div>
    </footer>
  );
};