import { useQuery } from '@tanstack/react-query';
import { catApi } from '@/services/catApi';

// Query keys
export const queryKeys = {
  breeds: ['breeds'] as const,
  breed: (id: string) => ['breed', id] as const,
  breedImages: (id: string) => ['breedImages', id] as const,
  randomCat: ['randomCat'] as const,
};

// Get all breeds - cached for fast initial load
export function useBreeds() {
  return useQuery({
    queryKey: queryKeys.breeds,
    queryFn: catApi.getBreeds,
    // Breeds don't change often, keep fresh for 1 hour
    staleTime: 1000 * 60 * 60,
  });
}

// Get single breed
export function useBreed(id: string) {
  return useQuery({
    queryKey: queryKeys.breed(id),
    queryFn: () => catApi.getBreed(id),
    enabled: !!id,
  });
}

// Get breed images
export function useBreedImages(id: string, limit: number = 5) {
  return useQuery({
    queryKey: queryKeys.breedImages(id),
    queryFn: () => catApi.getBreedImages(id, limit),
    enabled: !!id,
  });
}

// Get random cat - no caching, always fresh
export function useRandomCat() {
  return useQuery({
    queryKey: queryKeys.randomCat,
    queryFn: catApi.getRandomCat,
    enabled: false, // Manual trigger only
    staleTime: 0,
    gcTime: 0,
  });
}
