import React from 'react';
import { GenesisNavbar } from '../components/home/GenesisNavbar';
import { GenesisHero } from '../components/home/GenesisHero';
import { FloatingSearchBar } from '../components/home/FloatingSearchBar';
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

      {/* 3. Floating Glass Search Bar overlapping bottom edge of hero */}
      <FloatingSearchBar />

      {/* 4, 5, 6. Operational Roster & Intel */}
      <div className="w-full bg-[#F8FAFC] text-[#0F172A] flex-1 pb-16">
        {/* Flights Requiring Attention */}
        <AttentionCardsCarousel />

        {/* Airport Status at a Glance (4 Compact KPI Cards) */}
        <AirportStatusGlance />

        {/* Pending Gate Recommendations */}
        <PendingRecommendationsList />
      </div>
    </div>
  );
};
