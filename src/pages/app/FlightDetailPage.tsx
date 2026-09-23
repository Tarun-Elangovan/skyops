import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import {
  ArrowLeft,
  Plane,
  Clock,
  AlertTriangle,
  DoorOpen,
  Sparkles,
  GitFork,
  CheckCircle2,
  SlidersHorizontal,
  Shield,
  Layers,
  Check
} from 'lucide-react';

export const FlightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { flights, recommendations, approveRecommendation, applySimulationScenario } = useOperations();

  const flight = flights.find((f) => f.id === id) || flights[0];
  const rec = recommendations.find((r) => r.flightId === flight.id || r.flightNumber === flight.flightNumber);

  // What-if simulator slider state
  const [simDelayMin, setSimDelayMin] = useState(flight.delayDurationMinutes);
  const [scenarioApplied, setScenarioApplied] = useState(false);

  // Calculations for simulated state
  const simHasConflict = simDelayMin > 25;
  const simDownstreamAffected = simDelayMin > 30 ? Math.min(3, Math.floor(simDelayMin / 20)) : 0;

  const handleApplyScenario = () => {
    applySimulationScenario(flight.id, simDelayMin);
    setScenarioApplied(true);
    setTimeout(() => setScenarioApplied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/app/flights"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono text-slate-900">
                {flight.flightNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700">
                {flight.airline}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                flight.riskLevel === 'HIGH' || flight.riskLevel === 'CRITICAL'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {flight.riskLevel} RISK
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {flight.origin} ({flight.originName.split(',')[0]}) → {flight.destination} ({flight.destinationName.split(',')[0]})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/app/recommendations"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:shadow transition-all"
          >
            View Recommendations
          </Link>
        </div>
      </div>

      {/* Grid: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Info, Factors, Conflicts & Cascade */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Schedule & Turnaround Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Operational Schedule &amp; Turnaround Buffer
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Scheduled Times</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                  {flight.scheduledDeparture} → {flight.scheduledArrival}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Timetable slot</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Estimated Times</span>
                <div className="text-lg font-bold font-mono text-amber-600 mt-1">
                  {flight.estimatedDeparture} → {flight.estimatedArrival}
                </div>
                <span className="text-[11px] text-amber-600/80 mt-1 block font-mono">
                  +{flight.delayDurationMinutes}m projected delay
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Aircraft / Turnaround</span>
                <div className="text-lg font-bold text-slate-900 mt-1 truncate">
                  {flight.aircraftType}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block font-mono">
                  Tail: {flight.tailNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: ML Delay Prediction Breakdown (Random Forest Gini Features) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
                  Machine Learning Delay Prediction Factors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real Random Forest tree split contributions (`feature_importances_`) computed from trained model.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono text-amber-600">{flight.delayProbability}%</div>
                <span className="text-[10px] font-mono text-slate-400">Delay Probability</span>
              </div>
            </div>

            <div className="space-y-4">
              {(flight.predictionFactors || []).map((factor, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{factor.factor}</span>
                    <span className="font-mono text-slate-500 font-semibold">{factor.importance}% influence</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-sky-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${factor.importance}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug capitalize">Impact: {factor.impact.replace('-', ' ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Gate Conflict Alert & Cascading Disruption */}
          {flight.conflictDetails ? (
            <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200">
              <div className="flex items-center gap-2.5 text-rose-700 font-bold text-sm mb-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Gate Conflict Detected on {flight.currentGate}</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Flight {flight.flightNumber} has a predicted delay of +{flight.delayDurationMinutes}m, causing a concurrent apron overlap with flight{' '}
                <strong>{flight.conflictDetails.conflictingFlightNumber}</strong> on Gate {flight.conflictDetails.gateNumber} ({flight.conflictDetails.overlapMinutes} min overlap).
              </p>
              <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-700 font-medium">
                <span>Recommended action: Reassign flight to an available compatible gate in Terminal 2.</span>
              </div>
            </div>
          ) : null}

          {/* Rotational Downstream Cascade Chain */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <GitFork className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">
                Cascading Rotational Disruption Chain
              </h3>
            </div>

            {flight.downstreamFlights.length === 0 ? (
              <p className="text-xs text-slate-500">No subsequent flights scheduled for tail number {flight.tailNumber} today.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Delay to this flight propagates across the subsequent flight rotations scheduled on airframe <strong>{flight.tailNumber}</strong>:
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex-1">
                    <span className="text-[10px] font-mono text-amber-700 font-bold uppercase block">Root Leg</span>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{flight.flightNumber}</div>
                    <span className="text-[11px] text-amber-700">+{flight.delayDurationMinutes}m delay</span>
                  </div>

                  <div className="text-slate-400 text-center font-bold">→</div>

                  {flight.downstreamFlights.map((dfId, i) => {
                    const dfFlight = flights.find((f) => f.id === dfId);
                    const dfNum = dfFlight?.flightNumber || dfId.toUpperCase().replace('F-', '');
                    const dfDelay = dfFlight ? dfFlight.delayDurationMinutes : Math.max(10, Math.round(flight.delayDurationMinutes * 0.7));
                    return (
                      <React.Fragment key={dfId}>
                        <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex-1">
                          <span className="text-[10px] font-mono text-purple-700 font-bold uppercase block">Downstream Leg #{i + 1}</span>
                          <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{dfNum}</div>
                          <span className="text-[11px] text-purple-700">+{dfDelay}m propagated delay</span>
                        </div>
                        {i < flight.downstreamFlights.length - 1 && (
                          <div className="text-slate-400 text-center font-bold">→</div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Gate Recommendation & What-If Panel */}
        <div className="lg:col-span-4 space-y-8">
          {/* Explainable AI Gate Recommendation */}
          {rec ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <h3 className="text-sm font-extrabold text-[#0F172A] font-display">
                    AI Recommended Gate
                  </h3>
                </div>
                <span className="text-sm font-black font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {rec.score}/100 Fit
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">CURRENT</span>
                  <span className="font-bold text-rose-600">{rec.currentGate}</span>
                </div>
                <div className="text-slate-400 text-sm">→</div>
                <div>
                  <span className="text-[10px] text-slate-400 block">RECOMMENDED</span>
                  <span className="font-bold text-emerald-700">{rec.recommendedGate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Explainability Justification Checklist
                </span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {rec.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before vs After Impact Comparison */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Impact (Model/Simulation Estimate)
                </span>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Expected Delay:</span>
                  <span className="font-mono font-semibold">{rec.beforeEstimate.expectedDelayMin}m → {rec.afterEstimate.expectedDelayMin}m</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Gate Conflict:</span>
                  <span className="font-mono font-semibold">{rec.beforeEstimate.hasConflict ? 'Yes' : 'No'} → {rec.afterEstimate.hasConflict ? 'Yes' : 'Resolved'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => approveRecommendation(rec.id)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Recommendation</span>
                </button>
              </div>
            </div>
          ) : null}

          {/* Embedded What-If Scenario Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-extrabold text-[#0F172A] font-display">
                What-If Simulation Tester
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Test Additional Delay:</span>
                <span className="font-mono font-bold text-amber-600">+{simDelayMin} min</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={simDelayMin}
                onChange={(e) => setSimDelayMin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Apron Overlap Conflict:</span>
                  <span className={`font-mono font-bold ${simHasConflict ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {simHasConflict ? 'YES' : 'NONE'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Downstream Flights Impacted:</span>
                  <span className="font-mono font-bold text-purple-700">{simDownstreamAffected} legs</span>
                </div>
              </div>

              <button
                onClick={handleApplyScenario}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md"
              >
                {scenarioApplied ? 'Scenario Applied to Schedule!' : 'Apply Scenario to Flight'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
