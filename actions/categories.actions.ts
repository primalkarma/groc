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