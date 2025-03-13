// components/ProductCard.tsx
"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/subcategory";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import { PlusIcon, MinusIcon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
      {/* Link to Product Details */}
      <Link
        href={`/products/${product.product_id}`}
        aria-label={`View ${product.product_name}`}
      >
        <Card
          className="w-full transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          role="button"
          tabIndex={0}
        >
          <CardHeader>
            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src={product.product_img || "/placeholder.svg"}
                alt={product.product_name}
                fill
                className="object-contain p-8"
                style={{ objectFit: "contain" }}
                loading="lazy"
                quality={75}
              />
            </div>

            {/* Product Name */}
            <CardTitle className="text-center tracking-wide font-light truncate p-2">
              {product.product_name}
            </CardTitle>

            {/* Unit */}
            <p className="text-center text-sm text-muted-foreground">
              {product.unit}
            </p>
          </CardHeader>
        </Card>
      </Link>

      {/* Add to Cart Button */}
      <div className="mt-2">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItemToCart = useCartStore((state) => state.addItem);
  const removeItemFromCart = useCartStore((state) => state.removeItem);
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
            e.stopPropagation(); // Prevent parent event propagation
            if (cartItem.quantity > 1) {
              removeItemFromCart(product.product_id); // Remove one unit
            }
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
