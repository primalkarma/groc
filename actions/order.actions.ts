'use server';

import { prisma } from '@/lib/prisma';
import { CartItem } from '@/types/cart'; // Import your CartItem type

// Define the publishOrder function
export async function publishOrder(cartItems: CartItem[]) {
  try {
    // Start a transaction to ensure atomicity
    const order = await prisma.orders.create({
      data: {
        order_date: new Date(),
        status: true, // Set the initial status (e.g., true for "active")
        order_items: {
          create: cartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Return the created order ID for confirmation or further use
    return { success: true, orderId: order.order_id };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to publish order');
  }
}