import React from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

export interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
}

interface CapabilityModalProps {
  item: CapabilityItem | null;
  onClose: () => void;
}

export const CapabilityModal: React.FC<CapabilityModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-300 font-semibold">
              {item.category}
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <p className="text-slate-600 text-sm leading-relaxed">{item.fullDesc}</p>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Key Capabilities & Evaluation Criteria
            </h4>
            <div className="space-y-2">
              {item.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Academic research prototype specification</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
