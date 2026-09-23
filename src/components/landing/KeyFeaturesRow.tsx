import React from 'react';
import { GitFork, Layers, BarChart3, CheckSquare } from 'lucide-react';

const STATS = [
  {
    icon: GitFork,
    value: '6-Stage',
    label: 'decision workflow',
    sub: 'Monitor to operator approval',
  },
  {
    icon: Layers,
    value: '8 Core',
    label: 'functional modules',
    sub: 'Integrated operations suite',
  },
  {
    icon: BarChart3,
    value: '7 Evaluation',
    label: 'metrics evaluated',
    sub: 'Rigorous benchmark criteria',
  },
  {
    icon: CheckSquare,
    value: '100%',
    label: 'operator-approved decisions',
    sub: 'Strict human-in-the-loop audit',
  },
];

export const KeyFeaturesRow: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 capitalize mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
