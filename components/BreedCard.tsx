import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Breed } from '@/types/breed';
import { catApi } from '@/services/catApi';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { theme } from '@/constants/theme';

interface BreedCardProps {
  breed: Breed;
  onPress: () => void;
}

export function BreedCard({ breed, onPress }: BreedCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(breed.id);

  useEffect(() => {
    loadImage();
  }, [breed.reference_image_id]);

  const loadImage = async () => {
    try {
      if (breed.reference_image_id) {
        const image = await catApi.getBreedImage(breed.reference_image_id);
        setImageUrl(image.url);
      } else {
        const images = await catApi.getBreedImages(breed.id, 1);
        if (images.length > 0) {
          setImageUrl(images[0].url);
        }
      }
    } catch (error) {
      console.log('Görsel yüklenemedi:', breed.name);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(breed);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <View style={styles.imageContainer}>
        {loading ? (
          <View style={styles.placeholder}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>🐱</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        />

        {/* Favori butonu */}
        <Pressable onPress={handleFavorite} style={styles.favoriteButton}>
          <View
            style={[
              styles.favoriteCircle,
              favorite && styles.favoriteCircleActive,
            ]}
          >
            <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
          </View>
        </Pressable>

        {/* İsim ve köken */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {breed.name}
          </Text>
          <Text style={styles.origin} numberOfLines={1}>
            {breed.origin}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    ...theme.shadow.glass,
  },
  imageContainer: {
    aspectRatio: 0.85,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gradients.pink[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
  },
  favoriteCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.soft,
  },
  favoriteCircleActive: {
    backgroundColor: 'rgba(255,107,138,0.15)',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
  },
  name: {
    ...theme.typography.headline,
    color: theme.colors.text.inverse,
    marginBottom: 2,
  },
  origin: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.8)',
  },
});
