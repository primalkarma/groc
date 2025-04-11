
"use client";
import { Product } from "@/types/subcategory";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button"; 


type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const reduceQuantity = useCartStore((state) => state.reduceQuantity);
  const cart = useCartStore((state) => state.cart);

  // Check if the product is already in the cart
  const cartItem = cart.find((item) => item.product_id === product.product_id);

  if (cartItem) {
    // If the product is in the cart, show +, quantity, and - buttons
    return (
      <div className="flex items-center justify-between w-full bg-accent p-2 rounded-md">
        {/* Decrease Quantity */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            reduceQuantity(product.product_id); // Prevent parent event propagation
            
          }}
        >
          <MinusIcon size={16} />
        </Button>

        {/* Display Quantity */}
        <span className="text-sm font-medium">{cartItem.quantity}</span>

        {/* Increase Quantity */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent event propagation
            addItemToCart(product); // Add one unit
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
        addItemToCart(product);
      }}
      variant="secondary"
      className="w-full transition-colors duration-300 hover:bg-primary hover:text-white"
    >
      Add to Cart
    </Button>
  );
}
