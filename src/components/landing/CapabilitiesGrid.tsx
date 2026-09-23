import React, { useState } from 'react';
import { CapabilityItem, CapabilityModal } from './CapabilityModal';
import { IMAGES } from '../../data/images';
import { ArrowUpRight } from 'lucide-react';

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    title: 'Flight Monitoring',
    category: 'Situational Awareness',
    shortDesc: 'Continuous real-time tracking of flight status, scheduled vs estimated times, and active apron assignments.',
    fullDesc: 'Centralizes flight telemetry with timetable schedules, aircraft tail tracking, and gate occupancy intervals into a single operational interface.',
    image: IMAGES.thumbnails.radarMap,
    features: [
      'Multi-status indicators: Scheduled, Boarding, In Air, Landed, Delayed',
      'Fast filtering by airline, terminal, route, and risk level',
      'Unified timeline view with turnaround buffers'
    ]
  },
  {
    id: 'cap-2',
    title: 'ML Delay Prediction',
    category: 'Machine Learning',
    shortDesc: 'Random Forest model predicting delay probability and expected overrun minutes with feature importance.',
    fullDesc: 'Trained on reproducible synthetic datasets with peak congestion, weather indices, upstream rotation delay, and airport traffic load.',
    image: IMAGES.thumbnails.controlTower,
    features: [
      'Outputs delay probability percentage and expected delay minutes',
      'Real feature_importances_ explaining primary delay drivers',
      'Baseline comparison against mean and majority-class estimators'
    ]
  },
  {
    id: 'cap-3',
    title: 'Operational Risk Score',
    category: 'Decision Intelligence',
    shortDesc: 'Composite risk scoring /100 evaluating delay duration, turnaround buffer, and downstream propagation.',
    fullDesc: 'Aggregates multi-dimensional operational metrics into an actionable priority score for dispatchers and apron controllers.',
    image: IMAGES.airportRunwayNight,
    features: [
      'Considers delay probability, gate conflict risk, and turnaround feasibility',
      'Categorized into LOW, MEDIUM, HIGH, and CRITICAL bands',
      'Restrained visual representation avoiding unnecessary distractions'
    ]
  },
  {
    id: 'cap-4',
    title: 'Gate Conflict Detection',
    category: 'Apron Operations',
    shortDesc: 'Automated detection of overlapping gate assignments, aircraft size incompatibility, and buffer shortages.',
    fullDesc: 'Scans the scheduled horizon to proactively alert operators when delayed arrivals will overlap with subsequent scheduled departures.',
    image: IMAGES.thumbnails.jetBridge,
    features: [
      'Identifies simultaneous gate occupancies down to the minute',
      'Validates aircraft wingspan and bridge compatibility matrix',
      'Alerts operators with calculated overlap duration'
    ]
  },
  {
    id: 'cap-5',
    title: 'Explainable Gate Recommendation',
    category: 'AI Decision Support',
    shortDesc: 'Transparent multi-factor scoring algorithm recommending alternative gates with full auditable reasons.',
    fullDesc: 'Evaluates candidate gates using configurable weights (compatibility, availability, schedule, turnaround, passenger impact) and outputs human-readable explanations.',
    image: IMAGES.thumbnails.apron,
    features: [
      'Score out of 100 with weighted sub-factor breakdown',
      'Checklist of why each gate was chosen (e.g., aircraft size, buffer, walk distance)',
      'Estimated before/after operational delay impact'
    ]
  },
  {
    id: 'cap-6',
    title: 'Cascading Delay Analysis',
    category: 'Network Disruption',
    shortDesc: 'Tracks aircraft tail rotations to map downstream propagation across subsequent flight legs.',
    fullDesc: 'Detects how an arrival delay propagates to subsequent flights operated by the same physical aircraft tail number.',
    image: IMAGES.homeHeroAirliner,
    features: [
      'Visual rotation chain: Flight A → Flight B → Flight C',
      'Quantifies total affected passenger movements and downstream flights',
      'Enables proactive gate swapping before delays multiply'
    ]
  },
  {
    id: 'cap-7',
    title: 'What-If Simulation',
    category: 'Scenario Evaluation',
    shortDesc: 'Interactive sandbox testing hypothetical delays and gate closures without modifying live operations.',
    fullDesc: 'Operators test "what happens if Flight X is delayed by 45 minutes" to evaluate new conflicts, downstream impacts, and recommended mitigations.',
    image: IMAGES.skyBlueClouds,
    features: [
      'Side-by-side Current vs Simulated comparison table',
      'Zero risk to live data until operator clicks "Apply scenario"',
      'Instantaneous feedback on cascading disruption chain'
    ]
  },
  {
    id: 'cap-8',
    title: 'Approval Workflow',
    category: 'Human-in-the-Loop',
    shortDesc: 'Operator-in-control gate commitments with auditable decisions stored in PostgreSQL database.',
    fullDesc: 'Ensures AI remains an advisory assistant. Operators can Approve, Reject, or Modify recommendations, recording justifications for compliance.',
    image: IMAGES.landingHeroJet,
    features: [
      'Explicit Approve, Reject, and Modify (manual gate) actions',
      'Stores original gate, recommended gate, final gate, and timestamp',
      'Maintains complete operational audit trail'
    ]
  }
];

export const CapabilitiesGrid: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CapabilityItem | null>(null);

  return (
    <section id="capabilities" className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Integrated Operational Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 mt-4 tracking-tight">
              Platform <span className="font-semibold">Capabilities</span>
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Eight cohesive intelligence modules architected to support dispatchers, apron controllers, and airport operational duty managers.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Click any capability card for detail specifications
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              onClick={() => setSelectedItem(cap)}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-white/90 uppercase px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                    {cap.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {cap.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span>Research module</span>
                  <span className="font-mono text-blue-600 font-semibold group-hover:underline">View specs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CapabilityModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};
