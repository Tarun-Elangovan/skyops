import React from 'react';
import { Plane } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', showBadge = false }) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 font-sans font-semibold tracking-tight ${className}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-transform hover:scale-105 ${
        isLight
          ? 'bg-slate-900 text-white shadow-slate-900/10'
          : 'bg-blue-600 text-white shadow-blue-500/20'
      }`}>
        <Plane className="w-4 h-4 transform -rotate-45" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          SkyOps
        </span>
        {showBadge && (
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 font-semibold">
            OPS
          </span>
        )}
      </div>
    </div>
  );
};
