import React from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, asyncStoragePersister } from '@/lib/queryClient';

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
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
    </PersistQueryClientProvider>
  );
}
