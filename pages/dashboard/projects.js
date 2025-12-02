import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { colors } from '../../data/colors';

export default function ProjectsManagement() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    features: '',
    techStack: '',
    tags: '',
  });

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
          loadData();
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

  const loadData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/dashboard/projects'),
        fetch('/api/dashboard/categories'),
      ]);

      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();

      if (projectsRes.ok) setProjects(projectsData);
      if (categoriesRes.ok) setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('dashboard_token');

    const projectData = {
      ...formData,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      techStack: formData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        const response = await fetch(`/api/dashboard/projects/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          await loadData();
          resetForm();
        }
      } else {
        const response = await fetch('/api/dashboard/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          await loadData();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('dashboard_token');
    try {
      const response = await fetch(`/api/dashboard/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await loadData();
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      category: project.category || '',
      shortDescription: project.shortDescription || '',
      longDescription: project.longDescription || '',
      features: Array.isArray(project.features) ? project.features.join(', ') : '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
    });
    setIsAdding(true);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      category: '',
      shortDescription: '',
      longDescription: '',
      features: '',
      techStack: '',
      tags: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <>
      <Head>
        <title>Manage Projects — Dashboard</title>
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
                  Manage Projects
                </h1>
              </div>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.main.primary }}
              >
                + Add Project
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Add/Edit Form */}
          {isAdding && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Zombies Coder – Project Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={typeof cat === 'string' ? cat : cat.name}>
                          {typeof cat === 'string' ? cat : cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Long Description *
                  </label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Detailed description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Next.js, React, Node.js"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.main.primary }}
                  >
                    {editingId ? 'Update' : 'Add'} Project
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Projects List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Projects ({projects.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {project.category}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

