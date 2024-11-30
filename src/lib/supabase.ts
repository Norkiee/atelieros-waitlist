import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | undefined; // Explicitly type supabase

try {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

  // Log for debugging
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Provided' : 'Not Provided');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are missing.');
    throw new Error('Supabase URL and Anon Key must be provided.');
  }

  // Initialize Supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error(
    'Supabase initialization error:',
    error instanceof Error ? error.message : error
  );
}

export { supabase };
