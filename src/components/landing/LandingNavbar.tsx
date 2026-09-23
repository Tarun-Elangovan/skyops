import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface LandingNavbarProps {
  onSignInClick: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onSignInClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Logo variant="light" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-800">
          <a href="#pipeline" className="hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#capabilities" className="hover:text-blue-600 transition-colors">Platform</a>
          <a href="#research" className="hover:text-blue-600 transition-colors">Research</a>
          <a href="#architecture" className="hover:text-blue-600 transition-colors">Architecture</a>
        </nav>

        {/* CTA & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSignInClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#FAF8F5] text-slate-900 shadow-sm border border-slate-200/80 hover:bg-[#F2EFE9] hover:border-slate-300 transition-all transform active:scale-95"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-slate-200 text-slate-700 hover:bg-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-white/95 backdrop-blur-2xl border-b border-slate-200 space-y-4">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-800">
            <a
              href="#pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              How it Works
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Platform
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Research
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600"
            >
              Architecture
            </a>
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSignInClick();
            }}
            className="w-full py-3 rounded-full text-center font-semibold bg-[#FAF8F5] text-slate-900 border border-slate-300 shadow-sm"
          >
            Sign In to SkyOps
          </button>
        </div>
      )}
    </header>
  );
};
