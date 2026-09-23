export type FlightStatus =
  | 'Scheduled'
  | 'Boarding'
  | 'Departed'
  | 'In Air'
  | 'Landed'
  | 'Delayed'
  | 'Cancelled';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type GateStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance' | 'Conflict';

export type UserRole = 'Operator' | 'Operations Manager' | 'Admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  aircraftType: string;
  tailNumber: string;
  scheduledDeparture: string;
  estimatedDeparture: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: FlightStatus;
  currentGate: string;
  delayDurationMinutes: number;
  delayProbability: number; // 0 - 100
  operationalRisk: number; // 0 - 100
  riskLevel: RiskLevel;
  downstreamFlights: string[]; // tail-number rotation flight IDs
  predictionFactors?: {
    factor: string;
    importance: number; // percentage or weight
    impact: 'delay-increasing' | 'delay-reducing' | 'neutral';
  }[];
  conflictDetails?: {
    conflictingFlightId: string;
    conflictingFlightNumber: string;
    gateNumber: string;
    overlapMinutes: number;
  };
}

export interface Gate {
  id: string;
  gateNumber: string;
  terminal: string;
  gateType: 'Narrow-body' | 'Wide-body' | 'Regional';
  compatibleAircraft: string[];
  status: GateStatus;
  currentFlightNumber?: string;
  occupiedUntil?: string;
  availableFrom?: string;
  scheduledFlights: {
    flightId: string;
    flightNumber: string;
    arrives: string;
    departs: string;
  }[];
}

export interface ScoringWeights {
  compatibilityWeight: number; // e.g. 25
  availabilityWeight: number;  // e.g. 25
  scheduleWeight: number;      // e.g. 20
  turnaroundWeight: number;    // e.g. 15
  passengerImpactWeight: number; // e.g. 15
}

export interface GateRecommendation {
  id: string;
  flightId: string;
  flightNumber: string;
  currentGate: string;
  recommendedGate: string;
  score: number; // 0 - 100
  weightsUsed: ScoringWeights;
  factorScores: {
    compatibility: number;
    availability: number;
    scheduleConflict: number;
    turnaround: number;
    passengerImpact: number;
  };
  reasons: string[];
  beforeEstimate: {
    expectedDelayMin: number;
    hasConflict: boolean;
    affectedFlights: number;
  };
  afterEstimate: {
    expectedDelayMin: number;
    hasConflict: boolean;
    affectedFlights: number;
  };
  engine: 'fastapi-rf' | 'browser-fallback';
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
}

export interface OperatorDecision {
  id: string;
  recommendationId?: string;
  flightId: string;
  flightNumber: string;
  originalGate: string;
  recommendedGate: string;
  finalGate: string;
  recommendationReason: string;
  action: 'approved' | 'rejected' | 'modified';
  operatorName: string;
  role: string;
  timestamp: string;
}

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface OperationalAlert {
  id: string;
  type: 'delay' | 'conflict' | 'cascade' | 'recommendation';
  severity: AlertSeverity;
  title: string;
  message: string;
  flightNumber?: string;
  gateNumber?: string;
  timestamp: string;
  read: boolean;
}
