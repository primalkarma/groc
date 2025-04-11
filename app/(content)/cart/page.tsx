"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItemFromCart = useCartStore((state) => state.removeItem);

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
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {/* Iterate over grouped cart items */}
          {Object.entries(groupedCart).map(([subcatName, items]) => (
            <div key={subcatName} className="space-y-4">
              {/* Subcategory Heading */}
              <h2 className="text-xl font-semibold text-primary">{subcatName}</h2>

              {/* Products in the Subcategory */}
              {items.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
}