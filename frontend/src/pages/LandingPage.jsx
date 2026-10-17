import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Volume2,
  CheckCircle,
  ShieldCheck,
  Users,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { fetchCategories, fetchPhrases } from '../api/contentApi.js';
import { AudioButton } from '../components/AudioButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  const { data: catResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: phraseResponse } = useQuery({
    queryKey: ['featured-phrases'],
    queryFn: () => fetchPhrases({ limit: 4 })
  });

  const categories = catResponse?.data || [];
  const featuredPhrases = phraseResponse?.data || [];

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">

            <h1 className="text-4xl sm:text-6xl font-black text-brand-ink leading-[1.08] tracking-tight">
              Say hello to everyday practical <span className="text-brand-orange">ಕನ್ನಡ.</span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-muted leading-relaxed max-w-2xl font-normal">
              Whether you are hailing an auto in Bengaluru, ordering filter coffee at a Darshini, or
              introducing yourself to colleagues, KannadaConnect makes spoken Kannada accessible,
              interactive, and culturally rich.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={isAuthenticated ? '/dashboard' : '/categories'}
                className="px-7 py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-orangeDark text-white font-extrabold text-base shadow-lg shadow-brand-orange/25 transition-all flex items-center gap-2"
              >
                <span>{isAuthenticated ? 'Go to My Dashboard' : 'Start Learning Now'}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/quizzes"
                className="px-6 py-3.5 rounded-2xl border-2 border-brand-line bg-white hover:bg-brand-pale text-brand-ink font-bold text-base transition-all flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5 text-brand-orange" />
                <span>Try a Quick Quiz</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-brand-muted font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>Free & Beginner-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>10 Structured Situations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span>Audio Pronunciation</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Art Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-orange-100 rounded-3xl p-8 sm:p-10 border border-brand-line shadow-xl overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  First Word to Learn
                </span>
                <AudioButton text="ನಮಸ್ಕಾರ" size="md" />
              </div>

              <div className="my-8 text-center">
                <div className="text-6xl sm:text-7xl font-black kannada-text text-amber-950 tracking-tight">
                  ನಮಸ್ಕಾರ
                </div>
                <div className="mt-2 text-2xl font-bold text-brand-orangeDark">Namaskāra!</div>
                <p className="text-sm font-semibold text-brand-muted mt-1">Hello / Greetings</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-brand-line/60 shadow-sm flex items-center justify-between">
                <div>
                  <strong className="text-xs text-brand-ink block font-bold">Universal Etiquette</strong>
                  <span className="text-xs text-brand-muted">Used with palms folded at any time of day</span>
                </div>
                <Link
                  to="/phrases"
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeDark"
                >
                  More Phrases →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Statement */}
      <section className="bg-brand-paper py-16 border-y border-brand-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green">
              Why KannadaConnect?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink">
              Breaking language barriers in Karnataka
            </h2>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Every year, thousands of students, IT professionals, healthcare workers, and travelers
              arrive in Karnataka. Traditional resources often focus on formal grammar rather than
              the colloquial, practical language needed on buses, at markets, and with neighbours.
              KannadaConnect bridges this gap with situational learning, authentic audio, and instant feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-line space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-pale text-brand-orange flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink">Real-Life Situations</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Learn phrases organized by daily context: auto meters, BMTC routes, vegetable markets,
                darshinis, and clinics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-line space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink">Spoken Audio & Script</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Listen to natural pronunciations via browser Speech Synthesis (kn-IN) and view exact
                Kannada script alongside English transliteration.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/60 border border-brand-line space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink">Active Recall & Quizzes</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Reinforce what you study with flashcards, authoritatively validated quizzes, and
                personalized streak tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Situation Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
              Structured Tracks
            </span>
            <h2 className="text-3xl font-extrabold text-brand-ink mt-1">
              Choose a situation to begin
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              10 comprehensive modules built for practical, everyday mastery.
            </p>
          </div>
          <Link
            to="/categories"
            className="text-sm font-bold text-brand-orange hover:text-brand-orangeDark flex items-center gap-1 self-start"
          >
            <span>View all 10 tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat._id}
              to={`/categories/${cat.slug}`}
              className="group bg-brand-paper rounded-3xl border border-brand-line p-6 hover:shadow-lg hover:border-brand-orange/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-pale text-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon || '📚'}
                </div>
                <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm font-semibold text-brand-green kannada-text mt-0.5">
                  {cat.titleKannada}
                </p>
                <p className="text-xs text-brand-muted mt-3 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-line flex items-center justify-between text-xs font-semibold text-brand-muted">
                <span>
                  {cat.lessonCount || 1} lesson{cat.lessonCount === 1 ? '' : 's'} · {cat.phraseCount || 4} phrases
                </span>
                <span className="text-brand-orange font-bold group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Phrases Demonstration */}
      {featuredPhrases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-cream/80 rounded-3xl border border-brand-line p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green">
                  Interactive Audio Demo
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">
                  Listen and learn starter phrases
                </h2>
              </div>
              <Link
                to="/phrases"
                className="px-4 py-2 rounded-xl bg-brand-paper border border-brand-line text-xs font-bold text-brand-ink hover:bg-brand-pale"
              >
                Open Full Phrase Library →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredPhrases.map((phrase) => (
                <div
                  key={phrase._id}
                  className="bg-brand-paper p-5 rounded-2xl border border-brand-line shadow-sm flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-xl font-extrabold kannada-text text-brand-ink">
                      {phrase.kannada}
                    </h4>
                    <p className="text-xs font-semibold text-brand-orangeDark">{phrase.transliteration}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{phrase.english}</p>
                  </div>
                  <AudioButton text={phrase.kannada} size="md" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-orange to-amber-600 p-8 sm:p-14 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Start speaking Kannada with confidence today!
          </h2>
          <p className="max-w-2xl mx-auto text-white/90 text-base sm:text-lg mb-8 leading-relaxed font-medium">
            Join learners from across India and around the world. Track your daily streak, master
            vocabulary with flashcards, and pass interactive quizzes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="px-8 py-3.5 rounded-2xl bg-white text-brand-orangeDark font-extrabold text-base hover:bg-brand-pale transition-all shadow-md"
            >
              {isAuthenticated ? 'View My Progress' : 'Create Free Account'}
            </Link>
            <Link
              to="/flashcards"
              className="px-8 py-3.5 rounded-2xl border-2 border-white/80 text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              Practice Flashcards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
