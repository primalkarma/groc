"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";




type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.cat_id}`}>
      <Card className="w-full transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:bg-accent">
        <CardHeader>
          <div className="relative w-full aspect-[4/3] bg-muted  rounded-lg mb-4">
            {/* Add image component here if you have actual images */}

            <Image
              
              src={category.cat_img || "/placeholder.svg"}
              alt={category.cat_name}
              fill
              className="w-full h-full object-cover rounded-lg p-8"
              style={{ objectFit: "cover" }}
              loading="lazy" // Enable lazy loading
              quality={75}
            />
          </div>
          <CardTitle className="text-center tracking-wide font-light truncate p-2">
            {category.cat_name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
