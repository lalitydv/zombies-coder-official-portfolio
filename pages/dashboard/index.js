import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { colors } from '../../data/colors';
import { categories, projects } from '../../data/categories';

export default function Dashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }

    // Verify token
    fetch('/api/dashboard/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem('dashboard_token');
          router.push('/dashboard/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('dashboard_token');
        router.push('/dashboard/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token');
    router.push('/dashboard/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  const stats = [
    { label: 'Total Categories', value: categories.length, icon: '📁', color: colors.main.primary },
    { label: 'Total Projects', value: projects.length, icon: '💼', color: colors.main.secondary },
    { label: 'Featured Projects', value: 8, icon: '⭐', color: '#f59e0b' },
    { label: 'Languages', value: 2, icon: '🌐', color: '#8b5cf6' },
  ];

  return (
    <>
      <Head>
        <title>Dashboard — Zombies Coder</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                    Zombies
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {' '}Coder
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">Dashboard</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  View Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/dashboard/homepage"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Manage Homepage
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Customize all homepage sections and content
              </p>
            </Link>

            <Link
              href="/dashboard/categories"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Manage Categories
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Add, edit, or delete categories
              </p>
            </Link>

            <Link
              href="/dashboard/projects"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Manage Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Add, edit, or delete projects
              </p>
            </Link>

            <Link
              href="/"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                View Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                See your portfolio live
              </p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

