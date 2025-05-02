# Besin Tanıma ve Analiz Uygulaması

Fotoğraf yükleyerek besinleri tanıyan ve besin değerlerini gösteren bir web uygulaması.

## Özellikler

- Fotoğraftan besin tanıma
- Detaylı besin değerleri gösterimi (kalori, protein, yağ, karbonhidrat, lif, vb.)
- Besin sağlık puanlaması
- Beslenme önerileri
- Kullanıcı kaydı ve girişi
- Beslenme geçmişi takibi

## Teknolojiler

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **TensorFlow.js**: Görüntü tanıma için MobileNet modeli
- **Kimlik Doğrulama**: Firebase Authentication
- **Veritabanı**: Firebase Firestore
- **Depolama**: Firebase Storage

## Kurulum

### Gereksinimleri

- Node.js 18.0.0 veya üzeri
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
```bash
git clone https://github.com/username/besin-tanima-uygulamasi.git
cd besin-tanima-uygulamasi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn
```

3. Firebase projenizi oluşturun ve `app/firebase/config.ts` dosyasındaki Firebase yapılandırmasını kendi yapılandırmanızla güncelleyin.

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanım

1. Ana sayfada "Hemen Deneyin" butonuna tıklayın veya menüden "Besin Analizi" sayfasına gidin.
2. Besin fotoğrafını yüklemek için tıklayın veya sürükleyin.
3. Uygulama fotoğrafı işleyecek ve besin bilgilerini gösterecektir.
4. Hesap oluşturarak besin geçmişinizi kaydedebilirsiniz.

## İşleyiş

1. **Besin Tanıma**: TensorFlow.js MobileNet modeli kullanılarak fotoğraftaki besin tanınır.
2. **Besin Veritabanı**: Tanımlanan besin, veritabanında eşleştirilir ve detaylı besin bilgileri çekilir.
3. **Besin Değerleri**: Kalori, protein, yağ, karbonhidrat ve diğer besin değerleri gösterilir.
4. **Sağlık Puanı**: Besinin genel sağlık değeri 1-10 arasında puanlanır.

## Katkıda Bulunma

1. Repoyu fork edin
2. Özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Dalınıza push edin (`git push origin yeni-ozellik`)
5. Pull request oluşturun

## Lisans

MIT

## İletişim

E-posta: ornek@email.com 