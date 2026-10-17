import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { fetchCategory } from '../api/contentApi.js';
import { PhraseCard } from '../components/PhraseCard.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';

export const CategoryDetailPage = () => {
  const { idOrSlug } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ['category', idOrSlug],
    queryFn: () => fetchCategory(idOrSlug)
  });

  const category = response?.data;

  if (isLoading) {
    return <LoadingSpinner message="Loading track content…" />;
  }

  if (!category) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold">Category not found</h2>
        <Link to="/categories" className="text-brand-orange mt-2 inline-block font-semibold">
          ← Back to all tracks
        </Link>
      </div>
    );
  }

  const lessons = category.lessons || [];
  const phrases = category.phrases || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        to="/categories"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>All Tracks</span>
      </Link>

      {/* Track Banner */}
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pale text-brand-orange text-xs font-bold">
            <span>Track #{category.order}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-ink">
            {category.title}
          </h1>
          <p className="text-xl font-bold text-brand-green kannada-text">
            {category.titleKannada}
          </p>
          <p className="text-sm text-brand-muted leading-relaxed pt-2">
            {category.description}
          </p>
        </div>

        <div className="w-24 h-24 rounded-3xl bg-brand-cream border border-brand-line flex items-center justify-center text-5xl shadow-inner flex-shrink-0">
          {category.icon || '📚'}
        </div>
      </div>

      {/* Lessons in this Track */}
      {lessons.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-brand-ink flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-orange" />
            <span>Structured Lessons ({lessons.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson._id}
                to={`/lessons/${lesson.slug}`}
                className="group bg-brand-paper rounded-2xl border border-brand-line p-6 hover:shadow-md hover:border-brand-orange/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted mb-2 font-semibold">
                    <span className="uppercase tracking-wider text-brand-green">
                      {lesson.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.estimatedMinutes} mins</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-ink group-hover:text-brand-orange transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs font-bold text-brand-green kannada-text mt-0.5">
                    {lesson.titleKannada}
                  </p>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-line flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Start Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Phrases in this Track */}
      {phrases.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-brand-ink flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green" />
              <span>Phrases in this Track ({phrases.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {phrases.map((phrase) => (
              <PhraseCard
                key={phrase._id}
                phrase={{ ...phrase, categoryId: category }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
