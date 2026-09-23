import React from 'react';
import { Cloud, Database, Cpu, Layout, ArrowRight } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <section id="architecture" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
            System Topology
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mt-4 tracking-tight">
            Modular <span className="font-semibold">Architecture</span>
          </h2>
          <p className="text-slate-600 text-base mt-2">
            A clean decoupled layout connecting user interface telemetry, PostgreSQL persistence, and dedicated ML inference.
          </p>
        </div>

        {/* Interactive / SVG Diagram Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl overflow-x-auto">
          {/* Flow Diagram */}
          <div className="min-w-[700px] flex flex-col items-center">
            <div className="w-full flex items-center justify-between gap-4 relative py-6">
              {/* Box 1: React + Vite Client */}
              <div className="flex-1 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white mx-auto flex items-center justify-center mb-3">
                  <Layout className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">React + Vite UI</h4>
                <p className="text-xs text-slate-500 mt-1">TypeScript & Tailwind</p>
                <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  Landing & Operations App
                </span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-[10px] font-mono text-slate-500 mb-1">Auth & Realtime</span>
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>

              {/* Box 2: Local State Store */}
              <div className="flex-1 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white mx-auto flex items-center justify-center mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Local State Store</h4>
                <p className="text-xs text-slate-500 mt-1">LocalStorage & Context</p>
                <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                  Flights, Gates, Decisions
                </span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-[10px] font-mono text-slate-500 mb-1">In-Memory Sync</span>
                <ArrowRight className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Box 3: Simulation Engine */}
              <div className="flex-1 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white mx-auto flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Simulation Engine</h4>
                <p className="text-xs text-slate-500 mt-1">Physics-Based Heuristics</p>
                <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-700">
                  Predictive Delay Model
                </span>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-[10px] font-mono text-slate-500 mb-1">Weight Scoring</span>
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>

              {/* Box 4: Gate Recommendation Engine */}
              <div className="flex-1 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-center shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center mb-3">
                  <Cloud className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Gate Engine</h4>
                <p className="text-xs text-slate-500 mt-1">Multi-criteria Evaluator</p>
                <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  Explainable Ranks
                </span>
              </div>
            </div>

            {/* Sub-note */}
            <div className="mt-8 p-3.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>
                <strong>Future Cloud Roadmap:</strong> Designed for future migration to cloud-native infrastructure (AWS/Azure containerized microservices, Redis caching, and Kafka event streaming).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
