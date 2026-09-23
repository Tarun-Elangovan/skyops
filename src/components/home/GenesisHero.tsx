import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { IMAGES } from '../../data/images';
import { Shield, Sparkles } from 'lucide-react';

export const GenesisHero: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative w-full min-h-[75vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#6BA9F3] via-[#8DC3F8] to-[#CDE4FC] text-slate-900 select-none pt-28 pb-16">
      {/* Volumetric cloud layers & ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.skyBlueClouds})` }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/30 rounded-full blur-3xl pointer-events-none" />

      {/* GIANT WATERMARK TEXT BEHIND AIRCRAFT (Landing style) */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="text-[16vw] font-extrabold text-white/20 tracking-tighter uppercase whitespace-nowrap drop-shadow-sm font-sans">
          SkyOps
        </span>
      </div>

      {/* TOP HEADLINE CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-2">
        {/* Small Headline Above / Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 backdrop-blur-md border border-white/70 shadow-sm text-xs font-semibold tracking-widest text-slate-800 uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Operations Overview</span>
        </div>

        {/* Greeting & Role Badge */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-[1.1]">
            Welcome back, <span className="font-semibold text-slate-950">{user?.name || 'Sarah Chen'}</span>
          </h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono uppercase bg-blue-600 text-white shadow-sm shadow-blue-500/25 flex items-center gap-1.5 font-bold">
            <Shield className="w-3 h-3 text-white" />
            <span>{user?.role || 'Operator'}</span>
          </span>
        </div>

        <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mt-3">
          Live apron telemetry, active aircraft turnaround monitoring, and AI-assisted gate reassignment workspace.
        </p>
      </div>

      {/* AIRCRAFT VISUAL CENTERPIECE (Landing jet style) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto py-4 px-4 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
          <img
            src={IMAGES.landingJetTransparent}
            alt="SkyOps Aircraft Airliner"
            className="w-full max-h-[320px] object-contain drop-shadow-[0_25px_30px_rgba(15,23,42,0.25)] transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = IMAGES.landingHeroJet;
            }}
          />
          {/* Cloud mist cushion under jet */}
          <div className="absolute -bottom-6 w-3/4 h-16 bg-white/50 blur-2xl rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
