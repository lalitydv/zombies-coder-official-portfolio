import Head from 'next/head';
import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CategoryCard } from '../../components/CategoryCard';
import { categories } from '../../data/categories';
import { getTranslation } from '../../data/translations';

export default function Categories({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Categories — Zombies Coder Portfolio</title>
        <meta name="description" content="Browse all 50 categories of projects built by Zombies Coder." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('categories.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore {categories.length} categories of professional projects
            </p>
            
            {/* Search */}
            <div className="max-w-md">
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">{t('common.noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => {
                const originalIndex = categories.indexOf(category);
                return (
                  <CategoryCard
                    key={category}
                    category={category}
                    index={originalIndex}
                    language={language}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Footer language={language} />
      </div>
    </>
  );
}

