import React, { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setProfile, setRawPlan, setUserCredits, setLoading, signOut } = useAuthStore();

  useEffect(() => {
    // Check initial session and handle invalid refresh tokens
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          // If there's an error getting the session (like invalid refresh token),
          // clear the session and reset state
          console.warn('Error getting session:', error);
          await handleSignOut(false); // Don't show toast on initialization
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await fetchUserData(session.user.id);
        } else {
          // No session - clear all user data
          clearUserState();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear everything on error
        await handleSignOut(false);
      } finally {
        setLoading(false);
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state listener for future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          console.log('Auth state change:', event, session?.user?.id);
          
          if (event === 'SIGNED_OUT' || !session?.user) {
            // Handle sign out
            clearUserState();
            // Only show toast for explicit sign-out events
            if (event === 'SIGNED_OUT') {
              toast.success('Signed out successfully');
              // Force navigation to home page
              window.location.href = '/';
            }
          } else if (session?.user) {
            setUser(session.user);
            await fetchUserData(session.user.id);
            
            // Only show welcome message for actual sign-in events, not initial load
            if (event === 'SIGNED_IN') {
              toast.success('Welcome back!');
            }
          }
        } catch (error) {
          console.error('Error handling auth state change:', error);
          // Clear user data on error to maintain consistent state
          clearUserState();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setProfile, setRawPlan, setUserCredits, setLoading]);

  const clearUserState = () => {
    setUser(null);
    setProfile(null);
    setRawPlan(null);
    setUserCredits(null);
  };

  const handleSignOut = async (showToast = true) => {
    try {
      // Clear local state first
      clearUserState();
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        if (showToast) {
          toast.error('Error signing out');
        }
      } else {
        if (showToast) {
          toast.success('Signed out successfully');
        }
      }
      
      // Force navigation to home page regardless of Supabase response
      window.location.href = '/';
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      if (showToast) {
        toast.error('Unexpected error during sign out');
      }
      // Still navigate to home page
      window.location.href = '/';
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        if (profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        }
        setProfile(null);
      } else {
        setProfile(profile);
      }

      // Fetch user plan
      const { data: plan, error: planError } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (planError) {
        if (planError.code !== 'PGRST116') {
          console.error('Error fetching plan:', planError);
        }
        setRawPlan(null);
      } else {
        setRawPlan(plan);
      }

      // Fetch user credits
      const { data: userCredits, error: creditsError } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (creditsError) {
        if (creditsError.code !== 'PGRST116') {
          console.error('Error fetching user credits:', creditsError);
        }
        setUserCredits(null);
      } else {
        setUserCredits(userCredits);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Ensure state is cleared on error
      setProfile(null);
      setRawPlan(null);
      setUserCredits(null);
    }
  };

  return <>{children}</>;
};