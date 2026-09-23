import React from 'react';
import { Link } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import {
  TrendingUp,
  Cpu,
  Plane,
  AlertTriangle,
  GitFork,
  ArrowRight,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';

export const PredictionsPage: React.FC = () => {
  const { flights } = useOperations();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-sky-600" />
            <span>MACHINE LEARNING INFERENCE PIPELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            AI Flight Delay Predictions &amp; Factors
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/recommendations"
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <span>Review Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Predictions Table (Reference Card Style) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
              Predicted Delay Probabilities &amp; Contributing Factors
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Features weighted according to Random Forest tree node split contributions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#E2E8F0]">
                <th className="py-3 px-3">Flight No.</th>
                <th className="py-3 px-3">Route</th>
                <th className="py-3 px-3">Delay Prob</th>
                <th className="py-3 px-3">Expected Overrun</th>
                <th className="py-3 px-3">Primary Contributing Factor</th>
                <th className="py-3 px-3">Risk Tier</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {flights.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-3 font-mono font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-sky-600" />
                      <span>{f.flightNumber}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal font-sans block mt-0.5">
                      {f.aircraftType} ({f.tailNumber})
                    </span>
                  </td>

                  <td className="py-4 px-3 font-medium text-slate-800">
                    {f.origin} → {f.destination}
                  </td>

                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-600 text-sm">
                        {f.delayProbability}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${f.delayProbability}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 font-mono font-bold text-slate-900">
                    +{f.delayDurationMinutes} min
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-medium text-slate-800 block">
                      {f.predictionFactors?.[0]?.factor || 'Airspace corridor density'}
                    </span>
                    <span className="text-[10px] text-slate-400 block line-clamp-1 capitalize">
                      {f.predictionFactors?.[0]?.impact ? `Impact: ${f.predictionFactors[0].impact.replace('-', ' ')} (${f.predictionFactors[0].importance}%)` : 'Nominal variance'}
                    </span>
                  </td>

                  <td className="py-4 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      f.riskLevel === 'HIGH' || f.riskLevel === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : f.riskLevel === 'MEDIUM'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {f.riskLevel}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-right">
                    <Link
                      to={`/app/flights/${f.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all inline-block"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
