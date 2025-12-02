import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCategoryColor } from '../data/colors';
import { getTranslation } from '../data/translations';

export function ProjectCard({ project, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const categoryColor = getCategoryColor(project.categoryIndex);

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="border rounded-lg overflow-hidden hover:shadow-xl transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer"
        style={{ borderTopColor: categoryColor, borderTopWidth: '4px' }}
      >
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl opacity-20">🧟‍♂️</div>
          </div>
          <div className="absolute top-2 right-2">
            <span
              className="px-2 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {project.category.split(' ')[0]}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
            {project.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {project.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-medium hover:underline"
              style={{ color: categoryColor }}
            >
              {t('projects.viewProject')} →
            </Link>
            <div className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[120px]">
              {project.category}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

