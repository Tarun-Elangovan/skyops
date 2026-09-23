import React, { useState } from 'react';
import { 
  Sliders, Database, RotateCcw, Shield, Settings as SettingsIcon, Info, CheckCircle2, Sparkles, Layers
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useOperations } from '../../context/OperationsContext';

export const SettingsPage: React.FC = () => {
  const { weights, updateWeights, resetWeights } = useSettings();
  const { resetOperationsData } = useOperations();
  const [resetSuccess, setResetSuccess] = useState(false);

  const totalWeight = 
    weights.compatibilityWeight + 
    weights.availabilityWeight + 
    weights.scheduleWeight + 
    weights.turnaroundWeight + 
    weights.passengerImpactWeight;

  const handleSliderChange = (key: keyof typeof weights, value: number) => {
    updateWeights({ [key]: value });
  };

  const handleResetData = () => {
    resetOperationsData();
    resetWeights();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Engine Calibration
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-display">
            System &amp; Algorithm Configuration
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetWeights}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-[#E2E8F0] shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset Weights
          </button>
        </div>
      </div>

      {/* Section 1: Gate Assignment Scoring Weights */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
                  Multi-Criteria Gate Scoring Weights
                </h3>
                <p className="text-xs text-slate-500">
                  Defines the relative importance used by the recommendation engine to rank candidate gates (0–100 scale).
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sum:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
              totalWeight === 100 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {totalWeight}% {totalWeight === 100 ? '(Calibrated)' : '(Normalized in Engine)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slider 1: Compatibility */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Aircraft Compatibility</span>
              <span className="font-extrabold text-sky-600 font-mono">{weights.compatibilityWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.compatibilityWeight}
              onChange={(e) => handleSliderChange('compatibilityWeight', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Evaluates hard jet bridge constraints, aircraft dimensions, and terminal wing clearance.
            </p>
          </div>

          {/* Slider 2: Availability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Gate Buffer & Free Window</span>
              <span className="font-extrabold text-sky-600 font-mono">{weights.availabilityWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.availabilityWeight}
              onChange={(e) => handleSliderChange('availabilityWeight', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Rewards gates with wider unoccupied temporal buffers before and after occupancy.
            </p>
          </div>

          {/* Slider 3: Schedule Conflict Avoidance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Schedule Conflict Avoidance</span>
              <span className="font-extrabold text-sky-600 font-mono">{weights.scheduleWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.scheduleWeight}
              onChange={(e) => handleSliderChange('scheduleWeight', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Penalizes gates where predicted delay overruns trigger apron overlaps with adjacent flights.
            </p>
          </div>

          {/* Slider 4: Turnaround Feasibility */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Ground Turnaround Feasibility</span>
              <span className="font-extrabold text-sky-600 font-mono">{weights.turnaroundWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.turnaroundWeight}
              onChange={(e) => handleSliderChange('turnaroundWeight', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Rewards proximity to baggage handling facilities, catering services, and fueling pits.
            </p>
          </div>

          {/* Slider 5: Passenger Impact */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Passenger Connection Impact</span>
              <span className="font-extrabold text-sky-600 font-mono">{weights.passengerImpactWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.passengerImpactWeight}
              onChange={(e) => handleSliderChange('passengerImpactWeight', Number(e.target.value))}
              className="w-full accent-sky-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Minimizes passenger walking distances for tight transfer rotations between connecting flights.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Runtime Environment & State Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Frontend Architecture Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] font-display">
                Frontend Architecture
              </h3>
              <p className="text-xs text-slate-500">Standalone React + Vite + TypeScript</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            SkyOps runs as a lightweight, zero-dependency pure frontend web application. All operational rosters, gate constraints, and evaluation metrics operate completely in-memory with browser local storage.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Runtime:</span>
              <span className="font-bold text-slate-800">React 19 + Vite 6 + Tailwind</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Network Calls:</span>
              <span className="font-bold text-emerald-600">0 (Zero External Dependencies)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Environment Variables:</span>
              <span className="font-bold text-slate-800">None Required</span>
            </div>
          </div>
        </div>

        {/* State Persistence & Reset */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] font-display">
                Local State Management
              </h3>
              <p className="text-xs text-slate-500">Browser LocalStorage Persistence</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Decisions, recommendations, and operational overrides persist during your active session. You can restore the pristine scenario at any time.
          </p>

          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {resetSuccess ? 'Restored Initial Scenario!' : 'Reset All Flight & Gate Data'}
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Simulated dataset – all flight trajectories, delays, and apron gate states are research prototype data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
