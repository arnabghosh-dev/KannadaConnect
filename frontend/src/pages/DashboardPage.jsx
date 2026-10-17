import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Flame,
  BookOpen,
  Sparkles,
  Award,
  Heart,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Compass
} from 'lucide-react';
import { fetchProgress, resetProgress } from '../api/userApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';

export const DashboardPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: progressResponse, isLoading } = useQuery({
    queryKey: ['user-progress'],
    queryFn: fetchProgress
  });

  const resetMutation = useMutation({
    mutationFn: resetProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      alert('Your learning progress has been reset successfully.');
    }
  });

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your learning progress? This cannot be undone.')) {
      resetMutation.mutate();
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Fetching your learning progress…" />;
  }

  const progress = progressResponse?.data || {
    completedLessonsCount: 0,
    totalLessonsCount: 10,
    practicedPhrasesCount: 0,
    totalPhrasesCount: 36,
    currentStreak: 1,
    longestStreak: 1,
    quizStats: { totalAttempts: 0, bestScore: 0, avgScore: 0 },
    favoriteCount: 0,
    completedLessons: [],
    practicedPhrases: [],
    nextLesson: null
  };

  const lessonPct = Math.round(
    (progress.completedLessonsCount / Math.max(1, progress.totalLessonsCount)) * 100
  );
  const phrasePct = Math.round(
    (progress.practicedPhrasesCount / Math.max(1, progress.totalPhrasesCount)) * 100
  );

  const hasActivity =
    progress.completedLessonsCount > 0 ||
    progress.practicedPhrasesCount > 0 ||
    progress.quizStats.totalAttempts > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-pale via-orange-50 to-brand-cream rounded-3xl border border-brand-line p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
            Learner Dashboard
          </span>
          <h1 className="text-3xl font-black text-brand-ink mt-1">
            Namaskāra, {user?.name}!
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Goal: <strong className="text-brand-ink">{user?.learningGoal || 'Everyday Kannada'}</strong> · Primary Language: <strong className="text-brand-ink">{user?.nativeLanguage || 'English'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/categories"
            className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Continue Courses</span>
          </Link>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-brand-line bg-white hover:bg-red-50 text-brand-muted hover:text-red-600 transition-colors"
            title="Reset my progress"
            aria-label="Reset my progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Streak */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0 font-bold">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-2xl font-black text-brand-ink block">
              {progress.currentStreak} {progress.currentStreak === 1 ? 'day' : 'days'}
            </span>
            <span className="text-xs font-semibold text-brand-muted">Learning Streak</span>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-brand-green flex items-center justify-center flex-shrink-0 font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-brand-ink block">
              {progress.completedLessonsCount} / {progress.totalLessonsCount}
            </span>
            <span className="text-xs font-semibold text-brand-muted">Lessons Completed</span>
          </div>
        </div>

        {/* Phrases Practiced */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-brand-ink block">
              {progress.practicedPhrasesCount} / {progress.totalPhrasesCount}
            </span>
            <span className="text-xs font-semibold text-brand-muted">Phrases Practised</span>
          </div>
        </div>

        {/* Quiz Best Score */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-brand-ink block">
              {progress.quizStats.bestScore}%
            </span>
            <span className="text-xs font-semibold text-brand-muted">Best Quiz Score</span>
          </div>
        </div>
      </div>

      {/* Progress Bars & Recommended Next Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress Breakdown */}
        <div className="lg:col-span-7 bg-brand-paper rounded-3xl border border-brand-line p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-ink">Overall Learning Mastery</h2>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-brand-ink">Course Lessons ({lessonPct}%)</span>
              <span className="text-brand-muted">
                {progress.completedLessonsCount} of {progress.totalLessonsCount} completed
              </span>
            </div>
            <div className="w-full h-3 bg-brand-cream rounded-full overflow-hidden border border-brand-line/60">
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-500"
                style={{ width: `${lessonPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-brand-ink">Phrase Practice Coverage ({phrasePct}%)</span>
              <span className="text-brand-muted">
                {progress.practicedPhrasesCount} of {progress.totalPhrasesCount} phrases practised
              </span>
            </div>
            <div className="w-full h-3 bg-brand-cream rounded-full overflow-hidden border border-brand-line/60">
              <div
                className="h-full bg-brand-orange rounded-full transition-all duration-500"
                style={{ width: `${phrasePct}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-brand-line flex items-center justify-between text-xs font-semibold text-brand-muted">
            <span>Quizzes attempted: {progress.quizStats.totalAttempts}</span>
            <span>Average score: {progress.quizStats.avgScore}%</span>
            <Link to="/favorites" className="text-brand-orange hover:underline font-bold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{progress.favoriteCount} Saved Phrases</span>
            </Link>
          </div>
        </div>

        {/* Recommended Next Lesson Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-brand-paper to-brand-pale/40 rounded-3xl border border-brand-line p-6 sm:p-8 shadow-sm">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-2">
              Recommended Next Step
            </span>
            {progress.nextLesson ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{progress.nextLesson.categoryId?.icon || '📖'}</span>
                  <div>
                    <h3 className="text-xl font-bold text-brand-ink">
                      {progress.nextLesson.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-green kannada-text">
                      {progress.nextLesson.titleKannada}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed line-clamp-3 mb-4">
                  {progress.nextLesson.description}
                </p>
              </>
            ) : (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-2" />
                <h3 className="text-lg font-bold text-brand-ink">All Lessons Explored!</h3>
                <p className="text-xs text-brand-muted mt-1">
                  You have studied all available lessons. Review with flashcards or retake quizzes to maintain your streak!
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-brand-line">
            {progress.nextLesson ? (
              <Link
                to={`/lessons/${progress.nextLesson.slug}`}
                className="w-full py-3 px-4 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Study Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/quizzes"
                className="w-full py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Take a Review Quiz</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Empty State Onboarding if user has 0 activity */}
      {!hasActivity && (
        <div className="bg-brand-paper rounded-3xl border-2 border-dashed border-brand-line p-8 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-pale text-brand-orange flex items-center justify-center mx-auto text-2xl font-bold">
            👋
          </div>
          <h3 className="text-xl font-bold text-brand-ink">Start your first Kannada study session!</h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Welcome to KannadaConnect. We recommend beginning with <strong>Greetings & Introductions</strong>,
            practising with the interactive audio buttons, and testing your recall with flashcards.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/categories/greetings-and-introductions"
              className="px-5 py-2.5 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-brand-orangeDark"
            >
              Start Greetings Track →
            </Link>
            <Link
              to="/flashcards"
              className="px-5 py-2.5 rounded-xl border border-brand-line bg-white font-bold text-sm text-brand-ink hover:bg-brand-pale"
            >
              Flip Flashcards
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
