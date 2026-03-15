import { motion } from 'framer-motion';
import { Monitor, Cpu, Brain, Layers, Shield } from 'lucide-react';

export const Skills = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const skills = [
    { name: "React & Frontend", level: 90, icon: <Monitor className="w-5 h-5" /> },
    { name: "Node.js & Backend", level: 75, icon: <Cpu className="w-5 h-5" /> },
    { name: "Python & IA Integration", level: 45, icon: <Brain className="w-5 h-5" /> },
    { name: "PostgreSQL & DB", level: 70, icon: <Layers className="w-5 h-5" /> },
    { name: "Ciberseguridad", level: 30, icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <section id="skills" className="py-24 bg-white/1">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Habilidades Técnicas</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>

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
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: isMobile 
                  ? { opacity: 0, y: 30 } 
                  : { opacity: 0, scale: 0.5, rotateX: 45, rotateY: 45, filter: "blur(20px)" },
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
                <span className="text-cyan-400 font-mono text-sm">{skill.level}%</span>
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
      </div>
    </section>
  );
};