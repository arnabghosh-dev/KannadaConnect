import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles,
  HelpCircle,
  MessageSquareQuote,
  Lightbulb
} from 'lucide-react';
import { fetchLesson } from '../api/contentApi.js';
import { markLessonComplete } from '../api/userApi.js';
import { PhraseCard } from '../components/PhraseCard.jsx';
import { AudioButton } from '../components/AudioButton.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const LessonDetailPage = () => {
  const { idOrSlug } = useParams();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isCompletedLocally, setIsCompletedLocally] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ['lesson', idOrSlug],
    queryFn: () => fetchLesson(idOrSlug)
  });

  const completeMutation = useMutation({
    mutationFn: () => markLessonComplete(lesson?._id),
    onSuccess: () => {
      setIsCompletedLocally(true);
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      alert('Lesson marked as completed! Your progress has been updated.');
    }
  });

  const lesson = response?.data;

  if (isLoading) {
    return <LoadingSpinner message="Opening lesson…" />;
  }

  if (!lesson) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold">Lesson not found</h2>
        <Link to="/categories" className="text-brand-orange mt-2 inline-block font-semibold">
          ← Back to all courses
        </Link>
      </div>
    );
  }

  const category = lesson.categoryId;
  const phrases = lesson.phrases || [];
  const dialogue = lesson.dialogue || [];
  const quiz = lesson.quiz;

  const handleComplete = () => {
    if (!isAuthenticated) {
      alert('Please log in to save lesson completion to your profile.');
      setIsCompletedLocally(true);
      return;
    }
    completeMutation.mutate();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        to={category?.slug ? `/categories/${category.slug}` : '/categories'}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {category?.title || 'Track'}</span>
      </Link>

      {/* Lesson Header Card */}
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-brand-muted">
          <span className="uppercase tracking-wider text-brand-orange bg-brand-pale px-3 py-1 rounded-full font-bold">
            {category?.title}
          </span>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-wider text-brand-green font-bold">
              {lesson.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{lesson.estimatedMinutes} mins</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink">
          {lesson.title}
        </h1>
        <p className="text-xl font-bold text-brand-green kannada-text">
          {lesson.titleKannada}
        </p>
        <p className="text-sm text-brand-muted leading-relaxed">
          {lesson.description}
        </p>

        {/* Cultural note callout */}
        {lesson.culturalNote && (
          <div className="mt-4 p-4 rounded-2xl bg-brand-cream border border-brand-line flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div className="text-xs text-brand-ink leading-relaxed">
              <strong className="text-brand-orange block font-bold mb-0.5">Cultural Context:</strong>
              {lesson.culturalNote}
            </div>
          </div>
        )}
      </div>

      {/* Situational Dialogue Section */}
      {dialogue.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-ink flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-brand-orange" />
            <span>Situational Dialogue</span>
          </h2>
          <div className="bg-brand-paper rounded-3xl border border-brand-line p-6 sm:p-8 space-y-4 shadow-sm">
            {dialogue.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-line/60 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-green bg-brand-greenLight px-2 py-0.5 rounded-full inline-block">
                    {item.speaker}
                  </span>
                  <div className="text-lg font-bold kannada-text text-brand-ink pt-1">
                    {item.kannada}
                  </div>
                  <div className="text-xs font-semibold text-brand-orangeDark">
                    {item.transliteration}
                  </div>
                  <div className="text-xs text-brand-muted">{item.english}</div>
                </div>
                <AudioButton text={item.kannada} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Phrases Section */}
      {phrases.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-ink flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-green" />
            <span>Key Phrases to Study</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phrases.map((phrase) => (
              <PhraseCard
                key={phrase._id}
                phrase={{ ...phrase, categoryId: category }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lesson Completion and Quiz Action Footer */}
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-brand-ink">Finished reviewing this lesson?</h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Mark this lesson completed to track your mastery on the learner dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleComplete}
            disabled={isCompletedLocally || completeMutation.isPending}
            className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              isCompletedLocally
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-brand-green hover:bg-brand-green/90 text-white shadow-md'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompletedLocally ? 'Lesson Completed ✓' : 'Mark Completed'}</span>
          </button>

          {quiz && (
            <Link
              to={`/quizzes/${quiz.id}`}
              className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Take Quiz ({quiz.totalQuestions} Questions) →</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
