import { create } from "zustand";
import { persist } from "zustand/middleware";

// A function to provide storage only if it's available (i.e., on the client side)
const getStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

const useStore = create(
  persist(
    (set) => ({
      addedProducts: [],

      addProduct: (product) =>
        set((state) => ({
          addedProducts: [...state.addedProducts, product],
        })),

      removeProduct: (productId) =>
        set((state) => ({
          addedProducts: state.addedProducts.filter(
            (product) => product._id !== productId
          ),
        })),

      clearCart: () => set({ addedProducts: [] }),
    }),
    {
      name: "cart-storage", // unique name for the storage key
      storage: getStorage(), // use localStorage to persist the state, if available
    }
  )
);

export default useStore;
