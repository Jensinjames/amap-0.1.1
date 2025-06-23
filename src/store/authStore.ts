import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserPlan, UserCredits } from '../lib/supabase';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  rawPlan: UserPlan | null;
  userCredits: UserCredits | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setRawPlan: (plan: UserPlan | null) => void;
  setUserCredits: (userCredits: UserCredits | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
  // Computed property for plan with credit information
  get plan(): (UserPlan & {
    credits_total: number;
    credits_used: number;
    credits_remaining: number;
  }) | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  rawPlan: null,
  userCredits: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setRawPlan: (rawPlan) => set({ rawPlan }),
  setUserCredits: (userCredits) => set({ userCredits }),
  setLoading: (loading) => set({ loading }),
  signOut: () => {
    // Clear all user state immediately
    set({ 
      user: null, 
      profile: null, 
      rawPlan: null, 
      userCredits: null,
      loading: false
    });
    
    // Clear any cached data
    localStorage.clear();
    sessionStorage.clear();
    
    // Force navigation to home page
    window.location.href = '/';
  },
  
  // Computed getter for plan with credit information
  get plan() {
    const state = get();
    const { rawPlan, userCredits } = state;
    
    if (!rawPlan) return null;
    
    // Calculate credits from userCredits table if available, otherwise use plan defaults
    const credits_total = userCredits?.monthly_limit || rawPlan.credits || 50;
    const credits_used = userCredits?.credits_used || 0;
    const credits_remaining = Math.max(0, credits_total - credits_used);
    
    return {
      ...rawPlan,
      credits_total,
      credits_used,
      credits_remaining,
    };
  },
}));