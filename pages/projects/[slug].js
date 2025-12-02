import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProductDetail } from '../../components/ProductDetail';
import { getProjectBySlug } from '../../data/categories';
import { getTranslation } from '../../data/translations';

export default function ProjectPage({ language = 'en', setLanguage = () => {} }) {
  const router = useRouter();
  const { slug } = router.query;
  const t = (key) => getTranslation(language, key);

  if (!slug) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
      </div>
    );
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <a href="/projects" className="text-primary">Back to Projects</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} — Zombies Coder Portfolio</title>
        <meta name="description" content={project.shortDescription} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar language={language} setLanguage={setLanguage} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <a
              href="/projects"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4 inline-block"
            >
              ← Back to Projects
            </a>
          </div>

          <ProductDetail project={project} language={language} />
        </div>

        <Footer language={language} />
      </div>
    </>
  );
}

