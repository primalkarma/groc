export type Category = {
    cat_id: string;
    cat_name: string;
    cat_img: string;
  };

// types/categoryWithSubcategories.ts
export type Subcategory = {
  subcat_id: string;
  subcat_name: string;
  products: Product[];
};

export type Product = {
  product_id: string;
  product_name: string;
  product_img: string;
  unit: string;
};

export type CategoryWithSubcategories = {
  cat_name: string; // The name of the category
  subcategories: Subcategory[]; // List of subcategories with their products
};