import { getCategories } from "@/actions/categories.actions";
import { Category } from "@/types/category";
import CategoriesList from "./components/CategoriesList"; // Import the client component

const CategoriesPage = async () => {
  let categories: Category[] = [];
  let errorMessage: string | null = null;

  try {
    // Fetch categories from the server action
    categories = await getCategories();
  } catch (error) {
    // Handle errors by setting an error message
    console.error("Error fetching categories:", error);
    errorMessage = "Failed to load categories. Please try again later.";
  }

  return (
    <div className="mx-auto container text-sidebar-foreground p-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Categories</h1>

      {/* Pass data to the client component */}
      
      <CategoriesList categories={categories} errorMessage={errorMessage} />
    </div>
  );
};

export default CategoriesPage;