/* Copy this file to config.js. Public browser configuration only.
   Never add service_role, database passwords, email SMTP secrets or paid-model keys. */
window.CREW_CONFIG = {
  supabaseUrl: '', // e.g. https://YOUR_PROJECT.supabase.co
  supabaseAnonKey: '', // public publishable key or legacy anon key ONLY
  persistSession: false, // false: memory only. true: this tab's sessionStorage.
  pollMs: 2000,
  allowSignUp: true,
  // Optional: AI endpoint is set up separately; do not expose server credentials here.
  aiEndpoint: ''
};
