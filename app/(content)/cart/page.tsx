// pages/cart/page.tsx
"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItemFromCart = useCartStore((state) => state.removeItem);

  return (
    <div className="mx-auto container p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.product_id} className="w-full">
              <CardHeader>
                {/* Product Name */}
                <CardTitle>{item.product_name}</CardTitle>

                {/* Quantity and Unit */}
                <CardDescription>
                  Quantity: {item.quantity} | Unit: {item.unit}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between items-center">
                {/* Remove Button */}
                <Button
                  variant="destructive"
                  onClick={() => removeItemFromCart(item.product_id)}
                >
                  Remove
                </Button>

                {/* Total Quantity */}
                <p className="text-sm text-muted-foreground">
                  Total: {item.quantity} x {item.unit}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
