import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Zap, 
  Search, 
  Users, 
  Cpu, 
  Brain, 
  Scale, 
  HeartHandshake, 
  Lightbulb, 
  CheckCircle, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

export const SoftSkills = () => {
  const softSkills = [
    { name: "Comunicación Efectiva", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Pensamiento Crítico", icon: <Search className="w-5 h-5" /> },
    { name: "Resolución de Problemas", icon: <Zap className="w-5 h-5" /> },
    { name: "Trabajo en Equipo", icon: <Users className="w-5 h-5" /> },
    { name: "Iniciativa y Creatividad", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Adaptabilidad", icon: <ArrowUpRight className="w-5 h-5" /> },
    { name: "Responsabilidad", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Aprendizaje Rápido", icon: <Cpu className="w-5 h-5" /> },
    { name: "Capacidad de Negociación", icon: <Scale className="w-5 h-5" /> },
    { name: "Orientación al Servicio", icon: <HeartHandshake className="w-5 h-5" /> },
    { name: "Toma de Decisiones", icon: <CheckCircle className="w-5 h-5" /> },
    { name: "Inteligencia Emocional", icon: <Brain className="w-5 h-5" /> }
  ];

  return (
    <section id="soft-skills" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-widest">Habilidades Blandas</h2>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          style={{ perspective: 1000 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {softSkills.map((skill, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.3, rotateZ: Math.random() > 0.5 ? 15 : -15, filter: "blur(10px)" },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  rotateZ: 0, 
                  filter: "blur(0px)", 
                  transition: { type: "spring", stiffness: 150, damping: 10 } 
                }
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.1,
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderColor: 'rgba(168, 85, 247, 0.4)',
                boxShadow: "0px 10px 30px -5px rgba(168, 85, 247, 0.3)",
              }}
              className="p-6 rounded-2xl border border-white/5 bg-[#020617]/50 backdrop-blur-md flex flex-col items-center text-center gap-3 transition-colors cursor-crosshair"
            >
              <div className="text-purple-400">{skill.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};