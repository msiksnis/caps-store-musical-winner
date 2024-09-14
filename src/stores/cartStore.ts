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
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: loadCartFromLocalStorage(),
  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existingItem = cartItems.find((item) => item.id === product.id);

    let newCartItems;
    if (existingItem) {
      // Increase quantity if item already exists
      newCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      // Add new item to cart
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }
    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },
  removeFromCart: (productId) => {
    const newCartItems = get().cartItems.filter(
      (item) => item.id !== productId,
    );
    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },
  clearCart: () => {
    set({ cartItems: [] });
    saveCartToLocalStorage([]);
  },
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return; // Prevent zero or negative quantities
    const newCartItems = get().cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );
    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },
  getItemQuantity: (productId) => {
    const item = get().cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  },
}));
