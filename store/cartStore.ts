import { CartState } from "@/types/cart";
import { Product } from "@/types/subcategory";
import { create } from "zustand";

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addItem: (product: Product) => 
        set((state) => {
            const existingItem = state.cart.find((item) => item.product_id === product.product_id); 
            if (existingItem) {
                return {
                    cart: state.cart.map((item) => 
                        item.product_id === product.product_id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { 
                cart: [...state.cart, { ...product, quantity: 1 }],
             };
        }),
    removeItem: (product_id: String) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.product_id !== product_id),
        })),
    clearCart: () => set({ cart: [] }),
}));
