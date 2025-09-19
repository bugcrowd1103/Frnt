// client/src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Environment se keys le raha hai
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string;

// Safety check
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase URL or Key missing. Check your .env file!");
}

// Ek hi supabase client export karenge jaha bhi use karna hai
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
