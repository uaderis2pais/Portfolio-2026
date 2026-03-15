import { motion } from 'framer-motion';
import { Monitor, Cpu, Brain, Layers, Shield } from 'lucide-react';

export const Skills = () => {
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 group">
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
                  transition={{ duration: 1 }}
                  className="h-full bg-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};