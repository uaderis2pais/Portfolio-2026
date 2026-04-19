import { Mail, Globe, Send, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { BorderBeam } from './BorderBeam';

// Magnetic Submit Button Wrapper
const MagneticSubmitButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Reducido a 0.1 para que no se salga de los límites de la tarjeta de form
    setPosition({ x: middleX * 0.22, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative magnetic-target ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Contact = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mnjgbjwj", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <section id="contact" className="py-4 md:py-10 relative overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl md:rounded-[2.5rem] p-5 md:p-12 backdrop-blur-xl relative overflow-hidden">
          <BorderBeam duration={12} borderWidth={2} className="opacity-50" />
          
          <div className="text-center mb-8 md:mb-12 relative z-10 break-words">
            <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 uppercase tracking-tighter">{language === 'es' ? '¿Trabajamos juntos?' : 'Shall we work together?'}</h2>
            <p className="text-slate-400 text-xs md:text-base">{language === 'es' ? 'Enviame un mensaje directo a través de este formulario.' : 'Send me a direct message through this form.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
            <div className="flex flex-col gap-4 md:gap-6 justify-center">
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400"><Mail className="w-4 h-4" /></div>
                <span className="text-xs md:text-sm font-bold truncate">facubpais@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400"><Globe className="w-4 h-4" /></div>
                <span className="text-xs md:text-sm font-bold truncate">Entre Ríos, Argentina</span>
              </div>
            </div>

            {status === "SUCCESS" ? (
              <div className="flex flex-col items-center justify-center p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl animate-pulse">
                <CheckCircle className="text-cyan-400 w-12 h-12 mb-4" />
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-center">{language === 'es' ? '¡Señal Enviada con Éxito!' : 'Signal Successfully Sent!'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input name="name" type="text" placeholder={language === 'es' ? 'Nombre' : 'Name'} required className="w-full text-sm px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  <input name="email" type="email" placeholder="Email" required className="w-full text-sm px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <textarea name="message" rows="4" placeholder={language === 'es' ? 'Mensaje' : 'Message'} required className="w-full text-sm px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
                <MagneticSubmitButton type="submit" className="w-full text-xs md:text-sm py-4 bg-white text-black font-black uppercase tracking-[0.1em] md:tracking-[0.2em] rounded-xl md:rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  {language === 'es' ? 'ENVIAR SEÑAL' : 'TRANSMIT SIGNAL'} <Send className="w-4 h-4" />
                </MagneticSubmitButton>
                {status === "ERROR" && <p className="text-red-400 text-xs text-center mt-2">Error al enviar. Intentá de nuevo.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};