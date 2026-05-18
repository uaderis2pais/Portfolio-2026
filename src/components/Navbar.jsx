import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ScrollProgress } from './ScrollProgress';

// Magnetic Button Wrapper specifically for Navbar element
const MagneticButton = ({ children, className, href, download, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.a
      href={href}
      download={download}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`magnetic-target ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check if user is at the bottom of the page for 'contact'
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Normal scroll spy for scrolling sections
      const sections = ['home', 'about', 'projects', 'skills', 'soft-skills', 'certifications'];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Threshold of 200px from top to trigger section change
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'contact') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      setActiveSection('contact');
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  // Random glitch for the logo
  const [glitchTitle, setGlitchTitle] = useState(false);
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 200);
      setTimeout(triggerGlitch, Math.random() * 8000 + 4000); 
    };
    const to = setTimeout(triggerGlitch, 3000);
    return () => clearTimeout(to);
  }, []);

  return (
    <motion.nav 
      initial={{ backgroundColor: 'rgba(2, 6, 23, 0)', backdropFilter: 'blur(0px)', paddingTop: '2rem', paddingBottom: '2rem' }}
      animate={{ 
        backgroundColor: scrolled ? 'rgba(2, 6, 23, 0.8)' : 'rgba(2, 6, 23, 0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottomColor: scrolled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
        paddingTop: scrolled ? '1rem' : '2rem',
        paddingBottom: scrolled ? '1rem' : '2rem'
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 border-b border-transparent"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-black tracking-tighter flex items-center gap-2 transition-transform ${glitchTitle ? 'scale-110 skew-x-3 filter invert-[0.1]' : ''}`}
        >
          <img src="/logo.svg" alt="FP Logo" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 relative">
            FACUNDO<span className="text-cyan-500">.</span>PAIS
            {glitchTitle && (
              <span className="absolute top-0 left-[2px] text-red-500 mix-blend-screen opacity-70">
                FACUNDO<span className="text-cyan-500">.</span>PAIS
              </span>
            )}
            {glitchTitle && (
              <span className="absolute top-[1px] -left-[2px] text-blue-500 mix-blend-screen opacity-70">
                FACUNDO<span className="text-cyan-500">.</span>PAIS
              </span>
            )}
          </span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8">
          {['about', 'projects', 'skills', 'certifications', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                item === 'contact' 
                  ? 'text-white hover:text-white' 
                  : activeSection === item 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="text-[10px] md:text-xs font-bold tracking-widest border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors uppercase"
            title="Switch Language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          
          <MagneticButton 
            href="/Facundo Bautista Pais CV.pdf" 
            download="CV_Facundo_Pais.pdf"
            className="px-4 py-1.5 md:px-6 md:py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold tracking-widest hover:bg-cyan-500 hover:text-[#020617] transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          >
            {t('hero.cvBtn').split(' ')[0]} {/* Quick hack para solo mostrar EXTRAER o EXTRACT */}
          </MagneticButton>
        </div>
      </div>
      <ScrollProgress />
    </motion.nav>
  );
};