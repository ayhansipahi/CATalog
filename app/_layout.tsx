import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
        animationDuration: 350,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="breed/[id]"
        options={{
          presentation: 'card',
          animation: 'ios_from_right',
        }}
      />
    </Stack>
  );
}
