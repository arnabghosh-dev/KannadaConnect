import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Globe, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-brand-line bg-brand-cream/60 py-12 text-sm text-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-black mb-3">
              <span className="text-brand-orange kannada-text">ಕನ್ನಡ</span>
              <span className="text-brand-ink">Connect</span>
            </div>
            <p className="max-w-md text-brand-muted leading-relaxed">
              Created for the <strong>Kannada Technology Challenge</strong> under the problem
              statement <em>“Kannada for Everyone.”</em> Helping beginners, students, professionals,
              and tourists build conversational confidence in practical, everyday situations.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} KannadaConnect</p>
          
        </div>
      </div>
    </footer>
  );
};
