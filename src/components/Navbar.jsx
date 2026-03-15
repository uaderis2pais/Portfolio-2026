import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'soft-skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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
          <div className="w-8 h-8 bg-linear-to-tr from-cyan-500 to-purple-500 rounded-lg rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-white text-xs">F</span>
          </div>
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
          {['home', 'about', 'skills', 'projects', 'certifications', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-cyan-400 ${activeSection === item ? 'text-cyan-400' : 'text-slate-400'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <MagneticButton 
          href="/Facundo Bautista Pais CV.pdf" 
          download="CV_Facundo_Pais.pdf"
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest hover:bg-cyan-500 hover:text-[#020617] transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        >
          CV PDF
        </MagneticButton>
      </div>
    </motion.nav>
  );
};