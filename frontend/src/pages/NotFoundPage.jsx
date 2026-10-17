import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-3xl bg-brand-pale text-brand-orange flex items-center justify-center text-3xl font-black mb-4">
        404
      </div>
      <h1 className="text-3xl font-black text-brand-ink mb-2">Page Not Found</h1>
      <p className="text-sm text-brand-muted max-w-sm mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
        <Link
          to="/categories"
          className="px-5 py-2.5 rounded-xl border border-brand-line bg-white hover:bg-brand-pale text-brand-ink font-bold text-xs flex items-center gap-1.5"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Tracks</span>
        </Link>
      </div>
    </div>
  );
};
