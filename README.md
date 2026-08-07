# DBMS Frontend Prototipi

Local US Bilişim A.Ş. stajım kapsamında geliştirdiğim Veritabanı Yönetim Sistemi (DBMS) frontend uygulaması.

Projede 1. hafta kurulumlarını tamamlayıp kurumsal klasör mimarisini oluşturdum. Sayfa yönlendirmeleri ve durum yönetimi için gerekli altyapıyı bağladım.

## Kullanılan Teknolojiler

- Vue 3 (Composition API)
- Vite
- Vue Router
- Vuex
- Tailwind CSS

## Proje Yapısı (`src/`)

- `api/` & `services/`: API istekleri ve servis katmanı
- `components/` & `views/`: Bileşenler ve sayfa görünümleri
- `store/` & `router/`: Vuex durum yönetimi ve sayfa rotaları
- `assets/`, `composables/`, `layouts/`, `utils/`

## Çalıştırma Adımları

```bash
npm install
npm run dev
```

## 2. Hafta - Dashboard Modülü

- Projeye Vue-ECharts ve Lucide ikon paketlerini kurup entegrasyonlarını tamamladım.
- Sayfa düzeni için MainLayout, Sidebar ve Header bileşenlerini tasarlayıp responsive hale getirdim.
- Veritabanı trafiğini ve durumlarını görselleştirmek adına Pie, Bar ve Line chart grafiklerini ekledim.
- Dashboard ekranına veritabanı, tablo, kullanıcı ve aktif bağlantı istatistik kartları ile canlı Son İşlem Kayıtları tablosunu ekledim.
