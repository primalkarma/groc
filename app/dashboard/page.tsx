import React from "react";
import { getCategories } from "../../actions/categories.actions";
import { Category } from "@/types/category";
import CategoryCard from "../components/dashboard/CategoryCard";

const page = async () => {
  const categories: Category[] = await getCategories();
  return (
    <div className="container p-8">
      <h1 className="text-3xl font-light mb-6">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
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
    </div>
  );
};

export default page;
