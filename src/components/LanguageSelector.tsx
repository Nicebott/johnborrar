import { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const flags = {
  es: '🇪🇸',
  en: '🇺🇸',
  de: '🇩🇪',
};

const languageNames = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        aria-label="Select language"
      >
        <span className="text-xl">{flags[language]}</span>
        <span className="hidden md:inline text-sm font-medium">{languageNames[language]}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {(Object.keys(flags) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                language === lang ? 'bg-gold/10 text-navy font-semibold' : 'text-gray-700'
              }`}
            >
              <span className="text-xl">{flags[lang]}</span>
              <span className="text-sm">{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
