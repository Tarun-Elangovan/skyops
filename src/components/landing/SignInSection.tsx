import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Eye, EyeOff, Lock, Mail, User, Shield, Check, AlertCircle, ArrowRight } from 'lucide-react';

export const SignInSection: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, signInAsDemo } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Operator');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isDemoMode = true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signUpWithEmail(name || 'Operator', email || 'operator@skyops.aero', password, role);
    } else {
      signInWithEmail(email || 'operator@skyops.aero', password);
    }
    navigate('/home');
  };

  const handleDemoClick = (demoRole: UserRole) => {
    signInAsDemo(demoRole);
    navigate('/home');
  };

  return (
    <section id="signin" className="py-24 px-6 relative flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-slate-50 via-sky-100 to-[#8EC5FC]">
      {/* Background ambient aircraft blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-300/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Frosted Glass Card */}
        <div className="backdrop-blur-xl bg-white/50 border border-white/80 rounded-3xl shadow-2xl p-8 transition-all">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-md shadow-blue-500/30 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isSignUp ? 'Create Operator Account' : 'Operator Sign In'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {isSignUp
                ? 'Register your profile to access SkyOps operations'
                : 'Access the flight operations decision-support system'}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Chen"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@skyops.aero"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/70 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Operational Role
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  >
                    <option value="Operator">Operator (Flight & Gate Control)</option>
                    <option value="Operations Manager">Operations Manager (Decisions & Overrides)</option>
                    <option value="Admin">Admin (Full System Config)</option>
                  </select>
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:text-blue-600 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-full text-sm font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : isSignUp ? 'Create Operator Account' : 'Sign In to SkyOps'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="text-center mt-4 pt-4 border-t border-slate-200/60 text-xs text-slate-600">
            {isSignUp ? (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setErrorMessage(''); }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Need operator access?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setErrorMessage(''); }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Register here
                </button>
              </p>
            )}
          </div>

          {/* DEMO 1-CLICK LOGIN PRESETS (Render ONLY if VITE_DEMO_MODE=true) */}
          {isDemoMode && (
            <div className="mt-6 pt-5 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Demo 1-Click Login (VITE_DEMO_MODE)
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded font-mono">
                  research
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoClick('Operator')}
                  className="px-2.5 py-2 rounded-xl text-xs font-medium bg-white/70 hover:bg-white border border-slate-200 text-slate-800 shadow-sm transition-all text-center flex flex-col items-center gap-1"
                >
                  <span className="font-semibold text-slate-950">Operator</span>
                  <span className="text-[10px] text-slate-500">Sarah Chen</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoClick('Operations Manager')}
                  className="px-2.5 py-2 rounded-xl text-xs font-medium bg-white/70 hover:bg-white border border-slate-200 text-slate-800 shadow-sm transition-all text-center flex flex-col items-center gap-1"
                >
                  <span className="font-semibold text-slate-950">Manager</span>
                  <span className="text-[10px] text-slate-500">M. Vance</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoClick('Admin')}
                  className="px-2.5 py-2 rounded-xl text-xs font-medium bg-white/70 hover:bg-white border border-slate-200 text-slate-800 shadow-sm transition-all text-center flex flex-col items-center gap-1"
                >
                  <span className="font-semibold text-slate-950">Admin</span>
                  <span className="text-[10px] text-slate-500">E. Rostova</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
