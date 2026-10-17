import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  HelpCircle,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { fetchQuiz, submitQuizAttempt } from '../api/quizApi.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const QuizTakePage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // questionId -> optionId
  const [quizResult, setQuizResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const { data: response, isLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => fetchQuiz(id)
  });

  const quiz = response?.data;
  const questions = quiz?.questions || [];

  const submitMutation = useMutation({
    mutationFn: (answersArray) => submitQuizAttempt(id, answersArray),
    onSuccess: (data) => {
      setQuizResult(data.result);
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
    onError: (err) => {
      setErrorMsg(
        err.response?.data?.message || 'Failed to submit quiz attempt. Please try again.'
      );
    }
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading quiz questions…" />;
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold">Quiz not found</h2>
        <Link to="/quizzes" className="text-brand-orange mt-2 inline-block font-semibold">
          ← Back to quizzes
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isLastQuestion = currentQIndex === totalQuestions - 1;

  const handleSelectOption = (optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionId
    });
    setErrorMsg('');
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!isAuthenticated) {
      setErrorMsg('Please log in so your quiz attempt and score can be verified and saved.');
      return;
    }

    if (answeredCount < totalQuestions) {
      if (!window.confirm(`You answered ${answeredCount} of ${totalQuestions} questions. Submit anyway?`)) {
        return;
      }
    }

    const answersPayload = Object.entries(selectedAnswers).map(([qId, optId]) => ({
      questionId: qId,
      selectedOptionId: optId
    }));

    submitMutation.mutate(answersPayload);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setQuizResult(null);
    setCurrentQIndex(0);
    setErrorMsg('');
  };

  // --- RESULT VIEW ---
  if (quizResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 sm:p-10 shadow-lg text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto text-3xl font-black ${
              quizResult.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {quizResult.passed ? <Award className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
          </div>

          <h2 className="text-3xl font-black text-brand-ink">
            {quizResult.passed ? 'Congratulations! You Passed!' : 'Quiz Finished! Keep Practicing!'}
          </h2>

          <p className="text-sm text-brand-muted max-w-md mx-auto">
            {quizResult.passed
              ? 'Your score has been authoritatively validated and saved to your learner profile.'
              : 'Review the explanations below to improve your score on the next attempt.'}
          </p>

          <div className="inline-flex items-center gap-6 py-4 px-8 rounded-2xl bg-brand-cream border border-brand-line my-3">
            <div>
              <span className="text-3xl font-black text-brand-ink">{quizResult.score} / {quizResult.totalQuestions}</span>
              <span className="block text-xs font-semibold text-brand-muted">Score</span>
            </div>
            <div className="h-8 w-px bg-brand-line" />
            <div>
              <span className="text-3xl font-black text-brand-orange">{quizResult.percentage}%</span>
              <span className="block text-xs font-semibold text-brand-muted">Percentage</span>
            </div>
            <div className="h-8 w-px bg-brand-line" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green block">Passing</span>
              <span className="text-xl font-black text-brand-ink">{quizResult.passingScore}%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-xl border border-brand-line bg-white hover:bg-brand-pale text-brand-ink font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-md transition-all"
            >
              View Dashboard Progress →
            </Link>
          </div>
        </div>

        {/* Detailed Breakdown with Explanations */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-brand-ink">Answer Review & Explanations</h3>
          <div className="space-y-4">
            {quizResult.breakdown?.map((item, index) => (
              <div
                key={item.questionId}
                className={`p-6 rounded-2xl border ${
                  item.isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-brand-muted uppercase block">
                      Question {index + 1}
                    </span>
                    <h4 className="text-lg font-bold text-brand-ink mt-0.5">
                      {item.questionText}
                    </h4>
                    {item.questionKannada && (
                      <p className="text-lg font-bold kannada-text text-brand-orange mt-1">
                        {item.questionKannada}
                      </p>
                    )}
                  </div>
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-brand-line/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-brand-muted block">Your Answer:</span>
                    <span
                      className={`font-bold ${
                        item.isCorrect ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {item.selectedText}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-muted block">Correct Answer:</span>
                    <span className="font-bold text-emerald-700">{item.correctText}</span>
                  </div>
                </div>

                {item.explanation && (
                  <p className="mt-3 text-xs text-brand-muted italic bg-white/80 p-2.5 rounded-xl border border-brand-line/50">
                    💡 <strong>Note:</strong> {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTION VIEW ---
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-ink"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </Link>
        <div className="text-xs font-bold text-brand-muted">
          Question {currentQIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-brand-line rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-green transition-all duration-300"
          style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-pale px-3 py-1 rounded-full">
            {quiz.title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-3">
            {currentQ.questionText}
          </h2>
          {currentQ.questionKannada && (
            <div className="text-3xl sm:text-4xl font-black kannada-text text-brand-orange mt-3">
              {currentQ.questionKannada}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.options?.map((option) => {
            const isSelected = selectedAnswers[currentQ.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-orange bg-brand-pale text-brand-orangeDark ring-2 ring-brand-orange/30 font-bold'
                    : 'border-brand-line bg-white hover:border-brand-orange/40 hover:bg-brand-cream/60 text-brand-ink'
                }`}
              >
                <span>{option.text}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                    isSelected
                      ? 'border-brand-orange bg-brand-orange text-white'
                      : 'border-brand-line'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Navigation Toolbar */}
        <div className="pt-6 border-t border-brand-line flex items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-brand-line bg-white font-bold text-xs text-brand-ink disabled:opacity-40 hover:bg-brand-pale transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs shadow-sm transition-all"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitMutation.isPending}
                className="px-7 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-extrabold text-xs shadow-md transition-all"
              >
                {submitMutation.isPending ? 'Validating…' : 'Submit Quiz Now ✓'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
