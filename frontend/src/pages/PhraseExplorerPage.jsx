import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Volume2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPhrases, fetchCategories } from '../api/contentApi.js';
import { PhraseCard } from '../components/PhraseCard.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { EmptyState } from '../components/EmptyState.jsx';

export const PhraseExplorerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [page, setPage] = useState(1);

  // Fetch categories for filter dropdown
  const { data: catResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const categories = catResponse?.data || [];

  // Fetch phrases with query parameters
  const { data: phraseResponse, isLoading, refetch } = useQuery({
    queryKey: ['phrases', { q: searchTerm, category: selectedCategory, difficulty: selectedDifficulty, page }],
    queryFn: () =>
      fetchPhrases({
        q: searchTerm,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        difficulty: selectedDifficulty === 'All' ? undefined : selectedDifficulty,
        page,
        limit: 12
      })
  });

  const phrases = phraseResponse?.data || [];
  const pagination = phraseResponse?.pagination || { page: 1, totalPages: 1, total: 0 };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
          Database-Backed Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
          Kannada Phrase Explorer
        </h1>
        <p className="text-sm text-brand-muted mt-1 max-w-2xl">
          Search over practical everyday phrases by Kannada script, English meaning, or transliteration.
          Listen to speech playback and practice pronunciation.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-5 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search e.g. 'Namaskara', 'ಬಸ್', 'Water', 'How much'…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-line bg-brand-cream/40 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              <option value="All">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </form>

        <div className="flex items-center justify-between text-xs font-semibold text-brand-muted pt-2 border-t border-brand-line/60">
          <span>Found {pagination.total} matching phrases</span>
          <span>Showing page {pagination.page} of {pagination.totalPages}</span>
        </div>
      </div>

      {/* Phrases Grid */}
      {isLoading ? (
        <LoadingSpinner message="Searching phrases…" />
      ) : phrases.length === 0 ? (
        <EmptyState
          title="No phrases match your criteria"
          description="Try removing the search keyword or switching category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setSelectedDifficulty('All');
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phrases.map((phrase) => (
              <PhraseCard key={phrase._id} phrase={phrase} />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 rounded-xl border border-brand-line bg-white font-bold text-xs text-brand-ink disabled:opacity-40 hover:bg-brand-pale flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-bold text-brand-ink px-3">
                {page} / {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 rounded-xl border border-brand-line bg-white font-bold text-xs text-brand-ink disabled:opacity-40 hover:bg-brand-pale flex items-center gap-1 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
