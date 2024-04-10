// supabase.ts

import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseKey } from "../../config";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
