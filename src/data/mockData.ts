import { Flight, Gate, GateRecommendation, OperationalAlert, ScoringWeights } from '../types';

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  compatibilityWeight: 25,
  availabilityWeight: 25,
  scheduleWeight: 20,
  turnaroundWeight: 15,
  passengerImpactWeight: 15,
};

export const INITIAL_GATES: Gate[] = [
  {
    id: 'gate-1',
    gateNumber: 'G01',
    terminal: 'T1',
    gateType: 'Narrow-body',
    compatibleAircraft: ['A320neo', 'A321neo', 'B737-800', 'ATR 72'],
    status: 'Available',
    availableFrom: 'Now',
    scheduledFlights: [
      { flightId: 'f-6e204', flightNumber: '6E204', arrives: '14:30', departs: '15:15' }
    ]
  },
  {
    id: 'gate-2',
    gateNumber: 'G02',
    terminal: 'T1',
    gateType: 'Narrow-body',
    compatibleAircraft: ['A320neo', 'A321neo', 'B737-800'],
    status: 'Occupied',
    currentFlightNumber: '6E502',
    occupiedUntil: '13:45',
    scheduledFlights: [
      { flightId: 'f-6e502', flightNumber: '6E502', arrives: '12:50', departs: '13:45' },
      { flightId: 'f-6e819', flightNumber: '6E819', arrives: '14:15', departs: '15:00' }
    ]
  },
  {
    id: 'gate-3',
    gateNumber: 'G03',
    terminal: 'T1',
    gateType: 'Narrow-body',
    compatibleAircraft: ['A320neo', 'A321neo', 'B737-800'],
    status: 'Reserved',
    availableFrom: '14:10',
    scheduledFlights: [
      { flightId: 'f-ai801', flightNumber: 'AI801', arrives: '13:30', departs: '14:20' }
    ]
  },
  {
    id: 'gate-4',
    gateNumber: 'G04',
    terminal: 'T1',
    gateType: 'Regional',
    compatibleAircraft: ['ATR 72', 'Q400', 'A319'],
    status: 'Maintenance',
    occupiedUntil: '18:00 (Jet bridge inspection)',
    scheduledFlights: []
  },
  {
    id: 'gate-5',
    gateNumber: 'G05',
    terminal: 'T1',
    gateType: 'Narrow-body',
    compatibleAircraft: ['A320neo', 'A321neo', 'B737-800'],
    status: 'Available',
    availableFrom: 'Now',
    scheduledFlights: []
  },
  {
    id: 'gate-11',
    gateNumber: 'G11',
    terminal: 'T2',
    gateType: 'Wide-body',
    compatibleAircraft: ['B787-9', 'B777-300ER', 'A350-900', 'A330-300'],
    status: 'Occupied',
    currentFlightNumber: 'EK501',
    occupiedUntil: '14:00',
    scheduledFlights: [
      { flightId: 'f-ek501', flightNumber: 'EK501', arrives: '12:30', departs: '14:00' }
    ]
  },
  {
    id: 'gate-12',
    gateNumber: 'G12',
    terminal: 'T2',
    gateType: 'Wide-body',
    compatibleAircraft: ['B787-9', 'B777-300ER', 'A350-900', 'A330-300', 'A321neo'],
    status: 'Conflict',
    currentFlightNumber: 'AI302',
    occupiedUntil: '14:25 (Overlap with AI410 at 13:50)',
    scheduledFlights: [
      { flightId: 'f-ai302', flightNumber: 'AI302', arrives: '12:45', departs: '14:25' },
      { flightId: 'f-ai410', flightNumber: 'AI410', arrives: '13:50', departs: '15:10' }
    ]
  },
  {
    id: 'gate-14',
    gateNumber: 'G14',
    terminal: 'T2',
    gateType: 'Wide-body',
    compatibleAircraft: ['B787-9', 'B777-300ER', 'A350-900', 'A330-300', 'A321neo'],
    status: 'Available',
    availableFrom: 'Now (Open until 15:30)',
    scheduledFlights: [
      { flightId: 'f-sq402', flightNumber: 'SQ402', arrives: '15:45', departs: '17:15' }
    ]
  },
  {
    id: 'gate-15',
    gateNumber: 'G15',
    terminal: 'T2',
    gateType: 'Wide-body',
    compatibleAircraft: ['B787-9', 'B777-300ER', 'A350-900'],
    status: 'Reserved',
    availableFrom: '15:00',
    scheduledFlights: [
      { flightId: 'f-lh760', flightNumber: 'LH760', arrives: '14:40', departs: '16:20' }
    ]
  },
  {
    id: 'gate-16',
    gateNumber: 'G16',
    terminal: 'T2',
    gateType: 'Narrow-body',
    compatibleAircraft: ['A320neo', 'A321neo', 'B737-800'],
    status: 'Available',
    availableFrom: 'Now',
    scheduledFlights: []
  },
  {
    id: 'gate-21',
    gateNumber: 'G21',
    terminal: 'T3',
    gateType: 'Wide-body',
    compatibleAircraft: ['A380-800', 'B777-300ER', 'A350-1000'],
    status: 'Occupied',
    currentFlightNumber: 'BA138',
    occupiedUntil: '14:45',
    scheduledFlights: [
      { flightId: 'f-ba138', flightNumber: 'BA138', arrives: '13:10', departs: '14:45' }
    ]
  },
  {
    id: 'gate-22',
    gateNumber: 'G22',
    terminal: 'T3',
    gateType: 'Wide-body',
    compatibleAircraft: ['A380-800', 'B777-300ER', 'A350-900', 'B787-9'],
    status: 'Available',
    availableFrom: 'Now',
    scheduledFlights: [
      { flightId: 'f-qr570', flightNumber: 'QR570', arrives: '16:00', departs: '17:30' }
    ]
  }
];

