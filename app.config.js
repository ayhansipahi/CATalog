import 'dotenv/config';

export default {
  expo: {
    name: 'CATalog',
    slug: 'catalog',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'catalog',
    splash: {
      backgroundColor: '#F8F9FA',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'dev.ayhan.catalog',
      buildNumber: '1',
    },
    newArchEnabled: true,
    plugins: ['expo-router', 'expo-asset'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      catApiKey: process.env.CAT_API_KEY || '',
      eas: {
        projectId: 'e89c8b58-95cd-4d68-93fb-20ff93ff398b',
      },
    },
    owner: 'ayhansipahi',
  },
};
