// actions/products.actions.ts
'use server';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types/subcategory';


export async function getProductDetails(product_id: string): Promise<Product | null> {
  // Validate the product_id parameter
  if (!product_id || typeof product_id !== "string") {
    throw new Error("Invalid product ID");
  }

  try {
    // Fetch the product details from the database
    const product = await prisma.products.findUnique({
      where: { product_id },
      select: {
        product_id: true,
        product_name: true,
        product_img: true,
        unit: true,
      },
    });

    // Return null if the product is not found
    if (!product) {
      return null;
    }

    // Return the product data
    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details");
  }
}