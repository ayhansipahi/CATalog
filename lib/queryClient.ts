import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 24 hours
      gcTime: 1000 * 60 * 60 * 24,
      // Consider data fresh for 5 minutes
      staleTime: 1000 * 60 * 5,
      // Retry failed requests
      retry: 2,
      // Refetch on mount if stale
      refetchOnMount: true,
      // Refetch when window regains focus
      refetchOnWindowFocus: false,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'catalog-query-cache',
});
