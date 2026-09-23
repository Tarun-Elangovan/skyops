import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { HowItWorksPipeline } from '../components/landing/HowItWorksPipeline';
import { SignInSection } from '../components/landing/SignInSection';
import { CapabilitiesGrid } from '../components/landing/CapabilitiesGrid';
import { KeyFeaturesRow } from '../components/landing/KeyFeaturesRow';
import { ResearchGapSection } from '../components/landing/ResearchGapSection';
import { ArchitectureDiagram } from '../components/landing/ArchitectureDiagram';
import { CtaCard } from '../components/landing/CtaCard';

export const LandingPage: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling (landing page only)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSignIn = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#signin', { offset: -20 });
    } else {
      const el = document.getElementById('signin');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#pipeline', { offset: -20 });
    } else {
      const el = document.getElementById('pipeline');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Navbar */}
      <LandingNavbar onSignInClick={scrollToSignIn} />

      {/* 2. Hero Section (100vh) */}
      <LandingHero onSignInClick={scrollToSignIn} onScrollDown={scrollToNext} />

      {/* 3. How It Works Pipeline */}
      <HowItWorksPipeline />

      {/* 4. Operator Sign-In Section */}
      <SignInSection />

      {/* 5. Platform Capabilities Grid */}
      <CapabilitiesGrid />

      {/* 6. Key Features Row */}
      <KeyFeaturesRow />

      {/* 7. Research & Evaluation */}
      <ResearchGapSection />

      {/* 8. Architecture Diagram */}
      <ArchitectureDiagram />

      {/* 9. Dark Rounded CTA Card */}
      <CtaCard onSignInClick={scrollToSignIn} />
    </div>
  );
};
