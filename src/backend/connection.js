import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yevjmqtpwuoojisukukc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldmptcXRwd3Vvb2ppc3VrdWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDUwNzAsImV4cCI6MjA4NTgyMTA3MH0.Nf32-LVAqCH5dk0pwTn1SDla0XZW9Yg97bQshmk758U";

export const supabase = createClient(supabaseUrl, supabaseKey);
