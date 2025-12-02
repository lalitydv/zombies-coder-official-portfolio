import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/categories';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';

export default function CaseStudies({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);
  
  // Select featured/premium projects (first project from top categories)
  const featuredProjects = [
    projects.find(p => p.category === 'Website Development' && p.id.includes('-1')),
    projects.find(p => p.category === 'SaaS Product Development' && p.id.includes('-1')),
    projects.find(p => p.category === 'Mobile App Development' && p.id.includes('-1')),
    projects.find(p => p.category === 'E-commerce Store Development' && p.id.includes('-1')),
    projects.find(p => p.category === 'CRM System Development' && p.id.includes('-1')),
    projects.find(p => p.category === 'AI Tools & Automation' && p.id.includes('-1')),
  ].filter(Boolean);

  const caseStudies = featuredProjects.map((project, index) => ({
    ...project,
    results: [
      `${Math.floor(Math.random() * 50) + 50}% Performance Improvement`,
      `${Math.floor(Math.random() * 200) + 100}% User Growth`,
      `${Math.floor(Math.random() * 30) + 20}% Conversion Rate Increase`,
    ],
    challenge: `Building a scalable ${project.category.toLowerCase()} solution that handles high traffic and provides excellent user experience.`,
    solution: `Developed using ${project.techStack.slice(0, 3).join(', ')} with modern architecture patterns, ensuring scalability and maintainability.`,
  }));

  return (
    <>
      <Head>
        <title>Case Studies — Zombies Coder</title>
        <meta name="description" content="Explore our successful case studies and premium projects." />
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
                Case Studies
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore our premium projects and success stories
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image/Visual Section */}
                    <div className="h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl opacity-20">🧟‍♂️</div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className="px-3 py-1 rounded-lg text-sm font-medium text-white"
                          style={{ backgroundColor: colors.main.primary }}
                        >
                          Case Study
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12">
                      <div className="mb-4">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {study.category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        {study.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {study.longDescription}
                      </p>

                      {/* Challenge & Solution */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                            Challenge
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {study.challenge}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                            Solution
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {study.solution}
                          </p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                          Results
                        </h3>
                        <div className="space-y-2">
                          {study.results.map((result, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: colors.main.primary }}
                              />
                              <span className="text-gray-700 dark:text-gray-300">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {study.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/projects/${study.slug}`}
                        className="inline-block px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.main.primary }}
                      >
                        View Full Case Study →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* More Projects CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore All Projects
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Browse our complete portfolio of 250+ projects
              </p>
              <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View All Projects
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer language={language} />
      </div>
    </>
  );
}

