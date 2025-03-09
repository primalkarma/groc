
import React from 'react'
import { getCategories } from '../../actions/categories.actions'



// Or, using a type alias:

type Category = {
  cat_id: string;
  cat_name: string;
  cat_img: string;
  // subcategories: Subcategory[];
};

const page = async () => {
  const categories: Category [] = await getCategories()
  return (
    <div>
        <h1>Categories</h1>
      {categories.length > 0 ? ( // Check if there are any categories
        <ul>
          {categories.map((category: Category) => (
            <li key={category.cat_id}> {/* Important: Add a unique key */}
              {category.cat_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p> // Display a message if no categories exist
      )}
    </div>
  )
}

export default page