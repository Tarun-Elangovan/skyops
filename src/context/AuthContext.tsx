import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isMockMode: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (name: string, email: string, pass: string, role: UserRole) => Promise<{ error?: string }>;
  signInAsDemo: (role: UserRole) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, UserProfile> = {
  'Operator': {
    id: 'demo-operator-1',
    email: 'operator@skyops.aero',
    name: 'Sarah Chen',
    role: 'Operator',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  'Operations Manager': {
    id: 'demo-manager-1',
    email: 'manager@skyops.aero',
    name: 'Marcus Vance',
    role: 'Operations Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  'Admin': {
    id: 'demo-admin-1',
    email: 'admin@skyops.aero',
    name: 'Elena Rostova',
    role: 'Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('skyops_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged-in as demo operator for instant access
    return DEMO_USERS['Operator'];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMockMode = true;

  const signInWithEmail = async (email: string, _pass: string): Promise<{ error?: string }> => {
    const cleanEmail = email.trim();
    const foundRole: UserRole = cleanEmail.includes('admin')
      ? 'Admin'
      : cleanEmail.includes('manager')
      ? 'Operations Manager'
      : 'Operator';

    const profile: UserProfile = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail || 'operator@skyops.aero',
      name: cleanEmail ? cleanEmail.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()) : 'Sarah Chen',
      role: foundRole,
      avatarUrl: DEMO_USERS[foundRole]?.avatarUrl
    };

    setUser(profile);
    localStorage.setItem('skyops_user', JSON.stringify(profile));
    return {};
  };

  const signUpWithEmail = async (name: string, email: string, _pass: string, role: UserRole): Promise<{ error?: string }> => {
    const profile: UserProfile = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      email: email.trim(),
      name: name.trim() || 'Operator',
      role: role || 'Operator',
      avatarUrl: DEMO_USERS[role]?.avatarUrl
    };

    setUser(profile);
    localStorage.setItem('skyops_user', JSON.stringify(profile));
    return {};
  };

  const signInAsDemo = (role: UserRole) => {
    const demoProfile = DEMO_USERS[role];
    setUser(demoProfile);
    localStorage.setItem('skyops_user', JSON.stringify(demoProfile));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('skyops_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isMockMode,
        signInWithEmail,
        signUpWithEmail,
        signInAsDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
