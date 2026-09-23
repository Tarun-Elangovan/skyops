import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { Plane, Clock, AlertTriangle, DoorOpen, ArrowRight } from 'lucide-react';

export const AirportStatusGlance: React.FC = () => {
  const navigate = useNavigate();
  const { flights, gates } = useOperations();

  const activeFlights = flights.filter(f => f.status === 'In Air' || f.status === 'Boarding' || f.status === 'Landed');
  const delayedFlights = flights.filter(f => f.status === 'Delayed' || f.delayDurationMinutes > 15);
  const gateConflicts = gates.filter(g => g.status === 'Conflict').length + flights.filter(f => f.conflictDetails).length;
  const availableGates = gates.filter(g => g.status === 'Available');

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-700 font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              REAL-TIME OVERVIEW
            </span>
            <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mt-2 font-display">
              Airport Status at a Glance
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Synchronized operational telemetry for Chhatrapati Shivaji Maharaj International (BOM).
            </p>
          </div>

          <button
            onClick={() => navigate('/app/dashboard')}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 group self-start lg:self-auto"
          >
            <span>Open Operations Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Compact KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Active Flights */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-sm hover:shadow transition-shadow">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">Active Flights</span>
              <span className="text-3xl font-extrabold font-mono text-[#0F172A] mt-1 block">
                {activeFlights.length}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block font-mono">
                {flights.length} total scheduled
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 2: Delayed Flights */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-sm hover:shadow transition-shadow">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">Delayed Flights</span>
              <span className="text-3xl font-extrabold font-mono text-amber-600 mt-1 block">
                {delayedFlights.length}
              </span>
              <span className="text-[11px] text-amber-600/80 mt-1 block font-mono">
                {Math.round((delayedFlights.length / flights.length) * 100)}% of movement
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 3: Gate Conflicts */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-sm hover:shadow transition-shadow">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">Gate Conflicts</span>
              <span className="text-3xl font-extrabold font-mono text-rose-600 mt-1 block">
                {gateConflicts}
              </span>
              <span className="text-[11px] text-rose-600/80 mt-1 block font-mono">
                Action required
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 4: Available Gates */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between shadow-sm hover:shadow transition-shadow">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">Available Gates</span>
              <span className="text-3xl font-extrabold font-mono text-emerald-600 mt-1 block">
                {availableGates.length}
              </span>
              <span className="text-[11px] text-emerald-600/80 mt-1 block font-mono">
                Across T1, T2 &amp; T3
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <DoorOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
