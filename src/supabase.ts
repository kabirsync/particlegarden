import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gupvtseevblkwsuygadh.supabase.co";
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
