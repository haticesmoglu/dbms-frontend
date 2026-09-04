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

## 3. Hafta - Veritabanı Yönetim Modülü

Bu hafta kapsamında, yönetim panelinin veritabanı yönetim arayüzünü ve veri akış mimarisini geliştirdim:

- **Servis Katmanı & Mock API:** Asenkron veri akışını simüle etmek amacıyla `database.service.js` servis yapısını kurguladım ve sahte veritabanı kayıtlarını bağladım.
- **Canlı Arama ve Durum Filtreleme:** Vue 3 `computed` reaktivitesini kullanarak kullanıcıların veritabanı adına göre anlık arama yapabileceği ve duruma (_Active, Inactive, Maintenance_) göre filtreleyebileceği filtreleme mekanizmasını geliştirdim.
- **Dinamik Kolon Sıralaması (Sorting):** Tablo başlıklarına (`th`) tıklama etkileşimi kazandırarak isim ve tablo sayısına göre küçükten büyüğe / büyükten küçüğe dinamik sıralama mantığını koda döktüm.
- **Sayfalama (Pagination):** Verilerin kullanıcıyı yormadan 4'erli parçalar halinde listelenmesini sağladım; önceki/sonraki kontrollerini ve filtreleme değiştiğinde sayfayı otomatik başa saran akışı tamamladım.

## 4. Hafta - CRUD İşlemleri ve Form Yönetimi

- Vee-Validate ve Yup kütüphaneleriyle form validasyonlarını entegre ettim.
- Database Create, Read (Detail), Update ve Delete (CRUD) akışlarını tamamladım.
- Modal tabanlı kullanıcı etkileşimlerini oluşturdum.

## 5. Hafta - Table Yönetimi ve Responsive Arayüz

Bu hafta kapsamında, veritabanlarına bağlı alt tabloların listelenmesi, yönetilmesi ve mobil uyumlu arayüz mimarisini geliştirdim:

- **İlişkisel Servis & Rota Yapısı:** Dinamik rota parametresi (`/databases/:databaseId/tables`) ile seçilen veritabanına özel veri akışı sağlayan `table.service.js` servis katmanını kurdum.
- **Responsive Tablo Mimarisi:** Mobil, tablet ve masaüstü ekranlarda yatay kaydırma desteğiyle taşma yapmayan, modern `overflow-x-auto` ve Tailwind tabanlı esnek tablo görünümü geliştirdim.
- **Tablo CRUD ve Validasyon Akışı:** Vee-Validate ve Yup kullanarak tablo adı ve depolama motoru (`InnoDB`, `MyISAM`, `Memory`) seçimlerini doğrulayan `TableModal` bileşenini kodladım.
- **Modüller Arası Geçiş:** Veritabanı yönetim tablosuna doğrudan ilgili veritabanının tablo listesine yönlendiren dinamik bağlantıları entegre ettim.
- **Özel Silme Pop-up'ı (UI/UX İyileştirmesi):** Tarayıcının varsayılan `confirm()` diyaloglarını kaldırarak hem veritabanı hem de tablo silme adımları için Tailwind destekli, güvenli ve modern onay pop-up modalları geliştirdim.

## 6. Hafta - Kolon Yönetimi

Bu hafta kapsamında, tablolara bağlı alt kolonların listelenmesi, yönetilmesi ve tablo şemasının dışa aktarılma mimarisini geliştirdim:

- **İlişkisel Servis & Rota Yapısı:** Dinamik rota parametresi (`/databases/:databaseId/tables/:tableId/columns`) ile seçilen tabloya özel veri akışı sağlayan `column.service.js` servis katmanını ve `ColumnView.vue` görünümünü kurdum.
- **Kolon CRUD ve Validasyon Akışı:** Vee-Validate ve Yup kullanarak kolon adı, veri tipi, varsayılan değer ile kısıtlamaları (`PK`, `Nullable`, `Auto Increment`) doğrulayan `ColumnModal` bileşenini kodladım.
- **Excel & CSV Dışa Aktarma Modülü:** Harici kütüphane bağımlılığı olmadan yerel `Blob` API mimarisini kullanarak tablo şemasını `.csv` / Excel formatında indiren `excelGenerator.js` yardımcı servisini geliştirdim.
- **Karakter ve Format Uyumluluğu:** Türkçe karakterlerin Excel üzerinde bozulmadan açılabilmesi için UTF-8 BOM (`\uFEFF`) desteğini ve Excel hücre yapısına uygun noktalı virgül (`;`) ayracını entegre ettim.
- **Özel Uyarı ve Silme Pop-up'ları (UI/UX İyileştirmesi):** Boş tablolarda şema indirmeyi engelleyen `FileWarning` uyarı pop-up'ını, güvenli silme onay modalını ve kısıtlamaları görselleştiren Tailwind tabanlı rozetleri (`PK`, `NULL`, `A_I`) geliştirdim.

## 7. Hafta - Vuex ile Modüler Global State Yönetimi

Bu hafta kapsamında, bileşenlere dağılmış verileri merkezi hafızaya toplayarak kurumsal modüler state mimarisini kurdum:

- **Modüler Store Mimarisi:** Dokümanda zorunlu tutulan `auth`, `database`, `table`, `user` ve `notification` modüllerini `namespaced: true` yapısıyla ayrıştırdım.
- **Action, Mutation ve Getter Entegrasyonu:** Asenkron servis isteklerini `actions` katmanında yönetip, reaktif state güncellemelerini `mutations` üzerinden sağladım; filtrelenmiş verileri bileşenlere `getters` ile sundum.
- **Bileşenlerin Store'a Taşınması:** `DatabaseView` ve alt bileşenlerini doğrudan servis bağımlılığından kurtararak `useStore()`, `dispatch` ve `computed` üzerinden Vuex store'a bağladım.
- **Global Bildirim (Toast) Sistemi:** İşlem başarı veya hata durumlarını tüm sayfalardan tetiklenebilecek merkezi bir `notification` modülü ve `App.vue` bildirim arayüzü ile kullanıcıya sundum.
