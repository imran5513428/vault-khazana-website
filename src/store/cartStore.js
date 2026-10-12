
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

const getItemRules = (item, product) => {
  if (item?.isSpecialOffer) {
    return {
      sellingUnit: item.sellingUnit || 'piece',
      moq: Number(item.moq) || 1,
      step: Number(item.step) || 1,
      packSize: item.packSize ?? null,
      pricePerUnit: Number(item.pricePerUnit) || 0
    };
  }

  return getProductRules(product);
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
    if (rules.sellingUnit === 'pack' && rules.packSize) {
      const minimumPieces = rules.moq * Number(rules.packSize);

      return `Minimum order is ${minimumPieces} pieces (${rules.moq} pack).`;
    }

    if (rules.sellingUnit === 'kg') {
      return `Minimum order is ${rules.moq} kg.`;
    }

    if (rules.sellingUnit === 'carton') {
      return `Minimum order is ${rules.moq} carton${rules.moq === 1 ? '' : 's'}.`;
    }

    return `Minimum order is ${rules.moq} ${
      rules.moq === 1 ? 'piece' : 'pieces'
    }.`;
  }

  if ((qty - rules.moq) % rules.step !== 0) {
    const unitLabel =
      rules.sellingUnit === 'pack'
        ? 'packs'
        : rules.sellingUnit === 'kg'
          ? 'kg'
          : rules.sellingUnit === 'carton'
            ? 'cartons'
            : 'pieces';

    return `Quantity must increase in steps of ${rules.step} ${unitLabel}.`;
  }

  return '';
};

const getLineKey = (item) => item.lineId || item.productId;

const findItem = (items, key) => {
  if (key === undefined || key === null) return undefined;

  return (
    items.find((item) => getLineKey(item) === key) ||
    items.find((item) => item.productId === key && !item.isSpecialOffer)
  );
};

