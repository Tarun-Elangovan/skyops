import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useOperations } from '../../context/OperationsContext';
import { StatusChip } from '../common/StatusChip';
import { Bell, User, LogOut, Settings as SettingsIcon, ChevronDown, Check } from 'lucide-react';

export const GenesisNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { alerts, markAlertRead } = useOperations();
  const [profileOpen, setProfileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = alerts.filter(a => !a.read);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Glass Pill Navbar */}
        <div className="w-full flex items-center justify-between px-5 py-2.5 rounded-full bg-white/75 backdrop-blur-2xl border border-white/70 shadow-lg shadow-sky-900/10">
          {/* Logo Left */}
          <Link to="/home" className="flex items-center gap-2">
            <Logo variant="light" />
          </Link>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-slate-700">
            <Link to="/home" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/app/dashboard" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/app/flights" className="hover:text-blue-600 transition-colors">
              Flights
            </Link>
            <Link to="/app/gates" className="hover:text-blue-600 transition-colors">
              Gates
            </Link>
            <Link to="/app/alerts" className="hover:text-blue-600 transition-colors">
              Alerts
            </Link>
          </nav>

          {/* Right Controls: Status Chip, Notifications, Profile Dropdown */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <StatusChip />
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={alertsRef}>
              <button
                onClick={() => setAlertsOpen(!alertsOpen)}
                className="relative p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>

              {/* Alerts Dropdown */}
              {alertsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl p-4 text-xs z-50 text-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-900">Operational Alerts</span>
                    <Link
                      to="/app/alerts"
                      onClick={() => setAlertsOpen(false)}
                      className="text-blue-600 hover:underline text-[11px] font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {alerts.slice(0, 4).map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => markAlertRead(alert.id)}
                        className={`py-2.5 px-2 cursor-pointer rounded-xl transition-colors hover:bg-slate-50 ${
                          !alert.read ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className={`px-1.5 py-0.5 rounded uppercase font-bold ${
                            alert.severity === 'critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            alert.severity === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="font-semibold text-slate-900 text-xs">{alert.title}</p>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm transition-colors text-xs"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {user?.name?.charAt(0) || 'O'}
                </div>
                <span className="hidden sm:inline font-medium text-slate-900">{user?.name || 'Operator'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl p-2 text-xs z-50 text-slate-800">
                  <div className="p-3 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">{user?.name || 'Operator'}</p>
                    <p className="text-slate-500 text-[11px] truncate">{user?.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                      {user?.role || 'Operator'}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/app/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <SettingsIcon className="w-4 h-4 text-slate-500" />
                      <span>Settings & Weights</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
