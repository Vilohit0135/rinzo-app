import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/supabase';

const hasSupabaseCreds = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;

export const supabase = hasSupabaseCreds
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : (null as unknown as ReturnType<typeof createClient>);
