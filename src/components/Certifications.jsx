import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';

export const Certifications = () => {
  const certifications = [
    { title: "Cursor con Python: IA", issuer: "Santander Open Academy", year: "2025", file: "/1986_facubpais@gmail.com.pdf" },
    { title: "IA y Productividad", issuer: "Google / Santander", year: "2025", file: "/787_facubpais@gmail.com.pdf" },
    { title: "Introducción a la Ciberseguridad", issuer: "Cisco", year: "2025", file: "/2025_facubpais@gmail.com.pdf" },
    { title: "Desarrollo con IA: de 0 a Producción", issuer: "BIG school", year: "2026", file: "/JuniorCybersecurityAnalystUpdate20251125-30-hyju9v.pdf" }
  ];

  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <Award className="text-cyan-400 w-8 h-8" />
          <h2 className="text-3xl font-black uppercase tracking-tight">Certificaciones</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="p-6 rounded-2xl bg-linear-to-r from-white/5 to-transparent border-l-2 border-cyan-500 flex justify-between items-center group transition-all"
            >
              <div>
                <h3 className="font-bold text-white">{cert.title}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{cert.issuer}</p>
                <div className="text-cyan-500/50 font-mono text-xs font-bold mt-2">{cert.year}</div>
              </div>
              
              <motion.a 
                href={cert.file}
                download={cert.title}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-slate-900 cursor-pointer"
                title="Descargar Certificado"
              >
                <Download className="w-5 h-5" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};