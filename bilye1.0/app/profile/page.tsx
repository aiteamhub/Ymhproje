'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../store/userStore'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoggedIn, foodHistory, removeFoodHistoryItem } = useUserStore()
  const [activeTab, setActiveTab] = useState('history') // 'history' or 'settings'
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])
  
  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  if (!isLoggedIn || !user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Besin Tanıma</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/analyze" className="hover:underline">Besin Analizi</Link></li>
              <li><Link href="/profile" className="hover:underline font-bold">Profilim</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-primary-100 rounded-full p-4 mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.displayName || 'Kullanıcı'}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-lg font-medium ${
                  activeTab === 'history'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Yemek Geçmişim
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 text-lg font-medium ${
                  activeTab === 'settings'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profil Ayarları
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Beslenme Geçmişi</h2>
                
                {foodHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-gray-600 mb-4">Henüz kaydedilmiş besin bulunmuyor.</p>
                    <Link href="/analyze" className="btn-primary">
                      Besin Analizi Yap
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {foodHistory.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 relative">
                        <button 
                          onClick={() => removeFoodHistoryItem(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          aria-label="Sil"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="flex">
                          {item.imageUrl && (
                            <div className="relative h-20 w-20 rounded-md overflow-hidden mr-4">
                              <Image 
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {item.healthScore}/10
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">{formatDate(item.date)}</p>
                            <div className="flex space-x-3 text-sm">
                              <span>{item.calories} kcal</span>
                              <span>{item.protein}g protein</span>
                              <span>{item.carbs}g karb</span>
                              <span>{item.fat}g yağ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profil Ayarları</h2>
                <p className="text-gray-600 mb-8">Bu bölüm geliştirme aşamasındadır.</p>
                
                <button 
                  onClick={() => useUserStore.getState().logout()}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 