import { SupabaseClient, createClient } from  '@supabase/supabase-js';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY

if (!VITE_SUPABASE_URL) throw new Error('Please set up a VITE_SUPABASE_URL environment variable.')
if (!VITE_SUPABASE_PUBLIC_KEY) throw new Error('Please set up a VITE_SUPABASE_PUBLIC_KEY  environment variable.')

const supabase: SupabaseClient = createClient(VITE_SUPABASE_URL,VITE_SUPABASE_PUBLIC_KEY)

export default supabase

