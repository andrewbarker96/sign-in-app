import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Sign-In App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
