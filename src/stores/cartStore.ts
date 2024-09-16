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

// Loads the cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};

// Saves the cart to localStorage
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

  // Removes an item from the cart by filtering out the item with the given productId
  removeFromCart: (productId) => {
    const newCartItems = get().cartItems.filter(
      (item) => item.id !== productId,
    );
    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },

  // Clears the cart by setting cartItems to an empty array
  clearCart: () => {
    set({ cartItems: [] });
    saveCartToLocalStorage([]);
  },

  // Returns the total price of all items in the cart
  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    );
  },
}));
