const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Besin veritabanı
const foodDatabase = {
    // Kahvaltı Ürünleri
    'yumurta': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    'peynir': { calories: 98, protein: 7, carbs: 0.4, fat: 7.8 },
    'zeytin': { calories: 115, protein: 0.8, carbs: 6, fat: 11 },
    'bal': { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
    'tahin': { calories: 595, protein: 17, carbs: 21, fat: 50 },
    'pekmez': { calories: 290, protein: 0.4, carbs: 75, fat: 0.1 },
    'simit': { calories: 275, protein: 8, carbs: 50, fat: 2 },
    'börek': { calories: 350, protein: 8, carbs: 45, fat: 15 },
    'menemen': { calories: 180, protein: 12, carbs: 8, fat: 12 },
    'omlet': { calories: 200, protein: 14, carbs: 2, fat: 15 },
    'pogaca': { calories: 300, protein: 6, carbs: 40, fat: 12 },
    'poğaça': { calories: 320, protein: 7, carbs: 42, fat: 14 },
    'reçel': { calories: 260, protein: 0.3, carbs: 65, fat: 0.1 },
    'mısır gevreği': { calories: 350, protein: 8, carbs: 75, fat: 2 },
    'müsli': { calories: 340, protein: 10, carbs: 60, fat: 5 },

    // Süt ve Süt Ürünleri
    'süt': { calories: 60, protein: 3.2, carbs: 4.7, fat: 3.6 },
    'yoğurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    'kefir': { calories: 60, protein: 3.3, carbs: 4.7, fat: 3.2 },
    'ayran': { calories: 35, protein: 1.7, carbs: 2.5, fat: 1.8 },
    'lor peyniri': { calories: 80, protein: 12, carbs: 2, fat: 2.5 },
    'kaşar peyniri': { calories: 350, protein: 25, carbs: 1.5, fat: 28 },
    'beyaz peynir': { calories: 250, protein: 20, carbs: 1.5, fat: 18 },
    'tulum peyniri': { calories: 300, protein: 22, carbs: 1, fat: 24 },
    'labne': { calories: 200, protein: 15, carbs: 2, fat: 15 },
    'krem peynir': { calories: 350, protein: 6, carbs: 3, fat: 35 },
    'mozzarella': { calories: 280, protein: 22, carbs: 2, fat: 20 },
    'dil peyniri': { calories: 220, protein: 18, carbs: 1, fat: 16 },
    'çökelek': { calories: 150, protein: 20, carbs: 1, fat: 8 },

    // Et ve Et Ürünleri
    'tavuk göğsü': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    'tavuk but': { calories: 209, protein: 28, carbs: 0, fat: 10 },
    'kırmızı et': { calories: 250, protein: 26, carbs: 0, fat: 17 },
    'balık': { calories: 208, protein: 22, carbs: 0, fat: 13 },
    'köfte': { calories: 280, protein: 20, carbs: 5, fat: 20 },
    'sucuk': { calories: 452, protein: 24, carbs: 1.5, fat: 38 },
    'salam': { calories: 300, protein: 15, carbs: 1, fat: 25 },
    'pastırma': { calories: 350, protein: 30, carbs: 1, fat: 25 },
    'sosis': { calories: 290, protein: 12, carbs: 2, fat: 25 },
    'karides': { calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
    'midye': { calories: 86, protein: 12, carbs: 3.7, fat: 2.2 },
    'kalamar': { calories: 92, protein: 16, carbs: 0.2, fat: 1.4 },
    'tavuk kanadı': { calories: 290, protein: 27, carbs: 0, fat: 19 },
    'tavuk ciğeri': { calories: 116, protein: 17, carbs: 0, fat: 4.8 },

    // Sebzeler
    'domates': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    'salatalık': { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
    'marul': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
    'ıspanak': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    'brokoli': { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    'karnabahar': { calories: 25, protein: 2, carbs: 5, fat: 0.3 },
    'patlıcan': { calories: 25, protein: 1, carbs: 6, fat: 0.2 },
    'kabak': { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.2 },
    'biber': { calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2 },
    'havuç': { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
    'patates': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
    'soğan': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
    'sarımsak': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5 },
    'pırasa': { calories: 61, protein: 1.5, carbs: 14, fat: 0.3 },
    'semizotu': { calories: 16, protein: 1.3, carbs: 2.4, fat: 0.2 },

    // Meyveler
    'elma': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    'muz': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    'portakal': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
    'mandalina': { calories: 53, protein: 0.8, carbs: 13, fat: 0.3 },
    'üzüm': { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
    'karpuz': { calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2 },
    'kavun': { calories: 34, protein: 0.8, carbs: 8.2, fat: 0.2 },
    'çilek': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
    'kiraz': { calories: 50, protein: 1, carbs: 12, fat: 0.3 },
    'şeftali': { calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3 },
    'armut': { calories: 57, protein: 0.4, carbs: 15, fat: 0.1 },
    'ananas': { calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },
    'nar': { calories: 83, protein: 1.7, carbs: 19, fat: 1.2 },
    'incir': { calories: 74, protein: 0.8, carbs: 19, fat: 0.3 },
    'kayısı': { calories: 48, protein: 0.9, carbs: 12, fat: 0.4 },

    // Tahıllar ve Baklagiller
    'pirinç': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    'bulgur': { calories: 83, protein: 3.1, carbs: 18, fat: 0.2 },
    'makarna': { calories: 131, protein: 5, carbs: 25, fat: 1.1 },
    'ekmek': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
    'mercimek': { calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    'nohut': { calories: 164, protein: 9, carbs: 27, fat: 2.6 },
    'fasulye': { calories: 127, protein: 8, carbs: 22, fat: 0.5 },
    'bezelye': { calories: 81, protein: 5, carbs: 14, fat: 0.4 },
    'mısır': { calories: 86, protein: 3.2, carbs: 19, fat: 1.2 },
    'yulaf': { calories: 389, protein: 17, carbs: 66, fat: 7 },
    'kinoa': { calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
    'arpa': { calories: 354, protein: 12, carbs: 73, fat: 2.3 },
    'buğday': { calories: 340, protein: 13, carbs: 72, fat: 2.5 },
    'çavdar': { calories: 338, protein: 10, carbs: 76, fat: 1.6 },
    'kuskus': { calories: 112, protein: 3.8, carbs: 23, fat: 0.2 },

    // Kuruyemişler
    'ceviz': { calories: 654, protein: 15, carbs: 14, fat: 65 },
    'badem': { calories: 579, protein: 21, carbs: 22, fat: 50 },
    'fındık': { calories: 628, protein: 15, carbs: 17, fat: 61 },
    'antep fıstığı': { calories: 562, protein: 20, carbs: 28, fat: 45 },
    'kaju': { calories: 553, protein: 18, carbs: 30, fat: 44 },
    'kabak çekirdeği': { calories: 559, protein: 30, carbs: 11, fat: 49 },
    'ay çekirdeği': { calories: 584, protein: 21, carbs: 20, fat: 51 },
    'leblebi': { calories: 360, protein: 20, carbs: 60, fat: 2 },
    'kuru üzüm': { calories: 299, protein: 3.1, carbs: 79, fat: 0.5 },
    'kuru kayısı': { calories: 241, protein: 3.4, carbs: 63, fat: 0.5 },
    'kuru incir': { calories: 249, protein: 3.3, carbs: 63, fat: 0.9 },
    'kuru erik': { calories: 240, protein: 2.2, carbs: 63, fat: 0.4 },
    'hurma': { calories: 282, protein: 2.5, carbs: 75, fat: 0.4 },
    'kuru dut': { calories: 320, protein: 3.5, carbs: 80, fat: 0.4 },

    // İçecekler
    'su': { calories: 0, protein: 0, carbs: 0, fat: 0 },
    'çay': { calories: 2, protein: 0, carbs: 0.5, fat: 0 },
    'kahve': { calories: 2, protein: 0.3, carbs: 0, fat: 0 },
    'meyve suyu': { calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
    'soda': { calories: 0, protein: 0, carbs: 0, fat: 0 },
    'ayran': { calories: 35, protein: 1.7, carbs: 2.5, fat: 1.8 },
    'kefir': { calories: 60, protein: 3.3, carbs: 4.7, fat: 3.2 },
    'limonata': { calories: 40, protein: 0.1, carbs: 10, fat: 0 },
    'boza': { calories: 200, protein: 1.5, carbs: 45, fat: 0.5 },
    'sahlep': { calories: 150, protein: 2, carbs: 30, fat: 2 },
    'smoothie': { calories: 120, protein: 2, carbs: 25, fat: 1 },
    'maden suyu': { calories: 0, protein: 0, carbs: 0, fat: 0 },
    'bitki çayı': { calories: 2, protein: 0, carbs: 0.5, fat: 0 },
    'taze sıkılmış meyve suyu': { calories: 50, protein: 0.7, carbs: 12, fat: 0.2 },

    // Tatlılar
    'baklava': { calories: 334, protein: 4, carbs: 45, fat: 16 },
    'künefe': { calories: 350, protein: 5, carbs: 40, fat: 18 },
    'sütlaç': { calories: 200, protein: 5, carbs: 35, fat: 4 },
    'dondurma': { calories: 207, protein: 3.5, carbs: 24, fat: 11 },
    'puding': { calories: 150, protein: 3, carbs: 30, fat: 2 },
    'kek': { calories: 350, protein: 5, carbs: 45, fat: 15 },
    'kurabiye': { calories: 400, protein: 5, carbs: 50, fat: 20 },
    'helva': { calories: 500, protein: 8, carbs: 60, fat: 25 },
    'lokum': { calories: 300, protein: 0.5, carbs: 80, fat: 0.1 },
    'revani': { calories: 320, protein: 4, carbs: 55, fat: 10 },
    'irmik helvası': { calories: 400, protein: 5, carbs: 45, fat: 22 },
    'kadayıf': { calories: 380, protein: 4, carbs: 50, fat: 18 },
    'tulumba': { calories: 350, protein: 3, carbs: 45, fat: 15 },
    'profiterol': { calories: 300, protein: 4, carbs: 35, fat: 16 }
};

// Makaleler veritabanı
const articlesDatabase = {
    1: {
        id: 1,
        title: 'Sağlıklı Beslenme İpuçları',
        content: `Sağlıklı beslenme, vücudun ihtiyaç duyduğu tüm besin öğelerini dengeli bir şekilde almayı sağlar. İşte sağlıklı beslenme için önemli ipuçları:

1. Dengeli Beslenme
- Her öğünde protein, karbonhidrat ve yağ dengesini koruyun
- Günlük beslenmenizde tüm besin gruplarına yer verin
- Porsiyon kontrolü yapın

2. Su Tüketimi
- Günde en az 2-3 litre su için
- Su tüketimini gün içine yayın
- Çay ve kahve tüketimini sınırlayın

3. Öğün Düzeni
- Kahvaltıyı atlamayın
- Düzenli öğün saatleri belirleyin
- Ara öğünleri ihmal etmeyin

4. Besin Seçimi
- İşlenmiş gıdalardan kaçının
- Taze meyve ve sebze tüketin
- Tam tahıllı ürünleri tercih edin`,
        author: 'Dr. Ayşe Yılmaz',
        date: '2024-03-15',
        category: 'Beslenme',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    2: {
        id: 2,
        title: 'Egzersiz ve Sağlık',
        content: `Düzenli egzersiz yapmak, sağlıklı bir yaşam için vazgeçilmezdir. İşte egzersizin sağlığınıza olan etkileri:

1. Fiziksel Faydaları
- Kalp sağlığını korur
- Kas gücünü artırır
- Esnekliği geliştirir
- Kilo kontrolü sağlar

2. Mental Faydaları
- Stresi azaltır
- Uyku kalitesini artırır
- Özgüveni yükseltir
- Zihinsel berraklık sağlar

3. Egzersiz Önerileri
- Haftada en az 150 dakika orta şiddette egzersiz
- Güç antrenmanları
- Esneme hareketleri
- Yürüyüş ve koşu`,
        author: 'Prof. Dr. Mehmet Kaya',
        date: '2024-03-10',
        category: 'Egzersiz',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    3: {
        id: 3,
        title: 'Stres Yönetimi ve Meditasyon',
        content: `Modern yaşamın getirdiği stresle başa çıkmak için etkili yöntemler:

1. Meditasyon Teknikleri
- Nefes egzersizleri
- Farkındalık meditasyonu
- Beden taraması
- Mantra meditasyonu

2. Stres Azaltma Yöntemleri
- Düzenli egzersiz
- Sağlıklı beslenme
- Yeterli uyku
- Sosyal destek

3. Günlük Rutinler
- Sabah rutini oluşturun
- Günlük plan yapın
- Molalar verin
- Hobiler edinin`,
        author: 'Uzm. Psk. Zeynep Demir',
        date: '2024-03-05',
        category: 'Mental Sağlık',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    4: {
        id: 4,
        title: 'Sağlıklı Uyku Düzeni',
        content: `Kaliteli uyku, sağlıklı bir yaşamın temelidir. İşte sağlıklı uyku için öneriler:

1. Uyku Ortamı
- Karanlık ve sessiz bir oda
- Uygun sıcaklık
- Rahat yatak
- Temiz hava

2. Uyku Rutini
- Düzenli uyku saatleri
- Yatmadan önce rahatlama
- Elektronik cihazlardan uzaklaşma
- Hafif egzersizler

3. Uyku Hijyeni
- Kafeinden kaçınma
- Ağır yemeklerden uzak durma
- Gün içi şekerleme süresini sınırlama
- Yatakta kitap okuma`,
        author: 'Dr. Ali Yıldız',
        date: '2024-03-01',
        category: 'Uyku',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    5: {
        id: 5,
        title: 'Vitamin ve Mineral Takviyeleri',
        content: `Vitamin ve mineral takviyeleri hakkında bilmeniz gerekenler:

1. Temel Vitaminler
- A Vitamini: Göz sağlığı ve bağışıklık
- B Vitamini: Enerji üretimi ve sinir sistemi
- C Vitamini: Bağışıklık ve kolajen üretimi
- D Vitamini: Kemik sağlığı ve bağışıklık

2. Önemli Mineraller
- Kalsiyum: Kemik ve diş sağlığı
- Demir: Kan üretimi ve oksijen taşınması
- Magnezyum: Kas ve sinir fonksiyonları
- Çinko: Bağışıklık ve yara iyileşmesi

3. Takviye Kullanımı
- Doktor kontrolünde kullanın
- Günlük ihtiyacınızı belirleyin
- Doğal besin kaynaklarını tercih edin
- Aşırı kullanımdan kaçının`,
        author: 'Dr. Fatma Şahin',
        date: '2024-02-25',
        category: 'Beslenme',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
};

// Veritabanı benzeri basit bir yapı
let foodEntries = [];
let userProfile = {
    name: "Kullanıcı Adı",
    email: "kullanici@example.com",
    age: 30,
    height: 170,
    weight: 70,
    goalWeight: 65,
    dailyCalories: 2000,
    activityLevel: "moderate",
    preferences: {
        vegetarian: false,
        vegan: false,
        glutenFree: false
    }
};

// Besin analizi fonksiyonu
function analyzeFood(foodName, quantity) {
    const food = foodDatabase[foodName.toLowerCase()];
    if (!food) return null;

    const scale = quantity / 100;
    return {
        calories: Math.round(food.calories * scale),
        protein: Number((food.protein * scale).toFixed(1)),
        carbs: Number((food.carbs * scale).toFixed(1)),
        fat: Number((food.fat * scale).toFixed(1))
    };
}

// Grup bazlı besin değerleri hesaplama fonksiyonları
function calculateGroupNutrition(foodEntries, group) {
    const groupFoods = foodEntries.filter(entry => {
        const food = foodDatabase[entry.foodName.toLowerCase()];
        return food && getFoodGroup(entry.foodName) === group;
    });

    return groupFoods.reduce((acc, entry) => {
        const analysis = entry.analysis;
        acc.calories += analysis.calories;
        acc.protein += analysis.protein;
        acc.carbs += analysis.carbs;
        acc.fat += analysis.fat;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

function getFoodGroup(foodName) {
    const food = foodDatabase[foodName.toLowerCase()];
    if (!food) return 'Diğer';

    // Kahvaltı ürünleri
    if (['yumurta', 'peynir', 'zeytin', 'bal', 'tahin', 'pekmez', 'simit', 'börek', 'menemen', 'omlet', 'pogaca', 'poğaça', 'reçel', 'mısır gevreği', 'müsli'].includes(foodName.toLowerCase())) {
        return 'Kahvaltı';
    }
    // Süt ve süt ürünleri
    if (['süt', 'yoğurt', 'kefir', 'ayran', 'lor peyniri', 'kaşar peyniri', 'beyaz peynir', 'tulum peyniri', 'labne', 'krem peynir', 'mozzarella', 'dil peyniri', 'çökelek'].includes(foodName.toLowerCase())) {
        return 'Süt ve Süt Ürünleri';
    }
    // Et ve et ürünleri
    if (['tavuk göğsü', 'tavuk but', 'kırmızı et', 'balık', 'köfte', 'sucuk', 'salam', 'pastırma', 'sosis', 'karides', 'midye', 'kalamar', 'tavuk kanadı', 'tavuk ciğeri'].includes(foodName.toLowerCase())) {
        return 'Et ve Et Ürünleri';
    }
    // Sebzeler
    if (['domates', 'salatalık', 'marul', 'ıspanak', 'brokoli', 'karnabahar', 'patlıcan', 'kabak', 'biber', 'havuç', 'patates', 'soğan', 'sarımsak', 'pırasa', 'semizotu'].includes(foodName.toLowerCase())) {
        return 'Sebzeler';
    }
    // Meyveler
    if (['elma', 'muz', 'portakal', 'mandalina', 'üzüm', 'karpuz', 'kavun', 'çilek', 'kiraz', 'şeftali', 'armut', 'ananas', 'nar', 'incir', 'kayısı'].includes(foodName.toLowerCase())) {
        return 'Meyveler';
    }
    // Tahıllar ve baklagiller
    if (['pirinç', 'bulgur', 'makarna', 'ekmek', 'mercimek', 'nohut', 'fasulye', 'bezelye', 'mısır', 'yulaf', 'kinoa', 'arpa', 'buğday', 'çavdar', 'kuskus'].includes(foodName.toLowerCase())) {
        return 'Tahıllar ve Baklagiller';
    }
    // Kuruyemişler
    if (['ceviz', 'badem', 'fındık', 'antep fıstığı', 'kaju', 'kabak çekirdeği', 'ay çekirdeği', 'leblebi', 'kuru üzüm', 'kuru kayısı', 'kuru incir', 'kuru erik', 'hurma', 'kuru dut'].includes(foodName.toLowerCase())) {
        return 'Kuruyemişler';
    }
    // İçecekler
    if (['su', 'çay', 'kahve', 'meyve suyu', 'soda', 'ayran', 'kefir', 'limonata', 'boza', 'sahlep', 'smoothie', 'maden suyu', 'bitki çayı', 'taze sıkılmış meyve suyu'].includes(foodName.toLowerCase())) {
        return 'İçecekler';
    }
    // Tatlılar
    if (['baklava', 'künefe', 'sütlaç', 'dondurma', 'puding', 'kek', 'kurabiye', 'helva', 'lokum', 'revani', 'irmik helvası', 'kadayıf', 'tulumba', 'profiterol'].includes(foodName.toLowerCase())) {
        return 'Tatlılar';
    }

    return 'Diğer';
}

// Analiz fonksiyonlarını güncelle
function getDailyAnalysis(foodEntries, timeRange = 'daily') {
    const now = new Date();
    let startDate;

    switch (timeRange) {
        case 'daily':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'weekly':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            break;
        case 'monthly':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        default:
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Belirtilen zaman aralığındaki besinleri filtrele
    const filteredEntries = foodEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= now;
    });

    const summary = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    };

    const mealAnalysis = {
        'Kahvaltı': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Öğle Yemeği': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Akşam Yemeği': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Ara Öğün': { calories: 0, protein: 0, carbs: 0, fat: 0 }
    };

    const groupAnalysis = {
        'Kahvaltı': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Süt ve Süt Ürünleri': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Et ve Et Ürünleri': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Sebzeler': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Meyveler': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Tahıllar ve Baklagiller': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Kuruyemişler': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'İçecekler': { calories: 0, protein: 0, carbs: 0, fat: 0 },
        'Tatlılar': { calories: 0, protein: 0, carbs: 0, fat: 0 }
    };

    filteredEntries.forEach(entry => {
        const analysis = entry.analysis;
        const group = getFoodGroup(entry.foodName);
        
        // Genel özet
        summary.calories += analysis.calories;
        summary.protein += analysis.protein;
        summary.carbs += analysis.carbs;
        summary.fat += analysis.fat;

        // Öğün bazlı analiz
        const meal = entry.mealTime;
        mealAnalysis[meal].calories += analysis.calories;
        mealAnalysis[meal].protein += analysis.protein;
        mealAnalysis[meal].carbs += analysis.carbs;
        mealAnalysis[meal].fat += analysis.fat;

        // Grup bazlı analiz
        if (groupAnalysis[group]) {
            groupAnalysis[group].calories += analysis.calories;
            groupAnalysis[group].protein += analysis.protein;
            groupAnalysis[group].carbs += analysis.carbs;
            groupAnalysis[group].fat += analysis.fat;
        }
    });

    return {
        summary,
        mealAnalysis,
        groupAnalysis,
        foodEntries: filteredEntries
    };
}

// Kullanıcı veritabanı (geçici olarak bellekte tutulacak)
const users = [];

// Kullanıcı kimlik doğrulama middleware'i
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Yetkilendirme gerekli' });
    }

    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(403).json({ error: 'Geçersiz token' });
    }

    req.user = user;
    next();
};

// Kullanıcı kayıt endpoint'i
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, height, weight, age, gender } = req.body;

    // E-posta kontrolü
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda' });
    }

    // Yeni kullanıcı oluştur
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // Gerçek uygulamada şifre hash'lenmelidir
        height,
        weight,
        age,
        gender,
        targetWeight: weight,
        calorieGoal: 2000, // Varsayılan değer
        token: Math.random().toString(36).substring(2) // Basit token oluşturma
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Kullanıcı giriş endpoint'i
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Geçersiz e-posta veya şifre' });
    }

    res.json(user);
});

// Profil bilgilerini güncelleme endpoint'i
app.put('/api/auth/profile', authenticateToken, (req, res) => {
    const { name, height, weight, age, targetWeight, calorieGoal } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Kullanıcı bilgilerini güncelle
    users[userIndex] = {
        ...users[userIndex],
        name,
        height,
        weight,
        age,
        targetWeight,
        calorieGoal
    };

    res.json(users[userIndex]);
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Besin kaydetme endpoint'i
app.post('/api/food', (req, res) => {
    const { foodName, quantity, mealTime } = req.body;
    
    const analysis = analyzeFood(foodName, quantity);
    if (!analysis) {
        return res.status(400).json({ error: 'Besin bulunamadı' });
    }

    const foodEntry = {
        foodName,
        quantity,
        mealTime,
        date: new Date(),
        analysis
    };

    foodEntries.push(foodEntry);
    res.json(foodEntry);
});

// Besin listesi endpoint'i
app.get('/api/food', (req, res) => {
    res.json(foodEntries);
});

// Profil güncelleme endpoint'i
app.put('/api/profile', (req, res) => {
    userProfile = { ...userProfile, ...req.body };
    res.json({ success: true, profile: userProfile });
});

// Profil bilgilerini getirme endpoint'i
app.get('/api/profile', (req, res) => {
    res.json(userProfile);
});

// Analiz endpoint'ini güncelle
app.get('/api/analysis', (req, res) => {
    const timeRange = req.query.timeRange || 'daily';
    const analysis = getDailyAnalysis(foodEntries, timeRange);
    res.json(analysis);
});

// Besin arama endpoint'i
app.get('/api/food/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = Object.entries(foodDatabase)
        .filter(([name]) => name.includes(query))
        .map(([name, data]) => ({ name, ...data }));
    res.json(results);
});

// Makaleler için API endpoint'leri
app.get('/api/articles', (req, res) => {
    res.json(Object.values(articlesDatabase));
});

app.get('/api/articles/:id', (req, res) => {
    const article = articlesDatabase[req.params.id];
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ error: 'Makale bulunamadı' });
    }
});

app.get('/api/articles/category/:category', (req, res) => {
    const categoryArticles = Object.values(articlesDatabase)
        .filter(a => a.category.toLowerCase() === req.params.category.toLowerCase());
    res.json(categoryArticles);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 