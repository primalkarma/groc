'use server';
import { prisma } from '@/lib/prisma';

export async function getCategories() {
    try {
        const categories = await prisma.categories.findMany({

        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
    }
}