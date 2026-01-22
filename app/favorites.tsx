import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { BreedCard } from '@/components';
import { theme } from '@/constants/theme';
import { Breed } from '@/types/breed';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites } = useFavoritesStore();

  const renderBreed = ({ item }: { item: Breed }) => (
    <View style={{ flex: 0.5 }}>
      <BreedCard
        breed={item}
        onPress={() => router.push(`/breed/${item.id}`)}
      />
    </View>
  );

  return (
    <LinearGradient colors={theme.colors.gradients.main} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <Text style={styles.title}>Favoriler</Text>
        <Text style={styles.subtitle}>
          {favorites.length > 0
            ? `${favorites.length} favori kedi`
            : 'Henüz favori yok'}
        </Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderBreed}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>💝</Text>
          <Text style={styles.emptyTitle}>Henüz favori yok</Text>
          <Text style={styles.emptyText}>
            Beğendiğin kedi ırklarını{'\n'}kalp ikonuna basarak favorilere ekle
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
