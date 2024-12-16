export const environment = {
  production: true,
  supabaseURL: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  sigParserAPIKey: process.env.SIGPARSER_KEY,
  sigParserAPIURL: process.env.SIGPARSER_API_URL,
  sigParserSecretKey: process.env.SIGPARSER_SECRET_KEY,
  emailSMTP: process.env.EMAIL_SMTP,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  imageURL: import.meta.env.VITE_SUPABASE_IMAGE_URL,

};
