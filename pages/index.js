import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CategoryCard } from '../components/CategoryCard';
import { ProjectCard } from '../components/ProjectCard';
import { ThreeSceneWrapper } from '../components/ThreeSceneWrapper';
import { categories, projects } from '../data/categories';
import { getTranslation } from '../data/translations';
import { colors } from '../data/colors';

export default function Home({ language = 'en', setLanguage = () => {} }) {
  const t = (key) => getTranslation(language, key);
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    fetch('/api/homepage')
      .then(res => res.json())
      .then(data => {
        setHomepageData(data);
        setLoading(false);
      })
      .catch(() => {
        import('../data/homepage.json').then(module => {
          setHomepageData(module.default || module);
          setLoading(false);
        });
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const homeData = homepageData || {};
  const topCategories = categories.slice(0, homeData.topCategories?.count || 8);
  const featured = projects.slice(0, homeData.featuredProjects?.count || 8);

  // 3D Card Component
  const Card3D = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (centerX - e.clientX) / 10;
      x.set(rotateX);
      y.set(rotateY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: useSpring(x, { stiffness: 100, damping: 10 }),
          rotateY: useSpring(y, { stiffness: 100, damping: 10 }),
        }}
        className={`transform-3d ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <title>Zombies Coder — Professional Web & Mobile Development Portfolio</title>
        <meta name="description" content="Professional portfolio showcasing 250+ projects across 50 categories. Websites, SaaS, Mobile Apps, CRMs, E-commerce, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* 3D Background Effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mesh-gradient" />
          
          {/* Plexus-style 3D Background */}
          <div className="absolute inset-0 webgl-container">
            <ThreeSceneWrapper 
              type="combined" 
              count={80}
              colors={{ primary: colors.main.primary, secondary: colors.main.secondary }}
            />
          </div>
          
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl morph-shape"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl morph-shape"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <Navbar language={language} setLanguage={setLanguage} />

        {/* SECTION 1: Hero with 3D Effects */}
        {homeData.hero?.enabled !== false && (
          <header ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <motion.div style={{ y, opacity }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="relative"
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-500 via-green-400 to-blue-500 bg-clip-text text-transparent gradient-animate text-3d neon-glow"
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    {homeData.hero?.title || t('home.hero.title')}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                  >
                    {homeData.hero?.subtitle || t('home.hero.subtitle')}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.a
                      href={homeData.hero?.primaryButton?.link || "#projects"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg pulse-glow relative overflow-hidden group"
                      style={{ backgroundColor: colors.main.primary }}
                    >
                      <span className="relative z-10">{homeData.hero?.primaryButton?.text || t('home.hero.viewProjects')}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                    <motion.a
                      href={homeData.hero?.secondaryButton?.link || "#contact"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl border-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all glass"
                  style={{ borderColor: colors.main.secondary, color: colors.main.secondary }}
                >
                      {homeData.hero?.secondaryButton?.text || t('home.hero.contact')}
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Stats with 3D Cards */}
                {homeData.stats?.enabled !== false && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                  >
                    {(homeData.stats?.items || []).map((stat, index) => (
                      <Card3D key={index} delay={0.7 + index * 0.1}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotateY: 5 }}
                          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 card-3d"
                        >
                          <div className="text-4xl mb-2">{stat.icon}</div>
                          <div className="text-3xl font-bold" style={{ color: index % 2 === 0 ? colors.main.primary : colors.main.secondary }}>
                            {stat.value}
                </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                        </motion.div>
                      </Card3D>
                    ))}
                  </motion.div>
                )}
            </div>

              {/* 3D Floating Categories Card */}
              {homeData.topCategories?.enabled !== false && (
                <Card3D delay={0.3}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 float-animation"
                  >
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {homeData.topCategories?.title || t('home.topServices')}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {topCategories.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, rotateZ: 2 }}
                        >
                  <CategoryCard
                    category={category}
                    index={index}
                    language={language}
                  />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </Card3D>
              )}
            </motion.div>
          </header>
        )}

        {/* SECTION 2: Technology Stack with 3D Icons */}
        {homeData.techStack?.enabled !== false && (
          <section className="relative py-20 overflow-hidden">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 webgl-container opacity-30">
              <ThreeSceneWrapper 
                type="particles" 
                count={50}
                colors={{ secondary: colors.main.secondary }}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.techStack?.title || 'Technology Stack'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.techStack?.subtitle || 'Modern Technologies We Use'}
                </p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {(homeData.techStack?.items || [
                  { name: 'Next.js', icon: '⚛️', color: '#000000' },
                  { name: 'React', icon: '⚛️', color: '#61DAFB' },
                  { name: 'Node.js', icon: '🟢', color: '#339933' },
                  { name: 'TypeScript', icon: '🔷', color: '#3178C6' },
                  { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
                  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
                ]).map((tech, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10, rotateX: 5 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 card-3d text-center group"
                    >
                      <motion.div
                        className="text-5xl mb-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {tech.icon}
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: About with 3D Image */}
        {homeData.about?.enabled !== false && (
          <section className="relative py-20">
            {/* Morphing Shapes Background */}
            <div className="absolute inset-0 webgl-container opacity-20">
              <ThreeSceneWrapper 
                type="morphing" 
                count={15}
                colors={{ primary: colors.main.primary }}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {homeData.about?.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    {homeData.about?.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {homeData.about?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {(homeData.about?.features || []).map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg"
                      >
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <Card3D>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative perspective-1000"
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {homeData.about?.image && (
                        <motion.img
                          src={homeData.about.image}
                          alt="About"
                          className="w-full rounded-2xl"
                          whileHover={{ rotateY: 5, rotateX: 5 }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                </Card3D>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: Services with 3D Cards */}
        {homeData.services?.enabled !== false && (
          <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20 relative glass-enhanced">
            {/* Wave Background */}
            <div className="absolute inset-0 webgl-container opacity-15">
              <ThreeSceneWrapper 
                type="wave" 
                colors={{ primary: colors.main.primary }}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.services?.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.services?.subtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(homeData.services?.items || []).map((service, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -10, rotateY: 5 }}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 card-3d group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <motion.div
                          className="text-6xl mb-4"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  </Card3D>
                ))}
            </div>
          </div>
          </section>
        )}

        {/* SECTION 5: Features with Glow Effects */}
        {homeData.features?.enabled !== false && (
          <section className="py-20 relative">
            {/* Plexus Background */}
            <div className="absolute inset-0 webgl-container opacity-25">
              <ThreeSceneWrapper 
                type="plexus" 
                count={60}
                colors={{ primary: colors.main.primary }}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.features?.title}
            </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.features?.subtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(homeData.features?.items || []).map((feature, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden group morph-3d plexus-glow"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity particle-trail" />
                      <div className="relative z-10">
                        <motion.div
                          className="text-5xl mb-4"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: Featured Projects with 3D Grid */}
        {homeData.featuredProjects?.enabled !== false && (
          <section id="projects" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20 relative glass-enhanced">
            {/* Combined 3D Effects */}
            <div className="absolute inset-0 webgl-container opacity-20">
              <ThreeSceneWrapper 
                type="combined" 
                count={70}
                colors={{ primary: colors.main.primary, secondary: colors.main.secondary }}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.featuredProjects?.title || t('home.featuredProjects')}
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, rotateY: 5 }}
                  >
                    <div className="card-3d">
                      <ProjectCard project={project} language={language} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link href="/projects">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 rounded-xl font-semibold text-white shadow-lg pulse-glow cursor-pointer"
                    style={{ backgroundColor: colors.main.secondary }}
                  >
                    View All Projects →
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* SECTION 7: Process with 3D Steps */}
        {homeData.process?.enabled !== false && (
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.process?.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.process?.subtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {(homeData.process?.steps || []).map((step, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      className="text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 card-3d relative"
                    >
                      <motion.div
                        className="text-6xl font-bold mb-4 gradient-animate"
                        style={{
                          background: `linear-gradient(135deg, ${colors.main.primary}, ${colors.main.secondary})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.number}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: Testimonials with 3D Cards */}
        {homeData.testimonials?.enabled !== false && (
          <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.testimonials?.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.testimonials?.subtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(homeData.testimonials?.items || []).map((testimonial, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -10, rotateY: 5 }}
                      className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 card-3d"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="text-yellow-400 text-xl"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            ⭐
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 italic text-lg">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        {testimonial.avatar && (
                          <motion.img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: Pricing Plans (New) */}
        {homeData.pricing?.enabled !== false && (
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.pricing?.title || 'Pricing Plans'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.pricing?.subtitle || 'Choose the perfect plan for your project'}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(homeData.pricing?.plans || [
                  { name: 'Starter', price: '$999', features: ['Basic Website', '5 Pages', '1 Month Support'] },
                  { name: 'Professional', price: '$2999', features: ['Full Website', 'Unlimited Pages', '3 Months Support'], popular: true },
                  { name: 'Enterprise', price: 'Custom', features: ['Custom Solution', 'Dedicated Team', 'Lifetime Support'] },
                ]).map((plan, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-2 card-3d relative overflow-hidden ${
                        plan.popular ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                          Popular
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-6" style={{ color: colors.main.primary }}>
                        {plan.price}
                      </div>
                      <ul className="space-y-3 mb-8">
                        {(plan.features || []).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="text-green-500">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl font-semibold text-white"
                        style={{ backgroundColor: plan.popular ? colors.main.primary : colors.main.secondary }}
                      >
                        Get Started
                      </motion.button>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 10: FAQ Section (New) */}
        {homeData.faq?.enabled !== false && (
          <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.faq?.title || 'Frequently Asked Questions'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.faq?.subtitle || 'Everything you need to know'}
                </p>
              </motion.div>
              <div className="space-y-4">
                {(homeData.faq?.items || [
                  { question: 'How long does it take to build a project?', answer: 'Typically 2-8 weeks depending on complexity.' },
                  { question: 'Do you provide ongoing support?', answer: 'Yes, we offer maintenance and support packages.' },
                  { question: 'Can you work with our existing team?', answer: 'Absolutely! We collaborate seamlessly with in-house teams.' },
                ]).map((item, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.answer}
                      </p>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 11: Awards & Achievements (New) */}
        {homeData.awards?.enabled !== false && (
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {homeData.awards?.title || 'Awards & Achievements'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {homeData.awards?.subtitle || 'Recognition for excellence'}
                </p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(homeData.awards?.items || [
                  { icon: '🏆', title: 'Best Developer 2024', description: 'Tech Awards' },
                  { icon: '⭐', title: '5 Star Rating', description: 'Client Reviews' },
                  { icon: '🎯', title: '100+ Projects', description: 'Completed' },
                  { icon: '💎', title: 'Premium Quality', description: 'Certified' },
                ]).map((award, index) => (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg text-center card-3d"
                    >
                      <motion.div
                        className="text-5xl mb-3"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {award.icon}
                      </motion.div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{award.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{award.description}</p>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 12: Contact CTA with 3D Effect */}
        {homeData.cta?.enabled !== false && (
          <section id="contact" className="relative py-20 overflow-hidden">
            {/* Intense 3D Background for CTA */}
            <div className="absolute inset-0 webgl-container opacity-30">
              <ThreeSceneWrapper 
                type="combined" 
                count={100}
                colors={{ primary: colors.main.primary, secondary: colors.main.secondary }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
              <Card3D>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-green-500 via-green-400 to-blue-500 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden holographic"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 to-blue-600/50" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <div className="relative z-10">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl md:text-5xl font-bold mb-4"
                    >
                      {homeData.cta?.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-xl mb-8 opacity-90"
                    >
                      {homeData.cta?.subtitle}
                    </motion.p>
                    <Link href={homeData.cta?.buttonLink || "/contact"}>
                      <motion.a
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-10 py-4 bg-white text-green-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer"
                      >
                        {homeData.cta?.buttonText || "Get In Touch"}
                      </motion.a>
                    </Link>
          </div>
                </motion.div>
              </Card3D>
            </motion.div>
        </section>
        )}

        <Footer language={language} />
      </div>
    </>
  );
}
