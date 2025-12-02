import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProjectCard } from '../../components/ProjectCard';
import { getCategoryBySlug, getProjectsByCategory } from '../../data/categories';
import { getTranslation } from '../../data/translations';
import { getCategoryColor } from '../../data/colors';

export default function CategoryPage({ language = 'en', setLanguage = () => {} }) {
  const router = useRouter();
  const { slug } = router.query;
  const t = (key) => getTranslation(language, key);

  if (!slug) {
    return <div>Loading...</div>;
  }

  const categoryName = getCategoryBySlug(slug);
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <a href="/categories" className="text-primary">Back to Categories</a>
        </div>
      </div>
    );
  }

  const projects = getProjectsByCategory(categoryName);
  const categoryIndex = require('../../data/categories').categories.indexOf(categoryName);
  const categoryColor = getCategoryColor(categoryIndex);

  return (
    <>
      <Head>
        <title>{categoryName} — Zombies Coder Portfolio</title>
        <meta name="description" content={`Explore ${projects.length} projects in ${categoryName} category`} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <a
              href="/categories"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4 inline-block"
            >
              ← Back to Categories
            </a>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{categoryName}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {projects.length} {t('categories.projectsCount')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} language={language} />
            ))}
          </div>
        </div>

        <Footer language={language} />
      </div>
    </>
  );
}

