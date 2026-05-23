# NEXORA TV WEB — BACKLOG

Bu dosya, Nexora TV Web projesindeki işleri kısa ve kontrollü takip etmek için kullanılır.

## Milestone 1 — Demo Mode Removal & Production Website Shell

Durum: OPEN

Amaç: Mevcut statik demo/prototip yapısını normal yayınlanabilir site iskeletine çevirmek.

### M1 yapılacaklar

- [ ] README içindeki demo/prototip açıklamasını production transition yönüne göre güncelle.
- [ ] Demo cihaz giriş bilgilerini public UI’dan kaldır.
- [ ] Demo admin kodunu public UI’dan kaldır.
- [ ] Demo reseller kodunu public UI’dan kaldır.
- [ ] `app.js` içindeki demo localStorage akışını production deneyiminden ayır.
- [ ] Lisans oluşturma butonunu gerçek ödeme/backend gelene kadar güvenli CTA/placeholder haline getir.
- [ ] IPTV kaynak gönderimini gerçek backend gelene kadar güvenli disabled/coming soon akışına çevir.
- [ ] Admin panelini gerçek auth gelene kadar güvenli placeholder veya locked state haline getir.
- [ ] Reseller panelini gerçek auth gelene kadar güvenli placeholder veya locked state haline getir.
- [ ] Download alanını production dosya yapısı için temizle.
- [ ] Legal notice metnini güçlendir: Nexora TV yayın, kanal, playlist veya provider satmaz.
- [ ] Mobil görünümü kontrol et.
- [ ] Console error kontrolü yap.
- [ ] UI Theme Guard uyum kontrolü yap.

### M1 kabul kriterleri

- [ ] Site ziyaretçiye demo/prototip gibi görünmez.
- [ ] Demo kodları public görünümde yoktur.
- [ ] Frontend gerçek lisans üretmez.
- [ ] Frontend gerçek admin/reseller işlemi yapmaz.
- [ ] IPTV bilgisi frontend içinde saklanmaz.
- [ ] Ana site download/pricing/legal/support amacıyla güvenli çalışır.
- [ ] Admin/reseller bölümleri backend gelene kadar tehlikeli işlem yapmaz.
- [ ] Tema bütünlüğü korunur.

## Milestone 2 — Backend API Planning

Durum: NOT OPEN

Amaç: Production backend için API sözleşmesini ve veri güvenliği kurallarını hazırlamak.

### M2 aday işler

- [ ] API endpoint listesini netleştir.
- [ ] Auth/session stratejisini belirle.
- [ ] Device key hash stratejisini belirle.
- [ ] IPTV credential encryption stratejisini belirle.
- [ ] Payment webhook akışını tanımla.
- [ ] Reseller credit transaction kurallarını belirle.
- [ ] Admin audit log kurallarını belirle.

## Milestone 3 — Backend Integration

Durum: NOT OPEN

Amaç: Web frontend’i gerçek backend’e bağlamak.

### M3 aday işler

- [ ] Device login API bağlantısı.
- [ ] License status API bağlantısı.
- [ ] Checkout/payment yönlendirme.
- [ ] IPTV source submit API bağlantısı.
- [ ] Admin auth API bağlantısı.
- [ ] Reseller auth API bağlantısı.
- [ ] Loading/error/empty state standardı.

## Milestone 4 — Production QA & Launch Prep

Durum: NOT OPEN

Amaç: Yayına hazırlık, güvenlik kontrolü, metin ve link temizliği.

### M4 aday işler

- [ ] Legal copy final kontrol.
- [ ] SEO title/description kontrol.
- [ ] Download dosyalarının gerçekliği kontrol.
- [ ] Mobile/tablet/desktop QA.
- [ ] Security review.
- [ ] Broken link kontrolü.
- [ ] Deployment checklist.

## Notlar

- Büyük departman sistemi kullanılmayacak.
- Her değişiklik küçük ve kontrol edilebilir olacak.
- Project Director son kararı verir: İlkkan.
