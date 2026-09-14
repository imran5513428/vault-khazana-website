/* ============================================
   VAULT KHAZANA - CART STORE
   Zustand State Management
   ============================================ */

import create from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // ===== STATE =====
      items: [],

      // ===== ACTIONS =====

      // Add item to cart
      addToCart: (productId, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId);
          
          if (existingItem) {
            // Update quantity if item already in cart
            return {
              items: state.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            // Add new item to cart
            return {
              items: [...state.items, { productId, quantity }]
            };
          }
        });
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove if quantity is 0 or less
            return {
              items: state.items.filter(item => item.productId !== productId)
            };
          }
          
          return {
            items: state.items.map(item =>
              item.productId === productId
                ? { ...item, quantity }
                : item
            )
          };
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // ===== GETTERS =====

      // Get total number of items in cart
      getCartCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get total price of cart
      getCartTotal: () => {
        const state = get();
        // This will be calculated in the component using product data
        return 0; // Placeholder
      },

      // Check if product is in cart
      isInCart: (productId) => {
        const state = get();
        return state.items.some(item => item.productId === productId);
      },

      // Get quantity of specific product
      getQuantity: (productId) => {
        const state = get();
        const item = state.items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
      },

      // Get all cart items
      getItems: () => {
        return get().items;
      }
    }),
    {
      name: 'vault-khazana-cart', // localStorage key
      partialize: (state) => ({ items: state.items }) // Only persist items
    }
  )
);

export default useCartStore;
