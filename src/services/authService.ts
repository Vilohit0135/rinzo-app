import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import type { SocialProvider } from '../components/buttons/SocialButton';

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
    return supabase.auth.signInWithOtp({ phone: withPlus(phone) });
  },

  async verifyOtp(phone: string, token: string) {
    return supabase.auth.verifyOtp({
      phone: withoutPlus(phone),
      token,
      type: 'sms',
    });
  },

  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },

  async signInWithProvider(provider: SocialProvider) {
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

  async signOut() {
    await supabase.auth.signOut();
  },
};
