export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">PERFIL PROFESIONAL</h2>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Actualmente cursando el 3er año de la **Licenciatura en Sistemas de Información** en UADER-FCYT. Me caracterizo por mi iniciativa y capacidad para resolver problemas en entornos dinámicos.
              </p>
              <p>
                He colaborado en proyectos académicos aplicando arquitecturas modernas, priorizando la integración de IA en el flujo de trabajo para maximizar la productividad y calidad del código.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-cyan-400">UADER - FCYT</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">4to Año</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-purple-400">Español</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Nativo</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-black text-purple-400">Inglés</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Nivel B2</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-linear-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Educación</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-white text-sm">Lic. en Sistemas</p>
                    <p className="text-xs text-slate-500">UADER - FCYT (En curso)</p>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Secundario Completo</p>
                    <p className="text-xs text-slate-500">Inst. Sagrado Corazón</p>
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