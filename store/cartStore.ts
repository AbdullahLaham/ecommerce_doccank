
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}



type CartStore = {
  items: CartItem[]
  lastSyncedAt: number | null


  addItem: (item: CartItem) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  removeItem: (id: string) => void

  clearCart: () => void
  setItems: (items: CartItem[]) => void


  subtotal: () => number
  getTotalItems: () => number

  shippingCost: () => number   // 👈 جديد
  totalWithShipping: () => number // 👈 اختياري 🔥

  // syncCart: () => Promise<void>
}



export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastSyncedAt: null,

      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      increaseQty: id =>
        set(state => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decreaseQty: id =>
        set(state => ({
          items: state.items
            .map(i =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter(i => i.quantity > 0),
        })),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),



      removeItem: id =>
        set(state => ({
          items: state.items.filter(i => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      setItems: items => set({ items }),


      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      /* ---------- API Sync ---------- */

      // syncCart: async () => {
      //   try {
      //     const { items } = get()

      //     // 🛑 skip sync if cart empty
      //     if (!items.length) return

      //     await fetch('https://your-api.com/cart/sync', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: 'Bearer USER_TOKEN', // replace dynamically
      //       },
      //       body: JSON.stringify({
      //         items: items.map(i => ({
      //           product_id: i.id,
      //           quantity: i.quantity,
      //         })),
      //       }),
      //     })

      //     set({ lastSyncedAt: Date.now() })
      //   } catch (error) {
      //     console.log('Cart sync failed', error)
      //   }
      // },

      shippingCost: () => {
        const itemTypesCount = get().items.length

        if (itemTypesCount === 0) return 0
        if (itemTypesCount <= 3) return 25

        return 25 + (itemTypesCount - 3) * 5
      },

      totalWithShipping: () => {
        return get().subtotal() + get().shippingCost()
      },

    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
