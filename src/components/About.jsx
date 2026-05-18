import { useLanguage } from '../context/LanguageContext';
import { BorderBeam } from './BorderBeam';

export const About = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "PERFIL PROFESIONAL",
      p1: "Soy Analista de Sistemas recibido y actualmente curso el 4to año de la Licenciatura en Sistemas de Información en UADER-FCYT. Me caracterizo por mi iniciativa y capacidad para resolver problemas en entornos dinámicos.",
      p2: "He desarrollado robustas aplicaciones Full Stack, como se evidencia en mis proyectos, aplicando arquitecturas modernas y priorizando la integración de IA en el flujo de trabajo. Me encuentro activamente buscando nuevos proyectos donde integrarme para seguir ampliando y perfeccionando mis conocimientos.",
      year: "4to Año",
      spanish: "Español",
      native: "Nativo",
      english: "Inglés",
      level: "Nivel B2",
      education: "Educación",
      degree: "Lic. en Sistemas",
      progress: "UADER - FCYT (En curso)",
      analystDegree: "Analista de Sistemas",
      analystProgress: "UADER - FCYT (2023 - 2026)",
      highschool: "Secundario Completo",
      school: "Inst. Sagrado Corazón"
    },
    en: {
      title: "PROFESSIONAL PROFILE",
      p1: "I am a graduated Systems Analyst, currently in my 4th year of the Information Systems Licentiate degree at UADER-FCYT. I am characterized by my initiative and ability to solve problems in dynamic environments.",
      p2: "I have developed robust Full Stack applications, as evidenced in my projects, applying modern architectures and prioritizing the integration of AI in workflows. I am actively seeking new projects to join in order to continue expanding and improving my knowledge.",
      year: "4th Year",
      spanish: "Spanish",
      native: "Native",
      english: "English",
      level: "B2 Level",
      education: "Education",
      degree: "Systems Eng.",
      progress: "UADER - FCYT (In progress)",
      analystDegree: "Systems Analyst",
      analystProgress: "UADER - FCYT (2023 - 2026)",
      highschool: "High School",
      school: "Inst. Sagrado Corazón"
    }
  };

  const t = content[language];
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">{t.title}</h2>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-cyan-400">UADER - FCYT</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">{t.year}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-purple-400">{t.spanish}</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">{t.native}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-purple-400">{t.english}</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">{t.level}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative z-10 aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 p-1 backdrop-blur-3xl shadow-[0_0_40px_rgba(6,182,212,0.15)] mx-auto w-48 md:w-full max-w-[250px] group">
                <div className="w-full h-full bg-slate-900 rounded-[1.8rem] overflow-hidden relative">
                  <img 
                    src="/foto-perfil.jpg" 
                    alt="Facundo Pais Profile" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-linear-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">{t.education}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-white text-sm">{t.degree}</p>
                    <p className="text-xs text-slate-500">{t.progress}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.analystDegree}</p>
                    <p className="text-xs text-slate-500">{t.analystProgress}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.highschool}</p>
                    <p className="text-xs text-slate-500">{t.school}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};