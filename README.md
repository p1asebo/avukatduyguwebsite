# Av. Duygu Sultan Açıkgöz Işık - Hukuk Bürosu Web Sitesi

Bu proje Next.js 15 (App Router) ve Tailwind CSS kullanılarak geliştirilmiştir. "Neo-Trust" tasarım diline sadık kalınarak oluşturulmuştur.

## Kurulum

Bu proje henüz `node_modules` içermemektedir. Çalıştırmak için aşağıdaki adımları izleyin:

1.  **Node.js Kurun:** Bilgisayarınızda Node.js (v18 veya üzeri) kurulu olduğundan emin olun.
2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya
    yarn
    ```
    *Not: Eğer `package-lock.json` henüz oluşmadıysa, `package.json` dosyasındaki bağımlılıklar yüklenecektir.*

3.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:3000` adresine gidin.

## Proje Yapısı

- **`src/app`**: Sayfa rotaları (App Router yapısı).
    - `page.tsx`: Anasayfa
    - `hakkimda/`: Hakkımda sayfası
    - `uzmanlik-alanlari/`: Hizmetler
    - `blog/`: Makaleler ve Arama
    - `hesaplama/`: Hesaplama araçları listesi
    - `iletisim/`: İletişim formu ve harita
- **`src/components`**:
    - `layout/`: Navbar, Footer gibi genel bileşenler.
    - `ui/`: Card, Button gibi yeniden kullanılabilir UI elemanları.
- **`src/lib`**: Yardımcı fonksiyonlar (`cn` vb.).
- **`public`**: Statik dosyalar (logo vb.).

## Tasarım Notları

- **Renkler:** `tailwind.config.ts` dosyasında `primary` (#0F172A) ve `accent` (#3B82F6) olarak tanımlanmıştır.
- **Font:** Google Fonts üzerinden 'Plus Jakarta Sans' ve 'Playfair Display' (başlıklar için) entegre edilmiştir.

## Backend Entegrasyonu (Notlar)

- **Blog:** `src/app/blog/page.tsx` şu anda statik veri kullanıyor. CMS veya veritabanı bağlandığında buradaki array'i dinamik veriyle değiştirin.
- **İletişim Formu:** `src/app/iletisim/page.tsx` içindeki formun `onSubmit` event'i bir API rotasına bağlanmalıdır.
- **Hesaplama Araçları:** `/hesaplama` sayfası şu an sadece bir menüdür. Her bir hesaplama aracı için ayrı rotalar (ör: `/hesaplama/kidem`) ve mantık (logic) eklenmelidir.
