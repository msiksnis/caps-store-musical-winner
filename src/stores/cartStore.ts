import { create } from "zustand";
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

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== productId),
    });
  },
  clearCart: () => set({ cartItems: [] }),
  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    );
  },
}));
