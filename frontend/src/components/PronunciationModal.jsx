import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import {
  speakKannada,
  isSpeechRecognitionSupported,
  createSpeechRecognition
} from '../utils/speech.js';

export const PronunciationModal = ({ phrase, isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionSupported = isSpeechRecognitionSupported();

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setFeedback(null);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen || !phrase) return null;

  const handleListenPhrase = () => {
    speakKannada(phrase.kannada, { rate: 0.8 });
  };

  const startListening = () => {
    setErrorMessage('');
    setFeedback(null);
    setTranscript('');

    const recognition = createSpeechRecognition();
    if (!recognition) {
      setErrorMessage('Speech recognition is not supported in this browser. Try Google Chrome or Edge.');
      return;
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);

      // Compare recognized text with target Kannada script
      const cleanRecognized = speechResult.trim().toLowerCase();
      const cleanTarget = phrase.kannada.trim().toLowerCase();

      if (cleanRecognized.includes(cleanTarget) || cleanTarget.includes(cleanRecognized)) {
        setFeedback({
          matched: true,
          message: 'Excellent pronunciation! Your spoken Kannada was recognized accurately.'
        });
      } else {
        setFeedback({
          matched: false,
          message: `Recognized: "${speechResult}". Try listening to the sample pronunciation again and repeat slowly.`
        });
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('No speech detected. Please speak clearly into your microphone.');
      } else {
        setErrorMessage(`Recognition notice: ${event.error}. You can still practice by listening and repeating.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setErrorMessage('Could not initialize microphone. Please check browser settings.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-paper rounded-3xl border border-brand-line shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-brand-muted hover:bg-brand-pale transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-greenLight px-3 py-1 rounded-full">
            Pronunciation Practice
          </span>
          <h3 className="text-3xl font-extrabold kannada-text text-brand-ink mt-3">
            {phrase.kannada}
          </h3>
          <p className="text-brand-orangeDark font-bold text-lg mt-1">{phrase.transliteration}</p>
          <p className="text-brand-muted text-sm mt-0.5">{phrase.english}</p>
        </div>

        {/* Step 1: Listen to reference */}
        <div className="bg-brand-cream/80 p-4 rounded-2xl border border-brand-line mb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-muted uppercase block">Step 1</span>
              <span className="text-sm font-semibold text-brand-ink">Listen to browser speech</span>
            </div>
            <button
              onClick={handleListenPhrase}
              className="px-4 py-2 bg-brand-orange text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-orangeDark transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Sample</span>
            </button>
          </div>
          <p className="text-xs text-brand-muted mt-2 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Generated using browser Speech Synthesis (kn-IN).</span>
          </p>
        </div>

        {/* Step 2: Practice speaking */}
        <div className="bg-brand-pale/60 p-4 rounded-2xl border border-brand-line">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-brand-muted uppercase block">Step 2</span>
              <span className="text-sm font-semibold text-brand-ink">
                Practice Speaking (Microphone)
              </span>
            </div>
          </div>

          {recognitionSupported ? (
            <div className="text-center py-4">
              <button
                onClick={startListening}
                disabled={isListening}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all shadow-md ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                    : 'bg-brand-green text-white hover:bg-brand-green/90'
                }`}
              >
                {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
              </button>
              <p className="text-xs font-semibold text-brand-ink mt-3">
                {isListening ? 'Listening… Speak the Kannada phrase now!' : 'Click to start speaking'}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-700" />
              <span>
                Web Speech Recognition is not available in your current browser. For live speech
                transcription, please use Chrome or Edge. You can still practice by repeating aloud
                after the audio!
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {feedback && (
            <div
              className={`mt-3 p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                feedback.matched
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-brand-cream text-brand-ink border-brand-line'
              }`}
            >
              {feedback.matched ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-brand-orange flex-shrink-0" />
              )}
              <div>
                <p className="font-bold">{feedback.matched ? 'Match Success!' : 'Practice Notice'}</p>
                <p className="mt-0.5">{feedback.message}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-brand-line font-bold text-sm text-brand-ink hover:bg-brand-pale transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
