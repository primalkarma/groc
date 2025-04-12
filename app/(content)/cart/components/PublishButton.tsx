"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Loader2 } from "lucide-react"; // Import the loader icon
import { publishOrder } from "@/actions/order.actions";

export default function PublishButton() {
  const [loading, setLoading] = useState(false); // State for loading spinner
  const cart = useCartStore((state) => state.cart); // Get the current cart items
  const clearCart = useCartStore((state) => state.clearCart); // Get the clearCart function

  // Handle button click
  const handlePublish = async () => {
    setLoading(true); // Start loading

    try {
      // Call the publishOrder server action
      const result = await publishOrder(cart);

      if (result.success) {
        alert(`Order published successfully! Order ID: ${result.orderId}`);
        clearCart(); // Clear the cart after publishing
      } else {
        alert("Failed to publish order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while publishing the order.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Button
      onClick={handlePublish}
      disabled={cart.length === 0 || loading} // Disable if cart is empty or loading
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Publish"
      )}
    </Button>
  );
}