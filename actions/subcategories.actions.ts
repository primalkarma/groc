'use server';
import { prisma } from '@/lib/prisma';
import { SubcategoriesAndProducts } from '@/types/subcategory';

export async function getSubcategoriesAndProducts(cat_id: string): Promise<SubcategoriesAndProducts | null> {
    
    if (!cat_id || typeof cat_id !== "string") {
        throw new Error("Invalid category ID");
      }
      
    try {
      const category = await prisma.categories.findUnique({
        where: { cat_id },
        select: {
          cat_name: true,
          subcategories: {
            select: {
              subcat_id: true,
              subcat_name: true,
              products: {
                select: {
                  product_id: true,
                  product_name: true,
                  product_img: true,
                  unit: true,
                },
              },
            },
          },
        },
      });
  
      if (!category) {
        return null;
      }
  
      // Transform the data to match the `CategoryWithSubcategories` type
      return {
        cat_name: category.cat_name,
        subcategories: category.subcategories.map((subcategory) => ({
          subcat_id: subcategory.subcat_id,
          subcat_name: subcategory.subcat_name,
          products: subcategory.products,
        })),
      };
    } catch (error) {
      console.error("Error fetching category with subcategories and products:", error);
      throw new Error("Failed to fetch category data");
    }
  }