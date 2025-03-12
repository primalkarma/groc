"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/category";

interface ProductCardProps {
  product: Product;
  
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:bg-accent transition-colors">
      <Link href={`/dashboard/${product.product_id}`} className="block">
        <CardHeader>
          <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.product_img || "/placeholder.svg"}
              alt={product.product_name}
              fill
              className="object-contain"
              style={{ objectFit: "contain" }}
              loading="lazy"
              quality={75}
            />
          </div>
          <CardTitle className="mt-4 text-center truncate">
            {product.product_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          {product.unit}
        </CardContent>
      </Link>
    </Card>
  );
}