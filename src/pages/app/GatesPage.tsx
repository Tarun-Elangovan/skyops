import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';
import {
  DoorOpen,
  Filter,
  Plane,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Gate } from '../../types';

export const GatesPage: React.FC = () => {
  const { gates } = useOperations();
  const [selectedTerminal, setSelectedTerminal] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null);

  const filteredGates = gates.filter((g) => {
    const matchesTerm = selectedTerminal === 'All' || g.terminal === selectedTerminal;
    const matchesStat = selectedStatus === 'All' || g.status === selectedStatus;
    return matchesTerm && matchesStat;
  });

  const getStatusColor = (status: Gate['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Occupied':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Reserved':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Conflict':
        return 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse';
      case 'Maintenance':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <span>TERMINAL &amp; APRON MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Airport Gate Allocation &amp; Schedule
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600">
            {(['All', 'T1', 'T2', 'T3'] as const).map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerminal(term)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  selectedTerminal === term
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                {term === 'All' ? 'All Terminals' : `Terminal ${term.replace('T', '')}`}
              </button>
            ))}
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs text-slate-700 outline-none shadow-sm focus:border-sky-500"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Conflict">Conflict</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Gates Grid (Reference Card Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGates.map((gate) => {
          const isConflict = gate.status === 'Conflict';

          return (
            <div
              key={gate.id}
              onClick={() => setSelectedGate(gate)}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1 ${
                isConflict
                  ? 'border-rose-300 ring-2 ring-rose-500/20'
                  : 'border-[#E2E8F0] hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-mono font-bold text-sm">
                    {gate.gateNumber}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 font-display">
                      {gate.terminal === 'T1' ? 'Domestic Terminal 1' : gate.terminal === 'T2' ? 'Integrated Terminal 2' : 'Cargo & Charter T3'}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">{gate.gateType}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getStatusColor(gate.status)}`}>
                  {gate.status}
                </span>
              </div>

              {/* Current Assignment */}
              <div className="py-4 space-y-2 text-xs">
                {gate.currentFlightNumber ? (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Assigned Flight</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {gate.currentFlightNumber}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {gate.occupiedUntil ? `Until ${gate.occupiedUntil}` : 'Active Turnaround'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-emerald-800">
                    <span className="text-[10px] font-mono uppercase block font-bold">Unassigned Stand</span>
                    <span className="text-xs font-medium">Available for immediate tow / arrival</span>
                  </div>
                )}

                {/* Compatibility */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Compatible Aircraft</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {gate.compatibleAircraft.slice(0, 3).map((ac, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                        {ac}
                      </span>
                    ))}
                    {gate.compatibleAircraft.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400">+{gate.compatibleAircraft.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-sky-600 font-semibold">
                <span>View Timeline &amp; Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gate Detail Drawer (Modal) */}
      {selectedGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-2xl max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm shadow-blue-500/25">
                  {selectedGate.gateNumber}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
                    Gate {selectedGate.gateNumber} Details
                  </h3>
                  <p className="text-xs text-slate-500">Terminal {selectedGate.terminal} • {selectedGate.gateType} Stand</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGate(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stand Specifications */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stand Specifications</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-mono">STATUS</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedGate.status}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 block font-mono">JET BRIDGE</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">Dual Telescopic A-VDGS</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-mono mb-1">CERTIFIED AIRCRAFT TYPES</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGate.compatibleAircraft.map((ac, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                      {ac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Turnaround Timeline</span>
              <div className="space-y-2">
                {selectedGate.scheduledFlights.map((sf, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-sky-600" />
                      <span className="font-mono font-bold text-slate-900">{sf.flightNumber}</span>
                    </div>
                    <div className="text-slate-600 font-mono">
                      <span>Arrives {sf.arrives}</span>
                      <span className="mx-2">•</span>
                      <span>Departs {sf.departs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedGate(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Close Gate Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
