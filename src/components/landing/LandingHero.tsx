import React, { useState } from 'react';
import { IMAGES } from '../../data/images';
import { ArrowDown, ChevronLeft, ChevronRight, Users, ShieldCheck, Cpu } from 'lucide-react';

interface LandingHeroProps {
  onSignInClick: () => void;
  onScrollDown: () => void;
}

const WORKFLOW_STAGES = [
  { id: 1, label: '01/06', title: 'MONITOR', text: 'Real-time telemetry of scheduled and active movements' },
  { id: 2, label: '02/06', title: 'PREDICT', text: 'Machine-learning flight delay probability & duration' },
  { id: 3, label: '03/06', title: 'DETECT', text: 'Automated apron buffer & gate overlap conflict detection' },
  { id: 4, label: '04/06', title: 'RECOMMEND', text: 'Multi-criteria explainable gate assignment suggestions' },
  { id: 5, label: '05/06', title: 'SIMULATE', text: 'What-if disruption scenarios and cascading tail evaluation' },
  { id: 6, label: '06/06', title: 'APPROVE', text: 'Human-in-the-loop validation, auditing, and gate commitment' },
];

export const LandingHero: React.FC<LandingHeroProps> = ({ onSignInClick, onScrollDown }) => {
  const [activeTab, setActiveTab] = useState<'Monitor' | 'Predict' | 'Recommend'>('Monitor');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  const prevStage = () => {
    setCurrentStageIdx((prev) => (prev === 0 ? WORKFLOW_STAGES.length - 1 : prev - 1));
  };

  const nextStage = () => {
    setCurrentStageIdx((prev) => (prev === WORKFLOW_STAGES.length - 1 ? 0 : prev + 1));
  };

  const stage = WORKFLOW_STAGES[currentStageIdx];

  return (
    <section className="relative w-full h-screen max-h-[1000px] min-h-[650px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#6BA9F3] via-[#8DC3F8] to-[#CDE4FC] text-slate-900 select-none pt-16 sm:pt-20 pb-4">
      {/* Volumetric cloud layers & ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.skyBlueClouds})` }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/30 rounded-full blur-3xl pointer-events-none" />

      {/* GIANT WATERMARK TEXT BEHIND AIRCRAFT */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="text-[15vw] font-extrabold text-white/20 tracking-tighter uppercase whitespace-nowrap drop-shadow-sm font-sans">
          SkyOps
        </span>
      </div>

      {/* TOP HERO HEADLINE CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-2 sm:mt-4 shrink-0">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 backdrop-blur-md border border-white/70 shadow-sm text-[11px] font-semibold tracking-widest text-slate-800 uppercase mb-3">
          <span>Aviation Operations Intelligence</span>
        </div>

        {/* Huge Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.1] mb-2 sm:mb-3">
          Predict Disruptions. <br />
          <span className="font-semibold text-slate-950">Decide Smarter.</span>
        </h1>

        {/* Sub-copy */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-700 font-normal leading-relaxed mb-4">
          SkyOps is an AI-assisted decision-support platform that predicts flight delays, detects gate conflicts, and recommends explainable gate assignments for airport operators.
        </p>

        {/* CTA Button & Down Arrow */}
        <div className="flex items-center justify-center">
          <button
            onClick={onSignInClick}
            className="px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold bg-[#FAF8F5] text-slate-900 shadow-lg shadow-sky-900/10 border border-white hover:bg-[#F2EFE9] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In to SkyOps
          </button>
        </div>
      </div>

      {/* AIRCRAFT VISUAL CENTERPIECE & FLOATING THUMBNAILS */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-1 px-4 flex items-center justify-center flex-1 min-h-0">
        {/* Floating Thumbnail 1: Apron (Top Left) */}
        <div className="hidden lg:block absolute left-10 top-0 w-28 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shadow-sky-900/15 animate-float-slow bg-white">
          <img src={IMAGES.thumbnails.apron} alt="Airport Apron" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-1.5">
            <span className="text-[10px] text-white font-medium">Apron Control</span>
          </div>
        </div>

        {/* Floating Thumbnail 2: Control Tower (Bottom Left) */}
        <div className="hidden lg:block absolute left-24 bottom-2 w-28 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shadow-sky-900/15 animate-float-delayed bg-white">
          <img src={IMAGES.thumbnails.controlTower} alt="Control Tower" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-1.5">
            <span className="text-[10px] text-white font-medium">Tower ATC</span>
          </div>
        </div>

        {/* Large Airliner Visual */}
        <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center pointer-events-none">
          <img
            src={IMAGES.landingJetTransparent}
            alt="SkyOps Aircraft Airliner"
            className="w-full max-h-[260px] sm:max-h-[290px] md:max-h-[320px] object-contain drop-shadow-[0_25px_30px_rgba(15,23,42,0.25)] transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = IMAGES.landingHeroJet;
            }}
          />
          {/* Cloud mist cushion under jet */}
          <div className="absolute -bottom-4 w-3/4 h-12 bg-white/40 blur-2xl rounded-full pointer-events-none" />
        </div>

        {/* Floating Thumbnail 3: Radar Flight Map (Top Right) */}
        <div className="hidden lg:block absolute right-24 top-0 w-28 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shadow-sky-900/15 animate-float-slow bg-white">
          <img src={IMAGES.thumbnails.radarMap} alt="Radar Flight Map" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-1.5">
            <span className="text-[10px] text-white font-medium">Radar Telemetry</span>
          </div>
        </div>

        {/* Floating Thumbnail 4: Gate / Jet Bridge (Bottom Right) */}
        <div className="hidden lg:block absolute right-10 bottom-2 w-28 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl shadow-sky-900/15 animate-float-delayed bg-white">
          <img src={IMAGES.thumbnails.jetBridge} alt="Gate Jet Bridge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-1.5">
            <span className="text-[10px] text-white font-medium">Gate Allocation</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Button Centered */}
      <div className="relative z-20 flex justify-center -mt-1 mb-2 shrink-0">
        <button
          onClick={onScrollDown}
          className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-transform hover:scale-110 active:scale-95"
          aria-label="Scroll to content"
        >
          <ArrowDown className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      {/* BOTTOM HERO BAR: Human-in-the-loop, Tabs, Pager */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-white/30 text-xs text-slate-800 shrink-0">
        {/* Bottom Left: Human-in-the-loop Decision Support */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white text-[10px] font-bold">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center border-2 border-white text-[10px] font-bold">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-xs">Human-in-the-loop decision support</p>
            <p className="text-[11px] text-slate-600">Operator maintains 100% final approval authority</p>
          </div>
        </div>

        {/* Bottom Center: Tab Pills */}
        <div className="flex items-center p-1 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
          {(['Monitor', 'Predict', 'Recommend'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Bottom Right: Workflow Pager 01/06 */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="font-mono text-slate-900 font-bold">{stage.label}</span>
            <span className="ml-2 font-semibold text-slate-950">{stage.title}</span>
            <p className="text-[11px] text-slate-600 hidden sm:block max-w-[200px] truncate">{stage.text}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevStage}
              className="w-7 h-7 rounded-full bg-white/50 hover:bg-white text-slate-800 flex items-center justify-center border border-white/60 transition-colors"
              aria-label="Previous stage"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextStage}
              className="w-7 h-7 rounded-full bg-white/50 hover:bg-white text-slate-800 flex items-center justify-center border border-white/60 transition-colors"
              aria-label="Next stage"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
