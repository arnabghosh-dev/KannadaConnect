import '@testing-library/jest-dom';

// Mock Web Speech API in test environment
if (typeof window !== 'undefined') {
  window.speechSynthesis = {
    speak: () => {},
    cancel: () => {},
    pause: () => {},
    resume: () => {},
    getVoices: () => []
  };

  window.SpeechSynthesisUtterance = function (text) {
    this.text = text;
    this.lang = 'kn-IN';
    this.rate = 1.0;
  };
}
