import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Shield,
  Users,
  BookOpen,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  BarChart2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  fetchAdminStats,
  createAdminCategory,
  deleteAdminCategory,
  createAdminPhrase,
  deleteAdminPhrase,
  fetchAdminUsers,
  updateUserRole
} from '../api/adminApi.js';
import { fetchCategories, fetchPhrases } from '../api/contentApi.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';

export const AdminDashboardPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'categories' | 'phrases' | 'users'

  // Phrase form modal state
  const [isAddPhraseOpen, setIsAddPhraseOpen] = useState(false);
  const [newPhrase, setNewPhrase] = useState({
    kannada: '',
    transliteration: '',
    english: '',
    categoryId: '',
    difficulty: 'beginner',
    usageContext: ''
  });

  // Category form modal state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    slug: '',
    title: '',
    titleKannada: '',
    description: '',
    icon: '✨',
    order: 11
  });

  // Queries
  const { data: statsResponse, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats
  });

  const { data: catResponse } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: fetchCategories
  });

  const { data: phraseResponse } = useQuery({
    queryKey: ['admin-phrases'],
    queryFn: () => fetchPhrases({ limit: 50 })
  });

  const { data: usersResponse } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchAdminUsers,
    enabled: activeTab === 'users'
  });

  // Mutations
  const createPhraseMutation = useMutation({
    mutationFn: createAdminPhrase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-phrases'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setIsAddPhraseOpen(false);
      setNewPhrase({
        kannada: '',
        transliteration: '',
        english: '',
        categoryId: '',
        difficulty: 'beginner',
        usageContext: ''
      });
      alert('New Kannada phrase successfully added!');
    }
  });

  const deletePhraseMutation = useMutation({
    mutationFn: deleteAdminPhrase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-phrases'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    }
  });

  const createCategoryMutation = useMutation({
    mutationFn: createAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setIsAddCategoryOpen(false);
      setNewCategory({
        slug: '',
        title: '',
        titleKannada: '',
        description: '',
        icon: '✨',
        order: 11
      });
      alert('New category created!');
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    }
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  if (statsLoading) {
    return <LoadingSpinner message="Loading administrator controls…" />;
  }

  const stats = statsResponse?.data?.stats || {
    totalUsers: 0,
    totalCategories: 0,
    totalLessons: 0,
    totalPhrases: 0,
    totalQuizzes: 0,
    totalAttempts: 0
  };

  const categories = catResponse?.data || [];
  const phrases = phraseResponse?.data || [];
  const users = usersResponse?.data || [];

  const handleDeletePhrase = (id, kn) => {
    if (window.confirm(`Are you sure you want to delete the phrase "${kn}"?`)) {
      deletePhraseMutation.mutate(id);
    }
  };

  const handleDeleteCategory = (id, title) => {
    if (window.confirm(`Are you sure you want to delete category "${title}" and its content?`)) {
      deleteCategoryMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Role-Based Administration</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
            Administrator Dashboard
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage published learning content, inspect platform statistics, and configure learner roles.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 bg-brand-paper p-1.5 rounded-2xl border border-brand-line">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-brand-orange text-white'
                : 'text-brand-muted hover:text-brand-ink'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-brand-orange text-white'
                : 'text-brand-muted hover:text-brand-ink'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('phrases')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'phrases'
                ? 'bg-brand-orange text-white'
                : 'text-brand-muted hover:text-brand-ink'
            }`}
          >
            Phrases ({stats.totalPhrases})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-brand-orange text-white'
                : 'text-brand-muted hover:text-brand-ink'
            }`}
          >
            Learners ({stats.totalUsers})
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Total Learners</span>
              <span className="text-3xl font-black text-brand-ink mt-1 block">
                {stats.totalUsers}
              </span>
            </div>
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Tracks</span>
              <span className="text-3xl font-black text-brand-orange mt-1 block">
                {stats.totalCategories}
              </span>
            </div>
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Lessons</span>
              <span className="text-3xl font-black text-brand-green mt-1 block">
                {stats.totalLessons}
              </span>
            </div>
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Phrases</span>
              <span className="text-3xl font-black text-blue-600 mt-1 block">
                {stats.totalPhrases}
              </span>
            </div>
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Quizzes</span>
              <span className="text-3xl font-black text-amber-600 mt-1 block">
                {stats.totalQuizzes}
              </span>
            </div>
            <div className="bg-brand-paper p-5 rounded-3xl border border-brand-line shadow-sm">
              <span className="text-xs font-semibold text-brand-muted block">Quiz Attempts</span>
              <span className="text-3xl font-black text-purple-600 mt-1 block">
                {stats.totalAttempts}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-paper p-6 rounded-3xl border border-brand-line space-y-3">
              <h3 className="text-base font-bold text-brand-ink">Security & Authorization Notes</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Every administrative endpoint enforces <code>requireAuth</code> and <code>requireAdmin</code> middleware on Express.js.
                Passwords are encrypted using bcrypt salt rounds, and tokens are passed via HttpOnly cookies and Bearer headers.
              </p>
            </div>
            <div className="bg-brand-paper p-6 rounded-3xl border border-brand-line space-y-3">
              <h3 className="text-base font-bold text-brand-ink">Data Seeding & Verification</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                The database seeder (<code>npm run seed</code>) populates all 10 tracks, authentic Kannada phrases, and evaluation accounts.
                Authoritative quiz answer keys remain server-side and are projected out before sending questions to learners.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-ink">Manage Situation Tracks</h2>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-brand-orangeDark transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Track</span>
            </button>
          </div>

          <div className="bg-brand-paper rounded-3xl border border-brand-line overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream border-b border-brand-line text-brand-muted font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Icon</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Kannada</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line/60">
                {categories.map((c) => (
                  <tr key={c._id} className="hover:bg-brand-pale/30">
                    <td className="py-3 px-4 text-xl">{c.icon || '📚'}</td>
                    <td className="py-3 px-4 font-bold text-brand-ink">{c.title}</td>
                    <td className="py-3 px-4 font-bold text-brand-green kannada-text">{c.titleKannada}</td>
                    <td className="py-3 px-4 text-brand-muted">{c.slug}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteCategory(c._id, c.title)}
                        className="p-1.5 text-brand-muted hover:text-red-600 rounded-lg transition-colors"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PHRASES */}
      {activeTab === 'phrases' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-ink">Manage Kannada Phrases</h2>
            <button
              onClick={() => setIsAddPhraseOpen(true)}
              className="px-4 py-2 bg-brand-green text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-brand-green/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Phrase</span>
            </button>
          </div>

          <div className="bg-brand-paper rounded-3xl border border-brand-line overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream border-b border-brand-line text-brand-muted font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Kannada</th>
                  <th className="py-3 px-4">Transliteration</th>
                  <th className="py-3 px-4">English Meaning</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line/60">
                {phrases.map((p) => (
                  <tr key={p._id} className="hover:bg-brand-pale/30">
                    <td className="py-3 px-4 font-extrabold text-base kannada-text text-brand-ink">
                      {p.kannada}
                    </td>
                    <td className="py-3 px-4 font-bold text-brand-orangeDark">{p.transliteration}</td>
                    <td className="py-3 px-4 text-brand-muted">{p.english}</td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-brand-green">
                      {p.difficulty}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeletePhrase(p._id, p.kannada)}
                        className="p-1.5 text-brand-muted hover:text-red-600 rounded-lg transition-colors"
                        title="Delete phrase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: USERS */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-brand-ink">Registered Learners & Admins</h2>
          <div className="bg-brand-paper rounded-3xl border border-brand-line overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream border-b border-brand-line text-brand-muted font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Goal</th>
                  <th className="py-3 px-4 text-right">Toggle Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line/60">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-brand-pale/30">
                    <td className="py-3 px-4 font-bold text-brand-ink">{u.name}</td>
                    <td className="py-3 px-4 text-brand-muted">{u.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          u.role === 'admin'
                            ? 'bg-brand-pale text-brand-orange border border-brand-orange/30'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-brand-muted">{u.learningGoal || 'General'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          updateUserRoleMutation.mutate({
                            id: u._id,
                            role: u.role === 'admin' ? 'user' : 'admin'
                          })
                        }
                        className="px-2.5 py-1 rounded-lg border border-brand-line bg-white hover:bg-brand-pale text-[11px] font-semibold text-brand-ink"
                      >
                        Set as {u.role === 'admin' ? 'Learner' : 'Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE PHRASE MODAL */}
      {isAddPhraseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-paper rounded-3xl border border-brand-line shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-brand-ink">Create New Kannada Phrase</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block text-brand-ink mb-1">Kannada Script (ಕನ್ನಡ)</label>
                <input
                  type="text"
                  value={newPhrase.kannada}
                  onChange={(e) => setNewPhrase({ ...newPhrase, kannada: e.target.value })}
                  placeholder="e.g. ಶುಭೋದಯ"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line font-bold"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Transliteration</label>
                <input
                  type="text"
                  value={newPhrase.transliteration}
                  onChange={(e) => setNewPhrase({ ...newPhrase, transliteration: e.target.value })}
                  placeholder="e.g. Śubhōdaya"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">English Translation</label>
                <input
                  type="text"
                  value={newPhrase.english}
                  onChange={(e) => setNewPhrase({ ...newPhrase, english: e.target.value })}
                  placeholder="e.g. Good morning"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Category</label>
                <select
                  value={newPhrase.categoryId}
                  onChange={(e) => setNewPhrase({ ...newPhrase, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-line bg-white"
                >
                  <option value="">Select track</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Usage Context</label>
                <input
                  type="text"
                  value={newPhrase.usageContext}
                  onChange={(e) => setNewPhrase({ ...newPhrase, usageContext: e.target.value })}
                  placeholder="e.g. Morning greeting when greeting someone polite"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-brand-line">
              <button
                onClick={() => setIsAddPhraseOpen(false)}
                className="px-4 py-2 rounded-xl border border-brand-line text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => createPhraseMutation.mutate(newPhrase)}
                disabled={!newPhrase.kannada || !newPhrase.english || !newPhrase.categoryId}
                className="px-5 py-2 rounded-xl bg-brand-green text-white font-bold text-xs disabled:opacity-40"
              >
                Save Phrase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-paper rounded-3xl border border-brand-line shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-brand-ink">Create New Track</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block text-brand-ink mb-1">Track Title (English)</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })
                  }
                  placeholder="e.g. Festivals & Celebrations"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Track Title (Kannada)</label>
                <input
                  type="text"
                  value={newCategory.titleKannada}
                  onChange={(e) => setNewCategory({ ...newCategory, titleKannada: e.target.value })}
                  placeholder="e.g. ಹಬ್ಬಗಳು ಮತ್ತು ಆಚರಣೆಗಳು"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line font-bold"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="festivals-and-celebrations"
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>

              <div>
                <label className="font-bold block text-brand-ink mb-1">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-brand-line"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-brand-line">
              <button
                onClick={() => setIsAddCategoryOpen(false)}
                className="px-4 py-2 rounded-xl border border-brand-line text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => createCategoryMutation.mutate(newCategory)}
                disabled={!newCategory.title || !newCategory.titleKannada || !newCategory.slug}
                className="px-5 py-2 rounded-xl bg-brand-orange text-white font-bold text-xs disabled:opacity-40"
              >
                Save Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
