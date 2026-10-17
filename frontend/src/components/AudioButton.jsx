import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speakKannada, isSpeechSynthesisSupported } from '../utils/speech.js';

export const AudioButton = ({ text, size = 'md', className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState('');

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (!isSpeechSynthesisSupported()) {
      setMessage('Speech not supported in this browser.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsSpeaking(true);
    setMessage('');

    speakKannada(text, {
      rate: 0.85,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        setMessage('Voice unavailable on device.');
        setTimeout(() => setMessage(''), 3000);
      }
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleSpeak}
        disabled={isSpeaking}
        className={`rounded-xl border border-brand-line bg-brand-pale text-brand-ink hover:bg-brand-orange hover:text-white transition-all flex items-center gap-1.5 font-semibold ${
          sizeClasses[size]
        } ${isSpeaking ? 'ring-2 ring-brand-orange animate-pulse bg-brand-orange text-white' : ''} ${className}`}
        title="Listen to Kannada pronunciation (Browser Web Speech API)"
        aria-label={`Listen to ${text}`}
      >
        {isSpeaking ? (
          <>
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
            <span className="hidden sm:inline text-xs font-bold">Speaking…</span>
          </>
        ) : (
          <>
            <Volume2 className={iconSizes[size]} />
            <span className="hidden sm:inline text-xs">Listen</span>
          </>
        )}
      </button>

      {message && (
        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-ink text-white text-[11px] rounded whitespace-nowrap z-30 shadow-md">
          {message}
        </span>
      )}
    </div>
  );
};
