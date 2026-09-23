import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOperations } from '../../context/OperationsContext';
import { useSettings } from '../../context/SettingsContext';
import { Logo } from '../common/Logo';
import { SimulatedDataBadge } from '../common/SimulatedDataBadge';
import {
  LayoutDashboard,
  Plane,
  DoorOpen,
  TrendingUp,
  Sparkles,
  Bell,
  Settings,
  Search,
  LogOut,
  ChevronRight,
  Shield,
  Radio,
  Cpu,
  Database,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/app/flights', label: 'Flight Operations', icon: Plane },
  { path: '/app/gates', label: 'Gate Management', icon: DoorOpen },
  { path: '/app/predictions', label: 'ML Predictions', icon: TrendingUp },
  { path: '/app/recommendations', label: 'Gate Recommendations', icon: Sparkles },
  { path: '/app/alerts', label: 'Operational Alerts', icon: Bell },
  { path: '/app/settings', label: 'System Settings', icon: Settings },
];

export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { alerts } = useOperations();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/flights?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col lg:flex-row antialiased">
      {/* Mobile Header Bar */}
      <div className="lg:hidden h-16 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/home" className="flex items-center gap-2">
          <Logo variant="light" />
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Left Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 w-64 bg-white border-r border-slate-200/80 shadow-sm flex flex-col justify-between z-40 transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } h-screen`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="pb-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2.5 group">
              <Logo variant="light" />
            </Link>
            <Link
              to="/home"
              title="Return to Post-Login Home Page"
              className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
            >
              <span>Home</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-3">
              OPERATIONS SUITE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/app/dashboard' && location.pathname.startsWith(item.path));
              const isAlerts = item.label === 'Operational Alerts';

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isAlerts && unreadAlerts > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {unreadAlerts}
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Bottom User Card */}
          <div className="pt-4 border-t border-slate-100 mt-auto">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-blue-500/30">
                  {user?.name?.charAt(0) || 'O'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Operator'}</div>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5 text-blue-600" />
                    <span>{user?.role || 'Operator'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between gap-4">
          {/* Global Search Bar (matching reference style) */}
          <form onSubmit={handleGlobalSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flight number, route, tail, or gate..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
            />
          </form>

          {/* Top Bar Controls */}
          <div className="flex items-center gap-3">
            {/* Standalone Client Chip */}
            <div className="hidden md:flex items-center gap-2">
              <div
                title="SkyOps is running in standalone pure frontend mode with local state storage"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Client: Standalone UI</span>
              </div>
            </div>

            {/* Persistent Simulated Data Badge */}
            <div className="hidden sm:block">
              <SimulatedDataBadge />
            </div>

            {/* Notifications Bell */}
            <Link
              to="/app/alerts"
              className="relative p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadAlerts}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Canvas */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
