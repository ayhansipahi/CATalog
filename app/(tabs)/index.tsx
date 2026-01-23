import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Breed } from '@/types/breed';
import { useBreeds } from '@/hooks/useBreeds';
import { BreedCard, SearchBar } from '@/components';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const {
    data: breeds = [],
    isLoading,
    isFetching,
    refetch,
  } = useBreeds();

  const filteredBreeds = useMemo(() => {
    if (!search.trim()) return breeds;
    const query = search.toLowerCase();
    return breeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(query) ||
        breed.origin.toLowerCase().includes(query)
    );
  }, [breeds, search]);

  const renderBreed = ({ item }: { item: Breed }) => (
    <View style={{ flex: 0.5 }}>
      <BreedCard
        breed={item}
        onPress={() => router.push(`/breed/${item.id}`)}
      />
    </View>
  );

  // Show loading only on first load (no cached data)
  if (isLoading && breeds.length === 0) {
    return (
      <LinearGradient colors={theme.colors.gradients.main} style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading cats...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.colors.gradients.main} style={styles.container}>
      <View style={[styles.searchContainer, { paddingTop: insets.top + 56 }]}>
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <FlatList
        data={filteredBreeds}
        renderItem={renderBreed}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  list: {
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: 100,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
});
