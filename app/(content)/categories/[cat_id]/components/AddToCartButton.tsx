
"use client";
import { Product } from "@/types/subcategory";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button"; 


type AddToCartButtonProps = {
  product: Product;
  subcat_name: string;
};

export function AddToCartButton({ product, subcat_name }: AddToCartButtonProps) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const reduceQuantity = useCartStore((state) => state.reduceQuantity);
  const cart = useCartStore((state) => state.cart);

  // Check if the product is already in the cart
  const cartItem = cart.find((item) => item.product_id === product.product_id);

  if (cartItem) {
    // If the product is in the cart, show +, quantity, and - buttons
    return (
      <div className="flex items-center justify-between p-2 rounded-md">
        {/* Decrease Quantity */}
        <Button
          variant="default"
          size="sm"
          className="bg-black text-white/70 transition-colors duration-300 hover:bg-[#F1BE49] hover:text-grey-800"
          onClick={(e) => {
            e.stopPropagation();
            reduceQuantity(product.product_id); // Prevent parent event propagation
            
          }}
        >
          <MinusIcon size={20} />
        </Button>

        {/* Display Quantity */}
        <span className="text-lg font-medium">{cartItem.quantity}</span>

        {/* Increase Quantity */}
        <Button
          variant="default"
          size="sm"
          className="bg-black text-white/70 transition-colors duration-300 hover:bg-[#F1BE49] hover:text-grey-800"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent event propagation
            addItemToCart(product, subcat_name); // Add one unit
          }}
        >
          <PlusIcon size={16} />
        </Button>
      </div>
    );
  }

  // If the product is not in the cart, show the "Add to Cart" button
  return (
    <Button
      onClick={(e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        addItemToCart(product, subcat_name);
      }}
      variant="secondary"
      className="w-full text-lg bg-gray-800 text-white/70 transition-colors duration-300 hover:bg-[#F1BE49] hover:text-grey-800"
    >
      Add to Cart
    </Button>
  );
}
