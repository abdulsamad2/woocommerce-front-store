"use client";
import { create } from "zustand";

interface Cart {
  cart: any;
  totalQuantity: number;
  addToCart: ({ id, name, qunatity }: any) => void;
  removeFromCart: (itemId: any) => void;
  clearCart: () => void;
}

// Create your store, which includes both state and (optionally) actions

const useCartStore = create<Cart>((set) => ({
  cart: [],
  totalQuantity: 0,

  addToCart: ({ id, name, qunatity, price }) => {
    const existingItem = useCartStore
      .getState()
      .cart.find((item: { id: any }) => item.id === id);
    if (existingItem) {
      useCartStore.getState().totalQuantity++;
      set((state: { cart: any[] }) => ({
        cart: state.cart.map((item: { qunatity: any; id: any }) =>
          item.id === id
            ? { ...item, qunatity: item.qunatity + qunatity }
            : item
        ),
      }));
    } else {
      useCartStore.getState().totalQuantity++;
      set((state: { cart: any[] }) => ({
        cart: [...state.cart, { id, name, qunatity, price }],
      }));
    }
  },
  removeFromCart: (product: any) => {
    useCartStore.getState().totalQuantity -= product.qunatity;
    set((state: { cart: any[] }) => ({
      cart: state.cart.filter((item: { id: any }) => item.id !== product.id),
    }));
  },
  clearCart: () => set({ cart: [], totalQuantity: 0 }),
}));

export default useCartStore;
