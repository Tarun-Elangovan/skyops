import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { OperationsProvider } from './context/OperationsContext';

import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';

// Route guards
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400 font-mono text-xs">
        Authenticating SkyOps Session...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading SkyOps Platform...
      </div>
    );
  }
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

import { AppLayout } from './components/app/AppLayout';
import { DashboardPage } from './pages/app/DashboardPage';
import { FlightsPage } from './pages/app/FlightsPage';
import { FlightDetailPage } from './pages/app/FlightDetailPage';
import { GatesPage } from './pages/app/GatesPage';
import { PredictionsPage } from './pages/app/PredictionsPage';
import { RecommendationsPage } from './pages/app/RecommendationsPage';
import { AlertsPage } from './pages/app/AlertsPage';
import { SettingsPage } from './pages/app/SettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <OperationsProvider>
            <Routes>
              {/* Page 1: Sign-In Landing Page (LuxFly Style) */}
              <Route
                path="/"
                element={
                  <PublicOnlyRoute>
                    <LandingPage />
                  </PublicOnlyRoute>
                }
              />

              {/* Page 2: Home Page (Genesis Style) */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              {/* Operations App Routes (Styled to match Luxury Modern reference) */}
              <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
              <Route
                path="/app/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <DashboardPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/flights"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <FlightsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/flights/:id"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <FlightDetailPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/gates"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <GatesPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/predictions"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <PredictionsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/recommendations"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <RecommendationsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/alerts"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AlertsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/settings"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <SettingsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OperationsProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