export const INITIAL_FLIGHTS: Flight[] = [
  {
    id: 'f-ai302',
    flightNumber: 'AI302',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'DEL',
    originName: 'Indira Gandhi Int Airport, Delhi',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'B787-9',
    tailNumber: 'VT-EXO',
    scheduledDeparture: '11:15',
    estimatedDeparture: '11:55',
    scheduledArrival: '13:15',
    estimatedArrival: '13:47',
    status: 'Delayed',
    currentGate: 'G12',
    delayDurationMinutes: 32,
    delayProbability: 84,
    operationalRisk: 86,
    riskLevel: 'HIGH',
    downstreamFlights: ['f-ai405', 'f-ai510'],
    predictionFactors: [
      { factor: 'Previous sector turnaround overrun at DEL', importance: 38, impact: 'delay-increasing' },
      { factor: 'Peak airspace congestion over Western corridor', importance: 29, impact: 'delay-increasing' },
      { factor: 'Terminal 2 apron gate congestion', importance: 18, impact: 'delay-increasing' },
      { factor: 'Favorable tailwinds on cruise', importance: 15, impact: 'delay-reducing' },
    ],
    conflictDetails: {
      conflictingFlightId: 'f-ai410',
      conflictingFlightNumber: 'AI410',
      gateNumber: 'G12',
      overlapMinutes: 35
    }
  },
  {
    id: 'f-ai410',
    flightNumber: 'AI410',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'BOM',
    originName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    destination: 'BLR',
    destinationName: 'Kempegowda Int Airport, Bengaluru',
    aircraftType: 'B787-9',
    tailNumber: 'VT-NAC',
    scheduledDeparture: '13:50',
    estimatedDeparture: '13:50',
    scheduledArrival: '15:30',
    estimatedArrival: '15:30',
    status: 'Scheduled',
    currentGate: 'G12',
    delayDurationMinutes: 0,
    delayProbability: 22,
    operationalRisk: 72,
    riskLevel: 'HIGH',
    downstreamFlights: ['f-ai411'],
    predictionFactors: [
      { factor: 'On-time scheduled departure', importance: 45, impact: 'delay-reducing' },
      { factor: 'Gate G12 buffer blocked by inbound AI302', importance: 55, impact: 'delay-increasing' }
    ],
    conflictDetails: {
      conflictingFlightId: 'f-ai302',
      conflictingFlightNumber: 'AI302',
      gateNumber: 'G12',
      overlapMinutes: 35
    }
  },
  {
    id: 'f-ai405',
    flightNumber: 'AI405',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'BOM',
    originName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    destination: 'GOI',
    destinationName: 'Dabolim Airport, Goa',
    aircraftType: 'B787-9',
    tailNumber: 'VT-EXO',
    scheduledDeparture: '14:45',
    estimatedDeparture: '15:20',
    scheduledArrival: '15:55',
    estimatedArrival: '16:30',
    status: 'Delayed',
    currentGate: 'G12',
    delayDurationMinutes: 35,
    delayProbability: 79,
    operationalRisk: 78,
    riskLevel: 'HIGH',
    downstreamFlights: ['f-ai510'],
    predictionFactors: [
      { factor: 'Same aircraft tail VT-EXO delayed from AI302', importance: 62, impact: 'delay-increasing' },
      { factor: 'Ground servicing crew queued', importance: 23, impact: 'delay-increasing' },
      { factor: 'Short route turnaround buffer', importance: 15, impact: 'delay-reducing' }
    ]
  },
  {
    id: 'f-ai510',
    flightNumber: 'AI510',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'GOI',
    originName: 'Dabolim Airport, Goa',
    destination: 'DEL',
    destinationName: 'Indira Gandhi Int Airport, Delhi',
    aircraftType: 'B787-9',
    tailNumber: 'VT-EXO',
    scheduledDeparture: '17:15',
    estimatedDeparture: '17:45',
    scheduledArrival: '19:40',
    estimatedArrival: '20:10',
    status: 'Scheduled',
    currentGate: 'G03',
    delayDurationMinutes: 30,
    delayProbability: 68,
    operationalRisk: 64,
    riskLevel: 'MEDIUM',
    downstreamFlights: [],
    predictionFactors: [
      { factor: 'Upstream cascade from VT-EXO rotations', importance: 70, impact: 'delay-increasing' }
    ]
  },
  {
    id: 'f-6e502',
    flightNumber: '6E502',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'HYD',
    originName: 'Rajiv Gandhi Int Airport, Hyderabad',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'A321neo',
    tailNumber: 'VT-IBB',
    scheduledDeparture: '11:40',
    estimatedDeparture: '11:40',
    scheduledArrival: '13:00',
    estimatedArrival: '12:55',
    status: 'Landed',
    currentGate: 'G02',
    delayDurationMinutes: 0,
    delayProbability: 8,
    operationalRisk: 14,
    riskLevel: 'LOW',
    downstreamFlights: ['f-6e819'],
    predictionFactors: [
      { factor: 'Favorable winds on approach', importance: 50, impact: 'delay-reducing' },
      { factor: 'Rapid taxi clearance', importance: 30, impact: 'delay-reducing' },
      { factor: 'Standard turnaround buffer', importance: 20, impact: 'neutral' }
    ]
  },
  {
    id: 'f-6e819',
    flightNumber: '6E819',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'BOM',
    originName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    destination: 'MAA',
    destinationName: 'Chennai International Airport',
    aircraftType: 'A321neo',
    tailNumber: 'VT-IBB',
    scheduledDeparture: '14:15',
    estimatedDeparture: '14:15',
    scheduledArrival: '16:15',
    estimatedArrival: '16:15',
    status: 'Boarding',
    currentGate: 'G02',
    delayDurationMinutes: 0,
    delayProbability: 11,
    operationalRisk: 16,
    riskLevel: 'LOW',
    downstreamFlights: [],
    predictionFactors: [
      { factor: 'On-time inbound aircraft', importance: 55, impact: 'delay-reducing' },
      { factor: 'Gate turnaround on schedule', importance: 45, impact: 'delay-reducing' }
    ]
  },
  {
    id: 'f-ek501',
    flightNumber: 'EK501',
    airline: 'Emirates',
    airlineCode: 'EK',
    origin: 'DXB',
    originName: 'Dubai International Airport',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'B777-300ER',
    tailNumber: 'A6-EQL',
    scheduledDeparture: '08:45',
    estimatedDeparture: '08:45',
    scheduledArrival: '13:15',
    estimatedArrival: '13:10',
    status: 'Landed',
    currentGate: 'G11',
    delayDurationMinutes: 0,
    delayProbability: 6,
    operationalRisk: 12,
    riskLevel: 'LOW',
    downstreamFlights: ['f-ek502']
  },
  {
    id: 'f-ek502',
    flightNumber: 'EK502',
    airline: 'Emirates',
    airlineCode: 'EK',
    origin: 'BOM',
    originName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    destination: 'DXB',
    destinationName: 'Dubai International Airport',
    aircraftType: 'B777-300ER',
    tailNumber: 'A6-EQL',
    scheduledDeparture: '14:30',
    estimatedDeparture: '14:30',
    scheduledArrival: '16:20',
    estimatedArrival: '16:20',
    status: 'Scheduled',
    currentGate: 'G11',
    delayDurationMinutes: 0,
    delayProbability: 14,
    operationalRisk: 20,
    riskLevel: 'LOW',
    downstreamFlights: []
  },
  {
    id: 'f-sq402',
    flightNumber: 'SQ402',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    origin: 'SIN',
    originName: 'Singapore Changi Airport',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'A350-900',
    tailNumber: '9V-SHI',
    scheduledDeparture: '11:20',
    estimatedDeparture: '11:20',
    scheduledArrival: '14:20',
    estimatedArrival: '14:25',
    status: 'In Air',
    currentGate: 'G14',
    delayDurationMinutes: 5,
    delayProbability: 19,
    operationalRisk: 24,
    riskLevel: 'LOW',
    downstreamFlights: []
  },
  {
    id: 'f-ba138',
    flightNumber: 'BA138',
    airline: 'British Airways',
    airlineCode: 'BA',
    origin: 'LHR',
    originName: 'London Heathrow Airport',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'B777-300ER',
    tailNumber: 'G-STBA',
    scheduledDeparture: '09:30',
    estimatedDeparture: '09:30',
    scheduledArrival: '13:05',
    estimatedArrival: '13:15',
    status: 'Landed',
    currentGate: 'G21',
    delayDurationMinutes: 10,
    delayProbability: 25,
    operationalRisk: 30,
    riskLevel: 'LOW',
    downstreamFlights: []
  },
  {
    id: 'f-lh760',
    flightNumber: 'LH760',
    airline: 'Lufthansa',
    airlineCode: 'LH',
    origin: 'FRA',
    originName: 'Frankfurt Airport',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'B787-9',
    tailNumber: 'D-ABPA',
    scheduledDeparture: '10:00',
    estimatedDeparture: '10:40',
    scheduledArrival: '14:15',
    estimatedArrival: '14:55',
    status: 'In Air',
    currentGate: 'G15',
    delayDurationMinutes: 40,
    delayProbability: 72,
    operationalRisk: 58,
    riskLevel: 'MEDIUM',
    downstreamFlights: []
  },
  {
    id: 'f-qr570',
    flightNumber: 'QR570',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    origin: 'DOH',
    originName: 'Hamad International Airport',
    destination: 'BOM',
    destinationName: 'Chhatrapati Shivaji Maharaj Int, Mumbai',
    aircraftType: 'B787-9',
    tailNumber: 'A7-BHC',
    scheduledDeparture: '12:00',
    estimatedDeparture: '12:00',
    scheduledArrival: '15:30',
    estimatedArrival: '15:30',
    status: 'In Air',
    currentGate: 'G22',
    delayDurationMinutes: 0,
    delayProbability: 15,
    operationalRisk: 22,
    riskLevel: 'LOW',
    downstreamFlights: []
  }
];

