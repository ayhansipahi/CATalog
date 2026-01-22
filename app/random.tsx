import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { CatImage } from '@/types/breed';
import { catApi } from '@/services/catApi';
import { GlassCard } from '@/components';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function RandomScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [cat, setCat] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(false);

  const loadRandomCat = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    try {
      const data = await catApi.getRandomCat();
      setCat(data);
    } catch (error) {
      console.error('Rastgele kedi yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const breed = cat?.breeds?.[0];

  return (
    <LinearGradient colors={theme.colors.gradients.main} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <Text style={styles.title}>Şanslı Kedi</Text>
        <Text style={styles.subtitle}>Rastgele bir kedi keşfet</Text>
      </View>

      <View style={styles.content}>
        {cat ? (
          <Pressable
            onPress={() => breed && router.push(`/breed/${breed.id}`)}
            disabled={!breed}
          >
            <GlassCard style={styles.card} variant="elevated">
              <View style={styles.cardInner}>
                <Image source={{ uri: cat.url }} style={styles.image} />
                {breed && (
                  <View style={styles.info}>
                    <Text style={styles.breedName}>{breed.name}</Text>
                    <Text style={styles.breedOrigin}>{breed.origin}</Text>
                  </View>
                )}
              </View>
            </GlassCard>
          </Pressable>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>🎲</Text>
            <Text style={styles.placeholderText}>
              Butona basarak{'\n'}şanslı kedini bul!
            </Text>
          </View>
        )}

        <Pressable
          onPress={loadRandomCat}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            { transform: [{ scale: pressed ? 0.95 : 1 }] },
          ]}
        >
          <LinearGradient
            colors={[theme.colors.primary, '#FF8FA3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.buttonEmoji}>🎲</Text>
                <Text style={styles.buttonText}>
                  {cat ? 'Başka Kedi' : 'Kedi Bul'}
                </Text>
              </>
            )}
          </LinearGradient>
        </Pressable>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 120,
  },
  card: {
    width: width - 48,
    marginBottom: theme.spacing.xl,
  },
  cardInner: {
    borderRadius: theme.borderRadius.lg - 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  info: {
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  breedName: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
  },
  breedOrigin: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  placeholder: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  placeholderEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadow.glow,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md + 4,
    paddingHorizontal: theme.spacing.xl + 8,
    borderRadius: theme.borderRadius.xl,
  },
  buttonEmoji: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    ...theme.typography.headline,
    color: theme.colors.text.inverse,
  },
});
