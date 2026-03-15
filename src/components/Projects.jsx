import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      id: "amargo-y-dulce",
      title: "Amargo y Dulce (E-commerce)",
      category: "Full Stack Development",
      desc: "Sistema integral de comercio electrónico con simulación de clientes reales. Desarrollo de backend, frontend y base de datos desde cero.",
      tags: ["React", "Node.js", "PostgreSQL", "Express"],
      image: "/amargo-dulce.jpg",
      status: "soon", // Mostrará botón gris y badge "Próximamente"
      link: "#"
    },
    {
      id: "pet",
      title: "PET - Prácticas Educativas",
      category: "Social Impact / Education",
      desc: "Enseñanza de habilidades digitales básicas a jóvenes, logrando la incorporación de herramientas tecnológicas esenciales.",
      tags: ["Mentoría", "Herramientas Digitales", "Impacto Social"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      status: "info-only", // Nueva lógica: No mostrará ningún botón
      link: null
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-left">
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter text-white">Proyectos Destacados</h2>
          <p className="text-slate-500">Aplicando metodologías colaborativas y desarrollo integral.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto" style={{ perspective: 1500 }}>
          {projects.map((project, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8, rotateX: 30, rotateY: (i % 2 === 0 ? -30 : 30), z: -300, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, z: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                rotateY: (i % 2 === 0 ? -2 : 2),
                boxShadow: "0px 20px 60px -15px rgba(6, 182, 212, 0.5)",
                borderColor: "rgba(6, 182, 212, 0.6)"
              }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#020617]/40 backdrop-blur-2xl transition-colors hover:border-cyan-500/50 flex flex-col shadow-2xl"
            >
              
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${project.status === 'soon' ? 'grayscale opacity-50' : ''}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                
                {project.status === 'soon' && (
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/40 backdrop-blur-md rounded-full">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Próximamente</span>
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <span className="text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase">{project.category}</span>
                <h3 className="text-2xl font-black mt-2 mb-4 text-white">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed h-16 line-clamp-3">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/60 border border-white/5 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Lógica Condicional de Botones */}
                <div className="mt-auto">
                  {project.status === 'soon' && (
                    <button 
                      disabled
                      className="w-full py-4 bg-slate-800 text-slate-500 font-bold uppercase tracking-[0.2em] rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-xs border border-white/5"
                    >
                      Visitar <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  {project.status === 'completed' && (
                    <a 
                      href={project.link}
                      className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      Visitar Proyecto <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {/* Si es 'info-only' (PET), no renderiza nada aquí, dejando la card limpia */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};