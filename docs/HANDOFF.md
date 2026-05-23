# NEXORA TV WEB — HANDOFF

Bu dosya, projeyi başka sohbet penceresine, başka agente veya sonraki geliştirme turuna devretmek için kullanılır.

## Kısa proje özeti

NEXORA TV WEB, Nexora TV player ekosisteminin web tarafıdır. Amaç; kullanıcıya uygulama indirme, cihazla profil açma, lisans durumunu görme, yasal kaynak bilgisini güvenli backend üzerinden cihaza aktarma, admin ve reseller yönetimlerini destekleme altyapısı sağlamaktır.

Nexora TV içerik, kanal, playlist, IPTV aboneliği veya provider erişimi satmaz.

## Güncel teknik durum

- Statik HTML/CSS/JS prototip var.
- Ana site `index.html`, `styles.css`, `app.js` üzerinden çalışıyor.
- Admin panel `panel/` altında.
- Reseller panel `reseller/` altında.
- Başlangıç PostgreSQL şeması `schema.sql` içinde.
- Demo mantığı şu an frontend/localStorage içinde.
- Production backend henüz yok.

## Aktif yön

Demo/prototip modundan production website shell yapısına geçilecek.

Önce yapılacak iş:

`Milestone 1 — Demo Mode Removal & Production Website Shell`

## M1 hedefi

- Normal ziyaretçi sitesi güvenli şekilde çalışmalı.
- Demo cihaz/admin/reseller kodları public deneyimden kaldırılmalı.
- Admin/reseller panel gerçek auth gelene kadar güvenli placeholder veya disabled state haline getirilmeli.
- Frontend localStorage production mantığı olarak kullanılmamalı.
- Download alanı production dosya yollarına hazır kalmalı.
- Lisans planları tanıtım/CTA seviyesinde kalmalı, sahte lisans üretmemeli.
- IPTV kaynak gönderimi backend gelene kadar gerçekmiş gibi çalışmamalı.

## M1 kapsam dışı

- Gerçek backend yazımı
- Payment provider entegrasyonu
- Gerçek lisans serverı
- Gerçek admin session sistemi
- Gerçek reseller wallet/kontör sistemi
- APK üretimi
- TV uygulama kodu
- Provider/playlist satışı veya içerik sistemi

## Kritik riskler

1. Admin kodunun frontend içinde durması.
2. Reseller kodlarının frontend demo verisinde görünmesi.
3. IPTV şifrelerinin base64 ile saklanması.
4. LocalStorage’ın gerçek lisans sistemi gibi davranması.
5. Demo butonlarının kullanıcıya gerçek işlem hissi vermesi.
6. Tema bütünlüğünün rastgele UI eklemeleriyle bozulması.
7. Nexora TV’nin yayın/playlist/provider satıyor gibi algılanması.

## Production backend için gelecek endpoint beklentileri

İleride backend geldiğinde minimum şu API alanları gerekir:

- `POST /api/device/login`
- `GET /api/device/profile`
- `GET /api/license/status`
- `POST /api/license/checkout`
- `POST /api/source/submit`
- `POST /api/admin/login`
- `GET /api/admin/devices`
- `GET /api/admin/licenses`
- `GET /api/admin/resellers`
- `POST /api/reseller/login`
- `GET /api/reseller/customers`
- `POST /api/webhooks/payment`

## QA checklist

Her değişiklikten sonra kontrol et:

- Ana sayfa açılıyor mu?
- Download butonları kırılmadan çalışıyor mu?
- Pricing alanı görünüyor mu?
- Demo cihaz bilgileri public görünümde kaldırıldı mı?
- Demo admin/reseller kodları görünmüyor mu?
- Admin/reseller panel açıkta işlem yapmıyor mu?
- IPTV şifresi frontend içinde saklanmıyor mu?
- Console error var mı?
- Mobil görünüm bozuldu mu?
- Tema `UI_THEME_GUARD.md` ile uyumlu mu?
- Yasal mesaj: “Nexora TV sadece playerdır” korunuyor mu?

## Son bilinen karar

Departman sistemi kurulmayacak. Bu repo için hafif kontrol yapısı kullanılacak:

- `START_HERE.md`
- `HANDOFF.md`
- `UI_THEME_GUARD.md`
- `BACKLOG.md`

Project Director: İlkkan
