import { Breed, CatImage } from '@/types/breed';

const BASE_URL = 'https://api.thecatapi.com/v1';

// Ücretsiz API key al: https://thecatapi.com/signup
// Şimdilik key olmadan da çalışır (limitli)
const API_KEY = '';

const headers: HeadersInit = API_KEY
  ? { 'x-api-key': API_KEY }
  : {};

export const catApi = {
  // Tüm ırkları getir
  async getBreeds(): Promise<Breed[]> {
    const response = await fetch(`${BASE_URL}/breeds`, { headers });
    if (!response.ok) throw new Error('Irklar yüklenemedi');
    return response.json();
  },

  // Tek bir ırk getir
  async getBreed(id: string): Promise<Breed> {
    const response = await fetch(`${BASE_URL}/breeds/${id}`, { headers });
    if (!response.ok) throw new Error('Irk bulunamadı');
    return response.json();
  },

  // Irka ait görselleri getir
  async getBreedImages(breedId: string, limit: number = 5): Promise<CatImage[]> {
    const response = await fetch(
      `${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`,
      { headers }
    );
    if (!response.ok) throw new Error('Görseller yüklenemedi');
    return response.json();
  },

  // Irkın kapak görselini getir
  async getBreedImage(imageId: string): Promise<CatImage> {
    const response = await fetch(`${BASE_URL}/images/${imageId}`, { headers });
    if (!response.ok) throw new Error('Görsel bulunamadı');
    return response.json();
  },

  // Rastgele kedi görseli
  async getRandomCat(): Promise<CatImage> {
    const response = await fetch(
      `${BASE_URL}/images/search?has_breeds=1&limit=1`,
      { headers }
    );
    if (!response.ok) throw new Error('Rastgele kedi bulunamadı');
    const data = await response.json();
    return data[0];
  },
};
