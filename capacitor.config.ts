import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'stockassoc.app',
  appName: 'StockAssoc App',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
