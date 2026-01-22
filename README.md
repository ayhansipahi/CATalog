# 🐱 CATalog

Kedi ansiklopedisi uygulaması.

## Özellikler

- **70+ kedi ırkı** - Detaylı bilgiler ve görseller
- **Şanslı Kedi** - Rastgele kedi keşfi
- **Favoriler** - Beğendiğin ırkları kaydet
- **Arama** - İsim veya kökene göre ara
- **Liquid Glass UI** - iOS 18 tarzı modern tasarım

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS simülatörde çalıştır
npx expo start --ios
```

## API

[The Cat API](https://thecatapi.com) kullanılmaktadır. 

İsteğe bağlı olarak ücretsiz API key alabilirsiniz:
1. https://thecatapi.com/signup adresine gidin
2. API key'i `services/catApi.ts` içindeki `API_KEY` değişkenine ekleyin

## Tech Stack

- React Native + Expo
- Expo Router (File-based routing)
- Expo Blur & Linear Gradient (Liquid Glass efekti)
- Zustand (State management)
- TypeScript

## Ekran Görüntüleri

| Ana Sayfa | Detay | Şanslı Kedi |
|-----------|-------|-------------|
| Grid listesi | Irk bilgileri | Rastgele kedi |

## App Store Notları

- ✅ API kullanımı açık ve ücretsiz
- ✅ Özgün tasarım
- ✅ Basit ve kullanışlı
- ✅ Çocuklar için uygun

## Lisans

MIT
