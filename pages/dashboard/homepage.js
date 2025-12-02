import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { colors } from '../../data/colors';

export default function HomepageManagement() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }

    fetch('/api/dashboard/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
          loadHomepageData();
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

  const loadHomepageData = async () => {
    try {
      const response = await fetch('/api/homepage');
      const data = await response.json();
      setHomepageData(data);
    } catch (error) {
      console.error('Failed to load homepage data:', error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('dashboard_token');
    setSaving(true);

    try {
      const response = await fetch('/api/homepage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(homepageData),
      });

      if (response.ok) {
        alert('Homepage content saved successfully!');
      } else {
        alert('Failed to save homepage content');
      }
    } catch (error) {
      alert('Error saving homepage content');
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (sectionKey, data) => {
    setHomepageData({
      ...homepageData,
      [sectionKey]: {
        ...homepageData[sectionKey],
        ...data,
      },
    });
  };

  const updateArrayItem = (sectionKey, index, data) => {
    const section = homepageData[sectionKey];
    const newItems = [...(section.items || [])];
    newItems[index] = { ...newItems[index], ...data };
    updateSection(sectionKey, { items: newItems });
  };

  const addArrayItem = (sectionKey, defaultItem) => {
    const section = homepageData[sectionKey];
    const newItems = [...(section.items || []), defaultItem];
    updateSection(sectionKey, { items: newItems });
  };

  const removeArrayItem = (sectionKey, index) => {
    const section = homepageData[sectionKey];
    const newItems = (section.items || []).filter((_, i) => i !== index);
    updateSection(sectionKey, { items: newItems });
  };

  if (loading || !authenticated || !homepageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const sections = [
    { key: 'hero', label: 'Hero Section', icon: '🎯' },
    { key: 'stats', label: 'Statistics', icon: '📊' },
    { key: 'about', label: 'About Section', icon: '👤' },
    { key: 'services', label: 'Services', icon: '⚙️' },
    { key: 'features', label: 'Features', icon: '✨' },
    { key: 'testimonials', label: 'Testimonials', icon: '💬' },
    { key: 'process', label: 'Process', icon: '🔄' },
    { key: 'topCategories', label: 'Top Categories', icon: '📁' },
    { key: 'featuredProjects', label: 'Featured Projects', icon: '💼' },
    { key: 'cta', label: 'Call to Action', icon: '📞' },
  ];

  return (
    <>
      <Head>
        <title>Manage Homepage — Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  ← Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Manage Homepage
                </h1>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: colors.main.primary }}
              >
                {saving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sections
                </h2>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === section.key
                          ? 'bg-primary text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      style={
                        activeSection === section.key
                          ? { backgroundColor: colors.main.primary }
                          : {}
                      }
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                {/* Hero Section */}
                {activeSection === 'hero' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Hero Section
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.hero?.enabled !== false}
                          onChange={(e) =>
                            updateSection('hero', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.hero?.title || ''}
                        onChange={(e) =>
                          updateSection('hero', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <textarea
                        value={homepageData.hero?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('hero', { subtitle: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Primary Button Text
                        </label>
                        <input
                          type="text"
                          value={homepageData.hero?.primaryButton?.text || ''}
                          onChange={(e) =>
                            updateSection('hero', {
                              primaryButton: {
                                ...homepageData.hero?.primaryButton,
                                text: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Primary Button Link
                        </label>
                        <input
                          type="text"
                          value={homepageData.hero?.primaryButton?.link || ''}
                          onChange={(e) =>
                            updateSection('hero', {
                              primaryButton: {
                                ...homepageData.hero?.primaryButton,
                                link: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Secondary Button Text
                        </label>
                        <input
                          type="text"
                          value={homepageData.hero?.secondaryButton?.text || ''}
                          onChange={(e) =>
                            updateSection('hero', {
                              secondaryButton: {
                                ...homepageData.hero?.secondaryButton,
                                text: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Secondary Button Link
                        </label>
                        <input
                          type="text"
                          value={homepageData.hero?.secondaryButton?.link || ''}
                          onChange={(e) =>
                            updateSection('hero', {
                              secondaryButton: {
                                ...homepageData.hero?.secondaryButton,
                                link: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Section */}
                {activeSection === 'stats' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Statistics
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.stats?.enabled !== false}
                          onChange={(e) =>
                            updateSection('stats', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    {(homepageData.stats?.items || []).map((stat, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Stat {index + 1}
                          </span>
                          <button
                            onClick={() => removeArrayItem('stats', index)}
                            className="text-red-600 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Icon (emoji)"
                            value={stat.icon || ''}
                            onChange={(e) =>
                              updateArrayItem('stats', index, { icon: e.target.value })
                            }
                            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={stat.value || ''}
                            onChange={(e) =>
                              updateArrayItem('stats', index, { value: e.target.value })
                            }
                            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Label"
                            value={stat.label || ''}
                            onChange={(e) =>
                              updateArrayItem('stats', index, { label: e.target.value })
                            }
                            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addArrayItem('stats', { icon: '📊', value: '0', label: 'New Stat' })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      + Add Stat
                    </button>
                  </div>
                )}

                {/* About Section */}
                {activeSection === 'about' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        About Section
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.about?.enabled !== false}
                          onChange={(e) =>
                            updateSection('about', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.about?.title || ''}
                        onChange={(e) =>
                          updateSection('about', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={homepageData.about?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('about', { subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={homepageData.about?.description || ''}
                        onChange={(e) =>
                          updateSection('about', { description: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={homepageData.about?.image || ''}
                        onChange={(e) =>
                          updateSection('about', { image: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Features (one per line)
                      </label>
                      <textarea
                        value={(homepageData.about?.features || []).join('\n')}
                        onChange={(e) =>
                          updateSection('about', {
                            features: e.target.value.split('\n').filter(Boolean),
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Services Section */}
                {activeSection === 'services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Services
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.services?.enabled !== false}
                          onChange={(e) =>
                            updateSection('services', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.services?.title || ''}
                        onChange={(e) =>
                          updateSection('services', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={homepageData.services?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('services', { subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    {(homepageData.services?.items || []).map((service, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Service {index + 1}
                          </span>
                          <button
                            onClick={() => removeArrayItem('services', index)}
                            className="text-red-600 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Icon (emoji)"
                            value={service.icon || ''}
                            onChange={(e) =>
                              updateArrayItem('services', index, { icon: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Title"
                            value={service.title || ''}
                            onChange={(e) =>
                              updateArrayItem('services', index, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <textarea
                            placeholder="Description"
                            value={service.description || ''}
                            onChange={(e) =>
                              updateArrayItem('services', index, {
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addArrayItem('services', {
                          icon: '⚙️',
                          title: 'New Service',
                          description: 'Service description',
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      + Add Service
                    </button>
                  </div>
                )}

                {/* Features Section */}
                {activeSection === 'features' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Features
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.features?.enabled !== false}
                          onChange={(e) =>
                            updateSection('features', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.features?.title || ''}
                        onChange={(e) =>
                          updateSection('features', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={homepageData.features?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('features', { subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    {(homepageData.features?.items || []).map((feature, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Feature {index + 1}
                          </span>
                          <button
                            onClick={() => removeArrayItem('features', index)}
                            className="text-red-600 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Icon (emoji)"
                            value={feature.icon || ''}
                            onChange={(e) =>
                              updateArrayItem('features', index, { icon: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Title"
                            value={feature.title || ''}
                            onChange={(e) =>
                              updateArrayItem('features', index, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <textarea
                            placeholder="Description"
                            value={feature.description || ''}
                            onChange={(e) =>
                              updateArrayItem('features', index, {
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addArrayItem('features', {
                          icon: '✨',
                          title: 'New Feature',
                          description: 'Feature description',
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      + Add Feature
                    </button>
                  </div>
                )}

                {/* Testimonials Section */}
                {activeSection === 'testimonials' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Testimonials
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.testimonials?.enabled !== false}
                          onChange={(e) =>
                            updateSection('testimonials', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.testimonials?.title || ''}
                        onChange={(e) =>
                          updateSection('testimonials', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={homepageData.testimonials?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('testimonials', { subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    {(homepageData.testimonials?.items || []).map((testimonial, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Testimonial {index + 1}
                          </span>
                          <button
                            onClick={() => removeArrayItem('testimonials', index)}
                            className="text-red-600 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <textarea
                            placeholder="Testimonial content"
                            value={testimonial.content || ''}
                            onChange={(e) =>
                              updateArrayItem('testimonials', index, {
                                content: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Name"
                              value={testimonial.name || ''}
                              onChange={(e) =>
                                updateArrayItem('testimonials', index, { name: e.target.value })
                              }
                              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Role"
                              value={testimonial.role || ''}
                              onChange={(e) =>
                                updateArrayItem('testimonials', index, { role: e.target.value })
                              }
                              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Avatar URL"
                            value={testimonial.avatar || ''}
                            onChange={(e) =>
                              updateArrayItem('testimonials', index, { avatar: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="number"
                            placeholder="Rating (1-5)"
                            min="1"
                            max="5"
                            value={testimonial.rating || 5}
                            onChange={(e) =>
                              updateArrayItem('testimonials', index, {
                                rating: parseInt(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addArrayItem('testimonials', {
                          name: 'New Client',
                          role: 'CEO',
                          content: 'Great service!',
                          rating: 5,
                          avatar: '',
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      + Add Testimonial
                    </button>
                  </div>
                )}

                {/* Process Section */}
                {activeSection === 'process' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Process
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.process?.enabled !== false}
                          onChange={(e) =>
                            updateSection('process', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.process?.title || ''}
                        onChange={(e) =>
                          updateSection('process', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={homepageData.process?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('process', { subtitle: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    {(homepageData.process?.steps || []).map((step, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Step {index + 1}
                          </span>
                          <button
                            onClick={() => removeArrayItem('process', index)}
                            className="text-red-600 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Number (e.g., 01)"
                            value={step.number || ''}
                            onChange={(e) =>
                              updateArrayItem('process', index, { number: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Title"
                            value={step.title || ''}
                            onChange={(e) =>
                              updateArrayItem('process', index, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                          <textarea
                            placeholder="Description"
                            value={step.description || ''}
                            onChange={(e) =>
                              updateArrayItem('process', index, {
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        addArrayItem('process', {
                          number: '01',
                          title: 'New Step',
                          description: 'Step description',
                        })
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      + Add Step
                    </button>
                  </div>
                )}

                {/* CTA Section */}
                {activeSection === 'cta' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Call to Action
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={homepageData.cta?.enabled !== false}
                          onChange={(e) =>
                            updateSection('cta', { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData.cta?.title || ''}
                        onChange={(e) =>
                          updateSection('cta', { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <textarea
                        value={homepageData.cta?.subtitle || ''}
                        onChange={(e) =>
                          updateSection('cta', { subtitle: e.target.value })
                        }
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={homepageData.cta?.buttonText || ''}
                        onChange={(e) =>
                          updateSection('cta', { buttonText: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={homepageData.cta?.buttonLink || ''}
                        onChange={(e) =>
                          updateSection('cta', { buttonLink: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Top Categories & Featured Projects - Simple Toggle */}
                {(activeSection === 'topCategories' || activeSection === 'featuredProjects') && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {activeSection === 'topCategories' ? 'Top Categories' : 'Featured Projects'}
                      </h2>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            homepageData[activeSection]?.enabled !== false
                          }
                          onChange={(e) =>
                            updateSection(activeSection, { enabled: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Enable Section
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={homepageData[activeSection]?.title || ''}
                        onChange={(e) =>
                          updateSection(activeSection, { title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Count (number of items to show)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={homepageData[activeSection]?.count || 8}
                        onChange={(e) =>
                          updateSection(activeSection, {
                            count: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

