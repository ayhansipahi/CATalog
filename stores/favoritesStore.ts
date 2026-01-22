import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Breed } from '@/types/breed';

interface FavoritesState {
  favorites: Breed[];
  addFavorite: (breed: Breed) => void;
  removeFavorite: (breedId: string) => void;
  isFavorite: (breedId: string) => boolean;
  toggleFavorite: (breed: Breed) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (breed) =>
        set((state) => ({
          favorites: [...state.favorites, breed],
        })),

      removeFavorite: (breedId) =>
        set((state) => ({
          favorites: state.favorites.filter((b) => b.id !== breedId),
        })),

      isFavorite: (breedId) =>
        get().favorites.some((b) => b.id === breedId),

      toggleFavorite: (breed) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(breed.id)) {
          removeFavorite(breed.id);
        } else {
          addFavorite(breed);
        }
      },
    }),
    {
      name: 'catalog-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
