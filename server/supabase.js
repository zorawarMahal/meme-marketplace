const createClient = require("@supabase/supabase-js").createClient;
const dotenv = require("dotenv");

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

module.exports = supabase;