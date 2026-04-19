import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
)
