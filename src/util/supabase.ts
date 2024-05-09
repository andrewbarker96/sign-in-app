// supabase.ts

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
const image = import.meta.env.VITE_SUPABASE_IMAGE_URL;

export const supabase = createClient(url, key);

export const supabaseImage = image;
