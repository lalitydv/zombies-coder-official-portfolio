import Head from 'next/head';
import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProjectCard } from '../../components/ProjectCard';
import { projects, categories } from '../../data/categories';
import { getTranslation } from '../../data/translations';

export default function Projects({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>All Projects — Zombies Coder Portfolio</title>
        <meta name="description" content="Browse all 250+ projects built by Zombies Coder across 50 categories." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore {projects.length} professional projects
            </p>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">{t('common.noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} language={language} />
              ))}
            </div>
          )}
        </div>

        <Footer language={language} />
      </div>
    </>
  );
}

