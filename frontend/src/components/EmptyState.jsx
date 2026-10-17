import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Search,
  title = 'No items found',
  description = 'Try adjusting your search criteria or filters.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-brand-paper rounded-3xl border border-brand-line p-10 text-center max-w-md mx-auto my-6">
      <div className="w-14 h-14 bg-brand-pale text-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-brand-ink mb-1">{title}</h3>
      <p className="text-sm text-brand-muted mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-brand-orangeDark transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
