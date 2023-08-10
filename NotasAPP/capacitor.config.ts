import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mariscaldev.notas',
  appName: 'Notas APP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
