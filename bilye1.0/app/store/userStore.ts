import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FoodHistoryItem = {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  healthScore: number
  date: string
  imageUrl?: string
  quantity?: number
}

type UserState = {
  user: {
    uid: string
    displayName: string | null
    email: string | null
    photoURL: string | null
  } | null
  isLoggedIn: boolean
  foodHistory: FoodHistoryItem[]
  
  // Actions
  setUser: (user: UserState['user']) => void
  logout: () => void
  addFoodHistoryItem: (item: FoodHistoryItem) => void
  removeFoodHistoryItem: (id: string) => void
  clearFoodHistory: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      foodHistory: [],
      
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      
      logout: () => set({ user: null, isLoggedIn: false }),
      
      addFoodHistoryItem: (item) => 
        set((state) => ({ 
          foodHistory: [item, ...state.foodHistory] 
        })),
      
      removeFoodHistoryItem: (id) => 
        set((state) => ({ 
          foodHistory: state.foodHistory.filter(item => item.id !== id) 
        })),
      
      clearFoodHistory: () => set({ foodHistory: [] }),
    }),
    {
      name: 'food-recognition-user-storage',
    }
  )
) 