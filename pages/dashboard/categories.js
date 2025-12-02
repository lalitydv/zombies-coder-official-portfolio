import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { colors } from '../../data/colors';

export default function CategoriesManagement() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

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
          loadCategories();
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

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/dashboard/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('dashboard_token');

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/dashboard/categories/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadCategories();
          setEditingId(null);
          setFormData({ name: '' });
        }
      } else {
        // Create
        const response = await fetch('/api/dashboard/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await loadCategories();
          setIsAdding(false);
          setFormData({ name: '' });
        }
      }
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const token = localStorage.getItem('dashboard_token');
    try {
      const response = await fetch(`/api/dashboard/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await loadCategories();
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id || category);
    setFormData({ name: typeof category === 'string' ? category : category.name });
    setIsAdding(true);
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
        <title>Manage Categories — Dashboard</title>
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
                  Manage Categories
                </h1>
              </div>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                  setFormData({ name: '' });
                }}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.main.primary }}
              >
                + Add Category
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
                {editingId ? 'Edit Category' : 'Add New Category'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Website Development"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.main.primary }}
                  >
                    {editingId ? 'Update' : 'Add'} Category
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                      setFormData({ name: '' });
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Categories ({categories.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {typeof category === 'string' ? category : category.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
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

