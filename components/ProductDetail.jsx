import { getCategoryColor } from '../data/colors';
import { getTranslation } from '../data/translations';
import { ProjectCard } from './ProjectCard';
import { getProjectsByCategory } from '../data/categories';

export function ProductDetail({ project, language = 'en' }) {
  const t = (key) => getTranslation(language, key);
  const categoryColor = getCategoryColor(project.categoryIndex);
  const relatedProjects = getProjectsByCategory(project.category)
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl opacity-20">🧟‍♂️</div>
          </div>
          <div className="absolute bottom-4 left-6 right-6">
            <span
              className="px-3 py-1 rounded-lg text-sm font-medium text-white inline-block mb-2"
              style={{ backgroundColor: categoryColor }}
            >
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t('project.description')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('project.features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColor }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('project.techStack')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: categoryColor }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: categoryColor }}
            >
              {t('project.viewLive')}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              style={{ borderColor: categoryColor, color: categoryColor }}
            >
              {t('project.viewCode')}
            </a>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('project.relatedProjects')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} project={relatedProject} language={language} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

