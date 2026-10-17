import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ message = 'Loading KannadaConnect…' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <Loader2 className="w-8 h-8 text-brand-orange animate-spin mb-3" />
      <p className="text-sm font-semibold text-brand-muted">{message}</p>
    </div>
  );
};
