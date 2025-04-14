import { notFound } from "next/navigation";
import { getSubcategoriesAndProducts } from "@/actions/subcategories.actions";
import ProductsList from "./components/ProductsList"; // Import the client component

type CategoryPageProps = {
  params: Promise<{
    cat_id: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat_id } = await params;

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

      {/* Pass data to the client component */}
      <ProductsList subcategories={subcategories} />
    </div>
  );
}