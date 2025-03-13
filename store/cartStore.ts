import { CartState } from "@/types/cart";
import { Product } from "@/types/subcategory";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
    persist(
      (set) => ({
        cart: [],
  
        // Add a product to the cart
        addItem: (product: Product) =>
          set((state) => {
            const existingItem = state.cart.find((item) => item.product_id === product.product_id);
  
            if (existingItem) {
              // If the product already exists, increase its quantity
              return {
                cart: state.cart.map((item) =>
                  item.product_id === product.product_id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              };
            }
  
            // If the product doesn't exist, add it with a quantity of 1
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }),
  
        // Remove a product from the cart
        removeItem: (product_id: String) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.product_id !== product_id),
          })),
  
        // Clear the entire cart
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "cart-storage", // Unique key for localStorage
      }
    )
  );
