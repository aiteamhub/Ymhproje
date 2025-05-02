'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Besin Tanıma</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/analyze" className="hover:underline">Besin Analizi</Link></li>
              <li><Link href="/about" className="hover:underline">Hakkımızda</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">İletişim</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Teşekkürler!</h2>
              <p className="text-gray-600 mb-6">Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.</p>
              <button 
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  })
                }}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-gray-600">
                Sorularınız veya önerileriniz için aşağıdaki formu kullanarak bizimle iletişime geçebilirsiniz. 
                En kısa sürede size geri dönüş yapacağız.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-posta Adresiniz</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Konu</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    disabled={isLoading}
                  >
                    <option value="">Konu Seçin</option>
                    <option value="general">Genel Bilgi</option>
                    <option value="support">Teknik Destek</option>
                    <option value="feedback">Geri Bildirim</option>
                    <option value="partnership">İş Birliği</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field"
                    disabled={isLoading}
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-primary px-8"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      'Mesajı Gönder'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Adres</h2>
            <p className="text-gray-600">
              Örnek Mahallesi, Teknoloji Caddesi<br />
              No:123, Kat:5<br />
              34000 İstanbul, Türkiye
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">İletişim Bilgileri</h2>
            <p className="text-gray-600 mb-2">
              <strong>E-posta:</strong> info@besintanima.com
            </p>
            <p className="text-gray-600">
              <strong>Telefon:</strong> +90 212 123 45 67
            </p>
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