import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      nativeLanguage: 'English',
      learningGoal: 'Everyday Conversations in Bengaluru'
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setApiError('');
      await registerAuth(data);
      navigate('/dashboard');
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Registration failed. Please try a different email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 sm:p-10 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-greenLight text-brand-green flex items-center justify-center mx-auto mb-3 font-bold">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-ink">Start learning Kannada</h1>
          <p className="text-xs text-brand-muted mt-1">
            Create your account to track lessons, save favorites, and take quizzes.
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-ink uppercase mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              placeholder="e.g. Priya Sharma"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-white text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-ink uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' }
              })}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-white text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-ink uppercase mb-1">
              Password (min. 6 characters)
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-white text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-brand-ink uppercase mb-1">
                Your Primary Language
              </label>
              <select
                {...register('nativeLanguage')}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Marathi">Marathi</option>
                <option value="Bengali">Bengali</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-brand-ink uppercase mb-1">
                Learning Goal
              </label>
              <select
                {...register('learningGoal')}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Everyday Conversations">Daily Conversations</option>
                <option value="Travel & Commute">Travel & Commute</option>
                <option value="Workplace Interaction">Workplace / Office</option>
                <option value="Culture & Heritage">Culture & Literature</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-bold text-sm shadow-md transition-all mt-4"
          >
            {isSubmitting ? 'Creating account…' : 'Create Free Account'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-orange hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
