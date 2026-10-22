# Kurla

React ve Vite ile yazılmış basit bir döviz kuru çevirici. Kurları Avrupa Merkez Bankası'nın günlük referans kurlarını sunan [Frankfurter API](https://frankfurter.dev)'den alıyor. API anahtarı gerekmiyor.

## Ekran görüntüleri

![Çevirici ve popüler dövizler şeridi](screenshots/dashboard%20%282%29.png)

![Kur tablosu](screenshots/dashboard%20%283%29.png)

## Neler var

- Çevirici: Gönderilen ve alınan para birimini seçip tutarı yazınca güncel kurla çeviriyor. TRY dahil 30 para birimi destekleniyor.
- En popüler dövizler şeridi: USD, EUR, GBP, CHF ve JPY sırayla 3 saniyede bir değişiyor. Fare şeridin üstündeyken duruyor.
- Kur tablosu: Her dövizin TRY karşılığını, bir önceki güne göre değişimini, son 30 günün grafiğini ve bu dönemdeki en yüksek kuru gösteriyor. İlk açılışta 5 döviz listeleniyor, butonla hepsi açılabiliyor.
- Şeritteki ve tablodaki "Çevir" butonları çeviriciyi o dövizden TRY'ye ayarlayıp sayfanın başına dönüyor.

## Kurulum

Bilgisayarında Node.js kurulu olmalı.

```bash
npm install
npm run dev
```

Terminalde yazan adresi (genelde http://localhost:5173) tarayıcıda aç.

Yayına almak için:

```bash
npm run build
```

Derlenen dosyalar `dist` klasörüne çıkar.

## Proje yapısı

```
src/
  api.js            Frankfurter API istekleri
  useRates.js       Tablo ve şerit için kurları çekip hazırlayan hook
  data.js           Türkçe döviz adları, ikon renkleri ve sembolleri
  App.jsx           Sayfa düzeni
  index.css         Tüm stiller
  components/
    Header.jsx      Logo ve menü
    Hero.jsx        Başlık ve çevirici
    PopularBar.jsx  Mavi popüler dövizler şeridi
    RatesTable.jsx  Kur tablosu
    Sources.jsx     Hakkımızda ve veri kaynakları
    Footer.jsx
    Illustration.jsx  Hero'daki izometrik SVG çizim
    Sparkline.jsx     Küçük kur grafikleri
```

## Kurlar hakkında

Avrupa Merkez Bankası kurları iş günlerinde günde bir kez günceller. Hafta sonu ve tatillerde son iş gününün kuru gösterilir. Bunlar alış ya da satış kuru değil, tek bir referans kurudur. Uygulama bilgi amaçlıdır.
