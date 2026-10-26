
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById, getProductLineTotal } from '../data/products';

const getVariant = (product, variantId) => {
  if (!product || !variantId || !Array.isArray(product.variants)) return null;
  return product.variants.find((variant) => variant.id === variantId) || null;
};

const getProductRules = (product, variantId = null, cartItem = null) => {
  if (!product) return null;

  const variant = getVariant(product, variantId || cartItem?.variantKey);
  const isFoilRoll = product.id === 'aluminum-foil-sheet' && Boolean(variant);

  return {
    sellingUnit: isFoilRoll ? 'roll' : (product.sellingUnit || 'piece'),
    moq: Number(product.moq) || 1,
    step: Number(product.step) || 1,
    packSize: product.packSize ?? null,
    pricePerUnit: Number(
      cartItem?.pricePerUnit ??
      variant?.pricePerUnit ??
      variant?.price ??
      product.pricePerUnit
    ) || 0,
    variantKey: variant?.id || null,
    variantLabel: variant?.label || variant?.dimensions || ''
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

  return getProductRules(product, item?.variantKey, item);
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

      const rules = getProductRules(product, item.variantKey, item);

      if (!rules) return null;

      const quantity = Number(item.quantity);
      const safeQuantity = isValidQuantity(quantity, rules)
        ? quantity
        : rules.moq;

      return {
        ...item,
        quantity: safeQuantity,
        ...(rules.variantKey
          ? {
              lineId:
                item.lineId ||
                `product:${item.productId}:${rules.variantKey}`,
              variantKey: rules.variantKey,
              variantLabel: item.variantLabel || rules.variantLabel,
              sellingUnit: rules.sellingUnit,
              pricePerUnit: rules.pricePerUnit
            }
          : {})
      };
    })
    .filter(Boolean);
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Standard catalogue items preserve the selected variant, price and unit.
      addToCart: (productId, quantity, variantId = null) => {
        const product = getProductById(productId);
        const rules = getProductRules(product, variantId);

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

        const lineId = rules.variantKey
          ? `product:${productId}:${rules.variantKey}`
          : productId;

        const existingItem = get().items.find(
          (item) =>
            !item.isSpecialOffer &&
            (item.lineId || item.productId) === lineId
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
                ? { ...item, quantity: newQuantity }
                : item
            )
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                productId,
                quantity: requestedQuantity,
                ...(rules.variantKey
                  ? {
                      lineId,
                      variantKey: rules.variantKey,
                      variantLabel: rules.variantLabel,
                      sellingUnit: rules.sellingUnit,
                      pricePerUnit: rules.pricePerUnit
                    }
                  : {})
              }
            ]
          }));
        }

        return { success: true, error: '' };
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
          const qty = Number(item.quantity || 0);

          if (!rules) return total;

          // Pair / multi-buy offers (e.g. 2 for Rs 360)
          if (!item.isSpecialOffer && product?.pairOffer) {
            return total + getProductLineTotal(product, qty);
          }

          return total + rules.pricePerUnit * qty;
        }, 0);
      },

      isInCart: (productId) => {
        return get().items.some(
          (item) => item.productId === productId
        );
      },

      getQuantity: (productIdOrLineId, variantId = null) => {
        if (variantId) {
          const lineId = `product:${productIdOrLineId}:${variantId}`;
          const variantItem = get().items.find(
            (item) =>
              !item.isSpecialOffer &&
              ((item.lineId || item.productId) === lineId ||
                (item.productId === productIdOrLineId &&
                  item.variantKey === variantId))
          );

          return variantItem ? Number(variantItem.quantity) || 0 : 0;
        }

        const item = findItem(get().items, productIdOrLineId);
        return item ? Number(item.quantity) || 0 : 0;
      },

      getItems: () => get().items,

      getProductRules: (productId, variantId = null) => {
        const product = getProductById(productId);
        return getProductRules(product, variantId);
      },

      getItemRules: (productIdOrLineId) => {
        const item = findItem(get().items, productIdOrLineId);

        if (item) {
          return getItemRules(item, getProductById(item.productId));
        }

        return getProductRules(getProductById(productIdOrLineId));
      },

      isQuantityValid: (productId, quantity, variantId = null) => {
        const product = getProductById(productId);
        const rules = getProductRules(product, variantId);

        return isValidQuantity(quantity, rules);
      },

      getQuantityError: (productId, quantity, variantId = null) => {
        const product = getProductById(productId);
        const rules = getProductRules(product, variantId);

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