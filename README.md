# Faal Slider

WordPress için kısa kod (shortcode) tabanlı, erişilebilir ve responsive slider bileşeni.

## Kurulum

1. Bu klasörü `wp-content/plugins/faal-slider` olarak kopyalayın.
2. WordPress admin panelinden **Faal Slider** eklentisini etkinleştirin.
3. Admin menüsünden **Faal Slider** sayfasına girin.
4. Slide ekleyin / düzenleyin / silin ve kaydedin.
5. İlgili sayfa veya yazıya şu shortcode'u ekleyin:

```text
[faal_slider autoplay="true" interval="5000"]
```

## İçerik yönetimi

- **WP Admin > Faal Slider** ekranından slider içerikleri yönetilir.
- Her slide için:
  - Üst başlık (eyebrow)
  - Başlık
  - Açıklama
  - Buton metni
  - Buton linki
- “Yeni Slide Ekle” ile satır ekleyebilir, “Bu Slide'ı Sil” ile kaldırabilirsiniz.

## Özellikler

- Next/prev navigasyon
- Dot navigasyon
- Opsiyonel autoplay (`autoplay="false"` ile kapatılabilir)
- Klavye ile sağ/sol ok desteği
- Responsive CSS düzeni
- Admin panelinden yönetilebilir dinamik slide listesi

## Dosya yapısı

- `faal-slider.php`: Eklenti bootstrap dosyası
- `includes/class-faal-slider.php`: Shortcode + admin yönetim + render mantığı
- `assets/css/slider.css`: Slider stilleri
- `assets/js/slider.js`: Slider etkileşimleri
- `assets/css/admin.css`: Admin ekranı stilleri
- `assets/js/admin.js`: Admin ekranında slide ekle/sil davranışı
