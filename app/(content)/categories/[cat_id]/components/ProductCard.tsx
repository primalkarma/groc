// components/ProductCard.tsx

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/subcategory";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

type ProductCardProps = {
  product: Product;
  subcat_name: string;
};

export default function ProductCard({ product, subcat_name }: ProductCardProps) {
  return (
    <div>
      {/* Link to Product Details */}
      <Link
        href={`/${product.product_id}`}
        aria-label={`View ${product.product_name}`}
      >
        <Card
          className="max-w-xs mx-auto bg-card transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring"
          role="button"
          tabIndex={0}
        >
          <CardHeader>
            {/* Product Image */}
            <div className="relative w-full aspect-square bg-card rounded-lg overflow-hidden">
              <Image
                src={product.product_img || "/placeholder.svg"}
                alt={product.product_name}
                fill
                className="object-contain" // Reduced padding for smaller screens
                style={{ objectFit: "contain" }}
                loading="lazy"
                quality={75}
              />
            </div>

            {/* Product Name */}
            <CardTitle className="text-center text-xl tracking-tight font-semibold truncate">
              {product.product_name}
            </CardTitle>

            {/* Unit */}
            <p className="text-center text-lg text-muted-foreground">
              {product.unit}
            </p>
          </CardHeader>
        </Card>
      </Link>

      {/* Add to Cart Button */}
      <div className="my-4 max-w-xs mx-auto">
        <AddToCartButton product={product} subcat_name={subcat_name} />
      </div>
    </div>
  );
}
