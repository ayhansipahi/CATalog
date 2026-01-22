import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '@/constants/theme';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
            <View style={styles.tabBarBorder} />
          </BlurView>
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>🐱</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="random"
        options={{
          title: 'Şanslı',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>🎲</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoriler',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>❤️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="breed/[id]"
        options={{
          href: null, // Tab'da gösterme
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    height: 88,
    paddingBottom: 28,
  },
  tabBarBorder: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: theme.colors.glass.background,
  },
  tabLabel: {
    ...theme.typography.small,
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
});
