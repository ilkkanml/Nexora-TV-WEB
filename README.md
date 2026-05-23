# Nexora TV Web Paneli

Bu klasor Nexora TV icin hazirlanmis calisan bir web prototipidir. Ana site, hesapsiz download, cihazla giris yapan kullanici profili, lisans aktivasyonu ve IPTV hesap bilgisi gonderimi icin calisir. Admin ve reseller yonetimleri ayri adreslerdedir.

## Acma

`index.html` dosyasini tarayicida acmak yeterli. Harici paket, build adimi veya internet baglantisi gerektirmez.

## Demo akislari

- Demo cihaz girisi: `NXTV-8F42-A9C1` / `4219-77AB`
- Admin panel adresi: `/panel`
- Reseller panel adresi: `/reseller`
- Demo admin kodu: `ADMIN-2026`
- Demo reseller kodu: `ATLAS25`
- Profil panelinde lisans olusturulunca cihaz aktif hale gelir.
- Satin alma kutusu, aktif lisans olustuktan sonra kullanici profilinden kaybolur.
- Download bolumu hesap istemeden Android TV, Fire TV ve Android Mobile dosya secimi yapar.
- IPTV kaynak formu aktif lisans isteyen bir senkron akisi gibi calisir.
- Admin panelindeki tablolar cihaz, lisans, IPTV kaynak ve reseller verilerini yonetir.
- Reseller panelinde bayi yalnizca kendi musterilerini, lisanslarini ve IPTV kaynaklarini gorur.

## Veri

Bu prototipte veriler tarayicinin yerel hafizasinda tutulur. Gercek urunde backend tarafinda en az su kurallar uygulanmali:

- Cihaz anahtari duz metin degil hash olarak tutulmali.
- IPTV sifreleri veritabaninda sifreli saklanmali.
- Odeme saglayici webhooklari lisans uretimini tetiklemeli.
- Reseller kontor hareketleri ayri transaction tablosunda saklanmali.
- Admin islemleri audit log tablosuna yazilmali.

Gercek veritabani icin baslangic semasi `schema.sql` dosyasinda bulunur.

## Dosyalar

- `index.html`: Sayfa yapisi ve panel ekranlari.
- `styles.css`: Nexora TV marka gorsellerine uygun arayuz stilleri.
- `app.js`: Demo lisans, cihaz, IPTV kaynak, reseller ve admin mantigi.
- `panel/`: Ana sitede gorunmeyen `/panel` admin yonetim sayfasi.
- `reseller/`: Bayiler icin `/reseller` panel sayfasi.
- `dl/`: Download bolumunde kullanilan APK yer tutuculari ve ZIP paketleri.
- `schema.sql`: PostgreSQL icin lisans ve aktivasyon veritabani semasi.
- `assets/`: Kullanici tarafindan saglanan Nexora TV marka gorselleri.
