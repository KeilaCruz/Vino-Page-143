import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juanwktjbwwpaphzdgah.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YW53a3RqYnd3cGFwaHpkZ2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODQ5OTYsImV4cCI6MjA2MzI2MDk5Nn0.8TEaaxD0PvU-pp2PgGmrOBym1hzGZLjfyV6b7Hfw-5E";

export const supabase = createClient(supabaseUrl, supabaseKey);
