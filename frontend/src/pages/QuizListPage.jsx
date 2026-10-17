import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HelpCircle, Award, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { fetchQuizzes } from '../api/quizApi.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { EmptyState } from '../components/EmptyState.jsx';

export const QuizListPage = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: fetchQuizzes
  });

  const quizzes = response?.data || [];

  if (isLoading) {
    return <LoadingSpinner message="Loading quizzes…" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
          Authoritative Knowledge Checks
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
          Kannada Quizzes & Challenges
        </h1>
        <p className="text-sm text-brand-muted mt-1 max-w-2xl">
          Test your vocabulary and conversational skills with multiple choice, translation, and sentence completion questions.
          All answers are validated authoritatively on our backend.
        </p>
      </div>

      {quizzes.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No quizzes available"
          description="Check back soon for newly published quizzes."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-brand-paper rounded-3xl border border-brand-line p-6 hover:shadow-lg hover:border-brand-orange/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-brand-muted mb-3">
                  <span className="uppercase tracking-wider text-brand-green bg-brand-greenLight px-2.5 py-0.5 rounded-full">
                    {quiz.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Pass: {quiz.passingScore}%</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-ink mb-1">{quiz.title}</h3>
                <p className="text-xs font-semibold text-brand-green kannada-text">
                  {quiz.category?.titleKannada || 'ಕನ್ನಡ ರಸಪ್ರಶ್ನೆ'}
                </p>
                <p className="text-xs text-brand-muted mt-3 leading-relaxed">
                  {quiz.description || 'Test your practical everyday Kannada vocabulary.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-line flex items-center justify-between">
                <span className="text-xs font-bold text-brand-muted">
                  {quiz.questionCount} Questions
                </span>
                <Link
                  to={`/quizzes/${quiz._id}`}
                  className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
