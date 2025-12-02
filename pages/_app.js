import { useState, useEffect } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  if (!mounted) {
    return null;
  }

  return <Component {...pageProps} language={language} setLanguage={handleLanguageChange} />;
}

