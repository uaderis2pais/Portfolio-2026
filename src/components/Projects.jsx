import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Crosshair, Zap, ChevronLeft, ChevronRight, X, Maximize2, CheckCircle, Smartphone, Globe, Shield, Terminal, Code2, Database, ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BorderBeam } from './BorderBeam';
import { InteractiveHoverButton } from './InteractiveHoverButton';

const ProjectCarousel = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!gallery || gallery.length <= 1 || isHovered || isFullscreen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [gallery?.length, isHovered, isFullscreen]);

  const nextSlide = (e) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % gallery.length); };
  const prevSlide = (e) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length); };

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div
        className="aspect-square md:aspect-[4/3] lg:aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden relative group shadow-2xl shadow-cyan-900/10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFullscreen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            src={gallery[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover mix-blend-normal md:mix-blend-luminosity md:opacity-60 md:group-hover:mix-blend-normal md:group-hover:opacity-100 transition-all duration-700 pointer-events-none absolute inset-0"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

        <button className="absolute top-4 right-4 p-2.5 lg:p-3 bg-black/50 text-white rounded-xl opacity-0 group-hover:opacity-100 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-20 backdrop-blur-md">
          <Maximize2 className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>

        {gallery.length > 1 && (
          <>
            {/* Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center z-10">
              <button
                onClick={prevSlide}
                className="p-2 lg:p-3 rounded-full bg-[#020617]/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-cyan-500 hover:text-black transition-all -translate-x-4 group-hover:translate-x-0 backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center z-10">
              <button
                onClick={nextSlide}
                className="p-2 lg:p-3 rounded-full bg-[#020617]/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-cyan-500 hover:text-black transition-all translate-x-4 group-hover:translate-x-0 backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`transition-all duration-300 rounded-full h-1.5 ${idx === currentIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 p-4 text-white/50 hover:text-cyan-400 z-[110] transition-colors"
            >
              <X className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>

            <div
              className="relative w-full max-w-7xl aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden bg-black/50 shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={gallery[currentIndex]}
                  alt={`Slide ${currentIndex} Fullscreen`}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </AnimatePresence>

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 lg:p-6 rounded-full bg-black/40 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all backdrop-blur-md z-10"
                  >
                    <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 lg:p-6 rounded-full bg-black/40 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all backdrop-blur-md z-10"
                  >
                    <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
                  </button>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/50 px-8 py-4 rounded-full backdrop-blur-xl border border-white/5">
                    {gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                        className={`transition-all duration-300 rounded-full h-2.5 ${idx === currentIndex
                          ? "w-12 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)]"
                          : "w-3 bg-white/30 hover:bg-white/80"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Projects = () => {
  const { language } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const projectsEs = [
    {
      id: "amargo-y-dulce",
      title: "Amargo y Dulce",
      category: "E-Commerce Full Stack",
      desc: "Plataforma e-commerce integral desarrollada para digitalizar la gestión y ventas de una chocolatería artesanal. Incluye roles de cliente (shopping, carrito, reseñas) y administrador (inventario, envíos, promociones).",
      architecture: "Arquitectura Headless (Cliente-Servidor desacoplados). Frontend SPA optimizado con React, Vite y TailwindCSS. Backend asíncrono y robusto sustentado sobre Node.js y Express (API RESTful).",
      goal: "Crear una solución escalable que descentralice la lógica de negocio en el Backend, asegurando transacciones fluidas y mejorando radicalmente la experiencia de compra tradicional.",
      challenges: "Abstracción de ORMs utilizando direct driver (@neondatabase/serverless) con Raw SQL y Triggers nativos en PostgreSQL para orquestación atómica. Integración de Mercado Pago SDK webhooks y Google OAuth 2.0.",
      features: [
        "Autenticación Híbrida JWT & Google OAuth 2.0",
        "Orquestación Atómica con Triggers SQL nativos (Neon DB Serverless)",
        "Webhooks asíncronos integrados al SDK de Mercado Pago",
        "Correos transaccionales automatizados vía Nodemailer",
        "Panel Administrativo integral para ABM y Logística"
      ],
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Raw SQL", "Mercado Pago", "OAuth"],
      image: "/amargo-dulce.jpg",
      gallery: [
        "/homeAyD.PNG",
        "/carritoAyD.PNG",
        "/LoginAyD.PNG",
        "/tiendaAyD.PNG"
      ],
      status: "completed", // Mostrará botón gris y badge "Próximamente"
      link: "https://amargo-y-dulce-ktu3.vercel.app/"
    },
    {
      id: "agarrame-como-puedas",
      title: "Agarrame como puedas",
      category: "Frontend Dev",
      desc: "Landing page interactiva desarrollada para un negocio real con React y optimizada para rendimiento y SEO. Presenta una experiencia inmersiva para los usuarios.",
      architecture: "Single Page Application (SPA) ultra-optimizada utilizando React v18 y Vite. Estilizado profundo con TailwindCSS para garantizar rendimiento perfecto (+90 Lighthouse score).",
      goal: "Crear una presencia digital de altísimo impacto visual para captar la atención de clientes retail, enfocándose en velocidad de carga extrema y SEO técnico.",
      challenges: "Balancear animaciones visuales complejas con la carga de assets pesados asincrónicamente sin comprometer el First Contentful Paint ni generar Cumulative Layout Shift.",
      tags: ["React", "Vite", "TailwindCSS", "SEO"],
      image: "/homeACP.PNG",
      gallery: [
        "/homeACP.PNG",
        "/panelACP.PNG",
        "/ventasACP.PNG"
      ],
      status: "completed",
      link: "https://acp-landing-page.vercel.app/"
    },
    {
      id: "pet",
      title: "PET Program",
      category: "Social Impact / EdTech",
      desc: "Programa estructurado de enseñanza de habilidades digitales que busca la alfabetización tecnológica fundamental.",
      architecture: "Metodología ágil aplicada a la educación comunitaria. Simuladores virtuales de desarrollo y entornos interactivos basados en navegador.",
      goal: "Reducir la brecha tecnológica y fomentar el pensamiento computacional en jóvenes en estado de vulnerabilidad socioeconómica.",
      challenges: "Adaptar arquitecturas lógicas de programación compleja en micro-módulos inmersivos para plataformas con conectividad intermitente.",
      tags: ["Impacto Social", "Mentoría", "Design Thinking", "Tech Basics"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      gallery: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
      ],
      status: "info-only", // Nueva lógica: No mostrará ningún botón
      link: null
    }
  ];

  const projectsEn = [
    {
      id: "amargo-y-dulce",
      title: "Amargo y Dulce",
      category: "Full Stack E-Commerce",
      desc: "Comprehensive e-commerce platform developed to digitize the management and sales of an artisanal chocolate shop. Includes client roles (shopping, cart, reviews) and administrator roles (inventory, shipping, promotions).",
      architecture: "Headless Architecture (Decoupled Client-Server). SPA Frontend optimized with React, Vite, and TailwindCSS. Asynchronous and robust Backend based on Node.js and Express (RESTful API).",
      goal: "Create a scalable solution that decentralizes business logic in the Backend, ensuring fluid transactions and radically improving the traditional shopping experience.",
      challenges: "Abstraction of ORMs using direct driver (@neondatabase/serverless) with Raw SQL and native Triggers in PostgreSQL for atomic orchestration. Integration of Mercado Pago SDK webhooks and Google OAuth 2.0.",
      features: [
        "Hybrid Authentication JWT & Google OAuth 2.0",
        "Atomic Orchestration with native SQL Triggers (Neon DB Serverless)",
        "Asynchronous Webhooks integrated into Mercado Pago SDK",
        "Automated transactional emails via Nodemailer",
        "Comprehensive Administrative Panel for CRUD and Logistics"
      ],
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Raw SQL", "Mercado Pago", "OAuth"],
      image: "/amargo-dulce.jpg",
      gallery: [
        "/homeAyD.PNG",
        "/carritoAyD.PNG",
        "/LoginAyD.PNG",
        "/tiendaAyD.PNG"
      ],
      status: "completed",
      link: "https://amargo-y-dulce-ktu3.vercel.app/"
    },
    {
      id: "agarrame-como-puedas",
      title: "Agarrame como puedas",
      category: "Frontend Dev",
      desc: "Interactive landing page developed for a real business with React and optimized for performance and SEO. Presents an immersive experience for users.",
      architecture: "Ultra-optimized Single Page Application (SPA) using React v18 and Vite. Deep styling with TailwindCSS to guarantee perfect performance (+90 Lighthouse score).",
      goal: "Create a high visual impact digital presence to capture the attention of retail clients, focusing on extreme loading speed and technical SEO.",
      challenges: "Balance complex visual animations with asynchronous loading of heavy assets without compromising First Contentful Paint or generating Cumulative Layout Shift.",
      tags: ["React", "Vite", "TailwindCSS", "SEO"],
      image: "/homeACP.PNG",
      gallery: [
        "/homeACP.PNG",
        "/panelACP.PNG",
        "/ventasACP.PNG"
      ],
      status: "completed",
      link: "https://acp-landing-page.vercel.app/"
    },
    {
      id: "pet",
      title: "PET Program",
      category: "Social Impact / EdTech",
      desc: "Structured teaching program for digital skills seeking fundamental technological literacy.",
      architecture: "Agile methodology applied to community education. Virtual development simulators and interactive browser-based environments.",
      goal: "Reduce the technological gap and foster computational thinking in young people in states of socioeconomic vulnerability.",
      challenges: "Adapt complex programming logic architectures into immersive micro-modules for platforms with intermittent connectivity.",
      tags: ["Social Impact", "Mentoring", "Design Thinking", "Tech Basics"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      gallery: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
      ],
      status: "info-only",
      link: null
    }
  ];

  const projects = language === 'es' ? projectsEs : projectsEn;

  return (
    <section id="projects" className="py-32 relative text-white bg-[#020617]">
      <div className="container mx-auto px-6 mb-24 z-10 relative">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mix-blend-screen bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-purple-500 inline-block mb-4">
          {language === 'es' ? 'PROYECTOS' : 'PROJECTS'}
        </h2>
        <p className="text-slate-400 font-mono text-sm max-w-xl">
          {language === 'es' ? 'Análisis de arquitecturas profundas, desafíos resueltos y escalabilidad en mis casos de estudio destacados.' : 'Analysis of deep architectures, resolved challenges, and scalability in my outstanding case studies.'}
        </p>
      </div>

      <div className="flex flex-col gap-32 relative z-10 w-full overflow-hidden">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="w-full relative py-16 border-y border-white/5 bg-linear-to-b from-white/[0.02] to-transparent backdrop-blur-sm"
          >
            <div className="container mx-auto px-6">

              {/* Header del Proyecto */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase bg-cyan-500/10 px-4 py-1 rounded-full border border-cyan-500/20">
                      0{i + 1} // {project.category}
                    </span>
                    {project.status === 'soon' && (
                      <span className="text-[10px] font-black text-cyan-400/80 uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full">
                        {language === 'es' ? 'En Desarrollo' : 'In Development'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

                {/* Lado Izquierdo: Multimedia expansiva (Span 8) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <ProjectCarousel gallery={project.gallery} />

                  {/* Features Clave Horizontal */}
                  {project.features && (
                    <div className="mt-4">
                      <h4 className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 pl-2">
                        <CheckCircle className="w-5 h-5" /> {language === 'es' ? 'Especificaciones Principales' : 'Key Specifications'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="bg-[#020617]/60 border border-white/5 shadow-lg backdrop-blur-md rounded-xl p-4 flex items-start gap-3 hover:border-cyan-500/30 transition-colors">
                            <span className="text-cyan-500 mt-0.5 text-lg leading-none">▹</span>
                            <p className="text-xs text-slate-300 font-mono leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Lado Derecho: Terminal de Especificaciones (Span 4) */}
                <div className="lg:col-span-4 flex flex-col items-stretch">
                  <div className="p-8 md:p-10 rounded-3xl bg-[#020617]/60 border border-white/5 backdrop-blur-2xl shadow-xl shadow-cyan-900/5 h-full flex flex-col flex-grow relative overflow-hidden z-0">
                    <BorderBeam duration={12} borderWidth={2} className="opacity-60" />

                    <p className="text-xl text-slate-300 font-bold leading-relaxed mb-10 border-l-2 border-cyan-500 pl-4 relative z-10">
                      {project.desc}
                    </p>

                    <div className="space-y-8 flex-1">
                      {/* Arquitectura */}
                      <div>
                        <h4 className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">
                          <Layers className="w-4 h-4" /> {language === 'es' ? 'Arquitectura_' : 'Architecture_'}
                        </h4>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed">
                          {project.architecture}
                        </p>
                      </div>

                      {/* Objetivo */}
                      <div>
                        <h4 className="flex items-center gap-2 text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-3">
                          <Crosshair className="w-4 h-4" /> {language === 'es' ? 'Objetivo_' : 'Goal_'}
                        </h4>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed">
                          {project.goal}
                        </p>
                      </div>

                      {/* Desafíos */}
                      <div>
                        <h4 className="flex items-center gap-2 text-[10px] font-mono text-[#f59e0b] uppercase tracking-widest mb-3">
                          <Zap className="w-4 h-4" /> {language === 'es' ? 'Desafíos de Ingeniería_' : 'Engineering Challenges_'}
                        </h4>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed">
                          {project.challenges}
                        </p>
                      </div>

                    </div>

                    {/* Stack Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-10 mb-10">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white/5 text-white/80 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors cursor-crosshair">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Container At Bottom */}
                    <div className="mt-auto pt-8 border-t border-white/10">
                      {project.status === 'soon' && (
                        <button
                          disabled
                          className="w-full py-5 bg-[#020617] text-slate-500 font-black uppercase tracking-[0.3em] rounded-2xl cursor-not-allowed flex items-center justify-center gap-3 text-xs border border-dashed border-white/10"
                        >
                          {language === 'es' ? 'EN PROCESO' : 'WORK IN PROGRESS'} <ExternalLink className="w-4 h-4 opacity-50" />
                        </button>
                      )}

                      {project.status === 'completed' && (
                        <InteractiveHoverButton
                          as="a"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs"
                        >
                          {language === 'es' ? 'VISITAR EL SITIO' : 'VISIT SITE'}
                        </InteractiveHoverButton>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};