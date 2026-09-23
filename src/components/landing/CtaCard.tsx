import React from 'react';
import { ArrowRight, Plane } from 'lucide-react';

export const CtaCard: React.FC<{ onSignInClick: () => void }> = ({ onSignInClick }) => {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-14 shadow-2xl border border-slate-800">
          {/* Subtle gradient light */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono">
              <Plane className="w-3.5 h-3.5 transform -rotate-45" />
              <span>DECISION SUPPORT READY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
              Start making better <br />
              <span className="font-semibold text-blue-400">gate decisions today.</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore how machine-learning delay forecasts and automated gate conflict resolution elevate airport punctuality and reduce cascading turnaround bottlenecks.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onSignInClick}
                className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#FAF8F5] text-slate-900 hover:bg-[#F2EFE9] transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Sign In to SkyOps</span>
                <ArrowRight className="w-4 h-4 text-slate-700 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
