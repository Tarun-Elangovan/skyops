import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import {
  Plane,
  Search,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  Clock,
  Compass
} from 'lucide-react';

export const FlightsPage: React.FC = () => {
  const { flights } = useOperations();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialAirline = searchParams.get('airline') || '';
  const initialStatus = searchParams.get('status') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedAirline, setSelectedAirline] = useState(initialAirline);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [sortBy, setSortBy] = useState<'departure' | 'delay' | 'risk'>('departure');

  const filtered = flights.filter((f) => {
    const matchesQ =
      f.flightNumber.toLowerCase().includes(query.toLowerCase()) ||
      f.origin.toLowerCase().includes(query.toLowerCase()) ||
      f.destination.toLowerCase().includes(query.toLowerCase()) ||
      f.aircraftType.toLowerCase().includes(query.toLowerCase()) ||
      f.currentGate.toLowerCase().includes(query.toLowerCase());

    const matchesAirline = !selectedAirline || f.airline.toLowerCase().includes(selectedAirline.toLowerCase());
    const matchesStatus = !selectedStatus || f.status === selectedStatus;

    return matchesQ && matchesAirline && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'delay') return b.delayDurationMinutes - a.delayDurationMinutes;
    if (sortBy === 'risk') return b.operationalRisk - a.operationalRisk;
    return a.scheduledDeparture.localeCompare(b.scheduledDeparture);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <span>FLIGHT OPERATIONS SCHEDULE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Active Flight Monitoring Roster
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Showing {sorted.length} of {flights.length} flights</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by flight number, destination, airport, or gate..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-none focus:border-sky-500"
          >
            <option value="">All Airlines</option>
            <option value="Air India">Air India</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Emirates">Emirates</option>
            <option value="Singapore Airlines">Singapore Airlines</option>
            <option value="Lufthansa">Lufthansa</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-none focus:border-sky-500"
          >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Boarding">Boarding</option>
            <option value="In Air">In Air</option>
            <option value="Landed">Landed</option>
            <option value="Delayed">Delayed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-none focus:border-sky-500"
          >
            <option value="departure">Sort: Departure Time</option>
            <option value="delay">Sort: Delay Duration</option>
            <option value="risk">Sort: Operational Risk</option>
          </select>
        </div>
      </div>

      {/* Flight Operations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#E2E8F0]">
                <th className="py-3 px-3">Flight No.</th>
                <th className="py-3 px-3">Aircraft Model</th>
                <th className="py-3 px-3">Route (Origin → Dest)</th>
                <th className="py-3 px-3">Scheduled / Estimated</th>
                <th className="py-3 px-3">Gate</th>
                <th className="py-3 px-3">ML Prediction</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3 text-right">Status</th>
                <th className="py-3 px-3 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {sorted.map((flight) => {
                const hasConflict = Boolean(flight.conflictDetails);

                return (
                  <tr
                    key={flight.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-3 font-mono font-bold text-slate-900 flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-sky-500" />
                      <Link to={`/app/flights/${flight.id}`} className="hover:text-sky-600 transition-colors">
                        {flight.flightNumber}
                      </Link>
                    </td>

                    <td className="py-4 px-3 font-medium text-slate-700">
                      <div>{flight.aircraftType}</div>
                      <span className="text-[10px] text-slate-400">{flight.airline} • {flight.tailNumber}</span>
                    </td>

                    <td className="py-4 px-3 font-semibold text-slate-800">
                      <div>{flight.origin} → {flight.destination}</div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {flight.originName.split(',')[0]} → {flight.destinationName.split(',')[0]}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-600 font-mono">
                      <div>STD {flight.scheduledDeparture}</div>
                      <span className="text-[10px] text-slate-400">STA {flight.estimatedArrival}</span>
                    </td>

                    <td className="py-4 px-3 font-mono font-bold text-slate-800">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        hasConflict ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {flight.currentGate}
                      </span>
                    </td>

                    <td className="py-4 px-3">
                      <div className="font-mono font-bold text-amber-600">
                        {flight.delayProbability}%
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        +{flight.delayDurationMinutes}m
                      </span>
                    </td>

                    <td className="py-4 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        flight.riskLevel === 'HIGH' || flight.riskLevel === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : flight.riskLevel === 'MEDIUM'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {flight.operationalRisk}/100
                      </span>
                    </td>

                    <td className="py-4 px-3 text-right">
                      {hasConflict ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          Conflict
                        </span>
                      ) : flight.status === 'In Air' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                          In Air
                        </span>
                      ) : flight.status === 'Delayed' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Delayed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {flight.status}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-3 text-right">
                      <Link
                        to={`/app/flights/${flight.id}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
