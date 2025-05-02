import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Besin Tanıma</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/analyze" className="hover:underline">Besin Analizi</Link></li>
              <li><Link href="/about" className="hover:underline">Hakkımızda</Link></li>
              <li><Link href="/contact" className="hover:underline">İletişim</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Gizlilik Politikası</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Bu Gizlilik Politikası, Besin Tanıma Uygulaması ("biz", "bizim" veya "uygulamamız") tarafından 
              toplanan, kullanılan ve paylaşılan bilgileri açıklamaktadır. Uygulamamızı kullanarak, 
              bu politikada belirtilen uygulamaları kabul etmiş olursunuz.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Topladığımız Bilgiler</h2>
            <p>Aşağıdaki bilgileri toplayabiliriz:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Kişisel Bilgiler:</strong> Ad, e-posta adresi ve profil fotoğrafı gibi hesap oluşturma sırasında sağladığınız bilgiler.</li>
              <li><strong>Kullanım Verileri:</strong> Uygulamamızı nasıl kullandığınıza dair bilgiler (analiz ettiğiniz yiyecekler, kullanım sıklığı, vb.).</li>
              <li><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi gibi cihazınızla ilgili teknik bilgiler.</li>
              <li><strong>Fotoğraflar:</strong> Analiz için yüklediğiniz yemek fotoğrafları.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Bilgilerin Kullanımı</h2>
            <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Hesabınızı oluşturmak ve yönetmek.</li>
              <li>Besin tanıma ve analiz hizmetlerimizi sağlamak.</li>
              <li>Uygulamamızı ve özelliklerini geliştirmek.</li>
              <li>Size kişiselleştirilmiş içerik ve öneriler sunmak.</li>
              <li>Teknik sorunları gidermek ve güvenliği sağlamak.</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Bilgi Paylaşımı</h2>
            <p>Bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Hizmet Sağlayıcılar:</strong> Uygulamamızı işletmemize yardımcı olan güvenilir üçüncü taraf hizmet sağlayıcılarla.</li>
              <li><strong>Yasal Gereklilikler:</strong> Yasal bir yükümlülüğe uymak, yasal hakları korumak veya yasadışı faaliyetleri önlemek için gerekli olduğunda.</li>
              <li><strong>İş Transferleri:</strong> Bir birleşme, satın alma veya varlık satışı durumunda, verileriniz transfer edilen varlıklar arasında olabilir.</li>
              <li><strong>İzninizle:</strong> Sizin açık izniniz olduğunda.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Veri Güvenliği</h2>
            <p>
              Bilgilerinizin güvenliğini korumak için uygun teknik ve organizasyonel önlemleri alıyoruz. 
              Ancak, internet üzerinden hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını unutmayın.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Verilerinize Erişim ve Kontrol</h2>
            <p>Hesap ayarlarınız üzerinden kişisel bilgilerinize erişebilir, düzeltebilir, güncelleme yapabilir veya silebilirsiniz. Ayrıca:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Hesabınızı tamamen silmeyi talep edebilirsiniz.</li>
              <li>Veri toplama ve kullanımı hakkında daha fazla bilgi isteyebilirsiniz.</li>
              <li>Verilerinizin kullanımını kısıtlamamızı talep edebilirsiniz.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Çocukların Gizliliği</h2>
            <p>
              Uygulamamız 13 yaşın altındaki çocuklara yönelik değildir. Bilerek 13 yaşın altındaki çocuklardan 
              kişisel bilgi toplamıyoruz. Eğer 13 yaşın altında bir çocuktan bilgi topladığımızı öğrenirsek, 
              bu bilgileri hemen silmeye çalışırız.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Politika Değişiklikleri</h2>
            <p>
              Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Politikadaki önemli değişiklikler 
              hakkında sizi bilgilendireceğiz ve güncellenmiş politikanın bir kopyasını web sitemizde yayınlayacağız.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. İletişim</h2>
            <p>
              Bu Gizlilik Politikası hakkında sorularınız veya endişeleriniz varsa, lütfen 
              <a href="mailto:privacy@besintanima.com" className="text-primary-600 hover:text-primary-800"> privacy@besintanima.com </a> 
              adresinden bizimle iletişime geçin.
            </p>
            
            <div className="mt-8 text-gray-600">
              <p>Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-12">
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
                <li><Link href="/privacy" className="hover:underline">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:underline">Kullanım Koşulları</Link></li>
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