import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';
import { categories } from '../data/categories';
import { getCategoryColor } from '../data/colors';

export default function Services({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);

  const mainServices = [
    {
      icon: '🌐',
      title: 'Website Development',
      description: 'Responsive, modern websites built with Next.js and React',
      color: colors.main.primary,
      count: categories.filter(c => c.includes('Website')).length || 5,
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      color: colors.main.secondary,
      count: categories.filter(c => c.includes('Mobile')).length || 5,
    },
    {
      icon: '☁️',
      title: 'SaaS Products',
      description: 'Scalable cloud-based software solutions',
      color: '#8b5cf6',
      count: categories.filter(c => c.includes('SaaS')).length || 5,
    },
    {
      icon: '💼',
      title: 'CRM & ERP Systems',
      description: 'Enterprise management and automation solutions',
      color: '#f59e0b',
      count: categories.filter(c => c.includes('CRM') || c.includes('ERP')).length || 10,
    },
    {
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores and marketplaces',
      color: '#ec4899',
      count: categories.filter(c => c.includes('E-commerce') || c.includes('Marketplace')).length || 5,
    },
    {
      icon: '🤖',
      title: 'AI & Automation',
      description: 'Intelligent tools and automated workflows',
      color: '#06b6d4',
      count: categories.filter(c => c.includes('AI') || c.includes('Automation')).length || 5,
    },
  ];

  return (
    <>
      <Head>
        <title>Services — Zombies Coder</title>
        <meta name="description" content="Professional web and mobile development services by Zombies Coder." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 dark:from-primary/5 dark:via-secondary/5 dark:to-primary/2 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive development services across 50+ categories
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: service.color }}>
                      {service.count}+ Projects
                    </span>
                    <Link
                      href="/categories"
                      className="text-sm font-semibold hover:underline"
                      style={{ color: service.color }}
                    >
                      Explore →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                All Service Categories
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our complete range of development services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category, index) => {
                const categoryColor = getCategoryColor(index);
                const slug = category.toLowerCase().replace(/\s+/g, '-');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      href={`/categories/${slug}`}
                      className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                      <div
                        className="w-3 h-3 rounded-full mb-2"
                        style={{ backgroundColor: categoryColor }}
                      />
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {category}
                      </h4>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Our Process
            </h2>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Discovery', desc: 'Understanding your requirements and goals' },
                { step: '02', title: 'Planning', desc: 'Creating detailed project roadmap and architecture' },
                { step: '03', title: 'Development', desc: 'Building with best practices and modern tech' },
                { step: '04', title: 'Testing', desc: 'Rigorous testing for quality assurance' },
                { step: '05', title: 'Deployment', desc: 'Launching and monitoring your product' },
                { step: '06', title: 'Support', desc: 'Ongoing maintenance and updates' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className="text-2xl font-bold rounded-lg px-4 py-2 text-white"
                    style={{ backgroundColor: colors.main.primary }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s Build Your Next Project
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Get in touch to discuss your requirements
              </p>
              <Link href="/contact">
                <a className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Us
                </a>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer language={language} />
      </div>
    </>
  );
}

