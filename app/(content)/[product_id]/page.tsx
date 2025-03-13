// pages/products/[product_id]/page.tsx
import { notFound } from "next/navigation";
import { getProductDetails } from "@/actions/product.actions";

type ProductPageProps = {
  params: Promise<{
    product_id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params to satisfy Next.js requirements
  const { product_id } = await params;

  // Fetch product details
  const product = await getProductDetails(product_id);

  // Handle missing or invalid product
  if (!product) {
    return notFound(); // Show 404 page
  }

  return (
    <div className="mx-auto container p-8">
      {/* Product Header */}
      <h1 className="text-3xl font-bold mb-6">{product.product_name}</h1>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden">
          <img
            src={product.product_img || "/placeholder.svg"}
            alt={product.product_name}
            className="object-contain p-8"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-full space-y-4">
          {/* Unit, Price, and Description */}
          <div className="space-y-4">
            {/* Unit */}
            <p className="text-lg font-medium text-muted-foreground">
              Unit: {product.unit}
            </p>

            {/* Price */}
            <p className="text-xl font-bold text-primary">
              Price: $10.99 {/* Replace with actual price data */}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              This is a sample description for the product. You can add more details
              about the product here.
            </p>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}