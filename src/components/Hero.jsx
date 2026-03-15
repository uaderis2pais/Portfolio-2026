import { motion } from 'framer-motion';
import { ChevronRight, Github, Linkedin } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest mb-6">
            ESTUDIANTE DE SISTEMAS @ UADER
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            FACUNDO <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-white to-purple-500 animate-gradient-x">BAUTISTA PAIS</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
            Enfocado en el aprendizaje continuo y el desarrollo de soluciones tecnológicas creativas. Especialista en backend, frontend y flujos de trabajo con IA.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-cyan-500 text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2 group w-max"
            >
              CONTÁCTAME <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-4 items-center px-4">
              <a href="https://github.com/uaderis2pais" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/facundo-bautista-pais-1a65a62ba/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="relative hidden md:block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-linear-to-b from-white/5 to-transparent p-1"
          >
            <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-[2.8rem] overflow-hidden">
               <img 
                 src="/foto-perfil.jpg" 
                 alt="Facundo Pais" 
                 className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 opacity-80 hover:opacity-100" 
               />
            </div>
          </motion.div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full" />
        </div>
      </div>
    </section>
  );
};