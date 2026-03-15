import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-linear-to-tr from-cyan-500 to-purple-500 rounded-lg rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-white text-xs">F</span>
          </div>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            FACUNDO<span className="text-cyan-500">.</span>PAIS
          </span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8">
          {['home', 'about', 'skills', 'projects', 'certifications', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`}
              className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-cyan-400 ${activeSection === item ? 'text-cyan-400' : 'text-slate-400'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <motion.a 
          href="/Facundo Bautista Pais CV.pdf" 
          download="CV_Facundo_Pais.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm"
        >
          CV PDF
        </motion.a>
      </div>
    </nav>
  );
};