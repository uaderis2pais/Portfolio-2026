import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Certifications = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { language } = useLanguage();

  const certificationsEs = [
    { title: "Cursor con Python: IA", issuer: "Santander Open Academy", year: "2025", file: "/1986_facubpais@gmail.com.pdf", imagePreview: "cursor con Python certificado.PNG" },
    { title: "IA y Productividad", issuer: "Google / Santander", year: "2025", file: "/787_facubpais@gmail.com.pdf", imagePreview: "IA y productividad certificado.PNG" },
    { title: "Introducción a la Ciberseguridad", issuer: "Cisco", year: "2025", file: "/I2CSUpdate20250920-30-pn0w7y.pdf", imagePreview: "Introduccion a ciberseguridad certificado.PNG" },
    { title: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco", year: "2025", file: "/JuniorCybersecurityAnalystUpdate20251125-30-hyju9v.pdf", imagePreview: "Junior ciberseguridad certificado.PNG" },
    { title: "Desarrollo con IA: de 0 a Producción", issuer: "BIG school", year: "2026", file: "/Certificado-Facundo-Baustista-Pais-f75a7a2t.pdf", imagePreview: "IA desde 0 a prodquccion certificado.PNG" },
    { title: "Ciberseguridad y Hacking Etico", issuer: "BigSchool", year: "2026", file: "/Certificado-Facundo-Baustista-Pais-orehsf8b.pdf", imagePreview: "hacking etico certificado.PNG" }
  ];

  const certificationsEn = [
    { title: "Cursor with Python: AI", issuer: "Santander Open Academy", year: "2025", file: "/1986_facubpais@gmail.com.pdf", imagePreview: "cursor con Python certificado.PNG" },
    { title: "AI and Productivity", issuer: "Google / Santander", year: "2025", file: "/787_facubpais@gmail.com.pdf", imagePreview: "IA y productividad certificado.PNG" },
    { title: "Introduction to Cybersecurity", issuer: "Cisco", year: "2025", file: "/I2CSUpdate20250920-30-pn0w7y.pdf", imagePreview: "Introduccion a ciberseguridad certificado.PNG" },
    { title: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco", year: "2025", file: "/JuniorCybersecurityAnalystUpdate20251125-30-hyju9v.pdf", imagePreview: "Junior ciberseguridad certificado.PNG" },
    { title: "AI Development: From 0 to Production", issuer: "BIG school", year: "2026", file: "/Certificado-Facundo-Baustista-Pais-f75a7a2t.pdf", imagePreview: "IA desde 0 a prodquccion certificado.PNG" },
    { title: "Cybersecurity and Ethical Hacking", issuer: "BigSchool", year: "2026", file: "/Certificado-Facundo-Baustista-Pais-orehsf8b.pdf", imagePreview: "hacking etico certificado.PNG" }
  ];

  const certifications = language === 'es' ? certificationsEs : certificationsEn;

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <Award className="text-cyan-400 w-12 h-12" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{language === 'es' ? 'Certificaciones' : 'Certificates'}</h2>
          <p className="text-slate-400 text-sm max-w-xl">{language === 'es' ? 'Reconocimientos formales y credenciales en tecnologías de vanguardia.' : 'Formal recognitions and credentials in cutting-edge technologies.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-[#020617]/80 border border-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-colors shadow-2xl flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={cert.imagePreview}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                {/* Cyber overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#020617]/80 backdrop-blur-md rounded-full border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                  {cert.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between relative z-10 -mt-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-black">{cert.issuer}</p>
                </div>

                <div className="mt-8 flex justify-end">
                  <motion.a
                    href={cert.file}
                    download={cert.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    title={language === 'es' ? 'Descargar Certificado' : 'Download Certificate'}
                  >
                    <span>{language === 'es' ? 'Descargar' : 'Download'}</span> <Download className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};