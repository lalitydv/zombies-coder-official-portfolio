import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';

export default function About({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);

  const stats = [
    { number: '250+', label: 'Projects Completed' },
    { number: '50+', label: 'Categories' },
    { number: '100+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Cutting-edge solutions with latest technologies',
    },
    {
      icon: '💎',
      title: 'Quality',
      description: 'Production-ready code and best practices',
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Fast, scalable, and optimized applications',
    },
    {
      icon: '🎯',
      title: 'Focus',
      description: 'Client-centric approach with clear communication',
    },
  ];

  const skills = [
    'Next.js & React', 'Node.js & Express', 'TypeScript', 'MongoDB & PostgreSQL',
    'Tailwind CSS', 'Framer Motion', 'REST & GraphQL APIs', 'AWS & Vercel',
    'Mobile Development', 'UI/UX Design', 'CI/CD', 'Microservices',
  ];

  return (
    <>
      <Head>
        <title>About — Zombies Coder</title>
        <meta name="description" content="Learn about Zombies Coder - A professional developer building modern web and mobile products." />
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
                About Zombies Coder
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Building modern web and mobile products with passion, precision, and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: colors.main.primary }}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Zombies Coder was born from a passion for creating exceptional digital experiences.
                  We specialize in building modern, scalable web and mobile applications that help
                  businesses thrive in the digital age.
                </p>
                <p>
                  With expertise spanning across 50+ categories and 250+ completed projects, we've
                  helped startups and enterprises transform their ideas into production-ready products.
                </p>
                <p>
                  Our approach combines cutting-edge technology with best practices, ensuring every
                  project is not just functional, but also performant, scalable, and maintainable.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Technologies & Skills
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
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
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Let's discuss your project and bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </section>

        <Footer language={language} />
      </div>
    </>
  );
}

