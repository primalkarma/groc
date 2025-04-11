import { Product } from "./subcategory";

type CartItem = Product & {
    quantity: number;
}

type CartState = {
    cart: CartItem[];
    addItem: (product: Product) => void;
    reduceQuantity: (product_id: string) => void;
    removeItem: (product_id: string) => void;
    clearCart: () => void;
}