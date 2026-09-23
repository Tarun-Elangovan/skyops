import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOperations } from '../../context/OperationsContext';
import {
  Plane,
  Clock,
  AlertTriangle,
  DoorOpen,
  TrendingUp,
  GitFork,
  Radio,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ArrowUpRight,
  Filter,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { flights, gates, recommendations, approveRecommendation, rejectRecommendation } = useOperations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Delayed' | 'In Flight' | 'Boarding' | 'Conflict'>('All');

  // KPI Calculations
  const activeFlights = flights.filter(f => f.status === 'In Air' || f.status === 'Boarding' || f.status === 'Landed');
  const delayedFlights = flights.filter(f => f.status === 'Delayed' || f.delayDurationMinutes > 15);
  const highRiskFlights = flights.filter(f => f.riskLevel === 'HIGH' || f.riskLevel === 'CRITICAL');
  const gateConflicts = gates.filter(g => g.status === 'Conflict').length + flights.filter(f => f.conflictDetails).length;
  const availableGates = gates.filter(g => g.status === 'Available');
  const predictedDelays = flights.filter(f => f.delayProbability >= 50);
  const cascadeEvents = flights.filter(f => f.downstreamFlights.length > 0);

  // Filtered Flights for Table
  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.currentGate.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Conflict'
        ? Boolean(flight.conflictDetails)
        : flight.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Chart Data: Status Distribution
  const statusCounts = flights.reduce((acc: Record<string, number>, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {});

  const statusPieData = [
    { name: 'In Air', value: statusCounts['In Air'] || 0, color: '#0284c7' },
    { name: 'Delayed', value: statusCounts['Delayed'] || 0, color: '#f59e0b' },
    { name: 'Scheduled', value: statusCounts['Scheduled'] || 0, color: '#64748b' },
    { name: 'Boarding', value: statusCounts['Boarding'] || 0, color: '#3b82f6' },
    { name: 'Landed', value: statusCounts['Landed'] || 0, color: '#10b981' },
  ].filter(d => d.value > 0);

  // Chart Data: Hourly Activity
  const hourlyActivityData = [
    { hour: '06:00', arrivals: 4, departures: 2, delayed: 0 },
    { hour: '08:00', arrivals: 12, departures: 9, delayed: 3 },
    { hour: '10:00', arrivals: 16, departures: 14, delayed: 5 },
    { hour: '12:00', arrivals: 9, departures: 11, delayed: 2 },
    { hour: '14:00', arrivals: 14, departures: 12, delayed: 4 },
    { hour: '16:00', arrivals: 18, departures: 15, delayed: 6 },
    { hour: '18:00', arrivals: 15, departures: 16, delayed: 4 },
    { hour: '20:00', arrivals: 8, departures: 7, delayed: 1 },
  ];

  // Helper Badge
  const getStatusBadge = (status: string, hasConflict: boolean) => {
    if (hasConflict) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          Conflict
        </span>
      );
    }
    switch (status) {
      case 'On Time':
      case 'Landed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {status}
          </span>
        );
      case 'In Air':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
            In Air
          </span>
        );
      case 'Boarding':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Boarding
          </span>
        );
      case 'Delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Delayed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Page Header (Matching Reference Live ADS-B Banner) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>OPERATIONAL FLIGHT DECK &amp; APRIORI INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Aviation Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/recommendations"
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <span>Review Gate Approvals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top-Level KPIs (7 Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Active</span>
            <Plane className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#0F172A]">{activeFlights.length}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{flights.length} total scheduled</div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Delayed</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">{delayedFlights.length}</div>
            <div className="text-[10px] text-amber-600/80 mt-0.5 font-medium">Over 15m delay</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">High Risk</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-rose-600">{highRiskFlights.length}</div>
            <div className="text-[10px] text-rose-600/80 mt-0.5 font-medium">Score &gt; 70/100</div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Conflicts</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-rose-600">{gateConflicts}</div>
            <div className="text-[10px] text-rose-600/80 mt-0.5 font-medium">Apron overlaps</div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Available</span>
            <DoorOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">{availableGates.length}</div>
            <div className="text-[10px] text-emerald-600/80 mt-0.5 font-medium">T1, T2 &amp; T3</div>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">ML Predictions</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600">{predictedDelays.length}</div>
            <div className="text-[10px] text-blue-600/80 mt-0.5 font-medium">&gt; 50% delay prob</div>
          </div>
        </div>

        {/* KPI 7 */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Cascade</span>
            <GitFork className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-purple-600">{cascadeEvents.length}</div>
            <div className="text-[10px] text-purple-600/80 mt-0.5 font-medium">Downstream risks</div>
          </div>
        </div>
      </div>

      {/* 3. Main Operational Content & Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Operations Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            {/* Table Controls (Search & Filter Pills) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0F172A] font-display">
                  Live Flight Operations Table
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synchronized transponder records with integrated Random Forest delay estimations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search flight or gate..."
                    className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all w-36 sm:w-44"
                  />
                </div>

                {/* Filter Pills matching reference style */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600">
                  {(['All', 'Delayed', 'In Flight', 'Conflict'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                        statusFilter === st
                          ? 'bg-white text-slate-900 font-bold shadow-sm'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#E2E8F0]">
                    <th className="py-3 px-3">Flight No.</th>
                    <th className="py-3 px-3">Route</th>
                    <th className="py-3 px-3">STD / STA</th>
                    <th className="py-3 px-3">Gate</th>
                    <th className="py-3 px-3">ML Delay</th>
                    <th className="py-3 px-3">Risk</th>
                    <th className="py-3 px-3 text-right">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-xs">
                  {filteredFlights.map((flight) => {
                    const hasConflict = Boolean(flight.conflictDetails);

                    return (
                      <tr
                        key={flight.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="py-3.5 px-3">
                          <Link
                            to={`/app/flights/${flight.id}`}
                            className="font-mono font-bold text-[#0F172A] group-hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                          >
                            <Plane className="w-3.5 h-3.5 text-sky-500" />
                            <span>{flight.flightNumber}</span>
                          </Link>
                          <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                            {flight.airline} • {flight.aircraftType}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-semibold text-slate-800">
                          <div>{flight.origin} → {flight.destination}</div>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">
                            Tail {flight.tailNumber}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-slate-600">
                          <div className="font-mono font-medium">{flight.scheduledDeparture}</div>
                          <span className="text-[10px] font-mono text-slate-400">ETA {flight.estimatedArrival}</span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            hasConflict
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {flight.currentGate}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-mono font-bold text-amber-600">
                            {flight.delayProbability}%
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            +{flight.delayDurationMinutes}m est.
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
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

                        <td className="py-3.5 px-3 text-right">
                          {getStatusBadge(flight.status, hasConflict)}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <Link
                            to={`/app/flights/${flight.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors inline-block"
                            title="Inspect Flight Disruption Factors"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Row: Hourly Activity & Status Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Hourly Traffic Area Chart (8 cols) */}
            <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-display">Hourly Flight Activity</h4>
                  <p className="text-[11px] text-slate-500">Arrivals vs Departures vs Delayed Overruns</p>
                </div>
                <span className="text-[10px] font-mono text-blue-700 font-bold px-2.5 py-0.5 bg-blue-50 border border-blue-200 rounded-full">
                  Live Hub Flow
                </span>
              </div>
              <div className="h-56 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDelay" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#0F172A', fontWeight: 600 }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#0F172A', fontWeight: 600 }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        fontSize: '11px',
                        color: '#0F172A',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
                      }}
                    />
                    <Area type="monotone" dataKey="arrivals" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorArr)" name="Arrivals" />
                    <Area type="monotone" dataKey="delayed" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDelay)" name="Delayed Movements" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Pie Chart (4 cols) */}
            <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#0F172A] font-display">Flights by Status</h4>
                <p className="text-[11px] text-slate-500">Current active partition</p>
                <div className="h-44 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          fontSize: '11px',
                          color: '#0F172A',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-[#E2E8F0]">
                {statusPieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-700 font-semibold truncate">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Gate Recommendations & Recent Alerts (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Pending AI Recommendations Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A] font-display">
                    Pending Recommendations
                  </h3>
                  <p className="text-[11px] text-slate-400">Operator review queue</p>
                </div>
              </div>
              <Link to="/app/recommendations" className="text-[11px] font-bold text-sky-600 hover:text-sky-700">
                View All
              </Link>
            </div>

            <div className="divide-y divide-[#E2E8F0] mt-2">
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {rec.flightNumber}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {rec.score}/100 Fit
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                      {rec.currentGate}
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {rec.recommendedGate}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto font-sans">
                      ({rec.engine})
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                    {rec.reasons[0]}
                  </p>

                  <div className="text-[10px] text-slate-400 pt-1">
                    <span>Estimate: Delay {rec.beforeEstimate.expectedDelayMin}m → {rec.afterEstimate.expectedDelayMin}m</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => approveRecommendation(rec.id)}
                      className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Check className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectRecommendation(rec.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Gate Status Overview */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-sm font-extrabold text-[#0F172A] font-display">
                Apron Gate Allocation
              </h3>
              <Link to="/app/gates" className="text-[11px] font-bold text-sky-600 hover:text-sky-700">
                Gate Timeline →
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {gates.slice(0, 12).map((g) => {
                const isConflict = g.status === 'Conflict';
                const isAvail = g.status === 'Available';
                const isOcc = g.status === 'Occupied';

                return (
                  <div
                    key={g.id}
                    title={`${g.gateNumber} (${g.terminal}) - ${g.status}`}
                    className={`p-2 rounded-xl text-center border font-mono text-xs transition-all ${
                      isConflict
                        ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                        : isAvail
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : isOcc
                        ? 'bg-sky-50 border-sky-200 text-sky-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="font-bold">{g.gateNumber}</div>
                    <div className="text-[9px] uppercase font-sans mt-0.5 truncate">{g.status}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
