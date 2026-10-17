import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { fetchCategories } from '../api/contentApi.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { EmptyState } from '../components/EmptyState.jsx';

export const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: response, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const categories = response?.data || [];

  const filteredCategories = categories.filter((cat) => {
    const q = searchTerm.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.titleKannada.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading course categories…" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
            Curriculum & Tracks
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
            Browse Kannada by Situation
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-2xl">
            10 structured learning tracks taking you from first greetings to market bargaining, auto travel, and cultural etiquette.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tracks…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-line bg-white text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <EmptyState
          title="No categories matched your search"
          description="Try typing a different keyword or clear the search filter."
          actionLabel="Show All Tracks"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <Link
              key={cat._id}
              to={`/categories/${cat.slug}`}
              className="group bg-brand-paper rounded-3xl border border-brand-line p-6 hover:shadow-lg hover:border-brand-orange/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-pale text-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cat.icon || '📚'}
                  </div>
                  <span className="text-xs font-bold text-brand-muted bg-brand-cream px-2.5 py-1 rounded-full border border-brand-line/60">
                    Track #{cat.order}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm font-semibold text-brand-green kannada-text mt-0.5">
                  {cat.titleKannada}
                </p>
                <p className="text-xs text-brand-muted mt-3 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-line flex items-center justify-between text-xs font-semibold text-brand-muted">
                <span>
                  {cat.lessonCount || 1} lesson · {cat.phraseCount || 4} phrases
                </span>
                <span className="text-brand-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
