import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AudioButton } from '../components/AudioButton.jsx';
import { PhraseCard } from '../components/PhraseCard.jsx';
import { Flashcard } from '../components/Flashcard.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('AudioButton Component', () => {
  it('renders audio button with accessible label', () => {
    render(<AudioButton text="ನಮಸ್ಕಾರ" />);
    const btn = screen.getByRole('button', { name: /listen to ನಮಸ್ಕಾರ/i });
    expect(btn).toBeInTheDocument();
  });
});

describe('PhraseCard Component', () => {
  const samplePhrase = {
    _id: 'p1',
    kannada: 'ಧನ್ಯವಾದಗಳು',
    transliteration: 'Dhanyavādagaḷu',
    english: 'Thank you',
    difficulty: 'beginner',
    categoryId: { title: 'Greetings', icon: '👋' }
  };

  it('renders Kannada script, transliteration, and English translation', () => {
    renderWithProviders(<PhraseCard phrase={samplePhrase} />);
    expect(screen.getByText('ಧನ್ಯವಾದಗಳು')).toBeInTheDocument();
    expect(screen.getByText('Dhanyavādagaḷu')).toBeInTheDocument();
    expect(screen.getByText('Thank you')).toBeInTheDocument();
    expect(screen.getByText('Greetings')).toBeInTheDocument();
  });
});

describe('Flashcard Component', () => {
  const samplePhrase = {
    _id: 'p2',
    kannada: 'ನೀರು ಬೇಕು',
    transliteration: 'Nīru bēku',
    english: 'I would like water',
    categoryId: { title: 'Food & Restaurants' }
  };

  it('displays Kannada script on front and flips to reveal meaning', () => {
    const handleNext = vi.fn();
    const handlePrev = vi.fn();
    const handlePracticed = vi.fn();

    render(
      <Flashcard
        phrase={samplePhrase}
        currentIndex={0}
        totalCards={5}
        onNext={handleNext}
        onPrevious={handlePrev}
        onMarkPracticed={handlePracticed}
      />
    );

    // Front of card displays Kannada script
    expect(screen.getByText('ನೀರು ಬೇಕು')).toBeInTheDocument();
    expect(screen.queryByText('I would like water')).not.toBeInTheDocument();

    // Tap card to flip
    const card = screen.getByRole('button', { name: /flashcard/i });
    fireEvent.click(card);

    // Back of card reveals English meaning and transliteration
    expect(screen.getByText('I would like water')).toBeInTheDocument();
    expect(screen.getByText('Nīru bēku')).toBeInTheDocument();
  });
});
