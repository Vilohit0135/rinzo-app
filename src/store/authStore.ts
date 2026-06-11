import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const BYPASS_AUTH = true; // Set to false to enable real Supabase authentication

export const mockUser: any = {
  id: 'dev-user-id',
  email: 'developer@example.com',
  phone: '+919999999999',
  user_metadata: {
    first_name: 'Developer',
    last_name: 'User',
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

export const mockSession: any = {
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  user: mockUser,
};

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  setSession: (session) =>
    set({ session, user: session?.user ?? null, isLoading: false }),

  signOut: async () => {
    if (!BYPASS_AUTH && supabase) {
      await supabase.auth.signOut();
    }
    set({ session: null, user: null });
  },

  initialize: async () => {
    if (BYPASS_AUTH) {
      set({
        session: null,
        user: null,
        isLoading: false,
      });
      return;
    }
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      set({
        session: data.session,
        user: data.session?.user ?? null,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },
}));
