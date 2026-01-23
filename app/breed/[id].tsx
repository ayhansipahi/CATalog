import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import ImageViewing from 'react-native-image-viewing';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useBreed, useBreedImages } from '@/hooks/useBreeds';
import { GlassCard, StatBar } from '@/components';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function BreedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(false);

  // React Query hooks with caching
  const { data: breed, isLoading: breedLoading } = useBreed(id);
  const { data: images = [] } = useBreedImages(id);

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = breed ? isFavorite(breed.id) : false;

  // Reset active image when id changes
  useEffect(() => {
    setActiveImage(0);
    setGalleryVisible(false);
  }, [id]);

  // Format images for gallery viewer
  const galleryImages = useMemo(
    () => images.map((img) => ({ uri: img.url })),
    [images]
  );

  const openGallery = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveImage(index);
    setGalleryVisible(true);
  };

  const handleFavorite = () => {
    if (!breed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(breed);
  };

  const openWikipedia = () => {
    if (breed?.wikipedia_url) {
      Linking.openURL(breed.wikipedia_url);
    }
  };

  if (breedLoading) {
    return (
      <LinearGradient colors={theme.colors.gradients.main} style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LinearGradient>
    );
  }

  if (!breed) {
    return (
      <LinearGradient colors={theme.colors.gradients.main} style={styles.loading}>
        <Text style={styles.errorText}>Breed not found</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradients.main}
        style={StyleSheet.absoluteFill}
      />

      {/* Görsel Carousel */}
      <View style={styles.imageContainer}>
        {images.length > 0 ? (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setActiveImage(index);
              }}
            >
              {images.map((img, index) => (
                <Pressable key={img.id} onPress={() => openGallery(index)}>
                  <Image source={{ uri: img.url }} style={styles.image} />
                </Pressable>
              ))}
            </ScrollView>
            {/* Dots */}
            <View style={styles.dots}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, activeImage === index && styles.dotActive]}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🐱</Text>
          </View>
        )}
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent']}
          style={styles.topOverlay}
        />
      </View>

      {/* Geri butonu */}
      <Pressable
        style={[styles.backButton, { top: insets.top + 8 }]}
        onPress={() => router.back()}
      >
        <BlurView intensity={80} tint="light" style={styles.backButtonBlur}>
          <Text style={styles.backIcon}>←</Text>
        </BlurView>
      </Pressable>

      {/* Favori butonu */}
      <Pressable
        style={[styles.favoriteButton, { top: insets.top + 8 }]}
        onPress={handleFavorite}
      >
        <BlurView intensity={80} tint="light" style={styles.favoriteButtonBlur}>
          <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
        </BlurView>
      </Pressable>

      {/* İçerik */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Başlık kartı */}
        <GlassCard style={styles.headerCard}>
          <View style={styles.headerInner}>
            <Text style={styles.name}>{breed.name}</Text>
            <View style={styles.originRow}>
              <Text style={styles.originFlag}>📍</Text>
              <Text style={styles.origin}>{breed.origin}</Text>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⏱️</Text>
                <Text style={styles.metaText}>{breed.life_span} years</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>⚖️</Text>
                <Text style={styles.metaText}>{breed.weight.metric} kg</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Mizaç */}
        <GlassCard style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.sectionTitle}>Temperament</Text>
            <View style={styles.temperamentContainer}>
              {breed.temperament.split(', ').map((trait, index) => (
                <View key={index} style={styles.trait}>
                  <Text style={styles.traitText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>
        </GlassCard>

        {/* Açıklama */}
        <GlassCard style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{breed.description}</Text>
          </View>
        </GlassCard>

        {/* Özellikler */}
        <GlassCard style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.sectionTitle}>Characteristics</Text>
            <StatBar label="Adaptability" value={breed.adaptability} icon="🏠" />
            <StatBar label="Affection" value={breed.affection_level} icon="💕" />
            <StatBar label="Energy" value={breed.energy_level} icon="⚡" />
            <StatBar label="Intelligence" value={breed.intelligence} icon="🧠" />
            <StatBar label="Social" value={breed.social_needs} icon="👥" />
            <StatBar label="Grooming" value={breed.grooming} icon="✨" />
          </View>
        </GlassCard>

        {/* Wikipedia linki */}
        {breed.wikipedia_url && (
          <Pressable onPress={openWikipedia}>
            <GlassCard style={styles.card}>
              <View style={[styles.cardInner, styles.wikiRow]}>
                <Text style={styles.wikiIcon}>📖</Text>
                <Text style={styles.wikiText}>Read on Wikipedia</Text>
                <Text style={styles.wikiArrow}>→</Text>
              </View>
            </GlassCard>
          </Pressable>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fullscreen Image Gallery */}
      <ImageViewing
        images={galleryImages}
        imageIndex={activeImage}
        visible={galleryVisible}
        onRequestClose={() => setGalleryVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
        presentationStyle="overFullScreen"
      />
    </View>
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
  errorText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
  imageContainer: {
    width,
    height: width * 0.9,
    position: 'relative',
  },
  image: {
    width,
    height: width * 0.9,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width,
    height: width * 0.9,
    backgroundColor: theme.colors.gradients.pink[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 80,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  dots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: 'white',
    width: 18,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  backButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backIcon: {
    fontSize: 22,
    color: theme.colors.text.primary,
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
  },
  favoriteButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    marginTop: -40,
  },
  contentInner: {
    paddingHorizontal: theme.spacing.md,
  },
  headerCard: {
    marginBottom: theme.spacing.md,
  },
  headerInner: {
    padding: theme.spacing.lg,
  },
  name: {
    ...theme.typography.largeTitle,
    color: theme.colors.text.primary,
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  originFlag: {
    fontSize: 14,
    marginRight: 4,
  },
  origin: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardInner: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.headline,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  temperamentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trait: {
    backgroundColor: theme.colors.gradients.pink[0],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.full,
  },
  traitText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  wikiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wikiIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  wikiText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  wikiArrow: {
    fontSize: 18,
    color: theme.colors.text.tertiary,
  },
});
