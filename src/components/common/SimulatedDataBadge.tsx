import React from 'react';
import { FlaskConical } from 'lucide-react';

export const SimulatedDataBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 select-none ${className}`}
      title="All flight and delay metrics are simulated for academic research demonstration."
    >
      <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
      <span>Simulated data – research prototype</span>
    </div>
  );
};
