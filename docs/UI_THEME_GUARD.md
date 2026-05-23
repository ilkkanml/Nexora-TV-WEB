# NEXORA TV WEB — UI THEME GUARD

Bu dosya, Nexora TV Web arayüzünün tema bütünlüğünü korumak için kullanılır.

Amaç: Özellik eklerken, kaldırırken veya yer değiştirirken site aynı marka kimliğinde kalmalı.

## Ana tema kimliği

Nexora TV Web şu hissi taşımalı:

- Dark premium
- Cyber / space tech
- IPTV player odaklı
- Privacy-first
- Reklamsız ve sade
- Neon cyan / violet vurgu
- Cam yüzeyler
- Yumuşak köşeler
- Kalabalık olmayan panel yapısı
- Güven veren teknik ürün dili

## Ana renk karakteri

Mevcut CSS değişkenleri korunmalı:

- `--bg`
- `--bg-2`
- `--surface`
- `--surface-strong`
- `--line`
- `--line-strong`
- `--text`
- `--muted`
- `--soft`
- `--cyan`
- `--violet`
- `--mint`
- `--amber`
- `--red`

Yeni renk eklemek son çare olmalı. Önce mevcut değişkenlerden biri kullanılmalı.

## Component kuralları

Yeni UI eklerken önce mevcut class sistemini kullan:

- Ana buton: `.primary-action`
- İkincil buton: `.secondary-action`
- Metin butonu: `.text-button`
- Kart/surface: `.surface`
- Feature kart: `.feature-card`
- Pricing kart: `.pricing-card`
- Stat kart: `.stat-card`
- Tab: `.admin-tab`
- Üst bar: `.topbar`
- Durum etiketi: `.badge`
- Form alanı: mevcut `label`, `input`, `select` sistemi

Yeni component gerekiyorsa mevcut spacing, border, radius, shadow ve renk karakterinden türetilmeli.

## Layout kuralları

- Ana site geniş ve nefes alan section yapısını korur.
- Admin/reseller alanı daha yoğun olabilir ama karmaşık görünmemeli.
- Kartlar tek tip border/radius mantığını korur.
- Section başlıklarında `eyebrow`, `h1/h2`, açıklama metni düzeni korunur.
- Mobilde yatay taşma olmamalı.
- Tablo alanları `table-wrap` içinde kalmalı.

## Yazı dili kuralları

Nexora TV şu mesajı korumalı:

- Player lisansı sunar.
- Yayın satmaz.
- Kanal satmaz.
- Playlist satmaz.
- Provider erişimi sağlamaz.
- Kullanıcının kendi yasal kaynaklarını kullanması gerekir.

Yazı dili:

- Net
- Güvenli
- Premium
- Fazla pazarlama kokmayan
- Teknik ama anlaşılır
- “IPTV satıcısı” gibi değil, “player teknolojisi” gibi

## Yasaklar

Şunlar yapılmamalı:

- Rastgele light mode sayfa eklemek.
- Bootstrap/Tailwind gibi dışarıdan bambaşka görünüm sokmak.
- Mevcut buton sistemi dışında yeni rastgele buton stilleri üretmek.
- Her feature için farklı renk paleti kullanmak.
- Çok parlak casino/streaming/kaçak yayın havası vermek.
- Kanal, provider, playlist, yayın satışı çağrıştıran görsel veya metin kullanmak.
- Demo kodlarını public UI’da göstermek.
- Admin/reseller işlemlerini gerçek auth olmadan production gibi açık bırakmak.
- Çok kalabalık dashboard görünümü üretmek.

## Yeni özellik ekleme kontrolü

Yeni özellik eklemeden önce sor:

1. Bu özellik Nexora TV’nin player/lisans/download kimliğine uyuyor mu?
2. Mevcut component ile yapılabiliyor mu?
3. Yeni component gerekiyorsa mevcut temadan türetildi mi?
4. Mobil görünüm bozuluyor mu?
5. Legal mesajı zayıflatıyor mu?
6. Demo/prototype hissi yaratıyor mu?
7. Kullanıcıya yayın/provider satıldığı izlenimi veriyor mu?

## QA kontrolü

Her UI değişikliğinde kontrol et:

- Header bozulmadı.
- Hero alanı marka hissini koruyor.
- Download bölümü anlaşılır.
- Pricing kartları aynı sistemde.
- Formlar aynı görsel dilde.
- Admin/reseller panel ana temadan kopmadı.
- Mobil görünümde butonlar ve tablolar taşmıyor.
- Console error yok.

## Tema kararı

Bu proje dark premium cyber player sitesi olarak kalacak.

Yeni tasarım kararları bu kimliği güçlendirmeli, değiştirmemeli.