export const INITIAL_RECOMMENDATIONS: GateRecommendation[] = [
  {
    id: 'rec-ai302',
    flightId: 'f-ai302',
    flightNumber: 'AI302',
    currentGate: 'G12',
    recommendedGate: 'G14',
    score: 93,
    weightsUsed: DEFAULT_SCORING_WEIGHTS,
    factorScores: {
      compatibility: 100,
      availability: 95,
      scheduleConflict: 92,
      turnaround: 90,
      passengerImpact: 88,
    },
    reasons: [
      'Compatible with B787-9 wide-body aircraft specs',
      'Available immediately with 65-minute turnaround buffer',
      'Completely eliminates predicted 35-minute gate overlap with AI410',
      'Same Terminal (T2) minimizing ground crew repositioning and passenger walking',
      'Reduces downstream cascading delay on tail VT-EXO from 35m to ~10m'
    ],
    beforeEstimate: {
      expectedDelayMin: 32,
      hasConflict: true,
      affectedFlights: 3,
    },
    afterEstimate: {
      expectedDelayMin: 12,
      hasConflict: false,
      affectedFlights: 1,
    },
    engine: 'browser-fallback',
    createdAt: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: 'rec-lh760',
    flightId: 'f-lh760',
    flightNumber: 'LH760',
    currentGate: 'G15',
    recommendedGate: 'G22',
    score: 87,
    weightsUsed: DEFAULT_SCORING_WEIGHTS,
    factorScores: {
      compatibility: 100,
      availability: 90,
      scheduleConflict: 85,
      turnaround: 80,
      passengerImpact: 78,
    },
    reasons: [
      'Wide-body certified gate with dual jet bridges',
      'Buffer window open until 16:00 (inbound QR570 arrival)',
      'Provides dedicated international customs corridor',
      'Prevents ramp hold time for 280 arriving passengers'
    ],
    beforeEstimate: {
      expectedDelayMin: 40,
      hasConflict: true,
      affectedFlights: 2,
    },
    afterEstimate: {
      expectedDelayMin: 18,
      hasConflict: false,
      affectedFlights: 0,
    },
    engine: 'browser-fallback',
    createdAt: new Date().toISOString(),
    status: 'pending'
  }
];

