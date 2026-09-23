import React, { createContext, useContext, useState } from 'react';
import { Flight, Gate, GateRecommendation, OperationalAlert, OperatorDecision } from '../types';
import { INITIAL_FLIGHTS, INITIAL_GATES, INITIAL_RECOMMENDATIONS, INITIAL_ALERTS } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useSettings } from './SettingsContext';

interface OperationsContextType {
  flights: Flight[];
  gates: Gate[];
  recommendations: GateRecommendation[];
  alerts: OperationalAlert[];
  decisions: OperatorDecision[];
  approveRecommendation: (recId: string) => void;
  rejectRecommendation: (recId: string, reason?: string) => void;
  modifyRecommendation: (recId: string, manualGate: string, reason?: string) => void;
  applySimulationScenario: (flightId: string, addedDelayMinutes: number, manualGate?: string) => void;
  markAlertRead: (alertId: string) => void;
  resetOperationsData: () => void;
}

const OperationsContext = createContext<OperationsContextType | undefined>(undefined);

export const OperationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { weights } = useSettings();

  const [flights, setFlights] = useState<Flight[]>(() => {
    const saved = localStorage.getItem('skyops_flights');
    return saved ? JSON.parse(saved) : INITIAL_FLIGHTS;
  });

  const [gates, setGates] = useState<Gate[]>(() => {
    const saved = localStorage.getItem('skyops_gates');
    return saved ? JSON.parse(saved) : INITIAL_GATES;
  });

  const [recommendations, setRecommendations] = useState<GateRecommendation[]>(() => {
    const saved = localStorage.getItem('skyops_recommendations');
    return saved ? JSON.parse(saved) : INITIAL_RECOMMENDATIONS;
  });

  const [alerts, setAlerts] = useState<OperationalAlert[]>(() => {
    const saved = localStorage.getItem('skyops_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [decisions, setDecisions] = useState<OperatorDecision[]>(() => {
    const saved = localStorage.getItem('skyops_decisions');
    return saved ? JSON.parse(saved) : [];
  });

  const saveState = (
    newFlights = flights,
    newGates = gates,
    newRecs = recommendations,
    newAlerts = alerts,
    newDecisions = decisions
  ) => {
    localStorage.setItem('skyops_flights', JSON.stringify(newFlights));
    localStorage.setItem('skyops_gates', JSON.stringify(newGates));
    localStorage.setItem('skyops_recommendations', JSON.stringify(newRecs));
    localStorage.setItem('skyops_alerts', JSON.stringify(newAlerts));
    localStorage.setItem('skyops_decisions', JSON.stringify(newDecisions));
  };

  const approveRecommendation = (recId: string) => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    // Record decision
    const decision: OperatorDecision = {
      id: 'dec-' + Math.random().toString(36).substring(2, 9),
      recommendationId: rec.id,
      flightId: rec.flightId,
      flightNumber: rec.flightNumber,
      originalGate: rec.currentGate,
      recommendedGate: rec.recommendedGate,
      finalGate: rec.recommendedGate,
      recommendationReason: rec.reasons.join('; '),
      action: 'approved',
      operatorName: user?.name || 'Operator',
      role: user?.role || 'Operator',
      timestamp: new Date().toISOString()
    };

    // Update flight gate and resolve conflict
    const updatedFlights = flights.map(f => {
      if (f.id === rec.flightId) {
        return {
          ...f,
          currentGate: rec.recommendedGate,
          conflictDetails: undefined,
          operationalRisk: Math.max(15, f.operationalRisk - 40),
          riskLevel: 'LOW' as const
        };
      }
      return f;
    });

    // Update gates
    const updatedGates = gates.map(g => {
      if (g.gateNumber === rec.currentGate) {
        return { ...g, status: 'Available' as const, currentFlightNumber: undefined };
      }
      if (g.gateNumber === rec.recommendedGate) {
        return { ...g, status: 'Occupied' as const, currentFlightNumber: rec.flightNumber };
      }
      return g;
    });

    const updatedRecs = recommendations.map(r =>
      r.id === recId ? { ...r, status: 'approved' as const } : r
    );

    const updatedDecisions = [decision, ...decisions];

    // Add alert
    const newAlert: OperationalAlert = {
      id: 'alt-' + Date.now().toString(36),
      type: 'recommendation',
      severity: 'low',
      title: 'GATE REASSIGNMENT APPROVED',
      message: `Operator ${user?.name || 'Staff'} approved reassignment of ${rec.flightNumber} from ${rec.currentGate} to ${rec.recommendedGate}.`,
      flightNumber: rec.flightNumber,
      gateNumber: rec.recommendedGate,
      timestamp: 'Just now',
      read: false
    };
    const updatedAlerts = [newAlert, ...alerts];

    setFlights(updatedFlights);
    setGates(updatedGates);
    setRecommendations(updatedRecs);
    setDecisions(updatedDecisions);
    setAlerts(updatedAlerts);
    saveState(updatedFlights, updatedGates, updatedRecs, updatedAlerts, updatedDecisions);
  };

  const rejectRecommendation = (recId: string, reason = 'Operator preference / conflicting ground constraints') => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    const decision: OperatorDecision = {
      id: 'dec-' + Math.random().toString(36).substring(2, 9),
      recommendationId: rec.id,
      flightId: rec.flightId,
      flightNumber: rec.flightNumber,
      originalGate: rec.currentGate,
      recommendedGate: rec.recommendedGate,
      finalGate: rec.currentGate,
      recommendationReason: reason,
      action: 'rejected',
      operatorName: user?.name || 'Operator',
      role: user?.role || 'Operator',
      timestamp: new Date().toISOString()
    };

    const updatedRecs = recommendations.map(r =>
      r.id === recId ? { ...r, status: 'rejected' as const } : r
    );
    const updatedDecisions = [decision, ...decisions];

    setRecommendations(updatedRecs);
    setDecisions(updatedDecisions);
    saveState(flights, gates, updatedRecs, alerts, updatedDecisions);
  };

  const modifyRecommendation = (recId: string, manualGate: string, reason = 'Manual operational selection') => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    const decision: OperatorDecision = {
      id: 'dec-' + Math.random().toString(36).substring(2, 9),
      recommendationId: rec.id,
      flightId: rec.flightId,
      flightNumber: rec.flightNumber,
      originalGate: rec.currentGate,
      recommendedGate: rec.recommendedGate,
      finalGate: manualGate,
      recommendationReason: reason,
      action: 'modified',
      operatorName: user?.name || 'Operator',
      role: user?.role || 'Operator',
      timestamp: new Date().toISOString()
    };

    const updatedFlights = flights.map(f => {
      if (f.id === rec.flightId) {
        return {
          ...f,
          currentGate: manualGate,
          conflictDetails: undefined,
          operationalRisk: 30,
          riskLevel: 'LOW' as const
        };
      }
      return f;
    });

    const updatedRecs = recommendations.map(r =>
      r.id === recId ? { ...r, status: 'modified' as const, recommendedGate: manualGate } : r
    );
    const updatedDecisions = [decision, ...decisions];

    setFlights(updatedFlights);
    setRecommendations(updatedRecs);
    setDecisions(updatedDecisions);
    saveState(updatedFlights, gates, updatedRecs, alerts, updatedDecisions);
  };

  const applySimulationScenario = (flightId: string, addedDelayMinutes: number, manualGate?: string) => {
    const updatedFlights = flights.map(f => {
      if (f.id === flightId) {
        const totalDelay = f.delayDurationMinutes + addedDelayMinutes;
        return {
          ...f,
          delayDurationMinutes: totalDelay,
          status: (totalDelay > 15 ? 'Delayed' : f.status) as any,
          currentGate: manualGate || f.currentGate,
          delayProbability: Math.min(99, f.delayProbability + Math.round(addedDelayMinutes * 0.5)),
          operationalRisk: Math.min(95, f.operationalRisk + Math.round(addedDelayMinutes * 0.4)),
          riskLevel: totalDelay > 30 ? ('HIGH' as const) : ('MEDIUM' as const)
        };
      }
      return f;
    });

    setFlights(updatedFlights);
    saveState(updatedFlights, gates, recommendations, alerts, decisions);
  };

  const markAlertRead = (alertId: string) => {
    const updated = alerts.map(a => a.id === alertId ? { ...a, read: true } : a);
    setAlerts(updated);
    saveState(flights, gates, recommendations, updated, decisions);
  };

  const resetOperationsData = () => {
    localStorage.removeItem('skyops_flights');
    localStorage.removeItem('skyops_gates');
    localStorage.removeItem('skyops_recommendations');
    localStorage.removeItem('skyops_alerts');
    localStorage.removeItem('skyops_decisions');
    setFlights(INITIAL_FLIGHTS);
    setGates(INITIAL_GATES);
    setRecommendations(INITIAL_RECOMMENDATIONS);
    setAlerts(INITIAL_ALERTS);
    setDecisions([]);
  };

  return (
    <OperationsContext.Provider
      value={{
        flights,
        gates,
        recommendations,
        alerts,
        decisions,
        approveRecommendation,
        rejectRecommendation,
        modifyRecommendation,
        applySimulationScenario,
        markAlertRead,
        resetOperationsData
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};

export const useOperations = () => {
  const context = useContext(OperationsContext);
  if (!context) throw new Error('useOperations must be used within an OperationsProvider');
  return context;
};
