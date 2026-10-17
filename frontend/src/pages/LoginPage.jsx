import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, AlertCircle, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setApiError('');
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Login failed. Please check your email and password.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (email, password) => {
    setValue('email', email);
    setValue('password', password);
    setApiError('');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-brand-paper rounded-3xl border border-brand-line p-8 sm:p-10 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-pale text-brand-orange flex items-center justify-center mx-auto mb-3 font-bold">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-ink">Welcome back!</h1>
          <p className="text-xs text-brand-muted mt-1">
            Log in to continue your Kannada learning journey.
          </p>
        </div>

        {/* Quick Demo Pill Helper */}
        <div className="mb-6 p-3 bg-brand-cream rounded-2xl border border-brand-line/80 text-xs">
          <span className="font-bold text-brand-muted uppercase text-[10px] block mb-2">
            Demo Accounts for Hackathon Evaluators:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('learner@kannadaconnect.org', 'Learner@12345')}
              className="flex-1 py-1.5 px-2 bg-white rounded-xl border border-brand-line hover:border-brand-orange text-brand-ink font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <User className="w-3.5 h-3.5 text-brand-green" />
              <span>Learner Demo</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('admin@kannadaconnect.org', 'Admin@12345')}
              className="flex-1 py-1.5 px-2 bg-white rounded-xl border border-brand-line hover:border-brand-orange text-brand-ink font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-brand-orange" />
              <span>Admin Demo</span>
            </button>
          </div>
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-ink uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-line bg-white text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-md transition-all mt-2"
          >
            {isSubmitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-orange hover:underline">
            Register free
          </Link>
        </p>
      </div>
    </div>
  );
};
