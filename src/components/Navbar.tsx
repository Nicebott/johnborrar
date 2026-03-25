import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.transfers'), path: '/transfers' },
    { name: t('nav.excursions'), path: '/excursions' },
    { name: t('nav.reservation'), path: '/reservation' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy shadow-lg' : 'bg-navy/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Plane className="h-6 w-6 md:h-8 md:w-8 text-gold" />
              <span className="text-lg md:text-2xl font-bold text-white">
                JP Transfers
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <LanguageSelector />
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageSelector />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-gold/20 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-navy z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gold/20">
                  <div className="flex items-center space-x-2">
                    <Plane className="h-6 w-6 text-gold" />
                    <span className="text-lg font-bold text-white">JP Transfers</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gold p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                          location.pathname === link.path
                            ? 'bg-gold text-navy shadow-lg'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="p-4 border-t border-gold/20">
                  <a
                    href="https://wa.me/18099395086?text=Hola, necesito información"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-gold hover:bg-gold/90 text-navy px-4 py-3 rounded-lg font-semibold transition-all"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
