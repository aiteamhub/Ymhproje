import Link from 'next/link'
import Image from 'next/image'

export default function AthleteNutritionPage() {
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

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Sporcu Beslenmesi</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Türk Sporcular İçin Beslenme Rehberi</h2>
          <p className="text-gray-300 mb-4">
            Türk sporcuların beslenme alışkanlıkları, hem geleneksel Türk mutfağının zenginliklerini hem de modern spor beslenmesi prensiplerine dayalı seçimleri içerir. 
            Bu sayfa, farklı spor dallarında başarılı olmanız için ihtiyaç duyduğunuz beslenme bilgilerini sunmaktadır.
          </p>
          <div className="my-6 flex justify-center">
            <Link href="/about/athlete-nutrition/foods" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Sporcu Besinleri Veritabanını Görüntüle
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-primary-400">Sporcu Türlerine Göre Beslenme</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Futbolcular</h4>
                <p className="text-gray-300">
                  Dayanıklılık ve patlayıcı güç gerektiren bir spor olarak futbolcular, karbonhidratları ve kaliteli proteinleri dengeli tüketmelidir. 
                  Maç öncesi tavuk pilav, bulgur pilavı, mercimek çorbası ve zeytinyağlı makarna gibi kompleks karbonhidratlar tercih edilir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Basketbolcular</h4>
                <p className="text-gray-300">
                  Yüksek enerjiye ihtiyaç duyan basketbolcular, zengin protein kaynakları ve kompleks karbonhidratları bir arada tüketirler. 
                  Özellikle hindi eti, tavuk göğsü, bulgur, kinoa ve kuru baklagiller gibi besinler beslenmenin temelini oluşturur.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Güreşçiler</h4>
                <p className="text-gray-300">
                  Kilo kontrolü ve kas kütlesinin korunması önemli olan güreşçiler, özellikle kırmızı et, yoğurt, peynir ve kuru fasulye gibi yüksek proteinli gıdaları tercih ederler.
                  Antrenman dönemi ve müsabaka dönemi beslenmeleri farklılık gösterir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Atletizm Sporuları</h4>
                <p className="text-gray-300">
                  Koşucular, atlayıcılar ve atıcılar için özel beslenme planları gerekir. Özellikle muz, hurma gibi meyveler, tam tahıllı ürünler, tavuk göğsü ve balık atletlerin tercihidir.
                  Yarış öncesi tantuni, tavuk pilav, mercimek çorbası ve kuru üzüm gibi enerji veren besinler tüketilir.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-primary-400">Antrenman Zamanlamasına Göre Beslenme</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Antrenman Öncesi (1-2 saat)</h4>
                <p className="text-gray-300">
                  Kompleks karbonhidratlar ve az miktarda protein içeren besinler tercih edilmelidir. 
                  Tavuk pilav, makarna, bulgur pilavı, muz, kuru meyveler, mercimek çorbası öne çıkar.
                </p>
                <ul className="mt-2 list-disc pl-5 text-gray-300">
                  <li>Tam tahıllı ekmekle yapılmış yumurtalı veya peynirli tost</li>
                  <li>1 porsiyon yulaf ezmesi + muz</li>
                  <li>Zeytinyağlı bulgur pilavı + yoğurt</li>
                  <li>Proteinli ayran + hurma</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white">Antrenman Sonrası (30-60 dakika içinde)</h4>
                <p className="text-gray-300">
                  Kas onarımı için yüksek kaliteli protein ve glikojen depolarını yenilemek için karbonhidrat alımı önemlidir.
                </p>
                <ul className="mt-2 list-disc pl-5 text-gray-300">
                  <li>Protein shake + muz</li>
                  <li>Tavuk göğsü + esmer pirinç</li>
                  <li>Lor peyniri + kuru meyveler + bal</li>
                  <li>Hindi sandviç (tam tahıllı ekmekle)</li>
                  <li>Yumurta + tam tahıllı tost</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Türk Sporcular Arasında Popüler Yemekler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">Tavuk Pilav</h3>
                <p className="text-gray-300 mb-3">
                  Ülkemizde sporcuların en çok tercih ettiği yemeklerin başında gelen tavuk pilav, yüksek protein ve kompleks karbonhidrat içeriğiyle ideal bir öğündür.
                </p>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>Kalori: 300-350 kcal (porsiyon başına)</li>
                    <li>Protein: 22-25g</li>
                    <li>Karbonhidrat: 35-40g</li>
                    <li>Yağ: 6-8g</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">Tantuni</h3>
                <p className="text-gray-300 mb-3">
                  Özellikle müsabaka öncesi hızlı enerji vermesi ve sindiriminin kolay olması nedeniyle sporcular tarafından tercih edilir.
                </p>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>Kalori: 350-400 kcal (porsiyon başına)</li>
                    <li>Protein: 25-30g</li>
                    <li>Karbonhidrat: 18-22g</li>
                    <li>Yağ: 18-22g</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-white">Mercimek Çorbası</h3>
                <p className="text-gray-300 mb-3">
                  Protein ve kompleks karbonhidrat içeriği ile antrenman öncesi ve sonrasında tercih edilen besleyici bir çorba.
                </p>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>Kalori: 150-180 kcal (kase başına)</li>
                    <li>Protein: 9-11g</li>
                    <li>Karbonhidrat: 20-25g</li>
                    <li>Yağ: 2-4g (zeytinyağı eklenmesi durumunda daha yüksek)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Yarışma ve Turnuva Dönemi Beslenmesi</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-400">Yarışma Öncesi (1-3 gün)</h3>
                <p className="text-gray-300 mb-2">
                  Karbonhidrat yüklemesi stratejisi Türk mutfağının zengin karbonhidrat içeriğine sahip yemekleriyle kolayca uygulanabilir:
                </p>
                <ul className="list-disc pl-5 text-gray-300 mb-4">
                  <li>Bulgur pilavı</li>
                  <li>Makarna (tercihen tam buğday)</li>
                  <li>Ekmek (tam tahıllı)</li>
                  <li>Bakliyat yemekleri (mercimek, nohut)</li>
                  <li>Kuru meyveler (kuru üzüm, kayısı)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-400">Yarışma Günü</h3>
                <p className="text-gray-300 mb-2">
                  Sindirim problemi yaratmayan, tanıdık besinler tercih edilmelidir:
                </p>
                <ul className="list-disc pl-5 text-gray-300 mb-4">
                  <li>Yarışmadan 3-4 saat önce: Tavuk pilav, yoğurt</li>
                  <li>Yarışmadan 1-2 saat önce: Muz, kuru üzüm, incir</li>
                  <li>Yarışmadan hemen önce: Hurma, enerji barı</li>
                  <li>Yarışma sırasında: Spor içeceği, enerji jeli</li>
                  <li>Yarışma sonrası: Proteinli içecek + muz, tavuk sandviç</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3 text-primary-400">Turnuva Dönemi Besin Takviyeleri</h3>
              <p className="text-gray-300 mb-2">
                Uzman gözetiminde alınması gereken bazı takviyeler:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Protein Takviyeleri</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Whey protein</li>
                    <li>Kazein protein</li>
                    <li>BCAA (dallı zincirli amino asitler)</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Performans Destekleyiciler</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Kreatin</li>
                    <li>Beta-alanin</li>
                    <li>Kafein</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Genel Sağlık</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Multivitamin</li>
                    <li>Magnezyum</li>
                    <li>D Vitamini</li>
                    <li>Omega-3</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Sporcu Beslenmesi Önerileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-primary-400">Makro Besin Öğeleri Dağılımı</h3>
              <p className="text-gray-300 mb-2">Spor türüne göre günlük makro besin öğeleri dağılımı:</p>
              
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Dayanıklılık Sporları</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Karbonhidrat: 6-10 g/kg vücut ağırlığı</li>
                    <li>Protein: 1.2-1.6 g/kg vücut ağırlığı</li>
                    <li>Yağ: Toplam kalorinin %20-30'u</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Güç Sporları</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Karbonhidrat: 4-7 g/kg vücut ağırlığı</li>
                    <li>Protein: 1.6-2.0 g/kg vücut ağırlığı</li>
                    <li>Yağ: Toplam kalorinin %25-35'i</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Takım Sporları</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Karbonhidrat: 5-8 g/kg vücut ağırlığı</li>
                    <li>Protein: 1.4-1.8 g/kg vücut ağırlığı</li>
                    <li>Yağ: Toplam kalorinin %25-30'u</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-primary-400">Sıvı Tüketimi ve Hidrasyon</h3>
              <p className="text-gray-300 mb-2">Sporcular için sıvı tüketimi rehberi:</p>
              
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Egzersiz Öncesi</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Egzersizden 2-3 saat önce: 400-600 ml su</li>
                    <li>Egzersizden 15-30 dk önce: 200-300 ml su</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Egzersiz Sırasında</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Her 15-20 dk'da bir: 150-250 ml su veya spor içeceği</li>
                    <li>1 saatten uzun egzersizlerde: Elektrolitli spor içecekleri tercih edilmeli</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Egzersiz Sonrası</h4>
                  <ul className="list-disc pl-5 text-gray-300">
                    <li>Kaybedilen her 1 kg için: 1.25-1.5 litre sıvı</li>
                    <li>İdeal içecekler: Su, ayran, mineralli su, hindistan cevizi suyu</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg mt-4 border-l-4 border-primary-500">
                  <p className="text-gray-200">
                    <strong className="text-primary-400">Not:</strong> Hidrasyon durumunu idrar rengine bakarak kontrol edebilirsiniz. Açık sarı renk ideal hidrasyon göstergesidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/about/athlete-nutrition/foods" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg mx-auto inline-block transition-colors">
            Tüm Sporcu Besinleri Veritabanına Göz At
          </Link>
          <p className="mt-4 text-gray-400">
            Daha fazla bilgi ve kişiselleştirilmiş beslenme planı için bir spor diyetisyenine danışmanızı öneririz.
          </p>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-12 border-t border-gray-700">
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
                <li><Link href="/about/athlete-nutrition/foods" className="text-gray-300 hover:text-primary-400 transition-colors">Sporcu Besinleri</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Besin Tanıma Uygulaması. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 