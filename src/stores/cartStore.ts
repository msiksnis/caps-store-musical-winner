import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../lib/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

/**
 * Zustand store to manage the cart state.
 * Persisted in localStorage using Zustand's persist middleware.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      /**
       * Adds a product to the cart. Each product is treated as unique,
       * so it will be added to the cart with a quantity of 1.
       *
       * @param {Product} product - The product to add to the cart.
       */
      addToCart: (product: Product) => {
        const cartItems = get().cartItems;
        const newCartItems = [...cartItems, { ...product, quantity: 1 }];
        set({ cartItems: newCartItems });
      },

      /**
       * Removes a product from the cart by its product ID.
       *
       * @param {string} productId - The ID of the product to remove.
       */
      removeFromCart: (productId: string) => {
        const newCartItems = get().cartItems.filter(
          (item) => item.id !== productId,
        );
        set({ cartItems: newCartItems });
      },

      /**
       * Clears all items from the cart.
       */
      clearCart: () => {
        set({ cartItems: [] });
      },

      /**
       * Calculates the total price of all items in the cart,
       * considering the quantity and discounted price of each item.
       *
       * @returns {number} The total price of the items in the cart.
       */
      getTotalPrice: (): number => {
        return get().cartItems.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
