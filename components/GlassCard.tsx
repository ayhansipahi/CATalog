import React from 'react';
import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'subtle';
}

export function GlassCard({
  children,
  style,
  intensity = 60,
  onPress,
  variant = 'default',
}: GlassCardProps) {
  const cardStyles = [
    styles.container,
    variant === 'elevated' && styles.elevated,
    variant === 'subtle' && styles.subtle,
    style,
  ];

  const content = (
    <View style={cardStyles}>
      <BlurView intensity={intensity} tint="light" style={styles.blur}>
        <LinearGradient
          colors={['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.55)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.innerBorder}>{children}</View>
        </LinearGradient>
      </BlurView>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadow.glass,
  },
  elevated: {
    ...theme.shadow.glow,
  },
  subtle: {
    shadowOpacity: 0.04,
  },
  blur: {
    overflow: 'hidden',
  },
  gradient: {
    padding: 1.5, // Border genişliği
  },
  innerBorder: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: theme.borderRadius.lg - 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});
