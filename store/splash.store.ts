import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SplashState = {
  isSplashShown: boolean
  markSplashShown: () => void
}

export const useSplashStore = create<SplashState>()(
  persist(
    (set) => ({
      isSplashShown: false,
      markSplashShown: () => set({ isSplashShown: true }),
    }),
    {
      name: 'app-splash-storage', // AsyncStorage key
    }
  )
)