export const INITIAL_ALERTS: OperationalAlert[] = [
  {
    id: 'alt-1',
    type: 'conflict',
    severity: 'critical',
    title: 'GATE CONFLICT DETECTED',
    message: 'AI302 predicted delay causes 35m overlap at Gate G12 with departing flight AI410.',
    flightNumber: 'AI302',
    gateNumber: 'G12',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: 'alt-2',
    type: 'cascade',
    severity: 'high',
    title: 'CASCADE RISK DETECTED',
    message: 'Delay on tail VT-EXO affects downstream rotations AI405 (BOM-GOI) and AI510 (GOI-DEL).',
    flightNumber: 'AI302',
    timestamp: '5 min ago',
    read: false,
  },
  {
    id: 'alt-3',
    type: 'recommendation',
    severity: 'medium',
    title: 'GATE RECOMMENDATION READY',
    message: 'Alternative Gate G14 evaluated (Score 93/100). Ready for operator review.',
    flightNumber: 'AI302',
    gateNumber: 'G14',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: 'alt-4',
    type: 'delay',
    severity: 'medium',
    title: 'HIGH DELAY RISK PREDICTED',
    message: 'LH760 (Frankfurt) predicted delay +40m due to European ATC flow control.',
    flightNumber: 'LH760',
    timestamp: '14 min ago',
    read: true,
  }
];

