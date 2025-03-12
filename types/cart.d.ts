import { Product } from "./subcategory";

type CartItem = Product & {
    quantity: number;
}

type CartState = {
    cart: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (product_id: String) => void;
    clearCart: () => void;
}