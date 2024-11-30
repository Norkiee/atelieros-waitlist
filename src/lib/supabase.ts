import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure SUPABASE_URL and SUPABASE_ANON_KEY are available at runtime
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided as environment variables.');
}

// Always export a valid Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
