import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900">
      <header className="w-full bg-gray-800 text-white py-4 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Besin Tanıma</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/login" className="hover:text-primary-400 transition-colors">Giriş Yap</Link></li>
              <li><Link href="/register" className="hover:text-primary-400 transition-colors">Kayıt Ol</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Besinleri Tanıyın, Beslenmenizi Geliştirin</h2>
          <p className="text-lg mb-6 text-gray-300">
            Fotoğraf yükleyerek besinleri tanıyın, besin değerlerini öğrenin ve 
            sağlıklı beslenme için öneriler alın.
          </p>
          <Link href="/analyze" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block">
            Hemen Deneyin
          </Link>
        </div>
        <div className="md:w-1/2 relative h-80">
          <Image 
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
            alt="Sağlıklı yemek fotoğrafı"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="w-full py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
              <div className="text-primary-400 text-4xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Fotoğraf Yükleyin</h3>
              <p className="text-gray-300">Yemeğinizin fotoğrafını çekin veya galeriden yükleyin.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
              <div className="text-primary-400 text-4xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Yapay Zeka Tanır</h3>
              <p className="text-gray-300">Gelişmiş yapay zeka modelimiz fotoğraftaki besinleri tanır.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
              <div className="text-primary-400 text-4xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Besin Değerlerini Görün</h3>
              <p className="text-gray-300">Kalori, protein, karbonhidrat ve diğer besin değerlerini öğrenin.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-gray-800 border border-primary-700 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Besin Tanıma</h3>
                <p className="text-gray-300">Yapay zeka ile fotoğraftaki besinleri doğru şekilde tanıyoruz.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 border border-primary-700 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Detaylı Besin Değerleri</h3>
                <p className="text-gray-300">Kalori, protein, yağ, karbonhidrat, lif, vitamin ve mineral bilgileri.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 border border-primary-700 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Sağlık Puanlaması</h3>
                <p className="text-gray-300">Besinlerin sağlık puanlarını görerek daha bilinçli tercihler yapın.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 border border-primary-700 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Beslenme Geçmişi</h3>
                <p className="text-gray-300">Tükettiğiniz besinleri kaydedin ve beslenme alışkanlıklarınızı analiz edin.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-800 border border-primary-700 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href="/about/athlete-nutrition" className="text-primary-400 hover:text-primary-300 transition-colors">Sporcu Beslenmesi</Link>
                </h3>
                <p className="text-gray-300 mb-2">Türk sporcuların beslenme alışkanlıkları ve performans için önerilen besinler hakkında özel içerikler.</p>
                <Link href="/about/athlete-nutrition/foods" className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center">
                  100 Sporcu Besini ve Besin Değerleri
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-gray-800 text-white py-8 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Besin Tanıma</h2>
              <p className="text-gray-300">Fotoğraftan besinleri tanıyan ve besin değerlerini gösteren web uygulaması.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Bağlantılar</h3>
              <ul className="space-y-1">
                <li><Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">Hakkımızda</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-primary-400 transition-colors">Kullanım Koşulları</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">İletişim</Link></li>
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