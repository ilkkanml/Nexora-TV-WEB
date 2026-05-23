# NEXORA TV WEB — START HERE

Bu dosya, yeni sohbet penceresinde veya yeni geliştirme turunda projeye hızlı ve doğru başlamak için okunacak ilk dosyadır.

## Proje amacı

NEXORA TV WEB, Nexora TV IPTV player ekosistemi için yayınlanabilir web sitesi, kullanıcı profili, cihaz aktivasyon akışı, lisans yönetimi hazırlığı, download alanı, admin panel ve reseller panel temelini taşır.

Bu proje yayın, kanal, playlist, IPTV aboneliği, provider erişimi veya içerik satmaz. Sadece player uygulaması ve lisans/cihaz yönetimi tarafını destekler.

## Mevcut durum

- Repo: `ilkkanml/Nexora-TV-WEB`
- Branch: `main`
- Durum: Demo/prototip modundan production website shell yapısına geçiş hazırlanıyor.
- Mevcut site statik HTML/CSS/JS ile çalışıyor.
- Mevcut demo veri sistemi `localStorage` üstünde çalışıyor.
- Gerçek backend henüz bağlı değil.
- Gerçek ödeme, lisans, admin auth, reseller auth ve cihaz sync sistemi henüz production seviyesinde değil.

## İlk okunacak dosyalar

1. `README.md`
2. `docs/START_HERE.md`
3. `docs/HANDOFF.md`
4. `docs/UI_THEME_GUARD.md`
5. `docs/BACKLOG.md`

## Ana karar

Bu repo artık demo gibi değil, normal yayınlanabilir site altyapısı gibi ele alınacak.

Öncelik:

1. Demo kodlarını ve demo akışlarını ayırmak/kaldırmak.
2. Ana siteyi normal ziyaretçi sitesi olarak güvenli hale getirmek.
3. Admin/reseller panellerini gerçek backend gelene kadar açıkta tehlikeli çalışmayacak hale getirmek.
4. Download, pricing, legal notice ve contact/support alanlarını production shell seviyesine getirmek.
5. Backend API entegrasyonu için temiz endpoint beklentileri hazırlamak.

## Yapılmaması gerekenler

- Frontend içinde admin kodu tutma.
- Frontend içinde gerçek lisans üretme.
- `localStorage` verisini production veri kaynağı gibi kullanma.
- IPTV şifrelerini frontend içinde saklama.
- Demo cihaz/reseller/admin bilgilerini gerçek site deneyiminde gösterme.
- Temaya uymayan rastgele component, renk veya layout ekleme.
- Nexora TV’nin yayın/provider/playlist sattığı izlenimini verme.

## Çalışma biçimi

Küçük, kontrollü, test edilebilir değişiklikler yapılır.

Her değişiklikten sonra şu sorular cevaplanır:

- Demo verisi production deneyiminde görünüyor mu?
- Site normal ziyaretçi için güvenli ve anlaşılır mı?
- Admin/reseller tarafı açık güvenlik riski taşıyor mu?
- Tema bütünlüğü korundu mu?
- Nexora TV’nin sadece player olduğu mesajı korunuyor mu?

## Son karar yetkisi

Project Director: İlkkan

Agent rolü: Web Implementation Agent

Kontrol sistemi: Handoff + UI Theme Guard + Backlog + QA checklist
