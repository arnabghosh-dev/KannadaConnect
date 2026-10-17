import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  BarChart2,
  Heart,
  Shield,
  Menu,
  X,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
      isActive
        ? 'bg-brand-pale text-brand-orangeDark font-bold'
        : 'text-brand-muted hover:text-brand-ink hover:bg-brand-pale/50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <span className="text-2xl text-brand-orange kannada-text font-black">ಕನ್ನಡ</span>
            <span className="text-brand-ink font-bold">Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/categories" className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>Courses</span>
            </NavLink>
            <NavLink to="/phrases" className={navLinkClass}>
              <Search className="w-4 h-4" />
              <span>Phrases</span>
            </NavLink>
            <NavLink to="/flashcards" className={navLinkClass}>
              <Sparkles className="w-4 h-4" />
              <span>Flashcards</span>
            </NavLink>
            <NavLink to="/quizzes" className={navLinkClass}>
              <HelpCircle className="w-4 h-4" />
              <span>Quizzes</span>
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  <BarChart2 className="w-4 h-4" />
                  <span>My Progress</span>
                </NavLink>
                <NavLink to="/favorites" className={navLinkClass}>
                  <Heart className="w-4 h-4" />
                  <span>Saved</span>
                </NavLink>
              </>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                <Shield className="w-4 h-4 text-brand-orange" />
                <span className="text-brand-orange font-bold">Admin</span>
              </NavLink>
            )}
          </nav>

          {/* User Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pale border border-brand-line text-xs font-semibold text-brand-ink hover:border-brand-orange/40 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-brand-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-brand-ink hover:text-brand-orange transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-bold bg-brand-orange hover:bg-brand-orangeDark text-white rounded-xl shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-ink hover:bg-brand-pale transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-line bg-brand-cream px-4 pt-3 pb-6 space-y-2">
          <NavLink
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses & Lessons</span>
          </NavLink>
          <NavLink to="/phrases" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
            <Search className="w-4 h-4" />
            <span>Phrase Explorer</span>
          </NavLink>
          <NavLink
            to="/flashcards"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            <Sparkles className="w-4 h-4" />
            <span>Flashcards</span>
          </NavLink>
          <NavLink to="/quizzes" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
            <HelpCircle className="w-4 h-4" />
            <span>Quizzes</span>
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <BarChart2 className="w-4 h-4" />
                <span>My Progress</span>
              </NavLink>
              <NavLink
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <Heart className="w-4 h-4" />
                <span>Saved Phrases</span>
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClass}
                >
                  <Shield className="w-4 h-4 text-brand-orange" />
                  <span>Administrator Dashboard</span>
                </NavLink>
              )}
              <div className="pt-2 border-t border-brand-line">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out ({user?.name})</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-brand-line flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-brand-line bg-white font-bold text-brand-ink"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-brand-orange text-white font-bold"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
