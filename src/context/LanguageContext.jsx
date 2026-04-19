import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      about: "SOBRE MÍ",
      projects: "PROYECTOS",
      skills: "SKILLS",
      certifications: "CERTIFICADOS",
      contact: "CONTÁCTAME"
    },
    hero: {
      subtitle: "Ingeniería de Software & Arquitectura de Interfaces.",
      description: "Construyo ecosistemas digitales de alto rendimiento. Especializado en experiencias inmersivas, escalabilidad y estéticas tecnológicas agresivas.",
      contactBtn: "INICIAR CONTACTO",
      cvBtn: "CV",
      booting: "INICIALIZANDO SISTEMA...",
      establishing: "ESTABLECIENDO CONEXIÓN SEGURA",
      bypassing: "EVADIENDO FIREWALLS",
      access: "ACCESO CONCEDIDO"
    }
  },
  en: {
    nav: {
      about: "ABOUT ME",
      projects: "PROJECTS",
      skills: "SKILLS",
      certifications: "CERTIFICATES",
      contact: "CONTACT"
    },
    hero: {
      subtitle: "Software Engineering & Interface Architecture.",
      description: "Building high-performance digital ecosystems. Specialized in immersive experiences, scalability, and aggressive tech aesthetics.",
      contactBtn: "INITIATE CONTACT",
      cvBtn: "CV",
      booting: "BOOTING SYSTEM...",
      establishing: "ESTABLISHING SECURE CONNECTION",
      bypassing: "BYPASSING FIREWALLS",
      access: "ACCESS GRANTED"
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Intentar recuperar el idioma del localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved && ['es', 'en'].includes(saved)) {
        return saved;
      }
    }
    return 'es'; // Por defecto español
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Función para obtener traducciones de forma anidada (ej: t('nav.about'))
  const t = (path) => {
    return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : path, translations[language]);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
