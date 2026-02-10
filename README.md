# Faal Slider

WordPress için kısa kod (shortcode) tabanlı, erişilebilir ve responsive slider bileşeni.

## Kurulum

1. Bu klasörü `wp-content/plugins/faal-slider` olarak kopyalayın.
2. WordPress admin panelinden **Faal Slider** eklentisini etkinleştirin.
3. İlgili sayfa veya yazıya şu shortcode'u ekleyin:

```text
[faal_slider autoplay="true" interval="5000"]
```

## Özellikler

- Next/prev navigasyon
- Dot navigasyon
- Opsiyonel autoplay (`autoplay="false"` ile kapatılabilir)
- Klavye ile sağ/sol ok desteği
- Responsive CSS düzeni

## Dosya yapısı

- `faal-slider.php`: Eklenti bootstrap dosyası
- `includes/class-faal-slider.php`: Shortcode ve render mantığı
- `assets/css/slider.css`: Slider stilleri
- `assets/js/slider.js`: Slider etkileşimleri
