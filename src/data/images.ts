// Central repository for all imagery used in SkyOps
// Replace these URLs with local files or custom transparent PNG cutouts as needed.

export const IMAGES = {
  // Aircraft transparent cutouts
  landingHeroJet: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
  landingJetTransparent: 'https://pngimg.com/d/plane_PNG101235.png',
  homeHeroAirliner: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=80',
  homeJetTransparent: 'https://pngimg.com/d/plane_PNG101248.png',

  // Atmospheric Backgrounds
  skyBlueClouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80',
  duskGoldenSky: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=2000&q=80',
  airportRunwayNight: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?auto=format&fit=crop&w=1600&q=80',

  // Landing Page 4 Floating Thumbnails (Control Tower, Gate/Jet Bridge, Radar Map, Apron)
  thumbnails: {
    controlTower: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=400&q=80',
    jetBridge: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    radarMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80',
    apron: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
  },

  // Airline partner logos (Realistic seeded commercial carriers)
  airlines: [
    { code: 'AI', name: 'Air India', color: '#D91C24', logoText: 'AIR INDIA' },
    { code: '6E', name: 'IndiGo', color: '#001E82', logoText: 'IndiGo' },
    { code: 'EK', name: 'Emirates', color: '#D71921', logoText: 'Emirates' },
    { code: 'SQ', name: 'Singapore Airlines', color: '#B38B42', logoText: 'SINGAPORE AIRLINES' },
    { code: 'LH', name: 'Lufthansa', color: '#05164D', logoText: 'Lufthansa' },
    { code: 'BA', name: 'British Airways', color: '#075AAA', logoText: 'BRITISH AIRWAYS' },
    { code: 'QR', name: 'Qatar Airways', color: '#5C0632', logoText: 'QATAR AIRWAYS' },
    { code: 'DL', name: 'Delta Air Lines', color: '#E01933', logoText: 'DELTA' },
  ]
};
