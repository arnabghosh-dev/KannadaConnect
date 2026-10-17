import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Search } from 'lucide-react';
import { fetchFavorites } from '../api/userApi.js';
import { PhraseCard } from '../components/PhraseCard.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { EmptyState } from '../components/EmptyState.jsx';

export const FavoritesPage = () => {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: fetchFavorites
  });

  const phrases = response?.data || [];

  const handleFavoriteChange = () => {
    queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
    queryClient.invalidateQueries({ queryKey: ['user-progress'] });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your saved phrases…" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
          Personal Bookmarks
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
          Saved Favorite Phrases
        </h1>
        <p className="text-sm text-brand-muted mt-1 max-w-2xl">
          Quickly review phrases you have bookmarked for easy reference during travel, dining, or conversations.
        </p>
      </div>

      {phrases.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorite phrases saved yet"
          description="Click the heart icon on any phrase card in the library or lessons to save it here."
          actionLabel="Explore Phrase Library"
          onAction={() => (window.location.href = '/phrases')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phrases.map((phrase) => (
            <PhraseCard
              key={phrase._id}
              phrase={phrase}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
