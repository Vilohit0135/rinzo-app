import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import type { SocialProvider } from '../components/buttons/SocialButton';
import { BYPASS_AUTH, mockUser, mockSession, useAuthStore } from '../store/authStore';

WebBrowser.maybeCompleteAuthSession();

function getRedirectUri() {
  return makeRedirectUri({ scheme: 'rinzo', path: 'callback' });
}

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '');
}

function withPlus(phone: string): string {
  const d = digitsOnly(phone);
  if (d.length === 10) return `+91${d}`;
  return `+${d}`;
}

function withoutPlus(phone: string): string {
  return digitsOnly(phone);
}

export const authService = {
  async sendOtp(phone: string) {
    if (BYPASS_AUTH) {
      return { data: {}, error: null };
    }
    return supabase.auth.signInWithOtp({ phone: withPlus(phone) });
  },

  async verifyOtp(phone: string, token: string) {
    if (BYPASS_AUTH) {
      const customMockUser = {
        ...mockUser,
        phone: withPlus(phone),
      };
      const customMockSession = {
        ...mockSession,
        user: customMockUser,
      };
      useAuthStore.getState().setSession(customMockSession);
      return { data: { user: customMockUser, session: customMockSession }, error: null };
    }
    return supabase.auth.verifyOtp({
      phone: withoutPlus(phone),
      token,
      type: 'sms',
    });
  },

  async signIn(email: string, password: string) {
    if (BYPASS_AUTH) {
      const customMockUser = {
        ...mockUser,
        email,
      };
      const customMockSession = {
        ...mockSession,
        user: customMockUser,
      };
      useAuthStore.getState().setSession(customMockSession);
      return { data: { user: customMockUser, session: customMockSession }, error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp(email: string, password: string, firstName?: string, lastName?: string) {
    if (BYPASS_AUTH) {
      const customMockUser = {
        ...mockUser,
        email,
        user_metadata: {
          first_name: firstName || 'Developer',
          last_name: lastName || 'User',
        },
      };
      const customMockSession = {
        ...mockSession,
        user: customMockUser,
      };
      return { data: { user: customMockUser, session: customMockSession }, error: null };
    }
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
  },

  async signInWithProvider(provider: SocialProvider) {
    if (BYPASS_AUTH) {
      useAuthStore.getState().setSession(mockSession);
      return mockSession;
    }

    const redirectTo = getRedirectUri();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo, skipBrowserRedirect: true },
    });

    if (error) throw error;
    if (!data?.url) throw new Error('No OAuth URL returned');

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type !== 'success') {
      throw new Error('OAuth cancelled');
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) throw new Error('No session after OAuth');

    return sessionData.session;
  },

  async sendPasswordResetEmail(email: string) {
    if (BYPASS_AUTH) {
      return { data: {}, error: null };
    }
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUri(),
    });
  },

  async signOut() {
    if (BYPASS_AUTH) {
      useAuthStore.getState().signOut();
      return;
    }
    await supabase.auth.signOut();
  },
};
