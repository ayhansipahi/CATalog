import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerBlurEffect: 'systemThinMaterial',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerBackground: () => (
          <BlurView intensity={100} tint="systemThinMaterial" style={StyleSheet.absoluteFill} />
        ),
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={100} tint="systemThinMaterial" style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'CATalog',
          headerLargeTitle: true,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>🐱</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="random"
        options={{
          title: 'Lucky Cat',
          tabBarLabel: 'Lucky',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>🎲</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>❤️</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    ...theme.typography.headline,
    color: theme.colors.text.primary,
  },
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
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
