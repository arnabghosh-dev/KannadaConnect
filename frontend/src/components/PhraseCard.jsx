import React, { useState } from 'react';
import { Heart, Check, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import { AudioButton } from './AudioButton.jsx';
import { PronunciationModal } from './PronunciationModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { addFavorite, removeFavorite, markPhrasePracticed } from '../api/userApi.js';

export const PhraseCard = ({ phrase, onFavoriteChange, onPracticed }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(phrase.isFavorite || false);
  const [isPracticed, setIsPracticed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isPronounceOpen, setIsPronounceOpen] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please log in to save favorite phrases to your account.');
      return;
    }

    try {
      setIsLoadingFav(true);
      if (isFavorite) {
        await removeFavorite(phrase._id);
        setIsFavorite(false);
        if (onFavoriteChange) onFavoriteChange(phrase._id, false);
      } else {
        await addFavorite(phrase._id);
        setIsFavorite(true);
        if (onFavoriteChange) onFavoriteChange(phrase._id, true);
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    } finally {
      setIsLoadingFav(false);
    }
  };

  const handleMarkPracticed = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsPracticed(true);
      return;
    }

    try {
      await markPhrasePracticed(phrase._id);
      setIsPracticed(true);
      if (onPracticed) onPracticed(phrase._id);
    } catch (err) {
      console.error('Failed to mark phrase practiced', err);
    }
  };

  const categoryName = phrase.categoryId?.title || 'Everyday Kannada';
  const categoryIcon = phrase.categoryId?.icon || '💬';

  return (
    <>
      <div className="bg-brand-paper rounded-2xl border border-brand-line p-5 shadow-sm hover:shadow-md hover:border-brand-orange/40 transition-all flex flex-col justify-between">
        <div>
          {/* Header tags */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green bg-brand-greenLight px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span>{categoryIcon}</span>
              <span>{categoryName}</span>
            </span>

            <button
              onClick={toggleFavorite}
              disabled={isLoadingFav}
              className={`p-1.5 rounded-full transition-colors ${
                isFavorite
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-brand-muted hover:text-red-500 hover:bg-brand-pale'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Kannada Script & Transliteration */}
          <h3 className="text-2xl font-extrabold kannada-text text-brand-ink leading-snug">
            {phrase.kannada}
          </h3>
          <p className="text-brand-orangeDark font-semibold text-sm mt-1">{phrase.transliteration}</p>
          <p className="text-brand-muted text-sm mt-1 leading-relaxed">{phrase.english}</p>

          {/* Collapsible Details (Context & Example) */}
          {showDetails && (
            <div className="mt-4 pt-3 border-t border-brand-line/60 text-xs text-brand-ink space-y-2 bg-brand-cream/50 p-3 rounded-xl">
              {phrase.usageContext && (
                <div>
                  <strong className="text-brand-muted uppercase text-[10px] block">Context:</strong>
                  <p>{phrase.usageContext}</p>
                </div>
              )}
              {phrase.exampleSentenceKn && (
                <div>
                  <strong className="text-brand-muted uppercase text-[10px] block">Example:</strong>
                  <p className="kannada-text font-bold text-brand-ink">{phrase.exampleSentenceKn}</p>
                  <p className="text-brand-muted italic">{phrase.exampleSentenceEn}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="mt-5 pt-3 border-t border-brand-line flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AudioButton text={phrase.kannada} size="sm" />
            <button
              onClick={() => setIsPronounceOpen(true)}
              className="p-1.5 text-xs font-semibold rounded-xl border border-brand-line bg-brand-pale text-brand-ink hover:bg-brand-greenLight hover:text-brand-green transition-colors flex items-center gap-1"
              title="Practice Pronunciation"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Practice</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {(phrase.usageContext || phrase.exampleSentenceKn) && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-semibold text-brand-muted hover:text-brand-ink p-1.5 flex items-center gap-0.5"
                title="Toggle usage context"
              >
                <span>{showDetails ? 'Less' : 'Context'}</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={handleMarkPracticed}
              className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                isPracticed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white border border-brand-line text-brand-ink hover:bg-brand-pale'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isPracticed ? 'Practised' : 'Mark'}</span>
            </button>
          </div>
        </div>
      </div>

      <PronunciationModal
        phrase={phrase}
        isOpen={isPronounceOpen}
        onClose={() => setIsPronounceOpen(false)}
      />
    </>
  );
};
