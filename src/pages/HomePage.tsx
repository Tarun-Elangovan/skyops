import React from 'react';
import { GenesisNavbar } from '../components/home/GenesisNavbar';
import { GenesisHero } from '../components/home/GenesisHero';
import { FloatingSearchBar } from '../components/home/FloatingSearchBar';
import { AirlineMarquee } from '../components/home/AirlineMarquee';
import { AttentionCardsCarousel } from '../components/home/AttentionCardsCarousel';
import { AirportStatusGlance } from '../components/home/AirportStatusGlance';
import { PendingRecommendationsList } from '../components/home/PendingRecommendationsList';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Floating Glass Pill Navbar */}
      <GenesisNavbar />

      {/* 2. Hero: Sky blue, airliner, giant SkyOps watermark, welcome greeting */}
      <GenesisHero />

      {/* 3 & 4. Search Bar & Seeded Airline Marquee Transition Area (All Grey) */}
      <div className="w-full bg-[#9DA0A6] border-y border-slate-400/40 relative pb-2">
        <FloatingSearchBar />
        <AirlineMarquee />
      </div>

      {/* 5, 6, 7. Operational Roster & Intel (Cohesive White / Light Theme matching other pages) */}
      <div className="w-full bg-[#F8FAFC] text-[#0F172A] border-t border-slate-200/80 flex-1 pb-16">
        {/* 5. Flights Requiring Attention */}
        <AttentionCardsCarousel />

        {/* 6. Airport Status at a Glance (4 Compact KPI Cards) */}
        <AirportStatusGlance />

        {/* 7. Pending Gate Recommendations */}
        <PendingRecommendationsList />
      </div>
    </div>
  );
};
