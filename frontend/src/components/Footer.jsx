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
            <div className="mt-4 flex items-center gap-2 text-xs text-brand-orange font-semibold">
              <Award className="w-4 h-4" />
              <span>Full-Stack EdTech Architecture with Authentic Cultural Context</span>
            </div>
          </div>

          {/* Learn Col */}
          <div>
            <h4 className="font-bold text-brand-ink mb-3 uppercase tracking-wider text-xs">
              Learning Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categories" className="hover:text-brand-orange transition-colors">
                  All 10 Categories
                </Link>
              </li>
              <li>
                <Link to="/phrases" className="hover:text-brand-orange transition-colors">
                  Phrase Explorer & Audio
                </Link>
              </li>
              <li>
                <Link to="/flashcards" className="hover:text-brand-orange transition-colors">
                  Active Recall Flashcards
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-brand-orange transition-colors">
                  Interactive Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="font-bold text-brand-ink mb-3 uppercase tracking-wider text-xs">
              Project Context
            </h4>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex items-start gap-1.5">
                <Globe className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Audio powered by browser Web Speech API (kn-IN)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>Authoritative quiz grading & MongoDB persistence</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Heart className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Dedicated to Karnataka heritage & everyday learners</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} KannadaConnect · Open Source & Hackathon Ready</p>
          <p className="flex items-center gap-1">
            <span>ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ!</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
