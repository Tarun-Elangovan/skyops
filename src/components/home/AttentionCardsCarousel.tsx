import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { AlertTriangle, Clock, ArrowRight, GitFork, ShieldAlert } from 'lucide-react';

export const AttentionCardsCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { flights } = useOperations();

  // Flights requiring attention: delayed, has conflicts, or high risk
  const attentionFlights = flights.filter(
    (f) => f.riskLevel === 'HIGH' || f.riskLevel === 'CRITICAL' || f.delayDurationMinutes > 20 || f.conflictDetails
  );

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto text-[#0F172A]">
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>ATTENTION REQUIRED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Flights Requiring <span className="font-semibold text-rose-600">Immediate Review</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Detected apron conflicts, high delay probabilities, and rotational cascading risks.
            </p>
          </div>

          <button
            onClick={() => navigate('/app/flights')}
            className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>View all {flights.length} flights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Staggered / Arched Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attentionFlights.slice(0, 3).map((flight, idx) => {
            const isStaggered = idx === 1; // Subtle offset for middle card (arched feel)

            return (
              <div
                key={flight.id}
                onClick={() => navigate(`/app/flights/${flight.id}`)}
                className={`group cursor-pointer rounded-3xl p-6 bg-white hover:bg-slate-50/80 border border-[#E2E8F0] hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between hover:-translate-y-1.5 ${
                  isStaggered ? 'lg:translate-y-2 border-rose-300 ring-2 ring-rose-500/10' : ''
                }`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl font-bold font-mono tracking-tight text-[#0F172A] group-hover:text-blue-600 transition-colors">
                        {flight.flightNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {flight.airline}
                      </span>
                    </div>

                    {/* Risk Pill */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      flight.riskLevel === 'HIGH' || flight.riskLevel === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {flight.riskLevel} RISK
                    </span>
                  </div>

                  {/* Route & Aircraft */}
                  <div className="flex items-center justify-between text-xs py-3 border-y border-[#E2E8F0] my-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">ROUTE</span>
                      <span className="text-sm font-semibold text-[#0F172A] font-mono">
                        {flight.origin} → {flight.destination}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block">AIRCRAFT / TAIL</span>
                      <span className="text-xs font-medium text-slate-600">
                        {flight.aircraftType} ({flight.tailNumber})
                      </span>
                    </div>
                  </div>

                  {/* Delay & Metrics */}
                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
                      <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
                        <Clock className="w-3 text-amber-600" />
                        Delay Prob / Mins
                      </span>
                      <span className="text-sm font-bold font-mono text-amber-600 mt-0.5 block">
                        {flight.delayProbability}% (+{flight.delayDurationMinutes}m)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
                      <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
                        <ShieldAlert className="w-3 text-rose-600" />
                        Assigned Gate
                      </span>
                      <span className="text-sm font-bold font-mono text-[#0F172A] mt-0.5 block">
                        {flight.currentGate}
                      </span>
                    </div>
                  </div>

                  {/* Mini Reason */}
                  <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    {flight.conflictDetails ? (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Gate conflict with {flight.conflictDetails.conflictingFlightNumber} (+{flight.conflictDetails.overlapMinutes}m overlap)</span>
                      </div>
                    ) : flight.downstreamFlights.length > 0 ? (
                      <div className="flex items-center gap-2 text-amber-800">
                        <GitFork className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Cascade risk: {flight.downstreamFlights.length} downstream flight legs on tail {flight.tailNumber}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-800">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Turnaround overrun exceeding safe schedule buffer</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500 group-hover:text-blue-600 transition-colors">
                  <span className="font-mono text-[11px]">Review Disruption Factors</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
