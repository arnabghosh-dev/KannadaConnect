/**
 * Speech synthesis and recognition utilities for KannadaConnect
 */

export const getKannadaVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith('kn') ||
      v.name.toLowerCase().includes('kannada') ||
      v.name.toLowerCase().includes('india')
  );
};

export const speakKannada = (text, { rate = 0.85, pitch = 1.0, onStart, onEnd, onError } = {}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Speech synthesis is not supported in this browser.'));
    return { supported: false, started: false };
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN';
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(
      (v) => v.lang.toLowerCase() === 'kn-in' || v.lang.toLowerCase().startsWith('kn')
    );

    if (kannadaVoice) {
      utterance.voice = kannadaVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
    return { supported: true, started: true, hasKannadaVoice: !!kannadaVoice };
  } catch (error) {
    if (onError) onError(error);
    return { supported: true, started: false, error };
  }
};

export const isSpeechSynthesisSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const isSpeechRecognitionSupported = () => {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
};

export const createSpeechRecognition = () => {
  if (!isSpeechRecognitionSupported()) return null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'kn-IN';
  recognition.continuous = false;
  recognition.interimResults = false;
  return recognition;
};
