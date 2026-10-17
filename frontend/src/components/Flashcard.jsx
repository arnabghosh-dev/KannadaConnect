import React, { useState } from 'react';
import { Volume2, RotateCw, Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { AudioButton } from './AudioButton.jsx';

export const Flashcard = ({
  phrase,
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onMarkPracticed
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!phrase) return null;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleFlip();
    } else if (e.key === 'ArrowRight') {
      onNext();
      setIsFlipped(false);
    } else if (e.key === 'ArrowLeft') {
      onPrevious();
      setIsFlipped(false);
    }
  };

  const categoryName = phrase.categoryId?.title || 'Kannada Basics';

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center select-none" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Progress & Category Counter */}
      <div className="w-full flex items-center justify-between text-xs font-bold text-brand-muted mb-3 px-2">
        <span className="uppercase tracking-wider text-brand-green flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{categoryName}</span>
        </span>
        <span>
          Card {currentIndex + 1} of {totalCards}
        </span>
      </div>

      {/* Interactive Card */}
      <div
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label="Flashcard. Click or press space to flip."
        className="w-full min-h-[300px] bg-brand-paper rounded-3xl border-2 border-brand-line hover:border-brand-orange/60 shadow-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all transform hover:-translate-y-1 relative"
      >
        <span className="absolute top-4 right-4 text-xs font-semibold text-brand-muted bg-brand-pale px-3 py-1 rounded-full flex items-center gap-1">
          <RotateCw className="w-3 h-3" />
          <span>Tap to flip</span>
        </span>

        {!isFlipped ? (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
              Kannada Script
            </span>
            <h2 className="text-4xl sm:text-5xl font-black kannada-text text-brand-ink my-4">
              {phrase.kannada}
            </h2>
            <p className="text-sm text-brand-muted mt-2">Can you recall the meaning?</p>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col items-center">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2">
              Transliteration & Meaning
            </span>
            <h2 className="text-3xl font-extrabold text-brand-orangeDark mb-2">
              {phrase.transliteration}
            </h2>
            <p className="text-2xl font-bold text-brand-ink mb-3">{phrase.english}</p>
            {phrase.usageContext && (
              <p className="text-xs text-brand-muted max-w-sm italic mt-2">"{phrase.usageContext}"</p>
            )}
          </div>
        )}

        <div className="absolute bottom-4 left-4" onClick={(e) => e.stopPropagation()}>
          <AudioButton text={phrase.kannada} size="sm" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex items-center justify-between gap-3 mt-6">
        <button
          onClick={() => {
            onPrevious();
            setIsFlipped(false);
          }}
          className="px-4 py-2.5 rounded-xl border border-brand-line bg-white font-bold text-sm text-brand-ink hover:bg-brand-pale flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => {
            onMarkPracticed(phrase._id);
            onNext();
            setIsFlipped(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 flex items-center gap-2 shadow-sm transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Practised ✓</span>
        </button>

        <button
          onClick={() => {
            onNext();
            setIsFlipped(false);
          }}
          className="px-4 py-2.5 rounded-xl border border-brand-line bg-white font-bold text-sm text-brand-ink hover:bg-brand-pale flex items-center gap-2 transition-colors"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[11px] text-brand-muted mt-3">Keyboard tip: use Space or Enter to flip, arrows to navigate.</p>
    </div>
  );
};
