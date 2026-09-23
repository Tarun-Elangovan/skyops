import React from 'react';
import { Layers } from 'lucide-react';

export const StatusChip: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div
        title="SkyOps operates as a pure frontend application with local state storage"
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Standalone Client</span>
      </div>
    </div>
  );
};
