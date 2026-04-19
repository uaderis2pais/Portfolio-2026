import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "PERFIL PROFESIONAL",
      p1: "Actualmente cursando el 4to año de la Licenciatura en Sistemas de Información en UADER-FCYT. Me caracterizo por mi iniciativa y capacidad para resolver problemas en entornos dinámicos.",
      p2: "He colaborado en proyectos académicos aplicando arquitecturas modernas, priorizando la integración de IA en el flujo de trabajo para maximizar la productividad y calidad del código.",
      year: "4to Año",
      spanish: "Español",
      native: "Nativo",
      english: "Inglés",
      level: "Nivel B2",
      education: "Educación",
      degree: "Lic. en Sistemas",
      progress: "UADER - FCYT (En curso)",
      highschool: "Secundario Completo",
      school: "Inst. Sagrado Corazón"
    },
    en: {
      title: "PROFESSIONAL PROFILE",
      p1: "Currently in my 4th year of Information Systems Engineering at UADER-FCYT. I am characterized by my initiative and ability to solve problems in dynamic environments.",
      p2: "I have collaborated on academic projects applying modern architectures, prioritizing the integration of AI in workflows to maximize productivity and code quality.",
      year: "4th Year",
      spanish: "Spanish",
      native: "Native",
      english: "English",
      level: "B2 Level",
      education: "Education",
      degree: "Systems Eng.",
      progress: "UADER - FCYT (In progress)",
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

            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-linear-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">{t.education}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-white text-sm">{t.degree}</p>
                    <p className="text-xs text-slate-500">{t.progress}</p>
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