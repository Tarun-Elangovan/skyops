import React, { useState } from 'react';
import { useOperations } from '../../context/OperationsContext';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Filter,
  Check
} from 'lucide-react';
import { AlertSeverity } from '../../types';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertRead } = useOperations();
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'All') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const getSeverityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-sky-600" />
            <span>OPERATIONAL EVENT DISPATCH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Operational Alerts Feed
          </h1>
        </div>

        {/* Severity Filter */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600">
          {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                filterSeverity === sev
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-[#0F172A]">No Active Alerts</p>
            <p className="mt-1">All operational notifications have been acknowledged.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors rounded-2xl ${
                  !alert.read ? 'bg-sky-50/40' : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-display">
                      {alert.title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      • {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    {alert.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!alert.read ? (
                    <button
                      onClick={() => markAlertRead(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Acknowledge</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-1">
                      Acknowledged
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
