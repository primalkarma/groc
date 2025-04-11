import { Product } from "./subcategory";

type CartItem = Product & {
    quantity: number;
    subcat_name: string;
}

type CartState = {
    cart: CartItem[];
    addItem: (product: Product, subcat_name: string) => void;
    reduceQuantity: (product_id: string) => void;
    removeItem: (product_id: string) => void;
    clearCart: () => void;
}