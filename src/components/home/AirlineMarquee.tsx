import React from 'react';
import { IMAGES } from '../../data/images';
import { Plane } from 'lucide-react';

export const AirlineMarquee: React.FC = () => {
  return (
    <div className="w-full py-6 overflow-hidden mt-4 sm:mt-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-800 font-bold shrink-0">
          <Plane className="w-3.5 h-3.5 text-blue-700" />
          <span>Seeded airline data</span>
        </div>

        {/* Marquee Row */}
        <div className="flex items-center justify-center md:justify-end gap-6 sm:gap-8 flex-wrap">
          {IMAGES.airlines.map((airline) => (
            <div
              key={airline.code}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 border border-white/80 shadow-sm hover:border-blue-400 hover:shadow transition-all"
              title={`Simulated schedule partner: ${airline.name}`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: airline.color }}
              />
              <span className="font-mono text-xs font-bold text-slate-800">
                {airline.code}
              </span>
              <span className="text-xs text-slate-600 font-medium hidden sm:inline">
                {airline.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
