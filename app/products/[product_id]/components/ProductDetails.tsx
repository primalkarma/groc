// components/ProductCard.tsx
"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/subcategory";
import Image from "next/image";
import Link from "next/link";



type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
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
  );
}