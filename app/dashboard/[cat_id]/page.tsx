import { getCategoryWithSubcategoriesAndProducts } from "@/actions/categories.actions";
import {
  CategoryWithSubcategories,
  Subcategory,
  Product,
} from "@/types/category";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CategoryPageProps {
  params: { cat_id: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat_id } = params;

  // Fetch the category data with subcategories and products
  const category: CategoryWithSubcategories | null =
    await getCategoryWithSubcategoriesAndProducts(cat_id);

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="container py-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-6">{category.cat_name}</h1>

      {/* Render Subcategories */}
      <div className="mt-8">
        {category.subcategories.length > 0 ? (
          category.subcategories.map((subcategory) => (
            <div key={subcategory.subcat_id} className="mb-8">
              {/* Subcategory Subheading */}
              <h2 className="text-2xl font-semibold mb-4">
                {subcategory.subcat_name}
              </h2>

              {/* Render Products as Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategory.products.length > 0 ? (
                  subcategory.products.map((product) => (
                    <Card
                      key={product.product_id}
                      className="hover:bg-accent transition-colors"
                    >
                      <Link
                        href={`/products/${product.product_id}`}
                        className="block"
                      >
                        <CardHeader>
                          <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={product.product_img || "/placeholder.svg"}
                              alt={product.product_name}
                              fill
                              className="object-contain p-8" // Use object-contain to preserve aspect ratio
                              style={{ objectFit: "contain" }}
                              loading="lazy"
                              quality={75}
                            />
                          </div>
                          <CardTitle className="text-center truncate">
                            {product.product_name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                          {product.unit}
                        </CardContent>
                      </Link>
                    </Card>
                  ))
                ) : (
                  <p>No products available in this subcategory.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No subcategories available.</p>
        )}
      </div>
    </div>
  );
}
