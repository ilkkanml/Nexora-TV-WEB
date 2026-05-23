# Nexora TV Web

Nexora TV Web, Nexora TV player ekosistemi icin hazirlanan public website ve panel shell reposudur.

Bu repo artik demo/prototip odakli degil; production website shell yapisina gecis icin kullanilir. Ana hedef; kullaniciya uygulama indirme, urun bilgisi, lisans planlari, yasal bilgilendirme ve ileride backend ile baglanacak cihaz/portal/admin/reseller akislari icin temiz bir web zemini saglamaktir.

Nexora TV yayin, kanal, playlist, IPTV aboneligi, provider erisimi veya icerik satmaz, saglamaz ya da barindirmaz. Nexora TV yalnizca player uygulamasi ve lisans/cihaz yonetimi altyapisina odaklanir.

## Acma

`index.html` dosyasini tarayicida acmak yeterli. Harici paket, build adimi veya internet baglantisi gerektirmez.

## Mevcut kapsam

- Public landing page
- Hesapsiz download bolumu
- Android TV / Fire TV / Android Mobile dosya secimi
- Lisans planlari tanitim alani
- Production backend icin hazir cihaz portali shell'i
- Production backend icin kilitli admin panel shell'i
- Production backend icin kilitli reseller panel shell'i
- PostgreSQL baslangic semasi
- UI tema koruma dokumani
- Handoff ve backlog dokumanlari

## Demo modu hakkinda

Eski demo akislari production deneyiminden kaldirilacaktir/kaldirilmaktadir.

Production shell icinde su davranislar olmamalidir:

- Public UI'da demo cihaz kodu gostermek
- Frontend icinde admin veya reseller erisim kodu tutmak
- Frontend'de gercek lisans uretmek
- Frontend'de reseller kontor islemi yapmak
- Frontend'de IPTV sifresi saklamak
- `localStorage` verisini production veri kaynagi gibi kullanmak

## Backend hazirligi

Gercek urunde backend tarafinda en az su kurallar uygulanmalidir:

- Cihaz anahtari duz metin degil guvenli hash olarak tutulmali.
- IPTV sifreleri veritabaninda sifreli saklanmali.
- Odeme saglayici webhooklari lisans uretimini tetiklemeli.
- Reseller kontor hareketleri ayri transaction tablosunda saklanmali.
- Admin islemleri audit log tablosuna yazilmali.
- Admin/reseller girisleri frontend kodlariyla degil backend auth/session sistemiyle korunmali.

Gercek veritabani icin baslangic semasi `schema.sql` dosyasinda bulunur.

## Dosyalar

- `index.html`: Public site, download, pricing ve cihaz portali shell'i.
- `styles.css`: Nexora TV marka gorsellerine uygun arayuz stilleri.
- `app.js`: Public site etkileşimleri, download secimi, route ve placeholder CTA mantigi.
- `panel/`: Backend auth gelene kadar kilitli admin panel shell'i.
- `reseller/`: Backend auth gelene kadar kilitli reseller panel shell'i.
- `dl/`: Download bolumunde kullanilan APK/ZIP dosya alanlari.
- `schema.sql`: PostgreSQL icin lisans ve aktivasyon veritabani semasi.
- `assets/`: Nexora TV marka gorselleri.
- `docs/START_HERE.md`: Yeni turda ilk okunacak proje giris dosyasi.
- `docs/HANDOFF.md`: Devam/devretme dosyasi.
- `docs/UI_THEME_GUARD.md`: Tema butunlugunu koruma kurallari.
- `docs/BACKLOG.md`: Milestone ve is takip listesi.

## Aktif milestone

`Milestone 1 — Demo Mode Removal & Production Website Shell`

Amac: Mevcut statik demo/prototip yapisini normal yayinlanabilir site iskeletine cevirmek.
