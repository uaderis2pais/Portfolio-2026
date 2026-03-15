import { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Github, Linkedin, Terminal } from 'lucide-react';

// Scramble text utility
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+!';
const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return char;
            if (char === ' ') return ' ';
            return randomChar();
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
};

// Magnetic Button Wrapper
const MagneticButton = ({ children, className, href, ...props }) => {
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
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center magnetic-target ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export const Hero = () => {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  // Parallax setup
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const imgRotateX = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const imgRotateY = useTransform(smoothX, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    // Fake booting sequence
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
      setBootProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  // Random Glitch on full container
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (booting) return;
    const triggerGlitch = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
      setTimeout(triggerGlitch, Math.random() * 10000 + 5000); // 5-15s
    };
    const to = setTimeout(triggerGlitch, 5000);
    return () => clearTimeout(to);
  }, [booting]);

  if (booting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] font-mono text-cyan-500 z-50 fixed inset-0">
        <Terminal className="w-16 h-16 animate-pulse mb-8 opacity-80" />
        <div className="text-xl tracking-[0.3em] font-bold mb-4 animate-pulse">
          SISTEMA INICIANDO_
        </div>
        <div className="w-64 h-1 bg-cyan-900 overflow-hidden relative">
          <motion.div
            className="h-full bg-cyan-400"
            style={{ width: `${bootProgress}%` }}
          />
        </div>
        <div className="mt-4 text-xs tracking-widest text-cyan-500/50">
          CARGANDO MÓDULOS DE INTERFAZ [{Math.round(bootProgress)}%]
        </div>
      </div>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.div
        className={`container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center transition-transform duration-75 ${glitch ? 'translate-x-1 -translate-y-1 skew-x-2 filter invert-[0.1] contrast-150' : ''}`}
        style={{ perspective: 1000 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          style={{ rotateX, rotateY }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest mb-6 backdrop-blur-md">
            ESTUDIANTE DE SISTEMAS @ UADER
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tighter mix-blend-screen">
            <span className="block opacity-90"><ScrambleText text="FACUNDO" /></span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-white to-purple-500 animate-gradient-x block">
              <ScrambleText text="BAUTISTA PAIS" />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed font-mono text-sm"
          >
            &gt; Enfocado en el aprendizaje continuo y el desarrollo de soluciones tecnológicas creativas. Especialista en backend, frontend y flujos de trabajo con IA.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <MagneticButton
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-[#020617] transition-all gap-2 group z-20"
            >
              CONTÁCTAME <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <div className="flex gap-4 items-center">
              <MagneticButton href="https://github.com/uaderis2pais" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors z-20">
                <Github className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton href="https://www.linkedin.com/in/facundo-bautista-pais-1a65a62ba/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:purple-500/20 hover:text-purple-400 transition-colors z-20">
                <Linkedin className="w-5 h-5" />
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative mt-12 md:mt-0" style={{ perspective: 1000 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.5, type: "spring", damping: 15 }}
            style={{
              rotateX: imgRotateX,
              rotateY: imgRotateY
            }}
            className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-linear-to-b from-cyan-500/10 to-purple-500/10 p-1 backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.2)] group"
          >
            <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-[2.8rem] overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 mix-blend-overlay pointer-events-none" />
              <img
                src="/foto-perfil.jpg"
                alt="Facundo Pais"
                className="w-full h-full object-cover mix-blend-normal md:mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 opacity-100 md:opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-110 z-10"
              />
              <div className="hidden md:block absolute inset-0 bg-linear-to-tr from-cyan-500/30 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-500/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-500/20 blur-[80px] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};