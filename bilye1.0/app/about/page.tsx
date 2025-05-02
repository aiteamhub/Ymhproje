import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Besin Tanıma</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/analyze" className="hover:underline">Besin Analizi</Link></li>
              <li><Link href="/login" className="hover:underline">Giriş Yap</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Uygulama Hakkında</h2>
          <p className="mb-4">
            Besin Tanıma Uygulaması, kullanıcıların fotoğraf yükleyerek besinleri tanımasını ve besin değerlerini öğrenmesini 
            sağlayan modern bir web uygulamasıdır. Yapay zeka teknolojilerini kullanarak fotoğraflardaki yiyecekleri tanır ve 
            detaylı besin değerleri sunar.
          </p>
          <p className="mb-4">
            Amacımız, kullanıcıların daha bilinçli beslenme alışkanlıkları geliştirmesine yardımcı olmak ve sağlıklı beslenme 
            konusunda farkındalık yaratmaktır. Uygulamamız sayesinde, yediğiniz besinlerin kalori, protein, yağ, karbonhidrat ve 
            lif değerlerini kolayca öğrenebilirsiniz.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Teknolojilerimiz</h2>
          <p className="mb-4">
            Besin Tanıma Uygulaması, modern web teknolojileri ve yapay zeka çözümleri kullanılarak geliştirilmiştir:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Frontend:</strong> Next.js, React, TypeScript ve Tailwind CSS</li>
            <li><strong>Yapay Zeka:</strong> TensorFlow.js ve MobileNet modeli</li>
            <li><strong>Kimlik Doğrulama:</strong> Firebase Authentication</li>
            <li><strong>Veritabanı:</strong> Firebase Firestore</li>
            <li><strong>Depolama:</strong> Firebase Storage</li>
          </ul>
          <p>
            Özellikle yapay zeka modelimiz, çeşitli besinleri tanımak için eğitilmiş ve sürekli olarak geliştirilmektedir.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
          <p className="mb-4">
            Vizyonumuz, teknoloji ve yapay zeka çözümlerini kullanarak insanların daha sağlıklı beslenme alışkanlıkları 
            edinmesine yardımcı olmaktır. Gelecekte, daha fazla özellik ekleyerek uygulamamızı geliştirmeyi hedefliyoruz:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Kişiselleştirilmiş beslenme önerileri</li>
            <li>Diyet planlama özellikleri</li>
            <li>Beslenme uzmanlarıyla iletişim imkanı</li>
            <li>Besin tarama ve barkod okuma özellikleri</li>
            <li>Mobil uygulama versiyonu</li>
          </ul>
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Özel İçeriklerimiz</h3>
            <ul className="list-disc pl-6">
              <li><Link href="/about/athlete-nutrition" className="text-blue-600 hover:underline">Türk Sporcuların Beslenme Alışkanlıkları</Link> - Türkiye'deki elit sporcuların beslenme düzenleri ve tercih ettikleri yemekler hakkında detaylı bilgiler.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Besin Tanıma</h3>
              <p>Fotoğraftan besinleri tanıyan ve besin değerlerini gösteren web uygulaması.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Bağlantılar</h4>
              <ul className="space-y-1">
                <li><Link href="/" className="hover:underline">Ana Sayfa</Link></li>
                <li><Link href="/analyze" className="hover:underline">Besin Analizi</Link></li>
                <li><Link href="/about" className="hover:underline">Hakkımızda</Link></li>
                <li><Link href="/contact" className="hover:underline">İletişim</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} Besin Tanıma Uygulaması. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 