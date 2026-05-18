import { motion } from 'framer-motion';
import { Monitor, Cpu, Brain, Layers, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IconCloud } from './IconCloud';

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "postgresql",
  "vercel",
  "docker",
  "git",
  "github",
  "figma",
  "tailwindcss",
  "vite",
  "render",
  "python",
  "wireshark",
];

export const Skills = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { language } = useLanguage();

  const skillsEs = [
    { name: "React & Frontend", level: 90, text: "Avanzado", icon: <Monitor className="w-5 h-5" /> },
    { name: "Node.js & Backend", level: 75, text: "Avanzado / Intermedio", icon: <Cpu className="w-5 h-5" /> },
    { name: "Python & Integración IA", level: 45, text: "Intermedio / Básico", icon: <Brain className="w-5 h-5" /> },
    { name: "PostgreSQL & DB", level: 70, text: "Intermedio", icon: <Layers className="w-5 h-5" /> },
    { name: "Ciberseguridad", level: 30, text: "Básico", icon: <Shield className="w-5 h-5" /> }
  ];

  const skillsEn = [
    { name: "React & Frontend", level: 90, text: "Advanced", icon: <Monitor className="w-5 h-5" /> },
    { name: "Node.js & Backend", level: 75, text: "Advanced / Intermediate", icon: <Cpu className="w-5 h-5" /> },
    { name: "Python & AI Integration", level: 45, text: "Intermediate / Basic", icon: <Brain className="w-5 h-5" /> },
    { name: "PostgreSQL & DB", level: 70, text: "Intermediate", icon: <Layers className="w-5 h-5" /> },
    { name: "Cybersecurity", level: 30, text: "Basic", icon: <Shield className="w-5 h-5" /> }
  ];

  const skills = language === 'es' ? skillsEs : skillsEn;

  return (
    <section id="skills" className="py-24 bg-white/1">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">{language === 'es' ? 'Habilidades Técnicas' : 'Hard Skills'}</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            style={{ perspective: 1000 }}
            className="flex flex-col gap-6"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: isMobile
                    ? { opacity: 0, y: 30 }
                    : { opacity: 0, scale: 0.8, rotateX: 20, rotateY: 10, filter: "blur(10px)" },
                  visible: isMobile
                    ? { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
                    : { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 12 } }
                }}
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(6, 182, 212, 0.4)", borderColor: "rgba(6, 182, 212, 0.5)" }}
                className="p-6 rounded-2xl bg-[#020617]/50 backdrop-blur-md border border-white/5 group transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      {skill.icon}
                    </div>
                    <span className="font-bold">{skill.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-sm uppercase">{skill.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                    className="h-full bg-cyan-500 relative shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative flex size-full items-center justify-center overflow-hidden min-h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)] rounded-[3rem]"
          >
            <IconCloud iconSlugs={slugs} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};