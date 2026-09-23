import React, { createContext, useContext, useState } from 'react';
import { ScoringWeights } from '../types';
import { DEFAULT_SCORING_WEIGHTS } from '../data/mockData';

interface SettingsContextType {
  weights: ScoringWeights;
  updateWeights: (newWeights: Partial<ScoringWeights>) => void;
  resetWeights: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weights, setWeights] = useState<ScoringWeights>(() => {
    const saved = localStorage.getItem('skyops_scoring_weights');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_SCORING_WEIGHTS; }
    }
    return DEFAULT_SCORING_WEIGHTS;
  });

  const updateWeights = (newWeights: Partial<ScoringWeights>) => {
    setWeights(prev => {
      const updated = { ...prev, ...newWeights };
      localStorage.setItem('skyops_scoring_weights', JSON.stringify(updated));
      return updated;
    });
  };

  const resetWeights = () => {
    setWeights(DEFAULT_SCORING_WEIGHTS);
    localStorage.setItem('skyops_scoring_weights', JSON.stringify(DEFAULT_SCORING_WEIGHTS));
  };

  return (
    <SettingsContext.Provider
      value={{
        weights,
        updateWeights,
        resetWeights,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
