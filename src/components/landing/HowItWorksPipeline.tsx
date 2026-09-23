import React from 'react';
import { Eye, TrendingUp, AlertTriangle, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'MONITOR',
    name: 'Flight Telemetry',
    desc: 'Continuous radar and timetable tracking of active flights, gates, and turnaround buffers.',
    icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    step: '02',
    title: 'PREDICT',
    name: 'ML Delay Estimator',
    desc: 'Random Forest model forecasts delay probabilities and expected overrun minutes.',
    icon: TrendingUp,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    step: '03',
    title: 'DETECT',
    name: 'Conflict Engine',
    desc: 'Identifies gate overlaps, aircraft size incompatibility, and turnaround buffer shortfalls.',
    icon: AlertTriangle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    step: '04',
    title: 'RECOMMEND',
    name: 'Explainable Gates',
    desc: 'Scores alternative gates with transparent weight breakdown and auditable reasons.',
    icon: Sparkles,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    step: '05',
    title: 'SIMULATE',
    name: 'What-If Scenarios',
    desc: 'Stress-tests delay scenarios and cascading tail rotations before making commitments.',
    icon: Sliders,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    step: '06',
    title: 'APPROVE',
    name: 'Human Operator',
    desc: 'Operations staff evaluates AI justification to approve, modify, or reject reassignments.',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
];

export const HowItWorksPipeline: React.FC = () => {
  return (
    <section id="pipeline" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
            End-to-End Decision Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mt-4 tracking-tight">
            How <span className="font-semibold">SkyOps Works</span>
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            The core architecture transitions operations from reactive fire-fighting into a proactive 6-stage intelligence pipeline.
          </p>
        </div>

        {/* 6-step Grid */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden xl:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 relative z-10">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon & Step Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Title & Name */}
                    <div className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono mb-1">
                      {item.title}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Stage {index + 1} of 6</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
