// pages/dashboard/[cat_id]/page.tsx
import { getCategoryWithSubcategoriesAndProducts } from "@/actions/categories.actions";
import { CategoryWithSubcategories } from "@/types/category";
import ProductCard from "../../../components/subcategory/ProductCard";

interface CategoryPageProps {
  params: Promise<{ cat_id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat_id } = await params;

  // Fetch the category data with subcategories and products
  const category: CategoryWithSubcategories | null =
    await getCategoryWithSubcategoriesAndProducts(cat_id);

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="container py-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-light mb-6">{category.cat_name}</h1>

      {/* Render Subcategories */}
      <div className="mt-8">
        {category.subcategories.length > 0 ? (
          category.subcategories.map((subcategory) => (
            <div key={subcategory.subcat_id} className="mb-8">
              {/* Subcategory Subheading */}
              <h2 className="text-2xl font-light mb-4">
                {subcategory.subcat_name}
              </h2>

              {/* Render Products as Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategory.products.length > 0 ? (
                  subcategory.products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
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