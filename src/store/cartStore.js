/* ============================================
   VAULT KHAZANA - CART STORE
   Zustand State Management
   ============================================ */

import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById } from '../data/products';

/*
  Get the selling rules for a product.
*/
const getProductRules = (product) => {
  if (!product) return null;

  return {
    sellingUnit: product.sellingUnit || 'piece',
    moq: Number(product.moq) || 1,
    step: Number(product.step) || 1,
    packSize: product.packSize ? Number(product.packSize) : null,
    pricePerUnit: Number(product.pricePerUnit) || 0
  };
};

/*
  Check whether a quantity follows the product's
  MOQ and step rules.

  Example:
  MOQ 50 + step 25
  Valid: 50, 75, 100, 125...
  Invalid: 51, 52, 74, 76...
*/
const isValidQuantity = (quantity, rules) => {
  if (!rules) return false;

  const qty = Number(quantity);

  if (!Number.isInteger(qty)) return false;
  if (qty < rules.moq) return false;

  return (qty - rules.moq) % rules.step === 0;
};

/*
  Return a useful error message for an invalid quantity.
*/
const getQuantityError = (rules) => {
  if (!rules) {
    return 'This product is not available.';
  }

  if (rules.sellingUnit === 'kg') {
    return `Minimum order is ${rules.moq} kg.`;
  }

  if (rules.sellingUnit === 'pack') {
    return `Minimum order is ${rules.moq} pack${rules.moq === 1 ? '' : 's'}.`;
  }

  if (rules.step > 1) {
    return `Please select quantities in steps of ${rules.step}, starting from ${rules.moq}.`;
  }

  return `Minimum order quantity is ${rules.moq}.`;
};

/*
  Sanitize persisted cart items.

  This protects the cart if old or invalid quantities
  already exist in localStorage.
*/
const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const product = getProductById(item?.productId);

      if (!product) return null;

      const rules = getProductRules(product);

      if (!rules) return null;

      const quantity = Number(item.quantity);

      if (!isValidQuantity(quantity, rules)) {
        return null;
      }

      return {
        productId: item.productId,
        quantity
      };
    })
    .filter(Boolean);
};

const useCartStore = create(
  persist(
    (set, get) => ({
      // ===== STATE =====
      items: [],

      // ===== ACTIONS =====

      /*
        Add item to cart.

        The quantity supplied must already be a valid
        selling quantity for a new product.

        If the product already exists, the supplied
        quantity is added to the existing quantity.
      */
      addToCart: (productId, quantity = 1) => {
        const product = getProductById(productId);

        if (!product) {
          return {
            success: false,
            error: 'Product not found.'
          };
        }

        const rules = getProductRules(product);
        const requestedQuantity = Number(quantity);

        if (!isValidQuantity(requestedQuantity, rules)) {
          return {
            success: false,
            error: getQuantityError(rules)
          };
        }

        const existingItem = get().items.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + requestedQuantity;

          if (!isValidQuantity(newQuantity, rules)) {
            return {
              success: false,
              error: `The quantity cannot be changed to ${newQuantity}. Please use the available quantity steps.`
            };
          }

          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: newQuantity }
                : item
            )
          }));

          return {
            success: true,
            quantity: newQuantity
          };
        }

        set((state) => ({
          items: [
            ...state.items,
            {
              productId,
              quantity: requestedQuantity
            }
          ]
        }));

        return {
          success: true,
          quantity: requestedQuantity
        };
      },

      /*
        Remove item completely from cart.
      */
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.productId !== productId
          )
        }));

        return {
          success: true
        };
      },

      /*
        Update the complete quantity of an existing cart item.

        Invalid quantities are rejected rather than silently
        creating quantities such as 51 or 52.
      */
      updateQuantity: (productId, quantity) => {
        const product = getProductById(productId);

        if (!product) {
          return {
            success: false,
            error: 'Product not found.'
          };
        }

        const rules = getProductRules(product);
        const newQuantity = Number(quantity);

        if (!isValidQuantity(newQuantity, rules)) {
          return {
            success: false,
            error: getQuantityError(rules)
          };
        }

        const existingItem = get().items.find(
          (item) => item.productId === productId
        );

        if (!existingItem) {
          return {
            success: false,
            error: 'Product is not in the cart.'
          };
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        }));

        return {
          success: true,
          quantity: newQuantity
        };
      },

      /*
        Clear entire cart.
      */
      clearCart: () => {
        set({ items: [] });

        return {
          success: true
        };
      },

      // ===== GETTERS =====

      /*
        Get total number of selling units in the cart.

        For example:
        - 75 food containers = 75 selling units
        - 2 cutlery packs = 2 selling units
        - 3 kg bags = 3 selling units
      */
      getCartCount: () => {
        const state = get();

        return state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      /*
        Calculate the complete cart subtotal
        using the canonical product price.
      */
      getCartTotal: () => {
        const state = get();

        return state.items.reduce((total, item) => {
          const product = getProductById(item.productId);

          if (!product) return total;

          const rules = getProductRules(product);

          return total + rules.pricePerUnit * item.quantity;
        }, 0);
      },

      /*
        Check if product is already in cart.
      */
      isInCart: (productId) => {
        const state = get();

        return state.items.some(
          (item) => item.productId === productId
        );
      },

      /*
        Get quantity of a specific product.
      */
      getQuantity: (productId) => {
        const state = get();

        const item = state.items.find(
          (item) => item.productId === productId
        );

        return item ? item.quantity : 0;
      },

      /*
        Get all cart items.
      */
      getItems: () => {
        return get().items;
      },

      /*
        Get selling rules for a product.

        Useful for CartPage and ProductDetailPage
        without duplicating business rules.
      */
      getProductRules: (productId) => {
        const product = getProductById(productId);

        return getProductRules(product);
      },

      /*
        Check whether a quantity is valid for a product.
      */
      isQuantityValid: (productId, quantity) => {
        const product = getProductById(productId);

        if (!product) return false;

        const rules = getProductRules(product);

        return isValidQuantity(quantity, rules);
      }
    }),
    {
      name: 'vault-khazana-cart',

      /*
        Only cart items are persisted.
        Product data and prices remain in products.js.
      */
      partialize: (state) => ({
        items: state.items
      }),

      /*
        Clean invalid old cart data when persisted state
        is restored from localStorage.
      */
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const cleanedItems = sanitizeCartItems(state.items);

        if (cleanedItems.length !== state.items.length) {
          state.items = cleanedItems;
        }
      }
    }
  )
);

export default useCartStore;