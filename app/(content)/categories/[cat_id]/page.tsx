// pages/categories/[cat_id]/page.tsx
import { notFound } from "next/navigation";
import { getSubcategoriesAndProducts } from "@/actions/subcategories.actions";
import ProductCard from "./components/ProductCard";

type CategoryPageProps = {
  params: Promise<{
    cat_id: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const  {cat_id}  = await params;

  // Fetch category data (subcategories and products)
  const categoryData = await getSubcategoriesAndProducts(cat_id);

  // Handle missing or invalid category
  if (!categoryData) {
    return notFound(); // Show 404 page
  }

  const { cat_name, subcategories } = categoryData;

  return (
    <div className="mx-auto container p-8">
      {/* Category Name */}
      <h1 className="text-3xl font-light mb-6">{cat_name}</h1>

      {/* Subcategories and Products */}
      {subcategories.length > 0 ? (
        subcategories.map((subcategory) => (
          <div key={subcategory.subcat_id} className="mb-8">
            {/* Subcategory Name */}
            <h2 className="text-2xl font-medium mb-4">{subcategory.subcat_name}</h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategory.products.map((product) => (
                <ProductCard key={product.product_id} product={product} subcat_name={subcategory.subcat_name}/>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No subcategories or products found.</p>
      )}
    </div>
  );
}