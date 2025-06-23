import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types - Updated to match actual schema
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  avatar_url?: string;
  onboarded: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_type: 'starter' | 'pro' | 'growth' | 'elite';
  credits: number;
  team_seats: number;
  status: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

export interface UserCredits {
  id: string;
  user_id: string;
  monthly_limit: number;
  credits_used: number;
  reset_at: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  owner_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  status: string;
  invited_by?: string;
  joined_at?: string;
  created_at: string;
}

export interface GeneratedContent {
  id: string;
  user_id: string;
  type: 'email_sequence' | 'ad_copy' | 'landing_page' | 'social_post' | 'blog_post' | 'funnel' | 'strategy_brief';
  title: string;
  prompt: string;
  content: any;
  metadata: any;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface IntegrationToken {
  id: string;
  user_id: string;
  provider: 'mailchimp' | 'convertkit' | 'airtable' | 'zapier' | 'mailerlite';
  token_data: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}