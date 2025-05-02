import Link from 'next/link';

export default function ManualEntryPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Manuel Besin Değeri Girişi</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white">Besin Bilgilerini Girin</h2>
            <p className="mb-6 text-gray-300">
              Besin değerlerini manuel olarak girmek için aşağıdaki formu doldurun. Bilgileri girdiğinizde, 
              bu besin profilinize kaydedilecek ve diğer besinlerle karşılaştırma yapabileceksiniz.
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="foodName" className="block mb-2 font-medium text-gray-200">Besin Adı</label>
                <input 
                  type="text" 
                  id="foodName" 
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                  placeholder="Ör: Tavuk Göğsü, Mercimek Çorbası, vb."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="portion" className="block mb-2 font-medium text-gray-200">Porsiyon Miktarı</label>
                  <div className="flex">
                    <input 
                      type="number" 
                      id="portion" 
                      className="w-2/3 p-3 border border-gray-600 bg-gray-700 text-white rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                      placeholder="100"
                    />
                    <select className="w-1/3 p-3 border border-gray-600 bg-gray-700 text-white rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:outline-none border-l-0">
                      <option>gram</option>
                      <option>ml</option>
                      <option>adet</option>
                      <option>porsiyon</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-2 font-medium text-gray-200">Kategori</label>
                  <select 
                    id="category" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    <option>Protein Kaynakları</option>
                    <option>Bitkisel Proteinler</option>
                    <option>Kompleks Karbonhidratlar</option>
                    <option>Sağlıklı Yağlar</option>
                    <option>Meyveler</option>
                    <option>Sebzeler</option>
                    <option>İçecekler</option>
                    <option>Atıştırmalıklar</option>
                    <option>Geleneksel Yemekler</option>
                    <option>Takviyeler</option>
                    <option>Diğer</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="calories" className="block mb-2 font-medium text-gray-200">Kalori (kcal)</label>
                  <input 
                    type="number" 
                    id="calories" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 165"
                  />
                </div>
                
                <div>
                  <label htmlFor="protein" className="block mb-2 font-medium text-gray-200">Protein (g)</label>
                  <input 
                    type="number" 
                    id="protein" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 31"
                  />
                </div>
                
                <div>
                  <label htmlFor="carbs" className="block mb-2 font-medium text-gray-200">Karbonhidrat (g)</label>
                  <input 
                    type="number" 
                    id="carbs" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 0"
                  />
                </div>
                
                <div>
                  <label htmlFor="fat" className="block mb-2 font-medium text-gray-200">Yağ (g)</label>
                  <input 
                    type="number" 
                    id="fat" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 3.6"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="fiber" className="block mb-2 font-medium text-gray-200">Lif (g)</label>
                  <input 
                    type="number" 
                    id="fiber" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 0"
                  />
                </div>
                
                <div>
                  <label htmlFor="sugar" className="block mb-2 font-medium text-gray-200">Şeker (g)</label>
                  <input 
                    type="number" 
                    id="sugar" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 0"
                  />
                </div>
                
                <div>
                  <label htmlFor="sodium" className="block mb-2 font-medium text-gray-200">Sodyum (mg)</label>
                  <input 
                    type="number" 
                    id="sodium" 
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                    placeholder="Ör: 80"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block mb-2 font-medium text-gray-200">Besin Hakkında Not</label>
                <textarea 
                  id="description" 
                  rows={3}
                  className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                  placeholder="Bu besin hakkında ek bilgiler ekleyin..."
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition"
                >
                  Besin Değerlerini Kaydet
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-blue-900/30 border-l-4 border-blue-600 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Önerilen Besinler</h3>
            <p className="text-gray-300 mb-4">
              Sporcu beslenmesi için önerilen 100 besinin besin değerlerini görmek için 
              <Link href="/about/athlete-nutrition/foods" className="font-bold text-blue-300 underline ml-1 hover:text-blue-200">buraya tıklayın</Link>.
            </p>
            <p className="text-gray-300">
              Bu besini günlük beslenme planınıza eklemek istiyorsanız, lütfen
              <Link href="/login" className="font-bold text-blue-300 underline mx-1 hover:text-blue-200">giriş yapın</Link>
              veya
              <Link href="/register" className="font-bold text-blue-300 underline mx-1 hover:text-blue-200">hesap oluşturun</Link>.
            </p>
          </div>
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