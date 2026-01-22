import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '@/constants/theme';

interface StatBarProps {
  label: string;
  value: number; // 1-5 arası
  icon: string;
}

export function StatBar({ label, value, icon }: StatBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.barContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i <= value && styles.segmentFilled,
              i === 1 && styles.segmentFirst,
              i === 5 && styles.segmentLast,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  icon: {
    fontSize: 14,
    marginRight: theme.spacing.xs,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  barContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 3,
  },
  segmentFilled: {
    backgroundColor: theme.colors.primary,
  },
  segmentFirst: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  segmentLast: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});
