import Link from 'next/link';

interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface AthleteFood {
  id: number;
  name: string;
  category: string;
  nutrition: NutritionInfo;
  description: string;
}

interface FoodsByCategory {
  [category: string]: AthleteFood[];
}

export default function AthleteFoodsPage() {
  // Database of athlete foods with nutritional values (now with 50 items)
  const athleteFoods: AthleteFood[] = [
    {
      id: 1,
      name: "Tavuk göğsü",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "165 kcal",
        protein: "31g",
        carbs: "0g",
        fat: "3.6g",
      },
      description: "Düşük yağlı yüksek protein içeriğiyle sporcu beslenmesinin temel taşlarından."
    },
    {
      id: 2,
      name: "Hindi eti",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "145 kcal",
        protein: "29g",
        carbs: "0g",
        fat: "2g",
      },
      description: "Tavuktan daha düşük yağ oranı ile kas geliştirme döneminde ideal protein kaynağı."
    },
    {
      id: 3,
      name: "Yağsız kırmızı et",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "180 kcal",
        protein: "26g",
        carbs: "0g",
        fat: "8g",
      },
      description: "Demir ve B vitaminleri açısından zengin, kas gelişimini destekleyen protein kaynağı."
    },
    {
      id: 4,
      name: "Somon",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "208 kcal",
        protein: "20g",
        carbs: "0g",
        fat: "13g",
      },
      description: "Omega-3 yağ asitleri açısından zengin, kas onarımı ve inflamasyonu azaltan protein kaynağı."
    },
    {
      id: 5,
      name: "Ton balığı",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "132 kcal",
        protein: "29g",
        carbs: "0g",
        fat: "1g",
      },
      description: "Düşük yağlı, yüksek proteinli deniz ürünü. D vitamini ve omega-3 içerir."
    },
    {
      id: 6,
      name: "Alabalık",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "190 kcal",
        protein: "20g",
        carbs: "0g",
        fat: "12g",
      },
      description: "Omega-3 açısından zengin, kas gelişimini ve yağ yakımını destekleyen balık türü."
    },
    {
      id: 7,
      name: "Levrek",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "97 kcal",
        protein: "19g",
        carbs: "0g",
        fat: "2g",
      },
      description: "Hafif ve sindirilmesi kolay beyaz etli balık. Düşük yağlı protein kaynağı."
    },
    {
      id: 8,
      name: "Karides",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "99 kcal",
        protein: "24g",
        carbs: "0g",
        fat: "1g",
      },
      description: "Yüksek protein, düşük yağ içeriğiyle sporcular için mükemmel bir tercih."
    },
    {
      id: 9,
      name: "Yumurta (özellikle beyazı)",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "155 kcal",
        protein: "13g",
        carbs: "1g",
        fat: "11g",
      },
      description: "Tam protein değerine sahip, kas yapımı için ideal amino asit profili sağlayan besin."
    },
    {
      id: 10,
      name: "Lor peyniri",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "98 kcal",
        protein: "11g",
        carbs: "3g",
        fat: "4g",
      },
      description: "Düşük yağlı, yüksek protein içerikli süt ürünü. Kas gelişimini destekler."
    },
    {
      id: 11,
      name: "Süzme peynir (cottage cheese)",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "98 kcal",
        protein: "11g",
        carbs: "3g",
        fat: "4g",
      },
      description: "Yüksek protein içeriği ve düşük kalorisiyle gece öğünleri için ideal süt ürünü."
    },
    {
      id: 12,
      name: "Yoğurt (proteinli veya sade)",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "130 kcal",
        protein: "10g",
        carbs: "9g",
        fat: "5g",
      },
      description: "Probiyotik içeriği sayesinde sindirim sağlığını destekleyen protein kaynağı."
    },
    {
      id: 13,
      name: "Kefir",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "110 kcal",
        protein: "8g",
        carbs: "12g",
        fat: "2g",
      },
      description: "Probiyotikler açısından zengin, bağışıklık sistemini güçlendiren fermente içecek."
    },
    {
      id: 14,
      name: "Bakla",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "110 kcal",
        protein: "8g",
        carbs: "19g",
        fat: "0.4g",
      },
      description: "Bitkisel protein ve lif bakımından zengin, kas gelişimini destekleyen baklagil."
    },
    {
      id: 15,
      name: "Nohut",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "269 kcal",
        protein: "14g",
        carbs: "45g",
        fat: "4g",
      },
      description: "Bitkisel protein ve kompleks karbonhidrat kaynağı. Demir ve B vitaminleri içerir."
    },
    {
      id: 16,
      name: "Mercimek",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "230 kcal",
        protein: "18g",
        carbs: "40g",
        fat: "0.4g",
      },
      description: "Yüksek protein ve lif içeren, demir açısından zengin baklagil."
    },
    {
      id: 17,
      name: "Kuru fasulye",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "245 kcal",
        protein: "15g",
        carbs: "44g",
        fat: "0.8g",
      },
      description: "Protein, lif ve kompleks karbonhidrat içeren, uzun süreli enerji sağlayan baklagil."
    },
    {
      id: 18,
      name: "Bezelye",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "81 kcal",
        protein: "5g",
        carbs: "14g",
        fat: "0.4g",
      },
      description: "A ve C vitamini açısından zengin, bitkisel protein içeren sebze."
    },
    {
      id: 19,
      name: "Soya fasulyesi",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "446 kcal",
        protein: "36g",
        carbs: "30g",
        fat: "20g",
      },
      description: "Bitkisel bazlı beslenme için en yüksek protein değerine sahip baklagil."
    },
    {
      id: 20,
      name: "Tofu",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "76 kcal",
        protein: "8g",
        carbs: "2g",
        fat: "4g",
      },
      description: "Soya fasulyesinden yapılan, vejetaryen sporcular için ideal protein kaynağı."
    },
    {
      id: 21,
      name: "Esmer pirinç",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "124 kcal",
        protein: "3g",
        carbs: "26g",
        fat: "0.8g",
      },
      description: "B vitaminleri ve lif açısından zengin, uzun süreli enerji sağlayan kompleks karbonhidrat."
    },
    {
      id: 22,
      name: "Bulgur",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "112 kcal",
        protein: "4g",
        carbs: "25g",
        fat: "0.2g",
      },
      description: "Yüksek lif içeriği ve düşük glisemik indeksi ile sporcular için ideal karbonhidrat."
    },
    {
      id: 23,
      name: "Yulaf ezmesi",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "389 kcal",
        protein: "16g",
        carbs: "66g",
        fat: "7g",
      },
      description: "Beta-glukan içeriği sayesinde bağışıklık güçlendirici, yüksek lifli karbonhidrat."
    },
    {
      id: 24,
      name: "Tam buğday ekmeği",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "74 kcal",
        protein: "4g",
        carbs: "14g",
        fat: "1g",
      },
      description: "Beyaz ekmeğe göre daha yüksek lif ve protein içeren kompleks karbonhidrat."
    },
    {
      id: 25,
      name: "Çavdar ekmeği",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "83 kcal",
        protein: "3g",
        carbs: "15g",
        fat: "1g",
      },
      description: "Düşük glisemik indeksi ve yüksek lif içeriğiyle kan şekerini dengeleyen ekmek."
    },
    {
      id: 26,
      name: "Kinoa",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "120 kcal",
        protein: "4.4g",
        carbs: "21.3g",
        fat: "1.9g",
      },
      description: "Protein değeri yüksek, glütensiz tam tahıl. Kompleks karbonhidrat ve amino asit profili açısından zengin."
    },
    {
      id: 27,
      name: "Siyah Pirinç",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "130 kcal",
        protein: "3.5g",
        carbs: "28g",
        fat: "0.5g",
      },
      description: "Antioksidan içeriği yüksek, kompleks karbonhidrat kaynağı. Lif oranı beyaz pirince göre daha yüksek."
    },
    {
      id: 28,
      name: "Tam Tahıllı Makarna",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "150 kcal",
        protein: "6.5g",
        carbs: "31g",
        fat: "1g",
      },
      description: "Normal makarnaya göre daha fazla lif içerir, kan şekerini daha yavaş yükseltir. Uzun süreli enerji sağlar."
    },
    {
      id: 29,
      name: "Tatlı Patates",
      category: "Kompleks Karbonhidratlar",
      nutrition: {
        calories: "86 kcal",
        protein: "1.6g",
        carbs: "20g",
        fat: "0.1g",
      },
      description: "A vitamini açısından zengin, glisemik indeksi normal patatese göre daha düşük kompleks karbonhidrat."
    },
    {
      id: 30,
      name: "Muz",
      category: "Meyveler",
      nutrition: {
        calories: "89 kcal",
        protein: "1.1g",
        carbs: "22.8g",
        fat: "0.3g",
      },
      description: "Potasyum açısından zengin, kas kramplarını önlemeye yardımcı ve hızlı enerji kaynağı."
    },
    {
      id: 31,
      name: "Çilek",
      category: "Meyveler",
      nutrition: {
        calories: "32 kcal",
        protein: "0.7g",
        carbs: "7.7g",
        fat: "0.3g",
      },
      description: "C vitamini açısından zengin, antioksidan içeriği yüksek. Kas ve bağışıklık sistemini destekler."
    },
    {
      id: 32,
      name: "Nar",
      category: "Meyveler",
      nutrition: {
        calories: "83 kcal",
        protein: "1.7g",
        carbs: "18.7g",
        fat: "1.2g",
      },
      description: "Antioksidan içeriği yüksek, enflamasyonu azaltmaya yardımcı. Sporcu performansını olumlu etkiler."
    },
    {
      id: 33,
      name: "Böğürtlen",
      category: "Meyveler",
      nutrition: {
        calories: "43 kcal",
        protein: "1.4g",
        carbs: "9.6g",
        fat: "0.5g",
      },
      description: "Antioksidan ve C vitamini açısından zengin. Düşük kalorili, toparlanma sürecini destekleyen süper meyve."
    },
    {
      id: 34,
      name: "Zeytinyağı",
      category: "Sağlıklı Yağlar",
      nutrition: {
        calories: "884 kcal",
        protein: "0g",
        carbs: "0g",
        fat: "100g",
      },
      description: "Kalp sağlığını destekleyen tekli doymamış yağ açısından zengin. Antienflamatuar özelliklere sahip."
    },
    {
      id: 35,
      name: "Avokado",
      category: "Sağlıklı Yağlar",
      nutrition: {
        calories: "160 kcal",
        protein: "2g",
        carbs: "8.5g",
        fat: "14.7g",
      },
      description: "Sağlıklı yağ profili ve potasyum içeriği ile kas fonksiyonu ve toparlanmaya katkı sağlar."
    },
    {
      id: 36,
      name: "Ceviz",
      category: "Sağlıklı Yağlar",
      nutrition: {
        calories: "654 kcal",
        protein: "15g",
        carbs: "14g",
        fat: "65g",
      },
      description: "Omega-3 içeriği yüksek, enflamasyonu azaltmaya ve beyin sağlığını desteklemeye yardımcı."
    },
    {
      id: 37,
      name: "Keten Tohumu",
      category: "Sağlıklı Yağlar",
      nutrition: {
        calories: "534 kcal",
        protein: "18g",
        carbs: "29g",
        fat: "42g",
      },
      description: "Omega-3 yağ asitleri ve lif açısından zengin. Hormon dengesini destekleyen anti-inflamatuar etkiye sahip."
    },
    {
      id: 38,
      name: "Pancar",
      category: "Sebzeler",
      nutrition: {
        calories: "43 kcal",
        protein: "1.6g",
        carbs: "9.6g",
        fat: "0.2g",
      },
      description: "Doğal nitrat içeriği ile kan akışını ve oksijen taşınımını iyileştirerek dayanıklılık performansını artırır."
    },
    {
      id: 39,
      name: "Brokoli",
      category: "Sebzeler",
      nutrition: {
        calories: "34 kcal",
        protein: "2.8g",
        carbs: "6.6g",
        fat: "0.4g",
      },
      description: "Anti-oksidan ve anti-inflamatuar özelliklere sahip, C vitamini açısından zengin süper sebze."
    },
    {
      id: 40,
      name: "Ispanak",
      category: "Sebzeler",
      nutrition: {
        calories: "23 kcal",
        protein: "2.9g",
        carbs: "3.6g",
        fat: "0.4g",
      },
      description: "Demir ve K vitamini açısından zengin, kas yapımı ve oksijen taşınımı için önemli yapraklı sebze."
    },
    {
      id: 41,
      name: "Taze Zencefil",
      category: "Sebzeler",
      nutrition: {
        calories: "80 kcal",
        protein: "1.8g",
        carbs: "18g",
        fat: "0.8g",
      },
      description: "Anti-inflamatuar özelliklere sahip, kas ağrılarını azaltmaya ve sindirim sistemini desteklemeye yardımcı."
    },
    {
      id: 42,
      name: "Chia Tohumu",
      category: "Süper Gıdalar",
      nutrition: {
        calories: "486 kcal",
        protein: "16.5g",
        carbs: "42g",
        fat: "30.7g",
      },
      description: "Omega-3, protein ve lif açısından zengin. Su ile karıştırıldığında hacmi artan, uzun süre tokluk veren tohum."
    },
    {
      id: 43,
      name: "Spirulina",
      category: "Süper Gıdalar",
      nutrition: {
        calories: "290 kcal",
        protein: "57g",
        carbs: "24g",
        fat: "8g",
      },
      description: "Yüksek protein içerikli mavi-yeşil alg. B12 vitamini, demir ve antioksidan kaynağı."
    },
    {
      id: 44,
      name: "Zerdeçal",
      category: "Süper Gıdalar",
      nutrition: {
        calories: "354 kcal",
        protein: "7.8g",
        carbs: "64.9g",
        fat: "9.9g",
      },
      description: "Kurkumin içeriği sayesinde güçlü anti-inflamatuar özelliğe sahip. Egzersiz sonrası toparlanmayı destekler."
    },
    {
      id: 45,
      name: "Kakao Tozu",
      category: "Süper Gıdalar",
      nutrition: {
        calories: "228 kcal",
        protein: "19.6g",
        carbs: "57.9g",
        fat: "13.7g",
      },
      description: "Antioksidan içeriği yüksek, magnezyum açısından zengin. Kalp-damar sağlığını destekler."
    },
    {
      id: 46,
      name: "Keçi Peyniri",
      category: "Protein Kaynakları",
      nutrition: {
        calories: "364 kcal",
        protein: "21.6g",
        carbs: "2.5g",
        fat: "29.8g",
      },
      description: "İnek sütü ürünlerine göre daha kolay sindirilebilir. Protein içeriği yüksek, probiyotik değeri iyi."
    },
    {
      id: 47,
      name: "Antep Fıstığı",
      category: "Sağlıklı Yağlar",
      nutrition: {
        calories: "562 kcal",
        protein: "20.6g",
        carbs: "27.2g",
        fat: "45.4g",
      },
      description: "B6 vitamini ve potasyum açısından zengin. Kas gelişimi ve toparlanma sürecini destekler."
    },
    {
      id: 48,
      name: "Tavuk Pilav",
      category: "Geleneksel Sporcu Yemekleri",
      nutrition: {
        calories: "300 kcal",
        protein: "22g",
        carbs: "35g",
        fat: "6g",
      },
      description: "Sporcu beslenmesinde klasik bir tercih. Yüksek protein ve kompleks karbonhidrat içeriğiyle ideal bir öğün."
    },
    {
      id: 49,
      name: "Tantuni",
      category: "Geleneksel Sporcu Yemekleri",
      nutrition: {
        calories: "352 kcal",
        protein: "25g",
        carbs: "18g",
        fat: "20g",
      },
      description: "Az yağlı etle hazırlandığında iyi bir protein kaynağı. Yanında sebze ile daha dengeli bir öğün oluşturur."
    },
    {
      id: 50,
      name: "Mercimek Köftesi",
      category: "Bitkisel Proteinler",
      nutrition: {
        calories: "145 kcal",
        protein: "7.5g",
        carbs: "28g",
        fat: "1.5g",
      },
      description: "Bitkisel protein ve kompleks karbonhidrat açısından zengin. Düşük yağlı, vejetaryen sporcu beslenmesinde önemli."
    }
  ];

  // Group foods by category
  const foodsByCategory: FoodsByCategory = athleteFoods.reduce((acc: FoodsByCategory, food: AthleteFood) => {
    if (!acc[food.category]) {
      acc[food.category] = [];
    }
    acc[food.category].push(food);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white py-4 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Besin Tanıma</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/analyze" className="hover:text-primary-400 transition-colors">Besin Analizi</Link></li>
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/about/athlete-nutrition" className="hover:text-primary-400 transition-colors">Sporcu Beslenmesi</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Sporcu Besinleri ve Besin Değerleri</h1>
        
        <div className="mb-8 bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
          <p className="mb-4 text-gray-300">
            Bu sayfada, sporcular için önerilen besinlerin detaylı besin değerlerini bulabilirsiniz. 
            Antrenman hedeflerinize göre uygun besinleri seçerek beslenme planınızı optimize edebilirsiniz.
          </p>
          <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-4">
            <p className="text-yellow-400">
              <strong>Güncelleme:</strong> Veritabanımız düzenli olarak güncellenmektedir. Şu anda ilk 50 besin eklenmiş durumdadır. 
              Yakında tüm 100 besin ve besin değerleri eklenecektir.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Kategoriye Göre Besinler</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(foodsByCategory).map(category => (
              <a key={category} href={`#${category}`} className="px-4 py-2 bg-gray-800 text-primary-400 rounded-full hover:bg-gray-700 transition border border-gray-700">
                {category}
              </a>
            ))}
          </div>
        </div>

        {Object.keys(foodsByCategory).map(category => (
          <div key={category} id={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 bg-gray-800 text-primary-400 p-4 rounded-lg border-l-4 border-primary-600">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodsByCategory[category].map(food => (
                <div key={food.id} className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">{food.name}</h3>
                    <p className="text-gray-300 mb-4">{food.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="font-semibold mb-2 text-gray-200">Besin Değerleri (100g)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-700 p-2 rounded">
                          <span className="font-medium text-white">Kalori:</span> <span className="text-gray-300">{food.nutrition.calories}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                          <span className="font-medium text-white">Protein:</span> <span className="text-gray-300">{food.nutrition.protein}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                          <span className="font-medium text-white">Karbonhidrat:</span> <span className="text-gray-300">{food.nutrition.carbs}</span>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                          <span className="font-medium text-white">Yağ:</span> <span className="text-gray-300">{food.nutrition.fat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Yakında Eklenecek Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-primary-400">Sağlıklı Yağlar</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Chia Tohumu</li>
                <li>Kaju</li>
                <li>Hindistan Cevizi Yağı</li>
                <li>Keten Tohumu Yağı</li>
                <li>Fındık Ezmesi</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-primary-400">Sporcu İçecekleri</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Elektrolit İçecekleri</li>
                <li>Proteinli Süt</li>
                <li>BCAA İçecekleri</li>
                <li>Kefir</li>
                <li>Hindistan Cevizi Suyu</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-primary-400">Rekabetçi Sporcu Atıştırmalıkları</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Protein Barlar</li>
                <li>Enerji Jelleri</li>
                <li>Sporcu Kurabiyesi</li>
                <li>Kuru Meyve Karışımları</li>
                <li>Hurma ve Kurutulmuş Meyveler</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-10 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Sporcu Beslenmesinde Dikkat Edilmesi Gerekenler</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>Spor tipinize ve yoğunluğuna göre beslenme ihtiyaçlarınız değişebilir.</li>
            <li>Günlük protein ihtiyacı genel olarak vücut ağırlığının kg başına 1.2-2g arasındadır.</li>
            <li>Antrenman öncesi karbonhidrat ağırlıklı, sonrası protein ağırlıklı beslenmek performansı artırır.</li>
            <li>Sıvı tüketimi günde en az 2-3 litre olmalıdır, yoğun egzersiz sırasında daha fazla.</li>
            <li>Besin takviyelerine başlamadan önce bir uzmana danışılmalıdır.</li>
          </ul>
        </div>

        <div className="bg-primary-900/30 rounded-lg p-6 mt-8 border border-primary-800">
          <h2 className="text-xl font-bold mb-2 text-primary-300">Not:</h2>
          <p className="text-gray-300">
            Bu sayfada listelenen besin değerleri genel bilgi amaçlıdır ve ürün içeriklerine göre
            değişiklik gösterebilir. Kişisel beslenme planınız için bir diyetisyen veya spor beslenmesi
            uzmanına danışmanız önerilir.
          </p>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Besin Tanıma</h3>
              <p className="text-gray-300">Fotoğraftan besinleri tanıyan ve besin değerlerini gösteren web uygulaması.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Bağlantılar</h4>
              <ul className="space-y-1">
                <li><Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/analyze" className="text-gray-300 hover:text-primary-400 transition-colors">Besin Analizi</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">Hakkımızda</Link></li>
                <li><Link href="/about/athlete-nutrition" className="text-gray-300 hover:text-primary-400 transition-colors">Sporcu Beslenmesi</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Besin Tanıma Uygulaması. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 