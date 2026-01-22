import React, { useState, useEffect, useMemo } from 'react';
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
import { catApi } from '@/services/catApi';
import { BreedCard, SearchBar } from '@/components';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadBreeds();
  }, []);

  const loadBreeds = async () => {
    try {
      const data = await catApi.getBreeds();
      setBreeds(data);
    } catch (error) {
      console.error('Irklar yüklenemedi:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredBreeds = useMemo(() => {
    if (!search.trim()) return breeds;
    const query = search.toLowerCase();
    return breeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(query) ||
        breed.origin.toLowerCase().includes(query)
    );
  }, [breeds, search]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadBreeds();
  };

  const renderBreed = ({ item, index }: { item: Breed; index: number }) => (
    <View style={{ flex: 0.5 }}>
      <BreedCard
        breed={item}
        onPress={() => router.push(`/breed/${item.id}`)}
      />
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={theme.colors.gradients.main} style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Kediler yükleniyor...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.colors.gradients.main} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <Text style={styles.title}>CATalog</Text>
        <Text style={styles.subtitle}>{breeds.length} kedi ırkı</Text>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        data={filteredBreeds}
        renderItem={renderBreed}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
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
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.largeTitle,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginTop: 2,
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
