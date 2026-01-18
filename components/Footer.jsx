import { motion } from 'framer-motion';
import Link from 'next/link';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';

export function Footer({ language = 'en' }) {
  const t = (key) => getTranslation(language, key);

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/projects', label: 'Projects' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: '📧', href: 'mailto:zombiescoder@gmail.com', label: 'Email' },
    { icon: '💬', href: 'https://wa.me/15551234567', label: 'WhatsApp' },
    { icon: '🐙', href: '#', label: 'GitHub' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${colors.main.primary}40 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${colors.main.secondary}40 0%, transparent 70%)`,
              transform: 'translate(50%, 50%)'
            }}
          />
        </div>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="relative backdrop-blur-xl bg-gray-900/80 dark:bg-black/80 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-3xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Zombies
                  </span>
                  {' '}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Coder
                  </span>
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Building modern web and mobile products. Professional, scalable, and production-ready solutions.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/10 dark:border-gray-700/50 flex items-center justify-center text-xl hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 shadow-lg shadow-primary/10"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-primary">📧</span>
                  <a href="mailto:zombiescoder@gmail.com" className="hover:text-primary transition-colors">
                    zombiescoder@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-primary">📱</span>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                    +91 62613 77354
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-primary">🌍</span>
                  <span>Available Worldwide</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-gray-800/50 dark:border-gray-700/50 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Zombies Coder — {t('footer.rights')}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All Systems Operational
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

