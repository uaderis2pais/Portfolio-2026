import { Mail, Globe, Send, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-12 backdrop-blur-xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">¿Trabajamos juntos?</h2>
            <p className="text-slate-400">Enviame un mensaje directo a través de este formulario.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400"><Mail className="w-4 h-4" /></div>
                <span className="text-sm font-bold">facubpais@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400"><Globe className="w-4 h-4" /></div>
                <span className="text-sm font-bold">Concepción del Uruguay, Entre Ríos</span>
              </div>
            </div>

            {status === "SUCCESS" ? (
              <div className="flex flex-col items-center justify-center p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl animate-pulse">
                <CheckCircle className="text-cyan-400 w-12 h-12 mb-4" />
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-center">¡Señal Enviada con Éxito!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input name="name" type="text" placeholder="Nombre" required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  <input name="email" type="email" placeholder="Email" required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <textarea name="message" rows="4" placeholder="Mensaje" required className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
                <MagneticSubmitButton type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  ENVIAR SEÑAL <Send className="w-4 h-4" />
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