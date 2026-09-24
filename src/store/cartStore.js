import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById } from '../data/products';

const getProductRules = (product) => {
  if (!product) return null;

  return {
    sellingUnit: product.sellingUnit || 'piece',
    moq: Number(product.moq) || 1,
    step: Number(product.step) || 1,
    packSize: product.packSize ?? null,
    pricePerUnit: Number(product.pricePerUnit) || 0
  };
};

const isValidQuantity = (quantity, rules) => {
  if (!rules) return false;

  const qty = Number(quantity);

  if (!Number.isFinite(qty)) return false;
  if (qty < rules.moq) return false;

  return (qty - rules.moq) % rules.step === 0;
};

const getQuantityError = (quantity, rules) => {
  if (!rules) return 'Product information is unavailable.';

  const qty = Number(quantity);

  if (!Number.isFinite(qty)) {
    return 'Please enter a valid quantity.';
  }

  if (qty < rules.moq) {
    return `Minimum order is ${rules.moq} ${
      rules.sellingUnit === 'pack'
        ? 'pack'
        : rules.sellingUnit === 'kg'
          ? 'kg'
          : 'pieces'
    }.`;
  }

  if ((qty - rules.moq) % rules.step !== 0) {
    const unitLabel =
      rules.sellingUnit === 'pack'
        ? 'packs'
        : rules.sellingUnit === 'kg'
          ? 'kg'
          : 'pieces';

    return `Quantity must increase in steps of ${rules.step} ${unitLabel}.`;
  }

  return '';
};

const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const product = getProductById(item.productId);
      const rules = getProductRules(product);

      if (!product || !rules) return null;

      const quantity = Number(item.quantity);

      if (!isValidQuantity(quantity, rules)) {
        return {
          ...item,
          quantity: rules.moq
        };
      }

      return {
        ...item,
        quantity
      };
    })
    .filter(Boolean);
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (productId, quantity) => {
        const product = getProductById(productId);
        const rules = getProductRules(product);

        if (!product || !rules) return false;

        const requestedQuantity =
          quantity === undefined ? rules.moq : Number(quantity);

        if (!isValidQuantity(requestedQuantity, rules)) {
          return false;
        }

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === productId
          );

          if (!existingItem) {
            return {
              items: [
                ...state.items,
                {
                  productId,
                  quantity: requestedQuantity
                }
              ]
            };
          }

          const newQuantity = existingItem.quantity + requestedQuantity;

          if (!isValidQuantity(newQuantity, rules)) {
            return state;
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: newQuantity
                  }
                : item
            )
          };
        });

        return true;
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.productId !== productId
          )
        }));
      },

      updateQuantity: (productId, quantity) => {
        const product = getProductById(productId);
        const rules = getProductRules(product);

        if (!product || !rules) return false;

        const newQuantity = Number(quantity);

        if (!isValidQuantity(newQuantity, rules)) {
          return false;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: newQuantity
                }
              : item
          )
        }));

        return true;
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Cart badge = number of different product lines,
      // NOT total pieces/packs/kg.
      getCartCount: () => {
        return get().items.length;
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const product = getProductById(item.productId);
          const rules = getProductRules(product);

          if (!rules) return total;

          return total + rules.pricePerUnit * item.quantity;
        }, 0);
      },

      isInCart: (productId) => {
        return get().items.some(
          (item) => item.productId === productId
        );
      },

      getQuantity: (productId) => {
        const item = get().items.find(
          (cartItem) => cartItem.productId === productId
        );

        return item ? item.quantity : 0;
      },

      getItems: () => {
        return get().items;
      },

      getProductRules: (productId) => {
        const product = getProductById(productId);
        return getProductRules(product);
      },

      isQuantityValid: (productId, quantity) => {
        const product = getProductById(productId);
        const rules = getProductRules(product);

        return isValidQuantity(quantity, rules);
      },

      getQuantityError: (productId, quantity) => {
        const product = getProductById(productId);
        const rules = getProductRules(product);

        return getQuantityError(quantity, rules);
      }
    }),
    {
      name: 'vault-khazana-cart',

      partialize: (state) => ({
        items: state.items
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const cleanedItems = sanitizeCartItems(state.items);

        state.items = cleanedItems;
      }
    }
  )
);

export default useCartStore;