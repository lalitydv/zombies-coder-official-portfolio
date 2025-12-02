import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';

export function Navbar({ language = 'en', setLanguage = () => { } }) {
  const t = (key) => getTranslation(language, key);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: t('nav.home'), key: 'home', icon: '🏠' },
    { href: '/categories', label: t('nav.categories'), key: 'categories', icon: '📁' },
    { href: '/projects', label: t('nav.projects'), key: 'projects', icon: '💼' },
    { href: '/case-studies', label: t('nav.caseStudies'), key: 'case-studies', icon: '📊' },
    { href: '/services', label: t('nav.services'), key: 'services', icon: '⚙️' },
    { href: '/about', label: t('nav.about'), key: 'about', icon: '👤' },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <>
      <nav className={`w-full sticky top-0 z-50 transition-all duration-300 whitespace-nowrap ${isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-primary/10 border-b border-primary/20'
        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with enhanced effects */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-3xl font-extrabold bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-clip-text text-transparent relative z-10">
                  Zombies
                </span>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent relative z-10">
                  Coder
                </span>
              </motion.div>

            </Link>

            {/* Desktop Navigation with glassmorphism */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${isActive(link.href)
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${colors.main.primary}, ${colors.main.secondary})`,
                        boxShadow: `0 4px 15px ${colors.main.primary}40`
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${colors.main.primary}, ${colors.main.secondary})`,
                  boxShadow: `0 4px 15px ${colors.main.primary}30`
                }}
              >
                <span className="relative z-10">{t('nav.contact')}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button with glassmorphism */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 shadow-lg shadow-primary/10"
                aria-label="Toggle menu"
              >
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slides from Left to Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sliding Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                boxShadow: `0 0 50px ${colors.main.primary}20`
              }}
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                      Zombies
                    </span>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Coder
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
                  <ThemeToggle />
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.href)
                        ? 'text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                        }`}
                      style={
                        isActive(link.href)
                          ? {
                            background: `linear-gradient(135deg, ${colors.main.primary}, ${colors.main.secondary})`,
                            boxShadow: `0 4px 15px ${colors.main.primary}40`
                          }
                          : {}
                      }
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 rounded-xl text-sm font-semibold text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${colors.main.primary}, ${colors.main.secondary})`,
                      boxShadow: `0 4px 15px ${colors.main.primary}40`
                    }}
                  >
                    {t('nav.contact')}
                  </Link>
                </motion.div>
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary/5 to-secondary/5">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Zombies Coder
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

