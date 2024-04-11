// supabase.ts

import { createClient } from "@supabase/supabase-js";
import { environment } from "../environments/environment";

const url = environment.supabaseURL;
const key = environment.supabaseKey;

export const supabase = createClient(url, key);
