import Link from 'next/link'

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Kullanım Koşulları</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Bu Kullanım Koşulları, Besin Tanıma Uygulaması'nı ("Uygulama") kullanımınızı yönetmektedir. 
              Uygulamayı kullanarak, bu koşulları tam olarak kabul etmiş sayılırsınız. Bu koşulları kabul 
              etmiyorsanız, lütfen Uygulamayı kullanmayınız.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Kullanım Lisansı</h2>
            <p>
              Size, Uygulama üzerinde kişisel ve ticari olmayan kullanım için sınırlı, geri alınabilir, 
              münhasır olmayan, devredilemez bir lisans verilmektedir. Bu lisans, Uygulamanın kaynak kodunu 
              değiştirme, kopyalama, dağıtma, satma, kiralama veya alt lisanslama hakkını içermez.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Hesap Kaydı</h2>
            <p>
              Uygulamanın bazı özelliklerini kullanabilmek için bir hesap oluşturmanız gerekebilir. 
              Hesap bilgilerinizi doğru, güncel ve eksiksiz tutmak sizin sorumluluğunuzdadır. 
              Hesap güvenliğinizi korumak ve şifrenizi gizli tutmak sizin sorumluluğunuzdadır. 
              Hesabınız altında gerçekleşen tüm aktivitelerden siz sorumlusunuz.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Kullanıcı İçeriği</h2>
            <p>
              Uygulamamıza yüklediğiniz besin fotoğrafları ve diğer içerikler ("Kullanıcı İçeriği") 
              sizin mülkiyetinizde kalır. Ancak, bu içeriği Uygulamamıza yükleyerek, bize ve iş ortaklarımıza, 
              Uygulamamızı sağlamak ve geliştirmek amacıyla bu içeriği kullanma, depolama ve işleme hakkı vermiş olursunuz.
            </p>
            <p>
              Kullanıcı İçeriğinizin yasalara uygun olduğundan, başkalarının haklarını ihlal etmediğinden ve 
              Uygulamamızın itibarına zarar vermediğinden emin olmak sizin sorumluluğunuzdadır.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Kısıtlamalar</h2>
            <p>Aşağıdaki durumlarda Uygulamayı kullanamazsınız:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Yasalara aykırı bir şekilde veya yasadışı amaçlar için.</li>
              <li>Başkalarının haklarını ihlal etmek için.</li>
              <li>Zararlı, aldatıcı, yanıltıcı veya saldırgan içerik göndermek için.</li>
              <li>Virüs veya diğer zararlı kodları yaymak için.</li>
              <li>Uygulamanın güvenliğini veya bütünlüğünü tehlikeye atmak için.</li>
              <li>Uygulamayı ters mühendislik yapmak, kaynak kodunu çıkarmak veya değiştirmek için.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Hizmet Değişiklikleri</h2>
            <p>
              Herhangi bir zamanda, herhangi bir nedenle Uygulamayı veya Uygulamanın herhangi bir özelliğini 
              değiştirme, askıya alma veya sonlandırma hakkını saklı tutarız. Böyle bir durumda size karşı 
              sorumlu olmayacağız.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Sorumluluk Reddi</h2>
            <p>
              Uygulama "olduğu gibi" ve "mevcut olduğu şekliyle" sunulmaktadır. 
              Uygulamanın her zaman güvenli, kesintisiz, zamanlı veya hatasız olacağını garanti etmiyoruz.
            </p>
            <p>
              Besin tanıma ve besin değerleri analizi yaklaşık değerlerdir ve tam doğruluk garanti edilmez. 
              Besin tanıma sonuçlarını kritik sağlık kararları için kullanmayın ve her zaman bir sağlık uzmanına danışın.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Sorumluluk Sınırlaması</h2>
            <p>
              Uygulamanın kullanımından kaynaklanan herhangi bir doğrudan, dolaylı, tesadüfi, özel, cezai 
              veya sonuç olarak ortaya çıkan zararlardan, bu tür zarar olasılığı hakkında bilgilendirilmiş 
              olsak bile sorumlu olmayacağız.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. Tazminat</h2>
            <p>
              Kullanım Koşullarını ihlal etmenizden, Kullanıcı İçeriğinizden veya Uygulamayı kullanımınızdan 
              kaynaklanan herhangi bir talep, dava, yükümlülük, zarar, kayıp veya masrafa karşı bizi, 
              yöneticilerimizi, çalışanlarımızı ve temsilcilerimizi savunmayı, tazmin etmeyi ve zarar görmemelerini 
              sağlamayı kabul edersiniz.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. Geçerli Hukuk</h2>
            <p>
              Bu Kullanım Koşulları, Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanacaktır. 
              Bu Kullanım Koşullarından kaynaklanan herhangi bir anlaşmazlık, Türkiye'deki yetkili mahkemelerin 
              münhasır yargı yetkisine tabi olacaktır.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. Değişiklikler</h2>
            <p>
              Bu Kullanım Koşullarını herhangi bir zamanda güncelleme hakkını saklı tutarız. 
              Değişiklikler, Uygulamamızda yayınlandıktan sonra yürürlüğe girecektir. 
              Değişikliklerden sonra Uygulamayı kullanmaya devam etmeniz, güncellenmiş Kullanım Koşullarını 
              kabul ettiğiniz anlamına gelir.
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">11. İletişim</h2>
            <p>
              Bu Kullanım Koşulları hakkında sorularınız varsa, lütfen
              <a href="mailto:terms@besintanima.com" className="text-primary-600 hover:text-primary-800"> terms@besintanima.com </a>
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