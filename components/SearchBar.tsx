import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search breeds...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.blur}>
        <View style={styles.inner}>
          <Text style={styles.icon}>🔍</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text.tertiary}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {value.length > 0 && (
            <Pressable onPress={() => onChangeText('')} style={styles.clearButton}>
              <View style={styles.clearCircle}>
                <Text style={styles.clearIcon}>✕</Text>
              </View>
            </Pressable>
          )}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadow.soft,
  },
  blur: {
    backgroundColor: theme.colors.glass.background,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
    borderRadius: theme.borderRadius.md,
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    padding: 0,
  },
  clearButton: {
    marginLeft: theme.spacing.sm,
  },
  clearCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.text.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    fontSize: 10,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
});
