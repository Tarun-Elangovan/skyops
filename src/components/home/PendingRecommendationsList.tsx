import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PendingRecommendationsList: React.FC = () => {
  const navigate = useNavigate();
  const { recommendations, approveRecommendation } = useOperations();

  const pending = recommendations.filter((r) => r.status === 'pending');

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI DECISION SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Pending <span className="font-semibold text-blue-600">Gate Recommendations</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Algorithmic alternatives evaluated and queued for human operator approval.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/recommendations')}
          className="text-xs font-mono text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <span>Open Full Recommendation Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {pending.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm text-center text-slate-500 text-xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <p className="font-semibold text-[#0F172A]">All Gate Recommendations Cleared</p>
          <p className="mt-1">No outstanding apron conflicts require manual operator sign-off.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((rec) => (
            <div
              key={rec.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-blue-400 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Info: Flight & Gates */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold font-mono text-[#0F172A]">
                    {rec.flightNumber}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono">
                    <span className="text-slate-400">Current:</span>
                    <span className="text-rose-600 font-bold">{rec.currentGate}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-400">Recommended:</span>
                    <span className="text-emerald-700 font-bold">{rec.recommendedGate}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                    Engine: {rec.engine}
                  </span>
                </div>

                {/* Primary Reason */}
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {rec.reasons[0]}
                </p>

                {/* Model estimate note */}
                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span>
                    Model estimate: Expected delay {rec.beforeEstimate.expectedDelayMin}m → {rec.afterEstimate.expectedDelayMin}m
                  </span>
                  <span>•</span>
                  <span>Conflicts: {rec.beforeEstimate.hasConflict ? 'Yes' : 'No'} → {rec.afterEstimate.hasConflict ? 'Yes' : 'Resolved'}</span>
                </div>
              </div>

              {/* Right Info: Score & Review Button */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Fit Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono text-emerald-600">
                      {rec.score}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/100</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approveRecommendation(rec.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => navigate('/app/recommendations')}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <span>Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
