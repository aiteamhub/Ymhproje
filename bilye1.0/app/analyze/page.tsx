'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useDropzone } from 'react-dropzone'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'
import { useUserStore, FoodHistoryItem } from '../store/userStore'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

// Use simple HTML symbols instead of react-icons
const CameraIcon = () => <span className="text-4xl">📷</span>
const CloseIcon = () => <span>✖</span>
const CheckIcon = () => <span>✓</span>

// Food database mock - in a real app, this would come from an API
const originalFoodDatabase: Record<string, any> = {
  apple: {
    name: 'Elma',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    healthScore: 9,
    recommendations: 'Elmayı kabuğuyla tüketmek daha fazla lif almanızı sağlar.',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb'
  },
  banana: {
    name: 'Muz',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    healthScore: 8,
    recommendations: 'Potasyum açısından zengindir, kas fonksiyonlarını destekler.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e'
  },
  orange: {
    name: 'Portakal',
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1,
    fiber: 2.4,
    healthScore: 9,
    recommendations: 'C vitamini açısından zengindir, bağışıklık sistemini güçlendirir.',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9'
  },
  bread: {
    name: 'Ekmek',
    calories: 265,
    protein: 9,
    carbs: 49,
    fat: 3.2,
    fiber: 2.7,
    healthScore: 6,
    recommendations: 'Tam tahıllı ekmek seçin, daha fazla lif ve mineral içerir.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  cheese: {
    name: 'Peynir',
    calories: 402,
    protein: 25,
    carbs: 2.4,
    fat: 33,
    fiber: 0,
    healthScore: 5,
    recommendations: 'Protein açısından zengin, ancak yağ içeriği yüksek. Az miktarda tüketin.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d'
  },
  chicken: {
    name: 'Tavuk',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    healthScore: 7,
    recommendations: 'Derisiz tavuk göğsü daha az yağ içerir.',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781'
  },
  rice: {
    name: 'Pirinç',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    healthScore: 6,
    recommendations: 'Esmer pirinç, beyaz pirince göre daha fazla lif ve besin içerir.',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6'
  },
  pasta: {
    name: 'Makarna',
    calories: 157,
    protein: 5.8,
    carbs: 30.9,
    fat: 0.9,
    fiber: 1.8,
    healthScore: 6,
    recommendations: 'Tam buğday makarnası daha besleyicidir.',
    image: 'https://images.unsplash.com/photo-1551462147-ff29e99b6a74'
  },
  pizza: {
    name: 'Pizza',
    calories: 285,
    protein: 12,
    carbs: 36,
    fat: 10,
    fiber: 2.5,
    healthScore: 4,
    recommendations: 'Sebzeli pizza tercih edin, daha az yağ ve daha fazla vitamin içerir.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38'
  },
  salad: {
    name: 'Salata',
    calories: 33,
    protein: 1.5,
    carbs: 6.5,
    fat: 0.2,
    fiber: 2.8,
    healthScore: 10,
    recommendations: 'Çeşitli renkli sebzeler ekleyin, her renk farklı vitaminleri temsil eder.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999'
  },
  yogurt: {
    name: 'Yoğurt',
    calories: 59,
    protein: 3.6,
    carbs: 5.0,
    fat: 3.1,
    fiber: 0,
    healthScore: 8,
    recommendations: 'Probiyotik içeriği bağırsak sağlığını destekler. Şekersiz doğal yoğurt tercih edin.',
    image: 'https://images.unsplash.com/photo-1574792649671-20c9754775d8'
  },
  eggs: {
    name: 'Yumurta',
    calories: 155,
    protein: 12.6,
    carbs: 1.1,
    fat: 10.6,
    fiber: 0,
    healthScore: 7,
    recommendations: 'Protein açısından zengin bir kahvaltı seçeneğidir. Kolesterol endişesi olanlar sadece yumurta akını tüketebilir.',
    image: 'https://images.unsplash.com/photo-1551189317-628d7fcdc386'
  },
  fish: {
    name: 'Balık',
    calories: 206,
    protein: 22.1,
    carbs: 0,
    fat: 12.6,
    fiber: 0,
    healthScore: 9,
    recommendations: 'Omega-3 yağ asidi açısından zengindir, beyin ve kalp sağlığı için önemlidir.',
    image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d'
  },
  nuts: {
    name: 'Kuruyemiş',
    calories: 607,
    protein: 21,
    carbs: 20,
    fat: 54,
    fiber: 8.4,
    healthScore: 7,
    recommendations: 'Sağlıklı yağlar ve protein içerir ancak kalori değeri yüksektir. Porsiyon kontrolü önemlidir.',
    image: 'https://images.unsplash.com/photo-1599589413484-258e7e937733'
  },
  avocado: {
    name: 'Avokado',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    healthScore: 9,
    recommendations: 'Tekli doymamış yağ asitleri açısından zengindir, kalp sağlığını destekler.',
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad'
  },
  oats: {
    name: 'Yulaf',
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    healthScore: 9,
    recommendations: 'Kompleks karbonhidrat ve lif içeriği yüksektir, kan şekerini dengede tutar.',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf'
  },
  berries: {
    name: 'Yaban Mersini',
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    fiber: 2.4,
    healthScore: 10,
    recommendations: 'Antioksidan içeriği yüksektir, beyin fonksiyonlarını destekler ve yaşlanma karşıtı etki gösterir.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc'
  },
  lentils: {
    name: 'Mercimek',
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 7.9,
    healthScore: 9,
    recommendations: 'Bitkisel protein ve lif açısından zengindir, çorba ve yemeklerde kullanılabilir.',
    image: 'https://images.unsplash.com/photo-1525587857745-00a6722257a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  broccoli: {
    name: 'Brokoli',
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    fiber: 2.6,
    healthScore: 10,
    recommendations: 'K vitamini ve folat açısından zengindir, hafif buharda pişirilmesi besin değerini korur.',
    image: 'https://images.unsplash.com/photo-1584270354955-9b76e59955d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  sweet_potato: {
    name: 'Tatlı Patates',
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    fiber: 3,
    healthScore: 8,
    recommendations: 'A vitamini açısından zengindir, fırında pişirilmiş hali sağlıklı bir karbonhidrat kaynağıdır.',
    image: 'https://images.unsplash.com/photo-1596097557993-54e1bbd3377a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  chocolate: {
    name: 'Bitter Çikolata',
    calories: 598,
    protein: 7.8,
    carbs: 45.9,
    fat: 42.6,
    fiber: 10.9,
    healthScore: 5,
    recommendations: 'Kakao oranı %70 ve üzeri olan bitter çikolata, antioksidan içerir ama kalori değeri yüksektir.',
    image: 'https://images.unsplash.com/photo-1606312618475-79449b272097'
  },
  turkey: {
    name: 'Hindi',
    calories: 189,
    protein: 29,
    carbs: 0,
    fat: 7.5,
    fiber: 0,
    healthScore: 8,
    recommendations: 'Düşük yağlı bir protein kaynağıdır, tavuğa alternatif olarak tüketilebilir.',
    image: 'https://images.unsplash.com/photo-1574672281248-964297cffbc9'
  },
  pide: {
    name: 'Pide',
    calories: 252,
    protein: 10.2,
    carbs: 42.3,
    fat: 5.6,
    fiber: 2.1,
    healthScore: 5,
    recommendations: 'Protein içeriği iyi olsa da, yüksek karbonhidrat ve yağ içerir. Porsiyon kontrolü önemlidir.',
    image: 'https://images.unsplash.com/photo-1585419062137-acac3ba4a111'
  },
  baklava: {
    name: 'Baklava',
    calories: 334,
    protein: 5.1,
    carbs: 39.2,
    fat: 18.6,
    fiber: 1.2,
    healthScore: 3,
    recommendations: 'Yüksek şeker ve yağ içeriğine sahiptir. Özel günlerde küçük porsiyonlar halinde tüketilmelidir.',
    image: 'https://images.unsplash.com/photo-1625526267039-9a971d32bc1f'
  },
  olive: {
    name: 'Zeytin',
    calories: 115,
    protein: 0.8,
    carbs: 6.3,
    fat: 10.7,
    fiber: 3.2,
    healthScore: 8,
    recommendations: 'Tekli doymamış yağ asitleri içerir, sağlıklı bir kahvaltı seçeneğidir.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578'
  },
  dolma: {
    name: 'Yaprak Sarma',
    calories: 147,
    protein: 3.8,
    carbs: 15.7,
    fat: 8.2,
    fiber: 3.6,
    healthScore: 7,
    recommendations: 'Zeytinyağlı yaprak sarma daha sağlıklıdır. Asma yaprağındaki antioksidanlar faydalıdır.',
    image: 'https://images.unsplash.com/photo-1623259838743-9f1e884fba59'
  },
  kofte: {
    name: 'Köfte',
    calories: 230,
    protein: 19.4,
    carbs: 3.9,
    fat: 16.5,
    fiber: 0.8,
    healthScore: 6,
    recommendations: 'Protein içeriği yüksektir, az yağlı et kullanılan köfteler tercih edilmelidir.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468'
  },
  kebab: {
    name: 'Kebap',
    calories: 310,
    protein: 24.5,
    carbs: 2.1,
    fat: 23.4,
    fiber: 0.9,
    healthScore: 5,
    recommendations: 'Yağ oranı yüksektir, haftada bir kez tüketilmesi önerilir. Yanında salata tüketmeyi tercih edin.',
    image: 'https://images.unsplash.com/photo-1644364935906-792b2245a2a0'
  },
  manti: {
    name: 'Mantı',
    calories: 210,
    protein: 9.2,
    carbs: 27.6,
    fat: 7.8,
    fiber: 1.9,
    healthScore: 6,
    recommendations: 'Yoğurt ile servis edilmesi probiyotik alımını destekler. Yağlı kıyma yerine az yağlı kıyma tercih edilmelidir.',
    image: 'https://images.unsplash.com/photo-1603137413639-89e55316026d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  borek: {
    name: 'Börek',
    calories: 365,
    protein: 10.4,
    carbs: 31.2,
    fat: 22.8,
    fiber: 1.2,
    healthScore: 4,
    recommendations: 'Yüksek yağ içeriğine sahiptir. Sebzeli harçları tercih edin ve fırında pişmiş olanları seçin.',
    image: 'https://images.unsplash.com/photo-1661607018193-cadd098da9a4'
  },
  pilaf: {
    name: 'Pilav',
    calories: 178,
    protein: 3.5,
    carbs: 35.2,
    fat: 2.6,
    fiber: 0.8,
    healthScore: 5,
    recommendations: 'Yağ miktarını azaltmak ve bulgur pilavı tercih etmek daha sağlıklı bir seçim olacaktır.',
    image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  cucumber: {
    name: 'Salatalık',
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    fiber: 0.5,
    healthScore: 9,
    recommendations: 'Su içeriği yüksektir, vücudun hidrate kalmasına yardımcı olur. Kabuğuyla birlikte tüketilmesi daha fazla lif almanızı sağlar.',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e'
  },
  tomato: {
    name: 'Domates',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    healthScore: 9,
    recommendations: 'Likopen içeriği yüksektir, kalp sağlığını ve prostat sağlığını destekler.',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924'
  },
  pepper: {
    name: 'Biber',
    calories: 31,
    protein: 1,
    carbs: 6,
    fat: 0.3,
    fiber: 2.1,
    healthScore: 9,
    recommendations: 'C vitamini açısından zengindir. Kırmızı biberlerin antioksidan içeriği yeşil biberlere göre daha yüksektir.',
    image: 'https://images.unsplash.com/photo-1563252722-6434563a985d'
  },
  watermelon: {
    name: 'Karpuz',
    calories: 30,
    protein: 0.6,
    carbs: 7.6,
    fat: 0.2,
    fiber: 0.4,
    healthScore: 8,
    recommendations: 'Su içeriği yüksektir, yaz aylarında vücudun hidrate kalmasına yardımcı olur.',
    image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa'
  },
  grape: {
    name: 'Üzüm',
    calories: 69,
    protein: 0.7,
    carbs: 18.1,
    fat: 0.2,
    fiber: 0.9,
    healthScore: 7,
    recommendations: 'Antioksidan içeriği yüksektir, özellikle koyu renkli üzümler daha fazla antioksidan içerir.',
    image: 'https://images.unsplash.com/photo-1596363202370-9bafe97ccea5'
  },
  strawberry: {
    name: 'Çilek',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    fiber: 2,
    healthScore: 9,
    recommendations: 'C vitamini, manganez ve potasyum açısından zengindir. Antioksidan içeriği yaşlanma karşıtı etki gösterir.',
    image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5a696'
  },
  peach: {
    name: 'Şeftali',
    calories: 39,
    protein: 0.9,
    carbs: 9.5,
    fat: 0.3,
    fiber: 1.5,
    healthScore: 8,
    recommendations: 'A ve C vitamini açısından zengindir. Kabuğuyla birlikte tüketilmesi daha fazla lif almanızı sağlar.',
    image: 'https://images.unsplash.com/photo-1595743825637-cdafc8a4b590'
  },
  cherry: {
    name: 'Kiraz',
    calories: 50,
    protein: 1,
    carbs: 12.2,
    fat: 0.3,
    fiber: 1.6,
    healthScore: 8,
    recommendations: 'Antioksidanlar ve anti-inflamatuar bileşikler açısından zengindir. Uyku kalitesini artırmaya yardımcı olabilir.',
    image: 'https://images.unsplash.com/photo-1611096265583-5d745a587523'
  },
  bulgur: {
    name: 'Bulgur',
    calories: 83,
    protein: 3.1,
    carbs: 18.6,
    fat: 0.2,
    fiber: 4.5,
    healthScore: 8,
    recommendations: 'Pirinçten daha fazla lif ve protein içerir. Düşük glisemik indeksli olduğu için kan şekerini daha yavaş yükseltir.',
    image: 'https://images.unsplash.com/photo-1627471603865-9e4c3a0cd1b9'
  },
  lentil_soup: {
    name: 'Mercimek Çorbası',
    calories: 128,
    protein: 7.5,
    carbs: 22.8,
    fat: 1.3,
    fiber: 5.7,
    healthScore: 9,
    recommendations: 'Protein ve lif açısından zengindir. Düzenli tüketimi kan şekerini dengeler ve tokluk hissi verir.',
    image: 'https://images.unsplash.com/photo-1625944525533-473d3a543acd'
  },
  eggplant: {
    name: 'Patlıcan',
    calories: 25,
    protein: 1,
    carbs: 6,
    fat: 0.2,
    fiber: 3,
    healthScore: 8,
    recommendations: 'Antioksidan içeriği yüksektir. Kızartmak yerine ızgara veya fırında pişirme yöntemlerini tercih edin.',
    image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06'
  },
  artichoke: {
    name: 'Enginar',
    calories: 47,
    protein: 3.3,
    carbs: 10.5,
    fat: 0.2,
    fiber: 5.4,
    healthScore: 9,
    recommendations: 'Karaciğer sağlığını destekler ve sindirimi kolaylaştırır. Zeytinyağlı enginar kalp sağlığı için faydalıdır.',
    image: 'https://images.unsplash.com/photo-1558443336-dfc8a937dd86'
  },
  stuffed_peppers: {
    name: 'Biber Dolması',
    calories: 178,
    protein: 4.5,
    carbs: 18.7,
    fat: 9.8,
    fiber: 3.2,
    healthScore: 7,
    recommendations: 'Zeytinyağlı yapılması daha sağlıklıdır. İçine konulan pirincin miktarını azaltıp, sebze eklemek besin değerini artırır.',
    image: 'https://images.unsplash.com/photo-1617476752332-57bef8504ae9'
  },
  raki: {
    name: 'Rakı',
    calories: 248,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    healthScore: 2,
    recommendations: 'Yüksek alkol içeriğine sahiptir. Aşırı tüketiminden kaçınılmalı ve su ile birlikte alınmalıdır.',
    image: 'https://images.unsplash.com/photo-1608034954396-28851c7a4de6'
  },
  ayran: {
    name: 'Ayran',
    calories: 37,
    protein: 2.1,
    carbs: 2.7,
    fat: 1.8,
    fiber: 0,
    healthScore: 7,
    recommendations: 'Probiyotik içeriği bağırsak sağlığını destekler. Tuzsuz veya az tuzlu olanları tercih edin.',
    image: 'https://images.unsplash.com/photo-1626957341926-98f0c4eb49d7'
  },
  simit: {
    name: 'Simit',
    calories: 250,
    protein: 7.5,
    carbs: 48,
    fat: 3.2,
    fiber: 2.3,
    healthScore: 5,
    recommendations: 'Tam tahıllı malzemeden yapılanları tercih edin ve yanında protein kaynağı tüketin.',
    image: 'https://images.unsplash.com/photo-1590089230839-e496174880bf'
  },
  imam_bayildi: {
    name: 'İmam Bayıldı',
    calories: 142,
    protein: 2.1,
    carbs: 12.3,
    fat: 9.5,
    fiber: 4.2,
    healthScore: 8,
    recommendations: 'Zeytinyağı içeriği kalp sağlığını destekler. Patlıcanın kabuğundaki antioksidanlardan faydalanmak için kabuklu pişirilmelidir.',
    image: 'https://images.unsplash.com/photo-1617461766904-11201a7dc331'
  },
  menemen: {
    name: 'Menemen',
    calories: 165,
    protein: 8.4,
    carbs: 5.2,
    fat: 12.6,
    fiber: 1.8,
    healthScore: 7,
    recommendations: 'Domates, biber ve yumurta içeriğindeki antioksidanlar vücut sağlığı için faydalıdır. Az yağlı pişirilmesi daha sağlıklıdır.',
    image: 'https://images.unsplash.com/photo-1626415871133-a69443ac1e45'
  },
  karniyarik: {
    name: 'Karnıyarık',
    calories: 184,
    protein: 8.7,
    carbs: 14.3,
    fat: 11.2,
    fiber: 3.8,
    healthScore: 6,
    recommendations: 'Patlıcanı kızartmak yerine fırınlamak veya ızgara yapmak daha sağlıklıdır. Az yağlı kıyma kullanılmalıdır.',
    image: 'https://images.unsplash.com/photo-1628683332952-0ed3d2ededc3'
  },
  cacik: {
    name: 'Cacık',
    calories: 62,
    protein: 3.2,
    carbs: 4.9,
    fat: 3.4,
    fiber: 0.6,
    healthScore: 8,
    recommendations: 'Probiyotik içeriği bağırsak sağlığını destekler. Dereotu ve sarımsak içeriği vitamin değerini artırır.',
    image: 'https://images.unsplash.com/photo-1601056639638-c53c50e13ead'
  },
  kabak_mucveri: {
    name: 'Kabak Mücveri',
    calories: 124,
    protein: 5.2,
    carbs: 12.8,
    fat: 6.7,
    fiber: 2.3,
    healthScore: 7,
    recommendations: 'Kızartmak yerine fırında pişirilmesi kalori değerini düşürür. Kabak içeriği vitamin ve mineral açısından zengindir.',
    image: 'https://images.unsplash.com/photo-1626196340665-198f9def9f1c'
  },
  kisir: {
    name: 'Kısır',
    calories: 158,
    protein: 4.2,
    carbs: 29.5,
    fat: 3.7,
    fiber: 5.8,
    healthScore: 8,
    recommendations: 'Bulgur içeriği lif açısından zengindir. Maydanoz ve limon C vitamini kaynağıdır.',
    image: 'https://images.unsplash.com/photo-1614421245099-97d002ea0fc7'
  },
  okra: {
    name: 'Bamya',
    calories: 33,
    protein: 1.9,
    carbs: 7.5,
    fat: 0.2,
    fiber: 3.2,
    healthScore: 9,
    recommendations: 'Lif içeriği yüksektir, sindirim sistemini destekler. Zeytinyağlı veya az yağlı pişirilmesi önerilir.',
    image: 'https://images.unsplash.com/photo-1644991346966-c75956ba2100'
  },
  spinach: {
    name: 'Ispanak',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    healthScore: 10,
    recommendations: 'Demir ve K vitamini açısından zengindir. Hafif buharda pişirilmesi vitamin kaybını azaltır.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb'
  },
  green_beans: {
    name: 'Taze Fasulye',
    calories: 31,
    protein: 1.8,
    carbs: 7,
    fat: 0.1,
    fiber: 3.4,
    healthScore: 9,
    recommendations: 'C vitamini ve lif içeriği yüksektir. Zeytinyağlı pişirilmesi besleyiciliğini artırır.',
    image: 'https://images.unsplash.com/photo-1638611331925-4b1e2a4094d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  cauliflower: {
    name: 'Karnabahar',
    calories: 25,
    protein: 1.9,
    carbs: 5,
    fat: 0.3,
    fiber: 2,
    healthScore: 9,
    recommendations: 'Antioksidan içeriği yüksektir. Fırında veya buharda pişirilmesi besin değerini korur.',
    image: 'https://images.unsplash.com/photo-1510627498534-f8f882e52f47'
  },
  leek: {
    name: 'Pırasa',
    calories: 61,
    protein: 1.5,
    carbs: 14.2,
    fat: 0.3,
    fiber: 1.8,
    healthScore: 8,
    recommendations: 'Antioksidan ve prebiyotik içeriği bağışıklık sistemini destekler. Çorba ve zeytinyağlı yemeklerde kullanılabilir.',
    image: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5'
  },
  fig: {
    name: 'İncir',
    calories: 74,
    protein: 0.8,
    carbs: 19.2,
    fat: 0.3,
    fiber: 2.9,
    healthScore: 8,
    recommendations: 'Kalsiyum ve potasyum açısından zengindir. Lif içeriği sindirim sistemini destekler.',
    image: 'https://images.unsplash.com/photo-1601379760883-1bb497c558e2'
  },
  pomegranate: {
    name: 'Nar',
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fat: 1.2,
    fiber: 4,
    healthScore: 9,
    recommendations: 'Antioksidan içeriği yüksektir. Kalp sağlığını ve bağışıklık sistemini destekler.',
    image: 'https://images.unsplash.com/photo-1615560511737-75e4da53deab'
  },
  quince: {
    name: 'Ayva',
    calories: 57,
    protein: 0.4,
    carbs: 15.3,
    fat: 0.1,
    fiber: 1.9,
    healthScore: 7,
    recommendations: 'C vitamini ve lif içeriği yüksektir. Komposto veya tatlı yerine meyve olarak tüketilmesi daha sağlıklıdır.',
    image: 'https://images.unsplash.com/photo-1573126617899-41f1dffb196c'
  },
  apricot: {
    name: 'Kayısı',
    calories: 48,
    protein: 1.4,
    carbs: 11.1,
    fat: 0.4,
    fiber: 2,
    healthScore: 8,
    recommendations: 'A vitamini ve potasyum açısından zengindir. Taze veya kuru olarak tüketilebilir, kuru hali daha yoğun besin içerir.',
    image: 'https://images.unsplash.com/photo-1501746877-14782df58970'
  },
  mulberry: {
    name: 'Dut',
    calories: 43,
    protein: 1.4,
    carbs: 9.8,
    fat: 0.4,
    fiber: 1.7,
    healthScore: 8,
    recommendations: 'Antioksidan ve C vitamini içeriği yüksektir. Kan şekerini düzenlemede yardımcı olabilir.',
    image: 'https://images.unsplash.com/photo-1593348562096-a776b77cc026'
  },
  doner_kebab: {
    name: 'Döner Sandviç',
    calories: 412,
    protein: 25.3,
    carbs: 36.7,
    fat: 19.4,
    fiber: 2.5,
    healthScore: 4,
    recommendations: 'Yüksek yağ ve kalori içeriğine sahiptir. Sebzeli ve az soslu tercih edilmeli, ayda birkaç kez tüketilmelidir.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'
  },
  lahmacun: {
    name: 'Lahmacun',
    calories: 287,
    protein: 14.6,
    carbs: 40.3,
    fat: 8.5,
    fiber: 3.2,
    healthScore: 5,
    recommendations: 'Sebze içeriği artırılmış, az yağlı kıyma ile hazırlanmış olanları tercih edin. Porsiyon kontrolü önemlidir.',
    image: 'https://images.unsplash.com/photo-1608797178998-ed6ad2e11f3b'
  },
  instant_noodle: {
    name: 'Hazır Noodle',
    calories: 380,
    protein: 8.7,
    carbs: 54.3,
    fat: 15.2,
    fiber: 2.1,
    healthScore: 2,
    recommendations: 'Yüksek sodyum ve koruyucu içerir. Nadir tüketilmeli, içine taze sebze ekleyerek besin değeri artırılabilir.',
    image: 'https://images.unsplash.com/photo-1626088549009-1007d3d24b77'
  },
  chips: {
    name: 'Cips',
    calories: 536,
    protein: 7,
    carbs: 53.5,
    fat: 34.6,
    fiber: 4.8,
    healthScore: 1,
    recommendations: 'Yüksek yağ, tuz ve kalori içerir. Nadir tüketilmeli, küçük porsiyonlarla sınırlandırılmalıdır.',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b'
  },
  hamburger: {
    name: 'Hamburger',
    calories: 354,
    protein: 20.2,
    carbs: 33.8,
    fat: 17.4,
    fiber: 2.8,
    healthScore: 3,
    recommendations: 'Yüksek yağ ve kalori içerir. Sebze içeriği artırılmış, tam tahıllı ekmekli versiyonlar tercih edilmelidir.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  pogaca: {
    name: 'Poğaça',
    calories: 307,
    protein: 7.2,
    carbs: 32.5,
    fat: 17.3,
    fiber: 1.5,
    healthScore: 3,
    recommendations: 'Yüksek yağ içerir. Fırından alınan peynirli versiyonları tercih edilmeli, aşırı tüketiminden kaçınılmalıdır.',
    image: 'https://images.unsplash.com/photo-1630322546916-e6e82dbf8b22'
  },
  gozleme: {
    name: 'Gözleme',
    calories: 328,
    protein: 11.4,
    carbs: 35.2,
    fat: 15.8,
    fiber: 2.7,
    healthScore: 4,
    recommendations: 'Sebzeli içerikli ve az yağlı olanları tercih edin. Porsiyon kontrolü önemlidir.',
    image: 'https://images.unsplash.com/photo-1620317120134-f8f882e52f47'
  },
  sarma: {
    name: 'Lahana Sarması',
    calories: 165,
    protein: 5.3,
    carbs: 17.2,
    fat: 9.4,
    fiber: 3.6,
    healthScore: 7,
    recommendations: 'Zeytinyağlı versiyonu daha sağlıklıdır. Lahana içeriği antioksidan ve A vitamini açısından zengindir.',
    image: 'https://images.unsplash.com/photo-1583774471234-2138da15943c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  kunefe: {
    name: 'Künefe',
    calories: 429,
    protein: 7.8,
    carbs: 47.2,
    fat: 24.3,
    fiber: 1.9,
    healthScore: 3,
    recommendations: 'Yüksek kalori içeriğine sahiptir. Özel günlerde ve az miktarda tüketilmelidir.',
    image: 'https://images.unsplash.com/photo-1631778071850-20e99f962fe8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  mujver: {
    name: 'Mücver',
    calories: 153,
    protein: 4.7,
    carbs: 11.3,
    fat: 9.8,
    fiber: 2.1,
    healthScore: 6,
    recommendations: 'Fırında pişirilmesi daha az yağ içermesini sağlar. Kabak içeriği vitamin ve mineral açısından zengindir.',
    image: 'https://images.unsplash.com/photo-1593545611345-541625a7aeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  piyaz: {
    name: 'Piyaz',
    calories: 185,
    protein: 9.6,
    carbs: 22.5,
    fat: 6.8,
    fiber: 6.2,
    healthScore: 8,
    recommendations: 'Kurubaklagil içeriği protein ve lif açısından zengindir. Zeytinyağlı hazırlanması besleyiciliğini artırır.',
    image: 'https://images.unsplash.com/photo-1614526261139-5b3c4f7bbe66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  hamsili_pilav: {
    name: 'Hamsili Pilav',
    calories: 325,
    protein: 15.2,
    carbs: 42.7,
    fat: 10.5,
    fiber: 1.2,
    healthScore: 6,
    recommendations: 'Hamsi omega-3 açısından zengindir. Pirinç yerine bulgur kullanımı besleyiciliğini artırır.',
    image: 'https://images.unsplash.com/photo-1603208000755-8d7a126bbbc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  saksuka: {
    name: 'Şakşuka',
    calories: 137,
    protein: 2.8,
    carbs: 14.5,
    fat: 8.2,
    fiber: 4.3,
    healthScore: 7,
    recommendations: 'Patlıcan, biber ve domates içeriği antioksidan açısından zengindir. Az yağlı hazırlanması önerilir.',
    image: 'https://images.unsplash.com/photo-1625944525533-473d3a543acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  adana_kebab: {
    name: 'Adana Kebap',
    calories: 342,
    protein: 28.3,
    carbs: 1.9,
    fat: 25.7,
    fiber: 0.7,
    healthScore: 4,
    recommendations: 'Yüksek protein içeriğine sahiptir ancak yağ oranı da yüksektir. Yanında bol salata ile tüketilmelidir.',
    image: 'https://images.unsplash.com/photo-1561626423-a51b45aef329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  icli_kofte: {
    name: 'İçli Köfte',
    calories: 232,
    protein: 10.5,
    carbs: 24.7,
    fat: 11.3,
    fiber: 3.5,
    healthScore: 5,
    recommendations: 'Fırında pişirilmesi yağ içeriğini azaltır. Bulgur lif açısından zengindir.',
    image: 'https://images.unsplash.com/photo-1608197492481-e58ddb6edfbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  lokum: {
    name: 'Lokum',
    calories: 367,
    protein: 0.2,
    carbs: 91.2,
    fat: 0.1,
    fiber: 0.1,
    healthScore: 2,
    recommendations: 'Yüksek şeker içeriğine sahiptir. Küçük porsiyonlar halinde ve nadir tüketilmelidir.',
    image: 'https://images.unsplash.com/photo-1601059403546-50fe56093290?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  kumpir: {
    name: 'Kumpir',
    calories: 421,
    protein: 12.5,
    carbs: 53.7,
    fat: 18.3,
    fiber: 6.2,
    healthScore: 4,
    recommendations: 'İçindekilerden peynir ve sosis gibi yağlı malzemeleri azaltıp, sebze içeriğini artırmak daha sağlıklıdır.',
    image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  simit_tost: {
    name: 'Simit Tost',
    calories: 395,
    protein: 15.8,
    carbs: 52.3,
    fat: 13.7,
    fiber: 3.1,
    healthScore: 4,
    recommendations: 'Peynir ve sebze içerikli olanları tercih edin. Salam ve sosisli olanlardan kaçının.',
    image: 'https://images.unsplash.com/photo-1631143071901-0f3c1142bafb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  tarhana: {
    name: 'Tarhana Çorbası',
    calories: 126,
    protein: 5.2,
    carbs: 21.7,
    fat: 2.4,
    fiber: 2.8,
    healthScore: 7,
    recommendations: 'Probiyotik içeriğe sahiptir. Bağışıklık sistemini güçlendirir ve sindirim sistemini destekler.',
    image: 'https://images.unsplash.com/photo-1606857230367-b10f4ec00df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  tahin_pekmez: {
    name: 'Tahin Pekmez',
    calories: 342,
    protein: 7.9,
    carbs: 53.2,
    fat: 11.5,
    fiber: 3.4,
    healthScore: 6,
    recommendations: 'Kalsiyum ve demir açısından zengin bir karışımdır. Porsiyon kontrolü önemlidir.',
    image: 'https://images.unsplash.com/photo-1608664862769-4ea2a03d1c67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }
};

// Define marketProducts after originalFoodDatabase
const marketProducts: Record<string, any> = {
  ulker_biskrem: {
    name: 'Ülker Biskrem',
    calories: 485,
    protein: 6.2,
    carbs: 64.3,
    fat: 22.5,
    fiber: 1.8,
    healthScore: 3,
    brand: 'Ülker',
    category: 'Bisküvi',
    recommendations: 'Yüksek şeker ve yağ içeriği nedeniyle tüketimi sınırlandırılmalıdır.',
    image: 'https://images.migrosone.com/sanalmarket/product/05030068/05030068-83f20c-1650x1650.jpg'
  },
  dimes_portakal_suyu: {
    name: 'Dimes Portakal Suyu',
    calories: 45,
    protein: 0.7,
    carbs: 10.8,
    fat: 0.1,
    fiber: 0.2,
    healthScore: 6,
    brand: 'Dimes',
    category: 'İçecek',
    recommendations: 'Şeker içeriği nedeniyle tüketimi sınırlandırılmalıdır. Taze sıkılmış meyve suyu daha sağlıklıdır.',
    image: 'https://images.migrosone.com/sanalmarket/product/08121106/dimes-portakal-suyu-1-lt-cc61cf-1650x1650.jpg'
  },
  pinar_sut: {
    name: 'Pınar Süt',
    calories: 62,
    protein: 3.2,
    carbs: 4.7,
    fat: 3.5,
    fiber: 0,
    healthScore: 7,
    brand: 'Pınar',
    category: 'Süt Ürünleri',
    recommendations: 'Protein ve kalsiyum açısından zengindir. Kemik sağlığını destekler.',
    image: 'https://images.migrosone.com/sanalmarket/product/08010111/08010111-c10ab1-1650x1650.jpg'
  }
};

// Add market product specific synonyms
const marketSynonyms: Record<string, string[]> = {
  ulker_biskrem: ['biskrem', 'çikolatalı bisküvi'],
  dimes_portakal_suyu: ['portakal suyu', 'meyve suyu'],
  pinar_sut: ['süt', 'pınar süt']
};

// Define the type for food categories
interface FoodCategory {
  category: string;
  terms: string[];
}

// Add more food categories and improve the recognition with multi-level matching
const foodCategories: FoodCategory[] = [
  {
    category: 'fruits',
    terms: ['apple', 'banana', 'orange', 'berry', 'berries', 'watermelon', 'grape', 'strawberry', 'peach', 'cherry', 'fig', 'pomegranate', 'quince', 'apricot', 'mulberry', 'fruit', 'meyve', 'natural food', 'fresh produce']
  },
  {
    category: 'vegetables',
    terms: ['broccoli', 'sweet_potato', 'cucumber', 'tomato', 'pepper', 'eggplant', 'artichoke', 'okra', 'spinach', 'green_beans', 'cauliflower', 'leek', 'vegetable', 'sebze', 'yeşillik', 'green', 'leafy', 'garden produce']
  },
  {
    category: 'dairy',
    terms: ['cheese', 'yogurt', 'milk', 'ayran', 'cacik', 'dairy', 'süt ürünü', 'dairy product', 'fermented', 'creamy', 'white food']
  },
  {
    category: 'bakery',
    terms: ['bread', 'simit', 'pogaca', 'bakery', 'fırın ürünü', 'baked', 'dough', 'hamur', 'pastry']
  },
  {
    category: 'desserts',
    terms: ['baklava', 'chocolate', 'kunefe', 'lokum', 'tahin_pekmez', 'dessert', 'tatlı', 'sweet', 'şekerli', 'candy', 'cake', 'pasta', 'şekerleme']
  },
  {
    category: 'grains',
    terms: ['rice', 'oats', 'bulgur', 'pilaf', 'hamsili_pilav', 'grain', 'tahıl', 'cereal', 'hububat', 'pirinç', 'yulaf']
  },
  {
    category: 'meats',
    terms: ['chicken', 'turkey', 'fish', 'kofte', 'kebab', 'adana_kebab', 'meat', 'et', 'animal protein', 'hayvansal', 'protein', 'red meat', 'kırmızı et', 'white meat', 'beyaz et']
  },
  {
    category: 'traditional dishes',
    terms: ['dolma', 'sarma', 'borek', 'manti', 'imam_bayildi', 'menemen', 'karniyarik', 'kabak_mucveri', 'kisir', 'mujver', 'piyaz', 'saksuka', 'icli_kofte', 'traditional', 'geleneksel', 'turkish cuisine', 'türk mutfağı', 'home cooked', 'ev yemeği']
  },
  {
    category: 'soups',
    terms: ['lentil_soup', 'tarhana', 'soup', 'çorba', 'hot dish', 'sıcak yemek', 'broth', 'et suyu', 'consommé']
  },
  {
    category: 'beverages',
    terms: ['raki', 'ayran', 'beverage', 'içecek', 'drink', 'liquid', 'sıvı', 'refreshment', 'serinletici']
  },
  {
    category: 'fast food',
    terms: ['pizza', 'hamburger', 'chips', 'instant_noodle', 'doner_kebab', 'lahmacun', 'kumpir', 'simit_tost', 'fast food', 'hazır yemek', 'junk food', 'street food', 'sokak lezzeti', 'take away', 'paket servis']
  },
  {
    category: 'breakfast',
    terms: ['eggs', 'menemen', 'cheese', 'simit', 'olive', 'pogaca', 'gozleme', 'breakfast', 'kahvaltı', 'morning food', 'sabah yemeği', 'kahvaltılık']
  },
  {
    category: 'eggplant dishes',
    terms: ['eggplant', 'imam_bayildi', 'karniyarik', 'saksuka', 'patlıcan', 'aubergine', 'purple vegetable', 'mor sebze']
  },
  {
    category: 'processed foods',
    terms: ['canned', 'konserve', 'frozen', 'dondurulmuş', 'preserved', 'pre-packed', 'hazır paket', 'instant', 'instant food']
  },
  {
    category: 'seafood',
    terms: ['fish', 'balık', 'shrimp', 'karides', 'prawn', 'calamari', 'kalamar', 'octopus', 'ahtapot', 'mussel', 'midye', 'sea food', 'deniz ürünü', 'marine', 'deniz mahsulleri']
  },
  {
    category: 'snacks',
    terms: ['nuts', 'kuruyemiş', 'chips', 'cips', 'crackers', 'kraker', 'pretzels', 'çubuk kraker', 'popcorn', 'patlamış mısır', 'snack', 'atıştırmalık']
  }
];

// Add market product categories
const marketProductCategories: FoodCategory[] = [
  {
    category: 'packaged_foods',
    terms: ['paketli yiyecek', 'hazır gıda', 'ambalajlı', 'konserve']
  },
  {
    category: 'beverages',
    terms: ['içecek', 'meyve suyu', 'gazlı içecek', 'su', 'meşrubat']
  },
  {
    category: 'dairy_products',
    terms: ['süt ürünleri', 'süt', 'yoğurt', 'peynir', 'tereyağı']
  }
];

// Combine both databases for better food recognition
const combinedFoodDatabase = { ...originalFoodDatabase, ...marketProducts };

export default function AnalyzePage() {
  const router = useRouter()
  const { isLoggedIn, user, addFoodHistoryItem } = useUserStore()
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null)
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<any[]>([])
  const [recognizedFood, setRecognizedFood] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [foodSaved, setFoodSaved] = useState(false)
  const [manualFoodName, setManualFoodName] = useState('')
  const [manualFoodQuantity, setManualFoodQuantity] = useState<number>(100)
  const [quantity, setQuantity] = useState<number>(100)
  const [activeTab, setActiveTab] = useState<'photo' | 'manual'>('photo')

  // Load TensorFlow.js model with improved configuration
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true)
        
        // Wait for TensorFlow.js to be ready
        await tf.ready()
        
        // Configure model with better options
        const loadedModel = await mobilenet.load({
          version: 2,
          alpha: 1.0,
        })
        
        setModel(loadedModel)
        
        // Initialize the model
        try {
          // Create a dummy element to warm up the model
          const dummyImg = document.createElement('img')
          dummyImg.width = 224
          dummyImg.height = 224
          await loadedModel.classify(dummyImg)
        } catch (e) {
          console.log('Model warm-up skipped', e)
        }
        
        setIsModelLoading(false)
        console.log('Model loaded successfully with enhanced configuration')
      } catch (err) {
        console.error('Model loading error:', err)
        setError('Model yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
        setIsModelLoading(false)
      }
    }
    loadModel()
  }, [])

  // Enhanced food identification with better preprocessing
  const identifyFood = async (img: HTMLImageElement) => {
    try {
      if (!model) {
        setError('Model hazır değil, lütfen tekrar deneyin.')
        return
      }
      
      setIsAnalyzing(true)
      setFoodSaved(false)
      
      // ENHANCEMENT 1: Apply multiple image analysis approaches
      // Original image prediction
      const originalResult = await model.classify(img, 20)
      
      // ENHANCEMENT 2: Create augmented versions for better detection
      const results = [originalResult]
      
      // Multiple canvases for image augmentations
      const canvases = []
      const contexts = []
      
      // Create 3 canvas elements for different preprocessing
      for (let i = 0; i < 3; i++) {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvases.push(canvas)
          contexts.push(ctx)
        }
      }
      
      // Only proceed if we have contexts
      if (contexts.length > 0) {
        // 1. Horizontally flipped image
        contexts[0].translate(img.width, 0)
        contexts[0].scale(-1, 1)
        contexts[0].drawImage(img, 0, 0, img.width, img.height)
        
        // 2. Brightness enhanced image (improved contrast)
        contexts[1].filter = 'contrast(1.2) brightness(1.1)'
        contexts[1].drawImage(img, 0, 0, img.width, img.height)
        
        // 3. Cropped center image (focus on the center part of food)
        const cropSize = Math.min(img.width, img.height) * 0.7 // 70% of the smaller dimension
        const cropX = (img.width - cropSize) / 2
        const cropY = (img.height - cropSize) / 2
        contexts[2].drawImage(
          img, 
          cropX, cropY, cropSize, cropSize,
          0, 0, img.width, img.height
        )
        
        // Get predictions for each augmented image
        for (let i = 0; i < canvases.length; i++) {
          const augResult = await model.classify(canvases[i], 10)
          results.push(augResult)
        }
        
        // ENHANCEMENT 3: Combine all predictions with weights
        // Original gets highest weight
        const weightsMap: Record<number, number> = {
          0: 1.0,    // Original image (full weight)
          1: 0.8,    // Flipped image
          2: 0.9,    // Enhanced contrast
          3: 0.95,   // Center crop
        }
        
        // Merge all predictions into a single array with weighted scores
        const mergedPredictions: {className: string, probability: number}[] = []
        
        results.forEach((result, resultIndex) => {
          const weight = weightsMap[resultIndex] || 0.7
          
          result.forEach(prediction => {
            const existingIndex = mergedPredictions.findIndex(
              p => p.className.toLowerCase() === prediction.className.toLowerCase()
            )
            
            if (existingIndex >= 0) {
              // Update existing prediction with weighted average
              const existing = mergedPredictions[existingIndex]
              const newProbability = (existing.probability + prediction.probability * weight) / 2
              mergedPredictions[existingIndex].probability = newProbability
            } else {
              // Add new prediction with weight applied
              mergedPredictions.push({
                className: prediction.className,
                probability: prediction.probability * weight
              })
            }
          })
        })
        
        // Sort by probability
        mergedPredictions.sort((a, b) => b.probability - a.probability)
        
        // Get unique predictions with highest confidence
        const uniquePredictions = []
        const seenClasses = new Set()
        
        for (const pred of mergedPredictions) {
          // Get main class name (before comma)
          const mainClass = pred.className.split(',')[0].trim().toLowerCase()
          
          if (!seenClasses.has(mainClass)) {
            seenClasses.add(mainClass)
            uniquePredictions.push(pred)
            
            // Cap at 15 unique predictions
            if (uniquePredictions.length >= 15) break
          }
        }
        
        // ENHANCEMENT 4: More contextual food detection
        // Add semantic food context to improve matches
        const foodContextKeywords = ['food', 'dish', 'meal', 'ingredient', 'cuisine', 'yemek', 'gıda', 'yiyecek', 'tabak']
        const enhancedPredictions = uniquePredictions.map(pred => {
          // Look for food-related terms in the prediction
          const lowerClassName = pred.className.toLowerCase()
          const hasFoodContext = foodContextKeywords.some(keyword => lowerClassName.includes(keyword))
          
          // Boost probability if it contains food context
          return {
            ...pred,
            probability: hasFoodContext ? Math.min(pred.probability * 1.2, 1.0) : pred.probability
          }
        })
        
        setPredictions(enhancedPredictions)
        
        // Find food in our database with enhanced results
        const foundFood = findFoodInDatabase(enhancedPredictions)
        setRecognizedFood(foundFood)
      } else {
        // Fallback to basic prediction
        setPredictions(originalResult)
        
        const foundFood = findFoodInDatabase(originalResult)
        setRecognizedFood(foundFood)
      }
      
      setIsAnalyzing(false)
    } catch (err) {
      console.error('Identification error:', err)
      setError('Fotoğraf analiz edilirken bir hata oluştu.')
      setIsAnalyzing(false)
    }
  }

  // Turkish food synonyms and categories to improve matching
  const foodSynonyms: Record<string, string[]> = {
    apple: ['elma', 'yeşil elma', 'kırmızı elma', 'green apple', 'red apple'],
    banana: ['muz', 'muzlar'],
    orange: ['portakal', 'mandalina', 'turunç', 'tangerine', 'clementine'],
    bread: ['ekmek', 'somun', 'loaf', 'baguette', 'francala'],
    cheese: ['peynir', 'kaşar', 'beyaz peynir', 'ezine', 'feta'],
    chicken: ['tavuk', 'piliç', 'poultry', 'hen'],
    rice: ['pirinç', 'pilav', 'bulgur'],
    pasta: ['makarna', 'spagetti', 'noodle', 'erişte'],
    pizza: ['pide', 'lahmacun'],
    salad: ['salata', 'yeşillik', 'marul', 'lettuce'],
    yogurt: ['yoğurt', 'ayran', 'kefir'],
    eggs: ['yumurta', 'yumurtalar', 'haşlanmış yumurta', 'boiled egg'],
    fish: ['balık', 'levrek', 'somon', 'hamsi', 'salmon', 'tuna', 'ton balığı'],
    nuts: ['kuruyemiş', 'fındık', 'ceviz', 'badem', 'walnut', 'almond', 'hazelnut'],
    avocado: ['avokado'],
    oats: ['yulaf', 'yulaf ezmesi', 'granola'],
    berries: ['üzüm', 'çilek', 'yaban mersini', 'böğürtlen', 'strawberry', 'blueberry', 'blackberry'],
    lentils: ['mercimek', 'baklagil', 'fasulye', 'nohut', 'beans', 'chickpea'],
    broccoli: ['brokoli', 'karnabahar', 'lahana', 'kale', 'cauliflower'],
    sweet_potato: ['tatlı patates', 'patates'],
    chocolate: ['çikolata', 'bitter çikolata', 'sütlü çikolata', 'dark chocolate'],
    turkey: ['hindi', 'hindi eti'],
    pide: ['pide', 'lahmacun', 'flatbread'],
    baklava: ['baklava', 'tatlı', 'şerbetli tatlı', 'kadayıf'],
    olive: ['zeytin', 'yeşil zeytin', 'siyah zeytin'],
    dolma: ['dolma', 'yaprak sarma', 'sarma', 'zeytinyağlı yaprak sarma', 'stuffed vine leaves'],
    kofte: ['köfte', 'misket köfte', 'izmir köfte', 'meatball', 'köfteler'],
    kebab: ['kebap', 'şiş kebap', 'adana kebap', 'urfa kebap', 'doner', 'döner'],
    manti: ['mantı', 'kayseri mantısı', 'turkish dumplings', 'ravioli'],
    borek: ['börek', 'su böreği', 'peynirli börek', 'patatesli börek', 'ispanaklı börek', 'turkish pastry'],
    pilaf: ['pilav', 'pirinç pilavı', 'bulgur pilavı', 'şehriyeli pilav', 'rice pilaf'],
    cucumber: ['salatalık', 'cucumber', 'hıyar'],
    tomato: ['domates', 'cherry domates', 'roma domates', 'tomatoes'],
    pepper: ['biber', 'kırmızı biber', 'yeşil biber', 'acı biber', 'dolmalık biber', 'bell pepper', 'chili'],
    watermelon: ['karpuz', 'watermelon'],
    grape: ['üzüm', 'yeşil üzüm', 'siyah üzüm', 'kırmızı üzüm', 'grapes'],
    strawberry: ['çilek', 'strawberry', 'çilekler'],
    peach: ['şeftali', 'peach', 'nektarin', 'nectarine'],
    cherry: ['kiraz', 'vişne', 'cherries', 'sour cherry'],
    bulgur: ['bulgur', 'bulgur wheat', 'cracked wheat'],
    lentil_soup: ['mercimek çorbası', 'kırmızı mercimek çorbası', 'lentil soup', 'çorba'],
    eggplant: ['patlıcan', 'eggplant', 'aubergine', 'karnıyarık'],
    artichoke: ['enginar', 'artichoke', 'zeytinyağlı enginar'],
    stuffed_peppers: ['biber dolması', 'dolma biber', 'stuffed peppers', 'zeytinyağlı biber dolması'],
    raki: ['rakı', 'raki', 'turkish raki', 'anise'],
    ayran: ['ayran', 'yogurt drink', 'yoğurt içeceği'],
    simit: ['simit', 'turkish bagel', 'gevrek'],
    imam_bayildi: ['imam bayıldı', 'zeytinyağlı patlıcan', 'patlıcan yemeği', 'stuffed eggplant'],
    menemen: ['menemen', 'turkish scrambled eggs', 'domates yumurta', 'tomato egg'],
    karniyarik: ['karnıyarık', 'etli patlıcan', 'stuffed eggplant with meat'],
    cacik: ['cacık', 'tzatziki', 'yogurt cucumber', 'yoğurtlu salatalık'],
    kabak_mucveri: ['kabak mücveri', 'kabak kızartması', 'zucchini fritters', 'kabak köftesi'],
    kisir: ['kısır', 'bulgur salatası', 'turkish tabbouleh', 'bulgur salad'],
    okra: ['bamya', 'bamya yemeği', 'okra', 'lady finger'],
    spinach: ['ıspanak', 'spinach', 'ispanak yemeği', 'spinach dish'],
    green_beans: ['taze fasulye', 'zeytinyağlı fasulye', 'green beans', 'yeşil fasulye'],
    cauliflower: ['karnabahar', 'cauliflower', 'karnabahar yemeği'],
    leek: ['pırasa', 'leek', 'pırasa yemeği', 'zeytinyağlı pırasa'],
    fig: ['incir', 'fig', 'taze incir', 'kuru incir', 'dried fig'],
    pomegranate: ['nar', 'pomegranate', 'nar suyu', 'nar taneleri'],
    quince: ['ayva', 'quince', 'ayva tatlısı', 'ayva kompostosu'],
    apricot: ['kayısı', 'apricot', 'sarı kayısı', 'kuru kayısı', 'dried apricot'],
    mulberry: ['dut', 'mulberry', 'beyaz dut', 'kara dut', 'white mulberry', 'black mulberry'],
    doner_kebab: ['döner sandviç', 'ekmek arası döner', 'doner sandwich', 'döner kebap'],
    lahmacun: ['lahmacun', 'turkish pizza', 'etli lahmacun', 'meat lahmacun'],
    instant_noodle: ['hazır noodle', 'instant noodle', 'noodle', 'hazır erişte'],
    chips: ['cips', 'chips', 'patates cipsi', 'potato chips', 'kraker'],
    hamburger: ['hamburger', 'cheeseburger', 'peynirli hamburger', 'burger'],
    pogaca: ['poğaça', 'peynirli poğaça', 'pogaca', 'patatesli poğaça'],
    gozleme: ['gözleme', 'peynirli gözleme', 'gozleme', 'ıspanaklı gözleme', 'patatesli gözleme'],
    // New foods
    sarma: ['lahana sarması', 'lahana dolması', 'sarma', 'cabbage rolls', 'stuffed cabbage'],
    kunefe: ['künefe', 'kunafa', 'kadayıf tatlısı', 'peynirli tatlı', 'tel kadayıf'],
    mujver: ['mücver', 'kabak mücveri', 'zucchini fritters', 'kabak köftesi', 'sebze köftesi'],
    piyaz: ['piyaz', 'fasulye piyazı', 'bean salad', 'antalya piyazı', 'soğan salatası'],
    hamsili_pilav: ['hamsili pilav', 'karadeniz pilavı', 'anchovy rice', 'hamsi pilavı', 'balıklı pilav'],
    saksuka: ['şakşuka', 'sakşuka', 'patlıcan yemeği', 'ratatouille', 'zeytinyağlı patlıcan'],
    adana_kebab: ['adana kebap', 'adana kebabı', 'acılı kebap', 'spicy kebab', 'kıyma kebabı'],
    icli_kofte: ['içli köfte', 'içli köfte çiğ köfte', 'kibbeh', 'köfte', 'bulgurlu köfte'],
    lokum: ['lokum', 'turkish delight', 'rahat lokum', 'şekerli lokum', 'lokum tatlısı'],
    kumpir: ['kumpir', 'patates kumpir', 'stuffed potato', 'fırın patates', 'dolgulu patates'],
    simit_tost: ['simit tost', 'simitli tost', 'kaşarlı simit', 'peynirli simit', 'bagel sandwich'],
    tarhana: ['tarhana', 'tarhana çorbası', 'fermented soup', 'tarhanali çorba', 'yoğurtlu çorba'],
    tahin_pekmez: ['tahin pekmez', 'tahin-pekmez', 'tahinli pekmez', 'grape molasses with tahini', 'pekmezli tahin']
  }

  // Find food in our database based on model predictions with improved matching
  const findFoodInDatabase = (predictions: any[]) => {
    interface FoodScore {
      score: number;
      confidence: number;
      matchType: string;
      matchedTerm?: string;
      category?: string;
    }

    // Tahmin skorlarını normalleştirmek için maksimum olasılık değerini al
    const maxProbability = predictions.length > 0 ? predictions[0].probability : 0;
    
    // Daha fazla tahmin terimi üzerinde işlem yap - daha iyi eşleşme için ilk 15'i al
    const predictionsToCheck = predictions.slice(0, 15); 
    
    const foodScores: Record<string, FoodScore> = {};
    const minConfidenceThreshold = 0.015; // Minimum güven eşiği

    // Tahmin terimlerini genişlet - örneğin "red apple" için "red", "apple" ve "red apple" araması yap
    const expandPredictionTerms = (predictionText: string, confidence: number) => {
      const terms = [predictionText.toLowerCase()];
      
      // Terimi boşluklara göre ayır ve her bir parçayı da ekle
      const parts = predictionText.toLowerCase().split(/\s+/);
      if (parts.length > 1) {
        terms.push(...parts);
      }
      
      // İngilizce terimleri Türkçe karşılıklarıyla eşleştir
      // Yaygın meyve, sebze ve gıda isimlerinin Türkçe karşılıkları
      const englishToTurkish: Record<string, string[]> = {
        'apple': ['elma'],
        'orange': ['portakal'],
        'banana': ['muz'],
        'tomato': ['domates'],
        'potato': ['patates'],
        'bread': ['ekmek'],
        'milk': ['süt'],
        'cheese': ['peynir'],
        'meat': ['et'],
        'chicken': ['tavuk'],
        'fish': ['balık'],
        'rice': ['pirinç', 'pilav'],
        'pasta': ['makarna'],
        'cake': ['kek', 'pasta'],
        'chocolate': ['çikolata'],
        'vegetable': ['sebze'],
        'fruit': ['meyve'],
        'yogurt': ['yoğurt'],
        'egg': ['yumurta'],
        'salad': ['salata'],
        'soup': ['çorba'],
        'water': ['su'],
        'juice': ['meyve suyu'],
        'snack': ['atıştırmalık'],
        'candy': ['şeker'],
        'cookie': ['kurabiye', 'bisküvi'],
        'pizza': ['pizza'],
        'hamburger': ['hamburger'],
        'sandwich': ['sandviç'],
        'ice cream': ['dondurma'],
        'dessert': ['tatlı'],
        'olive': ['zeytin'],
        'chips': ['cips'],
        'lemon': ['limon'],
        'grape': ['üzüm'],
        'peach': ['şeftali'],
        'strawberry': ['çilek'],
        'cherry': ['kiraz'],
        'watermelon': ['karpuz'],
        'melon': ['kavun'],
        'pineapple': ['ananas'],
        'plum': ['erik'],
        'fig': ['incir'],
        'date': ['hurma'],
        'cucumber': ['salatalık'],
        'carrot': ['havuç'],
        'corn': ['mısır'],
        'cabbage': ['lahana'],
        'onion': ['soğan'],
        'garlic': ['sarımsak'],
        'pepper': ['biber'],
        'eggplant': ['patlıcan'],
        'beans': ['fasulye'],
        'nuts': ['kuruyemiş'],
        'almond': ['badem'],
        'walnut': ['ceviz'],
        'hazelnut': ['fındık'],
        'pistachio': ['antep fıstığı'],
        'peanut': ['yer fıstığı'],
        'butter': ['tereyağı'],
        'jam': ['reçel'],
        'honey': ['bal'],
        'sugar': ['şeker'],
        'salt': ['tuz'],
        'oil': ['yağ'],
        'vinegar': ['sirke'],
        'spice': ['baharat'],
        'beverage': ['içecek'],
        'coffee': ['kahve'],
        'tea': ['çay'],
        'soda': ['gazoz', 'soda', 'gazlı içecek', 'kola'],  // Combined translations
        'beer': ['bira'],
        'wine': ['şarap'],
        'alcohol': ['alkol'],
        'breakfast': ['kahvaltı'],
        'lunch': ['öğle yemeği'],
        'dinner': ['akşam yemeği'],
        'meal': ['öğün', 'yemek'],
        'vitamin': ['vitamin'],
        'mineral': ['mineral'],
        'protein': ['protein'],
        'carbohydrate': ['karbonhidrat'],
        'fat': ['yağ'],
        'calorie': ['kalori'],
        'healthy': ['sağlıklı'],
        'unhealthy': ['sağlıksız'],
        'organic': ['organik'],
        'processed': ['işlenmiş'],
        'food': ['gıda', 'yiyecek'],
        'packaging': ['ambalaj'],
        'can': ['konserve'],
        'bottle': ['şişe'],
        'bag': ['torba', 'paket'],
        'box': ['kutu'],
        // Packaged food related terms
        'packaged': ['paketli', 'ambalajlı'],
        'instant': ['hazır'],
        'frozen': ['donmuş', 'dondurulmuş'],
        'canned': ['konserve'],
        'slice': ['dilim'],
        'piece': ['parça'],
        'cracker': ['kraker'],
        'wafer': ['gofret'],
        'crisp': ['cips'],
        'cocoa': ['kakao'],
        'cereal': ['mısır gevreği', 'tahıl'],
        'granola': ['granola'],
        'oats': ['yulaf'],
        'marshmallow': ['yumuşak şeker'],
        'gummy': ['jelibon'],
        'brand': ['marka'],
        'package': ['paket'],
        'noodle': ['erişte', 'noodle'],
        // Common brand names
        'nestle': ['nestle'],
        'ülker': ['ülker'],
        'eti': ['eti'],
        'pınar': ['pınar'],
        'banvit': ['banvit'],
        'cola': ['kola'],
        'pepsi': ['pepsi'],
        'fanta': ['fanta'],
        'sprite': ['sprite'],
        'doritos': ['doritos'],
        'ruffles': ['ruffles'],
        'lays': ['lays'],
        'milka': ['milka'],
        'tadelle': ['tadelle'],
        'nutella': ['nutella'],
        'haribo': ['haribo'],
        'knorr': ['knorr'],
        'kelloggs': ['kellogg\'s'],
        'danone': ['danone'],
      };

      // İngilizce terimleri Türkçe karşılıklarıyla genişlet
      parts.forEach(part => {
        if (englishToTurkish[part]) {
          terms.push(...englishToTurkish[part]);
        }
      });
      
      return { terms, confidence };
    };

    // Tüm tahminler için kelimeleri genişlet ve işle
    predictionsToCheck.forEach(prediction => {
      // Tahminin güvenilirliğini normalize et (0-1 arası)
      const normalizedConfidence = prediction.probability / maxProbability;
      
      // Güven eşiğini geçmeyen tahminleri atla
      if (normalizedConfidence < minConfidenceThreshold) return;
      
      // Tahmin terimlerini genişlet
      const { terms, confidence } = expandPredictionTerms(
        prediction.className, 
        normalizedConfidence
      );

      // Her genişletilmiş terim için besin veritabanında arama yap
      terms.forEach(term => {
        // 1. Doğrudan anahtar eşleşmesi ara
        for (const key in combinedFoodDatabase) {
          // Skoru hesaplamak için başlangıç değeri
          let score = 0;
          let matchType = '';
          let matchedTerm = '';

          // Doğrudan anahtar eşleşmesi
          if (key.toLowerCase().includes(term)) {
            score = 100 * confidence;
            matchType = 'direct_key_match';
            matchedTerm = term;
          }
          
          // İsim eşleşmesi (Türkçe)
          else if (combinedFoodDatabase[key].name && combinedFoodDatabase[key].name.toLowerCase().includes(term)) {
            score = 95 * confidence;
            matchType = 'name_match_turkish';
            matchedTerm = term;
          }
          
          // Marka eşleşmesi (market ürünleri için)
          else if (combinedFoodDatabase[key].brand && combinedFoodDatabase[key].brand.toLowerCase().includes(term)) {
            score = 85 * confidence;
            matchType = 'brand_match';
            matchedTerm = term;
          }
          
          // Kategori eşleşmesi
          else if (combinedFoodDatabase[key].category && combinedFoodDatabase[key].category.toLowerCase().includes(term)) {
            score = 70 * confidence;
            matchType = 'category_match';
            matchedTerm = term;
          }
          
          // Eşanlamlı kelime eşleşmesi ara
          else {
            const synonyms = foodSynonyms[key] || [];
            for (const synonym of synonyms) {
              if (synonym.toLowerCase().includes(term) || term.includes(synonym.toLowerCase())) {
                score = 90 * confidence;
                matchType = 'synonym_match';
                matchedTerm = synonym;
                break;
              }
            }
            
            // Market ürünü eşanlamlı kelime eşleşmesi
            if (score === 0 && marketSynonyms[key]) {
              for (const synonym of marketSynonyms[key]) {
                if (synonym.toLowerCase().includes(term) || term.includes(synonym.toLowerCase())) {
                  score = 88 * confidence;
                  matchType = 'market_synonym_match';
                  matchedTerm = synonym;
                  break;
                }
              }
            }
          }
          
          // Kategori bazlı eşleşme
          if (score === 0) {
            for (const category of foodCategories) {
              const categoryTerms = category.terms;
              if (categoryTerms.some((catTerm: string) => catTerm.toLowerCase().includes(term) || term.includes(catTerm.toLowerCase()))) {
                // İlgili kategori içinde mi kontrol et
                if (combinedFoodDatabase[key].category && combinedFoodDatabase[key].category.toLowerCase().includes(category.category.toLowerCase())) {
                  score = 65 * confidence;
                  matchType = 'category_term_match';
                  matchedTerm = term;
                  break;
                }
              }
            }
          }
          
          // Market ürünü kategori eşleşmesi
          if (score === 0) {
            for (const category of marketProductCategories) {
              const categoryTerms = category.terms;
              if (categoryTerms.some((catTerm: string) => catTerm.toLowerCase() === term.toLowerCase())) {
                // İlgili kategori içinde mi kontrol et
                if (combinedFoodDatabase[key].category) {
                  const foodCategory = combinedFoodDatabase[key].category.toLowerCase();
                  const marketCategoryMap: Record<string, string[]> = {
                    'packaged_foods': ['paketli', 'hazır'],
                    'snacks': ['atıştırmalık', 'cips', 'kraker', 'bisküvi'],
                    'beverages': ['içecek', 'kola', 'gazlı'],
                    'dairy_products': ['süt ürünleri', 'yoğurt', 'peynir', 'süt'],
                    'frozen_foods': ['donuk gıda', 'dondurulmuş'],
                    'canned_foods': ['konserve'],
                    'breakfast_items': ['kahvaltılık'],
                    'sweets': ['tatlı', 'çikolata', 'şekerleme'],
                    'cooking_basics': ['temel gıda', 'un', 'yağ', 'şarküteri']
                  };
                  
                  if (marketCategoryMap[category.category] && 
                      marketCategoryMap[category.category].some(mapTerm => foodCategory.includes(mapTerm))) {
                    score = 60 * confidence;
                    matchType = 'market_category_match';
                    matchedTerm = term;
                    break;
                  }
                }
              }
            }
          }

          // Eşleşme varsa skoru güncelle
          if (score > 0) {
            if (!foodScores[key] || score > foodScores[key].score) {
              foodScores[key] = {
                score,
                confidence,
                matchType,
                matchedTerm,
                category: combinedFoodDatabase[key].category,
              };
            }
          }
        }
      });
    });

    // En iyi eşleşmeyi bul
    let bestMatch = null;
    let highestScore = 0;

    for (const key in foodScores) {
      if (foodScores[key].score > highestScore) {
        highestScore = foodScores[key].score;
        bestMatch = key;
      }
    }

    console.log('Eşleşme skorları:', foodScores);
    console.log('En iyi eşleşme:', bestMatch, highestScore);

    // Minimum skor eşiği - eşleşme kalitesini sağlamak için
    const minScoreThreshold = 15;

    if (bestMatch && highestScore >= minScoreThreshold) {
      const foodData = combinedFoodDatabase[bestMatch];
      return {
        id: bestMatch,
        name: foodData.name,
        calories: foodData.calories,
        protein: foodData.protein,
        carbs: foodData.carbs,
        fat: foodData.fat,
        fiber: foodData.fiber || 0,
        healthScore: foodData.healthScore || 5,
        category: foodData.category || '',
        brand: foodData.brand || '',
        recommendations: foodData.recommendations || '',
        image: foodData.image || '',
        matchInfo: foodScores[bestMatch]
      };
    }

    return null;
  };

  // Handle file upload from dropzone
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)
      setPredictions([])
      setRecognizedFood(null)
      setError(null)
      
      // Create an image element for TensorFlow.js
      const img = new window.Image()
      img.src = imageUrl
      img.onload = () => identifyFood(img)
    }
  }, [model])
  
  // Handle manual food entry
  const handleManualFoodSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFoodSaved(false)
    
    if (!manualFoodName.trim()) {
      setError('Lütfen bir besin adı girin')
      return
    }
    
    // Search for food in database
    let foundFood = null
    for (const [key, value] of Object.entries(combinedFoodDatabase)) {
      if (key.toLowerCase().includes(manualFoodName.toLowerCase()) || 
          value.name.toLowerCase().includes(manualFoodName.toLowerCase())) {
        foundFood = value
        break
      }
    }
    
    if (foundFood) {
      // Calculate nutrition based on quantity
      const multiplier = manualFoodQuantity / 100
      setRecognizedFood({
        ...foundFood,
        actualQuantity: manualFoodQuantity,
        calories: Math.round(foundFood.calories * multiplier),
        protein: parseFloat((foundFood.protein * multiplier).toFixed(1)),
        carbs: parseFloat((foundFood.carbs * multiplier).toFixed(1)),
        fat: parseFloat((foundFood.fat * multiplier).toFixed(1)),
        fiber: parseFloat((foundFood.fiber * multiplier).toFixed(1))
      })
      setError(null)
    } else {
      setRecognizedFood({
        name: manualFoodName,
        notFound: true
      })
    }
  }

  // Save food to history (update to handle both photo and manual entry)
  const saveFoodToHistory = () => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    
    if (recognizedFood && !recognizedFood.notFound) {
      const foodQuantity = activeTab === 'photo' ? quantity : manualFoodQuantity;
      
      // Apply quantity adjustment to nutritional values
      const quantityMultiplier = foodQuantity / 100;
      const adjustedCalories = Math.round(recognizedFood.calories * quantityMultiplier);
      const adjustedProtein = parseFloat((recognizedFood.protein * quantityMultiplier).toFixed(1));
      const adjustedCarbs = parseFloat((recognizedFood.carbs * quantityMultiplier).toFixed(1));
      const adjustedFat = parseFloat((recognizedFood.fat * quantityMultiplier).toFixed(1));
      
      const foodItem: FoodHistoryItem = {
        id: uuidv4(),
        name: recognizedFood.name,
        calories: adjustedCalories,
        protein: adjustedProtein, 
        carbs: adjustedCarbs,
        fat: adjustedFat,
        healthScore: recognizedFood.healthScore,
        date: new Date().toISOString(),
        imageUrl: recognizedFood.image,
        quantity: foodQuantity
      }
      
      addFoodHistoryItem(foodItem)
      setFoodSaved(true)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  })

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Yemek Analizi</h1>
        
        {/* Tabs */}
        <div className="mb-6 flex rounded-lg overflow-hidden border border-gray-700">
          <button 
            className={`flex-1 py-3 px-4 text-center transition ${activeTab === 'photo' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('photo')}
          >
            Fotoğraf ile Analiz
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center transition ${activeTab === 'manual' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('manual')}
          >
            Manuel Giriş
          </button>
        </div>
        
        {activeTab === 'photo' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Yemek Fotoğrafı Yükle</h2>
            </div>
            <div className="p-4">
              {!imageUrl ? (
                <div 
                  className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isModelLoading ? (
                    <div className="py-8">
                      <div className="flex justify-center items-center mb-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
                      </div>
                      <p className="text-gray-300">Model yükleniyor...</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl mb-3 text-gray-400">
                        <CameraIcon />
                      </div>
                      <p className="text-gray-300">Bir fotoğraf seçmek için tıklayın veya sürükleyin</p>
                      <p className="text-sm text-gray-500 mt-2">Desteklenen formatlar: JPEG, PNG</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <div className="relative mb-4">
                    <img
                      src={imageUrl}
                      alt="Seçilen fotoğraf"
                      className="w-full h-auto rounded-lg object-cover max-h-96"
                    />
                    <button
                      onClick={() => {
                        setImageUrl(null)
                        setPredictions([])
                        setRecognizedFood(null)
                        setError(null)
                        setFoodSaved(false)
                      }}
                      className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="py-8 text-center">
                      <div className="flex justify-center items-center mb-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
                      </div>
                      <p className="text-gray-300">Fotoğraf analiz ediliyor...</p>
                    </div>
                  ) : (
                    recognizedFood ? (
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex items-start gap-4">
                          {recognizedFood.image && (
                            <div className="flex-shrink-0">
                              <img 
                                src={recognizedFood.image}
                                alt={recognizedFood.name}
                                className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <h3 className="text-xl font-semibold mb-2 text-white">
                              Tespit Edilen Yemek
                              <button 
                                onClick={() => {
                                  // Keep the image but reset the analysis
                                  setPredictions([]);
                                  setRecognizedFood(null);
                                  setError(null);
                                  setFoodSaved(false);
                                }}
                                className="ml-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded"
                              >
                                Yeniden Analiz
                              </button>
                            </h3>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-medium text-gray-200">{recognizedFood.name}</p>
                                <p className="text-sm text-gray-400">
                                  Güven: {Math.round(recognizedFood.matchConfidence * 100)}%
                                  {recognizedFood.matchType && ` (${recognizedFood.matchType})`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-200">{recognizedFood.calories} kcal</p>
                                <p className="text-sm text-gray-400">100g başına</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                          <div>
                            <p className="text-lg font-semibold text-gray-200">{recognizedFood.protein}g</p>
                            <p className="text-xs text-gray-400">Protein</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-200">{recognizedFood.fat}g</p>
                            <p className="text-xs text-gray-400">Yağ</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-200">{recognizedFood.carbs}g</p>
                            <p className="text-xs text-gray-400">Karbonhidrat</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-200">{recognizedFood.fiber}g</p>
                            <p className="text-xs text-gray-400">Lif</p>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex items-center mb-3">
                            <label className="block mr-3 text-gray-300">Miktar (g):</label>
                            <input
                              type="number"
                              value={manualFoodQuantity}
                              onChange={(e) => setManualFoodQuantity(Number(e.target.value))}
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-24 text-right"
                              min="1"
                            />
                          </div>
                          
                          <button
                            onClick={saveFoodToHistory}
                            disabled={foodSaved}
                            className={`w-full py-2 px-4 rounded-lg transition ${
                              foodSaved
                                ? 'bg-green-600 text-white cursor-not-allowed'
                                : 'bg-primary-600 hover:bg-primary-700 text-white'
                            }`}
                          >
                            {foodSaved ? (
                              <span className="flex items-center justify-center">
                                <span className="mr-2"><CheckIcon /></span> Kaydedildi
                              </span>
                            ) : (
                              'Günlüğe Kaydet'
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        {error ? (
                          <div className="text-red-400">{error}</div>
                        ) : (
                          <button
                            onClick={() => {
                              const img = document.querySelector('img') as HTMLImageElement
                              if (img && img.complete) {
                                identifyFood(img)
                              }
                            }}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition-colors"
                          >
                            Yemeği Analiz Et
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
              
              {/* Bottom section with raw predictions */}
              {predictions.length > 0 && !isAnalyzing && (
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-400">Model Tahminleri (Ham Veri)</h3>
                  <div className="bg-gray-900 p-3 rounded-lg text-xs space-y-1 max-h-32 overflow-y-auto font-mono">
                    {predictions.slice(0, 10).map((prediction, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-300">{prediction.className}</span>
                        <span className="text-primary-400">{(prediction.probability * 100).toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'manual' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Manuel Yemek Girişi</h2>
            </div>
            <div className="p-4">
              {!isLoggedIn && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                  <p className="text-blue-700">
                    Besin kaydetmek ve geçmişinizi görmek için
                    <Link href="/login" className="font-bold text-blue-800 underline mx-1">giriş yapın</Link>
                    veya
                    <Link href="/register" className="font-bold text-blue-800 underline mx-1">hesap oluşturun</Link>.
                  </p>
                </div>
              )}

              <form onSubmit={handleManualFoodSearch} className="mb-8">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={manualFoodName}
                    onChange={(e) => setManualFoodName(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Besin adı ile arayın (elma, muz, tavuk, vb.)"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    Ara
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <Link href="/analyze/manual" className="text-primary-600 hover:underline text-sm">
                    Kendi besin değerlerinizi mi girmek istiyorsunuz? Manuel giriş yapın
                  </Link>
                </div>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">
                  {error}
                </div>
              )}
              
              {recognizedFood && activeTab === 'manual' && (
                <div className="mt-6">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-start gap-4">
                      {recognizedFood.image && (
                        <div className="flex-shrink-0">
                          <img 
                            src={recognizedFood.image}
                            alt={recognizedFood.name}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          Yemek Bilgileri
                          <button 
                            onClick={() => {
                              setRecognizedFood(null);
                              setError(null);
                              setFoodSaved(false);
                            }}
                            className="ml-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded"
                          >
                            Yeni Arama
                          </button>
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-medium text-gray-200">{recognizedFood.name}</p>
                            <p className="text-sm text-gray-400">
                              {recognizedFood.matchType && `Eşleşme: ${recognizedFood.matchType}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-200">{recognizedFood.calories} kcal</p>
                            <p className="text-sm text-gray-400">100g başına</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-lg font-semibold text-gray-200">{recognizedFood.protein}g</p>
                        <p className="text-xs text-gray-400">Protein</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-200">{recognizedFood.fat}g</p>
                        <p className="text-xs text-gray-400">Yağ</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-200">{recognizedFood.carbs}g</p>
                        <p className="text-xs text-gray-400">Karbonhidrat</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-200">{recognizedFood.fiber}g</p>
                        <p className="text-xs text-gray-400">Lif</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <label className="block mr-3 text-gray-300">Miktar (g):</label>
                        <input
                          type="number"
                          value={manualFoodQuantity}
                          onChange={(e) => setManualFoodQuantity(Number(e.target.value))}
                          className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-24 text-right"
                          min="1"
                        />
                      </div>
                      
                      <button
                        onClick={saveFoodToHistory}
                        disabled={foodSaved}
                        className={`w-full py-2 px-4 rounded-lg transition ${
                          foodSaved
                            ? 'bg-green-600 text-white cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700 text-white'
                        }`}
                      >
                        {foodSaved ? (
                          <span className="flex items-center justify-center">
                            <span className="mr-2"><CheckIcon /></span> Kaydedildi
                          </span>
                        ) : (
                          'Günlüğe Kaydet'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 