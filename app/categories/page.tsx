import React from "react";
import { getCategories } from "@/actions/categories.actions";
import { Category } from "@/types/category";
import CategoryCard from "./components/CategoryCard";

const page = async () => {
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
    <div className="mx-auto container p-8">
      <h1 className="text-3xl font-light mb-6">Categories</h1>

      {/* Display error message if there was an error */}
      {errorMessage && (
        <div className="col-span-full text-center text-destructive">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Render categories or a "no categories found" message */}
      {!errorMessage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard key={category.cat_id} category={category} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p>No categories found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