const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      if (item.isSpecialOffer) {
        const quantity = Number(item.quantity);
        const unitPrice = Number(item.pricePerUnit);
        const rules = getItemRules(item, product);

        if (
          !Number.isFinite(unitPrice) ||
          unitPrice < 0 ||
          !rules
        ) {
          return null;
        }

        const safeQuantity = isValidQuantity(quantity, rules)
          ? quantity
          : rules.moq;

        return {
          ...item,
          lineId:
            item.lineId ||
            `offer:${item.productId}:${item.variantKey || 'standard'}`,
          quantity: safeQuantity,
          pricePerUnit: unitPrice,
          moq: rules.moq,
          step: rules.step
        };
      }

      const rules = getProductRules(product);

      if (!rules) return null;

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

      // Existing catalogue products continue using their catalogue prices.
      addToCart: (productId, quantity) => {
        const product = getProductById(productId);
        const rules = getProductRules(product);

        if (!product || !rules) {
          return {
            success: false,
            error: 'Product information is unavailable.'
          };
        }

        const requestedQuantity =
          quantity === undefined ? rules.moq : Number(quantity);

        if (!isValidQuantity(requestedQuantity, rules)) {
          return {
            success: false,
            error: getQuantityError(requestedQuantity, rules)
          };
        }

        const existingItem = get().items.find(
          (item) => item.productId === productId && !item.isSpecialOffer
        );

        if (existingItem) {
          const newQuantity =
            Number(existingItem.quantity) + requestedQuantity;

          if (!isValidQuantity(newQuantity, rules)) {
            return {
              success: false,
              error: getQuantityError(newQuantity, rules)
            };
          }

          set((state) => ({
            items: state.items.map((item) =>
              item === existingItem
                ? {
                    ...item,
                    quantity: newQuantity
                  }
                : item
            )
          }));

          return {
            success: true,
            error: ''
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
          error: ''
        };
      },

      // Special offers use their own price and a separate cart line.
      // Expected options include productId, variantKey, variantLabel,
      // quantity, unitPrice, sellingUnit, priceBasis and offerType.
      addOfferToCart: (options = {}) => {
        const {
          productId,
          variantKey = 'standard',
          variantLabel = '',
          quantity = 1,
          unitPrice,
          sellingUnit = 'piece',
          priceBasis = '',
          displayName = '',
          offerType = 'everyday',
          image = '',
          moq = 1,
          step = 1,
          packSize = null,
          requiresAdvancePayment = false
        } = options;

        const product = getProductById(productId);
        const price = Number(unitPrice);

        if (!product) {
          return {
            success: false,
            error: 'Product information is unavailable.'
          };
        }

        if (!Number.isFinite(price) || price < 0) {
          return {
            success: false,
            error: 'The offer price is invalid.'
          };
        }

        const rules = {
          sellingUnit,
          moq: Number(moq) || 1,
          step: Number(step) || 1,
          packSize,
          pricePerUnit: price
        };

        const requestedQuantity = Number(quantity);

        if (!isValidQuantity(requestedQuantity, rules)) {
          return {
            success: false,
            error: getQuantityError(requestedQuantity, rules)
          };
        }

        const safeVariantKey = String(variantKey || 'standard');
        const lineId = `offer:${productId}:${safeVariantKey}`;

        const offerLine = {
          productId,
          lineId,
          isSpecialOffer: true,
          variantKey: safeVariantKey,
          variantLabel: String(variantLabel || ''),
          displayName: String(displayName || product.name),
          quantity: requestedQuantity,
          pricePerUnit: price,
          sellingUnit,
          priceBasis: String(priceBasis || ''),
          offerType,
          image: String(image || ''),
          moq: rules.moq,
          step: rules.step,
          packSize,
          requiresAdvancePayment: Boolean(requiresAdvancePayment)
        };

        const existingItem = get().items.find(
          (item) => getLineKey(item) === lineId
        );

        if (existingItem) {
          const newQuantity =
            Number(existingItem.quantity) + requestedQuantity;

          if (!isValidQuantity(newQuantity, rules)) {
            return {
              success: false,
              error: getQuantityError(newQuantity, rules)
            };
          }

          set((state) => ({
            items: state.items.map((item) =>
              getLineKey(item) === lineId
                ? {
                    ...item,
                    quantity: newQuantity
                  }
                : item
            )
          }));
        } else {
          set((state) => ({
            items: [...state.items, offerLine]
          }));
        }

        return {
          success: true,
          error: ''
        };
      },

      // Accepts a lineId for a specific offer variant, or a productId
      // for the existing standard catalogue item.
      removeFromCart: (productIdOrLineId) => {
        set((state) => ({
          items: state.items.filter((item) => {
            if (getLineKey(item) === productIdOrLineId) return false;

            // Preserve the old behaviour for standard product lines.
            if (
              item.productId === productIdOrLineId &&
              !item.isSpecialOffer
            ) {
              return false;
            }

            return true;
          })
        }));
      },

      updateQuantity: (productIdOrLineId, quantity) => {
        const items = get().items;
        const item = findItem(items, productIdOrLineId);

        if (!item) return false;

        const product = getProductById(item.productId);
        const rules = getItemRules(item, product);

        if (!rules) return false;

        const newQuantity = Number(quantity);

        if (!isValidQuantity(newQuantity, rules)) {
          return false;
        }

        const key = getLineKey(item);

        set((state) => ({
          items: state.items.map((cartItem) =>
            getLineKey(cartItem) === key
              ? {
                  ...cartItem,
                  quantity: newQuantity
                }
              : cartItem
          )
        }));

        return true;
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Cart badge = number of cart lines, not total pieces, packs or kg.
      getCartCount: () => get().items.length,

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const product = getProductById(item.productId);
          const rules = getItemRules(item, product);

          if (!rules) return total;

          return total + rules.pricePerUnit * Number(item.quantity || 0);
        }, 0);
      },

      isInCart: (productId) => {
        return get().items.some(
          (item) => item.productId === productId
        );
      },

      getQuantity: (productIdOrLineId) => {
        const item = findItem(get().items, productIdOrLineId);

        return item ? Number(item.quantity) || 0 : 0;
      },

      getItems: () => get().items,

      getProductRules: (productId) => {
        const product = getProductById(productId);
        return getProductRules(product);
      },

      getItemRules: (productIdOrLineId) => {
        const item = findItem(get().items, productIdOrLineId);

        if (item) {
          return getItemRules(item, getProductById(item.productId));
        }

        return getProductRules(getProductById(productIdOrLineId));
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
