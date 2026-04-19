import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { SoftSkills } from './components/SoftSkills';
import { Certifications } from './components/Certifications';
import { Cursor } from './components/Cursor';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-400 overflow-x-hidden cursor-none">
      <Cursor />
      <Navbar />

      <div className="relative z-10 bg-[#020617] mb-[100vh] rounded-b-[2rem] shadow-2xl shadow-cyan-900/20">
        <ParticleBackground />
        
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <main className="relative z-10">
          <Hero />
          <About />
          <SoftSkills />
          <Skills />
          <Projects />
          <Certifications />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;