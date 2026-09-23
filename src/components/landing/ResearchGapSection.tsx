import React from 'react';
import { Target, Activity, Clock, ShieldAlert, Check } from 'lucide-react';

export const ResearchGapSection: React.FC = () => {
  return (
    <section id="research" className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Research Gap Description */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Academic Research Context
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Addressing the <span className="font-semibold">Integrated Decision Gap</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                Existing literature contains extensive research on flight delay prediction and airport gate assignment as isolated domains. Some studies connect predicted delays with gate reassignments, but frequently treat the process as an offline mathematical optimization problem without human operator interaction.
              </p>
              <p>
                <strong>SkyOps</strong> bridges this gap by developing a practical, lightweight decision-support prototype that unites:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-800 pt-1">
                {[
                  'Flight Telemetry Monitoring',
                  'ML Delay Prediction',
                  'Gate Conflict Detection',
                  'Explainable Gate Recommendations',
                  'Cascading Disruption Analysis',
                  'What-If Scenario Simulation',
                  'Human-in-the-Loop Approval',
                  'Configurable Scoring Weights'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p>
                The research focus is not to replace airport duty managers with black-box automation, but to evaluate how explainable AI recommendations and what-if simulation empower operators to resolve apron conflicts faster and with lower downstream disruption.
              </p>
            </div>
          </div>

          {/* Right Column: Evaluation Metrics */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span>System Evaluation Framework</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    7 rigorous quantitative metrics measured during test benchmark runs
                  </p>
                </div>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Metrics List */}
              <div className="mt-6 space-y-4">
                {[
                  {
                    name: 'Binary Classification (Delay > 15m)',
                    metrics: 'Accuracy, Precision, Recall, F1-Score',
                    desc: 'Evaluates the Random Forest model against baseline majority-class predictions on held-out test splits.'
                  },
                  {
                    name: 'Continuous Delay Duration Error',
                    metrics: 'Mean Absolute Error (MAE in minutes)',
                    desc: 'Quantifies magnitude deviation between expected delay minutes vs simulated actual turnaround overruns.'
                  },
                  {
                    name: 'Gate Conflict Avoidance',
                    metrics: 'Conflicts Before vs Conflicts After',
                    desc: 'Measures total concurrent apron overlaps successfully resolved upon adopting recommendations.'
                  },
                  {
                    name: 'Engine Recommendation Latency',
                    metrics: 'Mean Processing Time (milliseconds)',
                    desc: 'Benchmarks the multi-criteria scoring algorithm across full candidate gate rosters in real-time.'
                  },
                  {
                    name: 'Cascading Propagation Reduction',
                    metrics: 'Downstream Flights Impacted',
                    desc: 'Calculates the prevention of secondary delays across subsequent aircraft tail rotations.'
                  }
                ].map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-200">{m.name}</span>
                      <span className="text-blue-400 font-mono text-[11px]">{m.metrics}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Data Honesty Note */}
              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Results are from simulated/historical datasets and do not represent real-world airport performance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
