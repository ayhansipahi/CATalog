import Constants from 'expo-constants';
import { Breed, CatImage } from '@/types/breed';

const BASE_URL = 'https://api.thecatapi.com/v1';

// API key is read from .env file
// Get a free key at: https://thecatapi.com/signup
const API_KEY = Constants.expoConfig?.extra?.catApiKey || '';

const headers: HeadersInit = API_KEY
  ? { 'x-api-key': API_KEY }
  : {};

export const catApi = {
  // Get all breeds
  async getBreeds(): Promise<Breed[]> {
    const response = await fetch(`${BASE_URL}/breeds`, { headers });
    if (!response.ok) throw new Error('Failed to load breeds');
    return response.json();
  },

  // Get a single breed
  async getBreed(id: string): Promise<Breed> {
    const response = await fetch(`${BASE_URL}/breeds/${id}`, { headers });
    if (!response.ok) throw new Error('Breed not found');
    return response.json();
  },

  // Get images for a breed
  async getBreedImages(breedId: string, limit: number = 5): Promise<CatImage[]> {
    const response = await fetch(
      `${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to load images');
    return response.json();
  },

  // Get breed cover image
  async getBreedImage(imageId: string): Promise<CatImage> {
    const response = await fetch(`${BASE_URL}/images/${imageId}`, { headers });
    if (!response.ok) throw new Error('Image not found');
    return response.json();
  },

  // Get random cat image
  async getRandomCat(): Promise<CatImage> {
    const response = await fetch(
      `${BASE_URL}/images/search?has_breeds=1&limit=1`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to load random cat');
    const data = await response.json();
    return data[0];
  },
};
