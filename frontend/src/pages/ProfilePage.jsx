import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, KeyRound, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { updateProfile, changePassword } from '../api/authApi.js';

export const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { isSubmitting: isProfileSubmitting }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      nativeLanguage: user?.nativeLanguage || 'English',
      learningGoal: user?.learningGoal || 'Everyday Conversations'
    }
  });

  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    reset: resetPassForm,
    formState: { isSubmitting: isPassSubmitting, errors: passErrors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: ''
    }
  });

  const onProfileSubmit = async (data) => {
    try {
      setProfileMsg('');
      setProfileErr('');
      await updateProfile(data);
      await refreshUser();
      setProfileMsg('Profile information updated successfully!');
    } catch (err) {
      setProfileErr(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  const onPassSubmit = async (data) => {
    try {
      setPassMsg('');
      setPassErr('');
      await changePassword(data);
      setPassMsg('Password updated successfully!');
      resetPassForm();
    } catch (err) {
      setPassErr(err.response?.data?.message || 'Failed to update password. Check your current password.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
          Account Settings
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-ink mt-1">
          Learner Profile & Preferences
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Manage your contact details, native language, learning objective, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info Form */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-pale text-brand-orange flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-ink">Personal Details</h2>
              <span className="text-xs text-brand-muted">Email: {user?.email}</span>
            </div>
          </div>

          {profileMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{profileMsg}</span>
            </div>
          )}

          {profileErr && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{profileErr}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-ink uppercase block mb-1">Full Name</label>
              <input
                type="text"
                {...regProfile('name', { required: true })}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line text-sm text-brand-ink"
              />
            </div>

            <div>
              <label className="font-bold text-brand-ink uppercase block mb-1">Native Language</label>
              <select
                {...regProfile('nativeLanguage')}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs text-brand-ink"
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
              <label className="font-bold text-brand-ink uppercase block mb-1">Learning Goal</label>
              <select
                {...regProfile('learningGoal')}
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line bg-white text-xs text-brand-ink"
              >
                <option value="Everyday Conversations in Bengaluru">Daily Conversations</option>
                <option value="Travel & Commute">Travel & Commute</option>
                <option value="Workplace Interaction">Workplace / Office</option>
                <option value="Culture & Heritage">Culture & Literature</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isProfileSubmitting}
              className="w-full py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs shadow-sm transition-all"
            >
              {isProfileSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-brand-paper rounded-3xl border border-brand-line p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-greenLight text-brand-green flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-ink">Security Credentials</h2>
              <span className="text-xs text-brand-muted">Update your account password</span>
            </div>
          </div>

          {passMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{passMsg}</span>
            </div>
          )}

          {passErr && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{passErr}</span>
            </div>
          )}

          <form onSubmit={handlePassSubmit(onPassSubmit)} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-brand-ink uppercase block mb-1">Current Password</label>
              <input
                type="password"
                {...regPass('currentPassword', { required: 'Current password is required' })}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line text-sm"
              />
              {passErrors.currentPassword && (
                <p className="text-red-500 text-[11px] mt-1">{passErrors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label className="font-bold text-brand-ink uppercase block mb-1">
                New Password (min 6 characters)
              </label>
              <input
                type="password"
                {...regPass('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl border border-brand-line text-sm"
              />
              {passErrors.newPassword && (
                <p className="text-red-500 text-[11px] mt-1">{passErrors.newPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPassSubmitting}
              className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs shadow-sm transition-all"
            >
              {isPassSubmitting ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
