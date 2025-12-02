import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCategoryColor } from '../data/colors';
import { getProjectsByCategory } from '../data/categories';
import { getTranslation } from '../data/translations';

export function CategoryCard({ category, index, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const color = getCategoryColor(index);
  const projects = getProjectsByCategory(category);
  const slug = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/categories/${slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {projects.length} {t('categories.projectsCount')}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium" style={{ color }}>
          {t('categories.viewCategory')} →
        </div>
      </motion.div>
    </Link>
  );
}

