
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mwsogytsctdjuijgcpbn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13c29neXRzY3RkanVpamdjcGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3ODAxNjksImV4cCI6MjA1NDM1NjE2OX0.6j7YAJdbKoL2Kia-gGpC_neaxa10uWxrHUSjUXcNS_Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
