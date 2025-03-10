'use server';
import { prisma } from '@/lib/prisma';
import { Category } from '@/types/category';

export async function getCategories(): Promise<Category[]> {
    try {
        const categories = await prisma.categories.findMany({

        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw new Error("Failed to fetch categories");
    }
}



/**
 * Fetches a category by its ID, including its subcategories and products.
 * @param cat_id The ID of the category to fetch.
 * @returns The category object with subcategories and products, or null if not found.
 */
import { CategoryWithSubcategories } from '@/types/category';

/**
 * Fetches a category by its ID, including its subcategories and products.
 * @param cat_id The ID of the category to fetch.
 * @returns The category object with subcategories and products, or null if not found.
 */
export async function getCategoryWithSubcategoriesAndProducts(cat_id: string): Promise<CategoryWithSubcategories | null> {
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