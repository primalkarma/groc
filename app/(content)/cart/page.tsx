"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import PublishButton from "./components/PublishButton";
import Link from "next/link";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItemFromCart = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart); // Get the clearCart function

  // Group cart items by subcategory
  const groupedCart = cart.reduce((acc, item) => {
    const subcatName = item.subcat_name;

    if (!acc[subcatName]) {
      acc[subcatName] = [];
    }

    acc[subcatName].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  return (
    <div className="mx-auto container p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Title */}
        <h1 className="text-3xl font-bold">Your Cart</h1>

        {/* Clear Cart Button */}
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={clearCart} // Call the clearCart function
            disabled={cart.length === 0} // Disable if the cart is empty
            className="bg-[#CC4B27]"

          >
            Clear Cart
          </Button>
          {/* Publish Button */}
          <PublishButton />
        </div>
      </div>

      {/* Cart Content */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-lg mb-10">Your cart is empty.</p>
        <Button variant="default" asChild>
          <Link href="/categories">Start Shopping</Link>
        </Button>
      </div>
      ) : (
        <div className="space-y-8">
          {/* Iterate over grouped cart items */}
          {Object.entries(groupedCart).map(([subcatName, items]) => (
            <div key={subcatName} className="space-y-4">
              {/* Subcategory Heading */}
              <h2 className="text-xl font-semibold text-primary">
                {subcatName}
              </h2>

              {/* Products in the Subcategory */}
              {items.map((item) => (
                <Card key={item.product_id} className="w-full bg-[#FFF1D4]">
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
                      className="bg-[#CC4B27]"
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
          ))}
        </div>
      )}
    </div>
  );
}
