export const theme = {
  colors: {
    // Liquid Glass temeli
    glass: {
      background: 'rgba(255, 255, 255, 0.72)',
      backgroundLight: 'rgba(255, 255, 255, 0.45)',
      border: 'rgba(255, 255, 255, 0.5)',
      borderLight: 'rgba(255, 255, 255, 0.25)',
    },
    // Ana renkler
    primary: '#FF6B8A',      // Soft coral pink
    secondary: '#7C9EFF',    // Soft blue
    accent: '#FFB366',       // Warm orange
    // Nötr tonlar
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4A6A',
      tertiary: '#8A8AA3',
      inverse: '#FFFFFF',
    },
    // Arka plan gradyanları
    gradients: {
      main: ['#FFF5F7', '#F0F4FF', '#FFF8F0'],
      card: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)'],
      pink: ['#FFE5EC', '#FFF0F5'],
      blue: ['#E8F0FF', '#F0F5FF'],
    },
    // Sistem
    background: '#F8F9FA',
    surface: '#FFFFFF',
    error: '#FF5252',
    success: '#4CAF50',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 12,
    md: 20,
    lg: 28,
    xl: 36,
    full: 9999,
  },

  shadow: {
    glass: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    glow: {
      shadowColor: '#FF6B8A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
  },

  typography: {
    largeTitle: {
      fontSize: 34,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      letterSpacing: -0.3,
    },
    headline: {
      fontSize: 20,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 13,
      fontWeight: '500' as const,
    },
    small: {
      fontSize: 11,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
  },
};
