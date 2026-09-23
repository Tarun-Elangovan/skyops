import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Edit3,
  Check,
  Plane,
  DoorOpen,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { recommendations, approveRecommendation, rejectRecommendation, modifyRecommendation } = useOperations();
  const [selectedGateMap, setSelectedGateMap] = useState<Record<string, string>>({});
  const [modifyOpenId, setModifyOpenId] = useState<string | null>(null);

  const handleManualAssign = (recId: string) => {
    const customGate = selectedGateMap[recId];
    if (customGate) {
      modifyRecommendation(recId, customGate);
      setModifyOpenId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>HUMAN-IN-THE-LOOP DECISION SUPPORT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Explainable Gate Recommendations
          </h1>
        </div>
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-6">
        {recommendations.map((rec) => {
          const isPending = rec.status === 'pending';
          const isApproved = rec.status === 'approved';
          const isRejected = rec.status === 'rejected';

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm hover:shadow-md transition-all ${
                isApproved
                  ? 'border-emerald-200 ring-2 ring-emerald-500/10'
                  : isRejected
                  ? 'border-slate-200 opacity-60'
                  : 'border-[#E2E8F0] hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-base">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold font-mono text-slate-900">
                        {rec.flightNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Engine: {rec.engine}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isRejected
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {rec.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                      <span className="text-slate-400">Current:</span>
                      <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        {rec.currentGate}
                      </span>
                      <span className="text-slate-400">→ Recommended:</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {rec.recommendedGate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start lg:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Multi-Factor Score
                    </span>
                    <div className="text-3xl font-black font-mono text-emerald-600">
                      {rec.score}<span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                  </div>

                  {isPending && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveRecommendation(rec.id)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => setModifyOpenId(modifyOpenId === rec.id ? null : rec.id)}
                        className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Modify Gate</span>
                      </button>

                      <button
                        onClick={() => rejectRecommendation(rec.id)}
                        className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Modify Gate Manual Selection Drawer */}
              {modifyOpenId === rec.id && (
                <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Manually Select Alternative Stand:</span>
                  <select
                    value={selectedGateMap[rec.id] || ''}
                    onChange={(e) => setSelectedGateMap({ ...selectedGateMap, [rec.id]: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800"
                  >
                    <option value="">Choose Gate...</option>
                    <option value="G14">G14 (Terminal 2 - Wide-body)</option>
                    <option value="G16">G16 (Terminal 2 - Wide-body)</option>
                    <option value="G08">G08 (Terminal 1 - Narrow-body)</option>
                    <option value="G22">G22 (Terminal 3 - Wide-body)</option>
                  </select>
                  <button
                    onClick={() => handleManualAssign(rec.id)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    Commit Assignment
                  </button>
                </div>
              )}

              {/* Explainability Breakdown & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-start">
                {/* Explainability Checklist (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Explainability Justification Breakdown
                  </span>
                  <div className="space-y-2 text-xs text-slate-700">
                    {rec.reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Delta (5 cols) */}
                <div className="md:col-span-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase text-slate-400 font-bold">
                    <span>Operational Impact</span>
                    <span className="text-[10px] text-sky-600 font-sans font-semibold">model estimate</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-slate-600">Expected Turnaround Delay:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {rec.beforeEstimate.expectedDelayMin}m → <span className="text-emerald-700">{rec.afterEstimate.expectedDelayMin}m</span>
                      </span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-slate-600">Concurrent Gate Conflict:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {rec.beforeEstimate.hasConflict ? 'Yes (Overlap)' : 'None'} → <span className="text-emerald-700">{rec.afterEstimate.hasConflict ? 'Yes' : 'Resolved'}</span>
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-600">Scoring Weights Used:</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {rec.weightsUsed.compatibilityWeight}/{rec.weightsUsed.availabilityWeight}/{rec.weightsUsed.scheduleWeight}/{rec.weightsUsed.turnaroundWeight}/{rec.weightsUsed.passengerImpactWeight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
