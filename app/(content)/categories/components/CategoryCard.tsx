
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.cat_id}`}
      aria-label={`View ${category.cat_name} category`}
    >
      <Card
        className="max-w-xs mx-auto transition-transform duration-300 ease-in-out hover:scale-[1.05]  hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
        role="button"
        tabIndex={0}
      >
        <CardHeader>
          <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
            <Image
              src={category.cat_img || "/placeholder.svg"}
              alt={category.cat_name}
              fill
              className="object-contain p-8" // Use object-contain to preserve aspect ratio
              style={{ objectFit: "contain" }}
              loading="lazy"
              quality={75}
            />
          </div>
          {/* Title */}
          <CardTitle className="text-center tracking-wide font-semibold text-xl truncate p-2">
            {category.cat_name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
