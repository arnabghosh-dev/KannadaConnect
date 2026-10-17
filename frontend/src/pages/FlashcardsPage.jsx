import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Shuffle, RefreshCw } from 'lucide-react';
import { fetchRandomPhrases, fetchCategories } from '../api/contentApi.js';
import { markPhrasePracticed } from '../api/userApi.js';
import { Flashcard } from '../components/Flashcard.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const FlashcardsPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: catResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const categories = catResponse?.data || [];

  const {
    data: phraseResponse,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['flashcard-phrases', selectedCategory],
    queryFn: () =>
      fetchRandomPhrases({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        count: 20
      })
  });

  const phrases = phraseResponse?.data || [];

  const handleNext = () => {
    if (phrases.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
  };

  const handlePrevious = () => {
    if (phrases.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + phrases.length) % phrases.length);
  };

  const handleMarkPracticed = async (phraseId) => {
    if (isAuthenticated) {
      try {
        await markPhrasePracticed(phraseId);
      } catch (err) {
        console.error('Failed to log phrase practice', err);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Preparing flashcard study session…" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
          Active Recall Practice
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink">
          Interactive Kannada Flashcards
        </h1>
        <p className="text-sm text-brand-muted max-w-md mx-auto">
          Test your memory by recalling the meaning before tapping to flip the card. Practice marks sync with your progress.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-paper p-4 rounded-2xl border border-brand-line shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-brand-muted">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
            }}
            className="px-3 py-1.5 rounded-xl border border-brand-line bg-white text-xs font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="All">All Tracks (Shuffle)</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            refetch();
            setCurrentIndex(0);
          }}
          className="px-3 py-1.5 rounded-xl border border-brand-line bg-brand-pale hover:bg-brand-orange hover:text-white font-bold text-xs text-brand-ink transition-all flex items-center gap-1.5"
          title="Shuffle deck"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle Deck</span>
        </button>
      </div>

      {/* Flashcard Component */}
      {phrases.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No flashcards found"
          description="Try switching categories to load phrases."
          actionLabel="Show All Categories"
          onAction={() => setSelectedCategory('All')}
        />
      ) : (
        <Flashcard
          phrase={phrases[currentIndex]}
          currentIndex={currentIndex}
          totalCards={phrases.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onMarkPracticed={handleMarkPracticed}
        />
      )}
    </div>
  );
};
